'use client'

import { useState } from 'react'
import { User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { getLocalizedTextDir, isRtlLanguage } from '@/lib/language-typography'
import {
  NICKNAME_ERROR_I18N_KEYS,
  NICKNAME_MAX_LENGTH,
  validateNicknameLength,
  type NicknameValidationError,
} from '@/lib/nickname-validation'

interface NicknameModalProps {
  isOpen: boolean
  onSave: (nickname: string) => Promise<NicknameValidationError | null>
}

export function NicknameModal({ isOpen, onSave }: NicknameModalProps) {
  const { t, language } = useLanguage()
  const textDir = getLocalizedTextDir(language)
  const rtlText = isRtlLanguage(language)
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSave = async () => {
    const lengthCheck = validateNicknameLength(nickname)
    if (!lengthCheck.ok) {
      setError(t(NICKNAME_ERROR_I18N_KEYS[lengthCheck.error]))
      return
    }

    const saveError = await onSave(lengthCheck.nickname)
    if (saveError) {
      setError(t(NICKNAME_ERROR_I18N_KEYS[saveError]))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4" dir="ltr">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" dir="ltr">
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-1 break-words" dir={textDir}>
              {t('nickname.welcome')}
            </h2>
            <p className="text-white/80 text-sm break-words" dir={textDir}>
              {t('nickname.subtitle')}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label
              className="block w-full text-sm font-medium text-gray-700 break-words"
              dir={textDir}
            >
              {t('nickname.label')}
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
                setError('')
              }}
              onKeyDown={handleKeyDown}
              placeholder={t('nickname.placeholder')}
              maxLength={NICKNAME_MAX_LENGTH}
              autoFocus
              dir={rtlText ? 'auto' : 'ltr'}
              className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none text-gray-800 placeholder-gray-400 transition-colors"
            />
            {error && (
              <p className="text-xs text-red-500 break-words" dir={textDir}>
                {error}
              </p>
            )}
            <p className="text-xs text-gray-400 text-right">
              {nickname.trim().length}/{NICKNAME_MAX_LENGTH}
            </p>
          </div>

          <div className="bg-violet-50 rounded-xl p-3 flex flex-row items-start gap-2">
            <Sparkles className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
            <p className="flex-1 min-w-0 text-xs text-violet-700 text-left leading-relaxed break-words" dir={textDir}>
              {t('nickname.hint')}
            </p>
          </div>

          <Button
            onClick={handleSave}
            dir={textDir}
            className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base break-words"
          >
            {t('nickname.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
