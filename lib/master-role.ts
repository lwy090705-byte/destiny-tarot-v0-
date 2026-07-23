/** Designated master account nickname (trimmed, exact match). */
export const MASTER_NICKNAME = '대질주'

export const MASTER_LEVEL_TITLE = '운영자'
export const MASTER_ROLE = 'master'
export const OPERATOR_ROLE = 'operator'

export function isMasterNickname(nickname: string | undefined | null): boolean {
  return nickname?.trim().toLowerCase() === MASTER_NICKNAME.trim().toLowerCase()
}

export function getMasterPointsDisplay(language: string): string {
  if (language === 'ko') return '∞'
  return '∞'
}

export function getMasterPointsLabel(language: string): string {
  if (language === 'ko') return '무한'
  return 'Unlimited'
}
