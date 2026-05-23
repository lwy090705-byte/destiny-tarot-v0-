import type { LevelTierKey } from '@/lib/level-system'
import { MASTER_LEVEL_TITLE } from '@/lib/master-role'

export type LevelEmblemVariant = LevelTierKey | 'operator'

const KO_TITLE_TO_TIER: Record<string, LevelTierKey> = {
  마스터: 'master',
  현자: 'sage',
  해석자: 'reader',
  탐구자: 'explorer',
  수련생: 'trainee',
  숙련자: 'trainee',
  입문자: 'beginner',
}

const ICON_TYPE_BY_VARIANT: Record<LevelEmblemVariant, string> = {
  operator: 'gold_operator',
  master: 'gold_star',
  sage: 'silver_star',
  reader: 'bronze_star',
  explorer: 'gold_diamond',
  trainee: 'purple_diamond',
  beginner: 'orange_diamond',
}

export function emblemVariantToIconType(variant: LevelEmblemVariant): string {
  return ICON_TYPE_BY_VARIANT[variant]
}

const EN_TITLE_TO_TIER: Record<string, LevelTierKey> = {
  master: 'master',
  sage: 'sage',
  reader: 'reader',
  explorer: 'explorer',
  trainee: 'trainee',
  skilled: 'trainee',
  beginner: 'beginner',
}

/**
 * Map displayed level title (or operator) to level-system emblem variant.
 */
const LEVEL_NUMBER_TO_TIER: Record<number, LevelTierKey> = {
  1: 'master',
  2: 'sage',
  3: 'reader',
  4: 'explorer',
  5: 'trainee',
  6: 'beginner',
}

/** Map LV.1–6 (or operator) to emblem variant — shared by community & profile. */
export function levelNumberToEmblemVariant(
  level: number,
  isOperator: boolean
): LevelEmblemVariant {
  if (isOperator) return 'operator'
  return LEVEL_NUMBER_TO_TIER[level] ?? 'beginner'
}

export function resolveLevelTierKey(
  levelTitle: string,
  isOperator: boolean
): LevelEmblemVariant {
  if (isOperator) return 'operator'

  const trimmed = levelTitle.trim()
  if (trimmed === MASTER_LEVEL_TITLE || trimmed === '운영자') return 'operator'

  if (KO_TITLE_TO_TIER[trimmed]) return KO_TITLE_TO_TIER[trimmed]

  const lower = trimmed.toLowerCase()
  if (EN_TITLE_TO_TIER[lower]) return EN_TITLE_TO_TIER[lower]

  for (const [label, key] of Object.entries(KO_TITLE_TO_TIER)) {
    if (trimmed.includes(label)) return key
  }
  for (const [label, key] of Object.entries(EN_TITLE_TO_TIER)) {
    if (lower.includes(label)) return key
  }

  return 'beginner'
}
