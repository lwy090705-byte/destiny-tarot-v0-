import { frPackA } from './fr-a'
import { frPackB } from './fr-b'
import { frPackC } from './fr-c'
import { frPackD } from './fr-d'
import { uiOverlayFr } from './ui-overlay-fr'

export const frMessages: Record<string, string> = {
  ...frPackA,
  ...frPackB,
  ...frPackC,
  ...frPackD,
  ...uiOverlayFr,
}
