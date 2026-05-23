"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SajuResult } from "./saju-result"
import { calculateSaju, elementColors, getElementInfo } from "@/lib/saju"
import type { FortuneProfileContext } from "@/lib/fortune"
import { loadMyungliFortuneBundle } from "@/lib/fortune-myungli-bundle"
import type { FortuneType, FortuneCategory, SajuResult as SajuResultType, FortuneResult, LifetimeFortune } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"

interface MyungliSectionProps {
  profileId?: string
  userCode?: string
  nickname?: string
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
  profileId,
  userCode,
  nickname,
  initialYear = 2000,
  initialMonth = 1,
  initialDay = 1,
  initialHour,
  initialName,
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
  const name = initialName?.trim() ? initialName : t('profile.defaultDisplayName')
  const gender = initialGender
  const currentYear = new Date().getFullYear()
  
  // Create profile context for personalized fortune generation - memoized to prevent recreations
  const profileContext: FortuneProfileContext = useMemo(() => ({
    profileId,
    userCode,
    nickname,
    name,
    birthYear: year || 2000,
    birthMonth: month || 1,
    birthDay: day || 1,
    birthHour: hour,
    gender: gender || 'male',
    isLunar: calendarType === 'lunar',
  }), [profileId, userCode, nickname, name, year, month, day, hour, gender, calendarType])
  
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

  useEffect(() => {
    if (!showResult || !sajuResult) return

    let cancelled = false

    loadMyungliFortuneBundle({
      profile: profileContext,
      fortuneType,
      fortuneCategory,
      language,
      userCode: userCode ?? null,
    })
      .then((bundle) => {
        if (cancelled) return
        setLifetimeFortune(bundle.lifetime)
        setFortuneResults(bundle.results)
      })
      .catch((error) => {
        console.error('[myungli] fortune load failed', error)
        if (cancelled) return
        setLifetimeFortune(null)
        setFortuneResults([
          {
            type: fortuneType,
            category: fortuneCategory,
            score: 7,
            description: t('fortune.generateError'),
            luckyColor: '#9C27B0',
            luckyNumber: '7',
          },
        ])
      })
    return () => {
      cancelled = true
    }
  }, [
    showResult,
    sajuResult,
    fortuneType,
    fortuneCategory,
    profileContext,
    language,
    userCode,
    t,
  ])

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
    if (!deductPoints(ANALYSIS_COST, { point_type: "fortune_myungli", description: "Myungli analysis" })) {
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
                <p className="text-gray-700 leading-relaxed text-sm">{lifetimeFortune.early.description}</p>
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
                <p className="text-gray-700 leading-relaxed text-sm">{lifetimeFortune.mid.description}</p>
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
                <p className="text-gray-700 leading-relaxed text-sm">{lifetimeFortune.late.description}</p>
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
                  <p className="text-gray-700 leading-relaxed text-sm">{result.description}</p>
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
                  <p className="text-gray-700 leading-relaxed text-sm">{result.description}</p>
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
              const elementKey = element as 'wood' | 'fire' | 'earth' | 'metal' | 'water'
              const elementLabel = t(`elements.${elementKey}`)

              return (
                <div key={element} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${elementColors[element]}`} />
                  <span className="w-14 text-xs font-medium text-gray-700">{elementLabel} <span className="text-gray-400">{hanjaMap[element]}</span></span>
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
                <span className="text-white font-bold text-xs">
                  {Array.from(t(`elements.${(sajuResult?.fiveElements?.dominant || 'wood') as 'wood'}`))[0] || 'W'}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 text-xs">
                  {t('elements.main')}:{' '}
                  <span className="text-amber-700">{t(`elements.${(sajuResult?.fiveElements?.dominant || 'wood') as 'wood'}`)}</span>
                </h4>
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

  // 운세 종류 아이콘 맵
  const typeIconMap: Record<string, string> = {
    lifetime: '/icons/fortune-lifetime.jpg',
    yearly:   '/icons/fortune-yearly.jpg',
    monthly:  '/icons/fortune-monthly.jpg',
  }

  // 운세 카테고리 아이콘 맵
  const categoryIconMap: Record<string, string> = {
    total:         '/icons/fortune-total.jpg',
    wealth:        '/icons/fortune-wealth.jpg',
    business:      '/icons/fortune-business.jpg',
    love:          '/icons/fortune-love.jpg',
    relationships: '/icons/fortune-relationships.jpg',
    health:        '/icons/fortune-health.jpg',
  }

  return (
    <div className="space-y-3">

      {/* 운세 종류 */}
      <div
        className="bg-white rounded-2xl shadow-sm"
        style={{ border: '1.5px solid #d4af37', padding: '10px 8px 12px' }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color: '#7c3aed', fontSize: 13, lineHeight: 1 }}>✦</span>
          <h3 className="font-bold text-gray-800 text-sm">{t('fortune.type')}</h3>
        </div>

        {/* gap 8로 카드 간격 줄여 각 카드 너비 최대화 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(Array.isArray(fortuneTypes) ? fortuneTypes : []).map((type) => {
            const isSelected = fortuneType === type.id
            return (
              <button
                key={type.id}
                onClick={() => setFortuneType(type.id as FortuneType)}
                style={{
                  borderRadius: 14,
                  border: isSelected ? '2px solid #7c3aed' : '1.5px solid #e5e7eb',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.09) 0%, rgba(168,85,247,0.13) 100%)'
                    : '#ffffff',
                  boxShadow: isSelected
                    ? '0 0 0 3px rgba(124,58,237,0.15), 0 4px 16px rgba(124,58,237,0.20)'
                    : '0 1px 4px rgba(0,0,0,0.07)',
                  /* padding: 라디오(16px) + icon(28px) + gap(6px) + 좌우(6+6) = 62px 소비
                     나머지 공간 전부 title에 할당 */
                  padding: '6px 6px 6px 6px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.15s, border-color 0.15s, background 0.15s',
                  minHeight: 56,
                  width: '100%',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                }}
              >
                {/* 라디오 도트 — in-flow (absolute 제거, flexShrink:0으로 고정 너비 확보) */}
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: isSelected ? '2px solid #7c3aed' : '2px solid #d1d5db',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed' }} />
                  )}
                </div>

                {/* 아이콘 — 28px compact */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? '0 0 10px rgba(124,58,237,0.60), 0 0 4px rgba(168,85,247,0.45)'
                      : '0 1px 4px rgba(0,0,0,0.15)',
                    filter: isSelected
                      ? 'brightness(1.12) saturate(1.25) drop-shadow(0 0 4px rgba(124,58,237,0.55))'
                      : 'none',
                    transition: 'box-shadow 0.15s, filter 0.15s',
                  }}
                >
                  <img
                    src={typeIconMap[type.id]}
                    alt={type.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* 제목 — 남은 공간 전부 차지, 2줄까지 허용 */}
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? '#5b21b6' : '#1f2937',
                    lineHeight: 1.3,
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {type.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 운세 카테고리 */}
      <div
        className="bg-white rounded-2xl shadow-sm"
        style={{ border: '1.5px solid #d4af37', padding: '10px 8px 12px' }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color: '#7c3aed', fontSize: 13, lineHeight: 1 }}>✦</span>
          <h3 className="font-bold text-gray-800 text-sm">{t('fortune.category')}</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {(Array.isArray(fortuneCategories) ? fortuneCategories : []).map((cat) => {
            const isSelected = fortuneCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setFortuneCategory(cat.id as FortuneCategory)}
                style={{
                  borderRadius: 14,
                  border: isSelected ? '2px solid #7c3aed' : '1.5px solid #e5e7eb',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.09) 0%, rgba(168,85,247,0.13) 100%)'
                    : '#ffffff',
                  boxShadow: isSelected
                    ? '0 0 0 3px rgba(124,58,237,0.15), 0 4px 16px rgba(124,58,237,0.20)'
                    : '0 1px 4px rgba(0,0,0,0.07)',
                  padding: '6px 6px 6px 6px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.15s, border-color 0.15s, background 0.15s',
                  minHeight: 52,
                  width: '100%',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                }}
              >
                {/* 라디오 도트 — in-flow */}
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    border: isSelected ? '2px solid #7c3aed' : '2px solid #d1d5db',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#7c3aed' }} />
                  )}
                </div>

                {/* 아이콘 — 28px compact */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? '0 0 10px rgba(124,58,237,0.60), 0 0 4px rgba(168,85,247,0.45)'
                      : '0 1px 4px rgba(0,0,0,0.15)',
                    filter: isSelected
                      ? 'brightness(1.12) saturate(1.25) drop-shadow(0 0 4px rgba(124,58,237,0.55))'
                      : 'none',
                    transition: 'box-shadow 0.15s, filter 0.15s',
                  }}
                >
                  <img
                    src={categoryIconMap[cat.id]}
                    alt={cat.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* 제목 */}
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? '#5b21b6' : '#1f2937',
                    lineHeight: 1.3,
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 운세 보기 버튼 */}
      <button
        onClick={handleViewFortune}
        style={{
          width: '100%',
          borderRadius: 16,
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 40%, #a855f7 70%, #c026d3 100%)',
          boxShadow: '0 6px 24px rgba(124,58,237,0.40), 0 0 0 2px rgba(212,175,55,0.50), inset 0 1px 0 rgba(255,255,255,0.18)',
          border: '2px solid #d4af37',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 18,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          letterSpacing: '-0.01em',
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>✦</span>
        <span>{t('button.viewFortune')}</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>✦</span>
      </button>

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
