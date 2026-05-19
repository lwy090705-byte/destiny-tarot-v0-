import { uiOverlayFortuneFr } from './ui-overlay-fortune-noncore'
import { uiOverlayMbtiFr } from './ui-overlay-mbti-locales'
import { uiOverlayFrLegal } from './ui-overlay-fr-legal'

/** French UI overlay (overrides English fallback in fr pack) */
export const uiOverlayFr: Record<string, string> = {
  ...uiOverlayFortuneFr,
  ...uiOverlayMbtiFr,
  ...uiOverlayFrLegal,
}
