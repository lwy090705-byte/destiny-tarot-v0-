"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { UserProfile } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { PointsInsufficientModal } from "./points-insufficient-modal"

interface CompatibilitySectionProps {
  profiles: UserProfile[]
  selectedProfile: UserProfile | null
}

interface PersonInput {
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  calendarType: 'solar' | 'lunar'
}

interface CompatibilityResult {
  overall: number
  love: number
  work: number
  trust: number
  summary: string
  advice: string
  element1: string
  element2: string
  personalityMatch: string
  strengths: string
  cautions: string
}

// 오행 계산 (생년 기준)
function getElement(year: number): 'wood' | 'fire' | 'earth' | 'metal' | 'water' {
  const remainder = year % 10
  if (remainder === 4 || remainder === 5) return 'wood'
  if (remainder === 6 || remainder === 7) return 'fire'
  if (remainder === 8 || remainder === 9) return 'earth'
  if (remainder === 0 || remainder === 1) return 'metal'
  return 'water'
}

// 오행 이름 다국어
function getElementName(el: string, language: Language): string {
  const names: Record<string, Record<Language, string>> = {
    wood:  { ko: '목(木)', en: 'Wood', ja: '木', zh: '木' },
    fire:  { ko: '화(火)', en: 'Fire', ja: '火', zh: '火' },
    earth: { ko: '토(土)', en: 'Earth', ja: '土', zh: '土' },
    metal: { ko: '금(金)', en: 'Metal', ja: '金', zh: '金' },
    water: { ko: '수(水)', en: 'Water', ja: '水', zh: '水' },
  }
  return names[el]?.[language] ?? el
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

  return { overall, love, work, trust, summary: '', advice: '', element1: el1, element2: el2 }
}

function generateResult(p1: PersonInput, p2: PersonInput, language: Language): CompatibilityResult {
  const el1 = getElement(p1.birthYear)
  const el2 = getElement(p2.birthYear)
  const seed = (p1.birthYear + p1.birthMonth * 3 + p1.birthDay * 7 + p2.birthYear + p2.birthMonth * 5 + p2.birthDay * 11) % 100

  const base = calcCompatibility(el1, el2, seed)

  // A. 관계 흐름 분석
  const relationshipFlow = [
    `${p1.name}님과 ${p2.name}님의 만남은 우연이 아닌 필연입니다. ${getElementName(el1, 'ko')}의 에너지와 ${getElementName(el2, 'ko')}의 에너지가 서로를 끌어당기며, 두 분 사이에는 강한 연결고리가 형성되어 있습니다. 현재 두 분의 관계는 서로에 대한 호기심과 탐구의 단계에 있으며, 시간이 흐를수록 더 깊은 이해와 신뢰가 쌓일 것입니다. 감정의 교류가 원활하며, 서로의 마음을 읽는 능력이 뛰어납니다.`,
    `두 분의 관계는 물처럼 자연스럽게 흐르고 있습니다. ${getElementName(el1, 'ko')}의 기운을 가진 ${p1.name}님이 ${getElementName(el2, 'ko')}의 기운을 가진 ${p2.name}님과 만나 아름다운 조화를 이루고 있습니다. 현재 감정적 균형이 잘 맞춰져 있으며, 서로에게 편안함을 주는 관계입니다. 다만, 때로는 너무 편안해서 긴장감이 사라질 수 있으니 가끔은 새로운 도전을 함께 해보세요.`,
    `${p1.name}님과 ${p2.name}님 사이에는 특별한 기운이 흐르고 있습니다. ${getElementName(el1, 'ko')}과 ${getElementName(el2, 'ko')}의 조합은 서로를 성장시키는 힘을 가지고 있습니다. 두 분이 함께할 때 창의적인 에너지가 샘솟으며, 혼자서는 상상하지 못했던 일들을 함께 이룰 수 있습니다.`,
  ]

  // B. 성격 궁합 분석
  const personalityMatch = [
    `${p1.name}님은 ${getElementName(el1, 'ko')}의 특성상 ${el1 === 'wood' ? '성장과 발전을 추구하며 진취적' : el1 === 'fire' ? '열정적이고 활동적' : el1 === 'earth' ? '안정적이고 신중' : el1 === 'metal' ? '결단력 있고 원칙적' : '지혜롭고 유연'}인 성향을 가지고 있습니다. 반면 ${p2.name}님은 ${getElementName(el2, 'ko')}의 영향으로 ${el2 === 'wood' ? '창의적이고 포용력이 넓' : el2 === 'fire' ? '사교적이고 낙천적' : el2 === 'earth' ? '책임감이 강하고 현실적' : el2 === 'metal' ? '섬세하고 완벽주의적' : '적응력이 뛰어나고 직관적'}습니다. 이 두 성향이 만나면 서로의 부족한 부분을 채워주며 완전한 조화를 이룹니다.`,
    `${getElementName(el1, 'ko')}의 ${p1.name}님과 ${getElementName(el2, 'ko')}의 ${p2.name}님은 서로 다른 매력을 가지고 있습니다. ${p1.name}님의 강점이 ${p2.name}님의 약점을 보완하고, 반대로 ${p2.name}님의 장점이 ${p1.name}님에게 새로운 시각을 열어줍니다. 두 분의 성격 차이는 갈등의 원인이 아니라 성장의 기회입니다.`,
    `성격적으로 두 분은 서로를 자극하는 관계입니다. ${p1.name}님의 ${getElementName(el1, 'ko')}적 성향과 ${p2.name}님의 ${getElementName(el2, 'ko')}적 성향이 만나 독특한 케미스트리를 만들어냅니다. 서로의 다름을 인정하고 존중할 때 최고의 파트너십이 완성됩니다.`,
  ]

  // C. 강점과 주의점
  const strengthsCautions = [
    {
      strengths: `두 분의 관계에서 가장 큰 강점은 '상호 보완성'입니다. ${p1.name}님이 앞서 나갈 때 ${p2.name}님이 든든한 지원군이 되어주고, ${p2.name}님이 어려움에 처했을 때 ${p1.name}님이 해결사 역할을 합니다. 또한 대화가 잘 통하며, 서로의 유머 코드가 맞아 함께 있으면 즐겁습니다. 공동의 목표를 향해 나아갈 때 시너지가 극대화됩니다.`,
      cautions: `주의해야 할 점은 '소통의 단절'입니다. 서로를 잘 안다고 생각해서 표현을 소홀히 하면 오해가 쌓일 수 있습니다. 바쁜 일상 속에서도 매일 대화하는 시간을 확보하세요. 또한 ${p1.name}님은 조급함을, ${p2.name}님은 우유부단함을 조심하세요.`,
    },
    {
      strengths: `두 분 관계의 강점은 '깊은 유대감'입니다. 시간이 흐를수록 서로에 대한 이해가 깊어지며, 말하지 않아도 상대방의 마음을 읽을 수 있게 됩니다. 위기 상황에서 더욱 단결하는 모습을 보이며, 외부의 어떤 시련에도 흔들리지 않는 관계를 구축할 수 있습니다.`,
      cautions: `조심해야 할 부분은 '감정적 충돌'입니다. 두 분 모두 자존심이 강한 편이라 한번 감정이 상하면 화해하기까지 시간이 걸릴 수 있습니다. 싸움 후에는 반드시 대화로 마무리하고, '옳고 그름'보다 '관계의 회복'에 초점을 맞추세요.`,
    },
    {
      strengths: `관계의 가장 큰 강점은 '성장 촉진'입니다. 두 분이 함께하면 개인일 때보다 더 나은 사람이 됩니다. 서로에게 좋은 자극을 주며, 꿈을 향해 나아가는 과정에서 최고의 응원군이 되어줍니다. 취미나 관심사를 공유하면 더욱 돈독해집니다.`,
      cautions: `주의점은 '기대치 관리'입니다. 상대방에게 과도한 기대를 하면 실망할 수 있습니다. 완벽한 사람은 없으며, 서로의 한계를 인정하는 것이 중요합니다. 또한 각자의 시간과 공간을 존중하세요.`,
    },
  ]

  // D. 미래 방향과 조언
  const futureAdvice = [
    `두 분의 미래는 밝습니다. ${getElementName(el1, 'ko')}과 ${getElementName(el2, 'ko')}의 조합은 장기적으로 안정적인 관계를 유지할 수 있는 좋은 궁합입니다. 앞으로의 관계를 더욱 발전시키려면 '함께하는 경험'을 많이 쌓으세요. 여행, 취미 활동, 새로운 도전을 함께하면 추억이 쌓이고 유대감이 강해집니다. 서로의 가족을 소중히 여기고, 주변 사람들과도 좋은 관계를 유지하세요. 1년 후, 5년 후, 10년 후의 모습을 함께 그려보고 공동의 목표를 설정하면 관계가 더욱 견고해집니다.`,
    `두 분의 앞길에는 무한한 가능성이 펼쳐져 있습니다. 현재의 좋은 에너지를 유지하면서 서로에게 감사하는 마음을 잊지 마세요. 조언 드리자면, 매일 하루에 한 번은 상대방에게 고마운 점을 말해주세요. 갈등이 생겼을 때는 '우리'라는 관점에서 문제를 바라보고, 승패가 아닌 해결에 초점을 맞추세요. 정기적으로 데이트를 하고, 특별한 날뿐만 아니라 평범한 날도 소중히 여기면 행복이 배가 됩니다.`,
    `${p1.name}님과 ${p2.name}님의 관계는 계속해서 성장할 잠재력을 가지고 있습니다. 미래를 위한 조언으로는, 첫째, 소통을 게을리하지 마세요. 둘째, 서로의 꿈을 응원하고 지지하세요. 셋째, 어려운 시기가 와도 함께 극복할 수 있다는 믿음을 가지세요. 두 분이 서로를 선택한 것은 최고의 선택이었습니다. 그 선택을 매일 새롭게 다짐하며 아름다운 미래를 만들어가세요.`,
  ]

  const si = seed % 3
  const scIdx = seed % 3

  return {
    ...base,
    summary: relationshipFlow[si],
    advice: futureAdvice[si],
    personalityMatch: personalityMatch[si],
    strengths: strengthsCautions[scIdx].strengths,
    cautions: strengthsCautions[scIdx].cautions,
  }
}

const defaultPerson = (): PersonInput => ({
  name: '',
  birthYear: 1995,
  birthMonth: 1,
  birthDay: 1,
  calendarType: 'solar',
})

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 80 ? 'bg-emerald-500' :
    score >= 60 ? 'bg-purple-500' :
    'bg-orange-400'

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-purple-700">{score}점</span>
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
  years,
  months,
  days,
}: {
  label: string
  person: PersonInput
  onChange: (p: PersonInput) => void
  profiles: UserProfile[]
  t: (k: string) => string
  years: number[]
  months: number[]
  days: number[]
}) {
  return (
    <div className="bg-white/80 rounded-xl p-4 space-y-3 border-l-2 border-rose-400">
      <h4 className="font-bold text-rose-700 text-center">{label}</h4>

      {/* 저장된 목록에서 선택 */}
      {profiles.length > 0 && (
        <div>
          <Label className="text-gray-500 text-xs">{t('compatibility.selectFromList')}</Label>
          <Select
            onValueChange={(id) => {
              const found = profiles.find(p => p.id === id)
              if (found) onChange({
                name: found.name,
                birthYear: found.birthYear,
                birthMonth: found.birthMonth,
                birthDay: found.birthDay,
                calendarType: found.calendarType,
              })
            }}
          >
            <SelectTrigger className="mt-1 border-gray-200 bg-white text-sm">
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

      {/* 이름 */}
      <div>
        <Label className="text-gray-500 text-xs">{t('compatibility.name')}</Label>
        <Input
          placeholder={t('compatibility.namePlaceholder')}
          value={person.name}
          onChange={e => onChange({ ...person, name: e.target.value })}
          className="mt-1 border-gray-200 bg-white"
        />
      </div>

      {/* 달력 */}
      <div>
        <Label className="text-gray-500 text-xs">{t('compatibility.calendarType')}</Label>
        <RadioGroup
          value={person.calendarType}
          onValueChange={v => onChange({ ...person, calendarType: v as 'solar' | 'lunar' })}
          className="flex gap-4 mt-1"
        >
          <div className="flex items-center gap-1">
            <RadioGroupItem value="solar" id={`${label}-solar`} className="border-rose-400 text-rose-600" />
            <Label htmlFor={`${label}-solar`} className="text-gray-700 cursor-pointer text-sm">
              {t('profile.solar')}
            </Label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem value="lunar" id={`${label}-lunar`} className="border-rose-400 text-rose-600" />
            <Label htmlFor={`${label}-lunar`} className="text-gray-700 cursor-pointer text-sm">
              {t('profile.lunar')}
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* 생년월일 */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label className="text-gray-500 text-xs">{t('date.year')}</Label>
          <Select value={person.birthYear.toString()} onValueChange={v => onChange({ ...person, birthYear: parseInt(v) })}>
            <SelectTrigger className="mt-1 border-gray-200 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-500 text-xs">{t('date.month')}</Label>
          <Select value={person.birthMonth.toString()} onValueChange={v => onChange({ ...person, birthMonth: parseInt(v) })}>
            <SelectTrigger className="mt-1 border-gray-200 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map(m => <SelectItem key={m} value={m.toString()}>{String(m).padStart(2,'0')}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-500 text-xs">{t('date.day')}</Label>
          <Select value={person.birthDay.toString()} onValueChange={v => onChange({ ...person, birthDay: parseInt(v) })}>
            <SelectTrigger className="mt-1 border-gray-200 bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {days.map(d => <SelectItem key={d} value={d.toString()}>{String(d).padStart(2,'0')}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

// v3 - uses useLanguage() context, no language prop
export function CompatibilitySection({ profiles, selectedProfile }: CompatibilitySectionProps) {
  const { language, t } = useLanguage()
  const { deductPoints, hasEnoughPoints, points } = usePoints()
  const ANALYSIS_COST = 10

  const years  = useMemo(() => Array.from({ length: 100 }, (_, i) => 2026 - i), [])
  const months = useMemo(() => Array.from({ length: 12 },  (_, i) => i + 1), [])
  const days   = useMemo(() => Array.from({ length: 31 },  (_, i) => i + 1), [])

  const [person1, setPerson1] = useState<PersonInput>(() =>
    selectedProfile
      ? { name: selectedProfile.name, birthYear: selectedProfile.birthYear, birthMonth: selectedProfile.birthMonth, birthDay: selectedProfile.birthDay, calendarType: selectedProfile.calendarType }
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

  const handleCalculate = () => {
    if (!person1.name.trim() || !person2.name.trim()) return
    
    // Check and deduct points
    if (!hasEnoughPoints(ANALYSIS_COST)) {
      setShowPointsModal(true)
      return
    }
    if (!deductPoints(ANALYSIS_COST)) {
      return
    }
    
    setResult(generateResult(person1, person2, language))
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
              <p className="text-xs text-rose-500">{getElementName(result.element1, language)}</p>
            </div>
            <div className="text-3xl text-pink-400 font-light">♥</div>
            <div className="text-center">
              <p className="font-bold text-gray-800">{person2.name}</p>
              <p className="text-xs text-rose-500">{getElementName(result.element2, language)}</p>
            </div>
          </div>

          {/* 종합 점수 원형 */}
          <div className="flex flex-col items-center">
            <div className={`text-6xl font-bold ${scoreColor}`}>{result.overall}</div>
            <div className="text-gray-500 text-sm mt-1">{t('compatibility.score')}</div>
          </div>

          {/* 항목별 점수 바 */}
          <div className="space-y-3">
            <ScoreBar score={result.love}  label={t('compatibility.love')}  />
            <ScoreBar score={result.work}  label={t('compatibility.work')}  />
            <ScoreBar score={result.trust} label={t('compatibility.trust')} />
          </div>
        </div>

        {/* A. 관계 흐름 분석 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-pink-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h4 className="font-bold text-rose-700 text-lg">관계 흐름 분석</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">{result.summary}</p>
        </div>

        {/* B. 성격 궁합 분석 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h4 className="font-bold text-purple-700 text-lg">성격 궁합 분석</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">{result.personalityMatch}</p>
        </div>

        {/* C. 강점과 주의점 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-amber-400">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h4 className="font-bold text-amber-700 text-lg">강점과 주의점</h4>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">✨</span>
                <h5 className="font-semibold text-green-700">강점</h5>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{result.strengths}</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <h5 className="font-semibold text-orange-700">주의점</h5>
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
            <h4 className="font-bold text-emerald-700 text-lg">미래 방향과 조언</h4>
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
    <div className="space-y-4 bg-gradient-to-br from-pink-50/30 via-white to-rose-100/10 rounded-3xl p-6">
      <h3 className="text-lg font-bold text-rose-800 text-center">{t('compatibility.title')}</h3>

      <PersonForm
        label={t('compatibility.person1')}
        person={person1}
        onChange={setPerson1}
        profiles={profiles}
        t={t}
        years={years}
        months={months}
        days={days}
      />
      <PersonForm
        label={t('compatibility.person2')}
        person={person2}
        onChange={setPerson2}
        profiles={profiles}
        t={t}
        years={years}
        months={months}
        days={days}
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
