import { supabase } from '@/lib/supabase'
import {
  logCommunityAuthorLevel,
  normalizeAuthorKey,
  resolveAuthorDisplayMeta,
  type AuthorDisplayMeta,
  type AuthorProfileFields,
} from '@/lib/community-author-display'
import { invalidateCachedFetch } from '@/lib/supabase-request-cache'

const PROFILE_SELECT_BASE =
  'nickname, level_title, role, is_master, total_points' as const
const PROFILE_SELECT_WITH_LEVEL =
  'nickname, level, level_title, role, is_master, total_points' as const

type ProfileRow = {
  nickname?: string | null
  level?: number | null
  level_title?: string | null
  role?: string | null
  is_master?: boolean | null
  total_points?: number | null
}

const AUTHOR_META_TTL_MS = 5 * 60 * 1000
const PROFILE_CHUNK = 25

type MetaCacheEntry = {
  meta: AuthorDisplayMeta
  expiresAt: number
}

/** Per-nickname memory cache (session). */
const metaCache = new Map<string, MetaCacheEntry>()
/** In-flight batch promises keyed by sorted missing-nick list. */
const inflightBatches = new Map<string, Promise<Record<string, AuthorDisplayMeta>>>()

function mapRowToFields(row: ProfileRow): AuthorProfileFields {
  return {
    level: row.level != null ? Number(row.level) : null,
    level_title: row.level_title != null ? String(row.level_title) : null,
    role: row.role != null ? String(row.role) : null,
    is_master: row.is_master === true,
    total_points: row.total_points != null ? Number(row.total_points) : null,
  }
}

function isMissingColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false
  const msg = (error.message ?? '').toLowerCase()
  return (
    error.code === '42703' ||
    error.code === 'PGRST204' ||
    (msg.includes('level') && msg.includes('does not exist'))
  )
}

function getCachedMeta(key: string): AuthorDisplayMeta | null {
  const entry = metaCache.get(key)
  if (!entry) return null
  if (entry.expiresAt <= Date.now()) {
    metaCache.delete(key)
    return null
  }
  return entry.meta
}

function setCachedMeta(key: string, meta: AuthorDisplayMeta): void {
  metaCache.set(key, { meta, expiresAt: Date.now() + AUTHOR_META_TTL_MS })
}

/** Batch-load profile rows with `.in()` chunks (1 request per chunk). */
async function fetchProfileRowsByNicknames(nicknames: string[]): Promise<Map<string, ProfileRow>> {
  const result = new Map<string, ProfileRow>()
  const unique = [...new Set(nicknames.map((n) => n.trim()).filter(Boolean))]
  if (unique.length === 0) return result

  for (let i = 0; i < unique.length; i += PROFILE_CHUNK) {
    const chunk = unique.slice(i, i + PROFILE_CHUNK)

    let data: unknown[] | null = null
    let error: { code?: string; message?: string } | null = null

    const withLevel = await supabase
      .from('profiles')
      .select(PROFILE_SELECT_WITH_LEVEL)
      .in('nickname', chunk)

    if (withLevel.error && isMissingColumnError(withLevel.error)) {
      const fallback = await supabase
        .from('profiles')
        .select(PROFILE_SELECT_BASE)
        .in('nickname', chunk)
      data = fallback.data as unknown[] | null
      error = fallback.error
    } else {
      data = withLevel.data as unknown[] | null
      error = withLevel.error
    }

    if (error) {
      console.error('[profiles] author profile batch failed', { chunkSize: chunk.length, error })
      continue
    }

    for (const raw of data ?? []) {
      const row = raw as ProfileRow
      const nick = row.nickname?.trim()
      if (!nick) continue
      result.set(normalizeAuthorKey(nick), row)
    }
  }

  return result
}

function rowToMeta(
  nickname: string,
  row: ProfileRow | undefined,
  defaultLevelTitle: string
): AuthorDisplayMeta {
  const fields = row ? mapRowToFields(row) : undefined
  const meta = resolveAuthorDisplayMeta(nickname, fields, defaultLevelTitle)
  logCommunityAuthorLevel(nickname, meta, row ? 'profile' : 'fallback')
  return meta
}

/**
 * Batch-load profiles for community author rows.
 * - Skips nicknames already in TTL cache
 * - Uses chunked `.in('nickname', …)` (not per-nickname N+1)
 * - Does not fan out to points ledger (avoids O(authors) points selects)
 */
export async function fetchAuthorDisplayMetaByNicknames(
  nicknames: string[],
  defaultLevelTitle: string
): Promise<Record<string, AuthorDisplayMeta>> {
  const unique = [...new Set(nicknames.map((n) => n.trim()).filter(Boolean))]
  const result: Record<string, AuthorDisplayMeta> = {}
  if (unique.length === 0) return result

  const missing: string[] = []
  for (const nick of unique) {
    const key = normalizeAuthorKey(nick)
    const cached = getCachedMeta(key)
    if (cached) {
      result[key] = cached
    } else {
      missing.push(nick)
    }
  }

  if (missing.length === 0) return result

  const batchKey = missing.map(normalizeAuthorKey).sort().join('|')
  const existing = inflightBatches.get(batchKey)
  if (existing) {
    const fetched = await existing
    return { ...result, ...fetched }
  }

  const promise = (async (): Promise<Record<string, AuthorDisplayMeta>> => {
    const batchResult: Record<string, AuthorDisplayMeta> = {}
    const rowsByKey = await fetchProfileRowsByNicknames(missing)

    for (const nick of missing) {
      const key = normalizeAuthorKey(nick)
      const meta = rowToMeta(nick, rowsByKey.get(key), defaultLevelTitle)
      setCachedMeta(key, meta)
      batchResult[key] = meta
    }

    console.log('[profiles] author meta batch complete', {
      requested: unique.length,
      cacheHits: unique.length - missing.length,
      fetched: missing.length,
      profileHits: rowsByKey.size,
    })

    return batchResult
  })().finally(() => {
    inflightBatches.delete(batchKey)
  })

  inflightBatches.set(batchKey, promise)
  const fetched = await promise
  return { ...result, ...fetched }
}

/** Drop cached meta for one author (e.g. after current user's points change). */
export function invalidateAuthorMetaForNickname(nickname: string): void {
  const key = normalizeAuthorKey(nickname)
  metaCache.delete(key)
  invalidateCachedFetch(`author-meta:${key}`)
}

/** Clear all author display meta (logout / nickname switch). */
export function clearAuthorMetaCache(): void {
  metaCache.clear()
  inflightBatches.clear()
}

/** @deprecated Use fetchAuthorDisplayMetaByNicknames */
export async function fetchProfileLevelTitlesByNicknames(
  nicknames: string[]
): Promise<Record<string, string>> {
  const meta = await fetchAuthorDisplayMetaByNicknames(nicknames, '입문자')
  const titles: Record<string, string> = {}
  for (const [key, value] of Object.entries(meta)) {
    titles[key] = value.levelTitle
  }
  return titles
}
