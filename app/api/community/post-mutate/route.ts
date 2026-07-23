import { NextRequest, NextResponse } from 'next/server'
import {
  assertOperatorAccess,
  assertServiceRoleConfigured,
  fetchAuthorPiUidByNickname,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'
import { canMutateCommunityContent } from '@/lib/community-mutate-auth'

export const runtime = 'nodejs'

type Body = {
  action?: 'delete' | 'hide' | 'unhide'
  postId?: string
  /** App nickname — required for 대질주 master path; verified against profiles. */
  nickname?: string
}

/**
 * POST /api/community/post-mutate
 * A) 대질주 + DB master flags (no Pi), OR B) Pi operator, OR C) author Pi uid
 */
export async function POST(request: NextRequest) {
  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    return NextResponse.json(
      { error: service.error, code: 'SERVICE_ROLE_MISSING' },
      { status: 503 }
    )
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
    return NextResponse.json(
      { error: 'action and postId required' },
      { status: 400 }
    )
  }

  const operator = await assertOperatorAccess(request, nickname)
  const isDaejiljuMaster = operator.ok && operator.kind === 'daejilju'
  const isPiOperator = operator.ok && operator.kind === 'pi'
  const session = requirePiSession(request)

  if (!operator.ok && !session) {
    console.warn('[post-mutate] 401', { reason: operator.reason ?? 'no_session' })
    return NextResponse.json(
      {
        error: 'Operator nickname or Pi session required',
        code: 'AUTH_REQUIRED',
        reason: operator.reason,
      },
      { status: 401 }
    )
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
  const authorPiUid = await fetchAuthorPiUidByNickname(author)

  const gate = canMutateCommunityContent({
    isDaejiljuMaster,
    isPiOperator,
    sessionPiUid: session?.uid ?? '',
    authorPiUid,
  })

  if (!gate.allowed) {
    console.warn('[post-mutate] 403', {
      reason: gate.reason,
      operatorReason: operator.ok ? null : operator.reason,
      isDaejiljuMaster,
      isPiOperator,
    })
    return NextResponse.json(
      {
        error: 'No permission to modify this post',
        code: 'FORBIDDEN',
        reason: gate.reason,
      },
      { status: 403 }
    )
  }

  const isOperator = isDaejiljuMaster || isPiOperator
  const hiddenByLabel =
    nickname || (operator.ok ? operator.label : session?.username) || 'operator'

  if (action === 'hide' || action === 'unhide') {
    if (!isOperator) {
      return NextResponse.json(
        { error: 'Only operators can hide/unhide posts', code: 'FORBIDDEN' },
        { status: 403 }
      )
    }

    if (action === 'hide') {
      const { error } = await admin.rpc('admin_hide_community_post', {
        p_post_id: postId,
        p_hidden_by: hiddenByLabel,
      })
      if (error) {
        const { error: updErr } = await admin
          .from('community_posts')
          .update({
            is_hidden: true,
            hidden_by: hiddenByLabel,
            hidden_at: new Date().toISOString(),
          })
          .eq('id', postId)
        if (updErr) {
          console.error('[post-mutate] hide failed', updErr.message)
          return NextResponse.json({ error: 'Hide failed' }, { status: 502 })
        }
      }
      return NextResponse.json({ ok: true, action: 'hide', auth: gate.reason })
    }

    const { error: updErr } = await admin
      .from('community_posts')
      .update({
        is_hidden: false,
        hidden_by: null,
        hidden_at: null,
      })
      .eq('id', postId)
    if (updErr) {
      console.error('[post-mutate] unhide failed', updErr.message)
      return NextResponse.json({ error: 'Unhide failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true, action: 'unhide', auth: gate.reason })
  }

  if (action === 'delete') {
    const { error } = await admin.rpc('admin_delete_community_post', {
      p_post_id: postId,
    })
    if (error) {
      await admin.from('community_post_likes').delete().eq('post_id', postId)
      await admin.from('community_comments').delete().eq('post_id', postId)
      const { error: delErr } = await admin
        .from('community_posts')
        .delete()
        .eq('id', postId)
      if (delErr) {
        console.error('[post-mutate] delete failed', delErr.message)
        return NextResponse.json({ error: 'Delete failed' }, { status: 502 })
      }
    }
    return NextResponse.json({ ok: true, action: 'delete', auth: gate.reason })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
