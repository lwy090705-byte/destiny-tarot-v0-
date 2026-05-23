"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { ALL_LANGUAGES, translations, koTranslations } from "@/lib/i18n"
import { resolveTranslation } from "@/lib/i18n/resolve-translation"
import {
  injectLanguageTypographyStyles,
  getLanguageTypographyClass,
} from "@/lib/language-typography"
import {
  isLanguageOnboardingComplete,
  markLanguageOnboardingComplete,
} from "@/lib/onboarding-storage"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isLanguageReady: boolean
  hasCompletedLanguageOnboarding: boolean
  completeLanguageOnboarding: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ko',
  setLanguage: () => {},
  t: (key) => key,
  isLanguageReady: false,
  hasCompletedLanguageOnboarding: false,
  completeLanguageOnboarding: () => {},
})

function readSavedLanguage(): Language | null {
  if (typeof window === 'undefined') return null
  const saved = localStorage.getItem('language') as Language | null
  return saved && (ALL_LANGUAGES as readonly string[]).includes(saved) ? saved : null
}

function migrateLanguageOnboardingIfReturningUser(): boolean {
  if (isLanguageOnboardingComplete()) return true
  try {
    const raw = localStorage.getItem('fortune-app-user')
    if (!raw) return false
    const parsed = JSON.parse(raw) as { nickname?: string }
    if (parsed.nickname?.trim()) {
      markLanguageOnboardingComplete()
      return true
    }
  } catch {
    /* ignore */
  }
  return false
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ko')
  const [isMounted, setIsMounted] = useState(false)
  const [hasCompletedLanguageOnboarding, setHasCompletedLanguageOnboarding] = useState(false)
  const pathname = usePathname()

  const applyLanguageStyles = useCallback((lang: Language) => {
    injectLanguageTypographyStyles(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = 'ltr'
    document.documentElement.setAttribute('data-lang', lang)
    const htmlElement = document.documentElement
    htmlElement.className = htmlElement.className.replace(/lang-\w+/, '')
    htmlElement.classList.add(getLanguageTypographyClass(lang))
  }, [])

  useEffect(() => {
    setIsMounted(true)
    const onboardingDone = migrateLanguageOnboardingIfReturningUser()
    const saved = readSavedLanguage()
    const langToUse = onboardingDone && saved ? saved : 'ko'

    setHasCompletedLanguageOnboarding(onboardingDone)
    setLanguageState(langToUse)
    applyLanguageStyles(langToUse)
  }, [applyLanguageStyles])

  useEffect(() => {
    if (!isMounted || !hasCompletedLanguageOnboarding) return
    const saved = readSavedLanguage()
    if (saved) {
      setLanguageState(saved)
      applyLanguageStyles(saved)
    }
  }, [pathname, isMounted, hasCompletedLanguageOnboarding, applyLanguageStyles])

  useEffect(() => {
    if (isMounted) {
      applyLanguageStyles(language)
    }
  }, [language, isMounted, applyLanguageStyles])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    applyLanguageStyles(lang)
  }

  const completeLanguageOnboarding = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    markLanguageOnboardingComplete()
    setHasCompletedLanguageOnboarding(true)
    applyLanguageStyles(lang)
  }

  const t = (key: string): string => {
    return resolveTranslation(language, translations[language], koTranslations, key)
  }

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isLanguageReady: isMounted,
        hasCompletedLanguageOnboarding,
        completeLanguageOnboarding,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
