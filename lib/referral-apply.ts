import { grantCompletedAchievementRewards } from '@/lib/achievement-rewards'
import {
  REFEREE_BONUS_DESCRIPTION,
  REFEREE_REWARD_POINTS,
  REFERRER_REWARD_DESCRIPTION,
  REFERRER_REWARD_POINTS,
} from '@/lib/referral-constants'
import { registerReferralUser } from '@/lib/referral-registry'
import { fetchReferrerByReferralCode } from '@/lib/supabase-profiles-referral'
import {
  insertPointTransaction,
  refereeBonusAlreadyPaid,
  referrerRewardAlreadyPaid,
} from '@/lib/supabase-points'
import {
  countReferralsByReferrerCode,
  insertReferralRecord,
} from '@/lib/supabase-referrals'
import { createDefaultProgress } from '@/lib/user-progress'

export type ReferralApplyParams = {
  referrerCode: string
  referredCode: string
  refereeNickname: string
}

export type ReferralApplyResult = {
  referralInserted: boolean
  refereeBonusPaid: boolean
  referrerRewardPaid: boolean
  referrerFound: boolean
}

/** Insert referrals row + both point rewards + referrer achievement grants. */
export async function executeReferralApplication(
  params: ReferralApplyParams
): Promise<ReferralApplyResult> {
  const referrerCode = params.referrerCode.trim().toUpperCase()
  const referredCode = params.referredCode.trim().toUpperCase()
  const refereeNickname = params.refereeNickname.trim()

  const result: ReferralApplyResult = {
    referralInserted: false,
    refereeBonusPaid: false,
    referrerRewardPaid: false,
    referrerFound: false,
  }

  const referrer = await fetchReferrerByReferralCode(referrerCode)
  if (!referrer) {
    return result
  }
  result.referrerFound = true

  const referralInserted = await insertReferralRecord({
    referrer_code: referrerCode,
    referred_code: referredCode,
    reward_points: REFERRER_REWARD_POINTS,
    status: 'completed',
  })
  result.referralInserted = referralInserted

  if (!referralInserted) {
    console.error('[referral] relationship save failed', { referrerCode, referredCode })
    return result
  }

  console.log('[referral] relationship save success', { referrerCode, referredCode })

  if (refereeNickname) {
    const alreadyReferee = await refereeBonusAlreadyPaid(refereeNickname)
    if (!alreadyReferee) {
      const refereeOk = await insertPointTransaction({
        nickname: refereeNickname,
        point_type: 'referral_bonus',
        amount: REFEREE_REWARD_POINTS,
        description: REFEREE_BONUS_DESCRIPTION,
      })
      result.refereeBonusPaid = refereeOk
      if (refereeOk) {
        console.log('[referral] referee +10P success', { nickname: refereeNickname })
      } else {
        console.error('[referral] referee +10P failed', { nickname: refereeNickname })
      }
    } else {
      console.log('[referral] referee +10P skipped (already paid)', { nickname: refereeNickname })
    }
  }

  const alreadyReferrer = await referrerRewardAlreadyPaid(
    referrer.pointsKey,
    referrerCode,
    referredCode
  )
  if (!alreadyReferrer) {
    const referrerOk = await insertPointTransaction({
      nickname: referrer.pointsKey,
      point_type: 'referral_reward',
      amount: REFERRER_REWARD_POINTS,
      description: REFERRER_REWARD_DESCRIPTION,
    })
    result.referrerRewardPaid = referrerOk
    if (referrerOk) {
      console.log('[referral] referrer +30P success', {
        nickname: referrer.pointsKey,
        referrer_code: referrerCode,
      })
    } else {
      console.error('[referral] referrer +30P failed', {
        nickname: referrer.pointsKey,
        referrer_code: referrerCode,
      })
    }
  } else {
    console.log('[referral] referrer +30P skipped (already paid)', {
      nickname: referrer.pointsKey,
      referredCode,
    })
  }

  const referrerCount = await countReferralsByReferrerCode(referrerCode)
  registerReferralUser(referrerCode, referrer.pointsKey, referrerCount)

  try {
    const refereeClaimed = await grantCompletedAchievementRewards({
      referralCode: referredCode,
      nickname: refereeNickname,
      referralCount: 0,
      progress: createDefaultProgress(),
    })
    if (refereeClaimed.length > 0) {
      console.log('[achievement] referee reward granted', refereeClaimed)
    }

    const referrerClaimed = await grantCompletedAchievementRewards({
      referralCode: referrerCode,
      nickname: referrer.pointsKey,
      referralCount: referrerCount,
      progress: createDefaultProgress(),
    })
    if (referrerClaimed.length > 0) {
      console.log('[achievement] referrer reward granted', referrerClaimed)
    }
  } catch (err) {
    console.error('[achievement] reward grant failed', err)
  }

  return result
}
