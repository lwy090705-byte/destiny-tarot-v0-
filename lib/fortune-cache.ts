import type { Language } from '@/lib/i18n'
import {
  fetchFortuneResultBySeedKey,
  readLocalFortuneResult,
  upsertFortuneResult,
} from '@/lib/supabase-fortune-results'

/** Read cache only — does not generate. */
export async function peekFortuneResult<T>(
  meta: Pick<FortuneCacheMeta, 'seedKey' | 'language'>
): Promise<T | null> {
  const { seedKey, language } = meta
  const fromDb = await fetchFortuneResultBySeedKey<T>(seedKey, language)
  if (fromDb !== null) return fromDb
  return readLocalFortuneResult<T>(seedKey, language)
}

export type FortuneCacheMeta = {
  seedKey: string
  userCode?: string | null
  profileId?: string | null
  fortuneType: string
  category?: string | null
  periodKey?: string | null
  language: Language
}

/**
 * Load cached fortune by seed_key (Supabase → localStorage), or generate and persist.
 */
export async function getOrCreateFortuneResult<T>(
  meta: FortuneCacheMeta,
  generate: () => T
): Promise<T> {
  const { seedKey, language } = meta

  const fromDb = await fetchFortuneResultBySeedKey<T>(seedKey, language)
  if (fromDb !== null) return fromDb

  const fromLocal = readLocalFortuneResult<T>(seedKey, language)
  if (fromLocal !== null) return fromLocal

  console.log('[fortune_results] miss — generating', seedKey)
  const data = generate()

  void upsertFortuneResult({
    seedKey,
    userCode: meta.userCode,
    profileId: meta.profileId,
    fortuneType: meta.fortuneType,
    category: meta.category,
    periodKey: meta.periodKey,
    language,
    data,
  })

  return data
}
