import type { Language } from '@/lib/i18n'
import { getOrCreateFortuneResult } from '@/lib/fortune-cache'
import { buildCompatibilitySeedKey } from '@/lib/fortune-seed'
import type { UserProfile } from '@/lib/types'

export type CompatibilityPerson = {
  profileId: string
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  gender?: 'male' | 'female'
  calendarType: 'solar' | 'lunar'
}

export type CompatibilityCachedResult = {
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

export async function loadCompatibilityResult(params: {
  personA: CompatibilityPerson
  personB: CompatibilityPerson
  language: Language
  userCode?: string | null
  generate: () => CompatibilityCachedResult
}): Promise<CompatibilityCachedResult> {
  const seedKey = buildCompatibilitySeedKey(
    {
      id: params.personA.profileId,
      birthYear: params.personA.birthYear,
      birthMonth: params.personA.birthMonth,
      birthDay: params.personA.birthDay,
      birthHour: params.personA.birthHour,
      gender: params.personA.gender,
    },
    {
      id: params.personB.profileId,
      birthYear: params.personB.birthYear,
      birthMonth: params.personB.birthMonth,
      birthDay: params.personB.birthDay,
      birthHour: params.personB.birthHour,
      gender: params.personB.gender,
    }
  )

  return getOrCreateFortuneResult(
    {
      seedKey,
      userCode: params.userCode,
      profileId: `${params.personA.profileId}+${params.personB.profileId}`,
      fortuneType: 'compatibility',
      category: null,
      periodKey: 'stable',
      language: params.language,
    },
    params.generate
  )
}

export function personInputToCompatPerson(
  input: {
    profileId?: string
    name: string
    birthYear: number
    birthMonth: number
    birthDay: number
    birthHour?: number
    gender?: 'male' | 'female'
    calendarType: 'solar' | 'lunar'
  },
  fallbackId: string
): CompatibilityPerson {
  return {
    profileId: input.profileId ?? fallbackId,
    name: input.name,
    birthYear: input.birthYear,
    birthMonth: input.birthMonth,
    birthDay: input.birthDay,
    birthHour: input.birthHour,
    gender: input.gender,
    calendarType: input.calendarType,
  }
}

export function profileToCompatPerson(profile: UserProfile): CompatibilityPerson {
  return {
    profileId: profile.id,
    name: profile.name,
    birthYear: profile.birthYear,
    birthMonth: profile.birthMonth,
    birthDay: profile.birthDay,
    birthHour: profile.birthHour,
    gender: profile.gender,
    calendarType: profile.calendarType,
  }
}
