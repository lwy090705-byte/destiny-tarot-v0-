'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@/lib/user-context'
import {
  getOrCreateAnonymousVisitorId,
  recordDailyVisit,
} from '@/lib/supabase-visit-logs'

/**
 * Records at most one visit_logs row per visitor identity per KST calendar day.
 * Identity: referral code → else anonymous visitor id in localStorage → nickname.
 * Runs in Chrome and Pi Browser (localStorage + insert).
 */
export function VisitLogTracker() {
  const { user, isHydrated } = useUser()
  const recordedRef = useRef(false)

  useEffect(() => {
    if (!isHydrated || recordedRef.current) return

    const nickname = user?.nickname?.trim() ?? ''
    const referral = user?.referralCode?.trim() ?? ''
    const user_code = referral || getOrCreateAnonymousVisitorId()

    if (!nickname && !user_code) return

    recordedRef.current = true
    void recordDailyVisit({ nickname, user_code })
  }, [isHydrated, user?.nickname, user?.referralCode])

  return null
}
