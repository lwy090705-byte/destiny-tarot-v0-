import type { Language } from './i18n'

/** Languages that have dedicated fortune text pools in data files */
export type FortuneContentLanguage = 'ko' | 'en' | 'ja' | 'zh'

const fortuneContentLanguageMap: Record<Language, FortuneContentLanguage> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh',
  es: 'en',
  fr: 'en',
  de: 'en',
  pt: 'en',
  hi: 'en',
  vi: 'en',
  th: 'en',
}

/**
 * Maps app UI language to the fortune content language used by sentence pools.
 * Unsupported content languages fall back to English pools (existing behavior).
 */
export function getFortuneContentLanguage(lang: Language): FortuneContentLanguage {
  return fortuneContentLanguageMap[lang] ?? 'en'
}

/** Full label row for every supported UI language; use Korean as default fill where not localized yet */
export type FullLabelRow = Record<Language, string>

export function pickLabel(labels: FullLabelRow, language: Language): string {
  const contentLang = getFortuneContentLanguage(language)
  const tryOrder: Language[] = [language, contentLang, 'en', 'ko']
  for (const lang of tryOrder) {
    const v = labels[lang]
    if (typeof v === 'string' && v.trim().length > 0) return v
  }
  return labels.ko ?? ''
}

/** Build a row that repeats the same string for all languages (preserves meaning until translated) */
export function sameLabelInAllLanguages(text: string): FullLabelRow {
  return {
    ko: text,
    en: text,
    ja: text,
    zh: text,
    es: text,
    fr: text,
    de: text,
    pt: text,
    hi: text,
    vi: text,
    th: text,
  }
}
