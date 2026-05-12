import { frPackA } from './fr-a'
import { frPackB } from './fr-b'
import { frPackC } from './fr-c'
import { frPackD } from './fr-d'
import { uiOverlayEn } from './ui-overlay-en'

export const frMessages: Record<string, string> = {
  ...frPackA,
  ...frPackB,
  ...frPackC,
  ...frPackD,
  ...uiOverlayEn,
}
