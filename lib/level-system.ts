import { computeLevelFromPoints, LEVEL_THRESHOLDS } from '@/lib/user-progress'
import { isMasterNickname, MASTER_LEVEL_TITLE } from '@/lib/master-role'

/** LV1 = highest tier (마스터), LV6 = 입문자 */
export const OPERATOR_LEVEL = 0

export type LevelTierKey =
  | 'master'
  | 'sage'
  | 'reader'
  | 'explorer'
  | 'trainee'
  | 'beginner'

export type LevelTierDefinition = {
  level: number
  key: LevelTierKey
  /** i18n key for title e.g. level.1 */
  titleKey: string
  /** i18n key for short description */
  descKey: string
  minPoints: number
  /** public path — SVG provided; replace with .png if needed */
  imagePath: string
  theme: {
    gradient: string
    badgeBg: string
    badgeText: string
    iconRing: string
    pointText: string
    borderActive: string
  }
}

export const LEVEL_TIERS: LevelTierDefinition[] = [
  {
    level: 1,
    key: 'master',
    titleKey: 'level.1',
    descKey: 'level.1.desc',
    minPoints: 10000,
    imagePath: '/levels/emblems/master.svg',
    theme: {
      gradient: 'from-amber-50 via-yellow-50 to-amber-100/80',
      badgeBg: 'bg-gradient-to-br from-amber-400 to-yellow-600',
      badgeText: 'text-white',
      iconRing: 'ring-amber-300/60',
      pointText: 'text-amber-700',
      borderActive: 'border-amber-400 ring-amber-200',
    },
  },
  {
    level: 2,
    key: 'sage',
    titleKey: 'level.2',
    descKey: 'level.2.desc',
    minPoints: 5000,
    imagePath: '/levels/emblems/sage.svg',
    theme: {
      gradient: 'from-blue-50 via-sky-50 to-blue-100/80',
      badgeBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      badgeText: 'text-white',
      iconRing: 'ring-blue-300/60',
      pointText: 'text-blue-700',
      borderActive: 'border-blue-400 ring-blue-200',
    },
  },
  {
    level: 3,
    key: 'reader',
    titleKey: 'level.3',
    descKey: 'level.3.desc',
    minPoints: 2000,
    imagePath: '/levels/emblems/reader.svg',
    theme: {
      gradient: 'from-orange-50 via-amber-50 to-orange-100/80',
      badgeBg: 'bg-gradient-to-br from-amber-700 to-orange-800',
      badgeText: 'text-amber-50',
      iconRing: 'ring-orange-300/60',
      pointText: 'text-orange-800',
      borderActive: 'border-orange-500 ring-orange-200',
    },
  },
  {
    level: 4,
    key: 'explorer',
    titleKey: 'level.4',
    descKey: 'level.4.desc',
    minPoints: 1000,
    imagePath: '/levels/emblems/explorer.svg',
    theme: {
      gradient: 'from-purple-50 via-violet-50 to-purple-100/80',
      badgeBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
      badgeText: 'text-white',
      iconRing: 'ring-purple-300/60',
      pointText: 'text-purple-700',
      borderActive: 'border-purple-400 ring-purple-200',
    },
  },
  {
    level: 5,
    key: 'trainee',
    titleKey: 'level.5',
    descKey: 'level.5.desc',
    minPoints: 500,
    imagePath: '/levels/emblems/trainee.svg',
    theme: {
      gradient: 'from-fuchsia-50 via-purple-50 to-pink-100/80',
      badgeBg: 'bg-gradient-to-br from-fuchsia-500 to-purple-500',
      badgeText: 'text-white',
      iconRing: 'ring-fuchsia-300/60',
      pointText: 'text-fuchsia-700',
      borderActive: 'border-fuchsia-400 ring-fuchsia-200',
    },
  },
  {
    level: 6,
    key: 'beginner',
    titleKey: 'level.6',
    descKey: 'level.6.desc',
    minPoints: 0,
    imagePath: '/levels/emblems/beginner.svg',
    theme: {
      gradient: 'from-sky-50 via-cyan-50 to-sky-100/80',
      badgeBg: 'bg-gradient-to-br from-sky-400 to-cyan-500',
      badgeText: 'text-white',
      iconRing: 'ring-sky-300/60',
      pointText: 'text-sky-700',
      borderActive: 'border-sky-400 ring-sky-200',
    },
  },
]

export const OPERATOR_TIER = {
  level: OPERATOR_LEVEL,
  title: MASTER_LEVEL_TITLE,
  descKey: 'level.operator.desc',
  imagePath: '/levels/level-operator.svg',
  theme: {
    gradient: 'from-amber-100 via-yellow-50 to-amber-200/90',
    badgeBg: 'bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600',
    badgeText: 'text-white',
    iconRing: 'ring-amber-400/70',
    pointText: 'text-amber-800',
    borderActive: 'border-amber-500 ring-2 ring-amber-300',
  },
}

export function getLevelTier(level: number): LevelTierDefinition | undefined {
  return LEVEL_TIERS.find((t) => t.level === level)
}

export function getLevelTitleForTier(level: number, t: (key: string) => string): string {
  const tier = getLevelTier(level)
  return tier ? t(tier.titleKey) : t('level.6')
}

/** Korean default title without translator (community fallback). */
export function getLevelTitleKo(level: number): string {
  const titles: Record<number, string> = {
    1: '마스터',
    2: '현자',
    3: '해석자',
    4: '탐구자',
    5: '수련생',
    6: '입문자',
  }
  return titles[level] ?? '입문자'
}

export function getDefaultLevelTitle(t?: (key: string) => string): string {
  return t ? t('level.6') : getLevelTitleKo(6)
}

export function getLevelTitleFromPoints(
  points: number,
  t?: (key: string) => string
): string {
  const { level } = computeLevelFromPoints(points)
  return t ? getLevelTitleForTier(level, t) : getLevelTitleKo(level)
}

export function getLevelTitleForProfile(params: {
  nickname: string
  level?: number | null
  level_title?: string | null
  total_points?: number | null
  is_master?: boolean | null
  role?: string | null
  defaultTitle?: string
  t?: (key: string) => string
}): string {
  const nick = params.nickname.trim()
  if (isMasterNickname(nick)) return MASTER_LEVEL_TITLE

  const fromProfile = params.level_title?.trim()
  if (fromProfile) return fromProfile

  const lv = params.level
  if (lv != null && Number.isFinite(Number(lv))) {
    const n = Math.floor(Number(lv))
    if (n >= 1 && n <= 6) {
      return params.t ? getLevelTitleForTier(n, params.t) : getLevelTitleKo(n)
    }
  }

  if (params.total_points != null && Number.isFinite(Number(params.total_points))) {
    return getLevelTitleFromPoints(Number(params.total_points), params.t)
  }

  return params.defaultTitle ?? (params.t ? params.t('level.6') : getLevelTitleKo(6))
}

/** Sync profiles.level_title from point total */
export function levelTitleForPoints(points: number): string {
  return getLevelTitleKo(computeLevelFromPoints(points).level)
}

export { LEVEL_THRESHOLDS, computeLevelFromPoints }
