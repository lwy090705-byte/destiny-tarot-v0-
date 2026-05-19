import { ptPackA } from './pt-a'
import { ptPackB } from './pt-b'
import { ptPackC } from './pt-c'
import { ptPackD } from './pt-d'
import { uiOverlayEn } from './ui-overlay-en'
import { uiOverlayPt } from './ui-overlay-pt'

export const ptMessages: Record<string, string> = {
  ...ptPackA,
  ...ptPackB,
  ...ptPackC,
  ...ptPackD,
  ...uiOverlayEn,
  ...uiOverlayPt,
}
