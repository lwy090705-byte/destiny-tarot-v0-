import type { Language } from '@/lib/i18n'
import { getOrCreateFortuneResult } from '@/lib/fortune-cache'
import {
  buildSajuSeedKey,
  formatTodayKey,
  resolveProfileNumericSeed,
  type FortuneProfileSeedInput,
} from '@/lib/fortune-seed'
import { generateFortune } from '@/lib/fortune'
import { createPersonalization, getPersonalizationVariant } from '@/lib/myeongrihak'
import type { FortuneCategory, FortuneResult } from '@/lib/types'

const DAILY_CATEGORIES: FortuneCategory[] = ['total', 'wealth', 'love', 'health']

export async function loadDailyFortuneBundle(params: {
  profile: FortuneProfileSeedInput
  language: Language
  userCode?: string | null
}): Promise<FortuneResult[]> {
  const { profile, language, userCode } = params
  const dayKey = formatTodayKey()
  const seedKey = buildSajuSeedKey(profile, 'daily', {
    dayKey,
    category: 'total',
    fortuneType: 'daily',
  })

  return getOrCreateFortuneResult(
    {
      seedKey,
      userCode,
      profileId: profile.profileId ?? null,
      fortuneType: 'daily',
      category: 'bundle',
      periodKey: dayKey,
      language,
    },
    () => {
      const personalization = createPersonalization(
        profile.birthYear,
        profile.birthMonth,
        profile.birthDay,
        profile.birthHour,
        profile.gender
      )
      const variant = getPersonalizationVariant(personalization, 0, 8)

      return DAILY_CATEGORIES.map((category, index) => {
        const baseSeed = profile.profileId
          ? resolveProfileNumericSeed(profile, 'daily', { dayKey, category })
          : resolveProfileNumericSeed(profile, 'daily', { dayKey })
        const seed = baseSeed + index * 9973
        return generateFortune('daily', category, seed, language, variant)
      })
    }
  )
}
