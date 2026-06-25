'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { PiPaymentModal } from './pi-payment-modal'

interface PointsInsufficientModalProps {
  isOpen: boolean
  onClose: () => void
  currentPoints: number
  requiredPoints: number
  onWatchAd: () => void
  onBuyPi: () => void
  /** Premium subscribers — hide ad reward CTA */
  hideAdOptions?: boolean
}

export function PointsInsufficientModal({
  isOpen,
  onClose,
  currentPoints,
  requiredPoints,
  onWatchAd,
  onBuyPi,
  hideAdOptions = false,
}: PointsInsufficientModalProps) {
  const { t } = useLanguage()
  const [isClosing, setIsClosing] = useState(false)
  const [showPiModal, setShowPiModal] = useState(false)
  const pointsNeeded = requiredPoints - currentPoints

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} className="text-white" />
            </button>

            <div className="pr-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('points.insufficient') || '포인트가 부족합니다'}
              </h2>
              <p className="text-white/90 text-sm leading-relaxed">
                {t('points.insufficientDesc') ||
                  '포인트를 충전하거나 보너스를 받아 포인트를 획득할 수 있습니다'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Points display */}
            <div className="space-y-4">
              {/* Current points */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <span className="text-sm font-medium text-gray-700">
                  {t('points.current') || '현재 보유 포인트'}
                </span>
                <span className="text-lg font-bold text-blue-600">{currentPoints} P</span>
              </div>

              {/* Required points */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                <span className="text-sm font-medium text-gray-700">
                  {t('points.required') || '필요한 포인트'}
                </span>
                <span className="text-lg font-bold text-red-600">{requiredPoints} P</span>
              </div>

              {/* Points needed */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <span className="text-sm font-medium text-gray-700">
                  {t('points.needed') || '부족한 포인트'}
                </span>
                <span className="text-lg font-bold text-purple-600">{pointsNeeded} P</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {!hideAdOptions && (
              <button
                onClick={onWatchAd}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{t('points.watchAd') || '일일 포인트 받기'}</span>
              </button>
              )}

              {/* Buy Pi button */}
              <button
                onClick={() => setShowPiModal(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                  <text
                    x="12"
                    y="16"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    π
                  </text>
                </svg>
                <span>{t('points.buyPi') || 'Pi로 구매'}</span>
              </button>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200 active:scale-95"
              >
                {t('common.close') || '닫기'}
              </button>
            </div>

            {/* Info text */}
            <p className="text-xs text-center text-gray-500">
              {t('points.info') ||
                '포인트는 일정 시간 후 계정에 적용됩니다. 환불은 불가능합니다.'}
            </p>
          </div>
        </div>
      </div>

      {/* Pi Payment Modal */}
      <PiPaymentModal
        isOpen={showPiModal}
        onClose={() => setShowPiModal(false)}
        onPayment={(amount) => {
          setShowPiModal(false)
          // Pi 결제 후 포인트 부족 모달도 닫기
          setIsClosing(true)
          setTimeout(() => {
            setIsClosing(false)
            onClose()
          }, 300)
        }}
        title="Pi로 포인트 충전"
      />
    </>
  )
}
