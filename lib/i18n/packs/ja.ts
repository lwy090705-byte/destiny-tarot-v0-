import { jaPackA } from './ja-a'
import { jaPackB } from './ja-b'
import { jaPackC } from './ja-c'
import { jaPackD } from './ja-d'
import { uiOverlayJa } from './ui-overlay-ja'

export const jaMessages: Record<string, string> = {
  ...jaPackA,
  ...jaPackB,
  ...jaPackC,
  ...jaPackD,
  ...uiOverlayJa,
}
