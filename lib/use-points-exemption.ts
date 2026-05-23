'use client'

import { useEffect, useState } from 'react'
import { usePoints } from '@/lib/points-context'
import { useUser } from '@/lib/user-context'
import {
  isMasterNickname,
  MASTER_ROLE,
  OPERATOR_ROLE,
} from '@/lib/master-role'
import { fetchProfileMasterFields } from '@/lib/supabase-profile-master'

/**
 * 포인트 검사/차감 면제: 대질주 닉네임 또는 profiles master/operator 플래그.
 */
export function usePointsExemption(): boolean {
  const { isUnlimitedPoints } = usePoints()
  const { user, isHydrated } = useUser()
  const [profileExempt, setProfileExempt] = useState(false)

  const nickname = user?.nickname?.trim() ?? ''

  useEffect(() => {
    if (!isHydrated) {
      setProfileExempt(false)
      return
    }

    if (isMasterNickname(nickname)) {
      setProfileExempt(true)
      return
    }

    if (!nickname) {
      setProfileExempt(false)
      return
    }

    let cancelled = false
    void fetchProfileMasterFields(nickname).then(({ profile }) => {
      if (cancelled) return
      const exempt =
        profile?.is_master === true ||
        profile?.role === MASTER_ROLE ||
        profile?.role === OPERATOR_ROLE
      setProfileExempt(exempt)
    })

    return () => {
      cancelled = true
    }
  }, [isHydrated, nickname])

  return isUnlimitedPoints || profileExempt
}
