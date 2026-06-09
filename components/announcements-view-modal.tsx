'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useAnnouncement } from '@/lib/announcement-context'
import { WELCOME_ANNOUNCEMENT_ID } from '@/lib/update-announcement-content'
import {
  getLanguageTypographyClass,
  languageTypography,
} from '@/lib/language-typography'

const FEATURE_KEYS = [
  'updatePopup.feature1',
  'updatePopup.feature2',
  'updatePopup.feature3',
  'updatePopup.feature4',
  'updatePopup.feature5',
  'updatePopup.feature6',
] as const

interface AnnouncementsViewModalProps {
  isOpen: boolean
  onClose: () => void
}

function formatAnnouncementDate(language: string, iso: string): string {
  const date = new Date(iso)
  if (language === 'ko') {
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`
  }
  if (language === 'ja' || language === 'zh') {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
  return date.toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function AnnouncementsViewModal({ isOpen, onClose }: AnnouncementsViewModalProps) {
  const { t, language } = useLanguage()
  const { getLatestAnnouncement } = useAnnouncement()
  const [isClosing, setIsClosing] = useState(false)

  const langClass = getLanguageTypographyClass(language)
  const typo = languageTypography[language]

  const announcement = getLatestAnnouncement()

  const displayDate = useMemo(() => {
    if (!announcement) return formatAnnouncementDate(language, '2026-06-09T00:00:00.000Z')
    const iso =
      announcement.id === WELCOME_ANNOUNCEMENT_ID
        ? '2026-06-09T00:00:00.000Z'
        : announcement.createdAt
    return formatAnnouncementDate(language, iso)
  }, [announcement, language])

  if (!isOpen) return null

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    window.setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 220)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          background: 'linear-gradient(180deg, #fefcf8 0%, #f5f0ff 55%, #faf5ff 100%)',
          boxShadow: '0 8px 40px rgba(108, 43, 217, 0.18), 0 0 0 2px #d4af37',
          border: '2px solid #d4af37',
          fontFamily: typo.fontFamily,
          wordBreak: typo.wordBreak as 'keep-all' | 'normal',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('announcements.title')}
      >
        <div className={`relative px-4 py-3.5 ${langClass}`}>
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-lg px-1.5 py-1 text-[#5b21b6] hover:text-[#4c1d95] hover:bg-violet-100/60 transition-colors"
            aria-label={t('usageGuide.close')}
          >
            <span className="text-xs font-semibold leading-none">{t('usageGuide.close')}</span>
            <X className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
          </button>

          <div className="flex items-center justify-center gap-2 mb-2 pr-16">
            <h2
              className="text-lg font-extrabold text-[#4c1d95] text-center tracking-tight m-0"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.9)' }}
              suppressHydrationWarning
            >
              {t('announcements.title')}
            </h2>
            {announcement?.isNew && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                {t('updatePopup.newBadge')}
              </span>
            )}
          </div>

          <p
            className="text-sm font-bold text-[#5b21b6] leading-snug mb-1.5 text-center"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('updatePopup.title')}
          </p>

          {displayDate && (
            <p
              className="text-xs font-medium text-[#7c3aed] mb-3.5 text-center opacity-80"
              style={{ letterSpacing: typo.letterSpacing }}
              dir="ltr"
            >
              {displayDate}
            </p>
          )}

          <p
            className="text-sm font-bold text-[#5b21b6] mb-2 leading-snug"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('updatePopup.featuresTitle')}
          </p>

          <ul className="space-y-1.5 m-0 mb-3.5 p-0 list-none">
            {FEATURE_KEYS.map((key) => (
              <li
                key={key}
                className="text-sm font-medium text-[#3b0764] leading-[1.65] pl-0.5"
                style={{ letterSpacing: typo.letterSpacing }}
                suppressHydrationWarning
              >
                • {t(key)}
              </li>
            ))}
          </ul>

          <p
            className="text-sm font-medium text-[#3b0764] leading-[1.7] mb-3"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('updatePopup.pointsNotice')}
          </p>

          <p
            className="text-sm font-medium text-[#3b0764] leading-[1.7] mb-3"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('updatePopup.closing')}
          </p>

          <p
            className="text-sm font-medium text-[#3b0764] leading-[1.7] m-0"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('updatePopup.thanks')}.
          </p>
        </div>
      </div>
    </div>
  )
}
