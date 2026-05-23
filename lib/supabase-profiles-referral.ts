import { supabase } from '@/lib/supabase'
import { getReferrerByCode } from '@/lib/referral-registry'
import { fetchNicknameByReferralCode } from '@/lib/supabase-referral-map'

export type ReferrerIdentity = {
  nickname: string
  /** Key used in `points.nickname` */
  pointsKey: string
}

/** Save nickname ↔ referral code on profiles (and referral_codes fallback). */
export async function upsertProfileReferralMapping(
  nickname: string,
  referralCode: string
): Promise<void> {
  const nick = nickname.trim()
  const code = referralCode.trim().toUpperCase()
  if (!nick || !code) return

  try {
    const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update({ referral_code: code, user_code: code })
      .eq('nickname', nick)
      .select('nickname')

    if (!updateError && (updated?.length ?? 0) > 0) {
      console.log('[profiles] referral mapping update success', { nickname: nick, code })
      return
    }

    const { error: insertError } = await supabase.from('profiles').insert({
      nickname: nick,
      birthdate: null,
      gender: null,
      referral_code: code,
      user_code: code,
    })

    if (insertError) {
      console.warn('[profiles] referral mapping insert failed', insertError)
      return
    }

    console.log('[profiles] referral mapping insert success', { nickname: nick, code })
  } catch (err) {
    console.warn('[profiles] referral mapping error', err)
  }
}

/** Find referrer by `referrer_code` via profiles, then fallbacks. */
export async function fetchReferrerByReferralCode(
  referrerCode: string
): Promise<ReferrerIdentity | null> {
  const code = referrerCode.trim().toUpperCase()
  if (!code) return null

  const profileColumns = ['referral_code', 'user_code'] as const

  for (const column of profileColumns) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nickname, user_code, referral_code')
        .eq(column, code)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) {
        console.error('[profiles] referrer lookup failed', { column, error })
        continue
      }

      const row = data?.[0] as Record<string, unknown> | undefined
      const nickname = String(row?.nickname ?? '').trim()
      if (nickname) {
        console.log('[profiles] referrer found', { code, nickname, column })
        return { nickname, pointsKey: nickname }
      }
    } catch (err) {
      console.error('[profiles] referrer lookup error', { column, err })
    }
  }

  const fromMap = await fetchNicknameByReferralCode(code)
  if (fromMap) {
    return { nickname: fromMap, pointsKey: fromMap }
  }

  const local = getReferrerByCode(code)
  if (local?.nickname?.trim()) {
    return { nickname: local.nickname.trim(), pointsKey: local.nickname.trim() }
  }

  console.error('[referral] referrer not found', { referrer_code: code })
  return null
}
