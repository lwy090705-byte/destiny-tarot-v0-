/** localStorage key for invite Deep-Link Prefill (must stay stable across refreshes). */
export const PENDING_REFERRAL_CODE_KEY = 'pendingReferralCode'

const SHARE_INVITE_DEFAULT_BASE = 'https://www.destiny-tarot.kr/share'

/** Same validation rule as applyReferralCode in user-context. */
const REFERRAL_CODE_RE = /^[A-Z0-9]{6}$/

export function normalizeShareReferralCode(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  const u = String(raw).trim().toUpperCase()
  return REFERRAL_CODE_RE.test(u) ? u : null
}

/**
 * Base URL for invite links (no trailing slash). Example: https://www.destiny-tarot.kr/share
 * Override with NEXT_PUBLIC_SHARE_INVITE_BASE if needed.
 */
export function getShareInviteBaseUrl(): string {
  const raw =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SHARE_INVITE_BASE
      ? process.env.NEXT_PUBLIC_SHARE_INVITE_BASE.trim()
      : SHARE_INVITE_DEFAULT_BASE
  return raw.replace(/\/$/, '')
}

/** Published invite URL shown/shared by referrer — `{base}/{CODE}`. */
export function buildInviteShareUrl(referralCode: string): string {
  const code = referralCode.trim().toUpperCase()
  const base = getShareInviteBaseUrl()
  return `${base}/${code}`
}
