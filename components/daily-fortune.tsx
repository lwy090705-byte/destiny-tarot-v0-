"use client"
// v-rebuild-5-fix-import

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { generateFortune } from "@/lib/fortune"
import type { FortuneResult } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"
import { createPersonalization, generateUniqueSeed, getPersonalizationVariant } from "@/lib/myeongrihak"

interface DailyFortuneSectionProps {
  initialYear?: number
  initialMonth?: number
  initialDay?: number
  initialHour?: number
  initialGender?: 'male' | 'female'
  initialName?: string
  calendarType: 'solar' | 'lunar'
  onCalendarTypeChange: (type: 'solar' | 'lunar') => void
}

// 오늘 날짜를 YYYY-MM-DD 형식으로
function getTodayKey(): string {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

// 생년월일 + 시간 + 성별 + 오늘 날짜 기반 개인화 시드 생성
function generatePersonalizedSeed(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number | undefined,
  gender: 'male' | 'female',
  categoryIndex: number
): number {
  const personalization = createPersonalization(birthYear, birthMonth, birthDay, birthHour, gender)
  const today = new Date()
  const seed = generateUniqueSeed(personalization, today.getFullYear(), today.getMonth() + 1, today.getDate(), categoryIndex)
  return seed
}

// 시드 기반 의사 난수 생성기
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// v3 - uses useLanguage() context, no language prop
export function DailyFortuneSection({
  initialYear = 2000,
  initialMonth = 1,
  initialDay = 1,
  initialHour,
  initialGender = 'male',
  initialName = '',
  calendarType,
  onCalendarTypeChange
}: DailyFortuneSectionProps) {
  const { language, t } = useLanguage()
  const { deductPoints, hasEnoughPoints, points } = usePoints()
  const ANALYSIS_COST = 10
  const [showPointsModal, setShowPointsModal] = useState(false)

  const getCategoryName = (cat: string) => {
    const map: Record<string, string> = {
      total: 'fortune.total', wealth: 'fortune.wealth', business: 'fortune.business',
      love: 'fortune.love', relationships: 'fortune.relationships', health: 'fortune.health',
    }
    return t(map[cat] ?? cat)
  }
  
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [day, setDay] = useState(initialDay)
  const [hour, setHour] = useState(initialHour)
  const [gender, setGender] = useState(initialGender)
  const [name, setName] = useState(initialName)
  const [showResult, setShowResult] = useState(false)

  // 프로필 선택 시 날짜 및 시간, 성별, 이름 동기화
  useEffect(() => {
    setYear(initialYear)
    setMonth(initialMonth)
    setDay(initialDay)
    setHour(initialHour)
    setGender(initialGender)
    setName(initialName)
    setShowResult(false)
    setFortuneResults([])
  }, [initialYear, initialMonth, initialDay, initialHour, initialGender, initialName])
  
  // 언어 변경 시 결과 리셋
  useEffect(() => {
    setShowResult(false)
    setFortuneResults([])
  }, [language])

  // 언어가 변경되고 결과가 표시 중이면 운세 재생성
  useEffect(() => {
    if (!showResult) return
    
    // handleGetFortune을 재실행하여 새 언어로 운세 재생성
    const storageKey = `dailyFortune_${year}_${month}_${day}_${gender}`
    const todayKey = getTodayKey()
    const seed = generatePersonalizedSeed(year, month, day, hour, gender, 0)
    
    const results: FortuneResult[] = [
      generateFortune('daily', 'total', seed, language),
      generateFortune('daily', 'wealth', seed + 1, language),
      generateFortune('daily', 'love', seed + 2, language),
      generateFortune('daily', 'health', seed + 3, language),
    ]
    
    // localStorage에 새로운 언어로 업데이트
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        date: todayKey,
        language,
        gender,
        results
      }))
    } catch {
      // 무시
    }
    
    setFortuneResults(results)
  }, [language, showResult, gender])
  
  const [fortuneResults, setFortuneResults] = useState<FortuneResult[]>([])

  // 컴포넌트 마운트 시 오늘 저장된 운세가 있으면 불러오기
  useEffect(() => {
    const storageKey = `dailyFortune_${year}_${month}_${day}_${gender}`
    const todayKey = getTodayKey()
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.date === todayKey && parsed.language === language && parsed.gender === gender) {
          setFortuneResults(parsed.results)
          setShowResult(true)
        }
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }
  }, [year, month, day, language, gender])

  const handleGetFortune = () => {
    const storageKey = `dailyFortune_${year}_${month}_${day}_${gender}`
    const todayKey = getTodayKey()

    // 이미 오늘 운세가 저장되어 있으면 그대로 사용 (포인트 차감 안함)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.date === todayKey && parsed.language === language && parsed.gender === gender) {
          setFortuneResults(parsed.results)
          setShowResult(true)
          return
        }
      }
    } catch {
      // 무시
    }

    // 새로운 운세 조회 시 포인트 차감
    if (!hasEnoughPoints(ANALYSIS_COST)) {
      setShowPointsModal(true)
      return
    }
    if (!deductPoints(ANALYSIS_COST)) {
      return
    }

    // 개인화 데이터 생성
    const personalization = createPersonalization(year, month, day, hour, gender)
    const variant = getPersonalizationVariant(personalization, 0, 8)

    // 시드 기반으로 운세 생성 (같은 날 같은 생년월일이면 동일 결과)
    const seed = generatePersonalizedSeed(year, month, day, hour, gender, 0)
    const results: FortuneResult[] = [
      generateFortune('daily', 'total', seed, language, variant),
      generateFortune('daily', 'wealth', seed + 1, language, variant),
      generateFortune('daily', 'love', seed + 2, language, variant),
      generateFortune('daily', 'health', seed + 3, language, variant),
    ]

    // localStorage에 저장
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        date: todayKey,
        language,
        gender,
        results
      }))
    } catch {
      // 저장 실패 시 무시
    }

    setFortuneResults(results)
    setShowResult(true)
  }

  if (showResult) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setShowResult(false)}
          className="text-purple-700 hover:text-purple-800"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="premium-card rounded-3xl p-7 shadow-xl">
          <h3 className="text-2xl font-bold text-[#5b21b6] mb-4 text-center">{t('fortune.daily')}</h3>
          <p className="text-center text-[#7c5cbf] mb-6 text-sm font-medium">
            {name && <span className="font-bold text-[#5b21b6]">{name} · </span>}
            {year}{t('date.year')} {month}{t('date.month')} {day}{t('date.day')} ({calendarType === 'lunar' ? t('profile.lunar') : t('profile.solar')})
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fortuneResults.map((result, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-5 transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.1)'
                }}
              >
                <div className="mb-3">
                  <h4 className="font-bold text-[#b8860b] text-sm mb-2">{getCategoryName(result.category)}</h4>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i < Math.ceil(result.score / 2) ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[#8a6c00]">{result.score}/10</span>
                  </div>
                </div>
                <p className="text-[#6c5a33] leading-relaxed text-sm mb-3 font-medium">{result.description}</p>
                <div className="flex flex-col gap-1.5 text-xs border-t border-[#d4af37]/20 pt-2">
                  <span className="text-[#8a6c00]"><strong>{t('fortune.dailyColorStrong')}</strong> {result.luckyColor}</span>
                  <span className="text-[#8a6c00]"><strong>{t('fortune.dailyNumberStrong')}</strong> {result.luckyNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGetFortune}
          className="w-full text-white py-6 rounded-2xl text-lg font-bold shadow-lg transition-all hover:shadow-xl active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
            boxShadow: '0 6px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          {t('button.again')}
        </Button>
      </div>
    )
  }

  // 프로필 미선택 상태 처리
  const hasProfile = initialYear !== 2000 || initialMonth !== 1 || initialDay !== 1 || initialName !== ''

  if (!hasProfile) {
    return (
      <div className="space-y-4 rounded-3xl p-4 pb-3" style={{
        background: 'linear-gradient(180deg, #fefcf8 0%, #faf5ff 50%, #fefcf8 100%)',
      }}>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400 text-center py-8">
          <p className="text-purple-500 font-semibold mb-1">{t('profile.title')}</p>
          <p className="text-gray-400 text-sm">{t('profile.emptyList')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-3xl p-6" style={{
      background: 'linear-gradient(180deg, #fefcf8 0%, #faf5ff 50%, #fefcf8 100%)',
    }}>
      {/* 이름 표시 — DateSelector 박스와 동일 스타일 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-purple-700 mb-1 text-sm">{t('profile.name')}</h3>
        <p className="text-[#2d1b4e] font-bold text-base">{name || t('profile.emptyList')}</p>
      </div>

      {/* 생년월일 읽기 전용 표시 — DateSelector 박스와 동일 스타일 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-purple-700 mb-3 text-sm">{t('date.select')}</h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-gray-500 text-xs mb-1">{t('date.year')}</p>
            <div className="h-10 bg-gray-50 rounded-xl flex items-center px-3 text-[#2d1b4e] font-semibold text-sm"
              style={{ border: '1.5px solid #e5d4b8' }}>
              {year}
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">{t('date.month')}</p>
            <div className="h-10 bg-gray-50 rounded-xl flex items-center px-3 text-[#2d1b4e] font-semibold text-sm"
              style={{ border: '1.5px solid #e5d4b8' }}>
              {String(month).padStart(2, '0')}
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">{t('date.day')}</p>
            <div className="h-10 bg-gray-50 rounded-xl flex items-center px-3 text-[#2d1b4e] font-semibold text-sm"
              style={{ border: '1.5px solid #e5d4b8' }}>
              {String(day).padStart(2, '0')}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-purple-500 font-medium px-2 py-0.5 rounded-full"
            style={{ background: '#f3e8ff', border: '1px solid #d8b4fe' }}>
            {calendarType === 'lunar' ? t('profile.lunar') : t('profile.solar')}
          </span>
          {hour !== undefined && (
            <span className="text-xs text-purple-500 font-medium px-2 py-0.5 rounded-full"
              style={{ background: '#f3e8ff', border: '1px solid #d8b4fe' }}>
              {String(hour).padStart(2, '0')}:00
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{t('profile.readOnly')}</span>
        </div>
      </div>

      <Button
        onClick={handleGetFortune}
        className="w-full text-white py-6 rounded-2xl text-lg font-bold shadow-lg transition-all hover:shadow-xl active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)',
          boxShadow: '0 6px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        {t('button.viewDailyFortune')}
      </Button>

      {/* Points Insufficient Modal */}
      <PointsInsufficientModal
        isOpen={showPointsModal}
        onClose={() => setShowPointsModal(false)}
        currentPoints={points}
        requiredPoints={ANALYSIS_COST}
        onWatchAd={() => {
          setShowPointsModal(false)
          window.location.href = '/user-profile#bonus'
        }}
        onBuyPi={() => {
          setShowPointsModal(false)
          window.location.href = '/user-profile#pi-charge'
        }}
      />
    </div>
  )
}
