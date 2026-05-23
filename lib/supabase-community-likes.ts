import { supabase } from '@/lib/supabase'

/**
 * Required table: community_post_likes
 * - id uuid PK default gen_random_uuid()
 * - created_at timestamptz default now()
 * - post_id uuid (FK community_posts)
 * - user_code text
 * - nickname text
 * See: supabase/community_post_likes.sql
 */

export type CommunityLikeUser = {
  user_code: string
  nickname: string
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

/** Like a post once; increments community_posts.likes. Never throws. */
export async function likeCommunityPost(
  postId: string,
  user: CommunityLikeUser
): Promise<'success' | 'already_liked' | 'failed'> {
  const id = postId.trim()
  const userCode = user.user_code.trim().toUpperCase()
  const nickname = user.nickname.trim()
  if (!id || (!userCode && !nickname)) return 'failed'

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
      return 'failed'
    }

    if (existing) {
      console.log('[community_post_likes] already liked', { post_id: id })
      return 'already_liked'
    }

    const { error: insertError } = await supabase.from('community_post_likes').insert({
      post_id: id,
      user_code: userCode || nickname,
      nickname,
    })

    if (insertError) {
      console.error('[community_post_likes] insert failed', insertError)
      return 'failed'
    }

    const { data: post, error: readError } = await supabase
      .from('community_posts')
      .select('likes')
      .eq('id', id)
      .single()

    if (readError) {
      console.error('[community_posts] likes read failed', readError)
      return 'failed'
    }

    const nextLikes = (Number(post?.likes) || 0) + 1

    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ likes: nextLikes })
      .eq('id', id)

    if (updateError) {
      console.error('[community_posts] likes update failed', updateError)
      return 'failed'
    }

    console.log('[community_post_likes] like success', { post_id: id, likes: nextLikes })
    return 'success'
  } catch (err) {
    console.error('[community_post_likes] like error', err)
    return 'failed'
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
