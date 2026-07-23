import { NextRequest, NextResponse } from 'next/server'
import { requirePiSession } from '@/lib/operator-auth-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

/**
 * POST /api/profile/link-pi
 * Body: { nickname: string }
 * Sets profiles.pi_uid = session.uid for that nickname (one Pi uid per profile).
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

  let nickname = ''
  try {
    const body = (await request.json()) as { nickname?: string }
    nickname = body.nickname?.trim() ?? ''
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!nickname) {
    return NextResponse.json({ error: 'nickname required' }, { status: 400 })
  }

  try {
    const admin = createSupabaseAdmin()

    // Prevent stealing: refuse if another profile already owns this pi_uid
    const { data: existingUid } = await admin
      .from('profiles')
      .select('nickname')
      .eq('pi_uid', session.uid)
      .limit(1)
      .maybeSingle()

    if (
      existingUid?.nickname &&
      String(existingUid.nickname).trim().toLowerCase() !== nickname.toLowerCase()
    ) {
      return NextResponse.json(
        { error: 'Pi uid already linked to another nickname' },
        { status: 409 }
      )
    }

    const { data: profile, error: findErr } = await admin
      .from('profiles')
      .select('nickname, pi_uid')
      .ilike('nickname', nickname)
      .limit(1)
      .maybeSingle()

    if (findErr || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    if (profile.pi_uid && String(profile.pi_uid) !== session.uid) {
      return NextResponse.json(
        { error: 'Nickname already linked to a different Pi account' },
        { status: 409 }
      )
    }

    const { error: updErr } = await admin
      .from('profiles')
      .update({ pi_uid: session.uid })
      .ilike('nickname', nickname)

    if (updErr) {
      console.error('[link-pi] update failed', updErr.message)
      return NextResponse.json({ error: 'Link failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true, nickname, pi_uid: session.uid })
  } catch (err) {
    console.error('[link-pi] error', err instanceof Error ? err.message : 'error')
    return NextResponse.json({ error: 'Link failed' }, { status: 500 })
  }
}
