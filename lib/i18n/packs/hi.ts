import { hiPackA } from './hi-a'
import { hiPackB } from './hi-b'
import { hiPackC } from './hi-c'
import { hiPackD } from './hi-d'
import { uiOverlayEn } from './ui-overlay-en'

export const hiMessages: Record<string, string> = {
  ...hiPackA,
  ...hiPackB,
  ...hiPackC,
  ...hiPackD,
  ...uiOverlayEn,
}
