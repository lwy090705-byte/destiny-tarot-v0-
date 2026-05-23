"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { UserProfile } from "@/lib/types"
import type { Language } from "@/lib/i18n"
import { pickLabel, type FullLabelRow } from "@/lib/fortune-generator"
import { buildCompatibilityNarrative, compatibilityElementLabel } from "@/lib/compatibility-result-text"
import {
  loadCompatibilityResult,
  personInputToCompatPerson,
  type CompatibilityCachedResult,
} from "@/lib/fortune-compatibility"
import { hashSeedKeyToNumber, buildCompatibilitySeedKey } from "@/lib/fortune-seed"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"

interface CompatibilitySectionProps {
  profiles: UserProfile[]
  selectedProfile: UserProfile | null
  userCode?: string
}

interface PersonInput {
  profileId?: string
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  gender?: 'male' | 'female'
  calendarType: 'solar' | 'lunar'
}

type CompatibilityResult = CompatibilityCachedResult

// 오행 계산 (생년 기준)
function getElement(year: number): 'wood' | 'fire' | 'earth' | 'metal' | 'water' {
  const remainder = year % 10
  if (remainder === 4 || remainder === 5) return 'wood'
  if (remainder === 6 || remainder === 7) return 'fire'
  if (remainder === 8 || remainder === 9) return 'earth'
  if (remainder === 0 || remainder === 1) return 'metal'
  return 'water'
}


type FiveEl = 'wood' | 'fire' | 'earth' | 'metal' | 'water'

const COMPAT_SCORE_SUFFIX: FullLabelRow = {
  ko: "점",
  en: " pts",
  ja: "点",
  zh: "分",
  es: " pts",
  id: " poin",
  fr: " pts",
  de: " Pkt.",
  pt: " pts",
  hi: " अंक",
  vi: " điểm",
  th: " คะแนน",
}

// 오행 상생·상극 기반 궁합 점수
function calcCompatibility(el1: string, el2: string, seed: number): CompatibilityResult {
  // 상생 쌍 (목→화, 화→토, 토→금, 금→수, 수→목)
  const generating: Record<string, string> = {
    wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
  }
  // 상극 쌍 (목→토, 토→수, 수→화, 화→금, 금→목)
  const overcoming: Record<string, string> = {
    wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood',
  }

  let base = 60
  if (el1 === el2) base = 75
  else if (generating[el1] === el2 || generating[el2] === el1) base = 88
  else if (overcoming[el1] === el2 || overcoming[el2] === el1) base = 45

  const r = seed % 15
  const overall = Math.min(99, Math.max(30, base + r - 7))
  const love    = Math.min(99, Math.max(30, base + ((seed * 3) % 15) - 7))
  const work    = Math.min(99, Math.max(30, base + ((seed * 7) % 15) - 7))
  const trust   = Math.min(99, Math.max(30, base + ((seed * 11) % 15) - 7))

  return {
    overall,
    love,
    work,
    trust,
    summary: '',
    advice: '',
    personalityMatch: '',
    strengths: '',
    cautions: '',
    element1: el1,
    element2: el2,
  }
}

function generateResult(p1: PersonInput, p2: PersonInput, language: Language): CompatibilityResult {
  const el1 = getElement(p1.birthYear)
  const el2 = getElement(p2.birthYear)
  const idA = p1.profileId ?? `anon-${p1.birthYear}-${p1.birthMonth}-${p1.birthDay}`
  const idB = p2.profileId ?? `anon-${p2.birthYear}-${p2.birthMonth}-${p2.birthDay}`
  const seedKey = buildCompatibilitySeedKey(
    {
      id: idA,
      birthYear: p1.birthYear,
      birthMonth: p1.birthMonth,
      birthDay: p1.birthDay,
      birthHour: p1.birthHour,
      gender: p1.gender,
    },
    {
      id: idB,
      birthYear: p2.birthYear,
      birthMonth: p2.birthMonth,
      birthDay: p2.birthDay,
      birthHour: p2.birthHour,
      gender: p2.gender,
    }
  )
  const seed = hashSeedKeyToNumber(seedKey) % 100

  const base = calcCompatibility(el1, el2, seed)
  const narrative = buildCompatibilityNarrative(language, p1, p2, el1, el2, seed)

  return {
    ...base,
    summary: narrative.summary,
    advice: narrative.advice,
    personalityMatch: narrative.personalityMatch,
    strengths: narrative.strengths,
    cautions: narrative.cautions,
  }
}

const defaultPerson = (): PersonInput => ({
  name: '',
  birthYear: 1995,
  birthMonth: 1,
  birthDay: 1,
  calendarType: 'solar',
})

function ScoreBar({ score, label, language }: { score: number; label: string; language: Language }) {
  const color =
    score >= 80 ? 'bg-emerald-500' :
    score >= 60 ? 'bg-purple-500' :
    'bg-orange-400'

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-purple-700">{score}{pickLabel(COMPAT_SCORE_SUFFIX, language)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function PersonForm({
  label,
  person,
  onChange,
  profiles,
  t,
}: {
  label: string
  person: PersonInput
  onChange: (p: PersonInput) => void
  profiles: UserProfile[]
  t: (k: string) => string
}) {
  // 현재 선택된 프로필 ID 추적 — controlled Select를 위해 필요
  const selectedId = profiles.find(
    p =>
      p.name === person.name &&
      p.birthYear === person.birthYear &&
      p.birthMonth === person.birthMonth &&
      p.birthDay === person.birthDay
  )?.id ?? ''

  const isSelected = !!person.name.trim()

  return (
    <div className="bg-white rounded-xl p-4 space-y-3 border-l-4 border-rose-400 shadow-sm">
      <h4 className="font-bold text-rose-700 text-center">{label}</h4>

      {/* 저장된 목록에서 선택 */}
      {profiles.length > 0 && (
        <div>
          <Label className="text-gray-500 text-xs">{t('compatibility.selectFromList')}</Label>
          <Select
            value={selectedId}
            onValueChange={(id) => {
              const found = profiles.find(p => p.id === id)
              if (found) onChange({
                profileId: found.id,
                name: found.name,
                birthYear: found.birthYear,
                birthMonth: found.birthMonth,
                birthDay: found.birthDay,
                birthHour: found.birthHour,
                gender: found.gender,
                calendarType: found.calendarType,
              })
            }}
          >
            <SelectTrigger className="mt-1 border-gray-200 bg-white text-sm text-gray-800">
              <SelectValue placeholder={t('compatibility.selectFromList')} />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(p => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name} ({p.birthYear}-{String(p.birthMonth).padStart(2,'0')}-{String(p.birthDay).padStart(2,'0')})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 선택 전 안내 */}
      {!isSelected && (
        <div className="bg-rose-50 rounded-xl p-3 text-center">
          <p className="text-rose-400 text-xs">{t('profile.emptyList')}</p>
        </div>
      )}

      {/* 선택 후 읽기 전용 정보 표시 */}
      {isSelected && (
        <>
          {/* 이름 읽기 전용 */}
          <div className="bg-gray-50 rounded-xl px-3 py-2.5" style={{ border: '1.5px solid #fca5a5' }}>
            <p className="text-gray-400 text-xs mb-0.5">{t('compatibility.name')}</p>
            <p className="text-[#2d1b4e] font-bold text-sm">{person.name}</p>
          </div>

          {/* 생년월일 읽기 전용 */}
          <div className="bg-gray-50 rounded-xl px-3 py-2.5" style={{ border: '1.5px solid #fca5a5' }}>
            <p className="text-gray-400 text-xs mb-1.5">{t('date.select')}</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-gray-400 text-xs mb-1">{t('date.year')}</p>
                <div className="h-9 bg-white rounded-lg flex items-center px-2.5 text-[#2d1b4e] font-semibold text-sm"
                  style={{ border: '1px solid #e5d4b8' }}>
                  {person.birthYear}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">{t('date.month')}</p>
                <div className="h-9 bg-white rounded-lg flex items-center px-2.5 text-[#2d1b4e] font-semibold text-sm"
                  style={{ border: '1px solid #e5d4b8' }}>
                  {String(person.birthMonth).padStart(2, '0')}
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">{t('date.day')}</p>
                <div className="h-9 bg-white rounded-lg flex items-center px-2.5 text-[#2d1b4e] font-semibold text-sm"
                  style={{ border: '1px solid #e5d4b8' }}>
                  {String(person.birthDay).padStart(2, '0')}
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-rose-500 font-medium px-2 py-0.5 rounded-full"
                style={{ background: '#fff1f2', border: '1px solid #fca5a5' }}>
                {person.calendarType === 'lunar' ? t('profile.lunar') : t('profile.solar')}
              </span>
              <span className="text-xs text-gray-400 ml-auto">{t('profile.readOnly')}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// v3 - uses useLanguage() context, no language prop
export function CompatibilitySection({ profiles, selectedProfile, userCode }: CompatibilitySectionProps) {
  const { language, t } = useLanguage()
  const { deductPoints, hasEnoughPoints, points } = usePoints()
  const ANALYSIS_COST = 10

  const years  = useMemo(() => Array.from({ length: 100 }, (_, i) => 2026 - i), [])
  const months = useMemo(() => Array.from({ length: 12 },  (_, i) => i + 1), [])
  const days   = useMemo(() => Array.from({ length: 31 },  (_, i) => i + 1), [])
  const [person1, setPerson1] = useState<PersonInput>(() =>
    selectedProfile
      ? {
          profileId: selectedProfile.id,
          name: selectedProfile.name,
          birthYear: selectedProfile.birthYear,
          birthMonth: selectedProfile.birthMonth,
          birthDay: selectedProfile.birthDay,
          birthHour: selectedProfile.birthHour,
          gender: selectedProfile.gender,
          calendarType: selectedProfile.calendarType,
        }
      : defaultPerson()
  )
  const [person2, setPerson2] = useState<PersonInput>(defaultPerson)
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [showPointsModal, setShowPointsModal] = useState(false)

  // 언어 변경 시 결과 리셋
  useEffect(() => {
    setResult(null)
  }, [language])

  // 언어가 변경되고 결과가 표시 중이면 호환성 재생성
  useEffect(() => {
    if (!result) return
    
    // handleCalculate를 재실행하여 새 언어로 호환성 재생성
    const newResult = generateResult(person1, person2, language)
    setResult(newResult)
  }, [language])

  const handleCalculate = async () => {
    if (!person1.name.trim() || !person2.name.trim()) return

    if (!hasEnoughPoints(ANALYSIS_COST)) {
      setShowPointsModal(true)
      return
    }
    if (
      !deductPoints(ANALYSIS_COST, {
        point_type: 'fortune_compatibility',
        description: 'Compatibility analysis',
      })
    ) {
      return
    }

    const compatA = personInputToCompatPerson(person1, 'person-1')
    const compatB = personInputToCompatPerson(person2, 'person-2')
    const data = await loadCompatibilityResult({
      personA: compatA,
      personB: compatB,
      language,
      userCode: userCode ?? null,
      generate: () => generateResult(person1, person2, language),
    })
    setResult(data)
  }

  const handleReset = () => setResult(null)

  if (result) {
    const scoreColor =
      result.overall >= 80 ? 'text-emerald-600' :
      result.overall >= 60 ? 'text-purple-600' :
      'text-orange-500'

    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={handleReset} className="text-rose-700 hover:text-rose-800">
          {`← ${t('button.back')}`}
        </Button>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-rose-500 space-y-5">
          <h3 className="text-xl font-bold text-rose-800 text-center">{t('compatibility.result')}</h3>

          {/* 두 사람 이름 + 오행 */}
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="font-bold text-gray-800">{person1.name}</p>
              <p className="text-xs text-rose-500">{compatibilityElementLabel(result.element1, language)}</p>
            </div>
            <div className="text-3xl text-pink-400 font-light">♥</div>
            <div className="text-center">
              <p className="font-bold text-gray-800">{person2.name}</p>
              <p className="text-xs text-rose-500">{compatibilityElementLabel(result.element2, language)}</p>
            </div>
          </div>

          {/* 종합 점수 원형 */}
          <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold ${scoreColor}`}>{result.overall}</div>
            <div className="text-gray-500 text-sm mt-1">{t('compatibility.score')}</div>
          </div>

          {/* 항목별 점수 바 */}
          <div className="space-y-3">
            <ScoreBar score={result.love}  label={t('compatibility.love')}  language={language} />
            <ScoreBar score={result.work}  label={t('compatibility.work')}  language={language} />
            <ScoreBar score={result.trust} label={t('compatibility.trust')} language={language} />
          </div>
        </div>

        {/* A. 관계 흐름 분석 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-pink-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h4 className="font-bold text-rose-700 text-lg">{t('compatibility.relationshipFlow')}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">{result.summary}</p>
        </div>

        {/* B. 성격 궁합 분석 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h4 className="font-bold text-purple-700 text-lg">{t('compatibility.personalityMatch')}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">{result.personalityMatch}</p>
        </div>

        {/* C. 강점과 주의점 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-amber-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h4 className="font-bold text-amber-700 text-lg">{t('compatibility.strengthsCautions')}</h4>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">✨</span>
                <h5 className="font-semibold text-green-700">{t('compatibility.strengths')}</h5>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{result.strengths}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <h5 className="font-semibold text-orange-700">{t('compatibility.cautions')}</h5>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{result.cautions}</p>
            </div>
          </div>
        </div>

        {/* D. 미래 방향과 조언 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-emerald-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <h4 className="font-bold text-emerald-700 text-lg">{t('compatibility.futureAdvice')}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">{result.advice}</p>
        </div>

        <Button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg"
        >
          {t('compatibility.again')}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 bg-gradient-to-br from-pink-50/30 via-white to-rose-100/10 rounded-3xl p-4 pb-3">
      <h3 className="text-lg font-bold text-rose-800 text-center">{t('compatibility.title')}</h3>

      <PersonForm
        label={t('compatibility.person1')}
        person={person1}
        onChange={setPerson1}
        profiles={profiles}
        t={t}
      />
      <PersonForm
        label={t('compatibility.person2')}
        person={person2}
        onChange={setPerson2}
        profiles={profiles}
        t={t}
      />

      <Button
        onClick={handleCalculate}
        disabled={!person1.name.trim() || !person2.name.trim()}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('compatibility.button')}
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
