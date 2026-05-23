'use client'

import { useState, useEffect } from 'react'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { languages, translations, koTranslations, type Language } from '@/lib/i18n'
import { resolveTranslation } from '@/lib/i18n/resolve-translation'
import { useLanguage } from '@/lib/language-context'
import { getLocalizedTextDir } from '@/lib/language-typography'

type LanguageOnboardingModalProps = {
  isOpen: boolean
  onComplete: (lang: Language) => void
}

export function LanguageOnboardingModal({ isOpen, onComplete }: LanguageOnboardingModalProps) {
  const { t, language: currentLang } = useLanguage()
  const [selected, setSelected] = useState<Language>('ko')
  const previewTextDir = getLocalizedTextDir(selected)

  useEffect(() => {
    if (!isOpen) return
    const saved = localStorage.getItem('language') as Language | null
    if (saved && languages.some((l) => l.id === saved)) {
      setSelected(saved)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleContinue = () => {
    onComplete(selected)
  }

  const previewT = (key: string) => {
    if (selected === currentLang) return t(key)
    return resolveTranslation(selected, translations[selected], koTranslations, key)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[61] p-4" dir="ltr">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" dir="ltr">
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Languages className="h-8 w-8 text-white" />
            </div>
            <h2
              className="text-lg sm:text-xl font-bold mb-1 break-words leading-snug"
              dir={previewTextDir}
            >
              {previewT('onboarding.selectLanguage')}
            </h2>
            <p className="text-white/80 text-sm break-words" dir={previewTextDir}>
              {previewT('onboarding.selectLanguageHint')}
            </p>
          </div>
        </div>

        <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
          {languages.map((lang) => {
            const isSelected = lang.id === selected
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelected(lang.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-start text-sm font-medium transition-colors border-2"
                style={{
                  color: isSelected ? '#6c2bd9' : '#2d1b4e',
                  borderColor: isSelected ? 'rgba(108,43,217,0.45)' : 'rgba(0,0,0,0.06)',
                  background: isSelected
                    ? 'linear-gradient(90deg, #f3eeff, #ede9f8)'
                    : '#fff',
                  boxShadow: isSelected ? '0 4px 14px rgba(108,43,217,0.12)' : 'none',
                }}
              >
                <span className="text-xl shrink-0">{lang.flag}</span>
                <span className="truncate flex-1">{lang.label}</span>
                {isSelected && (
                  <span className="text-xs font-bold text-violet-600 shrink-0">✓</span>
                )}
              </button>
            )
          })}
        </div>

        <div className="p-4 pt-0">
          <Button
            type="button"
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-3 rounded-xl font-semibold text-base"
          >

            <span dir={previewTextDir}>{previewT('onboarding.continue')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
