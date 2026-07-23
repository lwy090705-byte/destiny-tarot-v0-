'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/lib/user-context'
import { isMasterNickname } from '@/lib/master-role'
import {
  ensureMasterProfileFields,
  fetchProfileMasterFields,
  resolveMasterAccess,
} from '@/lib/supabase-profile-master'

export type MasterAccessState = {
  /** 대질주 + profiles master flags (or optional Pi operator via auth-context). */
  isMaster: boolean
  isLoading: boolean
  linkedNickname: string | null
  authenticated: boolean
}

/**
 * Operator UI: nickname === '대질주' and DB role/is_master (via resolveMasterAccess).
 * No separate admin password / Pi session required for 대질주.
 */
export function useMasterAccess(): MasterAccessState {
  const { user, isHydrated } = useUser()
  const [isMaster, setIsMaster] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    if (!isHydrated) {
      setIsLoading(true)
      return
    }

    const nick = user?.nickname?.trim() ?? ''
    if (!nick) {
      setIsMaster(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    void (async () => {
      try {
        if (isMasterNickname(nick)) {
          await ensureMasterProfileFields(nick)
          const granted = await resolveMasterAccess(nick)
          if (cancelled) return
          // Prefer strict DB flags when fetch succeeds
          const { ok, profile } = await fetchProfileMasterFields(nick)
          if (cancelled) return
          if (
            ok &&
            profile &&
            profile.is_master === true &&
            String(profile.role ?? '').toLowerCase() === 'master'
          ) {
            setIsMaster(true)
            return
          }
          setIsMaster(granted)
          return
        }

        // Non-대질주: optional Pi operator via auth-context
        try {
          const { piAuthFetch } = await import('@/lib/pi-session-client')
          const res = await piAuthFetch(
            `/api/community/auth-context?nickname=${encodeURIComponent(nick)}`,
            { cache: 'no-store' }
          )
          const data = (await res.json()) as { isOperator?: boolean }
          if (cancelled) return
          setIsMaster(data.isOperator === true)
        } catch {
          if (!cancelled) setIsMaster(false)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isHydrated, user?.nickname])

  return {
    isMaster,
    isLoading,
    linkedNickname: isMaster && isMasterNickname(user?.nickname) ? '대질주' : null,
    authenticated: isMaster,
  }
}
