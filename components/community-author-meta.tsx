'use client'

import { useEffect, type ReactNode } from 'react'
import {
  logCommunityAuthorLevel,
  type AuthorDisplayMeta,
} from '@/lib/community-author-display'
import { LevelTierEmblemBadge } from '@/components/level-tier-emblem'
import { useLanguage } from '@/lib/language-context'
import { translateLevelTitle } from '@/lib/level-system'

type CommunityAuthorMetaProps = {
  author: string
  date?: string
  meta: AuthorDisplayMeta
  /** text-xs for cards, text-sm for comments */
  size?: 'xs' | 'sm'
  className?: string
  trailing?: ReactNode
}

export function CommunityAuthorMeta({
  author,
  date,
  meta,
  size = 'xs',
  className = '',
  trailing,
}: CommunityAuthorMetaProps) {
  const { t } = useLanguage()
  const nick = author.trim()
  const titleClass = size === 'sm' ? 'text-sm' : 'text-xs'
  const nickClass = size === 'sm' ? 'text-sm' : 'text-xs'
  // Always translate at render from raw/DB title — never show stored locale string
  const displayTitle = translateLevelTitle(meta.levelTitle, t)

  const emblemSize = size === 'sm' ? 'sm' : 'md'

  useEffect(() => {
    logCommunityAuthorLevel(author, { ...meta, levelTitle: displayTitle })
  }, [author, displayTitle, meta.iconType, meta.tierVariant])

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0 ${className}`}>
      <LevelTierEmblemBadge variant={meta.tierVariant} size={emblemSize} className="self-center" />
      <span className={`${titleClass} font-medium text-gray-600 shrink-0`}>{displayTitle}</span>
      <span className={`${nickClass} font-medium text-gray-800 truncate`}>{nick}</span>
      {date != null && date !== '' && (
        <span className={`${titleClass} text-gray-400 shrink-0`}>{date}</span>
      )}
      {trailing}
    </div>
  )
}
