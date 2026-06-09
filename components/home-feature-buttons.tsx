'use client'

import { useLanguage } from '@/lib/language-context'

interface HomeFeatureButtonsProps {
  onUsageGuideClick: () => void
  onAnnouncementsClick: () => void
}

export function HomeFeatureButtons({
  onUsageGuideClick,
  onAnnouncementsClick,
}: HomeFeatureButtonsProps) {
  const { t, isLanguageReady } = useLanguage()

  if (!isLanguageReady) return null

  return (
    <div className="flex gap-[11px] mb-2">
      <button
        type="button"
        onClick={onUsageGuideClick}
        className="relative flex flex-1 items-center h-[52px] rounded-[19px] border-2 transition-all active:scale-[0.98] hover:brightness-[1.02]"
        style={{
          background: 'linear-gradient(180deg, #f8f4ff 0%, #ede9fe 100%)',
          borderColor: '#d4af37',
          boxShadow:
            '0 4px 14px rgba(108, 43, 217, 0.18), 0 2px 4px rgba(212, 175, 55, 0.12)',
        }}
        aria-label={t('home.buttons.usageGuide')}
      >
        <span className="absolute left-3.5 text-lg leading-none select-none" aria-hidden>
          📖
        </span>
        <span
          className="flex-1 text-center text-[15px] font-bold text-[#5b21b6]"
          suppressHydrationWarning
        >
          {t('home.buttons.usageGuide')}
        </span>
      </button>

      <button
        type="button"
        onClick={onAnnouncementsClick}
        className="relative flex flex-1 items-center h-[52px] rounded-[19px] border-2 transition-all active:scale-[0.98] hover:brightness-[1.02]"
        style={{
          background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
          borderColor: '#d4af37',
          boxShadow:
            '0 4px 14px rgba(190, 24, 93, 0.15), 0 2px 4px rgba(212, 175, 55, 0.12)',
        }}
        aria-label={t('home.buttons.announcements')}
      >
        <span className="absolute left-3.5 text-lg leading-none select-none" aria-hidden>
          📢
        </span>
        <span
          className="flex-1 text-center text-[15px] font-bold text-[#9d174d]"
          suppressHydrationWarning
        >
          {t('home.buttons.announcements')}
        </span>
      </button>
    </div>
  )
}
