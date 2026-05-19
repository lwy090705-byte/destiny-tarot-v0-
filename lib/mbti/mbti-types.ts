export type MBTIType =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP'

export type MbtiDimension = 'EI' | 'SN' | 'TF' | 'JP'

export interface MbtiQuestion {
  id: number
  text: string
  optionA: string
  optionB: string
  dimension: MbtiDimension
}

export interface MbtiTypeProfile {
  title: string
  description: string
  strengths: string[]
  weaknesses: string[]
  loveStyle: string
  career: string[]
}

export interface MbtiTypeDisplay extends MbtiTypeProfile {
  emoji: string
  color: string
  bestMatch: MBTIType[]
  goodMatch: MBTIType[]
}

export const MBTI_TYPES: MBTIType[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
]
