import { NextRequest, NextResponse } from 'next/server'
import {
  assertOperatorAccess,
  assertServiceRoleConfigured,
} from '@/lib/operator-auth-server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

type Body = {
  targetNickname?: string
  amount?: number
  reason?: string
  /** App nickname of grantor — verified as 대질주 master in DB. */
  grantedBy?: string
}

/**
 * POST /api/operator/grant-points
 * 대질주 + DB master (no Pi) OR optional Pi operator.
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

  const grantedBy = body.grantedBy?.trim() ?? ''
  const gate = await assertOperatorAccess(request, grantedBy)
  if (!gate.ok) {
    console.warn('[grant-points] denied', { status: gate.status, reason: gate.reason })
    return NextResponse.json(
      { error: gate.error, code: 'FORBIDDEN', reason: gate.reason },
      { status: gate.status }
    )
  }

  const target = body.targetNickname?.trim() ?? ''
  const amount = Math.floor(Number(body.amount))
  const reason = (body.reason?.trim() || '마스터 포인트 지급').slice(0, 200)

  if (!target || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Invalid target or amount' }, { status: 400 })
  }

  try {
    const admin = createSupabaseAdmin()

    const { data: profile, error: findErr } = await admin
      .from('profiles')
      .select('nickname, total_points')
      .ilike('nickname', target)
      .limit(1)
      .maybeSingle()

    if (findErr) {
      console.error('[grant-points] lookup failed', findErr.message)
      return NextResponse.json({ error: 'Lookup failed' }, { status: 502 })
    }
    if (!profile?.nickname) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const nick = String(profile.nickname)
    const current = Number(profile.total_points) || 0

    const { error: txErr } = await admin.from('points').insert({
      nickname: nick,
      point_type: 'master_grant',
      amount,
      description: reason,
    })

    if (txErr) {
      console.error('[grant-points] points insert failed', txErr.message)
      const { error: updErr } = await admin
        .from('profiles')
        .update({ total_points: current + amount })
        .eq('nickname', nick)
      if (updErr) {
        return NextResponse.json({ error: 'Grant failed' }, { status: 502 })
      }
    } else {
      await admin
        .from('profiles')
        .update({ total_points: current + amount })
        .eq('nickname', nick)
    }

    return NextResponse.json({
      ok: true,
      targetNickname: nick,
      amount,
      grantedBy: gate.label,
      authKind: gate.kind,
    })
  } catch (err) {
    console.error('[grant-points]', err instanceof Error ? err.message : 'error')
    return NextResponse.json({ error: 'Grant failed' }, { status: 500 })
  }
}
