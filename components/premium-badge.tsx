'use client'

import { useLanguage } from '@/lib/language-context'

type PremiumBadgeProps = {
  className?: string
}

export function PremiumBadge({ className = '' }: PremiumBadgeProps) {
  const { t } = useLanguage()
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-sm ${className}`}
    >
      {t('userProfile.premiumBadge')}
    </span>
  )
}
