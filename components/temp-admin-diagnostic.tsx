'use client'

/**
 * TEMP_ADMIN_DIAGNOSTIC — delete this entire file after copying MASTER_PI_UIDS.
 * Temporary UI to read Pi link status once for the designated operator nickname.
 */

import { useCallback, useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { isMasterNickname } from '@/lib/master-role'
import { usePiAuth } from '@/lib/pi-auth-context'
import { useUser } from '@/lib/user-context'
import { piAuthFetch } from '@/lib/pi-session-client'

type DiagFields = {
  authenticated: boolean
  pi_username: string | null
  linked_nickname: string | null
  pi_uid: string | null
  is_master: boolean | null
}

// TEMP_ADMIN_DIAGNOSTIC
export function TempAdminDiagnostic() {
  const { user } = useUser()
  const { status: piStatus } = usePiAuth()
  const nick = user?.nickname?.trim() ?? ''
  const show =
    isMasterNickname(nick) && piStatus === 'authenticated'

  const [data, setData] = useState<DiagFields | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const load = useCallback(async () => {
    if (!show) return
    setLoading(true)
    setError(null)
    try {
      // TEMP_ADMIN_DIAGNOSTIC — must use piAuthFetch (cookie + Authorization header)
      const res = await piAuthFetch('/api/profile/link-pi', {
        method: 'GET',
        cache: 'no-store',
      })
      const json = (await res.json()) as Record<string, unknown>
      setData({
        authenticated: json.authenticated === true,
        pi_username:
          json.pi_username != null ? String(json.pi_username) : null,
        linked_nickname:
          json.linked_nickname != null ? String(json.linked_nickname) : null,
        pi_uid: json.pi_uid != null ? String(json.pi_uid) : null,
        is_master:
          typeof json.is_master === 'boolean' ? json.is_master : null,
      })
    } catch {
      setError('진단 요청 실패')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [show])

  useEffect(() => {
    void load()
  }, [load])

  if (!show) return null

  const copyUid = async () => {
    const uid = data?.pi_uid
    if (!uid) return
    try {
      await navigator.clipboard.writeText(uid)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('복사 실패')
    }
  }

  // TEMP_ADMIN_DIAGNOSTIC — visible UI (no session tokens)
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-left shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-amber-900">
          TEMP 운영자 Pi 진단 (삭제 예정)
        </p>
        <button
          type="button"
          onClick={() => void load()}
          className="text-[11px] text-amber-800 underline"
          disabled={loading}
        >
          {loading ? '조회 중…' : '새로고침'}
        </button>
      </div>
      {error && <p className="mb-2 text-xs text-red-600">{error}</p>}
      {data && (
        <dl className="space-y-1.5 text-xs text-gray-800">
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">authenticated</dt>
            <dd className="font-mono">{String(data.authenticated)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">pi_username</dt>
            <dd className="font-mono break-all">{data.pi_username ?? '—'}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">linked_nickname</dt>
            <dd className="font-mono break-all">
              {data.linked_nickname ?? '—'}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-2">
            <dt className="text-gray-500 shrink-0">pi_uid</dt>
            <dd className="flex min-w-0 flex-1 items-center justify-end gap-1">
              <span className="font-mono break-all text-right">
                {data.pi_uid ?? '—'}
              </span>
              {data.pi_uid && (
                <button
                  type="button"
                  onClick={() => void copyUid()}
                  className="inline-flex shrink-0 items-center gap-0.5 rounded border border-amber-400 bg-white px-1.5 py-0.5 text-[10px] text-amber-900"
                  aria-label="pi_uid 복사"
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? '복사됨' : '복사'}
                </button>
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-gray-500">is_master</dt>
            <dd className="font-mono">
              {data.is_master == null ? '—' : String(data.is_master)}
            </dd>
          </div>
        </dl>
      )}
      <p className="mt-2 text-[10px] text-amber-800/80">
        pi_uid만 MASTER_PI_UIDS에 넣으세요. 토큰은 표시되지 않습니다.
      </p>
    </div>
  )
}
