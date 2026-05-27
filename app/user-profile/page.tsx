"use client"
// Build: 20260403-v11-force-reload

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Coins, Trophy, Target, Flame, Award, Crown, Sparkles, ChevronRight, Gift, Play, X, Check, CalendarCheck, FileText, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"
import { useUser } from "@/lib/user-context"
import { usePremium } from "@/lib/use-premium"
import { PremiumBadge } from "@/components/premium-badge"
import { useMasterAccess } from "@/lib/use-master-access"
import { MasterPointGrantPanel } from "@/components/master-point-grant-panel"
import {
  getMasterPointsDisplay,
  getMasterPointsLabel,
  isMasterNickname,
  MASTER_LEVEL_TITLE,
} from "@/lib/master-role"
import { fetchVisitStats, type VisitStats } from "@/lib/supabase-visit-logs"
import { LevelSystemCards } from "@/components/level-system-cards"
import { ProfileLevelAvatar, ProfileLevelDisplay } from "@/components/profile-level-display"
import type { AuthorProfileFields } from "@/lib/community-author-display"
import { resolveProfileEmblemVariant } from "@/lib/profile-level-emblem"
import { OPERATOR_LEVEL } from "@/lib/level-system"
import { fetchProfileMasterFields } from "@/lib/supabase-profile-master"
import {
  canWatchAdReward,
  DAILY_AD_REWARD_LIMIT,
  incrementAdRewardWatch,
  loadAdRewardState,
} from "@/lib/ad-reward-storage"
import {
  computeAchievements,
  computeLevelFromPoints,
  createDefaultProgress,
  loadAttendanceDates,
  recordAttendanceCheck,
  recordProfileVisit,
  syncProgressWeekStreak,
  type UserProgressData,
} from "@/lib/user-progress"

interface UserStats {
  points: number
  visitCount: number
  consecutiveDays: number
  totalReadings: number
  memberSince: string
  level: number
  levelName: string
  nextLevelPoints: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  completed: boolean
  reward: string
}

export default function UserProfilePage() {
  const { t, language } = useLanguage()
  const { points: contextPoints, addPoints, isUnlimitedPoints } = usePoints()
  const { user } = useUser()
  const { premium } = usePremium()
  const showMasterUi = isMasterNickname(user?.nickname)
  const hideAds = premium.benefits.hideAds
  const [profileFields, setProfileFields] = useState<AuthorProfileFields | null>(null)
  const [visitStats, setVisitStats] = useState<VisitStats>({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,
  })
  const [userProgress, setUserProgress] = useState<UserProgressData>(createDefaultProgress)
  const [stats, setStats] = useState<UserStats>({
    points: 0,
    visitCount: 0,
    consecutiveDays: 0,
    totalReadings: 0,
    memberSince: createDefaultProgress().memberSince,
    level: 6,
    levelName: t('level.6'),
    nextLevelPoints: 500,
  })

  const achievements = useMemo<Achievement[]>(() => {
    const states = computeAchievements(userProgress, user?.referralCount ?? 0)
    const defs: Omit<Achievement, 'progress' | 'maxProgress' | 'completed'>[] = [
      { id: '1', title: t('achievement.1.title'), description: t('achievement.1.desc'), icon: '🌟', reward: '50P' },
      { id: '2', title: t('achievement.2.title'), description: t('achievement.2.desc'), icon: '🃏', reward: '100P' },
      { id: '3', title: t('achievement.3.title'), description: t('achievement.3.desc'), icon: '🔥', reward: '200P' },
      { id: '4', title: t('achievement.4.title'), description: t('achievement.4.desc'), icon: '🏆', reward: '500P' },
      { id: '5', title: t('achievement.5.title'), description: t('achievement.5.desc'), icon: '👥', reward: t('achievement.5.reward') },
      { id: '6', title: t('achievement.6.title'), description: t('achievement.6.desc'), icon: '🌈', reward: '150P' },
    ]
    return defs.map((def) => {
      const state = states.find((s) => s.id === def.id)!
      return { ...def, ...state }
    })
  }, [t, userProgress, user?.referralCount])

  useEffect(() => {
    const levelInfo = computeLevelFromPoints(contextPoints)
    setStats({
      points: contextPoints,
      visitCount: userProgress.visitCount,
      consecutiveDays: userProgress.weekStreak,
      totalReadings: userProgress.totalReadings,
      memberSince: userProgress.memberSince,
      level: showMasterUi ? OPERATOR_LEVEL : levelInfo.level,
      levelName: showMasterUi ? MASTER_LEVEL_TITLE : t(`level.${levelInfo.level}`),
      nextLevelPoints: showMasterUi ? 0 : levelInfo.nextLevelPoints,
    })
  }, [contextPoints, userProgress, t, showMasterUi])

  const loadProfileFields = useCallback(async () => {
    const nick = user?.nickname?.trim()
    if (!nick) {
      setProfileFields(null)
      return
    }
    const { ok, profile } = await fetchProfileMasterFields(nick)
    if (ok && profile) {
      setProfileFields({
        level_title: profile.level_title,
        role: profile.role,
        is_master: profile.is_master,
        total_points: profile.total_points,
      })
    } else {
      setProfileFields(null)
    }
  }, [user?.nickname])

  useEffect(() => {
    void loadProfileFields()
  }, [loadProfileFields, contextPoints])

  const profileEmblemVariant = useMemo(
    () =>
      resolveProfileEmblemVariant({
        nickname: user?.nickname ?? '',
        level: stats.level,
        levelTitle: stats.levelName,
        isOperatorNickname: showMasterUi,
        profile: profileFields,
      }),
    [user?.nickname, stats.level, stats.levelName, showMasterUi, profileFields]
  )

  useEffect(() => {
    if (!showMasterUi) return
    void fetchVisitStats().then(setVisitStats)
  }, [showMasterUi])

  const [showRoulette, setShowRoulette] = useState(false)
  const [showPickDraw, setShowPickDraw] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [rouletteResult, setRouletteResult] = useState<string | null>(null)
  const [drawResult, setDrawResult] = useState<number | null>(null)
  const [dailyRewardCount, setDailyRewardCount] = useState(0)
  const [lastRewardDate, setLastRewardDate] = useState<string | null>(null)
  const [spinDeg, setSpinDeg] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // 출석체크 상태
  const [showAttendance, setShowAttendance] = useState(false)
  const [attendanceData, setAttendanceData] = useState<string[]>([])
  const [todayChecked, setTodayChecked] = useState(false)
  
  // 보너스 받기 강조 상태
  const [highlightBonus, setHighlightBonus] = useState(false)
  // 20구간 업그레이드된 룰렛: 10P(60%), 20P(30%), 40P(6%), 50P(4%)
  const SEGMENTS = Array.from({ length: 20 }, (_, i) => {
    let points, label, color
    if (i < 12) { // 60% = 12/20
      points = 10; label = '10P'
      color = ['#8b5cf6', '#7c3aed', '#6d28d9'][i % 3]
    } else if (i < 18) { // 30% = 6/20
      points = 20; label = '20P'
      color = ['#6366f1', '#4f46e5', '#4338ca'][i % 3]
    } else if (i < 19) { // 6% = 1/20
      points = 40; label = '40P'
      color = '#f59e0b'
    } else { // 4% = 1/20
      points = 50; label = '50P'
      color = '#ef4444'
    }
    return { label, points, color }
  })

  const SEGMENT_COUNT = SEGMENTS.length
  const SEGMENT_DEG = 360 / SEGMENT_COUNT

  // 모달이 열릴 때 body 스크롤 잠금 — 스크롤 위치 이동 방지
  useEffect(() => {
    const anyOpen = showRoulette || showAttendance || showPickDraw
    if (anyOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showRoulette, showAttendance, showPickDraw])

  useEffect(() => {
    setIsHydrated(true)

    const adState = loadAdRewardState()
    setDailyRewardCount(adState.watchCount)
    setLastRewardDate(adState.date)

    if (user?.referralCode) {
      let progress = recordProfileVisit(user.referralCode)
      progress = syncProgressWeekStreak(user.referralCode)
      setUserProgress(progress)

      const dates = loadAttendanceDates(user.referralCode)
      setAttendanceData(dates)
      const todayStr = new Date().toDateString()
      setTodayChecked(dates.includes(todayStr))
    }
  }, [user?.referralCode])

  // URL 해시에 따라 보너스 카드 화면 중앙 스크롤 (#bonus 앵커 사용)
  useEffect(() => {
    if (!isHydrated) return
    if (typeof window === 'undefined' || window.location.hash !== '#bonus') return

    setHighlightBonus(true)
    const timer = setTimeout(() => {
      document.getElementById('bonus-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
    const resetTimer = setTimeout(() => setHighlightBonus(false), 2300)
    return () => {
      clearTimeout(timer)
      clearTimeout(resetTimer)
    }
  }, [isHydrated])

  useEffect(() => {
    const syncAdRewardFromStorage = () => {
      const adState = loadAdRewardState()
      setDailyRewardCount(adState.watchCount)
      setLastRewardDate(adState.date)
    }
    window.addEventListener('pageshow', syncAdRewardFromStorage)
    window.addEventListener('focus', syncAdRewardFromStorage)
    return () => {
      window.removeEventListener('pageshow', syncAdRewardFromStorage)
      window.removeEventListener('focus', syncAdRewardFromStorage)
    }
  }, [])

  // 출석체크 함수
  const handleAttendanceCheck = () => {
    if (todayChecked || !user?.referralCode) return

    const { dates, progress } = recordAttendanceCheck(user.referralCode)
    setAttendanceData(dates)
    setTodayChecked(true)
    setUserProgress(progress)

    addPoints(20, { point_type: "attendance", description: "Daily check-in reward (+20P)" })
  }

  // 이번 주 날짜 배열 생성
  const getWeekDays = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push({
        date: day.toDateString(),
        dayName: [t('attendance.sun'), t('attendance.mon'), t('attendance.tue'), t('attendance.wed'), t('attendance.thu'), t('attendance.fri'), t('attendance.sat')][i],
        dayNum: day.getDate(),
        isToday: day.toDateString() === today.toDateString(),
        isChecked: attendanceData.includes(day.toDateString())
      })
    }
    return days
  }

  const canClaimReward = () => dailyRewardCount < DAILY_AD_REWARD_LIMIT

  const updateRewardCount = (rewardPoints: number) => {
    const next = incrementAdRewardWatch()
    if (!next) return
    setDailyRewardCount(next.watchCount)
    setLastRewardDate(next.date)
    addPoints(rewardPoints, {
      point_type: "ad_reward",
      description: `Ad bonus reward (+${rewardPoints}P)`,
    })
  }

  const spinRoulette = () => {
    if (!canWatchAdReward() || isSpinning) return
    setIsSpinning(true)
    setRouletteResult(null)

    // Weighted odds:
    // 10P: 60% (12/20)
    // 20P: 30% (6/20)
    // 40P: 6% (1/20)
    // 50P: 4% (1/20)
    const rand = Math.random()
    let resultIdx: number

    if (rand < 0.60) {
      resultIdx = Math.floor(Math.random() * 12) // 10P (0-11)
    } else if (rand < 0.90) {
      resultIdx = 12 + Math.floor(Math.random() * 6) // 20P (12-17)
    } else if (rand < 0.96) {
      resultIdx = 18 // 40P
    } else {
      resultIdx = 19 // 50P
    }

    const result = SEGMENTS[resultIdx]

    // SVG 휠 회전 계산 (20 segments)
    const SEGMENT_DEG = 360 / 20
    const segMidDeg = resultIdx * SEGMENT_DEG + SEGMENT_DEG / 2
    const extraSpins = 2160 // 6바퀴
    const correction = (360 - (segMidDeg % 360)) % 360
    const target = extraSpins + correction
    setSpinDeg(prev => (prev % 360) + target)

    setTimeout(() => {
      setIsSpinning(false)
      setRouletteResult(result.label)
      updateRewardCount(result.points)
    }, 4000)
  }

  const handlePickDraw = (boxIndex: number) => {
    if (!canWatchAdReward() || isDrawing) return
    setIsDrawing(true)
    
    setTimeout(() => {
      setIsDrawing(false)
      setDrawResult(10) // 각 상자는 10포인트
      updateRewardCount(10)
    }, 800)
  }

  const levelProgress = showMasterUi
    ? 100
    : Math.min(
        100,
        stats.nextLevelPoints > 0
          ? (stats.points / stats.nextLevelPoints) * 100
          : 0
      )

  const pointsDisplay = isUnlimitedPoints
    ? getMasterPointsDisplay(language)
    : stats.points.toLocaleString()
  const pointsProgressLabel = showMasterUi
    ? getMasterPointsLabel(language)
    : `${stats.points} / ${stats.nextLevelPoints} P`

  const menuItems = useMemo(() => [
    { icon: Star, label: t('userProfile.premium'), href: '/premium' },
    { icon: FileText, label: t('userProfile.terms'), href: '/terms' },
    { icon: FileText, label: t('userProfile.privacy'), href: '/privacy' },
  ], [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-12">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-40">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white hover:text-purple-200 transition">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold text-white">{t('userProfile.title')}</h1>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-3 space-y-4">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-100 rounded-full opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <ProfileLevelAvatar variant={profileEmblemVariant} levelName={stats.levelName} />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-800">{user?.nickname || t('userProfile.user')}</h2>
                  <ProfileLevelDisplay
                    level={stats.level}
                    levelName={stats.levelName}
                    isOperator={showMasterUi}
                    mode="badge"
                  />
                  {premium.isActive && <PremiumBadge />}
                </div>
                <p className="text-gray-500 text-sm">{stats.levelName}</p>
                <p className="text-gray-400 text-xs">{t('userProfile.memberSince')}: {stats.memberSince}</p>
              </div>
            </div>

            {/* 레벨 진행바 */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <ProfileLevelDisplay
                  level={stats.level}
                  levelName={stats.levelName}
                  isOperator={showMasterUi}
                  mode="label"
                />
                <span>{pointsProgressLabel}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 - 축소 버전 */}
        <div className="grid grid-cols-4 gap-2">
          {showMasterUi ? (
            <>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Coins className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>
                  {visitStats.daily.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">일간</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CalendarCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>
                  {visitStats.weekly.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">주간</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>
                  {visitStats.monthly.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">월간</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>
                  {visitStats.total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">총누계</div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Coins className="h-4 w-4 text-amber-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{pointsDisplay}</div>
                <div className="text-xs text-gray-500">{t('userProfile.points')}</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CalendarCheck className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{stats.visitCount}</div>
                <div className="text-xs text-gray-500">{t('userProfile.visits')}</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>
                  {stats.consecutiveDays}
                  {t('userProfile.day')}
                </div>
                <div className="text-xs text-gray-500">{t('userProfile.consecutive')}</div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-lg text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{stats.totalReadings}</div>
                <div className="text-xs text-gray-500">{t('userProfile.fortunes')}</div>
              </div>
            </>
          )}
        </div>

        {showMasterUi && user?.nickname && (
          <MasterPointGrantPanel grantedBy={user.nickname.trim()} />
        )}

        {/* 출석체크 · 보너스 받기 섹션 — flex-col gap-4로 완전 독립 분리 */}
        <div className="flex flex-col gap-4">

          {/* 섹션 헤더 */}
          <div className="text-center px-4">
            <h3
              className="font-extrabold text-white mb-1"
              style={{ fontSize: 18, textShadow: '0 0 16px rgba(167,139,250,0.6)' }}
            >
              ✦ {t('userProfile.checkInBonusHeading')} ✦
            </h3>
            <p className="text-xs text-white/70">{t('userProfile.checkInBonusSub')}</p>
          </div>

          {/* 출석체크 카드 */}
          <button
            onClick={() => setShowAttendance(true)}
            className="w-full text-white transition-all active:scale-[0.98]"
            style={{
              borderRadius: 20,
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 35%, #5b21b6 65%, #7c3aed 100%)',
            boxShadow: '0 8px 32px rgba(91,33,182,0.45), 0 0 0 1px rgba(167,139,250,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
            padding: '18px 16px 16px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* sparkle bg dots */}
          <div style={{ position: 'absolute', top: 10, right: 60, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <div style={{ position: 'absolute', top: 30, right: 100, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
          <div style={{ position: 'absolute', bottom: 18, left: 120, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute', top: 14, left: 130, width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />

          <div className="flex items-center gap-3">
            {/* 좌측 아이콘 */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: 72, height: 72,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(91,33,182,0.5), 0 0 0 2px rgba(167,139,250,0.3)',
              }}
            >
              <img
                src="/icons/attendance-card.jpg"
                alt={t('userProfile.attendance')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* 중앙 텍스트 */}
            <div className="flex-1 text-left min-w-0">
              <div
                className="font-extrabold leading-tight"
                style={{ fontSize: 20, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                {t('userProfile.attendance')}
              </div>
              <div className="text-sm mt-0.5" style={{ opacity: 0.9 }}>
                {todayChecked ? t('userProfile.attendanceComplete') : t('userProfile.attendanceReward')}
              </div>
              <div className="text-xs mt-1" style={{ opacity: 0.7 }}>
                {t('attendance.description')}
              </div>
            </div>

            {/* 우측 체크 + 화살표 */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: todayChecked
                    ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                    : 'rgba(255,255,255,0.15)',
                  boxShadow: todayChecked
                    ? '0 0 16px rgba(167,139,250,0.7), 0 0 0 2px rgba(255,255,255,0.3)'
                    : '0 0 0 2px rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Check className="h-5 w-5 text-white" />
              </div>
              <ChevronRight className="h-4 w-4" style={{ opacity: 0.6 }} />
            </div>
          </div>

          {/* 하단 주간 진행바 */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-xs font-bold" style={{ opacity: 0.9 }}>
                {t('attendance.weekly')}
              </span>
              <span className="text-xs" style={{ opacity: 0.7 }}>
                {attendanceData.filter(d => {
                  const dDate = new Date(d)
                  const now = new Date()
                  const startOfWeek = new Date(now)
                  startOfWeek.setDate(now.getDate() - now.getDay())
                  startOfWeek.setHours(0, 0, 0, 0)
                  return dDate >= startOfWeek
                }).length}/7
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 8, background: 'rgba(255,255,255,0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(attendanceData.filter(d => {
                    const dDate = new Date(d)
                    const now = new Date()
                    const startOfWeek = new Date(now)
                    startOfWeek.setDate(now.getDate() - now.getDay())
                    startOfWeek.setHours(0, 0, 0, 0)
                    return dDate >= startOfWeek
                  }).length / 7) * 100}%`,
                  background: 'linear-gradient(90deg, #a78bfa, #ffffff)',
                  boxShadow: '0 0 8px rgba(167,139,250,0.8)',
                }}
              />
            </div>
          </div>
          </button>

          {/* 보너스 받기 카드 — 프리미엄 구독 시 광고 보상 숨김 */}
          {!hideAds && (
          <button
            id="bonus-card"
            onClick={() => canClaimReward() ? setShowRoulette(true) : null}
            disabled={!canClaimReward()}
            className={`w-full text-white transition-all active:scale-[0.98] ${highlightBonus ? 'animate-bonus-highlight' : ''}`}
            style={{
              borderRadius: 20,
            background: canClaimReward()
              ? 'linear-gradient(135deg, #ea580c 0%, #f97316 30%, #fb923c 60%, #ec4899 100%)'
              : 'linear-gradient(135deg, #6b7280, #9ca3af)',
            boxShadow: canClaimReward()
              ? '0 8px 32px rgba(234,88,12,0.45), 0 0 0 1px rgba(251,146,60,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
              : '0 4px 16px rgba(0,0,0,0.2)',
            padding: '18px 16px 16px',
            position: 'relative',
            overflow: 'hidden',
            cursor: canClaimReward() ? 'pointer' : 'not-allowed',
          }}
        >
          {/* sparkle bg */}
          <div style={{ position: 'absolute', top: 12, right: 80, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
          <div style={{ position: 'absolute', top: 28, right: 130, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 110, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />

          <div className="flex items-center gap-3">
            {/* 좌측 보물상자 아이콘 */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: 72, height: 72,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(234,88,12,0.5), 0 0 0 2px rgba(251,191,36,0.35)',
              }}
            >
              <img
                src="/icons/bonus-chest.jpg"
                alt={t('userProfile.bonus')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* 중앙 텍스트 */}
            <div className="flex-1 text-left min-w-0">
              <div
                className="font-extrabold leading-tight"
                style={{ fontSize: 20, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
              >
                {t('userProfile.bonus')}
              </div>
              <div className="text-sm mt-0.5" style={{ opacity: 0.9 }}>
                {t('userProfile.bonusWatchAdLine')}
              </div>
              <div className="text-xs mt-1" style={{ opacity: 0.7 }}>
                {t('userProfile.bonusDailyHint')}
              </div>
            </div>

            {/* 우측 룰렛/50P — 출석체크 체크 서클과 동일한 44px */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 0 16px rgba(251,191,36,0.6), 0 0 0 2px rgba(255,255,255,0.3)',
                  position: 'relative',
                }}
              >
                <img
                  src="/icons/roulette-wheel.jpg"
                  alt="50P"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)',
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 900, color: '#fbbf24', lineHeight: 1.2 }}>50P</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4" style={{ opacity: 0.6 }} />
            </div>
          </div>

          {/* 하단 일일 보상 진행바 */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-xs font-bold" style={{ opacity: 0.95 }}>
                {t('userProfile.dailyRewardWithMax')
                  .replace('{current}', String(dailyRewardCount))
                  .replace('{max}', String(DAILY_AD_REWARD_LIMIT))}
              </span>
              <Gift className="h-4 w-4" style={{ opacity: 0.7 }} />
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 8, background: 'rgba(255,255,255,0.25)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(dailyRewardCount / DAILY_AD_REWARD_LIMIT) * 100}%`,
                  background: 'linear-gradient(90deg, #fbbf24, #ffffff)',
                  boxShadow: '0 0 10px rgba(251,191,36,0.8)',
                }}
              />
            </div>
          </div>
          </button>
          )}

        </div>{/* end flex-col gap-4 wrapper */}

        {/* 업적 시스템 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              {t('userProfile.achievements')}
            </h3>
            <span className="text-xs text-gray-500">
              {achievements.filter(a => a.completed).length}/{achievements.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-2 rounded-lg border text-center transition-all ${
                  achievement.completed 
                    ? 'border-amber-300 bg-amber-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="text-lg">{achievement.icon}</span>
                <p className="text-xs font-medium text-gray-700 mt-1 truncate">{achievement.title}</p>
                {!achievement.completed && (
                  <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                )}
                {achievement.completed && (
                  <span className="text-xs text-amber-600">{achievement.reward}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 레벨 안내 */}
        <div className="rounded-2xl p-4 sm:p-6 shadow-xl bg-gradient-to-br from-[#1a1040] via-[#2d1b69] to-[#1e1145] border border-white/10">
          <h3 className="font-bold text-white flex items-center gap-2 mb-4">
            <Crown className="h-5 w-5 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.75)]" />
            {t('userProfile.levelSystem')}
          </h3>
          <LevelSystemCards
            currentLevel={
              showMasterUi ? OPERATOR_LEVEL : computeLevelFromPoints(contextPoints).level
            }
            guideOnly={showMasterUi}
            t={t}
          />
        </div>

        {/* 메뉴 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link 
                key={idx}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            )
          })}
        </div>
      </main>

      {/* Pick Draw 모달 */}
      {showPickDraw && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-6 max-w-md w-full relative">
            <button 
              onClick={() => { setShowPickDraw(false); setDrawResult(null); }}
              className="absolute top-3 right-3 text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl font-bold text-center text-emerald-300 mb-2">{t('userProfile.pickDrawTitle')}</h3>
            <p className="text-center text-green-200 text-sm mb-6">{t('userProfile.pickDrawSubtitle')}</p>

            {drawResult ? (
              <div className="text-center">
                <div className="mb-4 text-6xl animate-bounce">🎁</div>
                <p className="text-green-200 mb-1 text-sm">{t('common.congrats')}</p>
                <p className="text-3xl font-bold text-emerald-300">{drawResult}P</p>
                <p className="text-green-200 text-xs mt-2">{t('userProfile.rewardReceived')}</p>
                <Button
                  onClick={() => { setShowPickDraw(false); setDrawResult(null); }}
                  className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
                >
                  {t('common.close')}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 상단 3개 상자 */}
                <div className="flex justify-center gap-4">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => handlePickDraw(i)}
                      disabled={isDrawing}
                      className="flex flex-col items-center group"
                    >
                      <div className="text-6xl transform hover:scale-125 transition-transform">
                        {isDrawing ? '📦' : '🎁'}
                      </div>
                      <div className="text-xs text-green-200 mt-2">{t('userProfile.giftBoxNumber').replace('{n}', String(i + 1))}</div>
                    </button>
                  ))}
                </div>

                {/* 하단 2개 상자 */}
                <div className="flex justify-center gap-4">
                  {[3, 4].map((i) => (
                    <button
                      key={i}
                      onClick={() => handlePickDraw(i)}
                      disabled={isDrawing}
                      className="flex flex-col items-center group"
                    >
                      <div className="text-6xl transform hover:scale-125 transition-transform">
                        {isDrawing ? '📦' : '🎁'}
                      </div>
                      <div className="text-xs text-green-200 mt-2">{t('userProfile.giftBoxNumber').replace('{n}', String(i + 1))}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 룰렛 모달 */}
      {showRoulette && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 max-w-sm w-full relative">
            <button 
              onClick={() => { setShowRoulette(false); setRouletteResult(null); setSpinDeg(0); }}
              className="absolute top-3 right-3 text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-bold text-center text-amber-400 mb-4">{t('roulette.title')}</h3>

            {/* 룰렛 휠 */}
            <div className="relative w-56 h-56 mx-auto mb-5">
              {/* 화살표 - 정중앙 위에서 아래를 향함 */}
              <div className="absolute top-0 left-1/2 z-20" style={{ transform: 'translateX(-50%) translateY(-4px)' }}>
                <svg width="22" height="28" viewBox="0 0 22 28">
                  {/* 아래를 향하는 삼각형 화살표 */}
                  <polygon points="11,28 0,0 22,0" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>

              {/* SVG 휠 */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full drop-shadow-lg"
                style={{
                  transform: `rotate(${spinDeg}deg)`,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none',
                }}
              >
                {SEGMENTS.map((seg, i) => {
                  const SEGMENT_DEG = 360 / 20
                  const startAngle = (i * SEGMENT_DEG - 90) * (Math.PI / 180)
                  const endAngle = ((i + 1) * SEGMENT_DEG - 90) * (Math.PI / 180)
                  const r = 98
                  const x1 = 100 + r * Math.cos(startAngle)
                  const y1 = 100 + r * Math.sin(startAngle)
                  const x2 = 100 + r * Math.cos(endAngle)
                  const y2 = 100 + r * Math.sin(endAngle)
                  const midAngle = ((i + 0.5) * SEGMENT_DEG - 90) * (Math.PI / 180)
                  // 텍스트를 바깥쪽 가장자리로 이동 (60 → 75)
                  const tx = 100 + 75 * Math.cos(midAngle)
                  const ty = 100 + 75 * Math.sin(midAngle)
                  const textAngle = (i + 0.5) * SEGMENT_DEG
                  return (
                    <g key={i}>
                      <path
                        d={`M 100 100 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                        fill={seg.color}
                        stroke="#fbbf24"
                        strokeWidth="1"
                      />
                      <text
                        x={tx}
                        y={ty}
                        fill="#fff"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                      >
                        {seg.label}
                      </text>
                    </g>
                  )
                })}
                <circle cx="100" cy="100" r="12" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="2" />
              </svg>
            </div>

            {/* 결과 또는 스핀 버튼 */}
            {rouletteResult ? (
              <div className="text-center">
                <div className="mb-4 text-4xl animate-bounce">🎉</div>
                <p className="text-purple-200 mb-1 text-sm">{t('common.congrats')}</p>
                <p className="text-2xl font-bold text-amber-400">{rouletteResult}</p>
                <p className="text-purple-300 text-xs mt-1">{t('userProfile.rewardReceived')}</p>
                <Button
                  onClick={() => { setShowRoulette(false); setRouletteResult(null); setSpinDeg(0); }}
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold"
                >
                  {t('common.close')}
                </Button>
              </div>
            ) : (
              <Button
                onClick={spinRoulette}
                disabled={isSpinning || !canClaimReward()}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 disabled:opacity-50"
              >
                {isSpinning ? t('roulette.spinning') : t('roulette.spin')}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 출석부 모달 */}
      {showAttendance && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
            <button 
              onClick={() => setShowAttendance(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{t('attendance.title')}</h3>
            <p className="text-center text-gray-500 text-sm mb-4">{t('attendance.description')}</p>

            {/* 주간 출석 현황 */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {getWeekDays().map((day, i) => (
                <div key={i} className="text-center">
                  <div className={`text-xs mb-1 ${day.isToday ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                    {day.dayName}
                  </div>
                  <div 
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                      day.isChecked 
                        ? 'bg-green-500 text-white' 
                        : day.isToday 
                          ? 'bg-blue-100 text-blue-600 border-2 border-blue-500'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day.isChecked ? <Check className="h-5 w-5" /> : day.dayNum}
                  </div>
                </div>
              ))}
            </div>

            {/* 출석 통계 */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('attendance.weekly')}</span>
                <span className="font-bold text-blue-600">{getWeekDays().filter(d => d.isChecked).length}/7{t('userProfile.day')}</span>
              </div>
            </div>

            {/* 출석체크 버튼 */}
            <Button
              onClick={() => { handleAttendanceCheck(); }}
              disabled={todayChecked}
              className={`w-full py-3 font-bold ${
                todayChecked 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              }`}
            >
              {todayChecked ? t('attendance.checkedButton') : t('attendance.checkButton')}
            </Button>
          </div>
        </div>
      )}


    </div>
  )
}
