/** Per-user progress keyed by referral code (stable id in localStorage). */

export type AchievementProgress = {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
}

export type UserProgressData = {
  visitCount: number
  totalReadings: number
  tarotReadings: number
  /** Consecutive check-in days in the current 7-day week window (0–7, resets on new week). */
  weekStreak: number
  /** ISO week key e.g. "2026-W20" for streak reset */
  weekKey: string
  memberSince: string
  achievements: AchievementProgress
}

const DEFAULT_ACHIEVEMENTS: AchievementProgress = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
}

export function createDefaultProgress(): UserProgressData {
  return {
    visitCount: 0,
    totalReadings: 0,
    tarotReadings: 0,
    weekStreak: 0,
    weekKey: getWeekKey(),
    memberSince: new Date().toISOString().split('T')[0],
    achievements: { ...DEFAULT_ACHIEVEMENTS },
  }
}

function progressStorageKey(referralCode: string): string {
  return `fortune-user-progress:${referralCode.trim().toUpperCase()}`
}

function attendanceStorageKey(referralCode: string): string {
  return `fortune-attendance:${referralCode.trim().toUpperCase()}`
}

export function getWeekKey(d = new Date()): string {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(date)
  monday.setDate(diff)
  const year = monday.getFullYear()
  const start = new Date(year, 0, 1)
  const week = Math.ceil(((monday.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7)
  return `${year}-W${String(week).padStart(2, '0')}`
}

export function syncProgressWeekStreak(referralCode: string): UserProgressData {
  const progress = loadUserProgress(referralCode)
  const dates = loadAttendanceDates(referralCode)
  progress.weekStreak = computeWeekStreakFromDates(dates)
  progress.weekKey = getWeekKey()
  saveUserProgress(referralCode, progress)
  return progress
}

export function loadUserProgress(referralCode: string | null | undefined): UserProgressData {
  if (!referralCode || typeof window === 'undefined') {
    return createDefaultProgress()
  }
  try {
    const raw = localStorage.getItem(progressStorageKey(referralCode))
    if (!raw) return createDefaultProgress()
    const parsed = JSON.parse(raw) as Partial<UserProgressData>
    const currentWeek = getWeekKey()
    const weekStreak =
      parsed.weekKey === currentWeek ? Math.min(7, Number(parsed.weekStreak) || 0) : 0
    return {
      visitCount: Number(parsed.visitCount) || 0,
      totalReadings: Number(parsed.totalReadings) || 0,
      tarotReadings: Number(parsed.tarotReadings) || 0,
      weekStreak,
      weekKey: currentWeek,
      memberSince: parsed.memberSince ?? createDefaultProgress().memberSince,
      achievements: { ...DEFAULT_ACHIEVEMENTS, ...(parsed.achievements ?? {}) },
    }
  } catch {
    return createDefaultProgress()
  }
}

export function saveUserProgress(
  referralCode: string,
  data: UserProgressData
): void {
  if (typeof window === 'undefined' || !referralCode) return
  try {
    localStorage.setItem(progressStorageKey(referralCode), JSON.stringify(data))
  } catch {
    /* ignore */
  }
}

export function recordProfileVisit(referralCode: string): UserProgressData {
  const data = loadUserProgress(referralCode)
  data.visitCount += 1
  saveUserProgress(referralCode, data)
  return data
}

export function recordFortuneReading(
  referralCode: string,
  options?: { isTarot?: boolean }
): UserProgressData {
  const data = loadUserProgress(referralCode)
  data.totalReadings += 1
  if (options?.isTarot) data.tarotReadings += 1
  saveUserProgress(referralCode, data)
  return data
}

export function loadAttendanceDates(referralCode: string): string[] {
  if (typeof window === 'undefined' || !referralCode) return []
  try {
    const raw = localStorage.getItem(attendanceStorageKey(referralCode))
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function saveAttendanceDates(referralCode: string, dates: string[]): void {
  if (typeof window === 'undefined' || !referralCode) return
  try {
    localStorage.setItem(attendanceStorageKey(referralCode), JSON.stringify(dates.slice(-7)))
  } catch {
    /* ignore */
  }
}

/** Check in today; updates week streak (resets when calendar week changes). */
export function computeWeekStreakFromDates(dates: string[]): number {
  const currentWeek = getWeekKey()
  const inWeek = dates.filter((d) => getWeekKey(new Date(d)) === currentWeek)
  if (inWeek.length === 0) return 0

  let streak = 0
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    if (inWeek.includes(d.toDateString())) {
      streak++
    } else {
      break
    }
  }
  return Math.min(7, streak)
}

export function recordAttendanceCheck(referralCode: string): {
  dates: string[]
  progress: UserProgressData
  todayChecked: boolean
} {
  const today = new Date().toDateString()
  const dates = loadAttendanceDates(referralCode)
  if (dates.includes(today)) {
    return { dates, progress: loadUserProgress(referralCode), todayChecked: true }
  }

  const newDates = [...dates, today].slice(-7)
  saveAttendanceDates(referralCode, newDates)

  const progress = loadUserProgress(referralCode)
  const currentWeek = getWeekKey()
  if (progress.weekKey !== currentWeek) {
    progress.weekKey = currentWeek
    progress.weekStreak = 0
  }

  progress.weekStreak = computeWeekStreakFromDates(newDates)
  saveUserProgress(referralCode, progress)

  return { dates: newDates, progress, todayChecked: true }
}

export const LEVEL_THRESHOLDS = [
  { level: 1, minPoints: 10000 },
  { level: 2, minPoints: 5000 },
  { level: 3, minPoints: 2000 },
  { level: 4, minPoints: 1000 },
  { level: 5, minPoints: 500 },
  { level: 6, minPoints: 0 },
] as const

export function computeLevelFromPoints(points: number): {
  level: number
  nextLevelPoints: number
} {
  const sorted = [...LEVEL_THRESHOLDS].sort((a, b) => b.minPoints - a.minPoints)
  let current = sorted[sorted.length - 1]
  for (const tier of sorted) {
    if (points >= tier.minPoints) {
      current = tier
      break
    }
  }
  const betterTiers = sorted.filter((t) => t.minPoints > current.minPoints)
  const nextBetter = betterTiers.length
    ? betterTiers[betterTiers.length - 1]
    : null
  const nextLevelPoints = nextBetter ? nextBetter.minPoints : current.minPoints + 10000
  return { level: current.level, nextLevelPoints }
}

export type AchievementView = {
  id: string
  progress: number
  maxProgress: number
  completed: boolean
}

export function computeAchievements(
  progress: UserProgressData,
  referralCount: number
): AchievementView[] {
  const p1 = Math.min(progress.totalReadings >= 1 ? 1 : 0, 1)
  const p2 = Math.min(progress.tarotReadings, 5)
  const p3 = Math.min(progress.weekStreak, 7)
  const p4 = Math.min(progress.totalReadings, 50)
  const p5 = Math.min(referralCount, 10)
  const p6 = Math.min(progress.visitCount, 5)

  return [
    { id: '1', progress: p1, maxProgress: 1, completed: p1 >= 1 },
    { id: '2', progress: p2, maxProgress: 5, completed: p2 >= 5 },
    { id: '3', progress: p3, maxProgress: 7, completed: p3 >= 7 },
    { id: '4', progress: p4, maxProgress: 50, completed: p4 >= 50 },
    { id: '5', progress: p5, maxProgress: 10, completed: p5 >= 10 },
    { id: '6', progress: p6, maxProgress: 5, completed: p6 >= 5 },
  ]
}

export const REFERRAL_TIER_REQUIREMENTS = [1, 5, 10, 50] as const

/** People still needed until the next referral tier. */
export function getNextReferralTierRemaining(referralCount: number): number {
  for (const required of REFERRAL_TIER_REQUIREMENTS) {
    if (referralCount < required) return required - referralCount
  }
  return 0
}
