'use client'

/**
 * Premium subscription hook — re-export from PremiumProvider context.
 * Use `usePremium()` in components; access rules live in `lib/premium-access.ts`.
 */
export { usePremium, usePremiumOptional, PremiumProvider } from '@/lib/premium-context'
export type { PremiumAccessState, PremiumBenefits } from '@/lib/premium-access'
export {
  shouldHideAds,
  shouldSkipFortunePointCharge,
  isMbtiSectionUnlocked,
  canAccessMbtiLoveFeature,
} from '@/lib/premium-access'
