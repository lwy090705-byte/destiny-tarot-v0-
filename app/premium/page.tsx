"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { ArrowLeft, Star, Crown, Zap, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useUser } from "@/lib/user-context"
import { PremiumPaymentModal, type PremiumPlanModalView } from "@/components/premium-payment-modal"
import {
  PREMIUM_PLANS,
  DEFAULT_PREMIUM_PLAN_ID,
  resolvePremiumCheckout,
  formatPlanPrice,
  type PlanId,
  type PremiumCheckoutSnapshot,
  type PremiumPaymentPayload,
} from "@/lib/premium-plans"
import { fetchProfilePremium } from "@/lib/supabase-premium"
import { usePremium } from "@/lib/use-premium"

type PremiumPlanView = ReturnType<typeof buildPlanViews>[number]

type PremiumModalData = PremiumCheckoutSnapshot & {
  planView: PremiumPlanModalView
}

function buildPlanViews(t: (key: string) => string) {
  return PREMIUM_PLANS.map((p) => {
    let badgeText: string | null = null
    if (p.badge === "popular") badgeText = t("premium.badgePopular")
    if (p.badge === "best") badgeText = t("premium.badgeBestValue")
    return {
      ...p,
      price: formatPlanPrice(p),
      name: t(`premium.planName.${p.id}`),
      period: t(p.periodKey),
      badgeText,
      features: t(p.featureKey)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }
  })
}

function toPlanView(plan: PremiumPlanView): PremiumPlanModalView {
  return {
    id: plan.id,
    name: plan.name,
    period: plan.period,
    pricePi: plan.pricePi,
    color: plan.color,
  }
}

function buildModalData(
  planId: PlanId,
  plans: PremiumPlanView[],
  existingExpiresAt: string | null
): PremiumModalData {
  const checkout = resolvePremiumCheckout(planId, existingExpiresAt)
  const plan = plans.find((p) => p.id === planId) ?? plans[0]
  return {
    ...checkout,
    planView: toPlanView(plan),
  }
}

export default function PremiumPage() {
  const { t } = useLanguage()
  const { user } = useUser()
  const { activatePlan, refreshPremium } = usePremium()
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(DEFAULT_PREMIUM_PLAN_ID)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [existingExpiresAt, setExistingExpiresAt] = useState<string | null>(null)
  const [modalData, setModalData] = useState<PremiumModalData | null>(null)
  const existingExpiresAtRef = useRef(existingExpiresAt)

  existingExpiresAtRef.current = existingExpiresAt

  const plans = useMemo(() => buildPlanViews(t), [t])

  const checkout = useMemo(
    () => resolvePremiumCheckout(selectedPlanId, existingExpiresAt),
    [selectedPlanId, existingExpiresAt]
  )

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0]

  const selectPlan = useCallback((planId: PlanId) => {
    setSelectedPlanId(planId)
    setShowPaymentModal(false)
    setModalData(null)
  }, [])

  const openPaymentModal = useCallback(
    async (planId: PlanId) => {
      setSelectedPlanId(planId)

      let expiresAt = existingExpiresAtRef.current
      if (user?.nickname) {
        const { ok, premium } = await fetchProfilePremium(user.nickname)
        if (ok && premium?.premium_expires_at) {
          expiresAt = premium.premium_expires_at
          setExistingExpiresAt(expiresAt)
          existingExpiresAtRef.current = expiresAt
        }
      }

      const nextModal = buildModalData(planId, plans, expiresAt)
      setModalData(nextModal)
      setShowPaymentModal(true)
    },
    [user?.nickname, plans]
  )

  const handlePayment = useCallback(
    async (payload: PremiumPaymentPayload) => {
      const planId = payload.planId
      const freshCheckout = resolvePremiumCheckout(planId, existingExpiresAtRef.current)

      if (freshCheckout.paymentAmount !== payload.amount) {
        console.warn("[premium] payment amount corrected", {
          stale: payload.amount,
          fresh: freshCheckout.paymentAmount,
          planId,
        })
      }

      if (!user?.nickname) {
        console.log("[premium] payment skipped — no nickname", freshCheckout.paymentPayload)
        return
      }

      const result = await activatePlan(freshCheckout.selectedPlan)

      if (result.ok && result.payload) {
        setExistingExpiresAt(result.payload.premiumExpiresAt)
        existingExpiresAtRef.current = result.payload.premiumExpiresAt
      } else if (result.ok && result.state) {
        setExistingExpiresAt(result.state.premium_expires_at)
        existingExpiresAtRef.current = result.state.premium_expires_at
      }

      await refreshPremium()
    },
    [user?.nickname, activatePlan, refreshPremium]
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-32">
      <div className="sticky top-0 bg-purple-900/90 backdrop-blur-sm border-b border-purple-700/50 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/user-profile">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">{t("premium.titlePage")}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/30 rounded-2xl p-5 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{t("premium.heroTitle")}</h2>
          <p className="text-purple-200 text-sm">{t("premium.heroSubtitle")}</p>
        </div>

        <div className="space-y-3">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id
            return (
              <div
                key={plan.id}
                role="button"
                tabIndex={0}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected ? `${plan.borderColor} bg-white/15` : "border-white/20 hover:border-white/40"
                }`}
                onClick={() => selectPlan(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    selectPlan(plan.id)
                  }
                }}
              >
                {plan.badgeText && (
                  <div
                    className={`absolute -top-3 left-4 bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    {plan.badgeText}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                      >
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{plan.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                      >
                        {plan.price}
                      </div>
                      <div className="text-purple-300 text-xs">/ {plan.period}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />
                        <span className="text-purple-100 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      void openPaymentModal(plan.id)
                    }}
                    className={`w-full mt-4 bg-gradient-to-r ${
                      isSelected ? plan.color : "from-white/20 to-white/10"
                    } text-white font-bold border-0 hover:opacity-90 transition-all ${
                      isSelected ? "" : "opacity-80"
                    }`}
                  >
                    <Zap className="h-4 w-4 mr-1" />
                    {isSelected
                      ? t("premium.checkoutCta").replace("{amount}", String(plan.pricePi))
                      : t("premium.selectPlan")}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-white font-semibold text-sm">{t("premium.paymentInfoTitle")}</span>
          </div>
          <p className="text-purple-300 text-xs leading-relaxed">{t("premium.notePi")}</p>
          <p className="text-purple-300 text-xs leading-relaxed">{t("premium.noteNoRenew")}</p>
          <p className="text-purple-300 text-xs leading-relaxed">{t("premium.noteContact")}</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-purple-700/50 bg-purple-900/95 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-purple-300 text-xs">{t("premium.checkoutDueLabel")}</p>
            <p
              className={`text-lg font-bold bg-gradient-to-r ${selectedPlan.color} bg-clip-text text-transparent truncate`}
            >
              {checkout.paymentLabel}
            </p>
            <p className="text-purple-200 text-xs truncate">
              {selectedPlan.name} · {selectedPlan.period}
            </p>
          </div>
          <Button
            type="button"
            onClick={() => void openPaymentModal(selectedPlanId)}
            className={`shrink-0 bg-gradient-to-r ${selectedPlan.color} text-white font-bold border-0 hover:opacity-90 px-5`}
          >
            <Zap className="h-4 w-4 mr-1" />
            {t("premium.checkoutCta").replace("{amount}", String(checkout.paymentAmount))}
          </Button>
        </div>
      </div>

      {showPaymentModal && modalData && (
        <PremiumPaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false)
            setModalData(null)
          }}
          plan={modalData.planView}
          paymentPayload={modalData.paymentPayload}
          onPayment={handlePayment}
        />
      )}
    </div>
  )
}
