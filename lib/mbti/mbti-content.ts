import type { Language } from '@/lib/i18n'
import { normalizeLanguage } from '@/lib/fortune-generator'
import {
  getFortuneContentLanguage,
  type FortuneContentLanguage,
} from '@/lib/fortune-generator'
import { mbtiMeta } from './mbti-meta'
import { mbtiProfilesEn } from './mbti-profiles-en'
import { mbtiProfilesKo } from './mbti-profiles-ko'
import { mbtiProfilesEs, mbtiProfilesId } from './mbti-profiles-es-id'
import mbtiProfilesPt from './mbti-profiles-pt'
import mbtiProfilesFr from './mbti-profiles-fr'
import mbtiProfilesDe from './mbti-profiles-de'
import mbtiProfilesVi from './mbti-profiles-vi'
import { mbtiProfilesTh } from './mbti-profiles-th'
import { mbtiProfilesHi } from './mbti-profiles-hi'
import { mbtiProfilesJa } from './mbti-profiles-ja'
import { mbtiProfilesZh } from './mbti-profiles-zh'
import { mbtiQuestionRows } from './mbti-questions-data'
import type { MBTIType, MbtiQuestion, MbtiTypeDisplay, MbtiTypeProfile } from './mbti-types'
import { MBTI_TYPES } from './mbti-types'

const warnedMissingMbtiProfiles = new Set<string>()

type MbtiContentLanguage = FortuneContentLanguage | 'hi'

const profileByLang: Record<MbtiContentLanguage, Record<MBTIType, MbtiTypeProfile>> = {
  ko: mbtiProfilesKo,
  en: mbtiProfilesEn,
  ja: mbtiProfilesJa,
  zh: mbtiProfilesZh,
  es: mbtiProfilesEs,
  id: mbtiProfilesId,
  pt: mbtiProfilesPt,
  fr: mbtiProfilesFr,
  de: mbtiProfilesDe,
  vi: mbtiProfilesVi,
  th: mbtiProfilesTh,
  hi: mbtiProfilesHi,
}

function getMbtiContentLanguage(language: Language | string): MbtiContentLanguage {
  if (normalizeLanguage(language) === 'hi') return 'hi'
  return getFortuneContentLanguage(language)
}

function pickMbtiProfile(type: MBTIType, language: Language | string): MbtiTypeProfile {
  const L = getMbtiContentLanguage(language)
  const direct = profileByLang[L]?.[type]
  if (direct) return direct
  const en = profileByLang.en[type]
  if (en) {
    if (L !== 'en') {
      const key = `${type}:${L}`
      if (!warnedMissingMbtiProfiles.has(key)) {
        warnedMissingMbtiProfiles.add(key)
        console.warn(`[mbti] Missing "${L}" profile for ${type}; falling back to English`)
      }
    }
    return en
  }
  return profileByLang.en[type] ?? profileByLang.ko[type]
}

export function getMbtiQuestions(language: Language | string): MbtiQuestion[] {
  const L = getMbtiContentLanguage(language)
  return mbtiQuestionRows.map((row) => {
    const loc = row.locales[L] ?? row.locales.en ?? (L === 'ko' ? row.locales.ko : row.locales.en)
    return {
      id: row.id,
      dimension: row.dimension,
      text: loc.text,
      optionA: loc.optionA,
      optionB: loc.optionB,
    }
  })
}

export function getMbtiTypeProfile(
  type: MBTIType,
  language: Language | string
): MbtiTypeProfile {
  return pickMbtiProfile(type, language)
}

export function getMbtiTypeDisplay(
  type: MBTIType,
  language: Language | string
): MbtiTypeDisplay {
  const profile = pickMbtiProfile(type, language)
  const meta = mbtiMeta[type]
  return { ...profile, ...meta }
}

export { MBTI_TYPES }
