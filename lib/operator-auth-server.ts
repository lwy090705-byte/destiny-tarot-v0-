import type { NextRequest } from 'next/server'
import { readPiSessionFromRequest, type PiVerifiedUser } from '@/lib/pi-session-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'
import {
  isUidInMasterList,
  parseMasterPiUidsEnv,
} from '@/lib/community-mutate-auth'
import { isMasterNickname, MASTER_NICKNAME, MASTER_ROLE } from '@/lib/master-role'

/** Comma-separated Pi UIDs allowed as operators (server env only). Optional path. */
export function masterPiUidsFromEnv(): string[] {
  return parseMasterPiUidsEnv(
    process.env.MASTER_PI_UIDS ?? process.env.OPERATOR_PI_UIDS
  )
}

export function requirePiSession(request: NextRequest): PiVerifiedUser | null {
  return readPiSessionFromRequest(request)
}

export function assertServiceRoleConfigured():
  | { ok: true }
  | { ok: false; status: 503; error: string } {
  if (!hasSupabaseServiceRole()) {
    return {
      ok: false,
      status: 503,
      error:
        'SUPABASE_SERVICE_ROLE_KEY is not configured on the server (must not be NEXT_PUBLIC_)',
    }
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      '[security] NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY must not be set — remove it'
    )
  }
  return { ok: true }
}

/**
 * 대질주 master: app nickname === '대질주' AND profiles.role=master AND is_master=true.
 * Does NOT use pi_uid / MASTER_PI_UIDS.
 */
export async function assertDaejiljuMaster(nickname: string | undefined | null): Promise<
  | { ok: true; nickname: string }
  | { ok: false; status: 403 | 503; error: string; reason: string }
> {
  const nick = (nickname ?? '').trim()
  if (!isMasterNickname(nick)) {
    return {
      ok: false,
      status: 403,
      error: 'Not an operator',
      reason: 'nickname_not_daejilju',
    }
  }

  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    return { ...service, reason: 'service_role_missing' }
  }

  try {
    const admin = createSupabaseAdmin()
    const { data, error } = await admin
      .from('profiles')
      .select('nickname, role, is_master')
      .eq('nickname', MASTER_NICKNAME)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[operator] daejilju profile lookup failed', error.message)
      return {
        ok: false,
        status: 503,
        error: 'Profile lookup failed',
        reason: 'profile_lookup_failed',
      }
    }

    const role = String(data?.role ?? '')
      .toLowerCase()
      .trim()
    const isDaejiljuMaster =
      data != null &&
      String(data.nickname).trim() === MASTER_NICKNAME &&
      role === MASTER_ROLE &&
      data.is_master === true

    if (!isDaejiljuMaster) {
      console.warn('[operator] daejilju denied — profile flags', {
        reason: 'profile_not_master',
        hasRow: Boolean(data),
        role,
        is_master: data?.is_master === true,
      })
      return {
        ok: false,
        status: 403,
        error: 'Not an operator',
        reason: 'profile_not_master',
      }
    }

    return { ok: true, nickname: MASTER_NICKNAME }
  } catch (err) {
    console.error(
      '[operator] daejilju assert error',
      err instanceof Error ? err.message : 'error'
    )
    return {
      ok: false,
      status: 503,
      error: 'Operator check failed',
      reason: 'exception',
    }
  }
}

/**
 * Optional Pi operator path (MASTER_PI_UIDS or linked pi_uid master).
 * Not used for 대질주.
 */
export async function assertOperatorSession(
  request: NextRequest
): Promise<
  | { ok: true; user: PiVerifiedUser }
  | { ok: false; status: number; error: string }
> {
  const user = requirePiSession(request)
  if (!user) {
    return { ok: false, status: 401, error: 'Pi session required' }
  }

  if (isUidInMasterList(user.uid, masterPiUidsFromEnv())) {
    return { ok: true, user }
  }

  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    return service
  }

  try {
    const admin = createSupabaseAdmin()
    const { data, error } = await admin
      .from('profiles')
      .select('pi_uid, is_master, role')
      .eq('pi_uid', user.uid)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[operator] profile lookup failed')
      return { ok: false, status: 500, error: 'Operator check failed' }
    }

    const role = String(data?.role ?? '').toLowerCase().trim()
    const allowed =
      data != null &&
      String(data.pi_uid ?? '') === user.uid &&
      (data.is_master === true || role === 'master' || role === 'operator')

    if (!allowed) {
      return { ok: false, status: 403, error: 'Not an operator' }
    }

    return { ok: true, user }
  } catch (err) {
    console.error(
      '[operator] assert failed',
      err instanceof Error ? err.message : 'error'
    )
    return { ok: false, status: 500, error: 'Operator check failed' }
  }
}

export type OperatorAccess =
  | { ok: true; kind: 'daejilju'; label: string }
  | { ok: true; kind: 'pi'; user: PiVerifiedUser; label: string }
  | { ok: false; status: number; error: string; reason?: string }

/**
 * A) 대질주 nickname + DB master flags (no Pi required), OR
 * B) Optional Pi MASTER_PI_UIDS / linked operator
 */
export async function assertOperatorAccess(
  request: NextRequest,
  nickname?: string | null
): Promise<OperatorAccess> {
  const dae = await assertDaejiljuMaster(nickname)
  if (dae.ok) {
    return { ok: true, kind: 'daejilju', label: dae.nickname }
  }

  const pi = await assertOperatorSession(request)
  if (pi.ok) {
    return {
      ok: true,
      kind: 'pi',
      user: pi.user,
      label: pi.user.username,
    }
  }

  const hasNick = Boolean((nickname ?? '').trim())
  const hasPi = Boolean(requirePiSession(request))

  if (!hasNick && !hasPi) {
    console.warn('[operator] denied — no nickname and no Pi session', {
      reason: 'no_credentials',
    })
    return {
      ok: false,
      status: 401,
      error: 'Operator nickname or Pi session required',
      reason: 'no_credentials',
    }
  }

  console.warn('[operator] denied', {
    reason: dae.reason ?? 'not_operator',
    piStatus: pi.status,
    nicknameProvided: hasNick,
    isDaejiljuNick: isMasterNickname(nickname),
  })

  return {
    ok: false,
    status: dae.status === 503 ? 503 : 403,
    error: dae.error,
    reason: dae.reason,
  }
}

/** Load profile linked to a Pi uid (service role). */
export async function fetchProfileByPiUid(piUid: string): Promise<{
  nickname: string | null
  is_master: boolean
  role: string | null
  pi_uid: string | null
} | null> {
  const admin = createSupabaseAdmin()
  const { data, error } = await admin
    .from('profiles')
    .select('nickname, is_master, role, pi_uid')
    .eq('pi_uid', piUid)
    .limit(1)
    .maybeSingle()

  if (error || !data) return null
  return {
    nickname: data.nickname != null ? String(data.nickname) : null,
    is_master: data.is_master === true,
    role: data.role != null ? String(data.role) : null,
    pi_uid: data.pi_uid != null ? String(data.pi_uid) : null,
  }
}

/** Resolve author's linked pi_uid from profiles by author nickname (display name). */
export async function fetchAuthorPiUidByNickname(
  authorNickname: string
): Promise<string | null> {
  const nick = authorNickname.trim()
  if (!nick) return null
  const admin = createSupabaseAdmin()
  const { data, error } = await admin
    .from('profiles')
    .select('pi_uid')
    .ilike('nickname', nick)
    .limit(1)
    .maybeSingle()

  if (error || !data?.pi_uid) return null
  return String(data.pi_uid)
}
