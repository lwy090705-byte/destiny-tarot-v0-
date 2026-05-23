import { getDefaultLevelTitle, getLevelTitleForProfile } from '@/lib/level-system'
import {
  emblemVariantToIconType,
  resolveLevelTierKey,
  type LevelEmblemVariant,
} from '@/lib/resolve-level-tier-key'
import {
  isMasterNickname,
  MASTER_LEVEL_TITLE,
  MASTER_ROLE,
  OPERATOR_ROLE,
} from '@/lib/master-role'

/** Fallback when profiles.level_title is empty. */
export const DEFAULT_LEVEL_TITLE = getDefaultLevelTitle()

export type AuthorProfileFields = {
  level?: number | null
  level_title?: string | null
  role?: string | null
  is_master?: boolean | null
  total_points?: number | null
}

export type AuthorDisplayMeta = {
  levelTitle: string
  showCrown: boolean
  tierVariant: LevelEmblemVariant
  iconType: string
}

export function normalizeAuthorKey(author: string): string {
  return author.trim().toLowerCase()
}

export function profileIndicatesMaster(fields: AuthorProfileFields | undefined): boolean {
  if (!fields) return false
  return (
    fields.is_master === true ||
    fields.role === MASTER_ROLE ||
    fields.role === OPERATOR_ROLE
  )
}

/**
 * Resolve display title: master nickname → 운영자; else profile title; else default.
 */
export function resolveAuthorLevelTitle(
  author: string,
  profile: AuthorProfileFields | undefined,
  defaultTitle: string = DEFAULT_LEVEL_TITLE
): string {
  return getLevelTitleForProfile({
    nickname: author,
    level: profile?.level,
    level_title: profile?.level_title,
    total_points: profile?.total_points,
    is_master: profile?.is_master,
    role: profile?.role,
    defaultTitle,
  })
}

export function resolveAuthorDisplayMeta(
  author: string,
  profile: AuthorProfileFields | undefined,
  defaultTitle: string = DEFAULT_LEVEL_TITLE
): AuthorDisplayMeta {
  const showCrown =
    isMasterNickname(author.trim()) || profileIndicatesMaster(profile)
  const levelTitle = resolveAuthorLevelTitle(author, profile, defaultTitle)
  const tierVariant = resolveLevelTierKey(levelTitle, showCrown)
  const iconType = emblemVariantToIconType(tierVariant)
  return { levelTitle, showCrown, tierVariant, iconType }
}

export function logCommunityAuthorLevel(
  nickname: string,
  meta: AuthorDisplayMeta,
  source: 'profile' | 'fallback' = 'profile'
): void {
  console.log('[community-level]', {
    nickname: nickname.trim(),
    level_title: meta.levelTitle,
    icon: meta.iconType,
    tier: meta.tierVariant,
    source,
  })
}

/** @deprecated Use resolveAuthorDisplayMeta + AuthorMetaLine */
export function buildAuthorLabel(
  author: string,
  profileLevelTitle: string | null | undefined,
  defaultTitle: string = DEFAULT_LEVEL_TITLE
): string {
  const meta = resolveAuthorDisplayMeta(
    author,
    profileLevelTitle != null ? { level_title: profileLevelTitle } : undefined,
    defaultTitle
  )
  const nick = author.trim()
  const line = `${meta.levelTitle} ${nick}`
  return meta.showCrown ? `👑 ${line}` : line
}
