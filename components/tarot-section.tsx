
"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { tarotCards } from "@/lib/tarot"
import { loadTarotReading, type TarotCachedPayload } from "@/lib/fortune-tarot-bundle"
import { userProfileToFortuneContext } from "@/lib/fortune"
import type { UserProfile } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { usePremium } from "@/lib/use-premium"
import { shouldSkipFortunePointCharge } from "@/lib/premium-access"
import { PointsInsufficientModal } from "./points-insufficient-modal"
import type { Language } from "@/lib/i18n"

type TarotType = 'love' | 'wealth' | 'career' | 'health'
type TarotMode = 'category' | 'mode' | 'cards'

const TAROT_CATEGORY_STYLES: Record<
  TarotType,
  {
    idleBg: string
    idleBorder: string
    idleText: string
    activeBg: string
    activeBorder: string
    activeText: string
    activeShadow: string
  }
> = {
  love: {
    idleBg: '#fdf2f8',
    idleBorder: '#f9a8d4',
    idleText: '#be185d',
    activeBg: '#fce7f3',
    activeBorder: '#ec4899',
    activeText: '#9d174d',
    activeShadow: 'rgba(236, 72, 153, 0.25)',
  },
  wealth: {
    idleBg: '#fefce8',
    idleBorder: '#fcd34d',
    idleText: '#92400e',
    activeBg: '#fef3c7',
    activeBorder: '#d4af37',
    activeText: '#78350f',
    activeShadow: 'rgba(212, 175, 55, 0.3)',
  },
  career: {
    idleBg: '#eff6ff',
    idleBorder: '#93c5fd',
    idleText: '#1e40af',
    activeBg: '#dbeafe',
    activeBorder: '#3b82f6',
    activeText: '#1e3a8a',
    activeShadow: 'rgba(59, 130, 246, 0.25)',
  },
  health: {
    idleBg: '#f0fdf4',
    idleBorder: '#86efac',
    idleText: '#15803d',
    activeBg: '#dcfce7',
    activeBorder: '#22c55e',
    activeText: '#14532d',
    activeShadow: 'rgba(34, 197, 94, 0.25)',
  },
}

interface TarotSectionProps {
  selectedProfile?: UserProfile | null
  userCode?: string
  nickname?: string
}

// v10-rebuild-trigger
export function TarotSection({ selectedProfile, userCode, nickname }: TarotSectionProps) {
  const { language, t } = useLanguage()
  const { deductPoints, hasEnoughPoints } = usePoints()
  const { premium } = usePremium()
  const ANALYSIS_COST = 10
  const skipPointCharge = shouldSkipFortunePointCharge(premium, 'tarot')

  const [tarotType, setTarotType] = useState<TarotType | null>(null)
  const [tarotMode, setTarotMode] = useState<'one' | 'three' | null>(null)
  const [selectedCards, setSelectedCards] = useState<typeof tarotCards>([])
  const [showResult, setShowResult] = useState(false)
  const [showPointsModal, setShowPointsModal] = useState(false)
  const [tarotPayload, setTarotPayload] = useState<TarotCachedPayload | null>(null)
  const { points } = usePoints()

  const profileSeed = useMemo(() => {
    if (selectedProfile) {
      return userProfileToFortuneContext(selectedProfile, { userCode, nickname })
    }
    return userProfileToFortuneContext(
      {
        id: 'tarot-guest',
        name: 'guest',
        birthYear: 2000,
        birthMonth: 1,
        birthDay: 1,
        calendarType: 'solar',
        gender: 'male',
      },
      { userCode, nickname }
    )
  }, [selectedProfile, userCode, nickname])

  // 언어 변경 시 결과 리셋
  useEffect(() => {
    setShowResult(false)
    setSelectedCards([])
    setTarotMode(null)
    setTarotType(null)
    setTarotPayload(null)
  }, [language])

  const requiredCount = tarotMode === 'one' ? 1 : tarotMode === 'three' ? 3 : 0

  const cards = [...tarotCards].sort(() => Math.random() - 0.5)

  const tarotCategoryButtons = useMemo(() => {
    const ids: TarotType[] = ['love', 'wealth', 'career', 'health']
    return ids.map((type) => ({
      type,
      label: t(`tarot.cat.${type}`),
      ...TAROT_CATEGORY_STYLES[type],
    }))
  }, [t])

  const cardSelectHint =
    tarotMode === 'one' ? t('tarot.hintSelectOneCard') : t('tarot.hintSelectThreeOrdered')

  const getCardImagePath = (cardId: number): string => {
    // 실제 존재하는 이미지 파일에 직접 매핑
    const cardImageMap: Record<number, string> = {
      // Major Arcana (0-21)
      0: '/tarot/00-fool.jpg',
      1: '/tarot/01-magician.jpg',
      2: '/tarot/02-priestess.jpg',
      3: '/tarot/03-empress.jpg',
      4: '/tarot/04-emperor.jpg',
      5: '/tarot/05-hierophant.jpg',
      6: '/tarot/06-lovers.jpg',
      7: '/tarot/07-chariot.jpg',
      8: '/tarot/08-strength.jpg',
      9: '/tarot/09-hermit.jpg',
      10: '/tarot/10-wheel.jpg',
      11: '/tarot/11-justice.jpg',
      12: '/tarot/12-hanged.jpg',
      13: '/tarot/13-death.jpg',
      14: '/tarot/14-temperance.jpg',
      15: '/tarot/15-devil.jpg',
      16: '/tarot/16-tower.jpg',
      17: '/tarot/17-star.jpg',
      18: '/tarot/18-moon.jpg',
      19: '/tarot/19-sun.jpg',
      20: '/tarot/20-judgement.jpg',
      21: '/tarot/21-world.jpg',
      // Cups (22-35)
      22: '/tarot/36-cups-ace.jpg',
      23: '/tarot/23-cups-two.jpg',
      24: '/tarot/38-cups-3.jpg',
      25: '/tarot/39-cups-4.jpg',
      26: '/tarot/40-cups-5.jpg',
      27: '/tarot/27-cups-six.jpg',
      28: '/tarot/42-cups-7.jpg',
      29: '/tarot/43-cups-8.jpg',
      30: '/tarot/44-cups-9.jpg',
      31: '/tarot/31-cups-ten.jpg',
      32: '/tarot/46-cups-page.jpg',
      33: '/tarot/47-cups-knight.jpg',
      34: '/tarot/48-cups-queen.jpg',
      35: '/tarot/49-cups-king.jpg',
      // Swords (36-49)
      36: '/tarot/50-swords-ace.jpg',
      37: '/tarot/51-swords-2.jpg',
      38: '/tarot/52-swords-3.jpg',
      39: '/tarot/53-swords-4.jpg',
      40: '/tarot/54-swords-5.jpg',
      41: '/tarot/55-swords-6.jpg',
      42: '/tarot/29-swords-eight.jpg',
      43: '/tarot/29-wands-8.jpg',
      44: '/tarot/29-swords-eight.jpg',
      45: '/tarot/31-cups-ten.jpg',
      46: '/tarot/32-wands-page.jpg',
      47: '/tarot/33-wands-knight.jpg',
      48: '/tarot/34-wands-queen.jpg',
      49: '/tarot/35-wands-king.jpg',
      // Wands (50-63)
      50: '/tarot/22-wands-ace.jpg',
      51: '/tarot/23-wands-2.jpg',
      52: '/tarot/24-wands-3.jpg',
      53: '/tarot/25-wands-4.jpg',
      54: '/tarot/26-wands-5.jpg',
      55: '/tarot/27-wands-6.jpg',
      56: '/tarot/28-wands-7.jpg',
      57: '/tarot/29-wands-8.jpg',
      58: '/tarot/30-wands-9.jpg',
      59: '/tarot/31-wands-10.jpg',
      60: '/tarot/32-wands-page.jpg',
      61: '/tarot/33-wands-knight.jpg',
      62: '/tarot/34-wands-queen.jpg',
      63: '/tarot/35-wands-king.jpg',
      // Pentacles (64-77) - 사용 가능한 이미지로 매핑
      64: '/tarot/22-wands-ace.jpg',
      65: '/tarot/23-cups-two.jpg',
      66: '/tarot/24-pentacles-three.jpg',
      67: '/tarot/25-swords-four.jpg',
      68: '/tarot/26-wands-5.jpg',
      69: '/tarot/27-cups-six.jpg',
      70: '/tarot/28-pentacles-seven.jpg',
      71: '/tarot/29-swords-eight.jpg',
      72: '/tarot/30-wands-9.jpg',
      73: '/tarot/31-cups-ten.jpg',
      74: '/tarot/32-wands-page.jpg',
      75: '/tarot/33-wands-knight.jpg',
      76: '/tarot/34-wands-queen.jpg',
      77: '/tarot/35-wands-king.jpg',
    }
    
    return cardImageMap[cardId] || '/tarot/00-fool.jpg'
  }

  const getCardName = (cardId: number, lang: Language): string => {
    const card = tarotCards.find(c => c.id === cardId)
    if (!card) return ''
    if (lang === 'ko') return card.nameKr
    if (lang === 'ja') return card.nameJp || card.nameKr
    if (lang === 'zh') return card.nameZh || card.nameKr
    return card.nameEn
  }

  const handleCardClick = (card: typeof tarotCards[0]) => {
    const already = selectedCards.find(c => c.id === card.id)
    if (already) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id))
    } else if (selectedCards.length < requiredCount) {
      setSelectedCards([...selectedCards, card])
    }
  }

  const handleReveal = async () => {
    if (!tarotType || !tarotMode || selectedCards.length < requiredCount) return

    if (!skipPointCharge) {
      if (!hasEnoughPoints(ANALYSIS_COST)) {
        setShowPointsModal(true)
        return
      }
      if (
        !deductPoints(ANALYSIS_COST, {
          point_type: 'fortune_tarot',
          description: 'Tarot analysis',
        })
      ) {
        return
      }
    }

    const positionLabels =
      tarotMode === 'three'
        ? [t('tarot.past'), t('tarot.present'), t('tarot.future')]
        : []

    const payload = await loadTarotReading({
      profile: profileSeed,
      tarotKind: tarotType,
      cardIds: selectedCards.map((c) => c.id),
      mode: tarotMode,
      language,
      userCode: userCode ?? null,
      positionLabels,
    })

    setTarotPayload(payload)
    setShowResult(true)
  }

  const handleReset = () => {
    setSelectedCards([])
    setShowResult(false)
    setTarotPayload(null)
  }

  const getPositionLabel = (index: number): string => {
    if (tarotMode === 'three') {
      const labels = [t('tarot.past'), t('tarot.present'), t('tarot.future')]
      return labels[index] || String(index + 1)
    }
    return t('tarot.card')
  }

  // 리딩 결과 화면
  if (showResult && tarotPayload) {
    const reading = tarotPayload.reading
    const cardInterpretations = tarotPayload.cardInterpretations

    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleReset} className="text-gray-700 hover:text-gray-800">
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-gray-900 space-y-5">
          <h3 className="text-xl font-bold text-gray-900 text-center">{t('tarot.yourReading')}</h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {selectedCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="relative w-16 h-24 mx-auto rounded-lg overflow-hidden shadow-md mb-2">
                  <Image
                    src={getCardImagePath(card.id)}
                    alt={getCardName(card.id, language)}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <p className="text-xs font-bold text-purple-700 mb-1">{getPositionLabel(index)}</p>
                <p className="text-xs font-medium text-gray-800">{getCardName(card.id, language)}</p>
              </div>
            ))}
          </div>

          {/* 세 장 뽑기일 때: 각 카드별 해석 */}
          {tarotMode === 'three' && cardInterpretations.length > 0 ? (
            <div className="space-y-3">
              {cardInterpretations.map((interp, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border-l-4 border-purple-400">
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">{interp.position}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{interp.message}</p>
                </div>
              ))}
            </div>
          ) : (
            // 한 장 뽑기일 때: 전체 해석
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-1">{t('tarot.reading')}</h4>
              <p className="text-gray-700 leading-relaxed text-sm">{reading.message}</p>
            </div>
          )}
        </div>

        <Button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-gray-800 to-purple-900 hover:from-gray-900 hover:to-purple-950 text-white py-6 rounded-xl text-lg font-semibold shadow-lg"
        >
          {t('button.again')}
        </Button>
      </div>
    )
  }

  const TAROT_CATEGORY_ICONS: Record<TarotType, string> = {
    love:   '/icons/tarot-love.jpg',
    wealth: '/icons/tarot-wealth.jpg',
    career: '/icons/tarot-career.jpg',
    health: '/icons/tarot-health.jpg',
  }


  // 타로 타입 선택 + 카드 선택 화면
  return (
    <div className="space-y-4 bg-gradient-to-br from-slate-700/10 via-white to-purple-900/10 rounded-3xl p-4 pb-3">
      {/* 카테고리 선택 버튼 - 2x2 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {tarotCategoryButtons.map(({ type, label, idleBg, idleBorder, idleText, activeBg, activeBorder, activeText, activeShadow }) => {
          const isActive = tarotType === type
          const subtitle = t(`tarot.subtitle.${type}`)
          return (
            <button
              key={type}
              onClick={() => { setTarotType(type); setTarotMode(null); setSelectedCards([]) }}
              className="rounded-2xl transition-all duration-200 text-left relative overflow-hidden"
              style={{
                background: isActive ? activeBg : idleBg,
                border: `1.5px solid ${isActive ? activeBorder : idleBorder}`,
                boxShadow: isActive
                  ? `0 0 0 3px ${activeShadow}, 0 4px 16px ${activeShadow}`
                  : '0 1px 4px rgba(0,0,0,0.06)',
                padding: '0',
              }}
            >
              {/* Icon image top */}
              <div
                style={{
                  width: '100%',
                  height: 90,
                  overflow: 'hidden',
                  borderRadius: '14px 14px 0 0',
                  position: 'relative',
                  background: isActive ? activeBg : idleBg,
                }}
              >
                <img
                  src={TAROT_CATEGORY_ICONS[type]}
                  alt={label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: isActive
                      ? 'brightness(1.08) saturate(1.2) drop-shadow(0 0 8px currentColor)'
                      : 'brightness(0.97) saturate(1)',
                    transition: 'filter 0.2s',
                  }}
                />
                {/* glow overlay on active */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(ellipse at 50% 80%, ${activeShadow} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {/* sparkle dots */}
                {isActive && (
                  <>
                    <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: activeText, opacity: 0.7 }}>✦</span>
                    <span style={{ position: 'absolute', top: 14, right: 20, fontSize: 7, color: activeText, opacity: 0.5 }}>✦</span>
                  </>
                )}
              </div>

              {/* Text area */}
              <div style={{ padding: '8px 10px 10px' }}>
                <div
                  className="font-bold text-sm leading-tight"
                  style={{ color: isActive ? activeText : idleText }}
                >
                  {label}
                </div>
                <div
                  className="text-xs mt-0.5 leading-snug"
                  style={{
                    color: isActive ? activeText : idleText,
                    opacity: 0.7,
                    wordBreak: 'keep-all',
                  }}
                >
                  {subtitle}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 한 장/세 장 선택 (카테고리 선택 후에만 표시) */}
      {tarotType && !tarotMode && (
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            onClick={() => setTarotMode('one')}
            className="rounded-2xl py-3.5 px-4 text-center transition-all duration-200 text-white font-semibold text-sm"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              boxShadow: '0 2px 10px rgba(139, 92, 246, 0.25)'
            }}
          >
            {t('tarot.pickOne')}
          </button>
          <button
            onClick={() => setTarotMode('three')}
            className="rounded-2xl py-3.5 px-4 text-center transition-all duration-200 text-white font-semibold text-sm"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              boxShadow: '0 2px 10px rgba(124, 58, 237, 0.25)'
            }}
          >
            {t('tarot.pickThree')}
          </button>
        </div>
      )}

      {/* 카드 선택 영역 (모드 선택 후에만 표시) */}
      {tarotMode && (
        <>
          <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-gray-900">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">
                {cardSelectHint}
              </p>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                {selectedCards.length} / {requiredCount}
              </span>
            </div>

            {/* 선택된 카드 미리보기 */}
            {selectedCards.length > 0 && (
              <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
                {selectedCards.map((card, idx) => (
                  <div key={`${card.id}-${idx}`} className="relative flex-shrink-0">
                    <div
                      className="relative rounded-lg overflow-hidden ring-2 ring-yellow-400"
                      style={{
                        width: 52,
                        height: 78,
                        boxShadow: '0 4px 16px rgba(212,175,55,0.4)',
                      }}
                    >
                      <Image
                        src={getCardImagePath(card.id)}
                        alt={getCardName(card.id, language)}
                        fill
                        className="object-cover"
                        sizes="52px"
                      />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 text-white text-xs font-bold bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* 카드 덱 */}
            <div
              className="overflow-x-auto pb-3 select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex px-4 py-5" style={{ gap: 0 }}>
                {cards.map((card, idx) => {
                  const isSelected = !!selectedCards.find(c => c.id === card.id)
                  const selIdx = selectedCards.findIndex(c => c.id === card.id)
                  const isDisabled = selectedCards.length >= requiredCount && !isSelected

                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      disabled={isDisabled}
                      className="relative flex-shrink-0 transition-all duration-200 focus:outline-none"
                      style={{
                        width: 72,
                        height: 108,
                        marginLeft: idx === 0 ? 0 : -36,
                        opacity: isDisabled ? 0.3 : 1,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        zIndex: isSelected ? 100 : idx,
                        transform: isSelected
                          ? 'translateY(-16px) scale(1.15)'
                          : 'none',
                        filter: isSelected
                          ? 'drop-shadow(0 8px 16px rgba(212,175,55,0.55))'
                          : isDisabled
                          ? 'none'
                          : 'drop-shadow(0 2px 4px rgba(91,33,182,0.25))',
                      }}
                    >
                      <div
                        className={`relative w-full h-full rounded-lg overflow-hidden ${
                          isSelected
                            ? 'ring-2 ring-yellow-400 shadow-xl'
                            : 'shadow-md'
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? '0 0 0 2px #fbbf24, 0 8px 24px rgba(212,175,55,0.4)'
                            : '0 2px 8px rgba(91,33,182,0.3)',
                        }}
                      >
                        <Image
                          src={isSelected ? getCardImagePath(card.id) : '/tarot/card-back.jpg'}
                          alt={isSelected ? getCardName(card.id, language) : 'Card Back'}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg pointer-events-none"
                          style={{ boxShadow: '0 2px 8px rgba(212,175,55,0.5)' }}
                        >
                          {selIdx + 1}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-1">{t('tarot.swipeHint')}</p>
          </div>

          {/* 하단 버튼 */}
          {selectedCards.length === requiredCount ? (
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-6 rounded-xl text-base font-semibold shadow-lg"
              >
                {t('button.back')}
              </Button>
              <Button
                onClick={handleReveal}
                className="flex-1 bg-gradient-to-r from-gray-800 to-purple-900 hover:from-gray-900 hover:to-purple-950 text-white py-6 rounded-xl text-base font-semibold shadow-lg"
              >
                {t('button.viewReading')}
              </Button>
            </div>
          ) : null}
        </>
      )}

      {/* Points Insufficient Modal */}
      <PointsInsufficientModal
        isOpen={showPointsModal}
        onClose={() => setShowPointsModal(false)}
        currentPoints={points}
        requiredPoints={ANALYSIS_COST}
        hideAdOptions={skipPointCharge || premium.benefits.hideAds}
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
