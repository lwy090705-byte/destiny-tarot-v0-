'use client'

import { useEffect, useState } from 'react'
import { usePiAuth } from '@/lib/pi-auth-context'

export type MasterAccessState = {
  /** Pi-verified operator (MASTER_PI_UIDS or profiles.pi_uid + is_master/role). */
  isMaster: boolean
  isLoading: boolean
  /** Nickname linked to the Pi uid in profiles (null if not linked). */
  linkedNickname: string | null
  authenticated: boolean
}

/**
 * Operator UI gate — does NOT trust localStorage nickname alone.
 * Waits for Pi session + /api/community/auth-context.
 */
export function useMasterAccess(): MasterAccessState {
  const { piUser, status } = usePiAuth()
  const [isMaster, setIsMaster] = useState(false)
  const [linkedNickname, setLinkedNickname] = useState<string | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    if (status === 'idle' || status === 'loading') {
      setIsLoading(true)
      return
    }

    if (status !== 'authenticated' || !piUser) {
      setIsMaster(false)
      setLinkedNickname(null)
      setAuthenticated(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    void (async () => {
      try {
        const res = await fetch('/api/community/auth-context', {
          credentials: 'include',
          cache: 'no-store',
        })
        const data = (await res.json()) as {
          authenticated?: boolean
          isOperator?: boolean
          linkedNickname?: string | null
        }
        if (cancelled) return
        setAuthenticated(data.authenticated === true)
        setIsMaster(data.isOperator === true)
        setLinkedNickname(
          data.linkedNickname != null ? String(data.linkedNickname) : null
        )
      } catch {
        if (cancelled) return
        setIsMaster(false)
        setLinkedNickname(null)
        setAuthenticated(false)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [status, piUser?.uid])

  return { isMaster, isLoading, linkedNickname, authenticated }
}
