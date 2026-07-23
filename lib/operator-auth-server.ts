import type { NextRequest } from 'next/server'
import { readPiSessionFromRequest, type PiVerifiedUser } from '@/lib/pi-session-server'
import { createSupabaseAdmin, hasSupabaseServiceRole } from '@/lib/supabase-admin'

/** Comma-separated Pi UIDs allowed as operators (env fallback before pi_uid column is filled). */
function masterPiUidsFromEnv(): Set<string> {
  const raw = process.env.MASTER_PI_UIDS ?? process.env.OPERATOR_PI_UIDS ?? ''
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  )
}

export function requirePiSession(request: NextRequest): PiVerifiedUser | null {
  return readPiSessionFromRequest(request)
}

/**
 * Operator = verified Pi session AND
 * (env MASTER_PI_UIDS contains uid OR profiles.pi_uid matches with is_master/role).
 * Never trusts client-supplied nickname alone.
 */
export async function assertOperatorSession(
  request: NextRequest
): Promise<{ ok: true; user: PiVerifiedUser } | { ok: false; status: number; error: string }> {
  const user = requirePiSession(request)
  if (!user) {
    return { ok: false, status: 401, error: 'Pi session required' }
  }

  if (masterPiUidsFromEnv().has(user.uid)) {
    return { ok: true, user }
  }

  if (!hasSupabaseServiceRole()) {
    return { ok: false, status: 503, error: 'Server admin client not configured' }
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

    const role = String(data?.role ?? '').toLowerCase()
    const allowed =
      data != null &&
      (data.is_master === true || role === 'master' || role === 'operator')

    if (!allowed) {
      return { ok: false, status: 403, error: 'Not an operator' }
    }

    return { ok: true, user }
  } catch (err) {
    console.error('[operator] assert failed', err instanceof Error ? err.message : 'error')
    return { ok: false, status: 500, error: 'Operator check failed' }
  }
}
