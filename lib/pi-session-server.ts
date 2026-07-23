import { createHmac, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

export const PI_SESSION_COOKIE = 'pi_session'
/** Also accepted as Authorization: Bearer <token> or X-Pi-Session (Pi WebView cookie fallback). */
export const PI_SESSION_HEADER = 'x-pi-session'
const SESSION_TTL_SEC = 60 * 60 * 24 * 30

export type PiVerifiedUser = {
  uid: string
  username: string
}

export type PiSessionPayload = PiVerifiedUser & {
  exp: number
}

function sessionSecret(): string {
  return process.env.PI_SESSION_SECRET ?? 'dev-pi-session-secret-change-me'
}

function signBody(body: string): string {
  return createHmac('sha256', sessionSecret()).update(body).digest('base64url')
}

export function createPiSessionToken(user: PiVerifiedUser): string {
  const payload: PiSessionPayload = {
    uid: user.uid,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
  }
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${signBody(body)}`
}

export function verifyPiSessionToken(token: string | undefined): PiVerifiedUser | null {
  if (!token) return null

  const [body, signature] = token.split('.')
  if (!body || !signature) return null

  const expected = signBody(body)
  const sigBuf = Buffer.from(signature)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString('utf8')
    ) as PiSessionPayload

    if (!payload.uid || !payload.username || !payload.exp) {
      return null
    }
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return { uid: payload.uid, username: payload.username }
  } catch {
    return null
  }
}

/**
 * Resolve Pi session from cookie and/or Authorization / X-Pi-Session.
 * Pi Browser WebViews often drop Set-Cookie; clients then send the token in a header.
 */
export function readPiSessionFromRequest(request: NextRequest): PiVerifiedUser | null {
  const fromCookie = verifyPiSessionToken(
    request.cookies.get(PI_SESSION_COOKIE)?.value
  )
  if (fromCookie) return fromCookie

  const auth = request.headers.get('authorization')?.trim() ?? ''
  const bearer = /^bearer\s+/i.test(auth)
    ? auth.replace(/^bearer\s+/i, '').trim()
    : ''
  const headerToken =
    request.headers.get(PI_SESSION_HEADER)?.trim() || bearer || ''

  return verifyPiSessionToken(headerToken || undefined)
}

export async function verifyPiAccessToken(
  accessToken: string
): Promise<PiVerifiedUser | null> {
  const trimmed = accessToken.trim()
  if (!trimmed) return null

  const response = await fetch('https://api.minepi.com/v2/me', {
    headers: {
      Authorization: `Bearer ${trimmed}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as { uid?: string; username?: string }
  if (!data.uid || !data.username) {
    return null
  }

  return { uid: data.uid, username: data.username }
}

/**
 * Cookie flags tuned for Pi Browser / in-app WebViews.
 * Production: SameSite=None; Secure so cookies survive WebView embedding.
 * Development: Lax + insecure for localhost HTTP.
 */
export function piSessionCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
    maxAge: SESSION_TTL_SEC,
  }
}
