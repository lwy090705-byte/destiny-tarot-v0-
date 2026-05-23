'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@/lib/user-context'
import { recordDailyVisit } from '@/lib/supabase-visit-logs'

/** Records at most one visit_logs row per user per calendar day. */
export function VisitLogTracker() {
  const { user, isHydrated } = useUser()
  const recordedRef = useRef(false)

  useEffect(() => {
    if (!isHydrated || recordedRef.current) return

    const nickname = user?.nickname?.trim() ?? ''
    const user_code = user?.referralCode?.trim() ?? ''

    if (!nickname && !user_code) return

    recordedRef.current = true
    void recordDailyVisit({ nickname, user_code })
  }, [isHydrated, user?.nickname, user?.referralCode])

  return null
}
