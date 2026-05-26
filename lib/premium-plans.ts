/** Fixed premium subscription plans — single source of truth for UI and backend. */

export type PremiumType = 'monthly' | 'quarterly' | 'yearly'

export type PlanId = PremiumType

export type PremiumPlanDef = {
  id: PlanId
  pricePi: number
  premiumType: PremiumType
  durationMonths: number
  badge: 'popular' | 'best' | null
  color: string
  borderColor: string
  featureKey:
    | 'premium.featuresMonthly'
    | 'premium.featuresQuarterly'
    | 'premium.featuresYearly'
  periodKey: 'premium.periodMonth' | 'premium.periodQuarter' | 'premium.periodYear'
}

/** Lookup map — single source for price / premium_type by plan id. */
export const PREMIUM_PLANS_BY_ID: Record<PlanId, PremiumPlanDef> = {
  monthly: {
    id: 'monthly',
    pricePi: 20,
    premiumType: 'monthly',
    durationMonths: 1,
    badge: null,
    color: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-300',
    featureKey: 'premium.featuresMonthly',
    periodKey: 'premium.periodMonth',
  },
  quarterly: {
    id: 'quarterly',
    pricePi: 50,
    premiumType: 'quarterly',
    durationMonths: 3,
    badge: 'popular',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-300',
    featureKey: 'premium.featuresQuarterly',
    periodKey: 'premium.periodQuarter',
  },
  yearly: {
    id: 'yearly',
    pricePi: 300,
    premiumType: 'yearly',
    durationMonths: 12,
    badge: 'best',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-300',
    featureKey: 'premium.featuresYearly',
    periodKey: 'premium.periodYear',
  },
}

export const PREMIUM_PLANS: readonly PremiumPlanDef[] = [
  PREMIUM_PLANS_BY_ID.monthly,
  PREMIUM_PLANS_BY_ID.quarterly,
  PREMIUM_PLANS_BY_ID.yearly,
]

export const DEFAULT_PREMIUM_PLAN_ID: PlanId = 'quarterly'

export function getPremiumPlan(planId: PlanId): PremiumPlanDef {
  const plan = PREMIUM_PLANS_BY_ID[planId]
  if (!plan) {
    throw new Error(`Unknown premium plan: ${planId}`)
  }
  return plan
}

/** All checkout fields derived from plan id — keeps UI and payment in sync. */
export type PremiumCheckoutSnapshot = {
  selectedPlan: PlanId
  selectedPrice: number
  premiumType: PremiumType
  paymentAmount: number
  paymentLabel: string
  paymentPayload: PremiumPaymentPayload
  planDef: PremiumPlanDef
}

export function resolvePremiumCheckout(
  planId: PlanId,
  existingExpiresAt?: string | null
): PremiumCheckoutSnapshot {
  const planDef = getPremiumPlan(planId)
  const paymentPayload = buildPremiumPaymentPayload(planId, existingExpiresAt)
  const paymentAmount = planDef.pricePi

  return {
    selectedPlan: planId,
    selectedPrice: paymentAmount,
    premiumType: planDef.premiumType,
    paymentAmount,
    paymentLabel: formatPlanPrice(planDef),
    paymentPayload,
    planDef,
  }
}

export function formatPlanPrice(plan: Pick<PremiumPlanDef, 'pricePi'>): string {
  return `${plan.pricePi} Pi`
}

function addMonths(base: Date, months: number): Date {
  const next = new Date(base)
  next.setMonth(next.getMonth() + months)
  return next
}

/** Compute ISO expiry from a start date and plan type. */
export function computePremiumExpiresAt(
  premiumType: PremiumType,
  fromDate: Date = new Date()
): string {
  const base = new Date(fromDate)
  switch (premiumType) {
    case 'monthly':
      return addMonths(base, 1).toISOString()
    case 'quarterly':
      return addMonths(base, 3).toISOString()
    case 'yearly':
      return addMonths(base, 12).toISOString()
    default: {
      const _exhaustive: never = premiumType
      return _exhaustive
    }
  }
}

/** Extend from the later of now or an existing active expiry. */
export function computePremiumExpiresAtFromExisting(
  premiumType: PremiumType,
  existingExpiresAt: string | null | undefined
): string {
  const now = new Date()
  let start = now
  if (existingExpiresAt) {
    const existing = new Date(existingExpiresAt)
    if (!Number.isNaN(existing.getTime()) && existing > now) {
      start = existing
    }
  }
  return computePremiumExpiresAt(premiumType, start)
}

export type PremiumPaymentPayload = {
  planId: PlanId
  amount: number
  premiumType: PremiumType
  premiumExpiresAt: string
}

export function buildPremiumPaymentPayload(planId: PlanId, existingExpiresAt?: string | null): PremiumPaymentPayload {
  const plan = getPremiumPlan(planId)
  return {
    planId: plan.id,
    amount: plan.pricePi,
    premiumType: plan.premiumType,
    premiumExpiresAt: computePremiumExpiresAtFromExisting(plan.premiumType, existingExpiresAt),
  }
}
