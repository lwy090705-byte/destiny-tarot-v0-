import type { TarotCard, TarotReading } from './types'
import type { Language } from './i18n'
import { getPersonalizationVariant } from './myeongrihak'

// Tarot cards basic info as Record
const tarotCardsRecord: Record<number, TarotCard> = {
  0: { nameKr: '광대', suit: 'Major' },
  1: { nameKr: '마술사', suit: 'Major' },
  2: { nameKr: '여사제', suit: 'Major' },
  3: { nameKr: '여황제', suit: 'Major' },
  4: { nameKr: '황제', suit: 'Major' },
  5: { nameKr: '교황', suit: 'Major' },
  6: { nameKr: '연인들', suit: 'Major' },
  7: { nameKr: '전차', suit: 'Major' },
  8: { nameKr: '힘', suit: 'Major' },
  9: { nameKr: '은둔자', suit: 'Major' },
  10: { nameKr: '운명의 수레바퀴', suit: 'Major' },
  11: { nameKr: '정의', suit: 'Major' },
  12: { nameKr: '교수', suit: 'Major' },
  13: { nameKr: '죽음', suit: 'Major' },
  14: { nameKr: '절제', suit: 'Major' },
  15: { nameKr: '악마', suit: 'Major' },
  16: { nameKr: '탑', suit: 'Major' },
  17: { nameKr: '별', suit: 'Major' },
  18: { nameKr: '달', suit: 'Major' },
  19: { nameKr: '태양', suit: 'Major' },
  20: { nameKr: '심판', suit: 'Major' },
  21: { nameKr: '세계', suit: 'Major' },
  22: { nameKr: '컵 에이스', suit: 'Cups' },
  23: { nameKr: '컵 2', suit: 'Cups' },
  24: { nameKr: '컵 3', suit: 'Cups' },
  25: { nameKr: '컵 4', suit: 'Cups' },
  26: { nameKr: '컵 5', suit: 'Cups' },
  27: { nameKr: '컵 6', suit: 'Cups' },
  28: { nameKr: '컵 7', suit: 'Cups' },
  29: { nameKr: '컵 8', suit: 'Cups' },
  30: { nameKr: '컵 9', suit: 'Cups' },
  31: { nameKr: '컵 10', suit: 'Cups' },
  32: { nameKr: '컵 시종', suit: 'Cups' },
  33: { nameKr: '컵 기사', suit: 'Cups' },
  34: { nameKr: '컵 여왕', suit: 'Cups' },
  35: { nameKr: '컵 왕', suit: 'Cups' },
  36: { nameKr: '소드 에이스', suit: 'Swords' },
  37: { nameKr: '소드 2', suit: 'Swords' },
  38: { nameKr: '소드 3', suit: 'Swords' },
  39: { nameKr: '소드 4', suit: 'Swords' },
  40: { nameKr: '소드 5', suit: 'Swords' },
  41: { nameKr: '소드 6', suit: 'Swords' },
  42: { nameKr: '소드 7', suit: 'Swords' },
  43: { nameKr: '소드 8', suit: 'Swords' },
  44: { nameKr: '소드 9', suit: 'Swords' },
  45: { nameKr: '소드 10', suit: 'Swords' },
  46: { nameKr: '소드 시종', suit: 'Swords' },
  47: { nameKr: '소드 기사', suit: 'Swords' },
  48: { nameKr: '소드 여왕', suit: 'Swords' },
  49: { nameKr: '소드 왕', suit: 'Swords' },
  50: { nameKr: '막대 에이스', suit: 'Wands' },
  51: { nameKr: '막대 2', suit: 'Wands' },
  52: { nameKr: '막대 3', suit: 'Wands' },
  53: { nameKr: '막대 4', suit: 'Wands' },
  54: { nameKr: '막대 5', suit: 'Wands' },
  55: { nameKr: '막대 6', suit: 'Wands' },
  56: { nameKr: '막대 7', suit: 'Wands' },
  57: { nameKr: '막대 8', suit: 'Wands' },
  58: { nameKr: '막대 9', suit: 'Wands' },
  59: { nameKr: '막대 10', suit: 'Wands' },
  60: { nameKr: '막대 시종', suit: 'Wands' },
  61: { nameKr: '막대 기사', suit: 'Wands' },
  62: { nameKr: '막대 여왕', suit: 'Wands' },
  63: { nameKr: '막대 왕', suit: 'Wands' },
  64: { nameKr: '펜타클 에이스', suit: 'Pentacles' },
  65: { nameKr: '펜타클 2', suit: 'Pentacles' },
  66: { nameKr: '펜타클 3', suit: 'Pentacles' },
  67: { nameKr: '펜타클 4', suit: 'Pentacles' },
  68: { nameKr: '펜타클 5', suit: 'Pentacles' },
  69: { nameKr: '펜타클 6', suit: 'Pentacles' },
  70: { nameKr: '펜타클 7', suit: 'Pentacles' },
  71: { nameKr: '펜타클 8', suit: 'Pentacles' },
  72: { nameKr: '펜타클 9', suit: 'Pentacles' },
  73: { nameKr: '펜타클 10', suit: 'Pentacles' },
  74: { nameKr: '펜타클 시종', suit: 'Pentacles' },
  75: { nameKr: '펜타클 기사', suit: 'Pentacles' },
  76: { nameKr: '펜타클 여왕', suit: 'Pentacles' },
  77: { nameKr: '펜타클 왕', suit: 'Pentacles' },
}

// Export as array for components that need to iterate
export const tarotCards = Object.entries(tarotCardsRecord).map(([id, card]) => ({
  id: parseInt(id),
  nameKr: card.nameKr,
  nameEn: card.nameKr, // Fallback to Korean since we removed other languages
  nameJp: card.nameKr,
  nameZh: card.nameKr,
  suit: card.suit,
}))

type CardNameI18n = Record<number, Record<Language, string>>

const cardNamesI18n: CardNameI18n = {
  0: { ko: '광대' },
  1: { ko: '마술사' },
  2: { ko: '여사제' },
  3: { ko: '여황제' },
  4: { ko: '황제' },
  5: { ko: '교황' },
  6: { ko: '연인들' },
  7: { ko: '전차' },
  8: { ko: '힘' },
  9: { ko: '은둔자' },
  10: { ko: '운명의 수레바퀴' },
  11: { ko: '정의' },
  12: { ko: '교수' },
  13: { ko: '죽음' },
  14: { ko: '절제' },
  15: { ko: '악마' },
  16: { ko: '탑' },
  17: { ko: '별' },
  18: { ko: '달' },
  19: { ko: '태양' },
  20: { ko: '심판' },
  21: { ko: '세계' },
  22: { ko: '컵 에이스' },
  23: { ko: '컵 2' },
  24: { ko: '컵 3' },
  25: { ko: '컵 4' },
  26: { ko: '컵 5' },
  27: { ko: '컵 6' },
  28: { ko: '컵 7' },
  29: { ko: '컵 8' },
  30: { ko: '컵 9' },
  31: { ko: '컵 10' },
  32: { ko: '컵 시종' },
  33: { ko: '컵 기사' },
  34: { ko: '컵 여왕' },
  35: { ko: '컵 왕' },
  36: { ko: '소드 에이스' },
  37: { ko: '소드 2' },
  38: { ko: '소드 3' },
  39: { ko: '소드 4' },
  40: { ko: '소드 5' },
  41: { ko: '소드 6' },
  42: { ko: '소드 7' },
  43: { ko: '소드 8' },
  44: { ko: '소드 9' },
  45: { ko: '소드 10' },
  46: { ko: '소드 시종' },
  47: { ko: '소드 기사' },
  48: { ko: '소드 여왕' },
  49: { ko: '소드 왕' },
  50: { ko: '막대 에이스' },
  51: { ko: '막대 2' },
  52: { ko: '막대 3' },
  53: { ko: '막대 4' },
  54: { ko: '막대 5' },
  55: { ko: '막대 6' },
  56: { ko: '막대 7' },
  57: { ko: '막대 8' },
  58: { ko: '막대 9' },
  59: { ko: '막대 10' },
  60: { ko: '막대 시종' },
  61: { ko: '막대 기사' },
  62: { ko: '막대 여왕' },
  63: { ko: '막대 왕' },
  64: { ko: '펜타클 에이스' },
  65: { ko: '펜타클 2' },
  66: { ko: '펜타클 3' },
  67: { ko: '펜타클 4' },
  68: { ko: '펜타클 5' },
  69: { ko: '펜타클 6' },
  70: { ko: '펜타클 7' },
  71: { ko: '펜타클 8' },
  72: { ko: '펜타클 9' },
  73: { ko: '펜타클 10' },
  74: { ko: '펜타클 시종' },
  75: { ko: '펜타클 기사' },
  76: { ko: '펜타클 여왕' },
  77: { ko: '펜타클 왕' },
}

export function getCardName(cardId: number, language: Language): string {
  return cardNamesI18n[cardId]?.[language] ?? tarotCardsRecord[cardId]?.nameKr ?? ''
}

type LangMessages = Record<Language, string[]>

const totalMessages: LangMessages = {
  ko: [
    '지금은 당신의 직관이 그 어느 때보다 예민한 시기입니다. 다가오는 중요한 결정에서 머리보다 마음의 소리에 귀 기울이세요. 당신 안에 이미 답이 있습니다. 외부의 조언도 좋지만, 최종 결정은 당신의 내면에서 나와야 합니다.',
    '새로운 기회의 문이 활짝 열리고 있습니다. 지금까지의 노력이 결실을 맺을 때가 다가오고 있으니, 두려워하지 말고 그 문을 향해 한 발짝 내딛으세요. 변화는 때로 두렵지만, 그 안에 당신이 원하던 것이 숨어 있습니다.',
    '현재 겪고 있는 어려움은 일시적인 것입니다. 어둠이 깊을수록 새벽은 가까이 있다는 것을 기억하세요. 이 시간을 버티고 나면 더 강해진 자신을 발견하게 될 것입니다. 지금 가장 필요한 것은 인내와 자기 신뢰입니다.',
    '꾸준히 쌓아온 당신의 노력이 드디어 빛을 발할 때가 왔���니다. 주변에서 당신의 진가를 알아보는 사람들이 나타날 것이며, 예상치 못한 곳에서 인정을 받게 될 것입니다. 자만하지 말고 겸손한 자세를 유지하세요.',
    '인간관계가 당신 인생의 핵심 열쇠가 되는 시기입니다. 가족, 친구, 동료와의 관계를 돌아보고 소홀했던 부분이 있다면 다시 연결하세요. 진정한 풍요로움은 물질이 아닌 사람과의 유대에서 옵니다.',
    '내면의 목소리가 당신에게 중요한 메시지를 전하고 있습니다. 바쁜 일상에서 잠시 멈추어 명상이나 산책을 통해 자신과 대화하는 시간을 가지세요. 그 속에서 오랫동안 찾던 해답을 발견하게 될 것입니다.',
    '변화가 두렵게 느껴질 수 있지만, 지금 일어나고 있는 변화는 당신을 위한 것입니다. 익숙한 것을 놓아버리고 새로운 것을 받아들일 준비를 하세요. 이 변화의 끝에는 더 나은 당신이 기다리고 있습니다.',
    '지금은 서두르지 말고 신중하게 준비하는 시기입니다. 큰 계획이 있다면 세부적인 것까지 꼼꼼히 점검하세요. 철저한 준비가 성공의 90%를 결정합니다. 기다림도 하나의 실력입니다.',
  ],
}

const wealthMessages: LangMessages = {
  ko: [
    '재정적으로 중요한 분기점에 서 있습니다. 지출을 관리하면서도 가치 있는 투자에는 과감해지세요. 너무 보수적이면 기회를 놓치고, 너무 공격적이면 위험에 노출됩니다. 균형 잡힌 재정 전략이 필요한 때입니다.',
    '예상치 못한 곳에서 재정적 기회가 찾아올 수 있습니다. 평소 관심 있던 분야나 인맥을 통해 좋은 소식이 올 수 있으니, 열린 마음으로 새로운 ���안을 검토해보세요. 단, 충분한 검토 없이 서두르지 마세요.',
    '장기적인 관점에서 재정을 바라볼 시기입니다. 당장의 이익보다는 미래를 위한 저축과 투자에 집중하세요. 지금 심는 씨앗이 몇 년 후 큰 나무가 될 것입니다. 복리의 힘을 믿으세요.',
    '부업이나 새로운 수입원을 진지하게 고려해볼 만한 시기입니다. 당신의 취미나 특기가 수익으로 연결될 가능성이 있습니다. 작은 시작이 큰 변화를 만들 수 있으니, 첫 걸음을 내딛어 보세요.',
    '재물운이 상승하는 시기입니다. 하지만 돈이 들어온다고 해서 무분별하게 사용하지 마세요. 들어오는 만큼 관리하는 것이 중요합니다. 재정 관리 앱이나 가계부를 활용해 수입과 지출을 체계적으로 관리하세요.',
    '금전적인 결정을 내리기 전에 충분히 조사하고 전문가의 조언을 구하세요. 지금은 감정보다 이성적인 판단이 필요한 시기입니다. 서류의 작은 글씨까지 꼼꼼히 읽고, 계약 조건을 명확히 이해하세요.',
    '절약과 지출 사이에서 균형을 찾아야 합니다. 지나친 절약은 삶의 질을 떨어뜨리고, 과도한 지출은 미래의 안정을 해칩니다. 필요와 욕구를 구분하고, 현명한 소비를 실천하세요.',
    '지금 하고 있는 일에 최선을 다하세요. 성실함이 재정적 보상으로 돌아올 것입니다. 승진이나 보너스의 기회가 다가오고 있으며, 당신의 노력을 인정받게 될 것입니다.',
  ],
}

const luckMessages: LangMessages = {
  ko: [
    '당신의 긍정적인 에너지가 행운을 끌어당기고 있습니다. 좋은 일이 생기면 주변과 나누세요. 나눔은 행운을 더욱 증폭시킵니다. 작은 친절이 예상치 못한 큰 행운으로 돌아올 수 있습니다.',
    '우연한 만남이나 대화가 인생의 전환점이 될 수 있습니다. 새로운 사람들에게 마음을 열고, 평소 가지 않던 장소도 방문해 보세요. 운명적인 인연이 당신을 기다리고 있을 수 있습니다.',
    '오늘 하루는 특별히 행운이 당신 편입니다. 평소 미루던 일이나 새로운 시도를 해보기에 좋은 날입니다. 행운은 준비된 자에게 찾아오니, 기회가 오면 바로 잡으세요.',
    '작은 행운들이 쌓여 큰 기쁨을 만들어갈 것입니다. 일상의 소소한 행복에 감사하는 마음을 가지세요. 감사하는 마음은 더 많은 행운을 불러옵니다. 행운 일기를 써보는 것도 좋습니다.',
    '당신 주변에 행운을 가져다 주는 사람이 있습니다. 그 사람과의 관계를 더욱 ���중히 여기세요. 함께하는 시간이 서로에게 좋은 에너지를 가져다 줄 것입니다.',
    '예상치 못한 좋은 소식이 곧 찾아올 것입니다. 전화나 메시지에 주의를 기울이세요. 오랫동안 연락이 없던 사람으로부터 반가운 소식이 올 수 있습니다.',
    '행운의 기운이 당신을 감싸고 있는 시기입니다. 이 시기에 복권을 사거나 중요한 결정을 내리는 것이 좋을 수 있습니다. 단, 무모한 도박은 금물입니다.',
    '당신의 행운 번호와 행운 색상에 주목하세요. 이들이 일상에서 자주 나타난다면 좋은 징조입니다. ���요한 날에 행운의 색상을 착용하면 더 좋은 결과를 얻을 수 있습니다.',
  ],
}

const cautionMessages: LangMessages = {
  ko: [
    '충동적인 결정은 나중에 후회를 불러옵니다. 중요한 선택을 앞두고 있다면 최소 24시간의 생각 시간을 가지세요. 급하게 결정해야 한다고 압박받더라도, 당신의 페이스를 유지하는 것이 중요합니다.',
    '건강에 더욱 신경 쓸 시기입니다. 무리한 스케줄이나 과도한 업무로 몸에 무리가 가지 않도록 하세요. 작은 증상도 무시하지 말고, 정기 검진을 받아보는 것이 좋습니다. 건강이 가장 큰 재산입니다.',
    '말 한마디가 관계를 바꿀 수 있는 민감한 시기입니다. 화가 나더라도 바로 말하지 말고, 감정이 가라앉은 후에 대화하세요. 오해는 쉽게 생기지만 풀기는 어렵습니다. 경청하는 자세가 중요합니다.',
    '스트레스 관리에 특별히 주의가 필요합니다. 운동, 명상, 취미 활동 등을 통해 스트레스를 해소하는 시간을 반드시 가지세요. 번아웃은 갑자기 찾아오니, 미리 예방하는 것이 중요합니다.',
    '중요한 서류나 계약은 여러 번 꼼꼼히 읽으세요. 작은 조항 하나가 큰 문제가 될 수 있습니다. 이해되지 않는 부분은 반드시 질문하고, 필요하다면 전문가의 도움을 받으세요.',
    '주변의 말에 너무 흔들리지 마세요. 많은 조언 속에서 혼란스러울 수 있지만, 최종 결정은 당신이 내려야 합니다. 당신의 상황을 가장 잘 아는 것은 당신 자신입니다.',
    '서두르면 일을 그르칩니다. 빨리 끝내고 싶은 마음이 앞서도, 과정을 충실히 하세요. 조급함에서 비롯된 실수는 더 큰 시간 낭비를 초래합니다. 천천히 하되 확실하게 하세요.',
    '감정에 휩쓸려 결정을 내리지 마세요. 특히 분노나 슬픔이 클 때는 중요한 결정을 미루세요. 감정이 평온해진 후에 같은 상황을 다시 바라보면 다른 답이 보일 수 있습니다.',
  ],
}

const loveMessages: LangMessages = {
  ko: [
    '감정 표현이 조심스러워 보입니다. 당신의 진심이 상대방에게 닿지 않을까봐 두렵지 마세요. 용기 내어 마음을 전해보세요. 진정한 감정은 반드시 누군가의 마음에 닿게 됩니다.',
    '연애에서는 지나친 기대와 집착이 독이 될 수 있습니다. 상대방을 그대로 받아들이고, 서로 성장할 수 있는 관계를 만들어가세요. 완벽한 사람보다는 함께 성장하는 사람이 더 소중합니다.',
    '새로운 만남의 기운이 감지됩니다. 평소 가지 않던 장소에 가보거나, 새로운 활동을 시작하면 뜻밖의 인연이 찾아올 수 있습니다. 열린 마음으로 주변을 살펴보세요.',
    '기존의 관계가 새로운 단계로 나아갈 시기입니다. 더 깊은 이해와 소통을 통해 관계를 업그레이드하세요. 지금이 중요한 대화를 나눌 좋은 타이밍입니다.',
    '혼자만의 시간이 당신의 감정을 정��하는 데 도움이 될 것입니다. 사랑하는 방법을 다시 배우고, 자신을 사랑하는 것부터 시작하세요. 자기 사랑이 가장 아름다운 사랑입니다.',
    '어려운 시기를 맞이한 연애 관계도 있습니다. 하지만 위기는 관계를 더욱 단단하게 만들 기회입니다. 솔직한 대화와 노력이 있다면 더 강한 유대를 만들 수 있습니다.',
    '당신의 매력이 빛나는 시기입니다. 자신감을 가지고 당신 그대로를 드러내세요. 진정한 매력은 외모가 아닌 태도와 에너지에서 나옵니다.',
    '사랑은 아름다운 일이기도 하고 어려운 일이기도 합니다. 기쁨과 슬픔 모두 사랑의 일부입니다. 지금 느끼는 감정이 어떤 것이든 소중하게 받아들이고 시간을 가지세요.',
  ],
}

const careerMessages: LangMessages = {
  ko: [
    '새로운 프로젝트나 기회가 당신의 앞에 나타나고 있습니다. 두려워하지 말고 도전해보세요. 당신의 능력은 생각보다 훨씬 크며, 이 기회는 당신을 위해 준비된 것입니다.',
    '현재의 직업이나 업무에서 일시적인 정체기를 느낄 수 있습니다. 하지만 이 시간도 당신을 성장시키고 있습니다. 기초를 다지면서 다음 단계를 준비하세요.',
    '팀 내에서의 협력이 중요한 시기입니다. 혼자하려는 마음을 내려놓고 주변과 소통하세요. 함께 하는 것이 더 큰 성과를 만들어낼 것입니다.',
    '당신의 노력이 인정받을 시기가 다가오고 있습니다. 승진이나 새로운 역할의 기회가 올 수 있으니, 항상 준비된 상태를 유지하세요. 기회는 준비된 자에게만 찾아옵니다.',
    '일에서의 스트레스가 누적되고 있을 수 있습니다. 잠시 멈추어 자신을 돌볼 시간을 가지세요. 건강한 일과 삶의 균형이 더 나은 성과를 만듭니다.',
    '새로운 기술이나 지식을 배울 좋은 시기입니다. 자기 계발에 투자하면 미래의 경쟁력이 됩니다. 배움의 여정을 즐기세요.',
    '업무에 대한 당신의 열정이 주변에 영감을 주고 있습니다. 이 에너지를 유지하되, 과도하지 않도록 주의하세요. 지속 가능한 열정이 진정한 성공을 만듭니다.',
    '현재의 업무를 되돌아보고 개선할 점을 찾아보세요. 작은 변화가 큰 효율성을 가져올 수 있습니다. 당신의 경험과 노하우를 더 잘 활용할 차례입니다.',
  ],
}

const healthMessages: LangMessages = {
  ko: [
    '신체 건강도 중요하지만, 정신 건강이 더욱 중요한 시기입니다. 명상, 요가, 또는 심리 상담 등을 통해 마음을 돌봐보세요. 건강한 마음이 건강한 몸을 만듭니다.',
    '생활 습관을 되돌아볼 시기입니다. 충분한 수면, 규칙적인 운동, 균형 잡힌 식단이 당신의 건강을 지탱합니다. 작은 습관의 변화가 큰 건강 변화를 만듭니다.',
    '만성적인 피로를 느끼고 있다면, 전문가의 도움을 받아보세요. 건강 검진을 통해 몸 상태를 정확히 파악하는 것이 중요합니다. 예방이 치료보다 낫습니다.',
    '운동과 활동이 당신의 건강을 회복시킬 것입니다. 무거운 운동이 아니어도 좋습니다. 산책, 스트레칭, 춤 등 즐거운 움직임으로 시작하세요.',
    '정서적 스트레스가 신체 증상으로 나타날 수 있습니다. 마음을 편안하게 하기 위해 좋아하는 일을 하거나 누군가와 대화하세요. 감정 해소가 곧 건강 개선입니다.',
    '건강이 회복되고 있습니다. 현재의 좋은 상태를 유지하기 위해 계속해서 건강한 생활 습관을 지키세요. 꾸준함이 당신의 최고의 건강 비결입니다.',
    '식생활 개선이 건강 개선의 시작입니다. 가공식품을 줄이고 자연 식품을 더하세요. 입으로 들어가는 것이 곧 당신의 건강입니다.',
    '휴식과 활동의 균형을 찾으세요. 너무 많은 활동도, 너무 적은 활동도 건강에 좋지 않습니다. 당신의 몸과 마음이 원하는 리듬을 찾아가세요.',
  ],
}

function getMessagesByCategory(category: string): LangMessages {
  switch (category) {
    case 'wealth':
      return wealthMessages
    case 'love':
      return loveMessages
    case 'career':
      return careerMessages
    case 'health':
      return healthMessages
    default:
      return totalMessages
  }
}

export function getTarotMessage(language: Language, category: string, index: number): string {
  const messages = getMessagesByCategory(category)
  const langMessages = messages[language]
  return langMessages[index % langMessages.length]
}

export function generateTarotReading(
  selectedCards: { id: number; nameKr: string }[],
  language: Language,
  category: string = 'total'
): TarotReading {
  const cards = selectedCards.map((card) => ({
    id: card.id,
    name: getCardName(card.id, language),
  }))
  
  // 카드 조합에 따른 다양한 메시지 생성
  const cardSum = selectedCards.reduce((acc, card) => acc + card.id, 0)
  const messageIndex = cardSum % 8

  return {
    cards,
    message: getTarotMessage(language, category, messageIndex),
    timestamp: new Date().toISOString(),
  }
}
