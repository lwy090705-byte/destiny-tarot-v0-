import { uiOverlayFortuneDe } from './ui-overlay-fortune-noncore'
import { uiOverlayMbtiDe } from './ui-overlay-mbti-locales'
import { uiOverlayDeLegal } from './ui-overlay-de-legal'
import { uiOverlayPagesDe } from './ui-overlay-pages-locales'

/** German UI overlay (overrides English fallback in de pack) */
export const uiOverlayDe: Record<string, string> = {
  ...uiOverlayFortuneDe,
  ...uiOverlayMbtiDe,
  ...uiOverlayDeLegal,
  ...uiOverlayPagesDe,
}
