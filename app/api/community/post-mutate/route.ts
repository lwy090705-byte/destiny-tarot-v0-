import { NextRequest, NextResponse } from 'next/server'
import { requirePiSession } from '@/lib/operator-auth-server'
import { assertOperatorSession } from '@/lib/operator-auth-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

type Body = {
  action?: 'delete' | 'hide'
  postId?: string
  /** App nickname claiming ownership (must match post.author unless operator). */
  nickname?: string
}

/**
 * POST /api/community/post-mutate
 * delete | hide — requires Pi session. Author match OR operator.
 * Ownership: post.author must equal claimed nickname AND that nickname's
 * profiles.pi_uid must equal session.uid (or operator).
 */
export async function POST(request: NextRequest) {
  if (!hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured' },
      { status: 503 }
    )
  }

  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Pi session required' }, { status: 401 })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const action = body.action
  const postId = body.postId?.trim()
  const nickname = body.nickname?.trim() ?? ''
  if (!action || !postId) {
    return NextResponse.json({ error: 'action and postId required' }, { status: 400 })
  }

  const admin = createSupabaseAdmin()

  const { data: post, error: postErr } = await admin
    .from('community_posts')
    .select('id, author')
    .eq('id', postId)
    .maybeSingle()

  if (postErr || !post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const author = String(post.author ?? '').trim()
  const operator = await assertOperatorSession(request)
  const isOperator = operator.ok

  let ownsPost = false
  if (nickname && author.toLowerCase() === nickname.toLowerCase()) {
    const { data: profile } = await admin
      .from('profiles')
      .select('pi_uid')
      .ilike('nickname', nickname)
      .limit(1)
      .maybeSingle()

    ownsPost = profile?.pi_uid != null && String(profile.pi_uid) === session.uid
  }

  if (!ownsPost && !isOperator) {
    return NextResponse.json(
      { error: 'Not allowed (link Pi uid to profile or use operator account)' },
      { status: 403 }
    )
  }

  if (action === 'hide') {
    const { error } = await admin.rpc('admin_hide_community_post', {
      p_post_id: postId,
      p_hidden_by: nickname || session.username,
    })
    if (error) {
      const { error: updErr } = await admin
        .from('community_posts')
        .update({
          is_hidden: true,
          hidden_by: nickname || session.username,
          hidden_at: new Date().toISOString(),
        })
        .eq('id', postId)
      if (updErr) {
        console.error('[post-mutate] hide failed', error.message, updErr.message)
        return NextResponse.json({ error: 'Hide failed' }, { status: 502 })
      }
    }
    return NextResponse.json({ ok: true, action: 'hide' })
  }

  if (action === 'delete') {
    const { error } = await admin.rpc('admin_delete_community_post', {
      p_post_id: postId,
    })
    if (error) {
      await admin.from('community_post_likes').delete().eq('post_id', postId)
      await admin.from('community_comments').delete().eq('post_id', postId)
      const { error: delErr } = await admin.from('community_posts').delete().eq('id', postId)
      if (delErr) {
        console.error('[post-mutate] delete failed', error.message, delErr.message)
        return NextResponse.json({ error: 'Delete failed' }, { status: 502 })
      }
    }
    return NextResponse.json({ ok: true, action: 'delete' })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
