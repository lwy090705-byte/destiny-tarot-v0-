"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SajuResult } from "./saju-result"
import { calculateSaju, elementNames, elementColors, getElementInfo } from "@/lib/saju"
import { 
  generateFortune, 
  generateMonthlyFortunes, 
  generateLifetimeFortune, 
  generateYearlyFortune,
  generateFortuneWithProfile,
  generateMonthlyFortunesWithProfile,
  generateLifetimeFortuneWithProfile,
  generateYearlyFortuneWithProfile,
  generateEnhancedFortuneWithProfile,
  generateEnhancedMonthlyFortunesWithProfile,
  type FortuneProfileContext
} from "@/lib/fortune"
import type { FortuneType, FortuneCategory, SajuResult as SajuResultType, FortuneResult, LifetimeFortune } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"

interface MyungliSectionProps {
  initialYear?: number
  initialMonth?: number
  initialDay?: number
  initialHour?: number
  initialName?: string
  initialGender?: 'male' | 'female'
  calendarType: 'solar' | 'lunar'
  onCalendarTypeChange: (type: 'solar' | 'lunar') => void
}

// v4 - uses useLanguage() context with language variable
export function MyungliSection({
  initialYear = 2000,
  initialMonth = 1,
  initialDay = 1,
  initialHour,
  initialName = '사용자',
  initialGender = 'male',
  calendarType,
  onCalendarTypeChange,
}: MyungliSectionProps) {
  const { language, t } = useLanguage()
  const { deductPoints, hasEnoughPoints, points } = usePoints()
  const ANALYSIS_COST = 10
  
  // 카테고리 이름을 현재 언어로 가져오기
  const getCategoryName = (category: FortuneCategory): string => {
    const categoryKeys: Record<FortuneCategory, string> = {
      total: 'fortune.total',
      wealth: 'fortune.wealth',
      business: 'fortune.business',
      love: 'fortune.love',
      relationships: 'fortune.relationships',
      health: 'fortune.health',
    }
    return t(categoryKeys[category])
  }
  
  // 타입 이름을 현재 언어로 가져오기
  const getTypeName = (type: FortuneType): string => {
    const typeKeys: Record<FortuneType, string> = {
      lifetime: 'fortune.lifetime',
      yearly: 'fortune.yearly',
      monthly: 'fortune.monthly',
      daily: 'fortune.daily',
    }
    return t(typeKeys[type])
  }
  
  const [hour, setHour] = useState<number | undefined>(initialHour)

  const year = initialYear
  const month = initialMonth
  const day = initialDay
  const name = initialName
  const gender = initialGender
  const currentYear = new Date().getFullYear()
  
  // Create profile context for personalized fortune generation - memoized to prevent recreations
  const profileContext: FortuneProfileContext = useMemo(() => ({
    name: name || '사용자',
    birthYear: year || 2000,
    birthMonth: month || 1,
    birthDay: day || 1,
    birthHour: hour,
    gender: gender || 'male',
    isLunar: calendarType === 'lunar',
  }), [name, year, month, day, hour, gender, calendarType])
  
  const [fortuneType, setFortuneType] = useState<FortuneType>('yearly')
  const [fortuneCategory, setFortuneCategory] = useState<FortuneCategory>('total')
  const [showResult, setShowResult] = useState(false)
  const [sajuResult, setSajuResult] = useState<SajuResultType | null>(null)
  const [fortuneResults, setFortuneResults] = useState<FortuneResult[]>([])
  const [lifetimeFortune, setLifetimeFortune] = useState<LifetimeFortune | null>(null)
  const [showPointsModal, setShowPointsModal] = useState(false)

  // Reset result-related state when language changes (Very Important)
  useEffect(() => {
    setShowResult(false)
    setSajuResult(null)
    setFortuneResults([])
    setLifetimeFortune(null)
  }, [language])

  // Cache fortune generation based on profile and settings - only regenerate when needed
  const cachedFortune = useMemo(() => {
    if (!showResult || !sajuResult) return null
    
    try {
      // Use enhanced profile-based fortune generation for personalized results
      if (fortuneType === 'lifetime') {
        return {
          lifetime: generateLifetimeFortuneWithProfile(fortuneCategory, profileContext, language),
          results: [],
        }
      } else if (fortuneType === 'yearly') {
        return {
          lifetime: null,
          results: [generateEnhancedFortuneWithProfile('yearly', fortuneCategory, profileContext, undefined, language)],
        }
      } else if (fortuneType === 'monthly') {
        return {
          lifetime: null,
          results: generateEnhancedMonthlyFortunesWithProfile(fortuneCategory, profileContext, language),
        }
      } else {
        return {
          lifetime: null,
          results: [generateFortuneWithProfile(fortuneType, fortuneCategory, profileContext, undefined, language)],
        }
      }
    } catch (error) {
      console.log('[v0] Error generating fortune in useMemo:', error)
      return {
        lifetime: null,
        results: [{
          type: fortuneType,
          category: fortuneCategory,
          score: 7,
          description: '운세를 생성할 수 없습니다. 잠시 후 다시 시도해주세요.',
          luckyColor: '#9C27B0',
          luckyNumber: 7,
        }],
      }
    }
  }, [showResult, sajuResult, fortuneType, fortuneCategory, profileContext, language])

  // Apply cached fortune to state only when it changes
  useEffect(() => {
    if (!cachedFortune) return
    setLifetimeFortune(cachedFortune.lifetime)
    setFortuneResults(cachedFortune.results)
  }, [cachedFortune])

  const fortuneTypes: { id: FortuneType; label: string }[] = [
    { id: 'lifetime', label: t('fortune.lifetime') },
    { id: 'yearly', label: t('fortune.yearly') },
    { id: 'monthly', label: t('fortune.monthly') },
  ]

  const fortuneCategories: { id: FortuneCategory; label: string }[] = [
    { id: 'total', label: t('fortune.total') },
    { id: 'wealth', label: t('fortune.wealth') },
    { id: 'business', label: t('fortune.business') },
    { id: 'love', label: t('fortune.love') },
    { id: 'relationships', label: t('fortune.relationships') },
    { id: 'health', label: t('fortune.health') },
  ]

  const handleViewFortune = useCallback(() => {
    // Check and deduct points
    if (!hasEnoughPoints(ANALYSIS_COST)) {
      setShowPointsModal(true)
      return
    }
    if (!deductPoints(ANALYSIS_COST)) {
      return
    }

    try {
      const saju = calculateSaju(year, month, day, hour)
      if (!saju) {
        console.log('[v0] Saju calculation failed')
        return
      }
      setSajuResult(saju)
      // The cached fortune will be computed and applied via useMemo + useEffect
      setShowResult(true)
    } catch (error) {
      console.log('[v0] Error in handleViewFortune:', error)
      // Show error but don't crash
      setSajuResult(null)
      setShowResult(false)
    }
  }, [year, month, day, hour, hasEnoughPoints, deductPoints, ANALYSIS_COST])

  if (showResult && sajuResult) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={() => setShowResult(false)}
          className="text-purple-700 hover:text-purple-800"
        >
          {`← ${t('button.back')}`}
        </Button>
        
        {/* 평생운 결과 (초년/중년/말년) - 메인 운세 결과 먼저 표시 */}
        {lifetimeFortune && (
      <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-amber-500">
          <h3 className="text-xl font-bold text-amber-800 mb-4">
            {t('fortune.lifetime')} - {getCategoryName(lifetimeFortune.category)}
          </h3>
            
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {/* 초년운 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                <h4 className="font-bold text-green-700 text-xs mb-2">{t('lifetime.earlyTitle')}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i < Math.ceil(lifetimeFortune.early.score / 2) ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-600">{lifetimeFortune.early.score}/10</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-xs">{lifetimeFortune.early.description}</p>
              </div>

              {/* 중년운 */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-3">
                <h4 className="font-bold text-amber-700 text-xs mb-2">{t('lifetime.midTitle')}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i < Math.ceil(lifetimeFortune.mid.score / 2) ? 'bg-amber-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-600">{lifetimeFortune.mid.score}/10</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-xs">{lifetimeFortune.mid.description}</p>
              </div>

              {/* 말년운 */}
              <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-lg p-3">
                <h4 className="font-bold text-purple-700 text-xs mb-2">{t('lifetime.lateTitle')}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i < Math.ceil(lifetimeFortune.late.score / 2) ? 'bg-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-600">{lifetimeFortune.late.score}/10</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-xs">{lifetimeFortune.late.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* 한해운 결과 */}
        {fortuneType === 'yearly' && fortuneResults.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-purple-400">
            <h3 className="text-base font-bold text-gray-800 mb-3">
              {t('fortune.yearly')} - {getCategoryName(fortuneCategory)}
            </h3>
            
            <div className="space-y-2">
              {(Array.isArray(fortuneResults) ? fortuneResults : []).map((result, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-purple-700 text-xs">
                      {currentYear}{t('date.year')} {getCategoryName(result.category)}
                    </h4>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            i < Math.ceil(result.score / 2) ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-600">{result.score}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs">{result.description}</p>
                  <div className="mt-2 pt-2 border-t border-purple-100 flex gap-3 text-xs">
                    <span className="text-purple-600">{t('elements.luckyColor')}: <strong>{result.luckyColor}</strong></span>
                    <span className="text-purple-600">{t('elements.luckyNumber')}: <strong>{result.luckyNumber}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 월별운세 결과 */}
        {fortuneType === 'monthly' && fortuneResults.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-purple-400">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              {t('fortune.monthly')} - {getCategoryName(fortuneCategory)}
            </h3>

            <div className="space-y-4">
              {(Array.isArray(fortuneResults) ? fortuneResults : []).map((result, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-purple-700 text-xs">
                      {result.month}{t('date.month')} {getCategoryName(result.category)}
                    </h4>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < Math.ceil(result.score / 2) ? 'bg-purple-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-600">{result.score}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-xs">{result.description}</p>
                  <div className="mt-3 flex gap-3 text-xs">
                    <span className="text-purple-600">{t('elements.luckyColor')}: <strong>{result.luckyColor}</strong></span>
                    <span className="text-purple-600">{t('elements.luckyNumber')}: <strong>{result.luckyNumber}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 사주 분석 - 운세 결과 아래에 표시 */}
        <SajuResult result={sajuResult} language={language} />
        
        {/* 오행 분석 - 맨 아래 표시 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-amber-500">
          <h3 className="text-xl font-bold text-amber-800 mb-4">{t('elements.title')}</h3>
          
          <div className="space-y-4">
            {(sajuResult?.fiveElements ? Object.entries(sajuResult.fiveElements) : []).map(([element, value]) => {
              if (element === 'dominant') return null
              const total = sajuResult.fiveElements.wood + sajuResult.fiveElements.fire + 
                           sajuResult.fiveElements.earth + sajuResult.fiveElements.metal + 
                           sajuResult.fiveElements.water
              const percentage = total > 0 ? Math.round((value as number / total) * 100) : 0
              const hanjaMap: Record<string, string> = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' }
              
              return (
                <div key={element} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${elementColors[element]}`} />
                  <span className="w-14 text-xs font-medium text-gray-700">{elementNames[element]} <span className="text-gray-400">{hanjaMap[element]}</span></span>
                  <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${elementColors[element]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-medium text-gray-700">{value as number}</span>
                  <span className="w-10 text-right text-xs text-gray-500">{percentage}%</span>
                </div>
              )
            })}
          </div>

          {/* 주요 오행 */}
          <div className="mt-4 bg-amber-50 rounded-xl p-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-full ${elementColors[sajuResult?.fiveElements?.dominant || 'wood']} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-xs">{elementNames[sajuResult?.fiveElements?.dominant || 'wood']?.charAt(0) || 'W'}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 text-xs">{t('elements.main')}: <span className="text-amber-700">{elementNames[sajuResult?.fiveElements?.dominant || 'wood']}</span></h4>
                <p className="text-xs text-gray-500 leading-tight">{getElementInfo(sajuResult?.fiveElements?.dominant || 'wood', language).description}</p>
              </div>
            </div>
            {/* 행운 정보 가로 3열 */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <div className="bg-white rounded-lg p-1.5 text-center">
                <p className="text-gray-400 mb-0.5 text-xs">{t('elements.luckyColor')}</p>
                <p className="font-semibold text-gray-700 text-xs">{getElementInfo(sajuResult.fiveElements.dominant, language).color}</p>
              </div>
              <div className="bg-white rounded-lg p-1.5 text-center">
                <p className="text-gray-400 mb-0.5 text-xs">{t('elements.luckyNumber')}</p>
                <p className="font-semibold text-gray-700 text-xs">{getElementInfo(sajuResult.fiveElements.dominant, language).numbers}</p>
              </div>
              <div className="bg-white rounded-lg p-1.5 text-center">
                <p className="text-gray-400 mb-0.5 text-xs">{t('elements.luckyDirection')}</p>
                <p className="font-semibold text-gray-700 text-xs">{getElementInfo(sajuResult?.fiveElements?.dominant || 'wood', language).direction}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-amber-50/30 via-white to-amber-100/10 rounded-3xl p-6">

      {/* 운세 종류 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-gray-800 mb-3">{t('fortune.type')}</h3>
        <RadioGroup
          value={fortuneType}
          onValueChange={(v) => setFortuneType(v as FortuneType)}
          className="grid grid-cols-2 gap-3"
        >
          {(Array.isArray(fortuneTypes) ? fortuneTypes : []).map((type) => (
            <div key={type.id} className="flex items-center gap-2">
              <RadioGroupItem 
                value={type.id} 
                id={type.id}
                className="border-purple-400 text-purple-600"
              />
              <Label htmlFor={type.id} className="text-gray-700 cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 운세 카테고리 */}
      <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
        <h3 className="font-semibold text-gray-800 mb-3">{t('fortune.category')}</h3>
        <RadioGroup
          value={fortuneCategory}
          onValueChange={(v) => setFortuneCategory(v as FortuneCategory)}
          className="grid grid-cols-2 gap-3"
        >
          {(Array.isArray(fortuneCategories) ? fortuneCategories : []).map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <RadioGroupItem 
                value={cat.id} 
                id={`cat-${cat.id}`}
                className="border-purple-400 text-purple-600"
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-gray-700 cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button 
        onClick={handleViewFortune}
        className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white py-6 rounded-xl text-lg font-semibold shadow-lg"
      >
        {t('button.viewFortune')}
      </Button>

      {/* Points Insufficient Modal */}
      <PointsInsufficientModal
        isOpen={showPointsModal}
        onClose={() => setShowPointsModal(false)}
        currentPoints={points ?? 0}
        requiredPoints={ANALYSIS_COST}
        onWatchAd={() => {
          setShowPointsModal(false)
          // Navigate to profile page and highlight bonus section
          window.location.href = '/user-profile#bonus'
        }}
        onBuyPi={() => {
          setShowPointsModal(false)
          // Navigate to profile page to buy Pi
          window.location.href = '/user-profile#pi-charge'
        }}
      />
    </div>
  )
}
