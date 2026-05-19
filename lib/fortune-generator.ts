import type { Language } from './i18n'

/** Languages that have dedicated fortune text pools in data files */
export type FortuneContentLanguage =
  | 'ko'
  | 'en'
  | 'ja'
  | 'zh'
  | 'es'
  | 'id'
  | 'hi'
  | 'pt'
  | 'fr'
  | 'de'
  | 'vi'
  | 'th'

const fortuneContentLanguageMap: Record<Language, FortuneContentLanguage> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh',
  es: 'es',
  id: 'id',
  pt: 'pt',
  fr: 'fr',
  de: 'de',
  hi: 'hi',
  vi: 'vi',
  th: 'th',
}

const warnedMissingPools = new Set<string>()

/**
 * Normalizes any app language code to a supported Language value.
 * Unknown codes fall back to English (not Korean).
 */
export function normalizeLanguage(lang: string | undefined | null): Language {
  if (lang && lang in fortuneContentLanguageMap) {
    return lang as Language
  }
  return 'en'
}

/**
 * Maps app UI language to the fortune content language used by sentence pools.
 * Languages without dedicated pools fall back to English.
 */
export function getFortuneContentLanguage(lang: Language | string): FortuneContentLanguage {
  return fortuneContentLanguageMap[normalizeLanguage(lang)] ?? 'en'
}

export type FortunePoolMap = Partial<Record<FortuneContentLanguage, string[]>>

/**
 * Picks a string array from a localized pool.
 * Order: selected content language → English → Korean.
 * Logs console.warn once per missing pool (never throws).
 */
export function pickFortunePool(
  pool: FortunePoolMap,
  language: Language | string,
  context?: string
): string[] {
  const L = getFortuneContentLanguage(language)
  if (pool[L]?.length) return pool[L]!
  if (pool.en?.length) {
    if (L !== 'en' && context) {
      const key = `${context}:${L}`
      if (!warnedMissingPools.has(key)) {
        warnedMissingPools.add(key)
        console.warn(`[fortune] Missing "${L}" pool for ${context}; falling back to English`)
      }
    }
    return pool.en
  }
  if (L === 'ko' && pool.ko?.length) return pool.ko
  if (context) {
    const key = `${context}:empty`
    if (!warnedMissingPools.has(key)) {
      warnedMissingPools.add(key)
      console.warn(`[fortune] Empty pool for ${context}`)
    }
  }
  return []
}

/** Picks a single string from a per-language record (e.g. fallback templates). */
export function pickFortuneString(
  row: Partial<Record<FortuneContentLanguage, string>>,
  language: Language | string,
  context?: string
): string {
  const L = getFortuneContentLanguage(language)
  const v = row[L]
  if (typeof v === 'string' && v.trim().length > 0) return v
  if (row.en?.trim()) {
    if (L !== 'en' && context) {
      const key = `${context}:${L}`
      if (!warnedMissingPools.has(key)) {
        warnedMissingPools.add(key)
        console.warn(`[fortune] Missing "${L}" string for ${context}; falling back to English`)
      }
    }
    return row.en
  }
  if (L === 'ko') return row.ko ?? ''
  return ''
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
    id: text,
    pt: text,
    fr: text,
    de: text,
    hi: text,
    vi: text,
    th: text,
  }
}
