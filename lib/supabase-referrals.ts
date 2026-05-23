import { supabase } from '@/lib/supabase'

export type ReferralInsert = {
  referrer_code: string
  referred_code: string
  reward_points: number
  status: string
}

/** Count successful referrals for a referrer code. */
export async function countReferralsByReferrerCode(referrerCode: string): Promise<number> {
  const code = referrerCode.trim().toUpperCase()
  if (!code) return 0
  try {
    const { count, error } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_code', code)

    if (error) {
      console.error('[referrals] count failed', error)
      return 0
    }
    return count ?? 0
  } catch (err) {
    console.error('[referrals] count error', err)
    return 0
  }
}

/** True if this referred_code already used this referrer_code. */
export async function referralPairExists(
  referrerCode: string,
  referredCode: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('id')
      .eq('referrer_code', referrerCode.trim().toUpperCase())
      .eq('referred_code', referredCode.trim().toUpperCase())
      .maybeSingle()

    if (error) {
      console.error('[referrals] duplicate check failed', error)
      return false
    }
    return data != null
  } catch (err) {
    console.error('[referrals] duplicate check error', err)
    return false
  }
}

/** Inserts a referral record. Never throws. */
export async function insertReferralRecord(row: ReferralInsert): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('referrals').insert({
      referrer_code: row.referrer_code.trim().toUpperCase(),
      referred_code: row.referred_code.trim().toUpperCase(),
      reward_points: row.reward_points,
      status: row.status,
    })

    if (error) {
      console.error('[referrals] insert failed', error)
      return false
    }

    console.log('[referrals] relationship save success', data)
    return true
  } catch (err) {
    console.error('[referrals] relationship save error', err)
    return false
  }
}
