export interface UserProfile {
  id: string
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  calendarType: 'solar' | 'lunar'
  gender?: 'male' | 'female'
}

export type Category = 'myungli' | 'daily' | 'tarot' | 'compatibility' | 'mbti'

export type FortuneType = 'lifetime' | 'yearly' | 'monthly' | 'daily'

export type FortuneCategory = 'total' | 'wealth' | 'business' | 'love' | 'relationships' | 'health'

export interface SajuPillar {
  heavenlyStem: string
  earthlyBranch: string
  combined: string
}

export interface SajuResult {
  yearPillar: SajuPillar
  monthPillar: SajuPillar
  dayPillar: SajuPillar
  hourPillar: SajuPillar
  fiveElements: FiveElementsAnalysis
}

export interface FiveElementsAnalysis {
  wood: number
  fire: number
  earth: number
  metal: number
  water: number
  dominant: 'wood' | 'fire' | 'earth' | 'metal' | 'water'
}

export interface TarotCard {
  nameKr: string
  suit: string
}

export interface TarotReading {
  cards: { id: number; name: string }[]
  message: string
  timestamp: string
}

export interface FortuneResult {
  type: FortuneType
  category: FortuneCategory
  month?: number
  score: number
  description: string
  luckyColor: string
  /** Display value — may be a single digit or a pair string like "1, 7". */
  luckyNumber: string | number
}

export interface LifetimeFortune {
  category: FortuneCategory
  early: {
    title: string
    description: string
    score: number
  }
  mid: {
    title: string
    description: string
    score: number
  }
  late: {
    title: string
    description: string
    score: number
  }
}
