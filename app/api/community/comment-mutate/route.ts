import { NextRequest, NextResponse } from 'next/server'
import {
  assertOperatorSession,
  assertServiceRoleConfigured,
  fetchAuthorPiUidByNickname,
  fetchProfileByPiUid,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'
import { canMutateCommunityContent } from '@/lib/community-mutate-auth'

export const runtime = 'nodejs'

type Body = {
  action?: 'delete' | 'hide'
  commentId?: string
  nickname?: string
}

/**
 * POST /api/community/comment-mutate
 * Same trust model as post-mutate (Pi session + pi_uid / operator).
 */
export async function POST(request: NextRequest) {
  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    return NextResponse.json(
      { error: service.error, code: 'SERVICE_ROLE_MISSING' },
      { status: 503 }
    )
  }

  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json(
      { error: 'Pi login required', code: 'PI_SESSION_REQUIRED' },
      { status: 401 }
    )
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const action = body.action
  const commentId = body.commentId?.trim()
  if (!action || !commentId) {
    return NextResponse.json(
      { error: 'action and commentId required' },
      { status: 400 }
    )
  }

  const operator = await assertOperatorSession(request)
  const isPiOperator = operator.ok === true

  const admin = createSupabaseAdmin()
  const { data: comment, error: cErr } = await admin
    .from('community_comments')
    .select('id, author, post_id')
    .eq('id', commentId)
    .maybeSingle()

  if (cErr || !comment) {
    return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
  }

  const author = String(comment.author ?? '').trim()
  const authorPiUid = await fetchAuthorPiUidByNickname(author)

  const gate = canMutateCommunityContent({
    isPiOperator,
    sessionPiUid: session.uid,
    authorPiUid,
  })

  if (!gate.allowed) {
    return NextResponse.json(
      { error: 'No permission to modify this comment', code: 'FORBIDDEN' },
      { status: 403 }
    )
  }

  const hiddenByLabel =
    body.nickname?.trim() ||
    (operator.ok ? operator.user.username : session.username) ||
    'operator'

  if (action === 'hide') {
    if (!isPiOperator) {
      return NextResponse.json(
        { error: 'Only operators can hide comments', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }
    const { error } = await admin.rpc('admin_hide_community_comment', {
      p_comment_id: commentId,
      p_hidden_by: hiddenByLabel,
    })
    if (error) {
      const { error: updErr } = await admin
        .from('community_comments')
        .update({
          is_hidden: true,
          hidden_by: hiddenByLabel,
          hidden_at: new Date().toISOString(),
        })
        .eq('id', commentId)
      if (updErr) {
        return NextResponse.json({ error: 'Hide failed' }, { status: 502 })
      }
    }
    return NextResponse.json({ ok: true, action: 'hide', auth: gate.reason })
  }

  if (action === 'delete') {
    const { error } = await admin.rpc('admin_delete_community_comment', {
      p_comment_id: commentId,
    })
    if (error) {
      const { error: delErr } = await admin
        .from('community_comments')
        .delete()
        .eq('id', commentId)
      if (delErr) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 502 })
      }
    }
    // Adjust counter best-effort
    const postId = comment.post_id != null ? String(comment.post_id) : ''
    if (postId) {
      await admin.rpc('adjust_community_post_comments', {
        p_post_id: postId,
        p_delta: -1,
      })
    }
    return NextResponse.json({ ok: true, action: 'delete', auth: gate.reason })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
