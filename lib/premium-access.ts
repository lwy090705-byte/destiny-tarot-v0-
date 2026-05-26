import type { PremiumType } from '@/lib/premium-plans'

/** Raw profile columns from Supabase. */
export type ProfilePremiumRow = {
  premium_active: boolean | null
  premium_type: PremiumType | null
  premium_started_at: string | null
  premium_expires_at: string | null
}

export type PremiumBenefits = {
  hideAds: boolean
  unlimitedTarot: boolean
  unlimitedCompatibility: boolean
  unlimitedFortune: boolean
  mbtiPremiumReport: boolean
  mbtiLoveAnalysis: boolean
  mbtiCompatPremium: boolean
}

export type PremiumAccessState = {
  premium_active: boolean
  premium_type: PremiumType | null
  premium_started_at: string | null
  premium_expires_at: string | null
  /** Derived: active subscription (not expired). */
  isActive: boolean
  benefits: PremiumBenefits
}

const INACTIVE_BENEFITS: PremiumBenefits = {
  hideAds: false,
  unlimitedTarot: false,
  unlimitedCompatibility: false,
  unlimitedFortune: false,
  mbtiPremiumReport: false,
  mbtiLoveAnalysis: false,
  mbtiCompatPremium: false,
}

export const EMPTY_PREMIUM_ACCESS: PremiumAccessState = {
  premium_active: false,
  premium_type: null,
  premium_started_at: null,
  premium_expires_at: null,
  isActive: false,
  benefits: INACTIVE_BENEFITS,
}

export function isPremiumNotExpired(
  premiumExpiresAt: string | null | undefined,
  nowMs: number = Date.now()
): boolean {
  if (!premiumExpiresAt) return false
  const expires = new Date(premiumExpiresAt).getTime()
  return !Number.isNaN(expires) && expires > nowMs
}

/** Active only when DB flag is true and expiry is in the future. */
export function computePremiumIsActive(
  row: Pick<ProfilePremiumRow, 'premium_active' | 'premium_expires_at'>,
  nowMs: number = Date.now()
): boolean {
  if (!row.premium_active) return false
  return isPremiumNotExpired(row.premium_expires_at, nowMs)
}

export function resolvePremiumBenefits(
  premiumType: PremiumType | null,
  isActive: boolean
): PremiumBenefits {
  if (!isActive) return INACTIVE_BENEFITS

  return {
    hideAds: true,
    unlimitedTarot: true,
    unlimitedCompatibility: true,
    unlimitedFortune: true,
    mbtiPremiumReport: true,
    mbtiLoveAnalysis: true,
    mbtiCompatPremium: premiumType === 'yearly',
  }
}

export function buildPremiumAccessState(
  row: ProfilePremiumRow | null,
  nowMs: number = Date.now()
): PremiumAccessState {
  if (!row) return { ...EMPTY_PREMIUM_ACCESS }

  const isActive = computePremiumIsActive(row, nowMs)
  const premiumType = isActive ? row.premium_type : null

  return {
    premium_active: isActive,
    premium_type: premiumType,
    premium_started_at: row.premium_started_at,
    premium_expires_at: row.premium_expires_at,
    isActive,
    benefits: resolvePremiumBenefits(premiumType, isActive),
  }
}

export function mapSupabasePremiumRow(data: Record<string, unknown>): ProfilePremiumRow {
  return {
    premium_active: data.premium_active === true,
    premium_type: (data.premium_type as PremiumType | null) ?? null,
    premium_started_at: data.premium_started_at ? String(data.premium_started_at) : null,
    premium_expires_at: data.premium_expires_at ? String(data.premium_expires_at) : null,
  }
}

export function shouldHideAds(access: PremiumAccessState): boolean {
  return access.benefits.hideAds
}

export function shouldSkipFortunePointCharge(
  access: PremiumAccessState,
  feature: 'tarot' | 'compatibility' | 'daily' | 'myungli' | 'mbti' | 'mbti_feature'
): boolean {
  if (!access.isActive) return false
  switch (feature) {
    case 'tarot':
      return access.benefits.unlimitedTarot
    case 'compatibility':
      return access.benefits.unlimitedCompatibility
    case 'daily':
    case 'myungli':
    case 'mbti':
    case 'mbti_feature':
      return access.benefits.unlimitedFortune
    default:
      return false
  }
}

export function isMbtiSectionUnlocked(
  access: PremiumAccessState,
  section: string
): boolean {
  if (!access.isActive) return false
  if (section === 'detailed') return access.benefits.mbtiPremiumReport
  if (section.startsWith('compat-')) return access.benefits.mbtiCompatPremium
  return false
}

export function canAccessMbtiLoveFeature(access: PremiumAccessState): boolean {
  return access.benefits.mbtiLoveAnalysis
}
