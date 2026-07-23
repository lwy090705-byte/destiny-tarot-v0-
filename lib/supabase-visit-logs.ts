import { supabase } from '@/lib/supabase'
import {
  getKstDateString,
  getKstMonthStartDateString,
  getKstWeekStartDateString,
  kstRangeLabel,
  KST_TIMEZONE,
} from '@/lib/kst-date'
import { cachedFetch, invalidateCachedFetch } from '@/lib/supabase-request-cache'

export type VisitLogRow = {
  user_code: string | null
  nickname: string | null
  visit_date: string
}

export type VisitStats = {
  daily: number
  weekly: number
  monthly: number
  total: number
}

const EMPTY_STATS: VisitStats = { daily: 0, weekly: 0, monthly: 0, total: 0 }
const VISIT_STATS_TTL_MS = 5 * 60 * 1000
const VISITOR_ID_STORAGE_KEY = 'fortune-anonymous-visitor-id'

const isDev =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'development'

function logVisitStatsError(context: string, err: unknown): void {
  if (!isDev) {
    console.error(`[visit_logs] ${context}`)
    return
  }
  console.error(`[visit_logs] ${context}`, err)
}

/** Prefer login referral code, then anonymous visitor id (never empty). */
export function getOrCreateAnonymousVisitorId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const existing = localStorage.getItem(VISITOR_ID_STORAGE_KEY)?.trim()
    if (existing) return existing
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? `V:${crypto.randomUUID()}`
        : `V:${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem(VISITOR_ID_STORAGE_KEY, id)
    return id
  } catch {
    return ''
  }
}

export function visitorIdentityKey(row: VisitLogRow): string | null {
  const code = row.user_code?.trim().toUpperCase()
  if (code) return `code:${code}`
  const nick = row.nickname?.trim()
  if (nick) return `nick:${nick.toLowerCase()}`
  return null
}

export function countUniqueVisitors(rows: VisitLogRow[]): number {
  const set = new Set<string>()
  for (const row of rows) {
    const key = visitorIdentityKey(row)
    if (key) set.add(key)
  }
  return set.size
}

function visitLogCacheKey(params: { user_code: string; nickname: string; visit_date: string }): string {
  const id = params.user_code.trim() || params.nickname.trim().toLowerCase()
  return `fortune-visit-log:${id}:${params.visit_date}`
}

function visitStatsCacheKey(todayKst: string = getKstDateString()): string {
  return `visit-stats:${todayKst}`
}

/** Drop today’s visit-stats cache (call after a successful visit insert). */
export function invalidateTodayVisitStatsCache(): void {
  invalidateCachedFetch(visitStatsCacheKey())
}

/**
 * Record one visit per KST calendar day per user_code (or nickname if no code).
 * Table: visit_logs — see supabase/visit_logs.sql
 * Relies on unique indexes for dedupe (no SELECT — RLS may block table reads).
 */
export async function recordDailyVisit(params: {
  nickname: string
  user_code: string
}): Promise<void> {
  const nick = params.nickname.trim()
  const code = params.user_code.trim().toUpperCase()
  const visit_date = getKstDateString()

  if (!code && !nick) {
    if (isDev) console.log('[visit_logs] skip record — no user_code or nickname')
    return
  }

  const cacheKey = visitLogCacheKey({ user_code: code, nickname: nick, visit_date })
  if (typeof window !== 'undefined' && localStorage.getItem(cacheKey)) {
    if (isDev) {
      console.log('[visit_logs] already recorded today (cache)', {
        visit_date,
        timezone: KST_TIMEZONE,
      })
    }
    return
  }

  try {
    const { error: insertError } = await supabase.from('visit_logs').insert({
      nickname: nick || null,
      user_code: code || null,
      visit_date,
    })

    if (insertError) {
      const duplicate = insertError.code === '23505'
      if (duplicate) {
        if (typeof window !== 'undefined') localStorage.setItem(cacheKey, '1')
        if (isDev) {
          console.log('[visit_logs] already recorded today (unique)', {
            visit_date,
            timezone: KST_TIMEZONE,
          })
        }
        return
      }
      logVisitStatsError('insert failed', insertError)
      return
    }

    if (typeof window !== 'undefined') localStorage.setItem(cacheKey, '1')
    invalidateTodayVisitStatsCache()
    if (isDev) {
      console.log('[visit_logs] insert success', {
        visit_date,
        timezone: KST_TIMEZONE,
      })
    }
  } catch (err) {
    logVisitStatsError('insert error', err)
  }
}

function parseVisitStatsPayload(raw: unknown): VisitStats | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const daily = Number(o.daily)
  const weekly = Number(o.weekly)
  const monthly = Number(o.monthly)
  const total = Number(o.total)
  if (![daily, weekly, monthly, total].every((n) => Number.isFinite(n))) return null
  return {
    daily: Math.max(0, Math.floor(daily)),
    weekly: Math.max(0, Math.floor(weekly)),
    monthly: Math.max(0, Math.floor(monthly)),
    total: Math.max(0, Math.floor(total)),
  }
}

/** Server API: Pi session cookie + operator pi_uid (not client nickname). */
async function fetchVisitStatsViaServerApi(): Promise<VisitStats | null> {
  if (typeof window === 'undefined') return null
  try {
    const res = await fetch('/api/operator/visit-stats', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    })
    if (!res.ok) {
      if (isDev) {
        console.warn('[visit_stats] server API', res.status)
      }
      return null
    }
    return parseVisitStatsPayload(await res.json())
  } catch (err) {
    logVisitStatsError('server visit-stats failed', err)
    return null
  }
}

/** @deprecated Nickname-gated RPC is insecure and disabled in Phase 1/2 SQL. */
async function fetchVisitStatsViaRpc(_requesterNickname: string): Promise<VisitStats | null> {
  return null
}

/**
 * Fallback when RPC is not deployed yet.
 * IMPORTANT: never select the whole table — PostgREST caps at ~1000 rows and
 * daily counts go to 0 while older periods look fine or vice versa.
 */
async function fetchVisitStatsViaDateFilters(): Promise<VisitStats> {
  const now = new Date()
  const todayKst = getKstDateString(now)
  const weekStartKst = getKstWeekStartDateString(now)
  const monthStartKst = getKstMonthStartDateString(now)

  if (isDev) {
    console.log('[visit_stats] fallback date filters', {
      timezone: KST_TIMEZONE,
      daily: kstRangeLabel(todayKst, todayKst),
      weekly: kstRangeLabel(weekStartKst, todayKst),
      monthly: kstRangeLabel(monthStartKst, todayKst),
    })
  }

  const mapRows = (data: unknown[] | null): VisitLogRow[] =>
    (data ?? []).map((row) => {
      const r = row as Record<string, unknown>
      return {
        user_code: r.user_code != null ? String(r.user_code) : null,
        nickname: r.nickname != null ? String(r.nickname) : null,
        visit_date: String(r.visit_date ?? '').slice(0, 10),
      }
    })

  // Daily: exact KST date filter (avoids PostgREST default 1000-row truncation of full table).
  const { data: dailyData, error: dailyError } = await supabase
    .from('visit_logs')
    .select('user_code, nickname, visit_date')
    .eq('visit_date', todayKst)
    .limit(10000)

  if (dailyError) {
    logVisitStatsError('stats daily fetch failed', dailyError)
    throw dailyError
  }

  const { data: monthData, error: monthError } = await supabase
    .from('visit_logs')
    .select('user_code, nickname, visit_date')
    .gte('visit_date', monthStartKst)
    .lte('visit_date', todayKst)
    .limit(10000)

  if (monthError) {
    logVisitStatsError('stats month-window fetch failed', monthError)
    throw monthError
  }

  const dailyRows = mapRows(dailyData as unknown[] | null)
  const monthRows = mapRows(monthData as unknown[] | null)
  const daily = countUniqueVisitors(dailyRows)
  const weekly = countUniqueVisitors(
    monthRows.filter((r) => r.visit_date >= weekStartKst && r.visit_date <= todayKst)
  )
  const monthly = countUniqueVisitors(monthRows)

  const identity = new Set<string>()
  const pageSize = 1000
  let from = 0
  for (;;) {
    const { data, error } = await supabase
      .from('visit_logs')
      .select('user_code, nickname, visit_date')
      .order('visit_date', { ascending: true })
      .order('id', { ascending: true })
      .range(from, from + pageSize - 1)

    if (error) {
      logVisitStatsError('stats total pagination failed', error)
      throw error
    }

    const batch = mapRows(data as unknown[] | null)
    for (const row of batch) {
      const key = visitorIdentityKey(row)
      if (key) identity.add(key)
    }
    if (batch.length < pageSize) break
    from += pageSize
    if (from >= 50000) break
  }

  return { daily, weekly, monthly, total: identity.size }
}

export type FetchVisitStatsOptions = {
  /** Operator nickname for RPC authorization. */
  requesterNickname?: string
  /** Bypass memory cache (manual refresh). */
  forceRefresh?: boolean
}

/**
 * Unique visitor counts for operator dashboard (KST day / week / month / all-time).
 * Prefers get_visitor_stats RPC; falls back to date-filtered queries (never one uncapped dump).
 * Failed fetches are NOT cached. Never throws — returns EMPTY_STATS on hard failure.
 */
export async function fetchVisitStats(options: FetchVisitStatsOptions = {}): Promise<VisitStats> {
  const todayKst = getKstDateString()
  const cacheKey = visitStatsCacheKey(todayKst)

  if (options.forceRefresh) {
    invalidateCachedFetch(cacheKey)
  }

  return cachedFetch(
    cacheKey,
    async () => {
      try {
        const apiStats = await fetchVisitStatsViaServerApi()
        if (apiStats) {
          if (isDev) {
            console.log('[visit_stats] server API totals', { timezone: KST_TIMEZONE, ...apiStats })
          }
          return apiStats
        }

        // Legacy nickname RPC (disabled after Phase 1) — kept for type completeness.
        void fetchVisitStatsViaRpc(options.requesterNickname ?? '')

        // Direct visit_logs SELECT fails after Phase 1 RLS; only useful pre-migration.
        const fallback = await fetchVisitStatsViaDateFilters()
        if (isDev) {
          console.log('[visit_stats] fallback totals', { timezone: KST_TIMEZONE, ...fallback })
        }
        return fallback
      } catch (err) {
        logVisitStatsError('stats error', err)
        // Re-throw so cachedFetch does not store EMPTY_STATS for 5 minutes.
        throw err
      }
    },
    VISIT_STATS_TTL_MS
  ).catch(() => ({ ...EMPTY_STATS }))
}
