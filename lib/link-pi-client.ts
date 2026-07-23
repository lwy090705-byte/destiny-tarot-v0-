/**
 * Client helper: bind app nickname → verified Pi session uid via server.
 * Never puts nicknames into MASTER_PI_UIDS — only the returned pi_uid may be copied there.
 */
import { piAuthFetch } from '@/lib/pi-session-client'

export type LinkPiResult = {
  ok: boolean
  status: number
  pi_uid?: string
  nickname?: string
  error?: string
  code?: string
}

export async function linkPiToAppNickname(nickname: string): Promise<LinkPiResult> {
  const nick = nickname.trim()
  if (!nick) {
    return { ok: false, status: 400, error: 'nickname required' }
  }

  try {
    const res = await piAuthFetch('/api/profile/link-pi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: nick }),
    })
    let payload: {
      ok?: boolean
      pi_uid?: string
      nickname?: string
      error?: string
      code?: string
    } = {}
    try {
      payload = (await res.json()) as typeof payload
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      console.warn('[link-pi] failed', res.status, payload.error ?? payload.code)
      return {
        ok: false,
        status: res.status,
        error: payload.error ?? 'Link failed',
        code: payload.code,
      }
    }

    console.log('[link-pi] success', {
      nickname: payload.nickname ?? nick,
      pi_uid: payload.pi_uid ? `${String(payload.pi_uid).slice(0, 6)}…` : null,
    })
    return {
      ok: true,
      status: 200,
      pi_uid: payload.pi_uid,
      nickname: payload.nickname ?? nick,
    }
  } catch (err) {
    console.warn('[link-pi] network error', err)
    return { ok: false, status: 0, error: 'Network error' }
  }
}

/** GET /api/profile/link-pi with Pi session (cookie or Authorization header). */
export async function fetchLinkPiStatus(): Promise<{
  authenticated: boolean
  pi_uid: string | null
  pi_username: string | null
  linked_nickname: string | null
  raw?: unknown
}> {
  try {
    const res = await piAuthFetch('/api/profile/link-pi', {
      method: 'GET',
      cache: 'no-store',
    })
    const data = (await res.json()) as {
      authenticated?: boolean
      pi_uid?: string | null
      pi_username?: string | null
      linked_nickname?: string | null
    }
    return {
      authenticated: data.authenticated === true,
      pi_uid: data.pi_uid ?? null,
      pi_username: data.pi_username ?? null,
      linked_nickname: data.linked_nickname ?? null,
      raw: data,
    }
  } catch {
    return {
      authenticated: false,
      pi_uid: null,
      pi_username: null,
      linked_nickname: null,
    }
  }
}

/** Read app nickname from localStorage (fortune-app-user). */
export function readStoredAppNickname(): string {
  if (typeof window === 'undefined') return ''
  try {
    const raw = localStorage.getItem('fortune-app-user')
    if (!raw) return ''
    const parsed = JSON.parse(raw) as { nickname?: string; name?: string }
    return String(parsed.nickname ?? parsed.name ?? '').trim()
  } catch {
    return ''
  }
}
