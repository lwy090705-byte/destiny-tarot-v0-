"use client"

import { useState } from "react"
import { ArrowLeft, Star, Crown, Zap, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PLANS = [
  {
    id: 'monthly',
    name: '1개월',
    price: '20 Pi',
    priceNum: 20,
    period: '월',
    badge: null,
    color: 'from-purple-500 to-violet-600',
    borderColor: 'border-purple-300',
    features: ['모든 프리미엄 운세 이용', '광고 없음', '타로 무제한', '궁합 분석 무제한', 'MBTI 프리미엄 리포트', 'MBTI 연애 스타일 분석'],
  },
  {
    id: 'quarterly',
    name: '3개월',
    price: '50 Pi',
    priceNum: 50,
    period: '3개월',
    badge: '인기',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-300',
    features: ['모든 프리미엄 운세 이용', '광고 없음', '타로 무제한', '궁합 분석 무제한', 'MBTI 프리미엄 리포트', 'MBTI 연애 스타일 분석', '우선 고객 지원'],
  },
  {
    id: 'yearly',
    name: '1년',
    price: '300 Pi',
    priceNum: 300,
    period: '년',
    badge: '최고 혜택',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-300',
    features: ['모든 프리미엄 운세 이용', '광고 없음', '타로 무제한', '궁합 분석 무제한', 'MBTI 프리미엄 리포트', 'MBTI 연애 스타일 분석', 'MBTI 궁합 프리미엄 결과', '우선 고객 지원', '독점 콘텐츠 이용', '포인트 2배 적립'],
  },
]

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
    setShowConfirm(true)
  }

  const selectedPlanData = PLANS.find(p => p.id === selectedPlan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-16">
      {/* 헤더 */}
      <div className="sticky top-0 bg-purple-900/90 backdrop-blur-sm border-b border-purple-700/50 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/user-profile">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-lg font-bold text-white">프리미엄 구독</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* 상단 배너 */}
        <div className="bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/30 rounded-2xl p-5 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">프리미엄 멤버십</h2>
          <p className="text-purple-200 text-sm">모든 운세 서비스를 제한 없이 이용하세요</p>
        </div>

        {/* 요금제 카드 */}
        <div className="space-y-3">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border-2 transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? `${plan.borderColor} bg-white/15`
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-4 bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {plan.badge}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">{plan.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
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
                  onClick={(e) => { e.stopPropagation(); handleSelectPlan(plan.id) }}
                  className={`w-full mt-4 bg-gradient-to-r ${plan.color} text-white font-bold border-0 hover:opacity-90 transition-opacity`}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  이 플랜 선택
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 안내사항 */}
        <div className="bg-white/5 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-white font-semibold text-sm">결제 안내</span>
          </div>
          <p className="text-purple-300 text-xs leading-relaxed">• 결제는 Pi(파이) 암호화폐로 진행됩니다.</p>
          <p className="text-purple-300 text-xs leading-relaxed">• 구독 기간 만료 후 자동 갱신되지 않습니다.</p>
          <p className="text-purple-300 text-xs leading-relaxed">• 문의: lwy2016@naver.com</p>
        </div>
      </div>

      {/* 결제 확인 모달 */}
      {showConfirm && selectedPlanData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">결제 확인</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">플랜</span>
                <span className="font-bold text-gray-800">{selectedPlanData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 금액</span>
                <span className="font-bold text-purple-600 text-lg">{selectedPlanData.price}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mb-5">
              Pi 결제 시스템으로 연결됩니다.<br />결제를 진행하시겠습니까?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowConfirm(false)}
              >
                취소
              </Button>
              <Button
                className={`flex-1 bg-gradient-to-r ${selectedPlanData.color} text-white border-0`}
                onClick={() => {
                  alert('Pi 결제 시스템 준비 중입니다.')
                  setShowConfirm(false)
                }}
              >
                결제하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
