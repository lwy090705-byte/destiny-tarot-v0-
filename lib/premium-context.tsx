'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useUser } from '@/lib/user-context'
import {
  buildPremiumAccessState,
  EMPTY_PREMIUM_ACCESS,
  type PremiumAccessState,
} from '@/lib/premium-access'
import {
  fetchAndSyncProfilePremium,
  type PremiumActivationResult,
} from '@/lib/supabase-premium'
import type { PlanId } from '@/lib/premium-plans'

const PREMIUM_CACHE_KEY = 'fortune-premium-status'

type PremiumCachePayload = {
  nickname: string
  state: PremiumAccessState
  savedAt: string
}

type PremiumContextValue = {
  premium: PremiumAccessState
  isLoading: boolean
  isHydrated: boolean
  refreshPremium: () => Promise<PremiumAccessState>
  activatePlan: (planId: PlanId) => Promise<PremiumActivationResult>
}

const PremiumContext = createContext<PremiumContextValue | undefined>(undefined)

function readPremiumCache(nickname: string): PremiumAccessState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(PREMIUM_CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PremiumCachePayload
    if (parsed.nickname.toLowerCase() !== nickname.toLowerCase()) return null
    return buildPremiumAccessState({
      premium_active: parsed.state.premium_active,
      premium_type: parsed.state.premium_type,
      premium_started_at: parsed.state.premium_started_at,
      premium_expires_at: parsed.state.premium_expires_at,
    })
  } catch {
    return null
  }
}

function writePremiumCache(nickname: string, state: PremiumAccessState): void {
  if (typeof window === 'undefined') return
  try {
    const payload: PremiumCachePayload = {
      nickname,
      state,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(PREMIUM_CACHE_KEY, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

function clearPremiumCache(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(PREMIUM_CACHE_KEY)
  } catch {
    /* ignore */
  }
}

export function PremiumProvider({ children }: { children: ReactNode }) {
  const { user, isHydrated: userHydrated } = useUser()
  const nickname = user?.nickname?.trim() ?? ''
  const [premium, setPremium] = useState<PremiumAccessState>(EMPTY_PREMIUM_ACCESS)
  const [isLoading, setIsLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const nicknameRef = useRef(nickname)

  nicknameRef.current = nickname

  const applyState = useCallback((state: PremiumAccessState) => {
    setPremium(state)
    const nick = nicknameRef.current
    if (nick && state.isActive) {
      writePremiumCache(nick, state)
    } else if (!state.isActive) {
      clearPremiumCache()
    }
    return state
  }, [])

  const refreshPremium = useCallback(async (): Promise<PremiumAccessState> => {
    const nick = nicknameRef.current
    if (!nick) {
      const empty = { ...EMPTY_PREMIUM_ACCESS }
      setPremium(empty)
      clearPremiumCache()
      return empty
    }

    setIsLoading(true)
    try {
      const { ok, state } = await fetchAndSyncProfilePremium(nick)
      if (!ok) {
        const cached = readPremiumCache(nick)
        if (cached) return applyState(cached)
        return applyState({ ...EMPTY_PREMIUM_ACCESS })
      }
      return applyState(state)
    } finally {
      setIsLoading(false)
      setIsHydrated(true)
    }
  }, [applyState])

  const activatePlan = useCallback(
    async (planId: PlanId): Promise<PremiumActivationResult> => {
      const nick = nicknameRef.current
      if (!nick) {
        return { ok: false, state: null, payload: null }
      }

      const { activatePremiumSubscription } = await import('@/lib/supabase-premium')
      const result = await activatePremiumSubscription({
        nickname: nick,
        planId,
        existingExpiresAt: premium.premium_expires_at,
      })

      if (result.ok && result.state) {
        applyState(result.state)
      } else {
        await refreshPremium()
      }

      return result
    },
    [premium.premium_expires_at, applyState, refreshPremium]
  )

  useEffect(() => {
    if (!userHydrated) return

    if (!nickname) {
      setPremium({ ...EMPTY_PREMIUM_ACCESS })
      clearPremiumCache()
      setIsHydrated(true)
      return
    }

    const cached = readPremiumCache(nickname)
    if (cached) {
      setPremium(cached)
      setIsHydrated(true)
    }

    void refreshPremium()
  }, [userHydrated, nickname, refreshPremium])

  useEffect(() => {
    if (!isHydrated || !premium.isActive || !premium.premium_expires_at) return

    const expires = new Date(premium.premium_expires_at).getTime()
    const delay = expires - Date.now()
    if (delay <= 0) {
      void refreshPremium()
      return
    }

    const timer = window.setTimeout(() => {
      void refreshPremium()
    }, Math.min(delay + 500, 2_147_483_647))

    return () => window.clearTimeout(timer)
  }, [isHydrated, premium.isActive, premium.premium_expires_at, refreshPremium])

  const value = useMemo(
    () => ({
      premium,
      isLoading,
      isHydrated,
      refreshPremium,
      activatePlan,
    }),
    [premium, isLoading, isHydrated, refreshPremium, activatePlan]
  )

  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>
}

export function usePremium(): PremiumContextValue {
  const ctx = useContext(PremiumContext)
  if (!ctx) {
    throw new Error('usePremium must be used within a PremiumProvider')
  }
  return ctx
}

/** Safe optional access outside provider (returns inactive). */
export function usePremiumOptional(): PremiumContextValue {
  const ctx = useContext(PremiumContext)
  if (ctx) return ctx
  return {
    premium: EMPTY_PREMIUM_ACCESS,
    isLoading: false,
    isHydrated: true,
    refreshPremium: async () => EMPTY_PREMIUM_ACCESS,
    activatePlan: async () => ({ ok: false, state: null, payload: null }),
  }
}
