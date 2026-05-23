import { supabase } from '@/lib/supabase'
import { countReferralsByReferrerCode } from '@/lib/supabase-referrals'

export type PointInsert = {
  nickname: string
  point_type: string
  amount: number
  description: string | null
}

/** Sum of all `amount` rows for a nickname (source of truth for balance). */
export async function fetchPointsTotalByNickname(nickname: string): Promise<number> {
  const nick = nickname.trim()
  if (!nick) return 0

  try {
    const { data, error } = await supabase.from('points').select('amount').eq('nickname', nick)

    if (error) {
      console.error('[points] sum failed', error)
      return 0
    }

    const total = (data ?? []).reduce((sum, row) => sum + (Number(row.amount) || 0), 0)
    console.log('[points] fetch success', { nickname: nick, total })
    return total
  } catch (err) {
    console.error('[points] fetch error', err)
    return 0
  }
}

/** True if this nickname already received the one-time referral input bonus. */
export async function refereeBonusAlreadyPaid(nickname: string): Promise<boolean> {
  const nick = nickname.trim()
  if (!nick) return false

  try {
    const { data, error } = await supabase
      .from('points')
      .select('id')
      .eq('nickname', nick)
      .eq('point_type', 'referral_bonus')
      .limit(1)

    if (error) {
      console.error('[points] referee bonus check failed', error)
      return false
    }
    return (data?.length ?? 0) > 0
  } catch (err) {
    console.error('[points] referee bonus check error', err)
    return false
  }
}

/** True if referrer +30P already issued for all completed referrals (per pair). */
export async function referrerRewardAlreadyPaid(
  referrerNickname: string,
  referrerCode: string,
  _referredCode: string
): Promise<boolean> {
  const nick = referrerNickname.trim()
  const code = referrerCode.trim().toUpperCase()
  if (!nick || !code) return false

  try {
    const referralCount = await countReferralsByReferrerCode(code)
    if (referralCount === 0) return false

    const { count, error } = await supabase
      .from('points')
      .select('*', { count: 'exact', head: true })
      .eq('nickname', nick)
      .eq('point_type', 'referral_reward')

    if (error) {
      console.error('[points] referrer reward check failed', error)
      return false
    }
    return (count ?? 0) >= referralCount
  } catch (err) {
    console.error('[points] referrer reward check error', err)
    return false
  }
}

/** Inserts a points ledger row. Never throws. */
export async function insertPointTransaction(row: PointInsert): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('points').insert({
      nickname: row.nickname.trim(),
      point_type: row.point_type,
      amount: row.amount,
      description: row.description,
    })

    if (error) {
      console.error('[points] insert failed', error)
      return false
    }

    console.log('[points] insert success', data)
    return true
  } catch (err) {
    console.error('[points] insert error', err)
    return false
  }
}
