import { insertPointTransaction } from '@/lib/supabase-points'
import {
  computeAchievements,
  loadUserProgress,
  type UserProgressData,
} from '@/lib/user-progress'

/** Point rewards granted once per completed achievement (id 5 is premium — claim only, no points). */
export const ACHIEVEMENT_POINT_REWARDS: Record<string, number> = {
  '1': 50,
  '2': 100,
  '3': 200,
  '4': 500,
  '6': 150,
}

const CLAIMED_KEY_PREFIX = 'fortune-achievement-claimed:'

function claimedStorageKey(referralCode: string): string {
  return `${CLAIMED_KEY_PREFIX}${referralCode.trim().toUpperCase()}`
}

export function loadClaimedAchievementIds(referralCode: string): string[] {
  if (typeof window === 'undefined' || !referralCode) return []
  try {
    const raw = localStorage.getItem(claimedStorageKey(referralCode))
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.map(String) : []
  } catch {
    return []
  }
}

export function saveClaimedAchievementIds(referralCode: string, ids: string[]): void {
  if (typeof window === 'undefined' || !referralCode) return
  try {
    localStorage.setItem(claimedStorageKey(referralCode), JSON.stringify([...new Set(ids)]))
  } catch {
    /* ignore */
  }
}

/**
 * Grant Supabase points for newly completed achievements (once per id).
 * Returns ids that were newly claimed.
 */
export async function grantCompletedAchievementRewards(options: {
  referralCode: string
  nickname: string
  referralCount: number
  progress?: UserProgressData
}): Promise<string[]> {
  const { referralCode, nickname, referralCount } = options
  const nick = nickname.trim()
  if (!referralCode || !nick) return []

  const progress = options.progress ?? loadUserProgress(referralCode)
  const views = computeAchievements(progress, referralCount)
  const claimed = new Set(loadClaimedAchievementIds(referralCode))
  const newlyClaimed: string[] = []

  for (const view of views) {
    if (!view.completed || claimed.has(view.id)) continue

    claimed.add(view.id)
    newlyClaimed.push(view.id)

    const points = ACHIEVEMENT_POINT_REWARDS[view.id]
    if (points && points > 0) {
      const ok = await insertPointTransaction({
        nickname: nick,
        point_type: 'achievement_reward',
        amount: points,
        description: `Achievement ${view.id} reward (+${points}P)`,
      })
      if (ok) {
        console.log('[achievement] reward grant success', { id: view.id, points })
      } else {
        console.error('[achievement] reward grant failed', { id: view.id, points })
      }
    }
  }

  if (newlyClaimed.length > 0) {
    saveClaimedAchievementIds(referralCode, [...claimed])
  }

  return newlyClaimed
}
