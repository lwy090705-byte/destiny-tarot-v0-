import { uiOverlayFortunePt } from './ui-overlay-fortune-noncore'
import { uiOverlayMbtiPt } from './ui-overlay-mbti-locales'
import { uiOverlayPtLegal } from './ui-overlay-pt-legal'
import { uiOverlayPagesPt } from './ui-overlay-pages-locales'

/** Portuguese UI overlay (overrides English fallback in pt pack) */
export const uiOverlayPt: Record<string, string> = {
  ...uiOverlayFortunePt,
  ...uiOverlayMbtiPt,
  ...uiOverlayPtLegal,
  ...uiOverlayPagesPt,
}
