/**
 * Community mutate auth unit tests (대질주 nickname + optional Pi).
 * Usage: node scripts/verify-community-mutate-auth.mjs
 */

function canMutateCommunityContent(input) {
  if (input.isDaejiljuMaster) {
    return { allowed: true, reason: 'daejilju_master' }
  }
  if (input.isPiOperator) {
    return { allowed: true, reason: 'pi_operator' }
  }
  const sessionUid = String(input.sessionPiUid || '').trim()
  if (!sessionUid) return { allowed: false, reason: 'denied' }
  const authorUid = String(input.authorPiUid || '').trim()
  if (authorUid && authorUid === sessionUid) {
    return { allowed: true, reason: 'author_pi_uid' }
  }
  return { allowed: false, reason: 'denied' }
}

function isDaejiljuMaster(nickname, profile) {
  return (
    nickname === '대질주' &&
    profile &&
    profile.role === 'master' &&
    profile.is_master === true
  )
}

const cases = [
  {
    name: '대질주 master without Pi uid allowed',
    input: {
      isDaejiljuMaster: true,
      isPiOperator: false,
      sessionPiUid: '',
      authorPiUid: null,
    },
    expectAllowed: true,
    expectReason: 'daejilju_master',
  },
  {
    name: 'pi operator deletes any post',
    input: {
      isDaejiljuMaster: false,
      isPiOperator: true,
      sessionPiUid: 'uid-op',
      authorPiUid: 'uid-other',
    },
    expectAllowed: true,
    expectReason: 'pi_operator',
  },
  {
    name: 'forged nickname without DB master DENIED',
    input: {
      isDaejiljuMaster: false,
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
      isDaejiljuMaster: false,
      isPiOperator: false,
      sessionPiUid: 'uid-author',
      authorPiUid: 'uid-author',
    },
    expectAllowed: true,
    expectReason: 'author_pi_uid',
  },
]

const profileCases = [
  {
    name: '대질주 + master flags',
    nickname: '대질주',
    profile: { role: 'master', is_master: true },
    expect: true,
  },
  {
    name: '대질주 without master flags',
    nickname: '대질주',
    profile: { role: 'user', is_master: false },
    expect: false,
  },
  {
    name: '파이조아 never master via nickname',
    nickname: '파이조아',
    profile: { role: 'master', is_master: true },
    expect: false,
  },
]

let failed = 0
for (const c of cases) {
  const r = canMutateCommunityContent(c.input)
  const ok = r.allowed === c.expectAllowed && r.reason === c.expectReason
  if (!ok) {
    failed += 1
    console.error('FAIL', c.name, r)
  } else {
    console.log('ok', c.name)
  }
}

for (const c of profileCases) {
  const got = isDaejiljuMaster(c.nickname, c.profile)
  if (got !== c.expect) {
    failed += 1
    console.error('FAIL', c.name, got)
  } else {
    console.log('ok', c.name)
  }
}

if (failed) {
  console.error(`${failed} failed`)
  process.exit(1)
}
console.log('all passed')
