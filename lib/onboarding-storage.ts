/** First-run: user explicitly chose app language (separate from default preview). */
export const LANGUAGE_ONBOARDING_COMPLETE_KEY = 'language-onboarding-complete'

export function isLanguageOnboardingComplete(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(LANGUAGE_ONBOARDING_COMPLETE_KEY) === 'true'
}

export function markLanguageOnboardingComplete(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LANGUAGE_ONBOARDING_COMPLETE_KEY, 'true')
}
