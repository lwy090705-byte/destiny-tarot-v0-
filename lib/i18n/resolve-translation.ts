import type { Language } from '../i18n'
import { enMessages } from './packs/en'
import { getPagesMisc } from './pages-misc-i18n'

/**
 * Resolves a UI string without leaking Korean or English incorrectly.
 * Order (non-ko): localized pack (≠ Korean) → language misc → English pack → key.
 */
export function resolveTranslation(
  language: Language,
  pack: Record<string, string> | undefined,
  koPack: Record<string, string>,
  key: string
): string {
  if (language === 'ko') {
    const fromPack = pack?.[key]
    if (fromPack != null && fromPack !== '') return fromPack
    return koPack[key] ?? key
  }

  const koVal = koPack[key]
  const fromPack = pack?.[key]
  if (fromPack != null && fromPack !== '' && fromPack !== koVal) {
    return fromPack
  }

  const miscVal = getPagesMisc(language)[key]
  if (miscVal != null && miscVal !== '' && miscVal !== koVal) {
    return miscVal
  }

  const enVal = enMessages[key]
  if (enVal != null && enVal !== '') {
    return enVal
  }

  if (language !== 'en') {
    const enMisc = getPagesMisc('en')[key]
    if (enMisc != null && enMisc !== '') {
      return enMisc
    }
  }

  return key
}
