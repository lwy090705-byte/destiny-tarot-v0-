/**
 * Myeongrihak (명리학) - Korean Eastern Astrology Engine
 * 
 * Implements Saju (사주) Four Pillars analysis:
 * - Year Pillar (연주)
 * - Month Pillar (월주)
 * - Day Pillar (일주)
 * - Hour Pillar (시주)
 * 
 * And Five Elements (오행) analysis
 */

type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water'
type YinYang = 'yang' | 'yin'

// ─── Saju Heavenly Stems (천간) ───────────────────────────────────────────
const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
const HEAVENLY_STEM_ELEMENTS: Element[] = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water']
const HEAVENLY_STEM_YIN_YANG = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0] // 1: Yang(양), 0: Yin(음)

// ─── Saju Earthly Branches (지지) ───────────────────────────────────────
const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
const EARTHLY_BRANCH_ELEMENTS: Element[] = ['water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water']
const EARTHLY_BRANCH_YIN_YANG = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]

export interface SajuPillarDetail {
  stem: string
  branch: string
  element: Element
  yinYang: YinYang
}

export interface SajuAnalysis {
  year: SajuPillarDetail
  month: SajuPillarDetail
  day: SajuPillarDetail
  hour?: SajuPillarDetail
  dominantElement: Element
  missingElements: Element[]
  elementBalance: Record<Element, number>
  yinYangBalance: { yang: number; yin: number }
  yinYangTendency: 'balanced' | 'yangDominant' | 'yinDominant'
}

export interface FortunePersonalization {
  birthHash: number
  sajuDominant: Element
  gender: 'male' | 'female'
  yinYangTendency: 'balanced' | 'yangDominant' | 'yinDominant'
  uniqueFactors: {
    missingElements: number
    elementBalance: number
    yinYangInfluence: number
  }
}

/**
 * Calculate Saju Four Pillars from birth date and time
 */
export function calculateSaju(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number | undefined,
  gender: 'male' | 'female'
): SajuAnalysis {
  // Year Pillar - Year divded by 10 gives stem, by 12 gives branch
  const yearStemIdx = birthYear % 10
  const yearBranchIdx = birthYear % 12
  const yearStem = HEAVENLY_STEMS[yearStemIdx]
  const yearBranch = EARTHLY_BRANCHES[yearBranchIdx]
  const yearElement = HEAVENLY_STEM_ELEMENTS[yearStemIdx]
  const yearYinYang = HEAVENLY_STEM_YIN_YANG[yearStemIdx] ? 'yang' : 'yin'

  // Month Pillar - More complex calculation based on solar terms
  // Simplified: use month (1-12) as branch directly
  const monthBranchIdx = ((birthMonth - 1) % 12)
  const monthStemIdx = (yearStemIdx * 2 + monthBranchIdx) % 10
  const monthStem = HEAVENLY_STEMS[monthStemIdx]
  const monthBranch = EARTHLY_BRANCHES[monthBranchIdx]
  const monthElement = HEAVENLY_STEM_ELEMENTS[monthStemIdx]
  const monthYinYang = HEAVENLY_STEM_YIN_YANG[monthStemIdx] ? 'yang' : 'yin'

  // Day Pillar - Day mod 10 for stem, mod 12 for branch
  const dayStemIdx = birthDay % 10
  const dayBranchIdx = birthDay % 12
  const dayStem = HEAVENLY_STEMS[dayStemIdx]
  const dayBranch = EARTHLY_BRANCHES[dayBranchIdx]
  const dayElement = HEAVENLY_STEM_ELEMENTS[dayStemIdx]
  const dayYinYang = HEAVENLY_STEM_YIN_YANG[dayStemIdx] ? 'yang' : 'yin'

  // Hour Pillar - If birth hour provided
  let hourStemIdx = 0
  let hourBranchIdx = 0
  let hourStem = '?'
  let hourBranch = '?'
  let hourElement: Element = 'wood'
  let hourYinYang: YinYang = 'yang'

  if (birthHour !== undefined) {
    hourBranchIdx = Math.floor(birthHour / 2) % 12
    hourStemIdx = (dayStemIdx * 2 + hourBranchIdx) % 10
    hourStem = HEAVENLY_STEMS[hourStemIdx]
    hourBranch = EARTHLY_BRANCHES[hourBranchIdx]
    hourElement = HEAVENLY_STEM_ELEMENTS[hourStemIdx]
    hourYinYang = HEAVENLY_STEM_YIN_YANG[hourStemIdx] ? 'yang' : 'yin'
  }

  // Count Five Elements
  const elements = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 }
  const elementSources: Element[] = [
    yearElement as Element,
    monthElement as Element,
    dayElement as Element,
  ]

  if (birthHour !== undefined) {
    elementSources.push(hourElement)
  }

  elementSources.forEach(el => {
    elements[el]++
  })

  // Find dominant and missing
  const dominantElement = (Object.entries(elements).reduce((a, b) => a[1] > b[1] ? a : b)[0] as Element)
  const missingElements: Element[] = (Object.entries(elements)
    .filter(([, count]) => count === 0)
    .map(([el]) => el as Element))

  // Count Yin/Yang
  const yinYangValues = [yearYinYang, monthYinYang, dayYinYang]
  if (birthHour !== undefined) yinYangValues.push(hourYinYang)
  const yangCount = yinYangValues.filter(v => v === 'yang').length
  const yinCount = yinYangValues.filter(v => v === 'yin').length
  const yinYangTendency = yangCount > yinCount ? 'yangDominant' : yinCount > yangCount ? 'yinDominant' : 'balanced'

  return {
    year: {
      stem: yearStem,
      branch: yearBranch,
      element: yearElement as Element,
      yinYang: yearYinYang,
    },
    month: {
      stem: monthStem,
      branch: monthBranch,
      element: monthElement as Element,
      yinYang: monthYinYang,
    },
    day: {
      stem: dayStem,
      branch: dayBranch,
      element: dayElement as Element,
      yinYang: dayYinYang,
    },
    hour: birthHour !== undefined ? {
      stem: hourStem,
      branch: hourBranch,
      element: hourElement,
      yinYang: hourYinYang,
    } : undefined,
    dominantElement,
    missingElements,
    elementBalance: elements,
    yinYangBalance: { yang: yangCount, yin: yinCount },
    yinYangTendency,
  }
}

/**
 * Create personalization factors for fortune generation
 * Ensures different users get different fortunes
 */
export function createPersonalization(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  birthHour: number | undefined,
  gender: 'male' | 'female'
): FortunePersonalization {
  const saju = calculateSaju(birthYear, birthMonth, birthDay, birthHour, gender)
  
  // Create birth hash from birth date and gender
  const birthHash = (birthYear * 10000 + birthMonth * 100 + birthDay) ^ (gender === 'male' ? 0xAAAA : 0x5555) ^ (birthHour || 0)
  
  // Count missing elements (0-5)
  const missingElements = saju.missingElements.length
  
  // Calculate element balance variance (0-4)
  const elementCounts = Object.values(saju.elementBalance)
  const avgCount = elementCounts.reduce((a, b) => a + b, 0) / elementCounts.length
  const variance = elementCounts.reduce((sum, count) => sum + Math.pow(count - avgCount, 2), 0) / elementCounts.length
  const elementBalance = Math.min(4, Math.floor(variance * 4))
  
  // Yin/Yang influence (0-2)
  const yinYangInfluence = saju.yinYangBalance.yang > saju.yinYangBalance.yin ? 2 : saju.yinYangBalance.yin > saju.yinYangBalance.yang ? 1 : 0

  return {
    birthHash: Math.abs(birthHash) % 100000,
    sajuDominant: saju.dominantElement,
    gender,
    yinYangTendency: saju.yinYangTendency,
    uniqueFactors: {
      missingElements,
      elementBalance,
      yinYangInfluence,
    },
  }
}

/**
 * Generate a unique seed for fortune generation based on:
 * - Birth date and time
 * - Current date
 * - Gender
 * - Saju factors
 */
export function generateUniqueSeed(
  personalization: FortunePersonalization,
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  categoryIndex: number
): number {
  const todayNum = currentYear * 10000 + currentMonth * 100 + currentDay
  const birthHashInfluence = personalization.birthHash
  const uniqueFactorsSum = 
    personalization.uniqueFactors.missingElements * 100 +
    personalization.uniqueFactors.elementBalance * 50 +
    personalization.uniqueFactors.yinYangInfluence * 200
  
  const seed = (todayNum + birthHashInfluence + uniqueFactorsSum + categoryIndex * 1000) % 100000
  return Math.abs(seed)
}

/**
 * Generate personalization variant index for more diversity
 * Uses birth info + category to get different variants
 */
export function getPersonalizationVariant(
  personalization: FortunePersonalization,
  categoryIndex: number,
  variantCount: number = 8
): number {
  const hash = (personalization.birthHash + categoryIndex * 7919) % variantCount
  return Math.abs(hash)
}

/**
 * Get element-based insight for personalizations
 */
export function getElementInsight(element: Element): { trait: string; strength: string; challenge: string } {
  const insights: Record<Element, { trait: string; strength: string; challenge: string }> = {
    wood: {
      trait: '성장과 창조의 에너지',
      strength: '새로운 시도에 두려움이 없고 창의적입니다',
      challenge: '때로는 너무 성급할 수 있습니다. 신중함이 필요합니다.'
    },
    fire: {
      trait: '열정과 에너지의 기운',
      strength: '활동적이고 매력적이며 주변을 밝게 합니다',
      challenge: '감정기복이 심할 수 있으니 감정 조절이 필요합니다.'
    },
    earth: {
      trait: '안정과 신뢰의 기운',
      strength: '책임감이 있고 믿을 수 있는 사람입니다',
      challenge: '변화에 적응하기 어려울 수 있습니다. 유연성을 키우세요.'
    },
    metal: {
      trait: '결단과 정의의 기운',
      strength: '명확한 판단력과 높은 기준을 가지고 있습니다',
      challenge: '너무 엄격할 수 있으니 유연함도 필요합니다.'
    },
    water: {
      trait: '지혜와 유연성의 기운',
      strength: '깊은 사고력과 타인의 감정을 잘 이해합니다',
      challenge: '때로는 결정이 늦을 수 있습니다. 행동도 중요합니다.'
    }
  }
  return insights[element]
}

/**
 * Get element-based advice based on dominant element and missing elements
 */
export function getElementAdvice(saju: SajuAnalysis, language: 'ko' | 'en' = 'ko'): string {
  const dominant = saju.dominantElement
  const missing = saju.missingElements

  if (language === 'ko') {
    const adviceMap: Record<Element, string> = {
      wood: '목(木)의 기운이 강해서 성장과 발전이 좋습니다. 새로운 도전을 두려워하지 마세요.',
      fire: '화(火)의 기운이 강해서 열정과 행동력이 뛰어납니다. 신중함도 함께 가져가세요.',
      earth: '토(土)의 기운이 강해서 안정과 신뢰가 있습니다. 변화에도 유연하게 대처하세요.',
      metal: '금(金)의 기운이 강해서 결단력과 정리 정돈이 좋습니다. 부드러움도 연습하세요.',
      water: '수(水)의 기운이 강해서 지혜와 유연성이 있습니다. 때로는 행동도 중요합니다.',
    }
    
    let advice = adviceMap[dominant]
    if (missing.length > 0) {
      advice += ` 부족한 ${missing.map(e => e === 'wood' ? '목' : e === 'fire' ? '화' : e === 'earth' ? '토' : e === 'metal' ? '금' : '수').join('/')}의 기운을 보충하려고 노력하세요.`
    }
    return advice
  } else {
    const adviceMap: Record<Element, string> = {
      wood: 'Wood element is strong, bringing growth and development. Do not fear new challenges.',
      fire: 'Fire element is strong, bringing passion and action. Remember to stay thoughtful too.',
      earth: 'Earth element is strong, bringing stability and trust. Be flexible to changes as well.',
      metal: 'Metal element is strong, bringing decisiveness and organization. Practice gentleness too.',
      water: 'Water element is strong, bringing wisdom and flexibility. Sometimes action is also important.',
    }
    return adviceMap[dominant]
  }
}
