import { NextRequest, NextResponse } from 'next/server'
import {
  PI_SESSION_COOKIE,
  createPiSessionToken,
  piSessionCookieOptions,
  readPiSessionFromRequest,
  verifyPiAccessToken,
} from '@/lib/pi-session-server'

export async function GET(request: NextRequest) {
  const user = readPiSessionFromRequest(request)
  // 200 + authenticated:false — session probe is not an error (avoids Vercel 401 noise)
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }

  return NextResponse.json({ authenticated: true, user })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { accessToken?: string }
    const accessToken = body.accessToken?.trim()

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'accessToken is required' },
        { status: 400 }
      )
    }

    const user = await verifyPiAccessToken(accessToken)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid Pi access token' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ success: true, user })
    response.cookies.set(
      PI_SESSION_COOKIE,
      createPiSessionToken(user),
      piSessionCookieOptions()
    )
    return response
  } catch (error) {
    console.error('[pi/auth] POST failed', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(PI_SESSION_COOKIE, '', {
    ...piSessionCookieOptions(),
    maxAge: 0,
  })
  return response
}
