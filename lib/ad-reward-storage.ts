/** Daily ad-reward watch limit (profile bonus roulette / pick draw). */
export const DAILY_AD_REWARD_LIMIT = 5

const KEYS = {
  date: 'adRewardDate',
  watchCount: 'adRewardWatchCount',
  remaining: 'adRewardRemainingCount',
  lastAt: 'lastAdRewardAt',
  /** @deprecated legacy */
  legacyDate: 'lastRewardDate',
  /** @deprecated legacy */
  legacyCount: 'dailyRewardCount',
} as const

export type AdRewardState = {
  date: string
  watchCount: number
  remainingCount: number
  lastAdRewardAt: string | null
}

/** Local calendar day YYYY-MM-DD (stable across refresh; not locale-dependent). */
export function getLocalCalendarDay(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseWatchCount(raw: string | null): number {
  const n = parseInt(raw ?? '', 10)
  if (!Number.isFinite(n) || n < 0) return 0
  return Math.min(n, DAILY_AD_REWARD_LIMIT)
}

function remainingFromWatchCount(watchCount: number): number {
  return Math.max(0, DAILY_AD_REWARD_LIMIT - watchCount)
}

function persist(state: AdRewardState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEYS.date, state.date)
  localStorage.setItem(KEYS.watchCount, String(state.watchCount))
  localStorage.setItem(KEYS.remaining, String(state.remainingCount))
  if (state.lastAdRewardAt) {
    localStorage.setItem(KEYS.lastAt, state.lastAdRewardAt)
  }
  // Keep legacy keys in sync for any older reads
  localStorage.setItem(KEYS.legacyCount, String(state.watchCount))
  localStorage.setItem(KEYS.legacyDate, state.date)
}

function readRawFromStorage(): {
  date: string | null
  watchCount: number
  lastAt: string | null
} {
  if (typeof window === 'undefined') {
    return { date: null, watchCount: 0, lastAt: null }
  }

  let date = localStorage.getItem(KEYS.date)
  let watchCount = parseWatchCount(localStorage.getItem(KEYS.watchCount))
  let lastAt = localStorage.getItem(KEYS.lastAt)

  const legacyCountRaw = localStorage.getItem(KEYS.legacyCount)
  const legacyDateRaw = localStorage.getItem(KEYS.legacyDate)

  if (date == null && (legacyCountRaw != null || legacyDateRaw != null)) {
    const legacyCount = parseWatchCount(legacyCountRaw)
    const today = getLocalCalendarDay()
    const legacyIsToday =
      legacyDateRaw === today ||
      legacyDateRaw === new Date().toDateString()

    if (legacyIsToday) {
      date = today
      watchCount = legacyCount
    } else if (legacyDateRaw) {
      date = today
      watchCount = 0
    } else if (legacyCount > 0) {
      // Count without date: treat as today to avoid wiping progress on upgrade
      date = today
      watchCount = legacyCount
    }
  }

  if (date == null && watchCount > 0) {
    date = getLocalCalendarDay()
  }

  return { date, watchCount, lastAt }
}

/** Load persisted ad reward state; resets watch count only when the calendar day changes. */
export function loadAdRewardState(): AdRewardState {
  const today = getLocalCalendarDay()
  const raw = readRawFromStorage()

  if (raw.date !== today) {
    const fresh: AdRewardState = {
      date: today,
      watchCount: 0,
      remainingCount: DAILY_AD_REWARD_LIMIT,
      lastAdRewardAt: null,
    }
    persist(fresh)
    return fresh
  }

  const state: AdRewardState = {
    date: today,
    watchCount: raw.watchCount,
    remainingCount: remainingFromWatchCount(raw.watchCount),
    lastAdRewardAt: raw.lastAt,
  }
  persist(state)
  return state
}

/** Returns updated state if a watch slot remains; null if daily limit reached. */
export function incrementAdRewardWatch(): AdRewardState | null {
  const current = loadAdRewardState()
  if (current.watchCount >= DAILY_AD_REWARD_LIMIT) {
    return null
  }

  const watchCount = current.watchCount + 1
  const next: AdRewardState = {
    date: current.date,
    watchCount,
    remainingCount: remainingFromWatchCount(watchCount),
    lastAdRewardAt: new Date().toISOString(),
  }
  persist(next)
  return next
}

export function canWatchAdReward(state?: AdRewardState): boolean {
  const s = state ?? loadAdRewardState()
  return s.watchCount < DAILY_AD_REWARD_LIMIT
}
