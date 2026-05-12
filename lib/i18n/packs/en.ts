import { enPackA } from './en-a'
import { enPackB } from './en-b'
import { enPackC } from './en-c'
import { enPackD } from './en-d'
import { uiOverlayEn } from './ui-overlay-en'

export const enMessages: Record<string, string> = {
  ...enPackA,
  ...enPackB,
  ...enPackC,
  ...enPackD,
  ...uiOverlayEn,
}
