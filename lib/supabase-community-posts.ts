import { supabase } from '@/lib/supabase'
import type { CommunityCategoryKey } from '@/lib/community-sample-posts'

export type CommunityPostRow = {
  id: string
  created_at: string
  title: string
  content: string
  category: string
  author: string
  likes: number
  comments_count: number
  /** Requires is_hidden on community_posts — see supabase/community_hidden_columns.sql */
  is_hidden: boolean
  hidden_by: string | null
  hidden_at: string | null
}

export type CommunityPostInsert = {
  title: string
  content: string
  category: CommunityCategoryKey
  author: string
}

const CATEGORY_KEYS: CommunityCategoryKey[] = [
  'tarot',
  'saju',
  'compatibility',
  'fortune',
  'other',
]

/** Columns needed by list + detail UI (avoid select *). */
const POST_SELECT =
  'id, created_at, title, content, category, author, likes, comments_count, is_hidden, hidden_by, hidden_at' as const

/** Default page size for community list fetches. */
export const COMMUNITY_POSTS_PAGE_SIZE = 50

export function normalizeCategoryKey(raw: string | null | undefined): CommunityCategoryKey {
  const key = (raw ?? 'other').trim().toLowerCase() as CommunityCategoryKey
  return CATEGORY_KEYS.includes(key) ? key : 'other'
}

export function formatCommunityPostDate(createdAt: string): string {
  try {
    return new Date(createdAt).toISOString().split('T')[0]
  } catch {
    return createdAt.split('T')[0] ?? createdAt
  }
}

function mapRawRow(row: Record<string, unknown>): CommunityPostRow {
  return {
    id: String(row.id ?? ''),
    created_at: String(row.created_at ?? ''),
    title: String(row.title ?? ''),
    content: String(row.content ?? ''),
    category: String(row.category ?? 'other'),
    author: String(row.author ?? ''),
    likes: Number(row.likes) || 0,
    comments_count: Number(row.comments_count) || 0,
    is_hidden: row.is_hidden === true,
    hidden_by: row.hidden_by != null ? String(row.hidden_by) : null,
    hidden_at: row.hidden_at != null ? String(row.hidden_at) : null,
  }
}

export type FetchCommunityPostsOptions = {
  /** When true (master), includes is_hidden posts for moderation. */
  includeHidden?: boolean
  /** Max rows to return (default COMMUNITY_POSTS_PAGE_SIZE). */
  limit?: number
  /** 0-based offset for pagination. */
  offset?: number
}

/** Load posts newest first with limit/offset. Never throws. */
export async function fetchCommunityPosts(
  options?: FetchCommunityPostsOptions
): Promise<CommunityPostRow[]> {
  const includeHidden = options?.includeHidden === true
  const limit = Math.max(1, Math.min(options?.limit ?? COMMUNITY_POSTS_PAGE_SIZE, 100))
  const offset = Math.max(0, options?.offset ?? 0)

  try {
    let query = supabase
      .from('community_posts')
      .select(POST_SELECT)
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1)

    if (!includeHidden) {
      query = query.or('is_hidden.is.null,is_hidden.eq.false')
    }

    const { data, error } = await query

    if (error) {
      console.error('[community_posts] fetch failed', error)
      return []
    }

    const rows = (data ?? []).map((row) => mapRawRow(row as Record<string, unknown>))
    console.log('[community_posts] fetch success', {
      total: rows.length,
      offset,
      limit,
      includeHidden,
    })
    return rows
  } catch (err) {
    console.error('[community_posts] fetch error', err)
    return []
  }
}

/** Recommended posts (likes >= 80), limited. Never throws. */
export async function fetchRecommendedCommunityPosts(
  options?: FetchCommunityPostsOptions
): Promise<CommunityPostRow[]> {
  const includeHidden = options?.includeHidden === true
  const limit = Math.max(1, Math.min(options?.limit ?? COMMUNITY_POSTS_PAGE_SIZE, 100))

  try {
    let query = supabase
      .from('community_posts')
      .select(POST_SELECT)
      .gte('likes', 80)
      .order('likes', { ascending: false })
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
      .limit(limit)

    if (!includeHidden) {
      query = query.or('is_hidden.is.null,is_hidden.eq.false')
    }

    const { data, error } = await query

    if (error) {
      console.error('[community_posts] recommended fetch failed', error)
      return []
    }

    const rows = (data ?? []).map((row) => mapRawRow(row as Record<string, unknown>))
    console.log('[community_posts] recommended fetch success', { total: rows.length })
    return rows
  } catch (err) {
    console.error('[community_posts] recommended fetch error', err)
    return []
  }
}

/** Insert a new post. Never throws. */
export async function insertCommunityPost(
  row: CommunityPostInsert
): Promise<CommunityPostRow | null> {
  const payload = {
    title: row.title.trim(),
    content: row.content.trim(),
    category: row.category,
    author: row.author.trim(),
    likes: 0,
    comments_count: 0,
  }

  try {
    const { data, error } = await supabase
      .from('community_posts')
      .insert(payload)
      .select(POST_SELECT)
      .single()

    if (error) {
      console.error('[community_posts] insert failed', error)
      return null
    }

    console.log('[community_posts] insert success', data)
    return mapRawRow(data as Record<string, unknown>)
  } catch (err) {
    console.error('[community_posts] insert error', err)
    return null
  }
}

/**
 * Delete a post via server API (Pi session + pi_uid ownership / operator).
 * Direct anon DELETE is blocked after rls_safe_phase1.sql.
 */
export async function deleteCommunityPost(
  postId: string,
  nickname?: string
): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false

  try {
    const res = await fetch('/api/community/post-mutate', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete',
        postId: id,
        nickname: nickname?.trim() ?? '',
      }),
    })
    if (!res.ok) {
      console.error('[community_posts] delete API failed', res.status)
      return false
    }
    console.log('[community_posts] delete success', { post_id: id })
    return true
  } catch (err) {
    console.error('[community_posts] delete error', err)
    return false
  }
}

/**
 * Soft-hide a post via server API (Pi session + ownership / operator).
 * Columns: see supabase/community_hidden_columns.sql
 */
export async function hideCommunityPost(
  postId: string,
  hiddenBy: string
): Promise<boolean> {
  const id = postId.trim()
  const by = hiddenBy.trim()
  if (!id || !by) return false

  try {
    const res = await fetch('/api/community/post-mutate', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'hide',
        postId: id,
        nickname: by,
      }),
    })
    if (!res.ok) {
      console.error('[community_posts] hide API failed', res.status)
      return false
    }
    console.log('[community_posts] hide success', { post_id: id, hidden_by: by })
    return true
  } catch (err) {
    console.error('[community_posts] hide error', err)
    return false
  }
}

/** Set likes without a prior select (caller already knows next value).
 * @deprecated Prefer increment_community_post_likes RPC via likeCommunityPost.
 */
export async function setPostLikesCount(postId: string, likes: number): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false
  const next = Math.max(0, Math.floor(likes))

  try {
    const { error } = await supabase
      .from('community_posts')
      .update({ likes: next })
      .eq('id', id)

    if (error) {
      console.error('[community_posts] likes set failed', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[community_posts] likes set error', err)
    return false
  }
}

/** @deprecated Prefer adjustPostCommentsCount in supabase-community-comments. */
export async function setPostCommentsCount(postId: string, count: number): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false
  const next = Math.max(0, Math.floor(count))

  try {
    const { error } = await supabase
      .from('community_posts')
      .update({ comments_count: next })
      .eq('id', id)

    if (error) {
      console.error('[community_posts] comments_count set failed', error)
      return false
    }
    return true
  } catch (err) {
    console.error('[community_posts] comments_count set error', err)
    return false
  }
}
