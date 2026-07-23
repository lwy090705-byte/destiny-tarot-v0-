"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo, useRef } from "react"
import { useUser } from "@/lib/user-context"
import { getMasterPointsDisplay, isMasterNickname } from "@/lib/master-role"
import { ensureMasterProfileFields } from "@/lib/supabase-profile-master"
import { useLanguage } from "@/lib/language-context"
import { fetchPointsTotalByNickname, insertPointTransaction } from "@/lib/supabase-points"
import { grantCompletedAchievementRewards } from "@/lib/achievement-rewards"
import { loadUserProgress, recordFortuneReading } from "@/lib/user-progress"

export type PointTransactionMeta = {
  point_type: string
  description?: string
}

interface PointsContextType {
  /** DB 합산 포인트 (운영자는 0일 수 있음) */
  points: number
  /** 헤더·프로필 표시용 (∞ 또는 숫자+P) */
  displayPoints: string
  isUnlimitedPoints: boolean
  deductPoints: (amount: number, meta?: PointTransactionMeta) => boolean
  addPoints: (amount: number, meta?: PointTransactionMeta) => void
  hasEnoughPoints: (amount: number) => boolean
  isHydrated: boolean
  refreshPoints: () => Promise<void>
  refetchPointsAndAchievements: () => Promise<void>
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

const CACHE_KEY_PREFIX = "fortune-app-points"

function pointsCacheKey(nickname: string): string {
  const nick = nickname.trim()
  return nick ? `${CACHE_KEY_PREFIX}:${nick}` : CACHE_KEY_PREFIX
}

function readPointsCache(nickname: string): number {
  if (typeof window === "undefined") return 0
  try {
    const stored = localStorage.getItem(pointsCacheKey(nickname))
    if (stored !== null) {
      const n = parseInt(stored, 10)
      if (Number.isFinite(n)) return n
    }
  } catch {
    /* ignore */
  }
  return 0
}

function writePointsCache(nickname: string, value: number): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(pointsCacheKey(nickname), String(value))
  } catch {
    /* ignore */
  }
}

export function PointsProvider({ children }: { children: ReactNode }) {
  const { user, isHydrated: userHydrated } = useUser()
  const { language } = useLanguage()
  const userReferralCode = user?.referralCode ?? ""
  const [points, setPoints] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  const bootRanForRef = useRef<string>("")
  const achievementsRanForRef = useRef<string>("")

  const nickname = user?.nickname?.trim() ?? ""
  const referralCount = user?.referralCount ?? 0
  const isUnlimitedPoints = isMasterNickname(nickname)

  const displayPoints = useMemo(() => {
    if (isUnlimitedPoints) return getMasterPointsDisplay(language)
    return `${points.toLocaleString()}P`
  }, [isUnlimitedPoints, points, language])

  useEffect(() => {
    if (!isUnlimitedPoints) return
    void ensureMasterProfileFields(nickname)
  }, [isUnlimitedPoints, nickname])

  const refreshPoints = useCallback(async () => {
    if (!nickname) {
      const cached = readPointsCache("")
      setPoints(cached)
      return
    }

    if (isUnlimitedPoints) {
      setPoints(0)
      console.log("[points] operator unlimited — display ∞, DB total ignored")
      return
    }

    const total = await fetchPointsTotalByNickname(nickname)
    setPoints(total)
    writePointsCache(nickname, total)
  }, [nickname, isUnlimitedPoints])

  const runAchievementGrants = useCallback(async () => {
    if (isUnlimitedPoints) {
      console.log("[points] refetch skipped achievements ledger for operator")
      return
    }
    if (!nickname || !userReferralCode) return

    const claimed = await grantCompletedAchievementRewards({
      referralCode: userReferralCode,
      nickname,
      referralCount,
      progress: loadUserProgress(userReferralCode),
    })
    if (claimed.length > 0) {
      console.log("[achievement] reward grant success", claimed)
      await refreshPoints()
    }
  }, [nickname, userReferralCode, referralCount, refreshPoints, isUnlimitedPoints])

  const refetchPointsAndAchievements = useCallback(async () => {
    try {
      await refreshPoints()
      await runAchievementGrants()
      console.log("[points] refetch success")
    } catch (err) {
      console.error("[points] refetch failed", err)
    }
  }, [refreshPoints, runAchievementGrants])

  // Single boot path: one points fetch + one achievement pass (no double refreshPoints)
  useEffect(() => {
    if (!userHydrated) return

    const bootKey = `${nickname}|${userReferralCode}`
    if (bootRanForRef.current === bootKey) return
    bootRanForRef.current = bootKey

    void (async () => {
      if (nickname) {
        await refreshPoints()
        if (userReferralCode) {
          achievementsRanForRef.current = `${bootKey}|${referralCount}`
          await runAchievementGrants()
        }
      } else {
        setPoints(readPointsCache(""))
      }
      setIsHydrated(true)
    })()
  }, [userHydrated, nickname, userReferralCode, referralCount, refreshPoints, runAchievementGrants])

  // Only re-run achievement grants when referralCount changes after boot (not a full points double-fetch)
  useEffect(() => {
    if (!isHydrated || !nickname || !userReferralCode) return
    const key = `${nickname}|${userReferralCode}|${referralCount}`
    if (achievementsRanForRef.current === key) return
    achievementsRanForRef.current = key
    void runAchievementGrants()
  }, [isHydrated, nickname, userReferralCode, referralCount, runAchievementGrants])

  const hasEnoughPoints = (amount: number): boolean => {
    if (isUnlimitedPoints) return true
    return points >= amount
  }

  const applyLedgerChange = async (
    delta: number,
    meta?: PointTransactionMeta
  ): Promise<void> => {
    if (isUnlimitedPoints) {
      console.log("[points] operator — no ledger change", { delta, meta })
      return
    }

    if (!nickname) {
      const next = Math.max(0, points + delta)
      setPoints(next)
      writePointsCache("", next)
      console.log("[points] skipped Supabase (no nickname), cache only", { delta, next })
      return
    }

    await insertPointTransaction({
      nickname,
      point_type: meta?.point_type ?? (delta >= 0 ? "reward" : "spend"),
      amount: delta,
      description: meta?.description ?? null,
    })

    await refreshPoints()

    if (userReferralCode && meta?.point_type?.startsWith("fortune")) {
      recordFortuneReading(userReferralCode, {
        isTarot: meta.point_type === "fortune_tarot",
      })
    }
  }

  const deductPoints = (amount: number, meta?: PointTransactionMeta): boolean => {
    if (amount <= 0) return true
    if (isUnlimitedPoints) return true
    if (points < amount) return false

    const optimistic = points - amount
    setPoints(optimistic)
    writePointsCache(nickname, optimistic)

    void applyLedgerChange(-amount, {
      point_type: meta?.point_type ?? "spend",
      description: meta?.description ?? "Point spend",
    })

    return true
  }

  const addPoints = (amount: number, meta?: PointTransactionMeta) => {
    if (amount <= 0) return
    if (isUnlimitedPoints) return

    const optimistic = points + amount
    setPoints(optimistic)
    writePointsCache(nickname, optimistic)

    void applyLedgerChange(amount, {
      point_type: meta?.point_type ?? "reward",
      description: meta?.description ?? "Point reward",
    })
  }

  return (
    <PointsContext.Provider
      value={{
        points,
        displayPoints,
        isUnlimitedPoints,
        deductPoints,
        addPoints,
        hasEnoughPoints,
        isHydrated,
        refreshPoints,
        refetchPointsAndAchievements,
      }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export function usePoints() {
  const context = useContext(PointsContext)
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider")
  }
  return context
}
