import { idPackA } from './id-a'
import { idPackB } from './id-b'
import { idPackC } from './id-c'
import { idPackD } from './id-d'
import { uiOverlayEn } from './ui-overlay-en'
import { uiOverlayId } from './ui-overlay-id'

export const idMessages: Record<string, string> = {
  ...idPackA,
  ...idPackB,
  ...idPackC,
  ...idPackD,
  ...uiOverlayEn,
  ...uiOverlayId, // Indonesian overrides (fortune, tarot, MBTI, profile)
}