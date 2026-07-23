import { supabase } from '@/lib/supabase'

/**
 * Required table: community_post_likes
 * - id uuid PK default gen_random_uuid()
 * - created_at timestamptz default now()
 * - post_id uuid (FK community_posts)
 * - user_code text
 * - nickname text
 * See: supabase/community_post_likes.sql
 *
 * Atomic likes increment: supabase/community_post_counters.sql
 * (increment_community_post_likes RPC)
 */

export type CommunityLikeUser = {
  user_code: string
  nickname: string
}

export type LikeCommunityPostResult = {
  status: 'success' | 'already_liked' | 'failed'
  /** Server-side likes after atomic increment (when available). */
  likes?: number
}

/** Post ids the user already liked. Never throws. */
export async function fetchLikedPostIdsForUser(
  user: CommunityLikeUser
): Promise<string[]> {
  const userCode = user.user_code.trim().toUpperCase()
  const nickname = user.nickname.trim()
  if (!userCode && !nickname) return []

  try {
    let query = supabase.from('community_post_likes').select('post_id')

    if (userCode) {
      query = query.eq('user_code', userCode)
    } else {
      query = query.eq('nickname', nickname)
    }

    const { data, error } = await query

    if (error) {
      console.error('[community_post_likes] fetch failed', error)
      return []
    }

    const ids = (data ?? []).map((row) => String((row as { post_id: string }).post_id))
    console.log('[community_post_likes] fetch success', { count: ids.length })
    return ids
  } catch (err) {
    console.error('[community_post_likes] fetch error', err)
    return []
  }
}

/**
 * Like a post once. Inserts into community_post_likes first;
 * only then atomically increments community_posts.likes via RPC.
 */
export async function likeCommunityPost(
  postId: string,
  user: CommunityLikeUser
): Promise<LikeCommunityPostResult> {
  const id = postId.trim()
  const userCode = user.user_code.trim().toUpperCase()
  const nickname = user.nickname.trim()
  if (!id || (!userCode && !nickname)) return { status: 'failed' }

  try {
    let dupQuery = supabase.from('community_post_likes').select('id').eq('post_id', id)

    if (userCode) {
      dupQuery = dupQuery.eq('user_code', userCode)
    } else {
      dupQuery = dupQuery.eq('nickname', nickname)
    }

    const { data: existing, error: dupError } = await dupQuery.maybeSingle()

    if (dupError) {
      console.error('[community_post_likes] duplicate check failed', dupError)
      return { status: 'failed' }
    }

    if (existing) {
      console.log('[community_post_likes] already liked', { post_id: id })
      return { status: 'already_liked' }
    }

    const { error: insertError } = await supabase.from('community_post_likes').insert({
      post_id: id,
      user_code: userCode || nickname,
      nickname,
    })

    if (insertError) {
      // Unique violation = concurrent duplicate like
      if (insertError.code === '23505') {
        return { status: 'already_liked' }
      }
      console.error('[community_post_likes] insert failed', insertError)
      return { status: 'failed' }
    }

    // Prefer atomic RPC (likes = likes + 1)
    const { data: rpcLikes, error: rpcError } = await supabase.rpc(
      'increment_community_post_likes',
      { p_post_id: id }
    )

    if (!rpcError && rpcLikes != null) {
      const likes = Number(rpcLikes) || 0
      console.log('[community_post_likes] like success (rpc)', { post_id: id, likes })
      return { status: 'success', likes }
    }

    if (rpcError) {
      console.warn('[community_post_likes] RPC missing/failed — fallback update', rpcError.message)
    }

    // Fallback if SQL migration not applied yet (still better than client nextLikes overwrite)
    const { data: post, error: readError } = await supabase
      .from('community_posts')
      .select('likes')
      .eq('id', id)
      .single()

    if (readError) {
      console.error('[community_posts] likes read failed', readError)
      return { status: 'failed' }
    }

    const likes = (Number(post?.likes) || 0) + 1
    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ likes })
      .eq('id', id)

    if (updateError) {
      console.error('[community_posts] likes update failed', updateError)
      return { status: 'failed' }
    }

    console.log('[community_post_likes] like success (fallback)', { post_id: id, likes })
    return { status: 'success', likes }
  } catch (err) {
    console.error('[community_post_likes] like error', err)
    return { status: 'failed' }
  }
}

/** Remove all likes for a post (when post is deleted). Never throws. */
export async function deleteLikesByPostId(postId: string): Promise<void> {
  const id = postId.trim()
  if (!id) return

  try {
    const { error } = await supabase.from('community_post_likes').delete().eq('post_id', id)

    if (error) {
      console.error('[community_post_likes] delete by post failed', error)
      return
    }

    console.log('[community_post_likes] delete by post success', { post_id: id })
  } catch (err) {
    console.error('[community_post_likes] delete by post error', err)
  }
}
