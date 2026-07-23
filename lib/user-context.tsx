'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { executeReferralApplication } from '@/lib/referral-apply'
import { insertProfileToSupabase } from '@/lib/save-profile-supabase'
import {
  countReferralsByReferrerCode,
  referralPairExists,
} from '@/lib/supabase-referrals'
import { upsertProfileReferralMapping } from '@/lib/supabase-profiles-referral'
import {
  incrementReferrerCountInRegistry,
  registerReferralUser,
} from '@/lib/referral-registry'
import {
  validateNicknameForSave,
  type NicknameValidationError,
} from '@/lib/nickname-validation'
import { upsertReferralCodeMapping } from '@/lib/supabase-referral-map'
import { clearUserScopedCaches } from '@/lib/supabase-request-cache'
import { clearAuthorMetaCache } from '@/lib/supabase-profile-level-titles'
import { isMasterNickname } from '@/lib/master-role'
import { ensureMasterProfileFields } from '@/lib/supabase-profile-master'

const STORAGE_KEY = 'fortune-app-user'

export { REFERRER_REWARD_POINTS, REFEREE_REWARD_POINTS } from '@/lib/referral-constants'

interface UserData {
  nickname: string
  referralCode: string
  referredBy: string | null
  referralCount: number
  referralRewardClaimed: boolean
  createdAt: string
}

interface UserContextType {
  user: UserData | null
  isHydrated: boolean
  /** Returns null on success, or validation error code. */
  saveNickname: (nickname: string) => Promise<NicknameValidationError | null>
  applyReferralCode: (
    code: string
  ) => Promise<'success' | 'already_used' | 'invalid' | 'self' | 'duplicate'>
  incrementReferralCount: () => void
  syncReferralCount: () => Promise<void>
  refetchReferralStats: () => Promise<number>
  needsNickname: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const userRef = useRef<UserData | null>(null)
  const initialStatsFetchedRef = useRef(false)

  userRef.current = user

  const persist = useCallback((data: UserData) => {
    setUser(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    if (data.nickname && data.referralCode) {
      registerReferralUser(data.referralCode, data.nickname, data.referralCount)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserData
        setUser(parsed)
        if (parsed.nickname && parsed.referralCode) {
          registerReferralUser(parsed.referralCode, parsed.nickname, parsed.referralCount)
        }
      } catch {
        /* corrupt data – ignore */
      }
    }
    setIsHydrated(true)
  }, [])

  const refetchReferralStats = useCallback(async (): Promise<number> => {
    const current = userRef.current
    if (!current?.referralCode) return 0

    try {
      const remoteCount = await countReferralsByReferrerCode(current.referralCode)
      const nextCount = Math.max(current.referralCount, remoteCount)

      if (nextCount !== current.referralCount) {
        persist({ ...current, referralCount: nextCount })
        console.log('[referral] stats refetch success', { count: nextCount })
      }

      return nextCount
    } catch (err) {
      console.error('[referral] stats refetch failed', err)
      return current.referralCount
    }
  }, [persist])

  const syncReferralCount = useCallback(async () => {
    await refetchReferralStats()
  }, [refetchReferralStats])

  useEffect(() => {
    if (!isHydrated || !user?.referralCode) return
    if (initialStatsFetchedRef.current) return
    initialStatsFetchedRef.current = true
    void refetchReferralStats()
  }, [isHydrated, user?.referralCode, refetchReferralStats])

  const saveNickname = async (
    nickname: string
  ): Promise<NicknameValidationError | null> => {
    const validation = await validateNicknameForSave(nickname, {
      excludeNickname: user?.nickname,
    })

    if (!validation.ok) {
      return validation.error
    }

    const trimmed = validation.nickname

    // Prevent prior nickname's cached points/meta leaking into the new session identity
    clearUserScopedCaches(user?.nickname)
    clearUserScopedCaches(trimmed)
    clearAuthorMetaCache()

    await insertProfileToSupabase({
      nickname: trimmed,
      birthdate: null,
      gender: null,
    })

    const existing = user
    const nextUser: UserData = existing
      ? { ...existing, nickname: trimmed }
      : {
          nickname: trimmed,
          referralCode: generateReferralCode(),
          referredBy: null,
          referralCount: 0,
          referralRewardClaimed: false,
          createdAt: new Date().toISOString(),
        }

    persist(nextUser)

    if (nextUser.referralCode) {
      void upsertProfileReferralMapping(trimmed, nextUser.referralCode)
      void upsertReferralCodeMapping(nextUser.referralCode, trimmed)
    }

    if (isMasterNickname(trimmed)) {
      await ensureMasterProfileFields(trimmed)
    }

    return null
  }

  const applyReferralCode = async (
    code: string
  ): Promise<'success' | 'already_used' | 'invalid' | 'self' | 'duplicate'> => {
    if (!user) return 'invalid'
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return 'invalid'
    if (trimmed === user.referralCode) return 'self'
    if (user.referredBy) return 'already_used'
    if (!/^[A-Z0-9]{6}$/.test(trimmed)) return 'invalid'

    const duplicate = await referralPairExists(trimmed, user.referralCode)
    if (duplicate) return 'duplicate'

    const applyResult = await executeReferralApplication({
      referrerCode: trimmed,
      referredCode: user.referralCode,
      refereeNickname: user.nickname,
    })

    if (!applyResult.referrerFound) {
      return 'invalid'
    }

    if (!applyResult.referralInserted) {
      return 'invalid'
    }

    persist({ ...user, referredBy: trimmed, referralRewardClaimed: true })

    incrementReferrerCountInRegistry(trimmed)

    return 'success'
  }

  const incrementReferralCount = () => {
    if (!user) return
    persist({ ...user, referralCount: user.referralCount + 1 })
  }

  const needsNickname = isHydrated && (!user || !user.nickname)

  return (
    <UserContext.Provider
      value={{
        user,
        isHydrated,
        saveNickname,
        applyReferralCode,
        incrementReferralCount,
        syncReferralCount,
        refetchReferralStats,
        needsNickname,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
