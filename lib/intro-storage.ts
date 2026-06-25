import { getLocalCalendarDay } from './ad-reward-storage'

const INTRO_LAST_SHOWN_KEY = 'introLastShown'

/** True when intro has not been shown yet today (local calendar day). */
export function shouldShowIntroToday(): boolean {
  if (typeof window === 'undefined') return false
  const last = localStorage.getItem(INTRO_LAST_SHOWN_KEY)
  return last !== getLocalCalendarDay()
}

export function markIntroShownToday(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(INTRO_LAST_SHOWN_KEY, getLocalCalendarDay())
}
