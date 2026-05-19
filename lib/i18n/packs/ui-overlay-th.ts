import { uiOverlayFortuneTh } from './ui-overlay-fortune-noncore'
import { uiOverlayMbtiTh } from './ui-overlay-mbti-locales'
import { uiOverlayThLegal } from './ui-overlay-th-legal'
import { uiOverlayThExtra } from './ui-overlay-th-extra'

/** Thai UI overlay (overrides English fallback in th pack) */
export const uiOverlayTh: Record<string, string> = {
  ...uiOverlayFortuneTh,
  ...uiOverlayMbtiTh,
  ...uiOverlayThLegal,
  ...uiOverlayThExtra,
}
