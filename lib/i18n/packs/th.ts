import { thPackA } from './th-a'
import { thPackB } from './th-b'
import { thPackC } from './th-c'
import { thPackD } from './th-d'
import { uiOverlayTh } from './ui-overlay-th'

export const thMessages: Record<string, string> = {
  ...thPackA,
  ...thPackB,
  ...thPackC,
  ...thPackD,
  ...uiOverlayTh,
}
