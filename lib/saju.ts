import type { SajuResult, FiveElementsAnalysis } from './types'

// 천간 (Heavenly Stems)
const heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
const heavenlyStemsHanja = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 지지 (Earthly Branches)
const earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
const earthlyBranchesHanja = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 오행 매핑
const stemToElement: Record<string, 'wood' | 'fire' | 'earth' | 'metal' | 'water'> = {
  '갑': 'wood', '을': 'wood',
  '병': 'fire', '정': 'fire',
  '무': 'earth', '기': 'earth',
  '경': 'metal', '신': 'metal',
  '임': 'water', '계': 'water'
}

const branchToElement: Record<string, 'wood' | 'fire' | 'earth' | 'metal' | 'water'> = {
  '인': 'wood', '묘': 'wood',
  '사': 'fire', '오': 'fire',
  '진': 'earth', '술': 'earth', '축': 'earth', '미': 'earth',
  '신': 'metal', '유': 'metal',
  '해': 'water', '자': 'water'
}

export function calculateSaju(year: number, month: number, day: number, hour?: number): SajuResult {
  // 년주 계산
  const yearStemIndex = (year - 4) % 10
  const yearBranchIndex = (year - 4) % 12
  
  // 월주 계산 (간략화된 버전)
  const monthStemIndex = ((yearStemIndex % 5) * 2 + month) % 10
  const monthBranchIndex = (month + 1) % 12
  
  // 일주 계산 (간략화된 버전 - 실제로는 만세력 필요)
  const baseDate = new Date(1900, 0, 31)
  const targetDate = new Date(year, month - 1, day)
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
  const dayStemIndex = diffDays % 10
  const dayBranchIndex = diffDays % 12
  
  // 시주 계산
  const hourIndex = hour !== undefined ? Math.floor((hour + 1) / 2) % 12 : 0
  const hourStemIndex = ((dayStemIndex % 5) * 2 + hourIndex) % 10
  const hourBranchIndex = hourIndex
  
  const yearPillar = {
    heavenlyStem: heavenlyStemsHanja[yearStemIndex < 0 ? yearStemIndex + 10 : yearStemIndex],
    earthlyBranch: earthlyBranchesHanja[yearBranchIndex < 0 ? yearBranchIndex + 12 : yearBranchIndex],
    combined: heavenlyStems[yearStemIndex < 0 ? yearStemIndex + 10 : yearStemIndex] + 
              earthlyBranches[yearBranchIndex < 0 ? yearBranchIndex + 12 : yearBranchIndex]
  }
  
  const monthPillar = {
    heavenlyStem: heavenlyStemsHanja[monthStemIndex],
    earthlyBranch: earthlyBranchesHanja[monthBranchIndex],
    combined: heavenlyStems[monthStemIndex] + earthlyBranches[monthBranchIndex]
  }
  
  const dayStemIdx = ((dayStemIndex % 10) + 10) % 10
  const dayBranchIdx = ((dayBranchIndex % 12) + 12) % 12
  const dayPillar = {
    heavenlyStem: heavenlyStemsHanja[dayStemIdx],
    earthlyBranch: earthlyBranchesHanja[dayBranchIdx],
    combined: heavenlyStems[dayStemIdx] + earthlyBranches[dayBranchIdx]
  }
  
  const hourPillar = {
    heavenlyStem: heavenlyStemsHanja[hourStemIndex],
    earthlyBranch: earthlyBranchesHanja[hourBranchIndex],
    combined: heavenlyStems[hourStemIndex] + earthlyBranches[hourBranchIndex]
  }
  
  // 오행 분석
  const elements = {
    wood: 0, fire: 0, earth: 0, metal: 0, water: 0
  }
  
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar]
  const koreanStems = pillars.map(p => heavenlyStems[heavenlyStemsHanja.indexOf(p.heavenlyStem)])
  const koreanBranches = pillars.map(p => earthlyBranches[earthlyBranchesHanja.indexOf(p.earthlyBranch)])
  
  koreanStems.forEach(stem => {
    if (stemToElement[stem]) elements[stemToElement[stem]]++
  })
  koreanBranches.forEach(branch => {
    if (branchToElement[branch]) elements[branchToElement[branch]]++
  })
  
  const dominant = (Object.entries(elements) as [keyof typeof elements, number][])
    .reduce((a, b) => a[1] > b[1] ? a : b)[0]
  
  const fiveElements: FiveElementsAnalysis = {
    ...elements,
    dominant
  }
  
  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    fiveElements
  }
}

export function getElementInfo(element: string, language: string = 'ko'): { color: string; numbers: string; direction: string; description: string } {
  const infoByLanguage: Record<string, Record<string, { color: string; numbers: string; direction: string; description: string }>> = {
    ko: {
      wood: { color: '녹색, 청색', numbers: '3, 8', direction: '동쪽', description: '성장, 창조, 인내심' },
      fire: { color: '빨간색, 자주색', numbers: '2, 7', direction: '남쪽', description: '열정, 예술성, 활동력' },
      earth: { color: '노란색, 갈색', numbers: '5, 10', direction: '중앙', description: '안정, 신뢰, 중재력' },
      metal: { color: '흰색, 금색', numbers: '4, 9', direction: '서쪽', description: '결단력, 정의감, 품위' },
      water: { color: '검은색, 파란색', numbers: '1, 6', direction: '북쪽', description: '지혜, 감정, 소통, 적응성' }
    },
    en: {
      wood: { color: 'Green, Cyan', numbers: '3, 8', direction: 'East', description: 'Growth, Creation, Patience' },
      fire: { color: 'Red, Purple', numbers: '2, 7', direction: 'South', description: 'Passion, Artistry, Activity' },
      earth: { color: 'Yellow, Brown', numbers: '5, 10', direction: 'Center', description: 'Stability, Trust, Mediation' },
      metal: { color: 'White, Gold', numbers: '4, 9', direction: 'West', description: 'Decisiveness, Justice, Grace' },
      water: { color: 'Black, Blue', numbers: '1, 6', direction: 'North', description: 'Wisdom, Emotion, Communication, Adaptability' }
    },
    ja: {
      wood: { color: '緑色、青色', numbers: '3, 8', direction: '東', description: '成長、創造、忍耐力' },
      fire: { color: '赤色、紫色', numbers: '2, 7', direction: '南', description: '情熱、芸術性、活動力' },
      earth: { color: '黄色、茶色', numbers: '5, 10', direction: '中央', description: '安定、信頼、調停力' },
      metal: { color: '白色、金色', numbers: '4, 9', direction: '西', description: '決断力、正義感、品位' },
      water: { color: '黒色、青色', numbers: '1, 6', direction: '北', description: '知恵、感情、コミュニケーション、適応性' }
    },
    zh: {
      wood: { color: '绿色, 青色', numbers: '3, 8', direction: '东方', description: '成长、创造、耐心' },
      fire: { color: '红色, 紫色', numbers: '2, 7', direction: '南方', description: '热情、艺术性、活动力' },
      earth: { color: '黄色, 褐色', numbers: '5, 10', direction: '中央', description: '稳定、信任、调停力' },
      metal: { color: '白色, 金色', numbers: '4, 9', direction: '西方', description: '决断力、正义感、品位' },
      water: { color: '黑色, 蓝色', numbers: '1, 6', direction: '北方', description: '智慧、情感、沟通、适应性' }
    }
  }
  
  const langInfo = infoByLanguage[language] || infoByLanguage.ko
  return langInfo[element] || langInfo.water
}

export const elementNames: Record<string, string> = {
  wood: '목(木)',
  fire: '화(火)',
  earth: '토(土)',
  metal: '금(金)',
  water: '수(水)'
}

export const elementColors: Record<string, string> = {
  wood: 'bg-green-500',
  fire: 'bg-red-500',
  earth: 'bg-yellow-500',
  metal: 'bg-gray-400',
  water: 'bg-blue-500'
}
