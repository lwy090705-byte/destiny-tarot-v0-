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

function filterVisiblePosts(
  rows: CommunityPostRow[],
  includeHidden: boolean
): CommunityPostRow[] {
  if (includeHidden) return rows
  return rows.filter((row) => !row.is_hidden)
}

export type FetchCommunityPostsOptions = {
  /** When true (master), includes is_hidden posts for moderation. */
  includeHidden?: boolean
}

/** Load posts newest first. Never throws. */
export async function fetchCommunityPosts(
  options?: FetchCommunityPostsOptions
): Promise<CommunityPostRow[]> {
  const includeHidden = options?.includeHidden === true

  try {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[community_posts] fetch failed', error)
      return []
    }

    const rows = (data ?? []).map((row) => mapRawRow(row as Record<string, unknown>))
    const visible = filterVisiblePosts(rows, includeHidden)
    console.log('[community_posts] fetch success', { total: rows.length, visible: visible.length })
    return visible
  } catch (err) {
    console.error('[community_posts] fetch error', err)
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
      .select('*')
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

/** Delete a post by id. Never throws. */
export async function deleteCommunityPost(postId: string): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false

  try {
    const { error } = await supabase.from('community_posts').delete().eq('id', id)

    if (error) {
      console.error('[community_posts] delete failed', error)
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
 * Soft-hide a post (is_hidden, hidden_by, hidden_at).
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
    const { error } = await supabase
      .from('community_posts')
      .update({
        is_hidden: true,
        hidden_by: by,
        hidden_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('[community_posts] hide failed', error)
      return false
    }

    console.log('[community_posts] hide success', { post_id: id, hidden_by: by })
    return true
  } catch (err) {
    console.error('[community_posts] hide error', err)
    return false
  }
}
