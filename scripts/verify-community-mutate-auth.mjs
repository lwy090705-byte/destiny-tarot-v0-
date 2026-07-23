/**
 * Community mutate auth unit tests (Pi uid trust model).
 * Usage: node scripts/verify-community-mutate-auth.mjs
 */

function canMutateCommunityContent(input) {
  const sessionUid = String(input.sessionPiUid || '').trim()
  if (!sessionUid) return { allowed: false, reason: 'denied' }
  if (input.isPiOperator) return { allowed: true, reason: 'pi_operator' }
  const authorUid = String(input.authorPiUid || '').trim()
  if (authorUid && authorUid === sessionUid) {
    return { allowed: true, reason: 'author_pi_uid' }
  }
  return { allowed: false, reason: 'denied' }
}

function parseMasterPiUidsEnv(raw) {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

const cases = [
  {
    name: 'operator pi deletes any post',
    input: {
      isPiOperator: true,
      sessionPiUid: 'uid-op',
      authorPiUid: 'uid-other',
    },
    expectAllowed: true,
    expectReason: 'pi_operator',
  },
  {
    name: 'forged nickname 대질주 without operator flag DENIED',
    input: {
      isPiOperator: false,
      sessionPiUid: 'uid-attacker',
      authorPiUid: 'uid-victim',
    },
    expectAllowed: false,
    expectReason: 'denied',
  },
  {
    name: 'author matching pi_uid allowed',
    input: {
      isPiOperator: false,
      sessionPiUid: 'uid-author',
      authorPiUid: 'uid-author',
    },
    expectAllowed: true,
    expectReason: 'author_pi_uid',
  },
  {
    name: 'author nickname match alone not enough (null author pi)',
    input: {
      isPiOperator: false,
      sessionPiUid: 'uid-x',
      authorPiUid: null,
    },
    expectAllowed: false,
    expectReason: 'denied',
  },
  {
    name: 'empty session denied',
    input: {
      isPiOperator: true,
      sessionPiUid: '',
      authorPiUid: 'uid-a',
    },
    expectAllowed: false,
    expectReason: 'denied',
  },
]

let failed = 0
for (const c of cases) {
  const r = canMutateCommunityContent(c.input)
  const ok = r.allowed === c.expectAllowed && r.reason === c.expectReason
  console.log(ok ? 'PASS' : 'FAIL', c.name, r)
  if (!ok) failed++
}

const list = parseMasterPiUidsEnv(' a,b , ,c ')
const listOk = list.length === 3 && list[0] === 'a' && list[2] === 'c'
console.log(listOk ? 'PASS' : 'FAIL', 'MASTER_PI_UIDS parse', list)
if (!listOk) failed++

// Client must not contain direct delete fallback strings in posts lib
import { readFileSync } from 'node:fs'
const postsLib = readFileSync('lib/supabase-community-posts.ts', 'utf8')
const hasFallback =
  postsLib.includes('trying direct') ||
  postsLib.includes("from('community_posts').delete()")
console.log(
  !hasFallback ? 'PASS' : 'FAIL',
  'no anon DELETE fallback in supabase-community-posts'
)
if (hasFallback) failed++

const mutateRoute = readFileSync('app/api/community/post-mutate/route.ts', 'utf8')
const trustsNickname =
  mutateRoute.includes('isMasterNickname') ||
  mutateRoute.includes('master_nickname')
console.log(
  !trustsNickname ? 'PASS' : 'FAIL',
  'post-mutate does not trust nickname for auth'
)
if (trustsNickname) failed++

console.log(`\nsummary failed=${failed}`)
process.exit(failed ? 1 : 0)
