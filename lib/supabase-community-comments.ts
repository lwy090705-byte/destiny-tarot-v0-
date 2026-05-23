import { supabase } from '@/lib/supabase'
import { formatCommunityPostDate } from '@/lib/supabase-community-posts'

export type CommunityCommentRow = {
  id: string
  created_at: string
  post_id: string
  author: string
  content: string
  /** Requires is_hidden on community_comments — see supabase/community_hidden_columns.sql */
  is_hidden: boolean
  hidden_by: string | null
  hidden_at: string | null
}

export type CommunityCommentInsert = {
  post_id: string
  author: string
  content: string
}

export type CommunityCommentView = {
  id: string
  author: string
  date: string
  text: string
  isHidden: boolean
}

function mapRawRow(row: Record<string, unknown>): CommunityCommentRow {
  return {
    id: String(row.id ?? ''),
    created_at: String(row.created_at ?? ''),
    post_id: String(row.post_id ?? ''),
    author: String(row.author ?? ''),
    content: String(row.content ?? ''),
    is_hidden: row.is_hidden === true,
    hidden_by: row.hidden_by != null ? String(row.hidden_by) : null,
    hidden_at: row.hidden_at != null ? String(row.hidden_at) : null,
  }
}

function filterVisibleComments(
  rows: CommunityCommentRow[],
  includeHidden: boolean
): CommunityCommentRow[] {
  if (includeHidden) return rows
  return rows.filter((row) => !row.is_hidden)
}

export function mapCommentRowToView(row: CommunityCommentRow): CommunityCommentView {
  return {
    id: row.id,
    author: row.author,
    date: formatCommunityPostDate(row.created_at),
    text: row.content,
    isHidden: row.is_hidden,
  }
}

export type FetchCommunityCommentsOptions = {
  includeHidden?: boolean
}

/** Load comments for a post, oldest first. Never throws. */
export async function fetchCommunityCommentsByPostId(
  postId: string,
  options?: FetchCommunityCommentsOptions
): Promise<CommunityCommentRow[]> {
  const id = postId.trim()
  if (!id) return []
  const includeHidden = options?.includeHidden === true

  try {
    const { data, error } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[community_comments] fetch failed', error)
      return []
    }

    const rows = (data ?? []).map((row) => mapRawRow(row as Record<string, unknown>))
    const visible = filterVisibleComments(rows, includeHidden)
    console.log('[community_comments] fetch success', {
      post_id: id,
      total: rows.length,
      visible: visible.length,
    })
    return visible
  } catch (err) {
    console.error('[community_comments] fetch error', err)
    return []
  }
}

/** Insert a comment. Never throws. */
export async function insertCommunityComment(
  row: CommunityCommentInsert
): Promise<CommunityCommentRow | null> {
  const payload = {
    post_id: row.post_id.trim(),
    author: row.author.trim(),
    content: row.content.trim(),
  }

  if (!payload.post_id || !payload.content) return null

  try {
    const { data, error } = await supabase
      .from('community_comments')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('[community_comments] insert failed', error)
      return null
    }

    console.log('[community_comments] insert success', data)
    return mapRawRow(data as Record<string, unknown>)
  } catch (err) {
    console.error('[community_comments] insert error', err)
    return null
  }
}

/** Increment community_posts.comments_count by 1. Never throws. */
export async function incrementPostCommentsCount(postId: string): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false

  try {
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('comments_count')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('[community_posts] comments_count read failed', fetchError)
      return false
    }

    const nextCount = (Number(post?.comments_count) || 0) + 1

    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ comments_count: nextCount })
      .eq('id', id)

    if (updateError) {
      console.error('[community_posts] comments_count update failed', updateError)
      return false
    }

    console.log('[community_posts] comments_count updated', { post_id: id, comments_count: nextCount })
    return true
  } catch (err) {
    console.error('[community_posts] comments_count update error', err)
    return false
  }
}

/** Decrement community_posts.comments_count by 1 (min 0). Never throws. */
export async function decrementPostCommentsCount(postId: string): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false

  try {
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('comments_count')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('[community_posts] comments_count read failed', fetchError)
      return false
    }

    const nextCount = Math.max(0, (Number(post?.comments_count) || 0) - 1)

    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ comments_count: nextCount })
      .eq('id', id)

    if (updateError) {
      console.error('[community_posts] comments_count decrement failed', updateError)
      return false
    }

    console.log('[community_posts] comments_count decremented', { post_id: id, comments_count: nextCount })
    return true
  } catch (err) {
    console.error('[community_posts] comments_count decrement error', err)
    return false
  }
}

/** Delete all comments for a post. Never throws. */
export async function deleteCommentsByPostId(postId: string): Promise<boolean> {
  const id = postId.trim()
  if (!id) return false

  try {
    const { error } = await supabase.from('community_comments').delete().eq('post_id', id)

    if (error) {
      console.error('[community_comments] delete by post failed', error)
      return false
    }

    console.log('[community_comments] delete by post success', { post_id: id })
    return true
  } catch (err) {
    console.error('[community_comments] delete by post error', err)
    return false
  }
}

/** Delete one comment by id. Never throws. */
export async function deleteCommunityComment(commentId: string): Promise<boolean> {
  const id = commentId.trim()
  if (!id) return false

  try {
    const { error } = await supabase.from('community_comments').delete().eq('id', id)

    if (error) {
      console.error('[community_comments] delete failed', error)
      return false
    }

    console.log('[community_comments] delete success', { comment_id: id })
    return true
  } catch (err) {
    console.error('[community_comments] delete error', err)
    return false
  }
}

/**
 * Soft-hide a comment (is_hidden, hidden_by, hidden_at).
 * Columns: see supabase/community_hidden_columns.sql
 */
export async function hideCommunityComment(
  commentId: string,
  hiddenBy: string
): Promise<boolean> {
  const id = commentId.trim()
  const by = hiddenBy.trim()
  if (!id || !by) return false

  try {
    const { error } = await supabase
      .from('community_comments')
      .update({
        is_hidden: true,
        hidden_by: by,
        hidden_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('[community_comments] hide failed', error)
      return false
    }

    console.log('[community_comments] hide success', { comment_id: id, hidden_by: by })
    return true
  } catch (err) {
    console.error('[community_comments] hide error', err)
    return false
  }
}
