/**
 * Test / shared entry for multilingual helpers used by MBTI and fortune flows.
 * Re-exports stable label resolution without pulling UI components into tests.
 */
export {
  pickLabel,
  sameLabelInAllLanguages,
  getFortuneContentLanguage,
  type FortuneContentLanguage,
  type FullLabelRow,
} from '@/lib/fortune-generator'
