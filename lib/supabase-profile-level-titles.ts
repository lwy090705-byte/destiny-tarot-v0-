import { supabase } from '@/lib/supabase'
import {
  logCommunityAuthorLevel,
  normalizeAuthorKey,
  resolveAuthorDisplayMeta,
  type AuthorDisplayMeta,
  type AuthorProfileFields,
} from '@/lib/community-author-display'
import { fetchPointsTotalByNickname } from '@/lib/supabase-points'

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

const CONCURRENCY = 6

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
    msg.includes('level') && msg.includes('does not exist')
  )
}

/** Per-nickname lookup (same pattern as fetchProfileMasterFields). */
async function fetchProfileRowByNickname(nickname: string): Promise<ProfileRow | null> {
  const nick = nickname.trim()
  if (!nick) return null

  const withLevel = await supabase
    .from('profiles')
    .select(PROFILE_SELECT_WITH_LEVEL)
    .ilike('nickname', nick)
    .limit(1)
    .maybeSingle()

  if (withLevel.error && isMissingColumnError(withLevel.error)) {
    const fallback = await supabase
      .from('profiles')
      .select(PROFILE_SELECT_BASE)
      .ilike('nickname', nick)
      .limit(1)
      .maybeSingle()

    if (fallback.error) {
      console.error('[profiles] author profile fetch failed', { nickname: nick, error: fallback.error })
      return null
    }
    return (fallback.data as ProfileRow | null) ?? null
  }

  if (withLevel.error) {
    console.error('[profiles] author profile fetch failed', { nickname: nick, error: withLevel.error })
    return null
  }

  return (withLevel.data as ProfileRow | null) ?? null
}

async function enrichFieldsFromPointsLedger(
  nickname: string,
  fields: AuthorProfileFields
): Promise<AuthorProfileFields> {
  if (fields.level_title?.trim()) return fields

  const profilePoints = fields.total_points
  if (profilePoints != null && profilePoints > 0) return fields

  const ledgerTotal = await fetchPointsTotalByNickname(nickname)
  if (ledgerTotal <= 0) return fields

  return { ...fields, total_points: ledgerTotal }
}

async function resolveMetaForNickname(
  nickname: string,
  defaultLevelTitle: string
): Promise<AuthorDisplayMeta> {
  const nick = nickname.trim()
  const row = await fetchProfileRowByNickname(nick)
  let fields: AuthorProfileFields | undefined

  if (row) {
    fields = await enrichFieldsFromPointsLedger(nick, mapRowToFields(row))
  } else {
    const ledgerTotal = await fetchPointsTotalByNickname(nick)
    if (ledgerTotal > 0) {
      fields = { total_points: ledgerTotal }
    }
  }

  const meta = resolveAuthorDisplayMeta(nick, fields, defaultLevelTitle)
  logCommunityAuthorLevel(nick, meta, row ? 'profile' : 'fallback')
  return meta
}

async function mapPool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = []
  let index = 0

  async function worker() {
    while (index < items.length) {
      const i = index++
      results[i] = await fn(items[i])
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return results
}

/**
 * Batch-load profiles for community author rows.
 * Uses ilike per nickname (reliable with RLS) — not .or() batch filters.
 */
export async function fetchAuthorDisplayMetaByNicknames(
  nicknames: string[],
  defaultLevelTitle: string
): Promise<Record<string, AuthorDisplayMeta>> {
  const unique = [...new Set(nicknames.map((n) => n.trim()).filter(Boolean))]
  const result: Record<string, AuthorDisplayMeta> = {}

  if (unique.length === 0) return result

  const metas = await mapPool(unique, CONCURRENCY, (nick) =>
    resolveMetaForNickname(nick, defaultLevelTitle)
  )

  unique.forEach((nick, i) => {
    result[normalizeAuthorKey(nick)] = metas[i]
  })

  console.log('[profiles] author meta batch complete', {
    requested: unique.length,
    resolved: Object.keys(result).length,
  })

  return result
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
