import { dePackA } from './de-a'
import { dePackB } from './de-b'
import { dePackC } from './de-c'
import { dePackD } from './de-d'
import { uiOverlayEn } from './ui-overlay-en'

export const deMessages: Record<string, string> = {
  ...dePackA,
  ...dePackB,
  ...dePackC,
  ...dePackD,
  ...uiOverlayEn,
}
