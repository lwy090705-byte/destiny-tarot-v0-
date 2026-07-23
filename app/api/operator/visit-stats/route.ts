import { NextRequest, NextResponse } from 'next/server'
import { assertOperatorAccess } from '@/lib/operator-auth-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'
import { MASTER_NICKNAME } from '@/lib/master-role'

export const runtime = 'nodejs'

/**
 * GET /api/operator/visit-stats?nickname=
 * 대질주 + DB master (no Pi) OR optional Pi operator.
 */
export async function GET(request: NextRequest) {
  const nickname = request.nextUrl.searchParams.get('nickname')?.trim() ?? ''
  const gate = await assertOperatorAccess(request, nickname)
  if (!gate.ok) {
    console.warn('[visit-stats] denied', { status: gate.status, reason: gate.reason })
    return NextResponse.json(
      { error: gate.error, reason: gate.reason },
      { status: gate.status }
    )
  }

  if (!hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured' },
      { status: 503 }
    )
  }

  try {
    const admin = createSupabaseAdmin()

    if (gate.kind === 'pi') {
      const { data, error } = await admin.rpc('get_visitor_stats_for_pi_uid', {
        p_pi_uid: gate.user.uid,
      })
      if (!error && data) {
        const o = data as Record<string, unknown>
        return NextResponse.json({
          daily: Number(o.daily) || 0,
          weekly: Number(o.weekly) || 0,
          monthly: Number(o.monthly) || 0,
          total: Number(o.total) || 0,
          timezone: o.timezone ?? 'Asia/Seoul',
          today: o.today ?? null,
        })
      }
    }

    const { data, error } = await admin.rpc('get_visitor_stats', {
      p_requester_nickname: MASTER_NICKNAME,
    })

    if (error) {
      console.error('[visit-stats] rpc failed', error.message)
      return NextResponse.json({ error: 'Stats unavailable' }, { status: 502 })
    }

    const o = (data ?? {}) as Record<string, unknown>
    return NextResponse.json({
      daily: Number(o.daily) || 0,
      weekly: Number(o.weekly) || 0,
      monthly: Number(o.monthly) || 0,
      total: Number(o.total) || 0,
      timezone: o.timezone ?? 'Asia/Seoul',
      today: o.today ?? null,
    })
  } catch (err) {
    console.error('[visit-stats] error', err instanceof Error ? err.message : 'error')
    return NextResponse.json({ error: 'Stats failed' }, { status: 500 })
  }
}
