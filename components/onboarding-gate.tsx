'use client'

import { useCallback } from 'react'
import type { Language } from '@/lib/i18n'
import { useLanguage } from '@/lib/language-context'
import { useUser } from '@/lib/user-context'
import type { NicknameValidationError } from '@/lib/nickname-validation'
import { LanguageOnboardingModal } from '@/components/language-onboarding-modal'
import { NicknameModal } from '@/components/nickname-modal'

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const {
    isLanguageReady,
    hasCompletedLanguageOnboarding,
    completeLanguageOnboarding,
  } = useLanguage()
  const { isHydrated: userHydrated, needsNickname, saveNickname } = useUser()

  const showLanguageOnboarding = isLanguageReady && !hasCompletedLanguageOnboarding
  const showNicknameOnboarding =
    isLanguageReady && hasCompletedLanguageOnboarding && userHydrated && needsNickname

  const handleLanguageComplete = useCallback(
    (lang: Language) => {
      completeLanguageOnboarding(lang)
    },
    [completeLanguageOnboarding]
  )

  const handleNicknameSave = useCallback(
    async (nickname: string): Promise<NicknameValidationError | null> => {
      return saveNickname(nickname)
    },
    [saveNickname]
  )

  return (
    <>
      {children}
      <LanguageOnboardingModal
        isOpen={showLanguageOnboarding}
        onComplete={handleLanguageComplete}
      />
      <NicknameModal isOpen={showNicknameOnboarding} onSave={handleNicknameSave} />
    </>
  )
}
