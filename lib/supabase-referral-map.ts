import { supabase } from '@/lib/supabase'

/** Upsert referral code → nickname (required for cross-device referrer +30P). */
export async function upsertReferralCodeMapping(
  referralCode: string,
  nickname: string
): Promise<void> {
  const code = referralCode.trim().toUpperCase()
  const nick = nickname.trim()
  if (!code || !nick) return

  try {
    const { data, error } = await supabase.from('referral_codes').upsert(
      { referral_code: code, nickname: nick, updated_at: new Date().toISOString() },
      { onConflict: 'referral_code' }
    )

    if (error) {
      console.warn('[referral_codes] upsert failed (optional)', error)
      return
    }

    console.log('[referral_codes] upsert success', data)
  } catch (err) {
    console.warn('[referral_codes] upsert error (optional)', err)
  }
}

/** Resolve referrer nickname from Supabase; null if table missing or code unknown. */
export async function fetchNicknameByReferralCode(
  referralCode: string
): Promise<string | null> {
  const code = referralCode.trim().toUpperCase()
  if (!code) return null

  try {
    const { data, error } = await supabase
      .from('referral_codes')
      .select('nickname')
      .eq('referral_code', code)
      .maybeSingle()

    if (error) {
      console.warn('[referral_codes] lookup failed (optional)', error)
      return null
    }

    const nick = data?.nickname?.trim()
    return nick || null
  } catch (err) {
    console.warn('[referral_codes] lookup error (optional)', err)
    return null
  }
}
