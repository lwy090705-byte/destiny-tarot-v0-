'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'fortune-app-user'

interface UserData {
  nickname: string
  referralCode: string       // 내 추천코드 (고유)
  referredBy: string | null  // 나를 추천한 사람의 코드
  referralCount: number      // 내가 추천한 인원 수
  referralRewardClaimed: boolean // 추천인 입장 포인트 지급 여부
  createdAt: string
}

interface UserContextType {
  user: UserData | null
  isHydrated: boolean
  saveNickname: (nickname: string) => void
  applyReferralCode: (code: string, onSuccess?: () => void) => 'success' | 'already_used' | 'invalid' | 'self'
  incrementReferralCount: () => void
  needsNickname: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// 고유 추천코드 생성 (6자리 영문+숫자)
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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        // corrupt data – ignore
      }
    }
    setIsHydrated(true)
  }, [])

  const persist = (data: UserData) => {
    setUser(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const saveNickname = (nickname: string) => {
    const existing = user
    if (existing) {
      persist({ ...existing, nickname })
    } else {
      persist({
        nickname,
        referralCode: generateReferralCode(),
        referredBy: null,
        referralCount: 0,
        referralRewardClaimed: false,
        createdAt: new Date().toISOString(),
      })
    }
  }

  /**
   * 추천코드 입력 처리
   * onSuccess: 코드 적용 성공 시 호출되는 콜백 (포인트 지급 등)
   * Returns:
   *   'success'       - 정상 적용
   *   'already_used'  - 이미 추천코드를 사용한 경우
   *   'self'          - 자기 자신 코드
   *   'invalid'       - 존재하지 않는 코드
   */
  const applyReferralCode = (
    code: string,
    onSuccess?: () => void
  ): 'success' | 'already_used' | 'invalid' | 'self' => {
    if (!user) return 'invalid'
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return 'invalid'
    if (trimmed === user.referralCode) return 'self'
    if (user.referredBy) return 'already_used'

    // 추천코드는 6자리 영문+숫자 형식 검사
    if (!/^[A-Z0-9]{6}$/.test(trimmed)) return 'invalid'

    // 추천코드 저장 + 포인트 지급 콜백 실행
    persist({ ...user, referredBy: trimmed, referralRewardClaimed: true })
    onSuccess?.()
    return 'success'
  }

  const incrementReferralCount = () => {
    if (!user) return
    persist({ ...user, referralCount: user.referralCount + 1 })
  }

  // isHydrated 이후에만 의미 있는 값 — hydrate 전엔 false로 안전하게 처리
  const needsNickname = isHydrated && (!user || !user.nickname)

  return (
    <UserContext.Provider value={{
      user,
      isHydrated,
      saveNickname,
      applyReferralCode,
      incrementReferralCount,
      needsNickname,
    }}>
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
