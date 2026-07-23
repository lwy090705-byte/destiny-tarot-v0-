/**
 * Server-side community mutate authorization.
 * Operator: 대질주 (nickname + DB master) OR optional Pi operator.
 * Author: session Pi uid === author's profile.pi_uid.
 */

export type CommunityMutateDecision =
  | {
      allowed: true
      reason: 'daejilju_master' | 'pi_operator' | 'author_pi_uid'
    }
  | { allowed: false; reason: 'denied' }

export type CommunityMutateAuthInput = {
  /** nickname==='대질주' && profiles.role=master && is_master=true (server-verified). */
  isDaejiljuMaster?: boolean
  /** Optional Pi MASTER_PI_UIDS / linked operator. */
  isPiOperator: boolean
  sessionPiUid: string
  authorPiUid: string | null
}

export function canMutateCommunityContent(
  input: CommunityMutateAuthInput
): CommunityMutateDecision {
  if (input.isDaejiljuMaster) {
    return { allowed: true, reason: 'daejilju_master' }
  }

  if (input.isPiOperator) {
    return { allowed: true, reason: 'pi_operator' }
  }

  const sessionUid = input.sessionPiUid.trim()
  if (!sessionUid) {
    return { allowed: false, reason: 'denied' }
  }

  const authorUid = input.authorPiUid?.trim() || ''
  if (authorUid && authorUid === sessionUid) {
    return { allowed: true, reason: 'author_pi_uid' }
  }

  return { allowed: false, reason: 'denied' }
}

export function parseMasterPiUidsEnv(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export function isUidInMasterList(uid: string, masterList: string[]): boolean {
  const u = uid.trim()
  if (!u) return false
  return masterList.includes(u)
}
