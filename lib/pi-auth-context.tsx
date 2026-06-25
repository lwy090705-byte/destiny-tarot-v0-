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

async function fetchSession(): Promise<PiAuthUser | null> {
  const res = await fetch('/api/pi/auth', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = (await res.json()) as {
    authenticated?: boolean
    user?: PiAuthUser
  }
  return data.authenticated && data.user ? data.user : null
}

async function verifyAccessTokenOnServer(accessToken: string): Promise<PiAuthUser> {
  const res = await fetch('/api/pi/auth', {
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
  return data.user
}

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [piUser, setPiUser] = useState<PiAuthUser | null>(null)
  const [status, setStatus] = useState<PiAuthStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const autoAttemptedRef = useRef(false)

  const signIn = useCallback(async () => {
    setStatus('loading')
    setError(null)

    try {
      const auth = await authenticateWithPi()
      const verified = await verifyAccessTokenOnServer(auth.accessToken)
      setPiUser(verified)
      setStatus('authenticated')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Pi authentication failed'
      setError(message)
      setPiUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  const signOut = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      await fetch('/api/pi/auth', { method: 'DELETE', credentials: 'include' })
    } finally {
      setPiUser(null)
      setStatus('unauthenticated')
    }
  }, [])

  useEffect(() => {
    if (autoAttemptedRef.current) return
    autoAttemptedRef.current = true

    let cancelled = false

    ;(async () => {
      setStatus('loading')
      try {
        const existing = await fetchSession()
        if (cancelled) return

        if (existing) {
          setPiUser(existing)
          setStatus('authenticated')
          return
        }

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
