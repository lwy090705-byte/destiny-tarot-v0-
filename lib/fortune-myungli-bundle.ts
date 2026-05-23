import type { Language } from '@/lib/i18n'
import { getOrCreateFortuneResult } from '@/lib/fortune-cache'
import {
  buildSajuSeedKey,
  formatYearPeriodKey,
  formatMonthPeriodKey,
  type FortuneProfileSeedInput,
} from '@/lib/fortune-seed'
import {
  generateLifetimeFortuneWithProfile,
  generateEnhancedFortuneWithProfile,
  generateEnhancedMonthlyFortunesWithProfile,
  type FortuneProfileContext,
} from '@/lib/fortune'
import type {
  FortuneCategory,
  FortuneResult,
  FortuneType,
  LifetimeFortune,
} from '@/lib/types'

export type MyungliFortuneBundle = {
  lifetime: LifetimeFortune | null
  results: FortuneResult[]
}

function toProfileContext(input: FortuneProfileSeedInput): FortuneProfileContext {
  return input
}

export async function loadMyungliFortuneBundle(params: {
  profile: FortuneProfileSeedInput
  fortuneType: FortuneType
  fortuneCategory: FortuneCategory
  language: Language
  userCode?: string | null
}): Promise<MyungliFortuneBundle> {
  const { profile, fortuneType, fortuneCategory, language, userCode } = params
  const ctx = toProfileContext(profile)
  const now = new Date()

  if (fortuneType === 'lifetime') {
    const seedKey = buildSajuSeedKey(profile, 'lifetime', {
      category: fortuneCategory,
      fortuneType: 'lifetime',
    })
    const lifetime = await getOrCreateFortuneResult(
      {
        seedKey,
        userCode,
        profileId: profile.profileId ?? null,
        fortuneType: 'lifetime',
        category: fortuneCategory,
        periodKey: 'lifetime',
        language,
      },
      () => generateLifetimeFortuneWithProfile(fortuneCategory, ctx, language)
    )
    return { lifetime, results: [] }
  }

  if (fortuneType === 'yearly') {
    const year = now.getFullYear()
    const seedKey = buildSajuSeedKey(profile, 'yearly', {
      year,
      category: fortuneCategory,
      fortuneType: 'yearly',
    })
    const results = await getOrCreateFortuneResult(
      {
        seedKey,
        userCode,
        profileId: profile.profileId ?? null,
        fortuneType: 'yearly',
        category: fortuneCategory,
        periodKey: formatYearPeriodKey(now),
        language,
      },
      () => [
        generateEnhancedFortuneWithProfile(
          'yearly',
          fortuneCategory,
          ctx,
          undefined,
          language
        ),
      ]
    )
    return { lifetime: null, results }
  }

  const seedKey = buildSajuSeedKey(profile, 'monthly', {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    category: fortuneCategory,
    fortuneType: 'monthly',
  })
  const results = await getOrCreateFortuneResult(
    {
      seedKey,
      userCode,
      profileId: profile.profileId ?? null,
      fortuneType: 'monthly',
      category: fortuneCategory,
      periodKey: formatMonthPeriodKey(now),
      language,
    },
    () =>
      generateEnhancedMonthlyFortunesWithProfile(fortuneCategory, ctx, language)
  )
  return { lifetime: null, results }
}
