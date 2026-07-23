import { NextRequest, NextResponse } from 'next/server'
import {
  assertDaejiljuMaster,
  assertOperatorSession,
  assertServiceRoleConfigured,
  fetchProfileByPiUid,
  masterPiUidsFromEnv,
  requirePiSession,
} from '@/lib/operator-auth-server'
import { isUidInMasterList } from '@/lib/community-mutate-auth'

export const runtime = 'nodejs'

/**
 * GET /api/community/auth-context?nickname=
 * Operator UI context: 대질주 DB master and/or optional Pi operator.
 */
export async function GET(request: NextRequest) {
  const nickname = request.nextUrl.searchParams.get('nickname')?.trim() ?? ''

  const dae = await assertDaejiljuMaster(nickname)
  if (dae.ok) {
    return NextResponse.json({
      authenticated: true,
      isOperator: true,
      authKind: 'daejilju',
      linkedNickname: dae.nickname,
      piUid: null,
    })
  }

  const session = requirePiSession(request)
  if (!session) {
    return NextResponse.json({
      authenticated: false,
      isOperator: false,
      linkedNickname: null,
      piUid: null,
      authKind: null,
      reason: dae.reason,
    })
  }

  const service = assertServiceRoleConfigured()
  if (!service.ok) {
    const envOp = isUidInMasterList(session.uid, masterPiUidsFromEnv())
    return NextResponse.json({
      authenticated: true,
      isOperator: envOp,
      linkedNickname: null,
      piUid: session.uid,
      authKind: envOp ? 'pi' : null,
      serviceRoleConfigured: false,
      warning: service.error,
    })
  }

  const piOp = await assertOperatorSession(request)
  const profile = await fetchProfileByPiUid(session.uid)

  return NextResponse.json({
    authenticated: true,
    isOperator: piOp.ok === true,
    authKind: piOp.ok ? 'pi' : null,
    linkedNickname: profile?.nickname ?? null,
    piUid: session.uid,
    piUsername: session.username,
    serviceRoleConfigured: true,
    masterPiUidsConfigured: masterPiUidsFromEnv().length > 0,
  })
}
