import { uiOverlayFortuneVi } from './ui-overlay-fortune-noncore'
import { uiOverlayMbtiVi } from './ui-overlay-mbti-locales'
import { uiOverlayViLegal } from './ui-overlay-vi-legal'
import { uiOverlayViExtra } from './ui-overlay-vi-extra'

/** Vietnamese UI overlay (overrides English fallback in vi pack) */
export const uiOverlayVi: Record<string, string> = {
  ...uiOverlayFortuneVi,
  ...uiOverlayMbtiVi,
  ...uiOverlayViLegal,
  ...uiOverlayViExtra,
}
