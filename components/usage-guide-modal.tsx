'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import {
  getLanguageTypographyClass,
  languageTypography,
} from '@/lib/language-typography'

const GUIDE_BLOCKS = [
  {
    icon: '🌙',
    labelKey: 'usageGuide.myungliLabel',
    descKey: 'usageGuide.myungliDesc',
  },
  {
    icon: '☀️',
    labelKey: 'usageGuide.dailyLabel',
    descKey: 'usageGuide.dailyDesc',
  },
  {
    icon: '💕',
    labelKey: 'usageGuide.compatibilityLabel',
    descKey: 'usageGuide.compatibilityDesc',
  },
  {
    icon: '🔮',
    labelKey: 'usageGuide.tarotLabel',
    descKey: 'usageGuide.tarotDesc',
  },
  {
    icon: '🧩',
    labelKey: 'usageGuide.mbtiLabel',
    descKey: 'usageGuide.mbtiDesc',
  },
  {
    icon: '📢',
    labelKey: 'usageGuide.noticeLabel',
    descKey: 'usageGuide.noticeDesc',
  },
] as const

interface UsageGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UsageGuideModal({ isOpen, onClose }: UsageGuideModalProps) {
  const { t, language } = useLanguage()
  const [isClosing, setIsClosing] = useState(false)

  const langClass = getLanguageTypographyClass(language)
  const typo = languageTypography[language]

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
        aria-label={t('usageGuide.title')}
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

          <h2
            className="text-lg font-extrabold text-[#4c1d95] mb-2.5 text-center tracking-tight pr-16"
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.9)' }}
            suppressHydrationWarning
          >
            {t('usageGuide.title')}
          </h2>

          <p
            className="text-sm font-medium text-[#3b0764] leading-relaxed mb-3.5"
            style={{ letterSpacing: typo.letterSpacing }}
            suppressHydrationWarning
          >
            {t('usageGuide.intro')}
          </p>

          <ul className="space-y-3.5 m-0 p-0 list-none">
            {GUIDE_BLOCKS.map(({ icon, labelKey, descKey }) => (
              <li key={labelKey}>
                <p
                  className="text-sm font-bold text-[#5b21b6] m-0 leading-snug"
                  style={{ letterSpacing: typo.letterSpacing }}
                  suppressHydrationWarning
                >
                  <span className="mr-1" aria-hidden>{icon}</span>
                  {t(labelKey)}
                </p>
                <p
                  className="text-sm font-medium text-[#3b0764] m-0 mt-1.5 pl-0.5 leading-[1.65]"
                  style={{ letterSpacing: typo.letterSpacing }}
                  suppressHydrationWarning
                >
                  {t(descKey)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
