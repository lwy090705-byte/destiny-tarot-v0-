"use client"
// Build: 20260403-v11-force-reload

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Coins, Trophy, Target, Flame, Award, Crown, Sparkles, ChevronRight, Gift, Play, X, Check, CalendarCheck, FileText, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { usePoints } from "@/lib/points-context"

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
  const { points: contextPoints, addPoints } = usePoints()
  const [stats, setStats] = useState<UserStats>({
    points: 0, // Will be synced with context
    visitCount: 47,
    consecutiveDays: 5,
    totalReadings: 32,
    memberSince: '2026-01-15',
    level: 4,
    levelName: t('level.4'),
    nextLevelPoints: 2000,
  })

  const achievements = useMemo<Achievement[]>(() => [
    {
      id: '1',
      title: t('achievement.1.title'),
      description: t('achievement.1.desc'),
      icon: '🌟',
      progress: 1,
      maxProgress: 1,
      completed: true,
      reward: '50P',
    },
    {
      id: '2',
      title: t('achievement.2.title'),
      description: t('achievement.2.desc'),
      icon: '🃏',
      progress: 5,
      maxProgress: 5,
      completed: true,
      reward: '100P',
    },
    {
      id: '3',
      title: t('achievement.3.title'),
      description: t('achievement.3.desc'),
      icon: '🔥',
      progress: 5,
      maxProgress: 7,
      completed: false,
      reward: '200P',
    },
    {
      id: '4',
      title: t('achievement.4.title'),
      description: t('achievement.4.desc'),
      icon: '🏆',
      progress: 32,
      maxProgress: 50,
      completed: false,
      reward: '500P',
    },
    {
      id: '5',
      title: t('achievement.5.title'),
      description: t('achievement.5.desc'),
      icon: '👥',
      progress: 3,
      maxProgress: 10,
      completed: false,
      reward: t('achievement.5.reward'),
    },
    {
      id: '6',
      title: t('achievement.6.title'),
      description: t('achievement.6.desc'),
      icon: '🌈',
      progress: 3,
      maxProgress: 5,
      completed: false,
      reward: '150P',
    },
  ], [t])

  // Sync stats.points with context points
  useEffect(() => {
    setStats(prev => ({ ...prev, points: contextPoints }))
  }, [contextPoints])

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

  useEffect(() => {
    setIsHydrated(true)
    
    // URL 해시에 따라 보너스 강조 활성화 (#bonus 앵커 사용)
    if (typeof window !== 'undefined' && window.location.hash === '#bonus') {
      setHighlightBonus(true)
      // 2초 후 강조 효과 제거
      const timer = setTimeout(() => setHighlightBonus(false), 2000)
      return () => clearTimeout(timer)
    }
    
    const today = new Date().toDateString()
    const savedLastDate = localStorage.getItem('lastRewardDate')
    const savedCount = localStorage.getItem('dailyRewardCount')
    
    // 새로운 날이면 카운트 리셋
    if (savedLastDate !== today) {
      setDailyRewardCount(0)
      setLastRewardDate(today)
      localStorage.setItem('lastRewardDate', today)
      localStorage.setItem('dailyRewardCount', '0')
    } else {
      setDailyRewardCount(parseInt(savedCount || '0'))
      setLastRewardDate(savedLastDate)
    }
    
    // Points are now managed by points-context, no need to load from localStorage here
    
    // 출석 데이터 로드
    const savedAttendance = localStorage.getItem('attendanceData')
    if (savedAttendance) {
      const data = JSON.parse(savedAttendance)
      setAttendanceData(data)
      const todayStr = new Date().toDateString()
      setTodayChecked(data.includes(todayStr))
    }
  }, [])

  // 출석체크 함수
  const handleAttendanceCheck = () => {
    const today = new Date().toDateString()
    if (todayChecked) return
    
    const newData = [...attendanceData, today]
    // 최근 7일만 유지
    const recentData = newData.slice(-7)
    setAttendanceData(recentData)
    setTodayChecked(true)
    localStorage.setItem('attendanceData', JSON.stringify(recentData))
    
    // 출석 보상 20포인트 - addPoints will update context and localStorage
    addPoints(20)
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

  const canClaimReward = () => dailyRewardCount < 5

  const updateRewardCount = (rewardPoints: number) => {
    const newCount = dailyRewardCount + 1
    setDailyRewardCount(newCount)
    localStorage.setItem('dailyRewardCount', newCount.toString())
    // addPoints will update context and localStorage
    addPoints(rewardPoints)
  }

  const spinRoulette = () => {
    if (!canClaimReward() || isSpinning) return
    setIsSpinning(true)
    setRouletteResult(null)

    // 확률 시스템:
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
    if (!canClaimReward() || isDrawing) return
    setIsDrawing(true)
    
    setTimeout(() => {
      setIsDrawing(false)
      setDrawResult(10) // 각 상자는 10포인트
      updateRewardCount(10)
    }, 800)
  }

  const levelProgress = (stats.points / stats.nextLevelPoints) * 100

  const levels = useMemo(() => [
    { level: 1, name: t('level.1'), minPoints: 10000 },
    { level: 2, name: t('level.2'), minPoints: 5000 },
    { level: 3, name: t('level.3'), minPoints: 2000 },
    { level: 4, name: t('level.4'), minPoints: 1000 },
    { level: 5, name: t('level.5'), minPoints: 500 },
    { level: 6, name: t('level.6'), minPoints: 0 },
  ], [language])

  const menuItems = useMemo(() => [
    { icon: Star, label: t('userProfile.premium'), href: '/premium' },
    { icon: FileText, label: t('userProfile.terms'), href: '/terms' },
    { icon: FileText, label: t('userProfile.privacy'), href: '/privacy' },
  ], [language])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 pb-24">
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

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-purple-100 rounded-full opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              {/* 아바타 */}
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔮</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-800">{t('userProfile.user')}</h2>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    Lv.{stats.level}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{t(`level.${stats.level}`)}</p>
                <p className="text-gray-400 text-xs">{t('userProfile.memberSince')}: {stats.memberSince}</p>
              </div>
            </div>

            {/* 레벨 진행바 */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Lv.{stats.level} {stats.levelName}</span>
                <span>{stats.points} / {stats.nextLevelPoints} P</span>
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
          <div className="bg-white rounded-xl p-2 shadow-lg text-center">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <Coins className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{stats.points.toLocaleString()}</div>
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
            <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{stats.consecutiveDays}{t('userProfile.day')}</div>
            <div className="text-xs text-gray-500">{t('userProfile.consecutive')}</div>
          </div>
          <div className="bg-white rounded-xl p-2 shadow-lg text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-1">
              <Sparkles className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-sm font-bold text-gray-800" suppressHydrationWarning>{stats.totalReadings}</div>
            <div className="text-xs text-gray-500">{t('userProfile.fortunes')}</div>
          </div>
        </div>

        {/* 출석체크 · 보너스 받기 섹션 라벨 */}
        <div className="text-center px-4 mb-4">
          <h3 className="text-sm font-bold text-white mb-1">{t('userProfile.checkInBonusHeading')}</h3>
          <p className="text-xs text-white/80">{t('userProfile.checkInBonusSub')}</p>
        </div>

        {/* 출석체크 */}
        <button 
          onClick={() => setShowAttendance(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg text-white hover:from-blue-600 hover:to-indigo-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{t('userProfile.attendance')}</div>
                <div className="text-xs opacity-80">{todayChecked ? t('userProfile.attendanceComplete') : t('userProfile.attendanceReward')}</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 opacity-70" />
          </div>
        </button>

        {/* 보너스 받기 버튼 */}
        <button 
          onClick={() => canClaimReward() ? setShowRoulette(true) : null}
          className={`w-full rounded-xl p-4 shadow-lg text-white transition-all ${
            highlightBonus ? 'animate-bonus-highlight' : ''
          } ${
            canClaimReward() 
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!canClaimReward()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-sm font-bold">{t('userProfile.bonus')}</div>
                <div className="text-xs opacity-80">{t('userProfile.bonusWatchAdLine')}</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 opacity-70 flex-shrink-0" />
          </div>
          
          {/* 내부 일일 보상 진행도 */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-bold">
                {t('userProfile.dailyRewardWithMax')
                  .replace('{current}', String(dailyRewardCount))
                  .replace('{max}', '5')}
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${(dailyRewardCount / 5) * 100}%` }}
              />
            </div>
          </div>
        </button>

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
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Crown className="h-5 w-5 text-purple-500" />
            {t('userProfile.levelSystem')}
          </h3>
          <div className="space-y-2">
            {levels.map((lvl) => (
              <div 
                key={lvl.level}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  lvl.level === stats.level 
                    ? 'bg-purple-100 border-2 border-purple-300' 
                    : lvl.level > stats.level
                    ? 'bg-gray-50 opacity-60'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    lvl.level >= stats.level 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {lvl.level}
                  </span>
                  <span className={`font-medium ${lvl.level === stats.level ? 'text-purple-700' : 'text-gray-700'}`}>
                    {lvl.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{lvl.minPoints.toLocaleString()}P</span>
              </div>
            ))}
          </div>
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
