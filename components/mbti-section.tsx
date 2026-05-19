"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  getMbtiQuestions,
  getMbtiTypeDisplay,
  MBTI_TYPES,
} from "@/lib/mbti/mbti-content"
import type { MBTIType } from "@/lib/mbti/mbti-types"
import {
  mbtiCareerLeadership,
  mbtiCareerWorkStyle,
  mbtiCompatResultParagraph,
  mbtiCompatTabScoreLabel,
  mbtiCompatTier,
  mbtiCompatUnlockedDetail,
  mbtiLoveExpressStyle,
  mbtiPersonalityCommStyle,
  mbtiResultCompatScoreLine,
} from "@/components/mbti/mbti-inline-labels"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"
import { Brain, Heart, Briefcase, Users, Lock, Sparkles, ChevronRight, Check } from "lucide-react"

export function MbtiSection() {
  const { t, language } = useLanguage()
  const { deductPoints, hasEnoughPoints, points, isHydrated } = usePoints()
  const ANALYSIS_COST = 10
  const [step, setStep] = useState<'start' | 'test' | 'result' | 'personality' | 'love' | 'career' | 'compatibility'>('start')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [result, setResult] = useState<MBTIType | null>(null)
  const [savedResult, setSavedResult] = useState<MBTIType | null>(null)
  const [partnerType, setPartnerType] = useState<MBTIType | null>(null)
  const [showPremium, setShowPremium] = useState(false)
  const [unlockedSections, setUnlockedSections] = useState<string[]>([])
  const [showPointsModal, setShowPointsModal] = useState(false)

  const questions = useMemo(() => getMbtiQuestions(language), [language])

  // Load saved result from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mbtiResult')
    if (saved) {
      setSavedResult(saved as MBTIType)
    }
    const unlocked = localStorage.getItem('mbtiUnlocked')
    if (unlocked) {
      setUnlockedSections(JSON.parse(unlocked))
    }
  }, [])

  const handleAnswer = (answer: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResult()
    }
  }

  const calculateResult = () => {
    // 포인트 검사 - 최상단에서 먼저 실행
    if ((points ?? 0) < ANALYSIS_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(ANALYSIS_COST)) {
      return
    }

    let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0

    questions.forEach((q, idx) => {
      const ans = answers[idx]
      if (!ans) return
      
      switch (q.dimension) {
        case 'EI':
          ans === 'A' ? E++ : I++
          break
        case 'SN':
          ans === 'A' ? S++ : N++
          break
        case 'TF':
          ans === 'A' ? T++ : F++
          break
        case 'JP':
          ans === 'A' ? J++ : P++
          break
      }
    })

    const type = `${E >= I ? 'E' : 'I'}${S >= N ? 'S' : 'N'}${T >= F ? 'T' : 'F'}${J >= P ? 'J' : 'P'}` as MBTIType
    setResult(type)
    setSavedResult(type)
    localStorage.setItem('mbtiResult', type)
    setStep('result')
  }

  const restartTest = () => {
    setStep('start')
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
    setPartnerType(null)
  }

  const handleFeatureClick = (feature: string) => {
    if (!savedResult) {
      // Start the test if user hasn't completed it yet
      // 포인트 검사는 위의 4개 버튼에서 이미 함
      setStep('test')
      return
    }
    
    // 프리미엄 기능에 대한 포인트 검사
    const FEATURE_COST = 10
    if ((points ?? 0) < FEATURE_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(FEATURE_COST)) {
      return
    }
    
    setStep(feature as any)
  }

  const unlockPremium = (section: string) => {
    const PREMIUM_COST = 10
    
    // 포인트 검사 - 최상단에서 먼저 실행
    if ((points ?? 0) < PREMIUM_COST) {
      setShowPointsModal(true)
      return
    }
    
    // 포인트 차감
    if (!deductPoints(PREMIUM_COST)) {
      return
    }
    
    const updated = [...unlockedSections, section]
    setUnlockedSections(updated)
    localStorage.setItem('mbtiUnlocked', JSON.stringify(updated))
    setShowPremium(false)
  }

  // Start Screen
  if (step === 'start') {
    return (
      <>
        <div className="space-y-6 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-4 pb-3">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('mbti.title')}</h2>
            <p className="text-gray-500 text-sm">
              {t('mbti.subtitle')}<br />
              {t('mbti.features')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Brain, labelKey: 'mbti.featurePersonality', color: "text-violet-500", action: 'personality' },
              { icon: Heart, labelKey: 'mbti.featureLoveStyle', color: "text-pink-500", action: 'love' },
              { icon: Briefcase, labelKey: 'mbti.featureCareer', color: "text-blue-500", action: 'career' },
              { icon: Users, labelKey: 'mbti.featureCompatibilityShort', color: "text-emerald-500", action: 'compatibility' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  // 포인트 검사 - 최상단에서 먼저 실행
                  if ((points ?? 0) < ANALYSIS_COST) {
                    setShowPointsModal(true)
                    return
                  }
                  // 포인트 검사 완료 후 기존 로직 실행
                  handleFeatureClick(item.action)
                }}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md hover:bg-gray-50 transition-all"
              >
                <item.icon className={`h-6 w-6 ${item.color}`} />
                <span className="text-sm font-medium text-gray-700">{t(item.labelKey)}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => {
              // 포인트 검사 - 최상단에서 먼저 실행
              if ((points ?? 0) < ANALYSIS_COST) {
                setShowPointsModal(true)
                return
              }
              // 포인트 검사 완료 후 테스트 시작
              setStep('test')
            }}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-6 rounded-xl text-lg font-bold"
          >
            {t('mbti.start')}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

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
          }}
        />
      </>
    )
  }

  // Test Screen
  if (step === 'test') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <>
        <div className="space-y-6 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-4 pb-3">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('mbti.question')} {currentQuestion + 1}/{questions.length}</span>
              <span className="text-violet-600 font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">
              {question.text}
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => handleAnswer('A')}
                className="w-full p-4 rounded-xl border-2 border-violet-200 bg-violet-50 hover:bg-violet-100 hover:border-violet-400 transition-all text-left"
              >
                <span className="font-semibold text-violet-700">A. </span>
                <span className="text-gray-700">{question.optionA}</span>
              </button>
              <button
                onClick={() => handleAnswer('B')}
                className="w-full p-4 rounded-xl border-2 border-fuchsia-200 bg-fuchsia-50 hover:bg-fuchsia-100 hover:border-fuchsia-400 transition-all text-left"
              >
                <span className="font-semibold text-fuchsia-700">B. </span>
                <span className="text-gray-700">{question.optionB}</span>
              </button>
            </div>
          </div>
        </div>

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
          }}
        />
      </>
    )
  }

  // Result Screen
  if (step === 'result' && result) {
    const data = getMbtiTypeDisplay(result, language)

    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-4 pb-3">
        {/* Result Header */}
        <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-6 text-white text-center`}>
          <div className="text-4xl mb-2">{data.emoji}</div>
          <div className="text-sm opacity-80 mb-1">{t('mbti.yourType')}</div>
          <div className="text-4xl font-black mb-2">{result}</div>
          <div className="text-xl font-bold">{data.title}</div>
        </div>

        {/* Personality Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-500" />
            {t('mbti.personality')}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            <h4 className="font-bold text-emerald-700 mb-2 text-sm">{t('mbti.strengths')}</h4>
            <ul className="space-y-1">
              {data.strengths.map((s, i) => (
                <li key={i} className="text-xs text-emerald-600 flex items-center gap-1">
                  <Check className="h-3 w-3" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
            <h4 className="font-bold text-rose-700 mb-2 text-sm">{t('mbti.weaknesses')}</h4>
            <ul className="space-y-1">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-rose-600 flex items-center gap-1">
                  <span className="w-3 h-3 text-center">-</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Love Style */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            {t('mbti.loveStyle')}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{data.loveStyle}</p>
        </div>

        {/* Career */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            {t('mbti.career')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.career.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Best Match */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {t('mbti.compatibility')}
          </h4>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-500">{t('mbti.bestMatch')}</span>
              <div className="flex gap-2 mt-1">
                {data.bestMatch.map(type => (
                  <span key={type} className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-lg text-sm font-bold border border-amber-200">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500">{t('mbti.goodMatch')}</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.goodMatch.map(type => (
                  <span key={type} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium: Detailed Report */}
        {!unlockedSections.includes('detailed') ? (
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-dashed border-gray-300">
            <div className="absolute inset-0 backdrop-blur-[1px] bg-white/50 rounded-2xl flex flex-col items-center justify-center">
              <Lock className="h-8 w-8 text-gray-400 mb-2" />
              <span className="font-bold text-gray-600">{t('mbti.detailedReport')}</span>
              <Button 
                onClick={() => unlockPremium('detailed')}
                className="mt-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm"
              >
                {t('mbti.unlockForPoints')}
              </Button>
            </div>
            <div className="opacity-20">
              <h4 className="font-bold text-gray-800 mb-2">{t('mbti.detailedTeaserTitle')}</h4>
              <p className="text-sm text-gray-600">{t('mbti.detailedTeaserDesc')}</p>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-5 border border-violet-200">
            <h4 className="font-bold text-violet-800 mb-3">{t('mbti.detailedFullTitle')}</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>{t('mbti.detailedHidden')}</strong>{' '}
                {t('mbti.detailedHiddenBody').replace('{type}', result)}
              </p>
              <p>
                <strong>{t('mbti.detailedGrowth')}</strong>{' '}
                {t('mbti.detailedGrowthBody')}
              </p>
              <p>
                <strong>{t('mbti.detailedStress')}</strong>{' '}
                {t('mbti.detailedStressBody').replace('{type}', result)}
              </p>
            </div>
          </div>
        )}

        {/* MBTI Compatibility Checker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-500" />
            {t('mbti.checkCompatibility')}
          </h4>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {MBTI_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setPartnerType(type)}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  partnerType === type
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {partnerType && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="text-2xl font-black text-violet-600">{result}</span>
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-2xl font-black text-fuchsia-600">{partnerType}</span>
              </div>
              
              {!unlockedSections.includes(`compat-${partnerType}`) ? (
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-3">{t('mbti.compatPremiumTeaser')}</p>
                  <Button 
                    onClick={() => unlockPremium(`compat-${partnerType}`)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm"
                  >
                    {t('mbti.unlockForPoints')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p className="text-emerald-700">
                    <strong>{t('mbti.compatScoreStrong')}</strong>{' '}
                    {mbtiResultCompatScoreLine(
                      language,
                      mbtiCompatTier(
                        data.bestMatch.includes(partnerType),
                        data.goodMatch.includes(partnerType)
                      )
                    )}
                  </p>
                  <p className="text-gray-600">
                    {t('mbti.compatPairPrefix').replace('{a}', result).replace('{b}', partnerType)}{' '}
                    {mbtiCompatResultParagraph(
                      language,
                      mbtiCompatTier(
                        data.bestMatch.includes(partnerType),
                        data.goodMatch.includes(partnerType)
                      )
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Restart Button */}
        <Button
          onClick={restartTest}
          variant="outline"
          className="w-full border-violet-300 text-violet-600 hover:bg-violet-50"
        >
          {t('mbti.restart')}
        </Button>
        </div>

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
          }}
        />
      </>
    )
  }

  // Personality Analysis Page
  if (step === 'personality' && savedResult) {
    const data = getMbtiTypeDisplay(savedResult, language)
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-violet-50/30 via-white to-fuchsia-100/20 rounded-3xl p-4 pb-3">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-violet-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className={`bg-gradient-to-br ${data.color} rounded-2xl p-6 text-white text-center`}>
          <div className="text-4xl mb-2">{data.emoji}</div>
          <div className="text-3xl font-black">{savedResult}</div>
          <div className="text-xl font-bold">{data.title}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.personalityCoreTitle')}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{data.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <h4 className="font-bold text-emerald-700 mb-3">{t('mbti.strengths')}</h4>
              <ul className="space-y-2">
                {data.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-emerald-600 flex items-center gap-2">
                    <Check className="h-4 w-4" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
              <h4 className="font-bold text-rose-700 mb-3">{t('mbti.weaknesses')}</h4>
              <ul className="space-y-2">
                {data.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-rose-600 flex items-center gap-2">
                    <span>-</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.commStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiPersonalityCommStyle(language, savedResult.startsWith('E'))}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3">{t('mbti.growthDirectionTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.growthDirectionBody')}</p>
          </div>
        </div>
        </div>

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
          }}
        />
      </>
    )
  }

  // Love Style Page
  if (step === 'love' && savedResult) {
    const data = getMbtiTypeDisplay(savedResult, language)
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-pink-50/30 via-white to-rose-100/20 rounded-3xl p-4 pb-3">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-pink-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💕</div>
          <div className="text-3xl font-bold">{t('mbti.lovePageTitle').replace('{type}', savedResult)}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-rose-700 mb-2 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {t('mbti.loveTendencyTitle')}
            </h4>
            <p className="text-gray-600 text-sm">{data.loveStyle}</p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
            <h4 className="font-bold text-rose-700 mb-3">{t('mbti.emotionExpressTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiLoveExpressStyle(language, savedResult.includes('F'))}
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-5 border border-pink-200">
            <h4 className="font-bold text-pink-700 mb-3">{t('mbti.relationshipStrengthTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {t('mbti.relationshipStrengthBody')
                .replace('{type}', savedResult)
                .replace('{match}', data.bestMatch[0])}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-3">{t('mbti.cautionTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.cautionBody')}</p>
          </div>
        </div>
        </div>

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
          }}
        />
      </>
    )
  }

  // Career Tendency Page
  if (step === 'career' && savedResult) {
    const data = getMbtiTypeDisplay(savedResult, language)
    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-blue-50/30 via-white to-indigo-100/20 rounded-3xl p-4 pb-3">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-blue-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💼</div>
          <div className="text-3xl font-bold">{t('mbti.careerPageTitle').replace('{type}', savedResult)}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {t('mbti.recommendedJobsTitle')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.career.map((c, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
            <h4 className="font-bold text-blue-700 mb-3">{t('mbti.workStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiCareerWorkStyle(language, savedResult.includes('J'))}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-200">
            <h4 className="font-bold text-indigo-700 mb-3">{t('mbti.leadershipStyleTitle')}</h4>
            <p className="text-gray-600 text-sm">
              {mbtiCareerLeadership(language, savedResult.startsWith('E'))}
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h4 className="font-bold text-amber-700 mb-3">{t('mbti.careerAdviceTitle')}</h4>
            <p className="text-gray-600 text-sm">{t('mbti.careerAdviceBody')}</p>
          </div>
        </div>
        </div>

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
          }}
        />
      </>
    )
  }

  // Compatibility Checker
  if (step === 'compatibility' && savedResult) {
    const data = getMbtiTypeDisplay(savedResult, language)
    const compatibilityScore = () => {
      if (data.bestMatch.includes(partnerType as MBTIType)) return 95
      if (data.goodMatch.includes(partnerType as MBTIType)) return 80
      return 65
    }

    return (
      <>
        <div className="space-y-4 bg-gradient-to-br from-emerald-50/30 via-white to-teal-100/20 rounded-3xl p-4 pb-3">
        <Button
          variant="ghost"
          onClick={() => setStep(result ? 'result' : 'start')}
          className="text-emerald-600"
        >
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center">
          <div className="text-4xl mb-2">💞</div>
          <div className="text-3xl font-bold">{t('mbti.compatPageTitle')}</div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">{t('mbti.selectPartnerTitle')}</h4>
            <div className="grid grid-cols-4 gap-2">
              {MBTI_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setPartnerType(type)}
                  className={`p-3 rounded-lg text-xs font-bold transition-all ${
                    partnerType === type
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {partnerType && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-3xl font-black text-violet-600">{savedResult}</span>
                  <Heart className="h-8 w-8 text-pink-500" />
                  <span className="text-3xl font-black text-fuchsia-600">{partnerType}</span>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-600">
                    {compatibilityScore()}
                    {t('mbti.scoreUnit')}
                  </div>
                  <p className="text-emerald-700 font-bold mt-1">
                    {mbtiCompatTabScoreLabel(
                      language,
                      mbtiCompatTier(
                        compatibilityScore() === 95,
                        compatibilityScore() === 80
                      )
                    )}
                  </p>
                </div>
              </div>

              {!unlockedSections.includes(`compat-${partnerType}`) ? (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 text-center">
                  <Lock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-amber-700 font-semibold mb-3">{t('mbti.compatPremiumLockedTitle')}</p>
                  <Button 
                    onClick={() => unlockPremium(`compat-${partnerType}`)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white w-full"
                  >
                    {t('mbti.unlockForPoints')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                    <h4 className="font-bold text-emerald-700 mb-2">{t('mbti.strengthsTogetherTitle')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t('mbti.strengthsTogetherLead')}{' '}
                      {mbtiCompatUnlockedDetail(
                        language,
                        mbtiCompatTier(
                          data.bestMatch.includes(partnerType as MBTIType),
                          data.goodMatch.includes(partnerType as MBTIType)
                        )
                      )}
                    </p>
                  </div>

                  <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200">
                    <h4 className="font-bold text-rose-700 mb-2">{t('mbti.conflictRiskTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('mbti.conflictRiskBody')}</p>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                    <h4 className="font-bold text-blue-700 mb-2">{t('mbti.communicationTipsTitle')}</h4>
                    <p className="text-gray-600 text-sm">{t('mbti.communicationTipsBody')}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        </div>

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
          }}
        />
      </>
    )
  }
}
