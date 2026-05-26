import { supabase } from '@/lib/supabase'
import {
  buildPremiumAccessState,
  mapSupabasePremiumRow,
  type ProfilePremiumRow,
  type PremiumAccessState,
} from '@/lib/premium-access'
import {
  buildPremiumPaymentPayload,
  type PlanId,
  type PremiumPaymentPayload,
  type PremiumType,
} from '@/lib/premium-plans'

export type { ProfilePremiumRow, PremiumAccessState }

export type PremiumActivationResult = {
  ok: boolean
  state: PremiumAccessState | null
  payload: PremiumPaymentPayload | null
}

const PREMIUM_SELECT =
  'premium_active, premium_type, premium_started_at, premium_expires_at'

/** Load premium fields for a nickname (no expiry sync). */
export async function fetchProfilePremium(
  nickname: string
): Promise<{ ok: boolean; premium: ProfilePremiumRow | null }> {
  const nick = nickname.trim()
  if (!nick) return { ok: true, premium: null }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(PREMIUM_SELECT)
      .ilike('nickname', nick)
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[premium] fetch failed', error)
      return { ok: false, premium: null }
    }

    if (!data) return { ok: true, premium: null }
    return { ok: true, premium: mapSupabasePremiumRow(data as Record<string, unknown>) }
  } catch (err) {
    console.error('[premium] fetch error', err)
    return { ok: false, premium: null }
  }
}

/** If subscription expired, clear premium_active in DB. */
export async function syncExpiredPremiumInDb(nickname: string): Promise<boolean> {
  const nick = nickname.trim()
  if (!nick) return true

  const { ok, premium } = await fetchProfilePremium(nick)
  if (!ok || !premium) return ok

  const state = buildPremiumAccessState(premium)
  if (state.isActive) return true

  if (!premium.premium_active && !premium.premium_expires_at) return true

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        premium_active: false,
      })
      .ilike('nickname', nick)

    if (error) {
      console.error('[premium] expire sync failed', error)
      return false
    }

    console.log('[premium] expired — premium_active set false', { nick })
    return true
  } catch (err) {
    console.error('[premium] expire sync error', err)
    return false
  }
}

/** Fetch premium state and sync expiry with Supabase. */
export async function fetchAndSyncProfilePremium(
  nickname: string
): Promise<{ ok: boolean; state: PremiumAccessState }> {
  const nick = nickname.trim()
  if (!nick) {
    return { ok: true, state: buildPremiumAccessState(null) }
  }

  const { ok, premium } = await fetchProfilePremium(nick)
  if (!ok) {
    return { ok: false, state: buildPremiumAccessState(null) }
  }

  const state = buildPremiumAccessState(premium)
  if (!state.isActive && premium?.premium_active) {
    await syncExpiredPremiumInDb(nick)
    const refreshed = await fetchProfilePremium(nick)
    return {
      ok: true,
      state: buildPremiumAccessState(refreshed.premium),
    }
  }

  return { ok: true, state }
}

/**
 * Activate or extend premium after Pi payment (or dev/test activation).
 * Sets premium_active, premium_type, premium_started_at, premium_expires_at.
 */
export async function activatePremiumSubscription(params: {
  nickname: string
  planId: PlanId
  existingExpiresAt?: string | null
}): Promise<PremiumActivationResult> {
  const nick = params.nickname.trim()
  if (!nick) return { ok: false, state: null, payload: null }

  const payload = buildPremiumPaymentPayload(params.planId, params.existingExpiresAt)
  const nowIso = new Date().toISOString()

  const { ok: readOk, premium: existing } = await fetchProfilePremium(nick)
  const startedAt =
    existing?.premium_started_at && readOk ? existing.premium_started_at : nowIso

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        premium_active: true,
        premium_type: payload.premiumType as PremiumType,
        premium_started_at: startedAt,
        premium_expires_at: payload.premiumExpiresAt,
      })
      .ilike('nickname', nick)

    if (error) {
      console.error('[premium] activate update failed', error, { nick, payload })
      return { ok: false, state: null, payload: null }
    }

    const state = buildPremiumAccessState({
      premium_active: true,
      premium_type: payload.premiumType,
      premium_started_at: startedAt,
      premium_expires_at: payload.premiumExpiresAt,
    })

    console.log('[premium] activate success', { nick, payload, state })
    return { ok: true, state, payload }
  } catch (err) {
    console.error('[premium] activate error', err)
    return { ok: false, state: null, payload: null }
  }
}
