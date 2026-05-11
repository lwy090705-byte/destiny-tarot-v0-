"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"
import { injectLanguageTypographyStyles, getLanguageTypographyClass } from "@/lib/language-typography"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ko',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ko')
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Initialize on mount - read from localStorage or use default 'ko'
  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem('language') as Language | null
    const langToUse = saved || 'ko'
    setLanguageState(langToUse)
    applyLanguageStyles(langToUse)
    if (!saved) {
      localStorage.setItem('language', 'ko')
    }
  }, [])

  // On every route change, re-read language from localStorage and re-apply styles
  useEffect(() => {
    if (isMounted) {
      const savedLanguage = localStorage.getItem('language') as Language | null
      const langToUse = savedLanguage || 'ko'
      setLanguageState(langToUse)
      applyLanguageStyles(langToUse)
      // Force re-render by dispatching a custom event
      window.dispatchEvent(new CustomEvent('languageRouteChange', { detail: { pathname, language: langToUse } }))
    }
  }, [pathname, isMounted])

  // Re-apply styles when language state changes
  useEffect(() => {
    if (isMounted) {
      applyLanguageStyles(language)
    }
  }, [language, isMounted])

  const applyLanguageStyles = (lang: Language) => {
    injectLanguageTypographyStyles(lang)
    document.documentElement.lang = lang
    document.documentElement.setAttribute('data-lang', lang)
    const htmlElement = document.documentElement
    htmlElement.className = htmlElement.className.replace(/lang-\w+/, '')
    htmlElement.classList.add(getLanguageTypographyClass(lang))
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    applyLanguageStyles(lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations['ko']?.[key] ?? key
  }

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
