import { dePackA } from './de-a'
import { dePackB } from './de-b'
import { dePackC } from './de-c'
import { dePackD } from './de-d'
import { uiOverlayDe } from './ui-overlay-de'

export const deMessages: Record<string, string> = {
  ...dePackA,
  ...dePackB,
  ...dePackC,
  ...dePackD,
  ...uiOverlayDe,
}
