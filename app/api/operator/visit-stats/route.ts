import { NextRequest, NextResponse } from 'next/server'
import { assertOperatorSession } from '@/lib/operator-auth-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

/**
 * GET /api/operator/visit-stats
 * Requires signed Pi session cookie + operator (pi_uid / MASTER_PI_UIDS).
 * Uses service_role RPC get_visitor_stats_for_pi_uid — not client nickname.
 */
export async function GET(request: NextRequest) {
  const gate = await assertOperatorSession(request)
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: gate.status })
  }

  if (!hasSupabaseServiceRole()) {
    return NextResponse.json(
      { error: 'SUPABASE_SERVICE_ROLE_KEY not configured' },
      { status: 503 }
    )
  }

  try {
    const admin = createSupabaseAdmin()
    const { data, error } = await admin.rpc('get_visitor_stats_for_pi_uid', {
      p_pi_uid: gate.user.uid,
    })

    if (error) {
      // Fallback: if Phase 2 RPC missing but env master list matched, aggregate in SQL is unavailable.
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
