import { supabase } from '@/lib/supabase'
import type { Language } from '@/lib/i18n'

export type StoredFortunePayload<T> = {
  language: Language
  data: T
}

const LOCAL_PREFIX = 'fortune-result-cache:'

function localCacheKey(seedKey: string): string {
  return `${LOCAL_PREFIX}${seedKey}`
}

export function readLocalFortuneResult<T>(
  seedKey: string,
  language: Language
): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(localCacheKey(seedKey))
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredFortunePayload<T>
    if (parsed.language !== language) return null
    console.log('[fortune_results] hit localStorage', seedKey)
    return parsed.data
  } catch (e) {
    console.error('[fortune_results] localStorage read failed', seedKey, e)
    return null
  }
}

export function writeLocalFortuneResult<T>(
  seedKey: string,
  language: Language,
  data: T
): void {
  if (typeof window === 'undefined') return
  try {
    const payload: StoredFortunePayload<T> = { language, data }
    localStorage.setItem(localCacheKey(seedKey), JSON.stringify(payload))
    console.log('[fortune_results] saved localStorage', seedKey)
  } catch (e) {
    console.error('[fortune_results] localStorage write failed', seedKey, e)
  }
}

export async function fetchFortuneResultBySeedKey<T>(
  seedKey: string,
  language: Language
): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('fortune_results')
      .select('result')
      .eq('seed_key', seedKey)
      .maybeSingle()

    if (error) {
      console.error('[fortune_results] fetch failed', seedKey, error.message)
      return null
    }
    if (!data?.result) return null

    const payload = data.result as StoredFortunePayload<T>
    if (!payload || payload.language !== language) {
      console.log('[fortune_results] cache language mismatch', seedKey)
      return null
    }

    console.log('[fortune_results] hit supabase', seedKey)
    return payload.data
  } catch (e) {
    console.error('[fortune_results] fetch exception', seedKey, e)
    return null
  }
}

export async function upsertFortuneResult<T>(params: {
  seedKey: string
  userCode?: string | null
  profileId?: string | null
  fortuneType: string
  category?: string | null
  periodKey?: string | null
  language: Language
  data: T
}): Promise<void> {
  const payload: StoredFortunePayload<T> = {
    language: params.language,
    data: params.data,
  }

  writeLocalFortuneResult(params.seedKey, params.language, params.data)

  try {
    const { error } = await supabase.from('fortune_results').upsert(
      {
        seed_key: params.seedKey,
        user_code: params.userCode ?? null,
        profile_id: params.profileId ?? null,
        fortune_type: params.fortuneType,
        category: params.category ?? null,
        period_key: params.periodKey ?? null,
        result: payload,
      },
      { onConflict: 'seed_key' }
    )

    if (error) {
      console.error('[fortune_results] upsert failed', params.seedKey, error.message)
      return
    }
    console.log('[fortune_results] saved supabase', params.seedKey)
  } catch (e) {
    console.error('[fortune_results] upsert exception', params.seedKey, e)
  }
}
