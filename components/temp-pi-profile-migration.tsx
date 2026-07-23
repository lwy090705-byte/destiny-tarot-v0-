'use client'

/**
 * TEMP_PI_PROFILE_MIGRATION — delete this entire file after successful migrate.
 * One-time button: move Pi uid from 파이조아 → 대질주.
 */

import { useCallback, useEffect, useState } from 'react'
import { usePiAuth } from '@/lib/pi-auth-context'
import { useUser } from '@/lib/user-context'
import { piAuthFetch } from '@/lib/pi-session-client'
import { clearUserScopedCaches } from '@/lib/supabase-request-cache'
import { clearAuthorMetaCache } from '@/lib/supabase-profile-level-titles'

const SOURCE = '파이조아'
const TARGET = '대질주'

// TEMP_PI_PROFILE_MIGRATION
export function TempPiProfileMigration() {
  const { status: piStatus } = usePiAuth()
  const { adoptNicknameLocally } = useUser()
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (piStatus !== 'authenticated') {
      setVisible(false)
      return
    }

    let cancelled = false
    void (async () => {
      try {
        const res = await piAuthFetch('/api/profile/link-pi', {
          method: 'GET',
          cache: 'no-store',
        })
        const data = (await res.json()) as {
          authenticated?: boolean
          linked_nickname?: string | null
          pi_uid?: string | null
        }
        if (cancelled) return
        const linked = String(data.linked_nickname ?? '').trim()
        const ok =
          data.authenticated === true &&
          linked.toLowerCase() === SOURCE.toLowerCase() &&
          Boolean(data.pi_uid)
        setVisible(ok)
      } catch {
        if (!cancelled) setVisible(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [piStatus])

  const runMigrate = useCallback(async () => {
    const confirmed = window.confirm(
      `"${SOURCE}"에 연결된 Pi 계정을 "${TARGET}" 프로필로 이전합니다.\n` +
        `게시글·포인트는 병합하지 않고, Pi UID와 운영자 권한만 옮깁니다.\n계속할까요?`
    )
    if (!confirmed) return

    setBusy(true)
    setMessage(null)
    try {
      const res = await piAuthFetch('/api/operator/migrate-pi-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceNickname: SOURCE,
          targetNickname: TARGET,
        }),
      })
      const data = (await res.json()) as {
        success?: boolean
        error?: string
        linked_nickname?: string
      }

      if (!res.ok || !data.success) {
        const msg =
          data.error ||
          (res.status === 401
            ? 'Pi 로그인이 필요합니다.'
            : res.status === 403
              ? '현재 Pi 계정이 파이조아 프로필과 연결되지 않았습니다.'
              : res.status === 404
                ? '프로필을 찾을 수 없습니다.'
                : res.status === 409
                  ? '대질주에 다른 Pi 계정이 이미 연결되어 있습니다.'
                  : res.status === 503
                    ? '서버 설정(SUPABASE_SERVICE_ROLE_KEY)이 필요합니다.'
                    : '이전 실패')
        setMessage(msg)
        return
      }

      clearUserScopedCaches(SOURCE)
      clearUserScopedCaches(TARGET)
      clearAuthorMetaCache()
      adoptNicknameLocally(TARGET)
      setMessage('이전 완료. 대질주로 전환합니다…')
      window.setTimeout(() => {
        window.location.reload()
      }, 600)
    } catch {
      setMessage('네트워크 오류로 이전에 실패했습니다.')
    } finally {
      setBusy(false)
    }
  }, [adoptNicknameLocally])

  if (!visible) return null

  // TEMP_PI_PROFILE_MIGRATION
  return (
    <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-left shadow-sm">
      <p className="mb-2 text-xs font-semibold text-rose-900">
        TEMP Pi 프로필 이전 (일회성)
      </p>
      <p className="mb-3 text-[11px] text-rose-800/90">
        현재 Pi 계정이 <strong>{SOURCE}</strong>에 연결되어 있습니다. 운영자
        권한을 <strong>{TARGET}</strong>로 옮깁니다. (게시글/포인트 병합 없음)
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => void runMigrate()}
        className="w-full rounded-lg bg-rose-700 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {busy ? '이전 중…' : '파이조아 Pi 계정을 대질주로 이전'}
      </button>
      {message && (
        <p className="mt-2 text-xs text-rose-900" role="status">
          {message}
        </p>
      )}
    </div>
  )
}
