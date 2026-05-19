import { hiPackA } from './hi-a'
import { hiPackB } from './hi-b'
import { hiPackC } from './hi-c'
import { hiPackD } from './hi-d'
import { uiOverlayEn } from './ui-overlay-en'
import { uiOverlayHiLegal } from './ui-overlay-hi-legal'
import { uiOverlayMbtiHi } from './ui-overlay-mbti-locales'
import { uiOverlayFortuneHi } from './ui-overlay-fortune-noncore'
import { uiOverlayPagesHi } from './ui-overlay-pages-locales'

export const hiMessages: Record<string, string> = {
  ...hiPackA,
  ...hiPackB,
  ...hiPackC,
  ...hiPackD,
  ...uiOverlayEn,
  ...uiOverlayHiLegal,
  ...uiOverlayMbtiHi,
  ...uiOverlayFortuneHi,
  ...uiOverlayPagesHi,
}
