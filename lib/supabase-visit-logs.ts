import { supabase } from '@/lib/supabase'
import {
  getKstDateString,
  getKstMonthStartDateString,
  getKstWeekStartDateString,
  kstRangeLabel,
  KST_TIMEZONE,
} from '@/lib/kst-date'

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

/**
 * Record one visit per KST calendar day per user_code (or nickname if no code).
 * Table: visit_logs — see supabase/visit_logs.sql
 */
export async function recordDailyVisit(params: {
  nickname: string
  user_code: string
}): Promise<void> {
  const nick = params.nickname.trim()
  const code = params.user_code.trim().toUpperCase()
  const visit_date = getKstDateString()

  if (!code && !nick) {
    console.log('[visit_logs] skip record — no user_code or nickname')
    return
  }

  const cacheKey = visitLogCacheKey({ user_code: code, nickname: nick, visit_date })
  if (typeof window !== 'undefined' && localStorage.getItem(cacheKey)) {
    console.log('[visit_logs] already recorded today (cache)', {
      visit_date,
      timezone: KST_TIMEZONE,
      user_code: code,
      nickname: nick,
    })
    return
  }

  try {
    let existingQuery = supabase
      .from('visit_logs')
      .select('id')
      .eq('visit_date', visit_date)
      .limit(1)

    if (code) {
      existingQuery = existingQuery.eq('user_code', code)
    } else {
      existingQuery = existingQuery.eq('nickname', nick).is('user_code', null)
    }

    const { data: existing, error: readError } = await existingQuery.maybeSingle()

    if (readError) {
      console.error('[visit_logs] duplicate check failed', readError)
      return
    }

    if (existing) {
      console.log('[visit_logs] already recorded today (db)', {
        visit_date,
        timezone: KST_TIMEZONE,
        user_code: code,
        nickname: nick,
      })
      if (typeof window !== 'undefined') localStorage.setItem(cacheKey, '1')
      return
    }

    const { error: insertError } = await supabase.from('visit_logs').insert({
      nickname: nick || null,
      user_code: code || null,
      visit_date,
    })

    if (insertError) {
      const duplicate = insertError.code === '23505'
      if (duplicate) {
        console.log('[visit_logs] already recorded today (unique)', {
          visit_date,
          timezone: KST_TIMEZONE,
          user_code: code,
          nickname: nick,
        })
        if (typeof window !== 'undefined') localStorage.setItem(cacheKey, '1')
        return
      }
      console.error('[visit_logs] insert failed', insertError)
      return
    }

    if (typeof window !== 'undefined') localStorage.setItem(cacheKey, '1')
    console.log('[visit_logs] insert success', {
      visit_date,
      timezone: KST_TIMEZONE,
      user_code: code,
      nickname: nick,
    })
  } catch (err) {
    console.error('[visit_logs] insert error', err)
  }
}

/** Unique visitor counts for operator dashboard (KST day / week / month / all-time). Never throws. */
export async function fetchVisitStats(): Promise<VisitStats> {
  const now = new Date()
  const todayKst = getKstDateString(now)
  const weekStartKst = getKstWeekStartDateString(now)
  const monthStartKst = getKstMonthStartDateString(now)

  console.log('[visit_stats] daily range', {
    ...kstRangeLabel(todayKst, todayKst),
    visitDates: `visit_date === ${todayKst}`,
  })
  console.log('[visit_stats] weekly range', {
    ...kstRangeLabel(weekStartKst, todayKst),
    visitDates: `visit_date >= ${weekStartKst} AND visit_date <= ${todayKst}`,
    weekStartsMondayKst: weekStartKst,
  })
  console.log('[visit_stats] monthly range', {
    ...kstRangeLabel(monthStartKst, todayKst),
    visitDates: `visit_date >= ${monthStartKst} AND visit_date <= ${todayKst}`,
    monthStartsFirstKst: monthStartKst,
  })

  try {
    const { data, error } = await supabase
      .from('visit_logs')
      .select('user_code, nickname, visit_date')

    if (error) {
      console.error('[visit_logs] stats fetch failed', error)
      return { ...EMPTY_STATS }
    }

    const rows: VisitLogRow[] = (data ?? []).map((row) => {
      const r = row as Record<string, unknown>
      return {
        user_code: r.user_code != null ? String(r.user_code) : null,
        nickname: r.nickname != null ? String(r.nickname) : null,
        visit_date: String(r.visit_date ?? '').slice(0, 10),
      }
    })

    const daily = countUniqueVisitors(rows.filter((r) => r.visit_date === todayKst))
    const weekly = countUniqueVisitors(
      rows.filter((r) => r.visit_date >= weekStartKst && r.visit_date <= todayKst)
    )
    const monthly = countUniqueVisitors(
      rows.filter((r) => r.visit_date >= monthStartKst && r.visit_date <= todayKst)
    )
    const total = countUniqueVisitors(rows)

    const stats = { daily, weekly, monthly, total }
    console.log('[visit_stats] totals', { timezone: KST_TIMEZONE, ...stats })
    return stats
  } catch (err) {
    console.error('[visit_logs] stats error', err)
    return { ...EMPTY_STATS }
  }
}
