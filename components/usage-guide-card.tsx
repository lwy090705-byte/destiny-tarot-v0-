'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { safeStorage } from '@/lib/safe-storage'
import {
  getLanguageTypographyClass,
  languageTypography,
} from '@/lib/language-typography'

const DISMISS_STORAGE_KEY = 'usage-guide-dismissed'

const GUIDE_BLOCKS = [
  {
    labelKey: 'usageGuide.sajuDailyCompatLabel',
    descKey: 'usageGuide.sajuDailyCompatDesc',
  },
  {
    labelKey: 'usageGuide.tarotLabel',
    descKey: 'usageGuide.tarotDesc',
  },
  {
    labelKey: 'usageGuide.mbtiLabel',
    descKey: 'usageGuide.mbtiDesc',
  },
] as const

export function UsageGuideCard() {
  const { t, isLanguageReady, language } = useLanguage()
  const [hydrated, setHydrated] = useState(false)
  const [visible, setVisible] = useState(true)
  const [closing, setClosing] = useState(false)

  const langClass = getLanguageTypographyClass(language)
  const typo = languageTypography[language]

  useEffect(() => {
    setHydrated(true)
    const dismissed = safeStorage.getItem<boolean>(DISMISS_STORAGE_KEY, false)
    setVisible(!dismissed)
  }, [])

  const handleClose = () => {
    if (closing) return
    setClosing(true)
    window.setTimeout(() => {
      safeStorage.setItem(DISMISS_STORAGE_KEY, true)
      setVisible(false)
    }, 220)
  }

  if (!hydrated || !visible || !isLanguageReady) return null

  return (
    <section
      className={`rounded-3xl px-4 py-3.5 mb-2 overflow-hidden transition-all duration-200 ease-out ${
        closing ? 'opacity-0 max-h-0 !py-0 !mb-0 pointer-events-none' : 'opacity-100 max-h-[640px]'
      }`}
      style={{
        background: 'linear-gradient(180deg, #fefcf8 0%, #f5f0ff 55%, #faf5ff 100%)',
        boxShadow: '0 8px 40px rgba(108, 43, 217, 0.18), 0 0 0 2px #d4af37',
        border: '2px solid #d4af37',
        fontFamily: typo.fontFamily,
        wordBreak: typo.wordBreak as 'keep-all' | 'normal',
      }}
      aria-label={t('usageGuide.title')}
    >
      <div className={`relative ${langClass}`}>
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-0 top-0 z-10 flex items-center gap-1 rounded-lg px-1.5 py-1 text-[#5b21b6] hover:text-[#4c1d95] hover:bg-violet-100/60 transition-colors"
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
          className="text-sm font-medium text-[#3b0764] leading-relaxed mb-3"
          style={{ letterSpacing: typo.letterSpacing }}
          suppressHydrationWarning
        >
          {t('usageGuide.intro')}
        </p>

        <ul className="space-y-2.5 m-0 p-0 list-none">
          {GUIDE_BLOCKS.map(({ labelKey, descKey }) => (
            <li key={labelKey}>
              <p
                className="text-sm font-bold text-[#5b21b6] m-0 leading-snug"
                style={{ letterSpacing: typo.letterSpacing }}
                suppressHydrationWarning
              >
                • {t(labelKey)}
              </p>
              <p
                className="text-sm font-medium text-[#3b0764] m-0 mt-1 pl-3 leading-relaxed"
                style={{ letterSpacing: typo.letterSpacing }}
                suppressHydrationWarning
              >
                {t(descKey)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
