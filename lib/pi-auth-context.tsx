'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { authenticateWithPi } from '@/lib/pi-client'
import { isPiBrowserEnvironment } from '@/lib/pi-browser'
import { createDevLoggedFetch, logDevRequest } from '@/lib/dev-request-log'

export type PiAuthUser = {
  uid: string
  username: string
}

export type PiAuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'error'

type PiAuthContextValue = {
  piUser: PiAuthUser | null
  status: PiAuthStatus
  error: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const PiAuthContext = createContext<PiAuthContextValue | undefined>(undefined)

const SESSION_TTL_MS = 5 * 60 * 1000
const MAX_AUTO_SIGNIN_ATTEMPTS = 1

type SessionCache = {
  user: PiAuthUser | null
  checkedAt: number
}

let memorySessionCache: SessionCache | null = null
let sessionInFlight: Promise<PiAuthUser | null> | null = null

const devFetch = createDevLoggedFetch('pi-auth-context')

async function fetchSession(): Promise<PiAuthUser | null> {
  const now = Date.now()
  if (memorySessionCache && now - memorySessionCache.checkedAt < SESSION_TTL_MS) {
    logDevRequest({
      url: '/api/pi/auth',
      source: 'pi-auth.fetchSession.cache',
      method: 'GET',
      inFlight: false,
    })
    return memorySessionCache.user
  }

  if (sessionInFlight) {
    logDevRequest({
      url: '/api/pi/auth',
      source: 'pi-auth.fetchSession.join-inflight',
      method: 'GET',
      inFlight: true,
    })
    return sessionInFlight
  }

  sessionInFlight = (async () => {
    logDevRequest({
      url: '/api/pi/auth',
      source: 'pi-auth.fetchSession',
      method: 'GET',
      attempt: 1,
    })
    const res = await devFetch('/api/pi/auth', {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    })
    if (!res.ok) {
      memorySessionCache = { user: null, checkedAt: Date.now() }
      return null
    }
    const data = (await res.json()) as {
      authenticated?: boolean
      user?: PiAuthUser
    }
    const user = data.authenticated && data.user ? data.user : null
    memorySessionCache = { user, checkedAt: Date.now() }
    return user
  })().finally(() => {
    sessionInFlight = null
  })

  return sessionInFlight
}

function clearSessionCache(): void {
  memorySessionCache = null
}

async function verifyAccessTokenOnServer(accessToken: string): Promise<PiAuthUser> {
  logDevRequest({
    url: '/api/pi/auth',
    source: 'pi-auth.verifyAccessToken',
    method: 'POST',
    attempt: 1,
  })
  const res = await devFetch('/api/pi/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ accessToken }),
  })

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { error?: string } | null
    throw new Error(payload?.error ?? 'Pi authentication failed')
  }

  const data = (await res.json()) as { user: PiAuthUser }
  memorySessionCache = { user: data.user, checkedAt: Date.now() }
  return data.user
}

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [piUser, setPiUser] = useState<PiAuthUser | null>(null)
  const [status, setStatus] = useState<PiAuthStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const bootRanRef = useRef(false)
  const signInInFlightRef = useRef(false)
  const autoSignInAttemptsRef = useRef(0)

  const signIn = useCallback(async () => {
    if (signInInFlightRef.current) {
      logDevRequest({
        url: '/api/pi/auth',
        source: 'pi-auth.signIn.blocked-inflight',
        method: 'POST',
        inFlight: true,
      })
      return
    }

    signInInFlightRef.current = true
    setStatus('loading')
    setError(null)

    try {
      const auth = await authenticateWithPi()
      if (!auth.accessToken?.trim()) {
        throw new Error('Pi access token missing')
      }
      const verified = await verifyAccessTokenOnServer(auth.accessToken)
      setPiUser(verified)
      setStatus('authenticated')
      const { linkPiToAppNickname, readStoredAppNickname } = await import(
        '@/lib/link-pi-client'
      )
      const nick = readStoredAppNickname()
      if (nick) {
        void linkPiToAppNickname(nick)
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Pi authentication failed'
      setError(message)
      setPiUser(null)
      setStatus('unauthenticated')
      memorySessionCache = { user: null, checkedAt: Date.now() }
    } finally {
      signInInFlightRef.current = false
    }
  }, [])

  const signOut = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      logDevRequest({
        url: '/api/pi/auth',
        source: 'pi-auth.signOut',
        method: 'DELETE',
      })
      await devFetch('/api/pi/auth', { method: 'DELETE', credentials: 'include' })
    } finally {
      const { clearUserScopedCaches } = await import('@/lib/supabase-request-cache')
      const { clearAuthorMetaCache } = await import('@/lib/supabase-profile-level-titles')
      clearUserScopedCaches()
      clearAuthorMetaCache()
      clearSessionCache()
      setPiUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  useEffect(() => {
    if (bootRanRef.current) return
    bootRanRef.current = true

    let cancelled = false

    ;(async () => {
      setStatus('loading')
      try {
        const existing = await fetchSession()
        if (cancelled) return

        if (existing) {
          setPiUser(existing)
          setStatus('authenticated')
          const { linkPiToAppNickname, readStoredAppNickname } = await import(
            '@/lib/link-pi-client'
          )
          const nick = readStoredAppNickname()
          if (nick) {
            void linkPiToAppNickname(nick)
          }
          return
        }

        // No cookie session: only auto-auth inside Pi Browser (manual button elsewhere)
        if (!isPiBrowserEnvironment()) {
          logDevRequest({
            url: '/api/pi/auth',
            source: 'pi-auth.skip-auto-signin-non-pi-browser',
            method: 'GET',
          })
          setStatus('unauthenticated')
          return
        }

        if (autoSignInAttemptsRef.current >= MAX_AUTO_SIGNIN_ATTEMPTS) {
          setStatus('unauthenticated')
          return
        }

        autoSignInAttemptsRef.current += 1
        logDevRequest({
          url: '/api/pi/auth',
          source: 'pi-auth.auto-signin',
          method: 'POST',
          attempt: autoSignInAttemptsRef.current,
        })
        await signIn()
      } catch {
        if (!cancelled) {
          setStatus('unauthenticated')
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [signIn])

  return (
    <PiAuthContext.Provider value={{ piUser, status, error, signIn, signOut }}>
      {children}
    </PiAuthContext.Provider>
  )
}

export function usePiAuth(): PiAuthContextValue {
  const ctx = useContext(PiAuthContext)
  if (!ctx) {
    throw new Error('usePiAuth must be used within PiAuthProvider')
  }
  return ctx
}
