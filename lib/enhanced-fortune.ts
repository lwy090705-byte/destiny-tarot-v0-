import type { Language } from './i18n'

export interface DetailedFortuneSection {
  title: string
  content: string[]
}

export interface EnhancedDailyFortune {
  date: string
  gender: string
  sections: {
    overallLuck: DetailedFortuneSection
    loveLuck: DetailedFortuneSection
    moneyLuck: DetailedFortuneSection
    workLuck: DetailedFortuneSection
    healthLuck: DetailedFortuneSection
    luckyAdvice: DetailedFortuneSection
  }
}

export interface EnhancedMonthlyFortune {
  month: string
  gender: string
  sections: {
    overallFlow: DetailedFortuneSection
    careerOpportunities: DetailedFortuneSection
    wealthTrend: DetailedFortuneSection
    relationshipFlow: DetailedFortuneSection
    emotionalBalance: DetailedFortuneSection
    monthlyAdvice: DetailedFortuneSection
  }
}

// 오행 및 성별 기반 개인화 운세 생성
function generatePersonalizedSeed(birthYear: number, birthMonth: number, birthDay: number, gender: string | undefined, date: string): number {
  const dateNum = parseInt(date.replace(/-/g, ''))
  const birthNum = birthYear * 10000 + birthMonth * 100 + birthDay
  const genderNum = gender === 'female' ? 1000 : 2000
  return (dateNum + birthNum + genderNum) % 100000
}

// 시드 기반 의사 난수
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// 아래에 풍부한 운세 텍스트 패턴들을 정의합니다
const dailyFortunePatterns = {
  overallLuck: {
    positive: [
      ['오늘은 새로운 기회와 가능성이 열리는 날입니다.', '긍정적인 에너지가 당신을 감싸고 있으며, 주변 사람들과의 상호작용이 매우 좋습니다.', '하는 일이 잘 풀릴 가능성이 높으니 자신감 있게 행동하세요.', '예상치 못한 좋은 소식이 들려올 수 있습니다.', '이 기운을 활용하여 계획해온 일들을 추진하기 좋은 시간입니다.'],
      ['안정적이고 조화로운 에너지로 가득한 하루가 될 것 같습니다.', '주변 환경과의 관계가 원만하고 협력이 잘 이루어질 것입니다.', '작은 성공들이 쌓여 큰 만족감을 느끼는 날이 될 것 같습니다.', '무언가를 시작하거나 결정을 내리기에 좋은 타이밍입니다.', '오늘의 긍정적인 에너지를 다른 사람들과 나누면 더욱 좋을 것 같습니다.'],
      ['활동적이고 생동감 있는 기운이 지배하는 날입니다.', '에너지 수준이 높아 하고 싶던 일들을 진행하기에 좋습니다.', '새로운 시도와 도전에 유리한 날씨와 기운을 가지고 있습니다.', '사람들과의 만남이 긍정적인 결과로 이어질 가능성이 높습니다.', '오늘은 결정력 있게 행동하면 원하는 결과를 얻을 수 있습니다.'],
    ],
    neutral: [
      ['평온하고 차분한 기운의 하루가 될 것입니다.', '특별한 일은 없을 수 있지만 안정적인 흐름을 유지할 것 같습니다.', '이 시간을 자신을 돌보고 충전하는 시간으로 활용하면 좋습니다.', '주변 상황을 관찰하고 신중하게 판단하는 태도가 도움이 될 것입니다.', '서두르지 않고 현재에 충실하면 자연스럽게 좋은 결과로 이어질 것 같습니다.'],
    ],
    challenging: [
      ['오늘은 신중함과 인내심이 필요한 날입니다.', '예상과 다른 상황이 발생할 수 있으니 유연한 대응이 필요합니다.', '작은 불편함이나 장애물이 있을 수 있지만 이를 극복할 충분한 능력이 있습니다.', '차분하고 침착한 태도로 문제에 접근하면 해결할 수 있습니다.', '이 날을 통해 배우는 것들이 앞으로 큰 도움이 될 것입니다.'],
    ],
  },
  loveLuck: {
    positive: [
      ['애정운이 매우 좋은 날입니다.', '현재 인연이 있는 분과의 관계가 더욱 돈독해질 가능성이 높습니다.', '따뜻한 말 한마디가 큰 힘이 되는 날이므로 마음을 표현해보세요.', '싱글이라면 좋은 인연을 만날 기회가 찾아올 수 있습니다.', '사랑하는 사람과 함께하는 시간이 더욱 의미 있을 것입니다.'],
    ],
    neutral: [
      ['애정 관계가 안정적으로 흐르는 날입니다.', '특별한 변화는 없을 수 있지만 현재의 관계를 소중히 여기면 좋습니다.', '대화와 이해를 통해 더욱 깊은 유대감을 만들 수 있습니다.', '서로의 감정을 충분히 살피는 시간을 가져보세요.', '작은 배려와 관심이 큰 행복으로 이어질 수 있습니다.'],
    ],
  },
  moneyLuck: {
    positive: [
      ['재물운이 좋은 날입니다.', '예상 외의 수입이 들어올 가능성이 있습니다.', '금전 관련 결정을 하기에 좋은 타이밍입니다.', '투자나 새로운 사업 기회가 나타날 수 있습니다.', '현명한 판단으로 작은 수익을 모아 큰 성과를 만들 수 있습니다.'],
    ],
    neutral: [
      ['재물 상태가 안정적으로 유지될 것 같습니다.', '지출을 적절히 조절하면서 저축을 계속해보세요.', '재정 계획을 점검하고 정리하기 좋은 날입니다.', '무리한 지출은 피하고 신중한 소비를 심의하세요.', '작은 절약들이 모여 큰 자산을 만들 수 있습니다.'],
    ],
  },
  workLuck: {
    positive: [
      ['업무운이 좋은 날입니다.', '하는 일이 잘 진행되고 동료들과의 협력도 원만할 것입니다.', '창의적인 아이디어가 떠오르고 이를 실행하기 좋은 시간입니다.', '상사나 선배로부터 좋은 평가를 받을 가능성이 높습니다.', '중요한 회의나 프로젝트 발표하기에 적절한 날씨와 기운입니다.'],
    ],
    neutral: [
      ['업무가 일정하게 진행될 것 같습니다.', '예상된 일정대로 진행하면 무난할 것입니다.', '동료들과의 소통을 충분히 하면서 협력하세요.', '작은 실수도 있을 수 있으니 주의 깊게 일을 처리하세요.', '현재의 페이스를 유지하면 좋은 결과를 얻을 것입니다.'],
    ],
  },
  healthLuck: {
    positive: [
      ['건강운이 매우 좋은 날입니다.', '신체와 정신 모두 활기가 넘칠 것 같습니다.', '운동이나 건강한 활동을 하기 적절한 날입니다.', '피로가 쌓여있다면 이 기운을 활용해 회복해보세요.', '건강한 습관들이 더욱 즐겁고 쉽게 느껴질 것입니다.'],
    ],
    neutral: [
      ['건강 상태가 안정적으로 유지될 것 같습니다.', '평소의 건강 관리 습관을 계속 유지하세요.', '특별히 피해야 할 것은 없으니 일상을 살펴봅시다.', '규칙적인 생활 패턴이 건강을 유지하는 열쇠입니다.', '가벼운 스트레칭이나 휴식도 도움이 될 것입니다.'],
    ],
  },
  luckyAdvice: {
    '양성': ['오늘의 긍정적인 에너지를 충분히 활용하세요', '주변 사람들에게 당신의 좋은 에너지를 나누면 더욱 좋을 것입니다', '이 기운 속에서 새로운 시도나 결정을 내리기 좋습니다', '감사함과 겸손함을 잊지 않으면 더욱 좋은 날이 될 것입니다'],
    '중립': ['차분한 마음으로 현재에 집중하세요', '특별히 서두를 필요는 없습니다', '작은 것들에 감사하는 마음을 가져보세요', '자신의 내면 목소리에 귀 기울여 보는 시간을 가지세요'],
    '도전': ['어려움을 통해 배우려는 자세를 가지세요', '침착함과 인내심이 상황을 극복하는 열쇠입니다', '주변의 도움을 청하고 함께 헤쳐나가세요', '이 경험이 당신을 더욱 강하게 만들 것입니다'],
  },
}

// 월별 운세 패턴
const monthlyFortunePatterns = {
  overallFlow: [
    '새로운 시작의 기운이 강한 달입니다. 계획했던 일들을 실행하기에 좋은 시간이며, 긍정적인 태도가 큰 도움이 될 것입니다. 이 달의 기운을 잘 활용하면 향후 몇 개월간 좋은 결과로 이어질 가능성이 높습니다. 새로운 프로젝트나 목표에 도전해보세요.',
    '성장과 발전의 기운으로 가득한 달입니다. 자신의 능력과 잠재력을 드러낼 좋은 기회들이 찾아올 것입니다. 주변의 지지와 협력을 받으며 한 단계 도약할 수 있는 시기입니다. 이 기운을 활용하여 자신을 계발하고 발전시켜보세요.',
    '안정과 조화의 기운이 흐르는 달입니다. 지금까지의 노력이 안정적으로 자리잡을 시간이며, 주변 관계도 원만해질 것입니다. 무리하지 않고 현재의 상태를 충실히 유지하면 자연스럽게 좋은 결과로 이어질 것입니다. 감사함을 잊지 않으면 더욱 좋을 것입니다.',
  ],
  careerOpportunities: [
    '직업 운이 좋은 달입니다. 새로운 프로젝트나 기회가 나타날 가능성이 높으며, 창의력과 실행력이 인정받을 시간입니다. 동료들과의 협력이 좋은 성과로 이어질 것이므로 팀워크를 중시하세요. 중요한 결정이나 제안을 하기에 적절한 시기입니다.',
    '사업 운이 우호적인 달입니다. 새로운 시작이나 확장을 고려 중이라면 이 기운을 활용해보세요. 파트너나 투자자와의 협상이 잘 진행될 가능성이 있습니다. 신중한 판단과 적극적인 행동이 동시에 필요한 시기입니다.',
    '직업 안정성이 높아질 기운입니다. 현재의 위치를 강화하고 신뢰를 쌓을 좋은 기회입니다. 작은 성과들이 누적되어 큰 신용으로 이어질 것입니다. 꾸준함과 성실함이 인정받는 달이 될 것입니다.',
  ],
  wealthTrend: [
    '재물 운이 상승하는 달입니다. 예상치 못한 수입이 들어올 가능성이 있으며, 투자나 재정 결정을 하기에 좋은 타이밍입니다. 현명한 판단으로 작은 수익들을 모아 큰 자산을 만들 수 있는 기회입니다. 장기적인 재정 계획을 세우기 적절한 시기입니다.',
    '재정 상태가 안정적으로 유지될 기운입니다. 지출을 조절하고 저축을 계속하면 든든한 기반을 만들 수 있습니다. 큰 지출은 신중하게 판단하고, 작은 절약들을 모아보세요. 재정 계획을 정리하고 목표를 수정하기 좋은 시간입니다.',
    '재물 운이 평탄하게 흐르는 달입니다. 현재의 상태를 유지하면서 새로운 수익원을 찾아보는 것도 좋습니다. 신중한 관리와 계획적인 소비가 중요합니다. 장기적 관점에서 자산을 관리해보세요.',
  ],
  relationshipFlow: [
    '인간관계 운이 좋은 달입니다. 새로운 인연을 만날 기회가 많을 것이며, 기존 관계도 더욱 돈독해질 것입니다. 따뜻한 말과 진심 어린 관심이 큰 힘이 되는 시기입니다. 주변 사람들과 소통하고 나누는 활동을 많이 하면 더욱 좋을 것입니다.',
    '대인 관계가 안정적으로 흐르는 달입니다. 신뢰와 이해를 바탕으로 한 관계가 형성될 것입니다. 갈등이 있다면 차분한 대화로 해결할 수 있을 것입니다. 주변 사람들에게 베푸는 마음이 좋은 결과로 돌아올 것입니다.',
    '인간관계가 평온하게 유지될 기운입니다. 현재의 관계를 소중히 하면서 새로운 만남도 열어보세요. 무리하지 않고 자연스러운 관계 형성을 추구하세요. 듣고 이해하는 태도가 관계를 더욱 깊게 만들 것입니다.',
  ],
  emotionalBalance: [
    '정서 운이 좋은 달입니다. 마음이 평온하고 긍정적인 감정이 넘칠 것입니다. 스트레스나 불안감도 자연스럽게 해소될 가능성이 높습니다. 이 긍정적인 기운을 일상의 활력으로 변환시켜보세요. 창의적인 활동이나 취미 생활을 더욱 즐길 수 있는 시기입니다.',
    '정서 상태가 안정적으로 유지될 기운입니다. 변화 속에서도 중심을 잡을 수 있는 내적 힘이 있습니다. 자신의 감정을 충분히 표현하고 주변의 지지를 받으세요. 명상이나 정적인 활동을 통해 자신과 대화하는 시간을 가져보세요.',
    '감정의 기복이 있을 수 있는 달입니다. 차분한 마음가짐과 충분한 휴식이 도움이 될 것입니다. 자신의 감정을 이해하고 수용하는 태도가 중요합니다. 신뢰할 수 있는 사람들과 충분히 소통하세요.',
  ],
  monthlyAdvice: [
    '이 달의 좋은 기운을 충분히 활용하세요. 계획했던 일들을 주도적으로 진행하고, 새로운 시도를 두려워하지 마세요. 주변 사람들과 협력하고 감사하는 마음을 잊지 않으면 모든 일이 잘 풀릴 것입니다. 이 긍정적인 기운이 다음 달까지 이어질 수 있도록 현명하게 행동하세요.',
    '현재의 기회를 놓치지 마세요. 신중한 판단과 적극적인 행동이 함께 필요합니다. 작은 성공들을 소중히 여기면서 큰 목표를 향해 나아가세요. 당신의 능력을 믿고 자신감 있게 행동하면 원하는 결과를 얻을 수 있습니다.',
    '현재의 흐름에 함께하면서 내면을 가꿔보세요. 외적 성취도 중요하지만 정서적 안정과 성장도 중요합니다. 자신을 돌보는 시간을 충분히 가지세요. 이 달의 차분한 기운 속에서 내적 강함을 기르면 좋을 것입니다.',
  ],
}

export function generateEnhancedDailyFortune(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  gender: string | undefined,
  date: string
): EnhancedDailyFortune {
  const seed = generatePersonalizedSeed(birthYear, birthMonth, birthDay, gender, date)
  const random = seededRandom(seed)

  // 운세 등급 결정 (긍정/중립/도전)
  const fortuneLevel = random() > 0.65 ? 'positive' : random() > 0.35 ? 'neutral' : 'challenging'

  return {
    date,
    gender: gender || 'unknown',
    sections: {
      overallLuck: {
        title: '총체적 운세',
        content: dailyFortunePatterns.overallLuck[fortuneLevel][Math.floor(random() * dailyFortunePatterns.overallLuck[fortuneLevel].length)],
      },
      loveLuck: {
        title: '애정운',
        content: dailyFortunePatterns.loveLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel][Math.floor(random() * (dailyFortunePatterns.loveLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel]?.length || 1))],
      },
      moneyLuck: {
        title: '재물운',
        content: dailyFortunePatterns.moneyLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel][Math.floor(random() * (dailyFortunePatterns.moneyLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel]?.length || 1))],
      },
      workLuck: {
        title: '사업/일자리운',
        content: dailyFortunePatterns.workLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel][Math.floor(random() * (dailyFortunePatterns.workLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel]?.length || 1))],
      },
      healthLuck: {
        title: '건강운',
        content: dailyFortunePatterns.healthLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel][Math.floor(random() * (dailyFortunePatterns.healthLuck[fortuneLevel === 'challenging' ? 'neutral' : fortuneLevel]?.length || 1))],
      },
      luckyAdvice: {
        title: '운세 조언',
        content: [
          dailyFortunePatterns.luckyAdvice[fortuneLevel === 'positive' ? '양성' : fortuneLevel === 'neutral' ? '중립' : '도전'][Math.floor(random() * 4)],
          '오늘 하루를 의미 있게 보내세요.',
          '작은 기쁨과 감사함을 찾아보세요.',
          '긍정적인 마음가짐이 모든 것을 바꿉니다.',
        ],
      },
    },
  }
}

export function generateEnhancedMonthlyFortune(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  gender: string | undefined,
  month: string
): EnhancedMonthlyFortune {
  const seed = generatePersonalizedSeed(birthYear, birthMonth, birthDay, gender, month)
  const random = seededRandom(seed)

  const fortuneLevel = random() > 0.65 ? 'positive' : random() > 0.35 ? 'neutral' : 'challenging'
  const levelIndex = Math.floor(random() * 3)

  return {
    month,
    gender: gender || 'unknown',
    sections: {
      overallFlow: {
        title: '이달의 전체 운세',
        content: [monthlyFortunePatterns.overallFlow[levelIndex]],
      },
      careerOpportunities: {
        title: '직업/사업 기회',
        content: [monthlyFortunePatterns.careerOpportunities[levelIndex]],
      },
      wealthTrend: {
        title: '재물 운세',
        content: [monthlyFortunePatterns.wealthTrend[levelIndex]],
      },
      relationshipFlow: {
        title: '인간관계 운세',
        content: [monthlyFortunePatterns.relationshipFlow[levelIndex]],
      },
      emotionalBalance: {
        title: '정서/감정 운세',
        content: [monthlyFortunePatterns.emotionalBalance[levelIndex]],
      },
      monthlyAdvice: {
        title: '이달의 조언',
        content: [monthlyFortunePatterns.monthlyAdvice[levelIndex]],
      },
    },
  }
}
