import type { FortuneResult, FortuneType, FortuneCategory, LifetimeFortune } from './types'
import type { Language } from './i18n'
import { getFortuneContentLanguage } from './fortune-generator'
import { getPersonalizationVariant, createPersonalization, type FortunePersonalization } from './myeongrihak'
import { getMonthlyFortune } from './monthly-fortunes'
import { 
  loveFortuneTemplates, 
  wealthFortuneTemplates, 
  careerFortuneTemplates, 
  healthFortuneTemplates,
  opportunityFortuneTemplates,
  warningFortuneTemplates,
  relationshipFortuneTemplates,
  lifetimeDetailedTemplates,
  yearlyDetailedTemplates,
  yearlyComprehensiveTemplates,
  monthlyDetailedTemplates,
  getFallbackTemplate,
  getMonthlyDetailedLine,
  getTemplateByIndex,
  getTemplateCount,
  getYearlyComprehensivePool,
  getYearlyDetailedPool,
} from './fortune-templates'

// ─── Safety Utils ─────────────────────────────────────────────────────────────

const MAX_DESCRIPTION_LENGTH = 2000
const MAX_RESULTS_COUNT = 12

/**
 * 운세 텍스트를 안전한 길이로 정규화
 */
function sanitizeDescription(text: unknown, language: Language = 'ko'): string {
  if (typeof text !== 'string') {
    return getFallbackTemplate('general', language)
  }
  
  const trimmed = text.trim()
  if (!trimmed || trimmed.length === 0) {
    return getFallbackTemplate('general', language)
  }
  
  if (trimmed.length > MAX_DESCRIPTION_LENGTH) {
    return trimmed.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
  }
  
  return trimmed
}

/**
 * 점수를 안전한 범위(1-10)로 정규화
 */
function normalizScore(score: unknown): number {
  if (typeof score !== 'number') return 7
  const normalized = Math.max(1, Math.min(10, Math.round(score)))
  return Number.isNaN(normalized) ? 7 : normalized
}

/**
 * FortuneResult를 안전하게 정규화
 */
function sanitizeFortuneResult(result: unknown, type: FortuneType, category: FortuneCategory, language: Language = 'ko'): FortuneResult {
  if (!result || typeof result !== 'object') {
    return {
      type,
      category,
      score: 7,
      description: getFallbackTemplate('general', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }

  const obj = result as Record<string, unknown>
  return {
    type: obj.type === 'daily' || obj.type === 'yearly' || obj.type === 'monthly' ? obj.type : type,
    category: obj.category || category,
    month: typeof obj.month === 'number' ? obj.month : undefined,
    score: normalizScore(obj.score),
    description: sanitizeDescription(obj.description, language),
    luckyColor: typeof obj.luckyColor === 'string' ? obj.luckyColor : '#9C27B0',
    luckyNumber: typeof obj.luckyNumber === 'number' ? obj.luckyNumber : 7,
  }
}

// ─── Seeded Random Generator (프로필 기반 고유 난수 생성) ─────────────────────
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  // Mulberry32 algorithm for consistent random numbers
  next(): number {
    let t = (this.seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  nextInt(max: number): number {
    // Safe guard against invalid max value
    if (max <= 0) return 0
    return Math.floor(this.next() * max)
  }

  // Shuffle array using Fisher-Yates
  shuffle<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(i + 1)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }
}

// ─── Profile Hash 생성 (프로필 정보로 고유 해시 생성) ──────────────────────────
export function generateProfileHash(
  name: string | undefined | null,
  birthYear: number | undefined | null,
  birthMonth: number | undefined | null,
  birthDay: number | undefined | null,
  birthHour: number | undefined | null,
  gender: 'male' | 'female' | undefined | null,
  isLunar: boolean = false
): number {
  try {
    // Safe defaults for all parameters
    const safeName = typeof name === 'string' && name.trim().length > 0 ? name.trim() : '사용자'
    const safeYear = typeof birthYear === 'number' && birthYear > 1900 ? birthYear : 2000
    const safeMonth = typeof birthMonth === 'number' && birthMonth >= 1 && birthMonth <= 12 ? birthMonth : 1
    const safeDay = typeof birthDay === 'number' && birthDay >= 1 && birthDay <= 31 ? birthDay : 1
    const safeHour = typeof birthHour === 'number' && birthHour >= 0 && birthHour < 24 ? birthHour : 12
    const safeGender = gender === 'female' ? 'female' : 'male'

    // Enhanced name hash - multiple passes for uniqueness
    let nameHash = 5381
    for (let i = 0; i < safeName.length; i++) {
      const code = safeName.charCodeAt(i) || 0
      nameHash = ((nameHash << 5) + nameHash) ^ code
    }
    
    // Birth date hash with stronger coefficients
    const birthHash = (safeYear * 73856093) ^ ((safeMonth * 19349663) * 1000) ^ (safeDay * 83492791)
    
    // Hour factors for intra-day uniqueness
    const hourFactor = safeHour * 137 + safeHour * safeHour * 23
    
    // Gender and lunar factors with better separation
    const genderFactor = safeGender === 'male' ? 0xAAAAAAAA : 0x55555555
    const lunarFactor = isLunar ? 0x33333333 : 0x66666666
    
    // Name length as additional factor
    const nameLengthFactor = safeName.length * 7919
    
    // Combine all factors with XOR and modulo to create unique but reproducible hash
    let combinedHash = nameHash ^ birthHash ^ hourFactor ^ genderFactor ^ lunarFactor ^ nameLengthFactor
    combinedHash = Math.abs(combinedHash | 0) // Ensure 32-bit integer
    
    return Math.max(1, combinedHash || 42)
  } catch (error) {
    console.log('[v0] Error in generateProfileHash:', error)
    return 42 // Safe fallback
  }
}

// ─── 개선된 Personal Seed 생성 (완전 고유한 운세용) ──────────────────────────────
/**
 * 프로필, 현재 날짜, 운세 타입을 모두 포함한 완전히 고유한 seed 생성
 * 같은 프로필이라도 다른 운세 타입마다 다른 결과 생성
 */
export function createPersonalSeed(
  profileHash: number,
  fortuneType: FortuneType | string,
  currentYear?: number,
  currentMonth?: number,
  additionalMonth?: number // 월별운세에서 월 정보
): number {
  try {
    const year = currentYear || new Date().getFullYear()
    const month = currentMonth || new Date().getMonth() + 1
    
    // fortuneType 별 고유 코드
    const typeCode = fortuneType === 'lifetime' ? 0x11111111
      : fortuneType === 'yearly' ? 0x22222222
      : fortuneType === 'monthly' ? 0x33333333
      : 0x44444444
    
    // 월별운세인 경우 해당 월 정보 포함
    const monthFactor = additionalMonth ? additionalMonth * 0x55555555 : 0
    
    // 연도와 현재 월도 포함해 같은 프로필도 시간이 지나면 운세 변경
    const yearMonthFactor = (year * 100 + month) * 777777
    
    // 최종 seed 생성
    let finalSeed = profileHash ^ typeCode ^ yearMonthFactor ^ monthFactor
    finalSeed = Math.abs(finalSeed | 0)
    
    return Math.max(1, finalSeed || 42)
  } catch (error) {
    console.log('[v0] Error in createPersonalSeed:', error)
    return 42
  }
}

// ─── 운세 문장 Pool 분리 (문장 다양성 강화) ──────────────────────────────────
/**
 * 카테고리별 전문화된 문장 pool - 각 운세 유형마다 완전히 다른 내용 생성
 */
const categorySpecificPools = {
  // 총운 - 전체 흐름, 인생 방향, 운의 흐름
  total: {
    flow: [
      '당신의 전체 운세는 점진적인 상승의 흐름을 보입니다.',
      '올해 전반적인 운의 흐름이 긍정적입니다.',
      '인생의 전체 궤도가 새로운 방향으로 이동하고 있습니다.',
      '당신의 운명은 끊임없는 변화의 과정 속에 있습니다.',
      '전체적인 운세의 흐름이 안정적인 기반 위에 서 있습니다.',
    ],
    direction: [
      '인생의 방향성이 명확해지는 시기입니다.',
      '당신이 나아갈 길이 점차 분명해집니다.',
      '인생의 진정한 목적을 찾아가는 과정입니다.',
      '당신의 역할과 소명이 부각되는 시기입니다.',
      '인생의 새로운 장(章)이 시작되고 있습니다.',
    ],
    rise: [
      '운의 상승이 감지되는 시기입니다.',
      '기회와 행운이 함께 다가오고 있습니다.',
      '모든 노력이 보상받을 시기입니다.',
      '운의 파도를 탈 수 있는 절호의 시간입니다.',
      '당신의 잠재력이 발현될 준비가 되어 있습니다.',
    ],
  },
  // 재물운 - 돈 흐름, 소비, 투자, 수입, 지출, 재물 기회
  wealth: {
    income: [
      '수입의 증가 가능성이 보입니다.',
      '예상치 못한 금전적 기회가 생길 수 있습니다.',
      '꾸준한 수익이 이어질 가능성이 높습니다.',
      '직업 활동을 통한 수입이 증가할 시기입니다.',
      '추가 수입의 기회가 찾아오고 있습니다.',
    ],
    spending: [
      '지출 관리에 신중함이 필요합니다.',
      '대출이나 차용은 신중하게 결정하세요.',
      '불필요한 지출을 줄일 시기입니다.',
      '금전 관리의 원칙을 지키는 것이 중요합니다.',
      '장기적인 재정 계획을 세워보세요.',
    ],
    investment: [
      '투자의 기회가 나타날 수 있습니다.',
      '신중한 투자 판단이 긍정적 결과를 가져옵니다.',
      '안정적인 자산 관리가 중요합니다.',
      '새로운 금융 기회를 검토해볼 가치가 있습니다.',
      '전문가의 조언을 구해 투자를 진행하세요.',
    ],
    treasure: [
      '예상치 못한 재물이 찾아올 수 있습니다.',
      '오랫동안 기다리던 재물운이 나타날 시기입니다.',
      '재산 증식의 기회가 보입니다.',
      '금전적 행운이 따라올 가능성이 있습니다.',
      '물질적 풍요로움이 다가오고 있습니다.',
    ],
  },
  // 사업운 - 직업, 사업, 승진, 계약, 업무 흐름, 성과
  business: {
    career: [
      '직업 활동에서 성과를 기대할 수 있습니다.',
      '업무 능력이 인정받을 시기입니다.',
      '새로운 직무 기회가 생길 가능성이 있습니다.',
      '전문성을 발휘할 수 있는 시기가 옵니다.',
      '커리어 발전의 전환점이 될 수 있습니다.',
    ],
    promotion: [
      '승진 기회가 나타날 수 있습니다.',
      '상위 직책으로의 이동이 예상됩니다.',
      '당신의 능력이 인정받아 신분 상승이 이루어질 시기입니다.',
      '책임 있는 역할을 맡게 될 가능성이 높습니다.',
      '지위 상승의 기회가 찾아오고 있습니다.',
    ],
    business: [
      '사업 운영이 순조로울 예정입니다.',
      '사업 확장의 기회가 보입니다.',
      '신규 사업 진출을 고려해볼 만합니다.',
      '기존 사업에서 새로운 분야로의 전개가 가능합니다.',
      '사업상 중요한 계약이 성사될 시기입니다.',
    ],
    performance: [
      '업무 성과가 두드러지는 시기입니다.',
      '프로젝트 성공의 가능성이 높습니다.',
      '노력한 만큼의 결과가 나타날 시기입니다.',
      '팀의 성과 향상에 당신의 역할이 클 것입니다.',
      '업적이 인정받을 준비가 되어 있습니다.',
    ],
  },
  // 애정운 - 연애, 감정, 배우자, 썸, 결혼 흐름
  love: {
    romance: [
      '새로운 인연이 만들어질 가능성이 있습니다.',
      '연애 운이 활성화되는 시기입니다.',
      '마음 맞는 사람을 만날 기회가 있습니다.',
      '감정적 교감이 깊어질 시기입니다.',
      '로맨틱한 만남이 예상됩니다.',
    ],
    relationship: [
      '현재의 관계가 더욱 돈독해질 것입니다.',
      '배우자와의 관계에 긍정적 변화가 보입니다.',
      '사랑과 신뢰의 기반이 더욱 강해질 시기입니다.',
      '감정의 연결고리가 더욱 견고해집니다.',
      '함께하는 시간이 더욱 소중해질 것입니다.',
    ],
    marriage: [
      '결혼 운이 긍정적으로 나타나고 있습니다.',
      '혼인의 시기가 다가올 수 있습니다.',
      '인생을 함께할 사람과의 만남이 예상됩니다.',
      '결혼을 통한 새로운 시작이 가능합니다.',
      '부부 관계의 안정이 이루어질 시기입니다.',
    ],
    emotion: [
      '감정의 안정성이 높아지는 시기입니다.',
      '마음의 평온함을 찾을 수 있습니다.',
      '감정 표현이 자유로워질 시기입니다.',
      '사랑을 표현할 용기가 생길 것입니다.',
      '감정적 성숙함이 드러날 시기입니다.',
    ],
  },
  // 대인운 - 인간관계, 주변 사람, 갈등, 도움, 인맥
  interpersonal: {
    relationship: [
      '주변 사람들과의 관계가 좋아질 시기입니다.',
      '인간관계에서의 분쟁이 해소될 가능성이 높습니다.',
      '좋은 사람들이 당신 주변에 모여들 것입니다.',
      '신뢰와 존경의 관계가 형성될 시기입니다.',
      '주변인들의 지지와 성원을 받을 것입니다.',
    ],
    conflict: [
      '갈등의 우려는 크지 않습니다.',
      '대인 관계에서의 마찰이 줄어들 시기입니다.',
      '오해가 풀어질 가능성이 높습니다.',
      '다툼이 있다 해도 금방 해결될 것입니다.',
      '인간관계의 불화가 회복될 시기입니다.',
    ],
    help: [
      '필요할 때 도움의 손길이 나타날 것입니다.',
      '귀인의 도움을 받을 가능성이 있습니다.',
      '주변에서 당신을 돕는 사람들이 생길 것입니다.',
      '어려운 순간에 좋은 사람들이 함께할 것입니다.',
      '협력과 협조를 통한 성공이 예상됩니다.',
    ],
    network: [
      '인맥이 넓어질 가능성이 있습니다.',
      '중요한 인물과의 만남이 있을 수 있습니다.',
      '사회적 네트워크가 강화될 시기입니다.',
      '좋은 사람들과의 인연이 이어질 것입니다.',
      '인적 자산의 증가가 기대됩니다.',
    ],
  },
  // 건강운 - 체력, 스트레스, 컨디션, 생활 습관, 주의 시기
  health: {
    vitality: [
      '체력이 회복되고 활기가 돌아올 시기입니다.',
      '신체 에너지가 증진될 것입니다.',
      '활동력이 높아질 시기입니다.',
      '신체적 컨디션이 좋아질 것입니다.',
      '활발한 신체 활동이 가능할 시기입니다.',
    ],
    stress: [
      '스트레스 관리에 주의를 기울이세요.',
      '과로를 피하고 휴식을 우선하세요.',
      '마음의 피로가 누적되지 않도록 주의하세요.',
      '정신적 안정을 위한 시간을 확보하세요.',
      '스트레스 해소를 위한 방안을 찾으세요.',
    ],
    condition: [
      '신체 상태가 양호할 것으로 예상됩니다.',
      '기분이 좋아질 시기입니다.',
      '몸과 마음이 균형을 이룰 시기입니다.',
      '컨디션 관리가 수월할 것입니다.',
      '신체적 불편함이 해소될 가능성이 있습니다.',
    ],
    habit: [
      '건강한 생활 습관을 들일 좋은 시기입니다.',
      '규칙적인 생활이 도움이 될 시기입니다.',
      '운동과 휴식의 균형을 맞춰보세요.',
      '식생활 개선이 필요한 시기입니다.',
      '자기 관리의 중요성이 높아질 시기입니다.',
    ],
  },
}

// ─── 평생운 전문 문장 Pool ──────────────────────────────────────────────────
const lifetimeDetailedPools = {
  flow: [
    '당신의 인생은 끊임없는 배움과 성장의 과정입니다. 주어진 환경에서 최선을 다하며 자신을 개발해나가는 특징을 보입니다.',
    '인생 여정에서 변화의 시기를 여러 번 맞이하게 될 것으로 보입니다. 각 전환점마다 새로운 기회가 찾아올 것입니다.',
    '당신의 운명은 노력과 선택의 결합으로 이루어집니다. 적극적인 자세가 긍정적 결과를 만들어낼 것입니다.',
    '인생의 초반과 중반, 후반이 뚜렷하게 다른 특징을 보일 것으로 예상됩니다.',
    '당신은 삶의 굴곡을 겪으면서도 계속 앞으로 나아가는 에너지를 가진 사람입니다.',
  ],
  personality: [
    '성격적으로 신중함과 용감함의 균형을 갖춘 인물입니다. 필요한 순간에 결단력을 발휘하며 일관성 있게 행동합니다.',
    '당신은 원칙을 중시하면서도 상황에 맞춰 유연하게 대처할 능력이 있습니다.',
    '타인을 배려하는 마음이 있으며, 동시에 자신의 신념을 지키는 강함도 갖추고 있습니다.',
    '긍정적인 사고방식과 현실적 판단력을 함께 소유한 인물입니다.',
    '깊이 있는 사고와 행동의 신속함이 조화를 이루는 특징을 보입니다.',
  ],
  relationship: [
    '인간관계에서 신뢰를 가장 중시하는 경향이 있습니다. 깊고 오래가는 관계를 만들어가는 능력이 있습니다.',
    '당신 주변의 사람들은 당신의 진심 어린 태도에 호응하게 될 것입니다.',
    '가족과 친구 관계에서 책임감 있는 역할을 수행할 것으로 보입니다.',
    '사람들과의 관계에서 상호 존중의 원칙을 지키는 특징을 보입니다.',
    '당신의 성숙한 태도가 주변사람들에게 좋은 영향을 미칠 것입니다.',
  ],
  wealth: [
    '재물 운에 있어 꾸준한 증진이 보일 것입니다. 큰 부(富)보다는 안정적인 부의 축적을 이루게 될 것 같습니다.',
    '금전 관리에 있어 신중함을 보이는 경향이 있습니다. 이는 장기적인 재산 보전에 도움이 될 것입니다.',
    '노력과 투자가 장기적으로 보상받을 가능성이 높습니다.',
    '예상치 못한 기회를 통해 재물이 증가될 가능성도 있습니다.',
    '재물의 흐름이 순환적으로 나타나, 주기적인 변화가 있을 것으로 예상됩니다.',
  ],
  care: [
    '인생의 중반 이후 건강에 주의가 필요합니다. 꾸준한 자기 관리가 중요할 것입니다.',
    '과도한 스트레스는 피하고 충분한 휴식을 취하려는 노력이 필요합니다.',
    '규칙적인 생활 습관이 장수의 열쇠가 될 것으로 보입니다.',
    '신체와 정신의 균형이 무엇보다 중요한 시기들이 있을 것입니다.',
    '예방적 건강 관리가 후반생을 결정하는 요인이 될 것입니다.',
  ],
  warning: [
    '성격상 신중함이 때로는 기회를 놓치게 할 수 있으니 주의하세요.',
    '과도한 책임감으로 인한 스트레스에 시달릴 가능성이 있습니다.',
    '주변의 의견에 흔들려 자신의 선택을 의심하는 시기가 올 수 있습니다.',
    '인생의 전환기에 혼란을 겪을 수 있으니 충분한 숙고가 필요합니다.',
    '관계에서 과도한 헌신은 때로 상대에게 부담이 될 수 있습니다.',
  ],
  strength: [
    '당신의 가장 큰 강점은 일관된 노력과 성실함입니다.',
    '주어진 상황을 현실적으로 판단하고 대처하는 능력이 뛰어납니다.',
    '신뢰와 책임감을 바탕으로 한 리더십을 발휘할 수 있습니다.',
    '깊이 있는 사고력과 통찰력이 당신의 자산입니다.',
    '어려운 상황을 견디고 극복하는 회복력이 있습니다.',
  ],
}

const fortuneSentencePools = {
  // 평생운 - 인생 여정 관련
  lifetime: {
    intro: [
      '당신의 인생은 깊이 있는 여정입니다.',
      '운명의 바퀴가 당신을 이끌고 있습니다.',
      '당신의 삶에는 특별한 목적이 있습니다.',
      '현명함과 통찰력이 당신의 길을 밝힙니다.',
      '당신의 영혼은 큰 변화를 준비하고 있습니다.',
    ],
    early: [
      '젊음의 에너지가 새로운 길을 열어줍니다.',
      '초기 단계에서의 노력이 큰 밑거름이 됩니다.',
      '순수함과 열정이 당신을 지켜줍니다.',
      '어려움도 성장의 기회가 됩니다.',
      '기초를 다지는 중요한 시기입니다.',
    ],
    mid: [
      '중년의 지혜가 빛을 발합니다.',
      '경험의 무게가 깊이를 더합니다.',
      '현실적 판단력이 최고조입니다.',
      '균형 잡힌 삶의 시기입니다.',
      '능력을 발휘할 최적의 때입니다.',
    ],
    late: [
      '후년의 고요함이 평온을 가져옵니다.',
      '지혜로운 관찰자의 눈을 갖습니다.',
      '영혼의 완성도가 높아집니다.',
      '삶의 의미를 깊이 있게 이해합니다.',
      '유산을 남길 시간입니다.',
    ],
  },
  // 한해운 - 연간 주제
  yearly: {
    intro: [
      '올해는 새로운 시작의 해입니다.',
      '변화와 성장의 기운이 흐릅니다.',
      '기회의 창이 열리는 시간입니다.',
      '운의 흐름이 당신을 감싸고 있습니다.',
      '신중함과 용기가 필요한 해입니다.',
    ],
    flow: [
      '상반기는 준비와 계획의 시기입니다.',
      '흐름을 타며 자연스럽게 진행하세요.',
      '변화의 물결에 잘 적응하세요.',
      '기운의 전환이 예상됩니다.',
      '계절마다 다른 에너지를 활용하세요.',
    ],
    relationship: [
      '관계 운이 좋아집니다.',
      '주변 사람들과의 유대가 강해집니다.',
      '진심 있는 표현이 큰 역할을 합니다.',
      '협력과 소통이 중요합니다.',
      '새로운 인연이 찾아옵니다.',
    ],
    wealth: [
      '재물운이 상승합니다.',
      '기회를 잘 포착하세요.',
      '현명한 투자가 보상받습니다.',
      '예상치 못한 수익이 생깁니다.',
      '꾸준한 노력이 결실을 맺습니다.',
    ],
    health: [
      '건강을 우선으로 챙기세요.',
      '몸과 마음의 균형이 중요합니다.',
      '규칙적인 생활이 큰 도움이 됩니다.',
      '긍정적 에너지가 치유를 가져옵니다.',
      '예방적 관리가 필요한 시기입니다.',
    ],
    advice: [
      '변화를 두려워하지 마세요.',
      '작은 것부터 시작하세요.',
      '남의 조언보다 자신의 직관을 믿으세요.',
      '현재 순간에 집중하세요.',
      '감사하는 마음을 항상 유지하세요.',
    ],
  },
  // 월별운세 - 월별 주제
  monthly: {
    positive: [
      '순조로운 운세가 진행됩니다.',
      '이 달은 특별한 기회가 옵니다.',
      '좋은 결과를 기대해도 좋습니다.',
      '모든 일이 잘 풀릴 시기입니다.',
      '행운의 기운이 가득합니다.',
    ],
    caution: [
      '신중함이 필요한 시기입니다.',
      '성급한 결정은 피하세요.',
      '세부 사항에 주의를 기울이세요.',
      '경험자의 조언을 구해보세요.',
      '여유를 가지고 진행하세요.',
    ],
    transform: [
      '변화의 시기가 도래합니다.',
      '새로운 시작을 준비하세요.',
      '기존의 틀에서 벗어나세요.',
      '창의적인 접근이 필요합니다.',
      '낡은 것을 비우고 새로운 것을 담으세요.',
    ],
  },
}

// ─── 운세 문장 조합 생성 함수 ────────────────────────────────────────────────
/**
 * 프로필 seed를 기반으로 여러 문장 pool에서 랜덤하게 선택하여 고유한 운세 생성
 * 최소 4-5줄 이상의 상세한 운세 생성
 */
function generateCustomFortune(
  seed: number,
  pools: Record<string, string[]>,
  sentenceCount: number = 5,
  language: Language = 'ko'
): string {
  try {
    const rng = new SeededRandom(seed)
    const sentences: string[] = []
    
    // 모든 pool에서 문장을 선택하여 최대한 다양한 내용 생성
    const poolKeys = Object.keys(pools)
    const selectedPoolKeys = poolKeys.length > 0 
      ? rng.shuffle(poolKeys).slice(0, Math.min(sentenceCount, poolKeys.length))
      : []
    
    // 각 pool에서 일반적으로 1-2개의 문장 선택
    for (const poolKey of selectedPoolKeys) {
      const pool = pools[poolKey]
      if (Array.isArray(pool) && pool.length > 0) {
        // 각 pool에서 1-2개 문장 선택
        const sentencesToPick = rng.nextInt(2) + 1 // 1 또는 2
        for (let i = 0; i < sentencesToPick && sentences.length < sentenceCount; i++) {
          const idx = rng.nextInt(pool.length)
          const sentence = pool[idx]
          // 같은 문장 반복 방지
          if (sentence && !sentences.includes(sentence)) {
            sentences.push(sentence)
          }
        }
      }
    }
    
    // 부족한 문장은 추가로 채우기
    while (sentences.length < Math.min(sentenceCount, 4)) {
      const randomPoolKey = poolKeys[rng.nextInt(poolKeys.length)]
      if (randomPoolKey && pools[randomPoolKey]) {
        const pool = pools[randomPoolKey]
        const idx = rng.nextInt(pool.length)
        const sentence = pool[idx]
        if (sentence && !sentences.includes(sentence)) {
          sentences.push(sentence)
        }
      }
    }
    
    // 자연스러운 문단 형태로 조합
    return sentences.length > 0 
      ? sentences.join(' ')
      : getFallbackTemplate('general', language)
  } catch (error) {
    console.log('[v0] Error in generateCustomFortune:', error)
    return getFallbackTemplate('general', language)
  }
}

// ─── Fortune Profile Context (프로필 컨텍스트) ─────────────────────────────────
export interface FortuneProfileContext {
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  gender: 'male' | 'female'
  isLunar?: boolean
  profileHash?: number
  personalization?: FortunePersonalization
}

// ─── 다국어 운세 텍스트 ────────────────────────────────────────────────────

// 지원하는 운세 설명 언어 (나머지는 영어로 fallback)
type SupportedFortuneLanguage = 'ko' | 'en' | 'ja' | 'zh'
type LangMap = Record<SupportedFortuneLanguage, string[]>

function getFortuneLanguage(lang: Language): SupportedFortuneLanguage {
  return getFortuneContentLanguage(lang)
}

const fortuneDescriptions: Record<FortuneCategory, LangMap> = {
  total: {
    ko: [
      '새로운 시작의 기운이 강한 시기입니다. 올해 목표를 설정하고 실행하기에 좋은 시기입니다.',
      '계획과 준비가 중요한 시기입니다. 내적 성찰의 시간을 가지세요.',
      '성장의 기운이 나타나는 시기입니다. 새로운 시도에 도전하세요.',
      '행동의 시기입니다. 계획을 실행에 옮기세요. 적극적인 자세가 필요합니다.',
      '안정과 조화의 시기입니다. 주변 사람들과의 관계를 돈독히 하세요.',
      '변화의 기운이 감지됩니다. 유연하게 대처하세요.',
      '수확의 시기입니다. 그동안의 노력이 결실을 맺습니다.',
      '정리와 마무리의 시기입니다. 새로운 시작을 준비하세요.',
      '창의력이 빛나는 시기입니다. 새로운 아이디어를 실행해보세요.',
      '인내와 끈기가 필요한 시기입니다. 조급해하지 마세요.',
      '행운이 가까이 다가오는 시기입니다. 기회를 놓치지 마세요.',
      '자기 발전에 집중하는 시기입니다. 배움의 기회를 찾으세요.',
      '직관을 믿어야 할 시기입니다. 내면의 목소리에 귀 기울이세요.',
      '협력과 팀워크가 중요한 시기입니다. 혼자보다 함께가 좋습니다.',
      '도전 정신이 빛나는 시기입니다. 새로운 영역을 개척하세요.',
      '균형과 조화가 필요한 시기입니다. 일과 삶의 균형을 찾으세요.',
    ],
    en: [
      'A time of new beginnings. Set your goals and take action.',
      'Planning and preparation are key. Take time for inner reflection.',
      'A time of growth. Challenge yourself with new ventures.',
      'Time for action. Put your plans into motion. Be proactive.',
      'A time of stability and harmony. Strengthen your relationships.',
      'Change is in the air. Stay flexible and adaptable.',
      'Harvest time. Your hard work will bear fruit.',
      'Time to wrap up and prepare for new beginnings.',
    ],
    ja: [
      '新しい始まりの時期です。目標を設定して行動に移しましょう。',
      '計画と準備が重要な時期です。内省の時間を持ちましょう。',
      '成長の時期です。新しいことに挑戦しましょう。',
      '行動の時期です。計画を実行に移しましょう。積極的な姿勢が必要です。',
      '安定と調和の時期です。周囲の人との関係を深めましょう。',
      '変化の兆しがあります。柔軟に対応しましょう。',
      '収穫の時期です。これまでの努力が実を結びます。',
      '整理と締めくくりの時期です。新たなスタートを準備しましょう。',
    ],
    zh: [
      '新开始的时机已到，设定目标并付诸行动吧。',
      '计划和准备很重要，给自己一些内省的时间。',
      '成长的时期到了，挑战自己，尝试新事物。',
      '行动的时机，将计划付诸实践，需要积极主动的态度。',
      '稳定与和谐的时期，加深与周围人的关系。',
      '感受到变化的气息，保持灵活应对。',
      '收获的时期，之前的努力将会结出果实。',
      '整理和收尾的时期，准备迎接新的开始。',
    ],
  },
  wealth: {
    ko: [
      '재물운이 상승하는 시기입니다. 투자에 좋은 기회가 올 수 있습니다.',
      '지출을 줄이고 저축에 집중하세요. 안정적인 재정 관리가 필요합니다.',
      '예상치 못한 수입이 있을 수 있습니다. 감사한 마음을 가지세요.',
      '재정적 결정은 신중하게 내리세요. 전문가의 조언을 구하는 것도 좋습니다.',
      '부업이나 새로운 수입원을 고려해보세요. 기회가 있습니다.',
      '재물운이 평탄합니다. 현재의 상태를 유지하세요.',
      '큰 지출보다는 소소한 행복에 투자하세요. 만족감이 높아집니다.',
      '금전적인 행운이 따르는 시기입니다. 복권이나 경품에 도전해보세요.',
      '장기 투자를 고려할 시기입니다. 미래를 위한 준비를 하세요.',
      '재정 계획을 재검토할 시기입니다. 불필요한 지출을 줄이세요.',
      '귀인의 도움으로 재물운이 상승합니다. 인맥을 소중히 하세요.',
      '안정적인 수입이 예상됩니다. 꾸준함이 성공의 비결입니다.',
    ],
    en: [
      'Your financial luck is rising. Good investment opportunities may come.',
      'Reduce spending and focus on saving. Stable financial management is needed.',
      'Unexpected income may arrive. Be grateful.',
      'Make financial decisions carefully. Seeking expert advice is a good idea.',
      'Consider a side job or new income source. Opportunity awaits.',
      'Financial luck is steady. Maintain your current state.',
    ],
    ja: [
      '金運が上昇する時期です。投資に良いチャンスが来るかもしれません。',
      '支出を減らし、貯蓄に集中しましょう。安定した財政管理が必要です。',
      '予想外の収入があるかもしれません。感謝の気持ちを持ちましょう。',
      '財政的な決断は慎重に。専門家のアドバイスを求めるのも良いでしょう。',
      '副業や新しい収入源を検討してみましょう。チャンスがあります。',
      '金運は平穏です。現状を維持しましょう。',
    ],
    zh: [
      '财运上升的时期，可能会有好的投资机会。',
      '减少支出，专注储蓄，需要稳定的财务管理。',
      '可能会有意外收入，心存感激。',
      '财务决策要谨慎，也可以寻求专家建议。',
      '考虑副业或新的收入来源，机会就在眼前。',
      '财运平稳，保持现状即可。',
    ],
  },
  business: {
    ko: [
      '사업운이 좋습니다. 새로운 프로젝트를 시작하기에 좋은 시기입니다.',
      '파트너십에 주의를 기울이세요. 신뢰가 중요합니다.',
      '경쟁이 치열할 수 있습니다. 차별화 전략이 필요합니다.',
      '안정적인 성장이 예상됩니다. 꾸준히 노력하세요.',
      '새로운 시장을 개척할 기회가 있습니다.',
      '내부 역량 강화에 집중하세요. 기초가 탄탄해야 합니다.',
    ],
    en: [
      'Business luck is good. A great time to start new projects.',
      'Pay attention to partnerships. Trust is essential.',
      'Competition may be fierce. A differentiation strategy is needed.',
      'Steady growth is expected. Keep up the effort.',
      'An opportunity to break into new markets.',
      'Focus on building internal capabilities. A strong foundation is key.',
    ],
    ja: [
      '仕事運が良いです。新しいプロジェクトを始めるのに良い時期です。',
      'パートナーシップに注意を払いましょう。信頼が重要です。',
      '競争が激しくなる可能性があります。差別化戦略が必要です。',
      '安定した成長が見込まれます。継続して努力しましょう。',
      '新しい市場を開拓するチャンスがあります。',
      '内部能力の強化に集中しましょう。基盤をしっかりさせることが重要です。',
    ],
    zh: [
      '事业运良好，是开展新项目的好时机。',
      '注意合作关系，信任至关重要。',
      '竞争可能激烈，需要差异化战略。',
      '预计稳定增长，持续努力。',
      '有机会开拓新市场。',
      '专注提升内部能力，基础要打牢。',
    ],
  },
  love: {
    ko: [
      '애정운이 상승하는 시기입니다. 새로운 만남이 기대됩니다.',
      '현재의 관계를 더 깊이 발전시킬 수 있는 시기입니다.',
      '소통에 집중하세요. 상대방의 이야기에 귀 기울이세요.',
      '로맨틱한 시간을 보낼 수 있습니다. 데이트를 계획하세요.',
      '작은 오해가 생길 수 있습니다. 이해와 양보가 필요합니다.',
      '솔로라면 적극적으로 사람들을 만나보세요.',
    ],
    en: [
      'Love luck is rising. New encounters are expected.',
      'A time to deepen your current relationship.',
      'Focus on communication. Listen to your partner.',
      'A romantic time awaits. Plan a date.',
      'Small misunderstandings may arise. Understanding and compromise are needed.',
      'If single, actively meet new people.',
    ],
    ja: [
      '恋愛運が上昇する時期です。新しい出会いが期待できます。',
      '現在の関係をより深く発展させることができる時期です。',
      'コミュニケーションに集中しましょう。相手の話に耳を傾けてください。',
      'ロマンティックな時間を過ごせます。デートを計画しましょう。',
      '小さな誤解が生まれるかもしれません。理解と妥協が必要です。',
      'シングルなら積極的に人と会ってみましょう。',
    ],
    zh: [
      '爱情运上升，期待新的相遇。',
      '是深化当前关系的好时机。',
      '专注于沟通，倾听对方。',
      '将迎来浪漫时光，计划一次约会吧。',
      '可能会有小误会，需要理解与退让。',
      '单身的话，积极地去认识新朋友吧。',
    ],
  },
  relationships: {
    ko: [
      '대인관계가 원만한 시기입니다. 새로운 인연을 만날 수 있습니다.',
      '가족과의 시간을 소중히 하세요. 화목한 분위기가 예상됩니다.',
      '친구들과의 관계를 돈독히 하세요. 좋은 조언을 얻을 수 있습니다.',
      '직장 동료들과의 협력이 중요합니다. 팀워크를 발휘하세요.',
      '오해가 생길 수 있으니 소통에 주의하세요.',
      '새로운 사람들을 만나기 좋은 시기입니다.',
    ],
    en: [
      'Interpersonal relationships are harmonious. New connections await.',
      'Cherish time with family. A warm atmosphere is expected.',
      'Strengthen friendships. Good advice is available.',
      'Cooperation with colleagues is important. Show your teamwork.',
      'Misunderstandings may arise. Pay attention to communication.',
      'A great time to meet new people.',
    ],
    ja: [
      '対人関係が円満な時期です。新しい縁に巡り会えます。',
      '家族との時間を大切にしましょう。和やかな雰囲気が期待できます。',
      '友人との関係を深めましょう。良いアドバイスが得られます。',
      '職場の同僚との協力が重要です。チームワークを発揮しましょう。',
      '誤解が生まれやすいので、コミュニケーションに注意しましょう。',
      '新しい人と出会うのに良い時期です。',
    ],
    zh: [
      '人际关系融洽，可能会结识新的缘分。',
      '珍惜与家人共处的时间，预计氛围融洽。',
      '加深与朋友的关系，能获得好的建议。',
      '与同事的合作很重要，发挥团队精神。',
      '可能产生误会，注意沟通。',
      '是结识新朋友的好时机。',
    ],
  },
  health: {
    ko: [
      '건강운이 좋습니다. 하지만 과로는 피하세요.',
      '규칙적인 운동을 시작하기 좋은 시기입니다.',
      '스트레스 관리에 주의하세요. 휴식이 필요합니다.',
      '식습관 개선을 고려해보세요. 건강한 식단이 중요합니다.',
      '정기 검진을 받아보세요. 예방이 최선입니다.',
      '충분한 수면을 취하세요. 회복의 시간이 필요합니다.',
    ],
    en: [
      'Health luck is good. But avoid overworking.',
      'A good time to start a regular exercise routine.',
      'Pay attention to stress management. Rest is needed.',
      'Consider improving your diet. Healthy eating is important.',
      'Get a regular check-up. Prevention is best.',
      'Get enough sleep. Recovery time is needed.',
    ],
    ja: [
      '健康運が良いです。しかし過労は避けましょう。',
      '規則的な運動を始めるのに良い時期です。',
      'ストレス管理に注意しましょう。休息が必要です。',
      '食習慣の改善を検討しましょう。健康的な食事が重要です。',
      '定期検診を受けましょう。予防が最善です。',
      '十分な睡眠をとりましょう。回復の時間が必要です。',
    ],
    zh: [
      '健康运良好，但要避免过劳。',
      '是开始规律运动的好时机。',
      '注意压力管理，需要休息。',
      '考虑改善饮食习惯，健康饮食很重要。',
      '进行定期体检，预防为主。',
      '保证充足睡眠，需要恢复时间。',
    ],
  },
}

// ─── 한해운 다국어 ──────────────────────────────────────────────────────────

const yearlyDescriptions: Record<FortuneCategory, LangMap> = {
  total: {
    ko: [
      '올해는 새로운 시작의 해입니다. 상반기에는 준비와 계획에 집중하고, 하반기에는 실행에 옮기세요. 귀인의 도움으로 뜻밖의 기회가 다가올 수 있으니 인연을 소중히 여기세요. 특히 3월, 7월, 11월에 좋은 일이 생길 수 있습니다.',
      '올해는 성장과 발전의 해입니다. 커리어에서 한 단계 도약할 기회가 있으며, 봄에 시작한 일이 가을에 결실을 맺으니 인내심을 가지세요. 5월과 9월에 특별한 기회가 옵니다.',
      '올해는 안정과 성숙의 해입니다. 큰 변화보다는 현재의 것을 다지는 데 집중하세요. 하반기로 갈수록 운이 상승하여 12월에 좋은 소식이 있을 수 있습니다.',
    ],
    en: [
      'This year is a year of new beginnings. Focus on preparation in the first half and execution in the second. A benefactor may bring unexpected opportunities. Especially good months: March, July, November.',
      'This year is for growth and advancement. A chance to level up in your career. What begins in spring will bear fruit in autumn. Special opportunities in May and September.',
      'This year is for stability and maturity. Focus on consolidating what you have rather than big changes. Fortune rises in the second half, with good news possible in December.',
    ],
    ja: [
      '今年は新しい始まりの年です。上半期は準備と計画に集中し、下半期は実行に移しましょう。特に3月、7月、11月に良いことが起こるかもしれません。',
      '今年は成長と発展の年です。キャリアでステップアップするチャンスがあります。春に始めたことが秋に実を結びます。5月と9月に特別なチャンスがあります。',
      '今年は安定と成熟の年です。大きな変化よりも現状を固めることに集中しましょう。下半期に向けて運気が上昇し、12月に良い知らせがあるかもしれません。',
    ],
    zh: [
      '今年是新开始之年。上半年专注准备和计划，下半年付诸实践。贵人相助带来意外机会，尤其是3月、7月、11月会有好事发生。',
      '今年是成长发展之年，有机会在事业上更上一层楼。春天开始的事情秋天会有收获，5月和9月有特别机会。',
      '今年是稳定成熟之年，专注巩固现有的而不是大变化。下半年运势上升，12月可能有好消息。',
    ],
  },
  wealth: {
    ko: [
      '올해 재물운은 상승세입니다. 상반기에는 수입이 증가하고, 하반기에는 투자에서 좋은 결과를 얻을 수 있습니다. 부동산 거래는 6월 이후가 좋습니다.',
      '올해는 재정 관리가 중요한 해입니다. 수입은 안정적이나 지출 관리를 잘해야 합니다. 10월 이후 재물운이 상승하니 연말에 좋은 기회가 올 수 있습니다.',
    ],
    en: [
      'Financial luck is on the rise this year. Income increases in the first half, and investments yield good results in the second. After June is a good time for real estate.',
      'Financial management is important this year. Income is stable, but spending must be controlled. Financial luck rises after October, bringing good opportunities at year-end.',
    ],
    ja: [
      '今年の金運は上昇傾向にあります。上半期は収入が増加し、下半期は投資で良い結果が得られます。不動産取引は6月以降が良いでしょう。',
      '今年は財政管理が重要な年です。収入は安定していますが、支出管理をしっかりしましょう。10月以降に金運が上昇し、年末に良い機会が来るかもしれません。',
    ],
    zh: [
      '今年财运呈上升趋势。上半年收入增加，下半年投资可获好结果。房产交易6月后为宜。',
      '今年财务管理很重要，收入稳定但需控制支出。10月后财运上升，年末可能有好机会。',
    ],
  },
  business: {
    ko: [
      '올해 사업운은 긍정적입니다. 새로운 프로젝트 시작이나 사업 확장에 좋은 시기입니다. 6월과 10월에 중요한 계약이나 거래가 성사될 수 있습니다.',
      '올해 사업에서 중요한 전환점이 있습니다. 기존 방식에서 벗어나 새로운 시도를 해보세요. 3분기부터 성과가 나타납니다.',
    ],
    en: [
      'Business luck is positive this year. A good time to start new projects or expand your business. Important contracts or deals may close in June and October.',
      'An important turning point in business this year. Break away from old methods and try something new. Results will show from Q3 onwards.',
    ],
    ja: [
      '今年の仕事運はポジティブです。新しいプロジェクトを始めたり、事業を拡大するのに良い時期です。6月と10月に重要な契約や取引が成立するかもしれません。',
      '今年は仕事において重要な転換点があります。既存の方法から離れ、新しい試みをしてみましょう。第3四半期から成果が現れます。',
    ],
    zh: [
      '今年事业运积极向好，是开展新项目或扩展业务的好时机。6月和10月可能达成重要合同或交易。',
      '今年事业有重要转折点，突破旧方式，尝试新做法。第三季度开始显现成果。',
    ],
  },
  love: {
    ko: [
      '올해 애정운은 활발합니다. 솔로라면 봄과 가을에 새로운 만남이 있을 수 있습니다. 커플은 관계가 깊어지며 결혼을 고려해도 좋은 해입니다.',
      '올해는 애정 관계에서 중요한 결정을 내리는 해입니다. 7월과 11월에 좋은 인연이 있을 수 있습니다.',
    ],
    en: [
      'Love life is active this year. Singles may find new encounters in spring and autumn. Couples will deepen their bond; a good year to consider marriage.',
      'This year calls for important decisions in love. Good encounters possible in July and November.',
    ],
    ja: [
      '今年の恋愛運は活発です。シングルなら春と秋に新しい出会いがあるかもしれません。カップルは関係が深まり、結婚を考えても良い年です。',
      '今年は恋愛において重要な決断をする年です。7月と11月に良い縁があるかもしれません。',
    ],
    zh: [
      '今年爱情运活跃，单身者春秋两季可能有新的相遇。情侣关系加深，是考虑婚姻的好年份。',
      '今年是爱情上做重要决定的一年，7月和11月可能有好的缘分。',
    ],
  },
  relationships: {
    ko: [
      '올해 대인관계가 넓어집니다. 특히 업무 관련 인맥이 확장되어 사업이나 커리어에 도움이 됩니다. 5월과 8월에 귀인을 만납니다.',
      '올해는 관계의 질을 높이는 해입니다. 많은 사람보다 소수와 깊은 관계를 맺는 것이 좋습니다.',
    ],
    en: [
      'Your social circle expands this year. Business-related networks grow, benefiting career and work. Expect to meet a benefactor in May and August.',
      'This year is about deepening relationships. Better to build close bonds with a few than to know many superficially.',
    ],
    ja: [
      '今年は人間関係が広がります。特にビジネス関連の人脈が拡大し、仕事やキャリアに役立ちます。5月と8月に貴人に出会います。',
      '今年は関係の質を高める年です。多くの人より少数と深い関係を築くことが良いでしょう。',
    ],
    zh: [
      '今年人际关系扩展，尤其是业务相关人脉的增加有助于事业和职场。5月和8月会遇到贵人。',
      '今年是提升关系质量的一年，与少数人建立深厚关系胜过广泛认识。',
    ],
  },
  health: {
    ko: [
      '올해 건강은 대체로 양호하나, 상반기에 체력 관리가 필요합니다. 3월과 6월에 컨디션이 저하될 수 있으니 주의하세요. 하반기에는 건강이 회복되어 활력이 넘칩니다.',
      '올해는 건강을 점검하는 해입니다. 미루던 건강 검진을 받고, 생활 습관을 개선하세요. 4월과 8월에 작은 건강 이상이 있을 수 있으나 조기 대처하면 문제없습니다.',
    ],
    en: [
      'Health is generally good this year, but physical management is needed in the first half. Watch out for dips in condition in March and June. Health recovers and vitality surges in the second half.',
      'This year is time to check your health. Get that overdue check-up and improve your lifestyle. Minor health issues may arise in April and August, but early treatment prevents problems.',
    ],
    ja: [
      '今年の健康はおおむね良好ですが、上半期は体力管理が必要です。3月と6月にコンディションが低下するかもしれません。下半期は健康が回復し、活力があふれます。',
      '今年は健康をチェックする年です。先延ばしにしていた健康診断を受け、生活習慣を改善しましょう。4月と8月に軽微な体調不良があるかもしれませんが、早期対処で問題ありません。',
    ],
    zh: [
      '今年健康总体良好，但上半年需要注意体力管理。3月和6月状态可能下降，下半年健康恢复，充满活力。',
      '今年是检查健康的一年，接受拖延已久的体检并改善生活习惯。4月和8月可能有小健康问题，但及早处理无大碍。',
    ],
  },
}

// ─── 평생운 다국어 ──────────────────────────────────────────────────────────

const lifetimeDescriptions: Record<FortuneCategory, Record<'early' | 'mid' | 'late', LangMap>> = {
  total: {
    early: {
      ko: ['어린 시절부터 총명하고 재능이 뛰어나 주위의 기대를 한 몸에 받습니다. 학업에서 두각을 나타내며, 20대에는 자신만의 길을 개척하려는 의지가 강합니다. 다만 급한 성격으로 인해 실수할 수 있으니 신중함을 기르세요. 이 시기에 쌓은 경험이 평생의 자산이 됩니다.'],
      en: ['Bright and talented from childhood, you carry the hopes of those around you. You excel academically and have a strong drive to carve your own path in your twenties. However, be careful of hasty decisions. The experience you build now becomes a lifelong asset.'],
      ja: ['幼い頃から聡明で才能にあふれ、周囲の期待を一身に受けます。学業で頭角を現し、20代では自分の道を切り開こうとする意志が強いです。ただし、急いでミスをすることがあるので慎重さを養ってください。この時期に積んだ経験が生涯の財産となります。'],
      zh: ['从小聪明有才华，备受周围期待。学业出众，20多岁时有强烈的开拓自己道路的意志。但性子急可能犯错，培养谨慎是关键。这一时期积累的经验将成为一生的财富。'],
    },
    mid: {
      ko: ['30대부터 본격적인 성장기에 접어듭니다. 커리어에서 중요한 위치에 오르며, 경제적으로도 안정을 찾습니다. 40대에는 그동안의 노력이 결실을 맺어 사회적 인정을 받게 됩니다. 다만 건강 관리에 소홀하지 않도록 유의하세요.'],
      en: ['Your 30s mark the beginning of real growth. You rise to important positions in your career and achieve financial stability. In your 40s, your hard work pays off with social recognition. Just be sure not to neglect your health.'],
      ja: ['30代から本格的な成長期に入ります。キャリアで重要な地位に就き、経済的にも安定します。40代にはこれまでの努力が実を結び、社会的な認知を得ます。ただし、健康管理を怠らないよう注意しましょう。'],
      zh: ['30多岁进入正式的成长期，在职场占据重要位置，经济上也趋于稳定。40多岁时努力结出果实，获得社会认可。但请注意不要忽视健康管理。'],
    },
    late: {
      ko: ['말년은 풍요롭고 평화로운 시기입니다. 자녀들이 성장하여 효도하며, 손자녀의 재롱을 즐깁니다. 건강은 비교적 양호하여 취미 활동이나 여행을 즐길 수 있습니다. 사회에서 쌓은 명예로 존경받으며, 후배들에게 멘토 역할을 합니다.'],
      en: ['Your later years are abundant and peaceful. Your children are grown and filial; you enjoy your grandchildren. Health is relatively good, allowing hobbies and travel. Respected for the reputation you built, you serve as a mentor to those who come after you.'],
      ja: ['晩年は豊かで平和な時期です。子供たちが成長して孝行し、孫の可愛らしさを楽しみます。健康も比較的良好で趣味や旅行を楽しめます。社会で積んだ名誉で尊敬され、後輩のメンター役を担います。'],
      zh: ['晚年是富足而平静的时期，子女孝顺，享受孙辈的天真。健康状况相对良好，可以享受兴趣爱好或旅行。因社会积累的名誉受到尊敬，为后辈担任导师角色。'],
    },
  },
  wealth: {
    early: {
      ko: ['초년에는 재물운이 평탄합니다. 자수성가의 운이 강하므로 일찍부터 경제 관념을 기르세요. 20대 후반부터 서서히 재물이 모이기 시작하며, 저축과 투자의 습관을 들이면 좋습니다.'],
      en: ['Wealth luck is stable in early life. A strong self-made destiny means you should cultivate financial sense early. Wealth begins to accumulate from your late 20s; habits of saving and investing will serve you well.'],
      ja: ['初年は金運が平坦です。自力で成功する運が強いので、早くから経済観念を養いましょう。20代後半から徐々に財が集まり始め、貯蓄と投資の習慣をつけると良いでしょう。'],
      zh: ['初年财运平稳，白手起家运势强，应早早培养经济观念。20多岁后半段开始积累财富，养成储蓄和投资的习惯为宜。'],
    },
    mid: {
      ko: ['중년기는 재물운의 전성기입니다. 30대 후반부터 수입이 크게 증가하며, 40대에는 부동산이나 투자로 큰 수익을 얻을 수 있습니다. 다만 과욕은 금물이며, 본업에 충실하는 것이 최선입니다.'],
      en: ['Middle age is the peak of financial luck. Income grows significantly from your late 30s; in your 40s, big gains from real estate or investments are possible. However, greed is dangerous. Staying faithful to your core work is best.'],
      ja: ['中年期は金運の最盛期です。30代後半から収入が大幅に増加し、40代には不動産や投資で大きな利益を得られます。ただし、過欲は禁物で、本業に忠実でいることが最善です。'],
      zh: ['中年期是财运的鼎盛时期，30多岁后半段收入大幅增加，40多岁可通过房产或投资获得丰厚收益。但切忌贪心，忠于本职工作是良策。'],
    },
    late: {
      ko: ['말년의 재물운은 안정적입니다. 중년에 쌓은 자산으로 여유로운 노후를 보냅니다. 큰 투자보다는 안전한 예금이나 연금에 집중하세요.'],
      en: ['Financial luck is stable in later life. Assets built in middle age support a comfortable retirement. Focus on safe deposits or pensions rather than large investments.'],
      ja: ['晩年の金運は安定しています。中年に積んだ資産で余裕のある老後を過ごします。大きな投資より安全な預金や年金に集中しましょう。'],
      zh: ['晚年财运稳定，凭借中年积累的财富安享晚年。专注于安全的存款或养老金，而非大规模投资。'],
    },
  },
  business: {
    early: {
      ko: ['초년에는 직장 생활이 적합합니다. 사업보다는 경험을 쌓고 인맥을 형성하는 데 집중하세요. 25세 이후 자신만의 아이디어가 떠오를 수 있으나, 30세 이전의 창업은 신중히 고려하세요.'],
      en: ['Working for others is most suitable in early life. Focus on gaining experience and building connections rather than starting a business. Ideas may spark after 25, but think carefully before starting a venture before 30.'],
      ja: ['初年は会社勤めが適しています。事業よりも経験を積み、人脈を築くことに集中しましょう。25歳以降に自分だけのアイデアが浮かぶかもしれませんが、30歳前の起業は慎重に検討しましょう。'],
      zh: ['初年适合职场生活，专注积累经验和建立人脉而非创业。25岁后可能萌生自己的想法，但30岁前创业需慎重考虑。'],
    },
    mid: {
      ko: ['중년기는 사업운이 강한 시기입니다. 35세 이후 창업하면 성공 확률이 높으며, 기존 사업자는 확장을 고려할 수 있습니다. 40대 후반에는 안정기에 접어들어 꾸준한 수익을 올립니다.'],
      en: ['Business luck is strong in middle age. Starting a business after 35 has a high success rate; existing business owners may consider expansion. By the late 40s, you enter a stable phase with steady earnings.'],
      ja: ['中年期は仕事運が強い時期です。35歳以降に起業すると成功率が高く、既存の事業者は拡大を検討できます。40代後半には安定期に入り、安定した収益を上げます。'],
      zh: ['中年期事业运强盛，35岁后创业成功率高，已有事业的人可考虑扩展。40多岁后半段进入稳定期，收益持续稳定。'],
    },
    late: {
      ko: ['말년에는 사업 일선에서 물러나 후계자에게 인계하는 것이 좋습니다. 고문이나 자문 역할로 경험을 전수하면서 보람을 느끼세요.'],
      en: ['In later life, it is best to step back from the front lines of business and hand over to a successor. Find fulfillment in passing on your experience as an advisor or consultant.'],
      ja: ['晩年は事業の第一線から退き、後継者に引き継ぐのが良いでしょう。顧問やアドバイザーとして経験を伝えながら、やりがいを感じましょう。'],
      zh: ['晚年适合从事业一线退下来，移交给接班人。以顾问或咨询角色传承经验，从中找到成就感。'],
    },
  },
  love: {
    early: {
      ko: ['초년에는 여러 인연을 만나지만, 진정한 인연은 20대 중후반에 나타납니다. 결혼은 28세 이후가 좋습니다. 외모보다 인품을 보는 눈을 기르세요.'],
      en: ['You meet many people early in life, but your true match appears in your mid-to-late 20s. After 28 is a good time for marriage. Train yourself to value character over appearance.'],
      ja: ['初年は様々な縁に出会いますが、真の縁は20代の中後半に現れます。結婚は28歳以降が良いでしょう。外見より人柄を見る目を養いましょう。'],
      zh: ['初年会遇到各种缘分，但真正的缘分出现在20多岁中后期。婚姻28岁后为宜，培养看重品格而非外貌的眼光。'],
    },
    mid: {
      ko: ['중년기 애정운은 안정적입니다. 결혼 생활이 원만하며, 배우자와의 깊은 유대감을 형성합니다. 다만 35세 전후로 작은 위기가 올 수 있으니 소통을 게을리하지 마세요.'],
      en: ['Love luck is stable in middle age. Your marriage is harmonious and you build a deep bond with your partner. However, a small crisis may come around age 35; do not neglect communication.'],
      ja: ['中年期の恋愛運は安定しています。結婚生活が円満で、配偶者との深い絆を形成します。ただし35歳前後に小さな危機が来るかもしれないので、コミュニケーションを怠らないようにしましょう。'],
      zh: ['中年期爱情运稳定，婚姻生活和睦，与伴侣建立深厚感情纽带。但35岁前后可能有小危机，不要忽视沟通。'],
    },
    late: {
      ko: ['말년의 애정운은 평화롭습니다. 오랜 세월 함께한 배우자와 깊은 정을 나누며, 손자녀들에게 사랑을 베풉니다. 여행이나 취미 활동을 함께하면 좋습니다.'],
      en: ['Love luck is peaceful in later life. You share a deep bond with your long-time partner, and you shower your grandchildren with love. Traveling and enjoying hobbies together is recommended.'],
      ja: ['晩年の恋愛運は平和です。長年連れ添った配偶者と深い情を分かち合い、孫たちに愛情を注ぎます。旅行や趣味活動を一緒にすると良いでしょう。'],
      zh: ['晚年爱情运平静，与相伴多年的伴侣共享深厚感情，将爱倾注于孙辈。一同旅行或享受兴趣爱好为佳。'],
    },
  },
  relationships: {
    early: {
      ko: ['초년에는 친구 관계가 중요합니다. 어린 시절 사귄 친구가 평생 인연이 될 수 있으니 진실된 우정을 쌓으세요. 20대에는 다양한 사람을 만나며 인맥을 넓히는 것이 좋습니다.'],
      en: ['Friendships are important early in life. Friends made in childhood can become lifelong connections; build genuine bonds. In your 20s, meeting diverse people and expanding your network is beneficial.'],
      ja: ['初年は友人関係が重要です。幼い頃に作った友人が生涯の縁になることがあるので、真の友情を築きましょう。20代では様々な人と出会い、人脈を広げるのが良いでしょう。'],
      zh: ['初年友情关系很重要，幼年结交的朋友可能成为一生的缘分，要建立真诚的友谊。20多岁广泛结识各种人，拓展人脉为好。'],
    },
    mid: {
      ko: ['중년기 대인관계는 사업과 직결됩니다. 넓은 인맥이 성공의 밑거름이 되며, 30대에 맺은 인연이 40대에 큰 도움이 됩니다. 배신을 당할 수도 있으나 대부분의 관계는 긍정적입니다.'],
      en: ['Interpersonal relationships in middle age are directly linked to business success. A broad network becomes the foundation of success; connections made in your 30s will greatly help in your 40s. Betrayal is possible, but most relationships are positive.'],
      ja: ['中年期の対人関係はビジネスと直結しています。広い人脈が成功の土台となり、30代に築いた縁が40代に大きな助けとなります。裏切られることもありますが、ほとんどの関係はポジティブです。'],
      zh: ['中年期人际关系与事业直接相关，广泛的人脉成为成功的基础，30多岁建立的关系在40多岁大有裨益。虽可能遭遇背叛，但大多数关系是积极的。'],
    },
    late: {
      ko: ['말년에는 가족 관계가 가장 중요합니다. 자녀, 손자녀와의 관계가 원만하여 행복한 노년을 보냅니다. 오랜 친구들과 교류하며 즐거운 시간을 보내세요.'],
      en: ['Family relationships are most important in later life. Harmonious ties with children and grandchildren make for a happy old age. Enjoy time with longtime friends.'],
      ja: ['晩年は家族関係が最も重要です。子供、孫との関係が円満で幸せな老後を送ります。長年の友人と交流して楽しい時間を過ごしましょう。'],
      zh: ['晚年家庭关系最为重要，与子女和孙辈关系融洽，幸福安享晚年。与多年老友交流，共度欢乐时光。'],
    },
  },
  health: {
    early: {
      ko: ['초년에는 대체로 건강하나, 20대 후반부터 체력 관리가 필요합니다. 규칙적인 운동 습관을 들이고, 과로를 피하세요. 이 시기에 건강 습관을 잘 들이면 평생 건강합니다.'],
      en: ['Generally healthy in early life, but physical management becomes necessary from your late 20s. Build a habit of regular exercise and avoid overworking. Good health habits formed now last a lifetime.'],
      ja: ['初年はおおむね健康ですが、20代後半から体力管理が必要になります。規則的な運動習慣をつけ、過労を避けましょう。この時期に健康習慣をきちんとつければ、生涯健康でいられます。'],
      zh: ['初年总体健康，但20多岁后半段需要体力管理。养成规律运动习惯，避免过劳。这一时期养成好的健康习惯，将受益终身。'],
    },
    mid: {
      ko: ['중년기 건강에 가장 주의가 필요합니다. 35세부터 체력이 떨어지기 시작하니 운동을 게을리하지 마세요. 40대에는 성인병에 주의하고, 정기적인 건강 검진을 받으세요.'],
      en: ['Middle age requires the most attention to health. Physical strength begins to decline from 35; do not neglect exercise. In your 40s, watch for lifestyle diseases and get regular check-ups.'],
      ja: ['中年期の健康に最も注意が必要です。35歳から体力が落ち始めるので、運動を怠らないようにしましょう。40代は生活習慣病に注意し、定期的な健康診断を受けましょう。'],
      zh: ['中年期健康需要最多关注，35岁起体力开始下降，不要懈怠运动。40多岁注意慢性病，定期进行健康体检。'],
    },
    late: {
      ko: ['말년 건강은 중년기의 관리에 달려 있습니다. 꾸준히 관리해왔다면 건강하게 노년을 보낼 수 있습니다. 가벼운 운동을 지속하고, 균형 잡힌 식사를 하세요.'],
      en: ['Late-life health depends on how well you managed yourself in middle age. If you have been consistent, a healthy old age awaits. Continue light exercise and maintain a balanced diet.'],
      ja: ['晩年の健康は中年期の管理にかかっています。継続して管理してきたなら、健康な老後を過ごせます。軽い運動を続け、バランスの取れた食事をしましょう。'],
      zh: ['晚年健康取决于中年期的管理。若持续管理良好，可健康安享晚年。坚持适量运动，保持均衡饮食。'],
    },
  },
}

// ─── 길한 색상 / 숫자 다국어 ────────────────────────────────────────────────

const luckyColorsByLang: Record<Language, string[]> = {
  ko: ['빨간색', '파란색', '노란색', '녹색', '보라색', '주황색', '분홍색', '하늘색', '검은색', '흰색', '금색', '은색'],
  en: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  ja: ['赤', '青', '黄', '緑', '紫', 'オレンジ', 'ピンク', '水色', '黒', '白', '金', '銀'],
  zh: ['红色', '蓝色', '黄色', '绿色', '紫色', '橙色', '粉色', '天蓝', '黑色', '白色', '金色', '银色'],
  es: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  fr: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  de: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  pt: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  hi: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  vi: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
  th: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Sky blue', 'Black', 'White', 'Gold', 'Silver'],
}

const luckyNumbers = ['1, 7', '2, 8', '3, 9', '4, 5', '6, 0', '1, 3', '2, 6', '4, 8', '5, 9', '3, 7', '1, 6', '2, 4']

// ─── 평생운 제목 다국어 ──────────────────────────────────────────────────

/** Short phase labels for legacy lifetime generator fallbacks */
const legacyLifetimePhaseTitles: Record<SupportedFortuneLanguage, { early: string; mid: string; late: string }> = {
  ko: { early: '초기', mid: '중기', late: '말기' },
  en: { early: 'Early phase', mid: 'Mid phase', late: 'Late phase' },
  ja: { early: '初期', mid: '中期', late: '晩期' },
  zh: { early: '初期', mid: '中期', late: '晚期' },
}

const lifetimeTitlesByContentLang: Record<SupportedFortuneLanguage, { early: string; mid: string; late: string }> = {
  ko: { early: '초년운 (1세~30세)', mid: '중년운 (31세~50세)', late: '말년운 (51세 이후)' },
  en: { early: 'Early-life fortune (ages 1–30)', mid: 'Mid-life fortune (ages 31–50)', late: 'Later-life fortune (age 51+)' },
  ja: { early: '初年運（1〜30歳）', mid: '中年運（31〜50歳）', late: '晩年運（51歳以降）' },
  zh: { early: '早年运（1–30 岁）', mid: '中年运（31–50 岁）', late: '晚年运（51 岁以后）' },
}

export function getLifetimeTitles(language: Language) {
  const langKey = getFortuneLanguage(language)
  return lifetimeTitlesByContentLang[langKey] ?? lifetimeTitlesByContentLang.en
}


// ─── 생성 함수들 ────────────────────────────────────────────────────────────

// 시드 기반 의사 난수 생성기
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function generateFortune(
  type: FortuneType,
  category: FortuneCategory,
  seedOrMonth?: number,
  language: Language = 'ko',
  personalizationVariant?: number
): FortuneResult {
  try {
    const langKey = getFortuneLanguage(language)
    
    // 월별 운세인 경우 새로운 상세 운세 사용
    if (type === 'monthly' && seedOrMonth !== undefined) {
      const monthlyText = getMonthlyFortune(seedOrMonth, langKey as 'ko' | 'en')
      const random1 = seededRandom(seedOrMonth + (personalizationVariant || 0))
      const random2 = seededRandom(seedOrMonth + 100 + (personalizationVariant || 0))
      const random3 = seededRandom(seedOrMonth + 200 + (personalizationVariant || 0))
      
      const score = Math.floor(random2 * 4) + 7
      const colorArray = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
      const colorIdx = colorArray.length > 0 ? Math.floor(random3 * colorArray.length) : 0
      const numberArray = luckyNumbers || []
      
      return {
        type,
        category,
        month: seedOrMonth,
        score: Math.min(10, Math.max(1, score)),
        description: typeof monthlyText === 'string' ? monthlyText : getFallbackTemplate('monthly', language),
        luckyColor: colorArray.length > 0 ? colorArray[colorIdx] : '#9C27B0',
        luckyNumber: numberArray.length > 0 ? numberArray[colorIdx % numberArray.length] : 7,
      }
    }
    
    const descsMap = fortuneDescriptions?.[category]
    if (!descsMap) {
      return {
        type,
        category,
        month: undefined,
        score: 7,
        description: getFallbackTemplate('general', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }

    const descs = descsMap[langKey] || descsMap.ko || []
    if (!Array.isArray(descs) || descs.length === 0) {
      return {
        type,
        category,
        month: undefined,
        score: 7,
        description: getFallbackTemplate('general', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }

    // 시드가 있으면 시드 기반으로 고정된 결과 생성, 없으면 랜덤
    const variant = typeof personalizationVariant === 'number' ? personalizationVariant : 0
    const random1 = seedOrMonth !== undefined ? seededRandom(seedOrMonth + variant) : Math.random()
    const random2 = seedOrMonth !== undefined ? seededRandom(seedOrMonth + 100 + variant) : Math.random()
    const random3 = seedOrMonth !== undefined ? seededRandom(seedOrMonth + 200 + variant) : Math.random()
    
    const idx = Math.floor(random1 * descs.length)
    const score = Math.floor(random2 * 4) + 7

    const colorArray = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
    const colorIdx = colorArray.length > 0 ? Math.floor(random3 * colorArray.length) : 0
    const numberArray = luckyNumbers || []
    
    const desc = descs[idx] || getFallbackTemplate('general', language)
    
    return {
      type,
      category,
      month: undefined,
      score: Math.min(10, Math.max(1, score)),
      description: typeof desc === 'string' ? desc : getFallbackTemplate('general', language),
      luckyColor: colorArray.length > 0 ? colorArray[colorIdx] : '#9C27B0',
      luckyNumber: numberArray.length > 0 ? numberArray[colorIdx % numberArray.length] : 7,
    }
  } catch (error) {
    console.log('[v0] Error in generateFortune:', error)
    return {
      type,
      category,
      month: undefined,
      score: 7,
      description: getFallbackTemplate('general', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }
}

// ─── Enhanced Fortune Generation with Multiple Categories ─────────────────

/**
 * 보강된 운세 생성: 프로필 기반 + 다중 카테고리
 * 각 프로필마다 고유한 결과를 보장함
 */
export function generateEnhancedFortuneWithProfile(
  type: FortuneType,
  primaryCategory: FortuneCategory,
  profile: FortuneProfileContext,
  month?: number,
  language: Language = 'ko'
): FortuneResult {
  try {
    // Validate profile
    if (!profile || !profile.name || typeof profile.birthYear !== 'number') {
      console.log('[v0] Invalid profile for enhanced fortune')
      return {
        type,
        category: primaryCategory,
        month,
        score: 7,
        description: getFallbackTemplate('general', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }

    const langKey = getFortuneLanguage(language)

    const profileHash = profile.profileHash || generateProfileHash(
      profile.name, profile.birthYear, profile.birthMonth, profile.birthDay,
      profile.birthHour, profile.gender, profile.isLunar
    )

    // 각 종류의 운세마다 다른 시드 생성
    let seed = profileHash
    if (type === 'daily') {
      seed += new Date().getDate() * 73 + new Date().getMonth() * 137
    } else if (type === 'yearly') {
      seed += new Date().getFullYear() * 241
    } else if (type === 'monthly' && month) {
      seed += month * 181 + profile.birthMonth * 97
    }

    // 카테고리별 다른 계수 추가
    if (primaryCategory.length > 0) {
      seed += primaryCategory.charCodeAt(0) * 1009 + (primaryCategory.charCodeAt(primaryCategory.length - 1) || 0) * 503
    }

    const rng = new SeededRandom(seed)

    let description = getFallbackTemplate('general', language)
    
    // For yearly type, use comprehensive templates with 4-5+ lines
    if (type === 'yearly') {
      const yearlyPool = getYearlyComprehensivePool(language)
      if (yearlyPool.length > 0) {
        const templateIndex = Math.abs(seed) % yearlyPool.length
        description = yearlyPool[templateIndex] || getFallbackTemplate('yearly', language)
      }
    } else {
      // For other types, use category-specific templates
      const categoryTemplateMap: Record<FortuneCategory, typeof loveFortuneTemplates> = {
        love: loveFortuneTemplates,
        wealth: wealthFortuneTemplates,
        career: careerFortuneTemplates,
        health: healthFortuneTemplates,
        opportunity: opportunityFortuneTemplates,
        warning: warningFortuneTemplates,
        relationship: relationshipFortuneTemplates,
      }

      const pool = categoryTemplateMap[primaryCategory] || categoryTemplateMap.love
      const templates = pool[langKey]?.length ? pool[langKey] : pool.en?.length ? pool.en : pool.ko
      if (templates.length > 0) {
        // Enhanced template selection - include type and month for more variety
        const typeBonus = type === 'daily' ? 13 : type === 'yearly' ? 97 : (month || 1) * 47
        const templateIndex = Math.abs((seed + typeBonus) % templates.length)
        description = templates[templateIndex] || getFallbackTemplate('general', language)
      }
    }

    // 점수 계산: 프로필 데이터 기반
    const birthDayFactor = (profile.birthDay || 1) % 3
    const birthMonthFactor = (profile.birthMonth || 1) % 2
    const genderFactor = profile.gender === 'male' ? 0 : 1
    const nameLengthFactor = (profile.name?.length || 0) % 2

    let score = 7 + rng.nextInt(3)
    
    // 주운별로 점수 변동 추가
    if (type === 'daily') {
      score += birthDayFactor + genderFactor
    } else if (type === 'yearly') {
      score += birthMonthFactor + nameLengthFactor
    } else if (type === 'monthly') {
      score += ((month || 1) % 3) + birthMonthFactor
    }

    return {
      type,
      category: primaryCategory,
      month: type === 'monthly' ? month : undefined,
      score: Math.min(10, Math.max(1, score)),
      description,
      luckyColor: (() => {
        const arr = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko
        return arr?.length ? arr[rng.nextInt(arr.length)] : '#9C27B0'
      })(),
      luckyNumber: (luckyNumbers && luckyNumbers.length > 0)
        ? luckyNumbers[rng.nextInt(luckyNumbers.length)]
        : 7,
    }
  } catch (error) {
    console.log('[v0] Error generating enhanced fortune:', error)
    return {
      type,
      category: primaryCategory,
      month,
      score: 7,
      description: getFallbackTemplate('general', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }
}

/**
 * 다양한 카테고리 조합으로 풍부한 운세 생성
 */
export function generateComprehensiveFortuneWithProfile(
  profile: FortuneProfileContext,
  language: Language = 'ko'
): Record<FortuneCategory, FortuneResult> {
  const categories: FortuneCategory[] = ['love', 'wealth', 'career', 'health', 'opportunity', 'warning', 'relationship']
  
  return {
    love: generateEnhancedFortuneWithProfile('daily', 'love', profile, undefined, language),
    wealth: generateEnhancedFortuneWithProfile('daily', 'wealth', profile, undefined, language),
    career: generateEnhancedFortuneWithProfile('daily', 'career', profile, undefined, language),
    health: generateEnhancedFortuneWithProfile('daily', 'health', profile, undefined, language),
    opportunity: generateEnhancedFortuneWithProfile('daily', 'opportunity', profile, undefined, language),
    warning: generateEnhancedFortuneWithProfile('daily', 'warning', profile, undefined, language),
    relationship: generateEnhancedFortuneWithProfile('daily', 'relationship', profile, undefined, language),
  }
}

/**
 * 개선된 월별 운세: 월마다 다른 결과
 */
export function generateEnhancedMonthlyFortunesWithProfile(
  primaryCategory: FortuneCategory,
  profile: FortuneProfileContext,
  language: Language = 'ko'
): FortuneResult[] {
  try {
    if (!profile || !profile.name || typeof profile.birthYear !== 'number') {
      console.log('[v0] Invalid profile for monthly, using fallback')
      return Array.from({ length: 12 }, (_, i) => ({
        type: 'monthly' as FortuneType,
        category: primaryCategory,
        month: i + 1,
        score: 7,
        description: getFallbackTemplate('monthly', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }))
    }

    const langKey = getFortuneLanguage(language)

    const profileHash = profile.profileHash || generateProfileHash(
      profile.name, profile.birthYear, profile.birthMonth, profile.birthDay,
      profile.birthHour, profile.gender, profile.isLunar
    )

    // Safety check for monthly templates
    if (!monthlyDetailedTemplates?.ko || monthlyDetailedTemplates.ko.length === 0) {
      console.log('[v0] Monthly templates empty, using fallback')
      return Array.from({ length: 12 }, (_, i) => ({
        type: 'monthly' as FortuneType,
        category: primaryCategory,
        month: i + 1,
        score: 7,
        description: getFallbackTemplate('monthly', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }))
    }

    return Array.from({ length: 12 }, (_, monthIndex) => {
      try {
        const month = monthIndex + 1
        const currentMonth = new Date().getMonth() + 1
        const personalSeed = createPersonalSeed(profileHash, 'monthly', undefined, currentMonth, month)
        const rng = new SeededRandom(personalSeed)
        
        // Use category-specific pools for monthly fortune
        const categoryPools = categorySpecificPools[primaryCategory as keyof typeof categorySpecificPools] || categorySpecificPools.total
        
        // Select different pool combinations for each month for variety
        const poolCombination = month % 3
        let monthlyDescription: string
        if (langKey === 'ko') {
          if (poolCombination === 0) {
            monthlyDescription = generateCustomFortune(personalSeed, { ...categoryPools, positive: fortuneSentencePools.monthly.positive }, 3, language)
          } else if (poolCombination === 1) {
            monthlyDescription = generateCustomFortune(personalSeed, { ...categoryPools, caution: fortuneSentencePools.monthly.caution }, 3, language)
          } else {
            monthlyDescription = generateCustomFortune(personalSeed, { ...categoryPools, transform: fortuneSentencePools.monthly.transform }, 3, language)
          }
        } else {
          monthlyDescription = getMonthlyDetailedLine(month, language)
        }
        
        const score = Math.min(10, Math.max(1, 6 + rng.nextInt(4)))
        const colorArr = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
        
        return {
          type: 'monthly' as FortuneType,
          category: primaryCategory,
          month,
          score,
          description: monthlyDescription,
          luckyColor: colorArr.length > 0 ? colorArr[rng.nextInt(colorArr.length)] : '#9C27B0',
          luckyNumber: luckyNumbers?.[rng.nextInt(luckyNumbers?.length || 1)] || 7,
        }
      } catch (e) {
        console.log('[v0] Error in monthly loop:', e)
        return {
          type: 'monthly' as FortuneType,
          category: primaryCategory,
          month: monthIndex + 1,
          score: 7,
          description: getFallbackTemplate('monthly', language),
          luckyColor: '#9C27B0',
          luckyNumber: 7,
        }
      }
    })
  } catch (error) {
    console.log('[v0] Error generating monthly fortunes:', error)
    return Array.from({ length: 12 }, (_, i) => ({
      type: 'monthly' as FortuneType,
      category: primaryCategory,
      month: i + 1,
      score: 7,
      description: getFallbackTemplate('monthly', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }))
  }
}

export function generateLifetimeFortuneWithProfile(
  category: FortuneCategory, 
  profile: FortuneProfileContext,
  language: Language = 'ko'
): LifetimeFortune {
  try {
    const langKey = getFortuneLanguage(language)
    const titles = getLifetimeTitles(language)
    
    // Validate profile data
    if (!profile || !profile.name || typeof profile.birthYear !== 'number') {
      console.log('[v0] Invalid profile data, using fallback')
      return {
        category,
        early: { title: titles.early, description: getFallbackTemplate('lifetime', language), score: 7 },
        mid: { title: titles.mid, description: getFallbackTemplate('lifetime', language), score: 7 },
        late: { title: titles.late, description: getFallbackTemplate('lifetime', language), score: 7 },
      }
    }

    // Generate profile hash if not provided
    const profileHash = profile.profileHash || generateProfileHash(
      profile.name, profile.birthYear, profile.birthMonth, profile.birthDay,
      profile.birthHour, profile.gender, profile.isLunar
    )
    
    // Safety check for templates
    if (!lifetimeDetailedTemplates?.ko || lifetimeDetailedTemplates.ko.length === 0) {
      console.log('[v0] Lifetime templates empty, using fallback')
      return {
        category,
        early: { title: titles.early, description: getFallbackTemplate('lifetime', language), score: 7 },
        mid: { title: titles.mid, description: getFallbackTemplate('lifetime', language), score: 7 },
        late: { title: titles.late, description: getFallbackTemplate('lifetime', language), score: 7 },
      }
    }
    
    // Use personal seed to generate unique descriptions for each life phase
    // Each phase gets a completely different seed to ensure variety
    const earlyPersonalSeed = createPersonalSeed(profileHash, 'lifetime', undefined, undefined)
    const midPersonalSeed = earlyPersonalSeed ^ 0xAAAAAAAA
    const latePersonalSeed = earlyPersonalSeed ^ 0x55555555
    
    // Generate custom fortunes using category-specific pools for detailed analysis
    // 각 생명 단계마다 카테고리별 전문 pool 사용하여 4-5줄 이상 생성
    const categoryPools = categorySpecificPools[category as keyof typeof categorySpecificPools] || categorySpecificPools.total
    
    let localizedLifetimePool = lifetimeDetailedTemplates.ko
    if (lifetimeDetailedTemplates[langKey]?.length) {
      localizedLifetimePool = lifetimeDetailedTemplates[langKey]
    } else if (lifetimeDetailedTemplates.en?.length) {
      localizedLifetimePool = lifetimeDetailedTemplates.en
    }

    let earlyDescription: string
    let midDescription: string
    let lateDescription: string

    if (langKey === 'ko') {
      earlyDescription = generateCustomFortune(earlyPersonalSeed, {
        flow: lifetimeDetailedPools.flow,
        personality: lifetimeDetailedPools.personality,
        ...categoryPools,
      }, 5, language)

      midDescription = generateCustomFortune(midPersonalSeed, {
        flow: lifetimeDetailedPools.flow,
        relationship: lifetimeDetailedPools.relationship,
        wealth: lifetimeDetailedPools.wealth,
        ...categoryPools,
      }, 5, language)

      lateDescription = generateCustomFortune(latePersonalSeed, {
        care: lifetimeDetailedPools.care,
        warning: lifetimeDetailedPools.warning,
        strength: lifetimeDetailedPools.strength,
        ...categoryPools,
      }, 5, language)
    } else {
      const lp = localizedLifetimePool
      earlyDescription = lp[Math.abs(earlyPersonalSeed) % lp.length] || getFallbackTemplate('lifetime', language)
      midDescription = lp[Math.abs(midPersonalSeed) % lp.length] || getFallbackTemplate('lifetime', language)
      lateDescription = lp[Math.abs(latePersonalSeed) % lp.length] || getFallbackTemplate('lifetime', language)
    }
    
    // Create seeded random for varied scores
    const rng = new SeededRandom(profileHash + 10000)
    const earlyScore = Math.min(10, Math.max(1, 6 + rng.nextInt(4)))
    const midScore = Math.min(10, Math.max(1, 6 + rng.nextInt(4)))
    const lateScore = Math.min(10, Math.max(1, 6 + rng.nextInt(4)))

    return {
      category,
      early: {
        title: titles.early,
        description: earlyDescription,
        score: earlyScore,
      },
      mid: {
        title: titles.mid,
        description: midDescription,
        score: midScore,
      },
      late: {
        title: titles.late,
        description: lateDescription,
        score: lateScore,
      },
    }
  } catch (error) {
    console.log('[v0] Error generating lifetime fortune:', error)
    // Return safe default
    const titles = getLifetimeTitles(language)
    return {
      category,
      early: { title: titles.early, description: getFallbackTemplate('lifetime', language), score: 7 },
      mid: { title: titles.mid, description: getFallbackTemplate('lifetime', language), score: 7 },
      late: { title: titles.late, description: getFallbackTemplate('lifetime', language), score: 7 },
    }
  }
}

export function generateYearlyFortuneWithProfile(
  category: FortuneCategory, 
  profile: FortuneProfileContext,
  language: Language = 'ko'
): FortuneResult {
  try {
    const langKey = getFortuneLanguage(language)
    const currentYear = new Date().getFullYear()
    
    // Validate profile data
    if (!profile || !profile.name || typeof profile.birthYear !== 'number') {
      console.log('[v0] Invalid profile data for yearly, using fallback')
      return {
        type: 'yearly',
        category,
        score: 7,
        description: getFallbackTemplate('yearly', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }
    
    // Generate profile hash
    const profileHash = profile.profileHash || generateProfileHash(
      profile.name, profile.birthYear, profile.birthMonth, profile.birthDay,
      profile.birthHour, profile.gender, profile.isLunar
    )
    
    // Safety check for templates
    if (!yearlyComprehensiveTemplates?.ko || yearlyComprehensiveTemplates.ko.length === 0) {
      console.log('[v0] Yearly templates empty, using fallback')
      return {
        type: 'yearly',
        category,
        score: 7,
        description: getFallbackTemplate('yearly', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }
    
    // Use personal seed for comprehensive and unique yearly fortune by category
    const personalSeed = createPersonalSeed(profileHash, 'yearly', currentYear)
    
    // Select category-specific pools for yearly fortune
    const categoryPools = categorySpecificPools[category as keyof typeof categorySpecificPools] || categorySpecificPools.total

    let yearlyDescription: string
    if (langKey === 'ko') {
      yearlyDescription = generateCustomFortune(personalSeed, {
        intro: fortuneSentencePools.yearly.intro,
        ...categoryPools,
      }, 5, language)
    } else {
      const yp = getYearlyComprehensivePool(language)
      yearlyDescription = yp[Math.abs(personalSeed) % yp.length] || getFallbackTemplate('yearly', language)
    }
    
    // Calculate score with profile variations - include year factor for yearly variation
    const rng = new SeededRandom(personalSeed)
    const birthDayFactor = (profile.birthDay || 1) % 3
    const birthMonthFactor = (profile.birthMonth || 1) % 2
    const genderFactor = profile.gender === 'male' ? 0 : 1
    const yearFactor = currentYear % 2
    const score = Math.min(10, Math.max(1, 6 + rng.nextInt(4) + birthMonthFactor + genderFactor + yearFactor))
    const yearlyColors = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []

    return {
      type: 'yearly',
      category,
      score,
      description: yearlyDescription,
      luckyColor: yearlyColors.length > 0 ? yearlyColors[rng.nextInt(yearlyColors.length)] : '#9C27B0',
      luckyNumber: luckyNumbers?.[rng.nextInt(luckyNumbers?.length || 1)] || 7,
    }
  } catch (error) {
    console.log('[v0] Error generating yearly fortune:', error)
    return {
      type: 'yearly',
      category,
      score: 7,
      description: getFallbackTemplate('yearly', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }
}

export function generateFortuneWithProfile(
  type: FortuneType,
  category: FortuneCategory,
  profile: FortuneProfileContext | null | undefined,
  month?: number,
  language: Language = 'ko'
): FortuneResult {
  try {
    // Safe profile defaults
    if (!profile || typeof profile !== 'object') {
      return {
        type,
        category,
        month: type === 'monthly' ? month : undefined,
        score: 7,
        description: getFallbackTemplate('general', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }

    const langKey = getFortuneLanguage(language)
    
    // Safe profile values
    const safeName = typeof profile.name === 'string' && profile.name.trim().length > 0 ? profile.name.trim() : '사용자'
    const safeYear = typeof profile.birthYear === 'number' ? profile.birthYear : 2000
    const safeMonth = typeof profile.birthMonth === 'number' ? profile.birthMonth : 1
    const safeDay = typeof profile.birthDay === 'number' ? profile.birthDay : 1
    const safeHour = profile.birthHour || 12
    const safeGender = profile.gender === 'female' ? 'female' : 'male'
    const safeIsLunar = profile.isLunar === true
    
    // Generate profile hash safely
    const profileHash = profile.profileHash || generateProfileHash(
      safeName, safeYear, safeMonth, safeDay, safeHour, safeGender, safeIsLunar
    )
    
    // Create unique seed combining profile, type, category, and optional month
    const typeFactor = type === 'daily' ? new Date().getDate() : type === 'monthly' ? (month || 1) * 100 : 0
    const categoryCode = category && category.length > 0 ? category.charCodeAt(0) : 97 // 'a'
    const seed = Math.max(1, profileHash + typeFactor + categoryCode * 1000)
    const rng = new SeededRandom(seed)
    
    // For monthly fortune, use personal seed with month information
    if (type === 'monthly' && month !== undefined) {
      const currentMonth = new Date().getMonth() + 1
      const personalSeed = createPersonalSeed(profileHash, 'monthly', undefined, currentMonth, month)
      
      // Generate custom monthly fortune using specialized sentence pools
      const randomPool = rng.nextInt(3)
      let monthlyDescription: string
      if (langKey === 'ko') {
        if (randomPool === 0) {
          monthlyDescription = generateCustomFortune(personalSeed, { positive: fortuneSentencePools.monthly.positive, caution: fortuneSentencePools.monthly.caution }, 2, language)
        } else if (randomPool === 1) {
          monthlyDescription = generateCustomFortune(personalSeed, { caution: fortuneSentencePools.monthly.caution, transform: fortuneSentencePools.monthly.transform }, 2, language)
        } else {
          monthlyDescription = generateCustomFortune(personalSeed, { positive: fortuneSentencePools.monthly.positive, transform: fortuneSentencePools.monthly.transform }, 2, language)
        }
      } else {
        monthlyDescription = getMonthlyDetailedLine(month, language)
      }
      
      const monthlyRng = new SeededRandom(personalSeed)
      const monthlyScore = Math.min(10, Math.max(1, 6 + monthlyRng.nextInt(4)))
      
      const colorArray = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
      const numberArray = luckyNumbers || []
      
      return {
        type,
        category,
        month,
        score: monthlyScore,
        description: monthlyDescription,
        luckyColor: colorArray.length > 0 ? colorArray[monthlyRng.nextInt(colorArray.length)] : '#9C27B0',
        luckyNumber: numberArray.length > 0 ? numberArray[monthlyRng.nextInt(numberArray.length)] : 7,
      }
    }
    
    // For other types, use fortune descriptions
    const descs = fortuneDescriptions?.[category]?.[langKey]
    if (!descs || !Array.isArray(descs) || descs.length === 0) {
      return {
        type,
        category,
        month: undefined,
        score: 7,
        description: getFallbackTemplate('general', language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }
    }
    
    const idx = rng.nextInt(descs.length)
    const desc = descs[idx] || getFallbackTemplate('general', language)
    const score = Math.min(10, Math.max(1, 7 + rng.nextInt(3) + ((safeDay + safeMonth) % 2)))

    const colorArray = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
    const numberArray = luckyNumbers || []

    return {
      type,
      category,
      month: undefined,
      score,
      description: typeof desc === 'string' ? desc : getFallbackTemplate('general', language),
      luckyColor: colorArray.length > 0 ? colorArray[rng.nextInt(colorArray.length)] : '#9C27B0',
      luckyNumber: numberArray.length > 0 ? numberArray[rng.nextInt(numberArray.length)] : 7,
    }
  } catch (error) {
    console.log('[v0] Error in generateFortuneWithProfile:', error)
    // Return safe fallback
    return {
      type,
      category,
      month: type === 'monthly' ? month : undefined,
      score: 7,
      description: getFallbackTemplate('general', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }
}

export function generateMonthlyFortunesWithProfile(
  category: FortuneCategory, 
  profile: FortuneProfileContext | null | undefined,
  language: Language = 'ko'
): FortuneResult[] {
  try {
    if (!profile) {
      // Return safe fallback for all 12 months
      return Array.from({ length: 12 }, (_, i) => ({
        type: 'monthly' as FortuneType,
        category,
        month: i + 1,
        score: 7,
        description: getMonthlyDetailedLine(i + 1, language),
        luckyColor: '#9C27B0',
        luckyNumber: 7,
      }))
    }

    return Array.from({ length: 12 }, (_, i) => {
      try {
        return generateFortuneWithProfile('monthly', category, profile, i + 1, language)
      } catch (e) {
        console.log('[v0] Error generating monthly fortune for month', i + 1, ':', e)
        return {
          type: 'monthly' as FortuneType,
          category,
          month: i + 1,
          score: 7,
          description: getMonthlyDetailedLine(i + 1, language),
          luckyColor: '#9C27B0',
          luckyNumber: 7,
        }
      }
    })
  } catch (error) {
    console.log('[v0] Error in generateMonthlyFortunesWithProfile:', error)
    return Array.from({ length: 12 }, (_, i) => ({
      type: 'monthly' as FortuneType,
      category,
      month: i + 1,
      score: 7,
      description: getFallbackTemplate('monthly', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }))
  }
}

// ─── Legacy Functions (기존 함수 - 하위 호환성 유지 + 안정성 추가) ─────────────────

export function generateLifetimeFortune(category: FortuneCategory, language: Language = 'ko'): LifetimeFortune {
  try {
    const langKey = getFortuneLanguage(language)
    const descs = lifetimeDescriptions?.[category]
    const titles = getLifetimeTitles(language)
    const phaseShort = legacyLifetimePhaseTitles[langKey] ?? legacyLifetimePhaseTitles.en

    if (!descs || !titles) {
      return {
        category,
        early: { title: phaseShort.early, description: getFallbackTemplate('lifetime', language), score: 7 },
        mid: { title: phaseShort.mid, description: getFallbackTemplate('lifetime', language), score: 7 },
        late: { title: phaseShort.late, description: getFallbackTemplate('lifetime', language), score: 7 },
      }
    }

    const pickRandom = (arr: string[]): string => {
      if (!arr || arr.length === 0) return getFallbackTemplate('lifetime', language)
      return arr[Math.floor(Math.random() * arr.length)]
    }

    return {
      category,
      early: {
        title: titles.early || phaseShort.early,
        description: pickRandom(descs.early?.[langKey] || []) || getFallbackTemplate('lifetime', language),
        score: Math.min(10, Math.max(1, Math.floor(Math.random() * 3) + 7)),
      },
      mid: {
        title: titles.mid || phaseShort.mid,
        description: pickRandom(descs.mid?.[langKey] || []) || getFallbackTemplate('lifetime', language),
        score: Math.min(10, Math.max(1, Math.floor(Math.random() * 3) + 7)),
      },
      late: {
        title: titles.late || phaseShort.late,
        description: pickRandom(descs.late?.[langKey] || []) || getFallbackTemplate('lifetime', language),
        score: Math.min(10, Math.max(1, Math.floor(Math.random() * 3) + 7)),
      },
    }
  } catch (error) {
    console.log('[v0] Error in generateLifetimeFortune:', error)
    const langKey = getFortuneLanguage(language)
    const phaseShort = legacyLifetimePhaseTitles[langKey] ?? legacyLifetimePhaseTitles.en
    return {
      category,
      early: { title: phaseShort.early, description: getFallbackTemplate('lifetime', language), score: 7 },
      mid: { title: phaseShort.mid, description: getFallbackTemplate('lifetime', language), score: 7 },
      late: { title: phaseShort.late, description: getFallbackTemplate('lifetime', language), score: 7 },
    }
  }
}

export function generateYearlyFortune(category: FortuneCategory, language: Language = 'ko'): FortuneResult {
  try {
    const langKey = getFortuneLanguage(language)
    const descs = yearlyDescriptions?.[category]?.[langKey]
    const colorPool = luckyColorsByLang[language] || luckyColorsByLang[langKey] || luckyColorsByLang.ko || []
    
    if (!descs || descs.length === 0) {
      const pool = getYearlyDetailedPool(language)
      const fb = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : getFallbackTemplate('yearly', language)
      return {
        type: 'yearly',
        category,
        score: 7,
        description: fb,
        luckyColor: colorPool[0] || '#9C27B0',
        luckyNumber: luckyNumbers?.[0] || 7,
      }
    }

    const idx = Math.floor(Math.random() * descs.length)
    const score = Math.min(10, Math.max(1, Math.floor(Math.random() * 3) + 7))

    return {
      type: 'yearly',
      category,
      score,
      description: descs[idx] || getFallbackTemplate('yearly', language),
      luckyColor: colorPool.length > 0 ? colorPool[idx % colorPool.length] : '#9C27B0',
      luckyNumber: (luckyNumbers && luckyNumbers.length > 0)
        ? luckyNumbers[idx % luckyNumbers.length]
        : 7,
    }
  } catch (error) {
    console.log('[v0] Error in generateYearlyFortune:', error)
    return {
      type: 'yearly',
      category,
      score: 7,
      description: getFallbackTemplate('yearly', language),
      luckyColor: '#9C27B0',
      luckyNumber: 7,
    }
  }
}

export function generateMonthlyFortunes(category: FortuneCategory, language: Language = 'ko'): FortuneResult[] {
  return Array.from({ length: 12 }, (_, i) => generateFortune('monthly', category, i + 1, language))
}

export const categoryNames: Record<FortuneCategory, string> = {
  total: '총운', wealth: '재물운', business: '사업운',
  love: '애정운', relationships: '대인운', health: '건강운',
}

export const typeNames: Record<FortuneType, string> = {
  lifetime: '평생운', yearly: '한해운', monthly: '월별운세', daily: '오늘의 운세',
}
