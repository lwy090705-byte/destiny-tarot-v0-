import { NextRequest, NextResponse } from 'next/server'
import {
  assertServiceRoleConfigured,
  masterPiUidsFromEnv,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { createSupabaseAdmin } from '@/lib/supabase-admin'
import { isUidInMasterList } from '@/lib/community-mutate-auth'
import { MASTER_LEVEL_TITLE, MASTER_ROLE } from '@/lib/master-role'

export const runtime = 'nodejs'

/** TEMP_PI_PROFILE_MIGRATION — fixed nicknames for this one-time transfer */
const SOURCE_NICK = '파이조아'
const TARGET_NICK = '대질주'

type Body = {
  sourceNickname?: string
  targetNickname?: string
}

/**
 * TEMP_PI_PROFILE_MIGRATION
 * POST /api/operator/migrate-pi-profile
 *
 * Moves pi_uid + master flags from 파이조아 → 대질주.
 * Auth: Pi session uid must match source.pi_uid OR be in MASTER_PI_UIDS.
 * Does not trust client nickname alone.
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

  const sourceNickname = (body.sourceNickname ?? '').trim()
  const targetNickname = (body.targetNickname ?? '').trim()

  if (
    sourceNickname.toLowerCase() !== SOURCE_NICK.toLowerCase() ||
    targetNickname.toLowerCase() !== TARGET_NICK.toLowerCase()
  ) {
    return NextResponse.json(
      {
        error: 'Only the fixed one-time migration pair is allowed',
        code: 'INVALID_PAIR',
      },
      { status: 400 }
    )
  }

  const admin = createSupabaseAdmin()
  const inMasterList = isUidInMasterList(session.uid, masterPiUidsFromEnv())

  const { data: source, error: srcErr } = await admin
    .from('profiles')
    .select('nickname, pi_uid, role, is_master')
    .ilike('nickname', SOURCE_NICK)
    .limit(1)
    .maybeSingle()

  if (srcErr) {
    console.error('[migrate-pi] source lookup failed')
    return NextResponse.json({ error: 'Lookup failed' }, { status: 502 })
  }
  if (!source) {
    return NextResponse.json(
      { error: 'Source profile not found', code: 'SOURCE_NOT_FOUND' },
      { status: 404 }
    )
  }

  const { data: target, error: tgtErr } = await admin
    .from('profiles')
    .select('nickname, pi_uid, role, is_master')
    .ilike('nickname', TARGET_NICK)
    .limit(1)
    .maybeSingle()

  if (tgtErr) {
    console.error('[migrate-pi] target lookup failed')
    return NextResponse.json({ error: 'Lookup failed' }, { status: 502 })
  }
  if (!target) {
    return NextResponse.json(
      { error: 'Target profile not found', code: 'TARGET_NOT_FOUND' },
      { status: 404 }
    )
  }

  const sourceUid = source.pi_uid != null ? String(source.pi_uid).trim() : ''
  const ownsSource = sourceUid !== '' && sourceUid === session.uid

  if (!ownsSource && !inMasterList) {
    return NextResponse.json(
      {
        error: 'Current Pi account is not linked to source profile',
        code: 'FORBIDDEN',
      },
      { status: 403 }
    )
  }

  const targetUid = target.pi_uid != null ? String(target.pi_uid).trim() : ''
  if (targetUid && targetUid !== session.uid) {
    return NextResponse.json(
      {
        error: 'Target already linked to a different Pi account',
        code: 'TARGET_LINKED',
      },
      { status: 409 }
    )
  }

  // Prefer atomic RPC; fallback to ordered updates if RPC missing
  const { data: rpcData, error: rpcError } = await admin.rpc(
    'migrate_pi_profile_link',
    {
      p_source_nickname: SOURCE_NICK,
      p_target_nickname: TARGET_NICK,
      p_session_pi_uid: session.uid,
    }
  )

  if (!rpcError && rpcData) {
    const o = rpcData as Record<string, unknown>
    return NextResponse.json({
      success: true,
      pi_uid: String(o.pi_uid ?? session.uid),
      source_nickname: String(o.source_nickname ?? SOURCE_NICK),
      target_nickname: String(o.target_nickname ?? TARGET_NICK),
      linked_nickname: String(o.linked_nickname ?? TARGET_NICK),
      is_master: true,
      role: MASTER_ROLE,
    })
  }

  if (rpcError) {
    const msg = rpcError.message ?? ''
    if (/not found|P0002|source profile|target profile/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 404 })
    }
    if (/42501|does not own|not authorized/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 403 })
    }
    if (/23505|already linked/i.test(msg)) {
      return NextResponse.json({ error: msg }, { status: 409 })
    }
    // Function missing → sequential fallback (still best-effort ordered)
    if (!/Could not find|PGRST202|function/i.test(msg)) {
      console.error('[migrate-pi] rpc failed')
      return NextResponse.json({ error: 'Migration failed' }, { status: 502 })
    }
  }

  // --- Fallback without RPC (same order as SQL) ---
  const { error: clearErr } = await admin
    .from('profiles')
    .update({ pi_uid: null })
    .eq('pi_uid', session.uid)

  if (clearErr) {
    console.error('[migrate-pi] clear uid failed')
    return NextResponse.json({ error: 'Migration failed' }, { status: 502 })
  }

  const { error: demoteErr } = await admin
    .from('profiles')
    .update({ pi_uid: null, is_master: false, role: 'user' })
    .ilike('nickname', SOURCE_NICK)

  if (demoteErr) {
    console.error('[migrate-pi] demote source failed')
    return NextResponse.json({ error: 'Migration failed' }, { status: 502 })
  }

  const { error: promoteErr } = await admin
    .from('profiles')
    .update({
      pi_uid: session.uid,
      is_master: true,
      role: MASTER_ROLE,
      level_title: MASTER_LEVEL_TITLE,
    })
    .ilike('nickname', TARGET_NICK)

  if (promoteErr) {
    console.error('[migrate-pi] promote target failed')
    return NextResponse.json({ error: 'Migration failed' }, { status: 502 })
  }

  return NextResponse.json({
    success: true,
    pi_uid: session.uid,
    source_nickname: String(source.nickname ?? SOURCE_NICK),
    target_nickname: String(target.nickname ?? TARGET_NICK),
    linked_nickname: String(target.nickname ?? TARGET_NICK),
    is_master: true,
    role: MASTER_ROLE,
  })
}
