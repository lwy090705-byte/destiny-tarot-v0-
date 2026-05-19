"use client"
// Build: 20260403-v11-force-reload

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Heart, Gift, UserCircle2, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { PiPaymentModal } from "@/components/pi-payment-modal"
import { getAnonymousSupporterName, getSupportSampleSupporters } from "@/lib/support-sample-supporters"

interface Supporter {
  id: string
  name: string
  amount: string
  date: string
  message?: string
}

// 닉네임 마스킹 함수
function maskName(name: string): string {
  if (name.length <= 2) return name + "***"
  if (name.length <= 3) return name.substring(0, 1) + "*".repeat(name.length + 2)
  return name.substring(0, Math.ceil(name.length / 2)) + "*".repeat(Math.ceil(name.length / 2))
}

export default function SupportPage() {
  const { t, language } = useLanguage()
  const pathname = usePathname()
  const [showPiModal, setShowPiModal] = useState(false)
  const [recentSupporters, setRecentSupporters] = useState<Supporter[]>(() =>
    getSupportSampleSupporters(language)
  )
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Detect language changes
  useEffect(() => {
    console.log("[v0] Support: Language changed to:", language)
  }, [language])

  // Detect route changes
  useEffect(() => {
    console.log("[v0] Support: Route changed to:", pathname)
  }, [pathname])

  useEffect(() => {
    setRecentSupporters(getSupportSampleSupporters(language))
  }, [language])

  // localStorage에서 후원자 목록 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem("supportersList")
      if (stored) {
        const parsed = JSON.parse(stored) as Supporter[]
        setRecentSupporters(parsed)
      }
    } catch (error) {
      console.log("[v0] Error loading supporters list:", error)
    }
  }, [])

  // Pi 결제 처리
  const handlePiPayment = useCallback((amount: number) => {
    try {
      // 새로운 후원자 추가 (현재 사용자를 익명으로 표시)
      const newSupporter: Supporter = {
        id: Date.now().toString(),
        name: maskName(getAnonymousSupporterName(language)),
        amount: `${amount}π`,
        date: new Date().toISOString().split('T')[0],
        message: "",
      }

      // 최근 후원자 목록 업데이트 (최신순, 최대 5개)
      const updated = [newSupporter, ...recentSupporters].slice(0, 5)
      setRecentSupporters(updated)

      // localStorage에 저장
      try {
        localStorage.setItem("supportersList", JSON.stringify(updated))
      } catch (e) {
        console.log("[v0] Error saving supporters list:", e)
      }

      // 성공 메시지 표시
      setSuccessMessage(t('support.piThankAmount').replace('{amount}', String(amount)))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.log("[v0] Error processing payment:", error)
    }
  }, [recentSupporters, t, language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 pb-12">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-pink-200 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-bold text-white">{t('support.title')}</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-3 space-y-4">
        {/* 상단 소개 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-pink-200" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('support.thankYou')}</h2>
        </div>

        {/* 후원 금액 선택 */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Gift className="h-5 w-5 text-pink-500" />
            {t('support.selectAmount')}
          </h3>
          
          {/* 후원하기 버튼 */}
          <Button
            onClick={() => setShowPiModal(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 text-lg font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <Heart className="h-5 w-5" />
            {t('support.supportNow')}
          </Button>

          {/* 안내 문구 */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
              {t('support.helperLines')}
            </p>
          </div>
        </div>

        {/* 성공 메시지 */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-in zoom-in duration-200">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('support.successTitle')}</h3>
              <p className="text-gray-600">{successMessage || t('support.successMessage')}</p>
            </div>
          </div>
        )}

        {/* 후원자 리스트 */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                <UserCircle2 className="h-5 w-5 text-purple-500" />
            {t('support.topSupporters')}
          </h3>
          
          <div className="space-y-3">
            {recentSupporters.map((supporter, idx) => (
              <div 
                key={supporter.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  idx === 0 ? 'bg-amber-100' : idx === 1 ? 'bg-gray-200' : idx === 2 ? 'bg-orange-100' : 'bg-purple-100'
                }`}>
                  {idx < 3 ? (
                    <Star className={`h-4 w-4 ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-gray-500' : 'text-orange-500'}`} />
                  ) : (
                    <Heart className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 text-sm">{supporter.name}</span>
                    <span className="text-pink-600 font-bold text-sm">{supporter.amount}</span>
                  </div>
                  {supporter.message && (
                    <p className="text-xs text-gray-500 mt-0.5">&quot;{supporter.message}&quot;</p>
                  )}
                  <p className="text-xs text-gray-400">{supporter.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 전체 보기 */}
          <button className="w-full mt-4 py-3 text-sm text-purple-600 font-medium hover:bg-purple-50 rounded-xl transition">
            {t('support.viewAll')}
          </button>
        </div>

        {/* 후원 혜택 */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-4">{t('support.benefits')}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{t('support.badge')}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{t('support.earlyAccess')}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{t('support.listing')}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{t('support.feedback')}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Pi 결제 모달 */}
      <PiPaymentModal
        isOpen={showPiModal}
        onClose={() => setShowPiModal(false)}
        onPayment={handlePiPayment}
        title={t('support.piPaymentTitle')}
      />
    </div>
  )
}
