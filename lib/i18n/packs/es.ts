import { esPackA } from './es-a'
import { esPackB } from './es-b'
import { esPackC } from './es-c'
import { esPackD } from './es-d'
import { uiOverlayEn } from './ui-overlay-en'
import { uiOverlayEs } from './ui-overlay-es'

export const esMessages: Record<string, string> = {
  ...esPackA,
  ...esPackB,
  ...esPackC,
  ...esPackD,
  ...uiOverlayEn,
  ...uiOverlayEs, // Spanish overrides (fortune, tarot, MBTI, profile)
}
