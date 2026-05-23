'use client'

import { LevelTierEmblemAvatar } from '@/components/level-tier-emblem'
import { OPERATOR_LEVEL } from '@/lib/level-system'
import type { LevelEmblemVariant } from '@/lib/resolve-level-tier-key'

type ProfileLevelDisplayProps = {
  level: number
  levelName: string
  isOperator: boolean
  /** Nickname pill badge (LV only) vs progress-bar label (LV + title) */
  mode: 'badge' | 'label'
}

type ProfileLevelAvatarProps = {
  variant: LevelEmblemVariant
  levelName: string
}

/** Circular profile slot — level emblem replaces default crystal-ball avatar. */
export function ProfileLevelAvatar({ variant, levelName }: ProfileLevelAvatarProps) {
  return (
    <div
      className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shrink-0 ring-2 ring-white/40"
      role="img"
      aria-label={levelName}
    >
      <LevelTierEmblemAvatar variant={variant} />
    </div>
  )
}

/**
 * Profile LV text — icons live in {@link ProfileLevelAvatar} only.
 * Operator badge: 👑 LV.0
 */
export function ProfileLevelDisplay({
  level,
  levelName,
  isOperator,
  mode,
}: ProfileLevelDisplayProps) {
  if (isOperator) {
    if (mode === 'badge') {
      return (
        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full inline-flex items-center gap-1">
          <span className="leading-none" aria-hidden>
            👑
          </span>
          <span>LV.{OPERATOR_LEVEL}</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1">
        <span className="leading-none" aria-hidden>
          👑
        </span>
        <span>
          LV.{OPERATOR_LEVEL} {levelName}
        </span>
      </span>
    )
  }

  if (mode === 'badge') {
    return (
      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
        LV.{level}
      </span>
    )
  }

  return (
    <span>
      LV.{level} {levelName}
    </span>
  )
}
