import type { NextRequest } from 'next/server'
import { readPiSessionFromRequest, type PiVerifiedUser } from '@/lib/pi-session-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'
import {
  isUidInMasterList,
  parseMasterPiUidsEnv,
} from '@/lib/community-mutate-auth'

/** Comma-separated Pi UIDs allowed as operators (server env only). */
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
 * Operator = verified Pi session AND
 * (uid ∈ MASTER_PI_UIDS OR profiles.pi_uid match with is_master / role master|operator).
 * Does not use client nickname.
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
