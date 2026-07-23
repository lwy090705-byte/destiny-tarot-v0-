/**
 * Client-side Pi session token (signed by server).
 * Primary: httpOnly cookie. Fallback for Pi Browser: sessionStorage + Authorization header.
 */

const STORAGE_KEY = 'pi_session_token'

let memoryToken: string | null = null

export function getPiSessionToken(): string | null {
  if (memoryToken) return memoryToken
  if (typeof window === 'undefined') return null
  try {
    const fromStore = sessionStorage.getItem(STORAGE_KEY)?.trim()
    if (fromStore) {
      memoryToken = fromStore
      return fromStore
    }
  } catch {
    /* private mode */
  }
  return null
}

export function setPiSessionToken(token: string | null): void {
  memoryToken = token?.trim() || null
  if (typeof window === 'undefined') return
  try {
    if (memoryToken) sessionStorage.setItem(STORAGE_KEY, memoryToken)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function clearPiSessionToken(): void {
  setPiSessionToken(null)
}

/** Headers for authenticated same-origin API calls (cookie + bearer fallback). */
export function piAuthHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra)
  const token = getPiSessionToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
    headers.set('X-Pi-Session', token)
  }
  return headers
}

export async function piAuthFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const headers = piAuthHeaders(init.headers)
  return fetch(input, {
    ...init,
    credentials: 'include',
    headers,
  })
}
