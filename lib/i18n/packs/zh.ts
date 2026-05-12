import { zhPackA } from './zh-a'
import { zhPackB } from './zh-b'
import { zhPackC } from './zh-c'
import { zhPackD } from './zh-d'
import { uiOverlayZh } from './ui-overlay-zh'

export const zhMessages: Record<string, string> = {
  ...zhPackA,
  ...zhPackB,
  ...zhPackC,
  ...zhPackD,
  ...uiOverlayZh,
}
