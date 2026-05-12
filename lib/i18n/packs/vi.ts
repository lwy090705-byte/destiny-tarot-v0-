import { viPackA } from './vi-a'
import { viPackB } from './vi-b'
import { viPackC } from './vi-c'
import { viPackD } from './vi-d'
import { uiOverlayEn } from './ui-overlay-en'

export const viMessages: Record<string, string> = {
  ...viPackA,
  ...viPackB,
  ...viPackC,
  ...viPackD,
  ...uiOverlayEn,
}
