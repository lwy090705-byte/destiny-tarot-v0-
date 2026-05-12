import type { TarotCard, TarotReading } from './types'
import type { Language } from './i18n'
import { getFortuneContentLanguage } from './fortune-generator'
import { getTarotParagraphPools, pickTarotParagraph } from './tarot-message-pools'

type TarotContentLang = 'ko' | 'en' | 'ja' | 'zh'

const MAJOR_EN: string[] = [
  'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot',
  'Strength', 'The Hermit', 'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower',
  'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World',
]

const MAJOR_JA: string[] = [
  '愚者', '魔術師', '女教皇', '女帝', '皇帝', '法王', '恋人', '戦車', '力', '隠者', '運命の輪', '正義', '吊るされた男', '死神', '節制',
  '悪魔', '塔', '星', '月', '太陽', '審判', '世界',
]

const MAJOR_ZH: string[] = [
  '愚者', '魔术师', '女祭司', '皇后', '皇帝', '教皇', '恋人', '战车', '力量', '隐士', '命运之轮', '正义', '倒吊人', '死神', '节制',
  '恶魔', '塔', '星星', '月亮', '太阳', '审判', '世界',
]

const MINOR_RANK_EN = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'] as const
const MINOR_RANK_JA = ['エース', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'ページ', 'ナイト', 'クイーン', 'キング'] as const
const MINOR_RANK_ZH = ['王牌', '二', '三', '四', '五', '六', '七', '八', '九', '十', '侍从', '骑士', '王后', '国王'] as const

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

function minorTarotName(cardId: number, lang: TarotContentLang): string {
  let base = 22
  let suitEn = 'Cups'
  let suitJa = 'カップ'
  let suitZh = '圣杯'
  if (cardId >= 64) {
    base = 64
    suitEn = 'Pentacles'
    suitJa = 'ペンタクル'
    suitZh = '星币'
  } else if (cardId >= 50) {
    base = 50
    suitEn = 'Wands'
    suitJa = 'ワンド'
    suitZh = '权杖'
  } else if (cardId >= 36) {
    base = 36
    suitEn = 'Swords'
    suitJa = 'ソード'
    suitZh = '宝剑'
  }
  const idx = cardId - base
  if (idx < 0 || idx >= MINOR_RANK_EN.length) return ''
  if (lang === 'en') return `${MINOR_RANK_EN[idx]} of ${suitEn}`
  if (lang === 'ja') return `${suitJa}の${MINOR_RANK_JA[idx]}`
  if (lang === 'zh') return `${suitZh}${MINOR_RANK_ZH[idx]}`
  return tarotCardsRecord[cardId]?.nameKr ?? ''
}

function localizeTarotCardName(cardId: number, lang: TarotContentLang): string {
  const card = tarotCardsRecord[cardId]
  if (!card) return ''
  if (lang === 'ko') return card.nameKr
  if (cardId >= 0 && cardId <= 21) {
    if (lang === 'en') return MAJOR_EN[cardId] ?? ''
    if (lang === 'ja') return MAJOR_JA[cardId] ?? ''
    if (lang === 'zh') return MAJOR_ZH[cardId] ?? ''
  }
  return minorTarotName(cardId, lang)
}

// Export as array for components that need to iterate
export const tarotCards = Object.entries(tarotCardsRecord).map(([id, card]) => {
  const cid = parseInt(id, 10)
  return {
    id: cid,
    nameKr: card.nameKr,
    nameEn: localizeTarotCardName(cid, 'en'),
    nameJp: localizeTarotCardName(cid, 'ja'),
    nameZh: localizeTarotCardName(cid, 'zh'),
    suit: card.suit,
  }
})

export function getCardName(cardId: number, language: Language): string {
  const L = getFortuneContentLanguage(language)
  const primary = localizeTarotCardName(cardId, L)
  if (primary.trim()) return primary
  const en = localizeTarotCardName(cardId, 'en')
  if (en.trim()) return en
  return localizeTarotCardName(cardId, 'ko')
}

export function getTarotMessage(language: Language, category: string, index: number): string {
  const pools = getTarotParagraphPools(category)
  return pickTarotParagraph(pools, language, index)
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
