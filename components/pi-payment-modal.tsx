"use client"

import { useState, useCallback } from "react"
import { X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"

interface PiPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPayment: (amount: number) => void
  title?: string
}

export function PiPaymentModal({ isOpen, onClose, onPayment, title }: PiPaymentModalProps) {
  const { t } = useLanguage()
  const headerTitle = title ?? t('support.piPaymentTitle')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const piOptions = [1, 5, 10, 20]

  // 현재 선택된 금액 가져오기
  const getFinalAmount = useCallback((): number | null => {
    if (customAmount && !isNaN(parseFloat(customAmount))) {
      const value = parseFloat(customAmount)
      return value > 0 ? value : null
    }
    return selectedAmount && selectedAmount > 0 ? selectedAmount : null
  }, [customAmount, selectedAmount])

  // 직접 입력 처리
  const handleCustomInput = useCallback((value: string) => {
    // 숫자와 소수점만 허용
    const filtered = value.replace(/[^\d.]/g, '')
    // 소수점이 하나만 있도록 처리
    const parts = filtered.split('.')
    if (parts.length > 2) {
      setCustomAmount(parts[0] + '.' + parts[1])
    } else {
      setCustomAmount(filtered)
    }
    // 직접 입력 시 버튼 선택 해제
    setSelectedAmount(null)
  }, [])

  // 버튼 클릭 처리
  const handleQuickSelect = useCallback((amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }, [])

  // 결제 처리
  const handlePayment = useCallback(async () => {
    const finalAmount = getFinalAmount()
    if (!finalAmount) return

    setIsProcessing(true)
    try {
      // 결제 처리 로직
      await new Promise(resolve => setTimeout(resolve, 500)) // 시뮬레이션
      onPayment(finalAmount)
      
      // 모달 닫기 및 상태 초기화
      setSelectedAmount(1)
      setCustomAmount("")
      onClose()
    } finally {
      setIsProcessing(false)
    }
  }, [getFinalAmount, onPayment, onClose])

  if (!isOpen) return null

  const finalAmount = getFinalAmount()

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="h-6 w-6" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{headerTitle}</h2>
        </div>

        {/* 설명 문구 */}
        <p className="text-sm text-gray-600 mb-5">
          {t('support.piModalIntro')}
        </p>

        {/* 빠른 선택 버튼 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {piOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickSelect(amount)}
              className={`p-4 rounded-xl border-2 transition-all font-bold text-center ${
                selectedAmount === amount && !customAmount
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
              }`}
            >
              <div className="text-lg">{amount} Pi</div>
              <div className="text-xs text-gray-500 mt-1">{amount}π</div>
            </button>
          ))}
        </div>

        {/* 직접 입력 */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            {t('support.piModalCustomLabel')}
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder={t('support.piModalPlaceholder')}
              value={customAmount}
              onChange={(e) => handleCustomInput(e.target.value)}
              className="flex-1"
              inputMode="decimal"
            />
            <span className="flex items-center text-gray-600 font-bold">π</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('support.piModalDecimalHint')}
          </p>
        </div>

        {/* 금액 표시 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-5 border border-amber-200">
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">{t('support.piModalSelectedLabel')}</p>
            <p className="text-2xl font-bold text-amber-700">
              {finalAmount ? `${finalAmount} Pi` : "0 Pi"}
            </p>
          </div>
          <div className="border-t border-amber-200 pt-3">
            <p className="text-xs text-gray-600 mb-1">{t('support.piModalDueLabel')}</p>
            <p className="text-lg font-bold text-amber-700">
              {finalAmount ? `${finalAmount} Pi` : "0 Pi"}
            </p>
          </div>
        </div>

        {/* 결제 버튼 */}
        <Button
          onClick={handlePayment}
          disabled={!finalAmount || isProcessing}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all"
        >
          {(() => {
            if (isProcessing) return t('support.piModalProcessing')
            if (finalAmount) return t('support.piModalPayCta').replace('{amount}', String(finalAmount))
            return t('support.piModalPayCtaGeneric')
          })()}
        </Button>

        {/* 안내 문구 */}
        <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700 leading-relaxed whitespace-pre-line">
            💡 {t('support.piModalFooterHint')}
          </p>
        </div>
      </div>
    </div>
  )
}
