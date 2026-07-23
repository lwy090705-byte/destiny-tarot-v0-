import { NextRequest, NextResponse } from 'next/server'
import {
  assertOperatorSession,
  assertServiceRoleConfigured,
  fetchProfileByPiUid,
  masterPiUidsFromEnv,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { isUidInMasterList } from '@/lib/community-mutate-auth'

export const runtime = 'nodejs'

/**
 * GET /api/community/auth-context
 * Returns Pi-verified operator / linked profile for UI (never trust local nickname).
 */
export async function GET(request: NextRequest) {
  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json({
      authenticated: false,
      isOperator: false,
      linkedNickname: null,
      piUid: null,
    })
  }

  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    // Still report env master list operators without DB
    const envOp = isUidInMasterList(session.uid, masterPiUidsFromEnv())
    return NextResponse.json({
      authenticated: true,
      isOperator: envOp,
      linkedNickname: null,
      piUid: session.uid,
      serviceRoleConfigured: false,
      warning: service.error,
    })
  }

  const operator = await assertOperatorSession(request)
  const profile = await fetchProfileByPiUid(session.uid)

  return NextResponse.json({
    authenticated: true,
    isOperator: operator.ok === true,
    linkedNickname: profile?.nickname ?? null,
    /** Verified Pi Network uid — use this in MASTER_PI_UIDS (not username). */
    piUid: session.uid,
    piUsername: session.username,
    serviceRoleConfigured: true,
    masterPiUidsConfigured: masterPiUidsFromEnv().length > 0,
  })
}
