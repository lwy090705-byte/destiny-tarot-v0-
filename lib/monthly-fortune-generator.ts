import type { Language } from './i18n'
import type { FortuneCategory } from './types'
import { getFortuneContentLanguage } from './fortune-generator'
import {
  MONTHLY_CATEGORY_ACCENTS,
  MONTHLY_FORTUNE_PARAGRAPHS,
} from './monthly-fortune-content'

const MIN_MONTHLY_LENGTH = 120
const MAX_MONTHLY_LENGTH = 2000

function stableIndex(seed: number, salt: number, size: number): number {
  if (size <= 0) return 0
  const mixed = Math.abs(((seed + salt) * 2654435761) ^ (seed >>> 3) ^ (salt << 5))
  return mixed % size
}

function normalizeCategory(category?: FortuneCategory | string): string {
  if (!category) return 'total'
  if (category === 'relationship') return 'relationships'
  return category
}

/**
 * 월별 운세 본문 생성
 * - [총운][기회][주의][조언] 4요소가 자연스럽게 이어지는 한 문단
 * - 월·시드·카테고리별로 다른 변형 선택
 * - 모든 지원 언어에서 동일한 정보량 유지 (요약/축약 없음)
 */
export function generateRichMonthlyFortune(
  month: number,
  seed: number,
  language: Language | string,
  category?: FortuneCategory | string
): string {
  const lang = getFortuneContentLanguage(language)
  const monthIndex = Math.max(1, Math.min(12, month)) - 1
  const monthSeed = seed + month * 104729 + monthIndex * 1543

  const pool =
    MONTHLY_FORTUNE_PARAGRAPHS[lang] ??
    MONTHLY_FORTUNE_PARAGRAPHS.en ??
    MONTHLY_FORTUNE_PARAGRAPHS.ko

  const monthVariants = pool[monthIndex]
  if (!monthVariants?.length) {
    return pool[0]?.[0] ?? ''
  }

  const variantIdx = stableIndex(monthSeed, 17, monthVariants.length)
  let text = monthVariants[variantIdx] ?? monthVariants[0] ?? ''

  const categoryKey = normalizeCategory(category)
  const accentPool =
    MONTHLY_CATEGORY_ACCENTS[lang]?.[categoryKey] ??
    MONTHLY_CATEGORY_ACCENTS.en?.[categoryKey]

  if (accentPool?.length && categoryKey !== 'total') {
    const accentIdx = stableIndex(monthSeed, 53, accentPool.length)
    const accent = accentPool[accentIdx]
    if (accent && !text.includes(accent)) {
      const cautionMarkers = [
        '다만 ',
        '但如果',
        'But ',
        'Still,',
        'しかし',
        'Pero ',
        'Mais ',
        'Doch ',
        'लेकिन ',
        'Tuy nhiên ',
        'แต่ ',
        'Namun ',
      ]
      let inserted = false
      for (const marker of cautionMarkers) {
        const idx = text.indexOf(marker)
        if (idx > 40) {
          text = `${text.slice(0, idx)}${accent} ${text.slice(idx)}`
          inserted = true
          break
        }
      }
      if (!inserted) {
        text = `${text} ${accent}`
      }
    }
  }

  text = text.replace(/\s+/g, ' ').trim()

  if (text.length < MIN_MONTHLY_LENGTH) {
    const extraIdx = stableIndex(monthSeed, 91, monthVariants.length)
    const extra = monthVariants[(variantIdx + extraIdx + 1) % monthVariants.length]
    if (extra && extra !== text) {
      text = `${text} ${extra}`
    }
  }

  if (text.length > MAX_MONTHLY_LENGTH) {
    return text.slice(0, MAX_MONTHLY_LENGTH).trim()
  }

  return text
}

/** 프롬프트/생성 규칙 요약 (디버그·문서용) */
export const MONTHLY_FORTUNE_GENERATION_PROMPT = `
월별 운세 생성 규칙:
1. 길이: 최소 120자, 권장 180~300자 (모든 언어 동일 정보량, 번역 요약 금지)
2. 구성: [총운] 전반 흐름 + [기회] 좋은 기회 분야 + [주의] 조심할 점 + [조언] 실천 행동을 하나의 문단으로 자연스럽게 연결
3. 반복 금지: "인생의 진정한 목적", "새로운 방향으로 이동", "잠재력이 발현", "전체적인 운세의 흐름" 등 고정 문구 남용 금지
4. 월별 차별화: 1월 새출발·목표 / 2월 인간관계·협력 / 3월 학업·자기계발 / 4월 변화·도전 / 5월 재물·기회 / 6월 대인관계 / 7월 행동력 / 8월 성과·결실 / 9월 정리·재정비 / 10월 연애·감정 / 11월 직장·사업 / 12월 마무리·내년 준비
5. 변형: 월마다 3개 이상 서로 다른 문단 변형, 시드 기반 선택으로 사용자별·월별 차별화
6. 카테고리: total/wealth/business/love/relationships/health 별 짧은 강조 문장 삽입
`.trim()
