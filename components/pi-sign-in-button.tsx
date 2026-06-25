'use client'

import { useLanguage } from '@/lib/language-context'
import { usePiAuth } from '@/lib/pi-auth-context'

export function PiSignInButton() {
  const { t } = useLanguage()
  const { piUser, status, signIn, signOut } = usePiAuth()

  const isLoading = status === 'loading' || status === 'idle'

  if (piUser) {
    return (
      <button
        type="button"
        onClick={() => void signOut()}
        className="flex items-center gap-1 rounded-full font-bold transition-all active:scale-95 max-w-[140px]"
        style={{
          background: 'rgba(212,175,55,0.12)',
          color: '#d4af37',
          border: '1.5px solid rgba(212,175,55,0.45)',
          padding: '5px 10px',
          fontSize: 11,
          whiteSpace: 'nowrap',
        }}
        title={t('pi.signOut')}
      >
        <span style={{ fontSize: 10 }}>π</span>
        <span className="truncate">@{piUser.username}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => void signIn()}
      disabled={isLoading}
      className="flex items-center gap-1 rounded-full font-bold transition-all active:scale-95 disabled:opacity-60"
      style={{
        background: '#ffffff',
        color: '#6c2bd9',
        border: '1.5px solid rgba(212,175,55,0.35)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.14)',
        padding: '5px 10px',
        fontSize: 11,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: 10 }}>π</span>
      <span>{isLoading ? t('pi.signingIn') : t('pi.signIn')}</span>
    </button>
  )
}
