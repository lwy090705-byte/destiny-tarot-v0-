"use client"

import { useState, useCallback } from "react"
import { X, Zap, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import type { PlanId, PremiumPaymentPayload } from "@/lib/premium-plans"
import { formatPlanPrice } from "@/lib/premium-plans"

export type PremiumPlanModalView = {
  id: PlanId
  name: string
  period: string
  pricePi: number
  color: string
}

interface PremiumPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: PremiumPlanModalView
  paymentPayload: PremiumPaymentPayload
  onPayment: (payload: PremiumPaymentPayload) => void
}

export function PremiumPaymentModal({
  isOpen,
  onClose,
  plan,
  paymentPayload,
  onPayment,
}: PremiumPaymentModalProps) {
  const { t } = useLanguage()
  const [showComingSoon, setShowComingSoon] = useState(false)

  const amount = plan.pricePi
  const priceLabel = formatPlanPrice({ pricePi: amount })

  const handlePayment = useCallback(() => {
    setShowComingSoon(true)
    onPayment({
      ...paymentPayload,
      planId: plan.id,
      amount: plan.pricePi,
    })
  }, [onPayment, paymentPayload, plan.id, plan.pricePi])

  if (!isOpen) return null

  if (paymentPayload.amount !== amount) {
    console.warn("[premium] modal amount mismatch — using plan price", {
      planId: plan.id,
      planPrice: amount,
      payloadAmount: paymentPayload.amount,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          type="button"
          aria-label={t("premium.cancel")}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center`}
          >
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{t("premium.modalPayTitle")}</h2>
        </div>

        <div className="space-y-4 mb-5">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{t("premium.labelPlan")}</p>
            <p className="text-base font-bold text-gray-900">
              {plan.name}
              <span className="text-gray-500 font-normal text-sm"> / {plan.period}</span>
            </p>
          </div>

          <div
            className={`rounded-xl p-4 border-2 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200`}
          >
            <p className="text-xs text-gray-600 mb-1">{t("premium.labelAmount")}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
              {priceLabel}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
            <p className="text-xs text-gray-500 mb-2">{t("premium.modalPayBody")}</p>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                {t("premium.noteNoRenew")}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t("premium.cancel")}
          </Button>
          <Button
            type="button"
            onClick={handlePayment}
            className={`flex-1 bg-gradient-to-r ${plan.color} text-white font-bold border-0 hover:opacity-90`}
          >
            {t("premium.payNow")} · {priceLabel}
          </Button>
        </div>

        {showComingSoon && (
          <div className="mt-3 p-4 bg-amber-50 rounded-xl border border-amber-300 flex items-start gap-3">
            <span className="text-amber-500 text-lg leading-none mt-0.5">ℹ</span>
            <p className="text-sm text-amber-800">{t("premium.alertComingSoon")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
