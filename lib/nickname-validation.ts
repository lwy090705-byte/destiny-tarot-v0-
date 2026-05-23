import { supabase } from '@/lib/supabase'

export const NICKNAME_MIN_LENGTH = 2
export const NICKNAME_MAX_LENGTH = 10

export type NicknameValidationError = 'empty' | 'too_short' | 'too_long' | 'duplicate'

/** i18n keys for UI (use with `t()`). */
export const NICKNAME_ERROR_I18N_KEYS: Record<NicknameValidationError, string> = {
  empty: 'nickname.error.empty',
  too_short: 'nickname.error.tooShort',
  too_long: 'nickname.error.tooLong',
  duplicate: 'nickname.error.duplicate',
}

export type NicknameValidationResult =
  | { ok: true; nickname: string }
  | { ok: false; error: NicknameValidationError }

/** Length check on trim() result. */
export function validateNicknameLength(raw: string): NicknameValidationResult {
  const nickname = raw.trim()
  if (!nickname) {
    return { ok: false, error: 'empty' }
  }
  if (nickname.length < NICKNAME_MIN_LENGTH) {
    return { ok: false, error: 'too_short' }
  }
  if (nickname.length > NICKNAME_MAX_LENGTH) {
    return { ok: false, error: 'too_long' }
  }
  return { ok: true, nickname }
}

function escapeIlikeExact(value: string): string {
  return value.replace(/[%_\\]/g, '\\$&')
}

/**
 * Case-insensitive duplicate check via profiles.nickname (ilike).
 * `excludeNickname`: allow re-saving the same user's current nickname.
 * Returns false when Supabase is unreachable or RLS denies read — creation must not be blocked.
 */
export async function isNicknameTakenInProfiles(
  nickname: string,
  options?: { excludeNickname?: string }
): Promise<boolean> {
  const trimmed = nickname.trim()
  if (!trimmed) return false

  const excludeNorm = options?.excludeNickname?.trim().toLowerCase() ?? ''
  const targetNorm = trimmed.toLowerCase()

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('nickname')
      .ilike('nickname', escapeIlikeExact(trimmed))

    if (error) {
      console.error('[nickname] duplicate check failed', error)
      return false
    }

    const rows = (data ?? []) as { nickname?: string }[]
    const conflicting = rows.filter((row) => {
      const rowNorm = String(row.nickname ?? '').trim().toLowerCase()
      if (!rowNorm || rowNorm !== targetNorm) return false
      if (excludeNorm && rowNorm === excludeNorm) return false
      return true
    })

    return conflicting.length > 0
  } catch (err) {
    console.error('[nickname] duplicate check error', err)
    return false
  }
}

export async function validateNicknameForSave(
  raw: string,
  options?: { excludeNickname?: string }
): Promise<NicknameValidationResult> {
  const lengthResult = validateNicknameLength(raw)
  if (!lengthResult.ok) {
    console.error('[nickname] validation failed', lengthResult.error)
    return lengthResult
  }

  const taken = await isNicknameTakenInProfiles(lengthResult.nickname, options)
  if (taken) {
    console.error('[nickname] validation failed', 'duplicate')
    return { ok: false, error: 'duplicate' }
  }

  return lengthResult
}
