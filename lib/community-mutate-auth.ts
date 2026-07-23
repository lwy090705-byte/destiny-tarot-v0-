/**
 * Server-side community mutate authorization (Pi UID only — never trust nickname).
 */

export type CommunityMutateDecision =
  | { allowed: true; reason: 'pi_operator' | 'author_pi_uid' }
  | { allowed: false; reason: 'denied' }

export type CommunityMutateAuthInput = {
  /** True when session uid is in MASTER_PI_UIDS or linked profile is master/operator. */
  isPiOperator: boolean
  /** Session Pi uid (verified cookie). */
  sessionPiUid: string
  /** profiles.pi_uid for the post/comment author row (null if author has no linked Pi). */
  authorPiUid: string | null
}

/**
 * Operator: Pi-verified operator only.
 * Author: session Pi uid === author's profile.pi_uid.
 */
export function canMutateCommunityContent(
  input: CommunityMutateAuthInput
): CommunityMutateDecision {
  const sessionUid = input.sessionPiUid.trim()
  if (!sessionUid) {
    return { allowed: false, reason: 'denied' }
  }

  if (input.isPiOperator) {
    return { allowed: true, reason: 'pi_operator' }
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
