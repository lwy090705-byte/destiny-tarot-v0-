import {
  profileIndicatesMaster,
  type AuthorProfileFields,
} from '@/lib/community-author-display'
import { computeLevelFromPoints } from '@/lib/user-progress'
import { isMasterNickname } from '@/lib/master-role'
import {
  levelNumberToEmblemVariant,
  resolveLevelTierKey,
  type LevelEmblemVariant,
} from '@/lib/resolve-level-tier-key'

export type ProfileEmblemInput = {
  nickname: string
  level: number
  levelTitle: string
  isOperatorNickname: boolean
  profile?: AuthorProfileFields | null
}

/** Resolve avatar emblem from profile fields + computed level. */
export function resolveProfileEmblemVariant(input: ProfileEmblemInput): LevelEmblemVariant {
  const { nickname, level, levelTitle, isOperatorNickname, profile } = input

  if (isOperatorNickname || isMasterNickname(nickname.trim())) return 'operator'
  if (profile && profileIndicatesMaster(profile)) return 'operator'

  const fromDbTitle = profile?.level_title?.trim()
  if (fromDbTitle) return resolveLevelTierKey(fromDbTitle, false)
  if (levelTitle.trim()) return resolveLevelTierKey(levelTitle, false)

  const dbLevel = profile?.level
  if (dbLevel != null && Number.isFinite(Number(dbLevel))) {
    const n = Math.floor(Number(dbLevel))
    if (n >= 1 && n <= 6) return levelNumberToEmblemVariant(n, false)
  }

  if (profile?.total_points != null && Number.isFinite(Number(profile.total_points))) {
    const { level: fromPoints } = computeLevelFromPoints(Number(profile.total_points))
    return levelNumberToEmblemVariant(fromPoints, false)
  }

  return levelNumberToEmblemVariant(level, false)
}
