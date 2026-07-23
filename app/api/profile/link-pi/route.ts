import { NextRequest, NextResponse } from 'next/server'
import {
  masterPiUidsFromEnv,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'
import { isMasterNickname, MASTER_LEVEL_TITLE, MASTER_ROLE } from '@/lib/master-role'
import { isUidInMasterList } from '@/lib/community-mutate-auth'

export const runtime = 'nodejs'

/**
 * POST /api/profile/link-pi
 * Body: { nickname: string }
 *
 * Sets profiles.pi_uid = verified Pi session.uid for that app nickname.
 * - Does NOT put nicknames into MASTER_PI_UIDS (env must use real Pi UIDs only).
 * - Designated master nickname (대질주): may link when pi_uid empty; also sets
 *   is_master/role. If MASTER_PI_UIDS is non-empty, session uid must be listed.
 */
export async function POST(request: NextRequest) {
  if (!hasSupabaseServiceRole()) {
    return NextResponse.json(
      {
        error:
          'SUPABASE_SERVICE_ROLE_KEY is not configured on the server (required to write profiles.pi_uid)',
        code: 'SERVICE_ROLE_MISSING',
      },
      { status: 503 }
    )
  }

  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json(
      { error: 'Pi session required', code: 'PI_SESSION_REQUIRED' },
      { status: 401 }
    )
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

  const masterEnvList = masterPiUidsFromEnv()
  const isDesignatedMasterNick = isMasterNickname(nickname)

  // If operator allow-list is configured, only those Pi UIDs may claim 대질주.
  if (
    isDesignatedMasterNick &&
    masterEnvList.length > 0 &&
    !isUidInMasterList(session.uid, masterEnvList)
  ) {
    return NextResponse.json(
      {
        error: 'This Pi account is not in MASTER_PI_UIDS; cannot link operator nickname',
        code: 'MASTER_PI_UIDS_MISMATCH',
        session_pi_uid: session.uid,
      },
      { status: 403 }
    )
  }

  try {
    const admin = createSupabaseAdmin()

    const { data: existingUid } = await admin
      .from('profiles')
      .select('nickname, pi_uid')
      .eq('pi_uid', session.uid)
      .limit(1)
      .maybeSingle()

    if (
      existingUid?.nickname &&
      String(existingUid.nickname).trim().toLowerCase() !== nickname.toLowerCase()
    ) {
      return NextResponse.json(
        {
          error: 'Pi uid already linked to another nickname',
          code: 'UID_ALREADY_LINKED',
          linked_nickname: existingUid.nickname,
        },
        { status: 409 }
      )
    }

    const { data: profile, error: findErr } = await admin
      .from('profiles')
      .select('nickname, pi_uid, role, is_master')
      .ilike('nickname', nickname)
      .limit(1)
      .maybeSingle()

    if (findErr) {
      const missingCol =
        /pi_uid/i.test(findErr.message) || findErr.code === '42703'
      console.error('[link-pi] profile fetch failed', findErr.message)
      return NextResponse.json(
        {
          error: missingCol
            ? 'profiles.pi_uid column missing — run supabase/rls_secure_phase2.sql'
            : 'Profile lookup failed',
          code: missingCol ? 'PI_UID_COLUMN_MISSING' : 'LOOKUP_FAILED',
        },
        { status: missingCol ? 503 : 502 }
      )
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found for nickname', code: 'PROFILE_NOT_FOUND' },
        { status: 404 }
      )
    }

    if (profile.pi_uid && String(profile.pi_uid) !== session.uid) {
      return NextResponse.json(
        {
          error: 'Nickname already linked to a different Pi account',
          code: 'NICKNAME_ALREADY_LINKED',
        },
        { status: 409 }
      )
    }

    // Idempotent: already linked
    if (profile.pi_uid && String(profile.pi_uid) === session.uid) {
      if (isDesignatedMasterNick) {
        await admin
          .from('profiles')
          .update({
            role: MASTER_ROLE,
            is_master: true,
            level_title: MASTER_LEVEL_TITLE,
          })
          .ilike('nickname', nickname)
      }
      return NextResponse.json({
        ok: true,
        nickname: String(profile.nickname),
        pi_uid: session.uid,
        already_linked: true,
      })
    }

    const payload: Record<string, unknown> = { pi_uid: session.uid }
    if (isDesignatedMasterNick) {
      payload.role = MASTER_ROLE
      payload.is_master = true
      payload.level_title = MASTER_LEVEL_TITLE
    }

    const { error: updErr } = await admin
      .from('profiles')
      .update(payload)
      .ilike('nickname', nickname)

    if (updErr) {
      const missingCol = /pi_uid/i.test(updErr.message) || updErr.code === '42703'
      console.error('[link-pi] update failed', updErr.message)
      return NextResponse.json(
        {
          error: missingCol
            ? 'profiles.pi_uid column missing — run supabase/rls_secure_phase2.sql'
            : 'Link failed',
          code: missingCol ? 'PI_UID_COLUMN_MISSING' : 'UPDATE_FAILED',
        },
        { status: missingCol ? 503 : 502 }
      )
    }

    return NextResponse.json({
      ok: true,
      nickname: String(profile.nickname),
      pi_uid: session.uid,
      already_linked: false,
      /** Copy this value into MASTER_PI_UIDS — never use Pi username or app nickname. */
      hint: 'Set MASTER_PI_UIDS to this pi_uid on the server (comma-separated if multiple).',
    })
  } catch (err) {
    console.error('[link-pi] error', err instanceof Error ? err.message : 'error')
    return NextResponse.json({ error: 'Link failed', code: 'EXCEPTION' }, { status: 500 })
  }
}

/**
 * GET /api/profile/link-pi
 * Returns current session Pi uid + whether it is linked to a profile.
 * Use session.pi_uid for MASTER_PI_UIDS (not username Wylee090705, not 대질주).
 */
export async function GET(request: NextRequest) {
  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json({
      authenticated: false,
      pi_uid: null,
      pi_username: null,
      linked_nickname: null,
      reason: 'missing_pi_session',
      hint:
        'Complete Pi sign-in (POST /api/pi/auth). If cookies are blocked in Pi Browser, the app sends Authorization: Bearer <sessionToken>. Opening this URL in the address bar only works when the pi_session cookie is stored.',
    })
  }

  if (!hasSupabaseServiceRole()) {
    return NextResponse.json({
      authenticated: true,
      pi_uid: session.uid,
      pi_username: session.username,
      linked_nickname: null,
      serviceRoleConfigured: false,
      warning: 'SUPABASE_SERVICE_ROLE_KEY missing — cannot read profiles.pi_uid',
      masterPiUidsHint:
        'Copy pi_uid into server env MASTER_PI_UIDS (real uid only, not username).',
    })
  }

  try {
    const admin = createSupabaseAdmin()
    const { data } = await admin
      .from('profiles')
      .select('nickname, pi_uid, role, is_master')
      .eq('pi_uid', session.uid)
      .limit(1)
      .maybeSingle()

    return NextResponse.json({
      authenticated: true,
      pi_uid: session.uid,
      pi_username: session.username,
      linked_nickname: data?.nickname != null ? String(data.nickname) : null,
      is_master: data?.is_master === true,
      role: data?.role != null ? String(data.role) : null,
      serviceRoleConfigured: true,
      masterPiUidsConfigured: masterPiUidsFromEnv().length > 0,
      masterPiUidsHint:
        'Copy pi_uid into server env MASTER_PI_UIDS (real uid only, not username).',
    })
  } catch (err) {
    console.error('[link-pi GET]', err instanceof Error ? err.message : 'error')
    return NextResponse.json({
      authenticated: true,
      pi_uid: session.uid,
      pi_username: session.username,
      linked_nickname: null,
      error: 'Lookup failed',
    })
  }
}
