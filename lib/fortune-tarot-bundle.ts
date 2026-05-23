import type { Language } from '@/lib/i18n'
import { getOrCreateFortuneResult } from '@/lib/fortune-cache'
import {
  buildTarotSeedKey,
  formatTodayKey,
  hashSeedKeyToNumber,
  type FortuneProfileSeedInput,
  type TarotPeriodKind,
} from '@/lib/fortune-seed'
import {
  generateTarotReading,
  tarotMessageIndex,
  getTarotMessage,
} from '@/lib/tarot'
import type { TarotReading } from '@/lib/types'

export type TarotCachedPayload = {
  reading: TarotReading
  cardInterpretations: { position: string; message: string }[]
}

export function resolveTarotPeriod(
  mode: 'one' | 'three',
  wishText?: string
): { periodKind: TarotPeriodKind; periodKey: string } {
  const now = new Date()
  if (wishText?.trim()) {
    return { periodKind: 'wish', periodKey: formatTodayKey(now) }
  }
  if (mode === 'three') {
    return { periodKind: 'daily', periodKey: formatTodayKey(now) }
  }
  return { periodKind: 'daily', periodKey: formatTodayKey(now) }
}

export async function loadTarotReading(params: {
  profile: FortuneProfileSeedInput
  tarotKind: string
  cardIds: number[]
  mode: 'one' | 'three'
  language: Language
  userCode?: string | null
  wishText?: string
  positionLabels?: string[]
}): Promise<TarotCachedPayload> {
  const { periodKind, periodKey } = resolveTarotPeriod(params.mode, params.wishText)
  const seedKey = buildTarotSeedKey({
    profileId: params.profile.profileId ?? 'anonymous',
    userCode: params.profile.userCode,
    nickname: params.profile.nickname,
    name: params.profile.name,
    birthYear: params.profile.birthYear,
    birthMonth: params.profile.birthMonth,
    birthDay: params.profile.birthDay,
    birthHour: params.profile.birthHour,
    gender: params.profile.gender,
    calendarType: params.profile.isLunar ? 'lunar' : 'solar',
    tarotKind: params.tarotKind,
    cardIds: params.cardIds,
    periodKind,
    periodKey,
    wishText: params.wishText,
  })

  return getOrCreateFortuneResult(
    {
      seedKey,
      userCode: params.userCode,
      profileId: params.profile.profileId ?? null,
      fortuneType: 'tarot',
      category: params.tarotKind,
      periodKey,
      language: params.language,
    },
    () => {
      const seedNumber = hashSeedKeyToNumber(seedKey)
      const reading = generateTarotReading(
        params.cardIds.map((id) => ({ id, nameKr: '' })),
        params.language,
        params.tarotKind,
        seedNumber
      )

      const cardInterpretations =
        params.mode === 'three'
          ? params.cardIds.map((cardId, idx) => {
              const msgIndex = tarotMessageIndex(
                cardId,
                idx,
                seedNumber
              )
              return {
                position: params.positionLabels?.[idx] ?? String(idx + 1),
                message: getTarotMessage(
                  params.language,
                  params.tarotKind,
                  msgIndex
                ),
              }
            })
          : []

      return { reading, cardInterpretations }
    }
  )
}
