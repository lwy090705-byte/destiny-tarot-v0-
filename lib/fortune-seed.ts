import type { FortuneCategory, FortuneType, UserProfile } from '@/lib/types'

export type FortuneProfileSeedInput = {
  profileId?: string
  userCode?: string
  nickname?: string
  name: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  gender: 'male' | 'female'
  isLunar?: boolean
  profileHash?: number
}

export type FortuneSeedKind =
  | 'lifetime'
  | 'yearly'
  | 'monthly'
  | 'daily'
  | 'compatibility'
  | 'tarot'

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export function formatBirthdate(
  year: number,
  month: number,
  day: number
): string {
  return `${year}-${pad2(month)}-${pad2(day)}`
}

export function formatBirthtime(hour: number | undefined): string {
  if (hour === undefined || hour === null) return 'unknown'
  return String(hour)
}

export function formatTodayKey(d: Date = new Date()): string {
  return formatBirthdate(d.getFullYear(), d.getMonth() + 1, d.getDate())
}

export function formatMonthPeriodKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`
}

export function formatYearPeriodKey(d: Date = new Date()): string {
  return String(d.getFullYear())
}

/** Stable numeric seed from a canonical string key. */
export function hashSeedKeyToNumber(seedKey: string): number {
  let h = 5381
  for (let i = 0; i < seedKey.length; i++) {
    h = ((h << 5) + h) ^ seedKey.charCodeAt(i)
  }
  return Math.max(1, Math.abs(h | 0) || 42)
}

function joinParts(parts: (string | number | undefined | null)[]): string {
  return parts
    .map((p) => (p === undefined || p === null ? '' : String(p).trim()))
    .filter(Boolean)
    .join('|')
}

export function buildProfileBaseParts(
  ctx: Pick<
    FortuneProfileSeedInput,
    | 'profileId'
    | 'userCode'
    | 'nickname'
    | 'name'
    | 'birthYear'
    | 'birthMonth'
    | 'birthDay'
    | 'birthHour'
    | 'gender'
    | 'isLunar'
  >
): string[] {
  const calendar = ctx.isLunar ? 'lunar' : 'solar'
  const birthdate = formatBirthdate(ctx.birthYear, ctx.birthMonth, ctx.birthDay)
  const birthtime = formatBirthtime(ctx.birthHour)
  return [
    ctx.userCode ?? '',
    ctx.nickname ?? '',
    ctx.profileId ?? '',
    ctx.name ?? '',
    ctx.gender ?? 'male',
    calendar,
    birthdate,
    birthtime,
  ]
}

export function buildSajuSeedKey(
  ctx: FortuneProfileSeedInput,
  kind: Exclude<FortuneSeedKind, 'compatibility' | 'tarot'>,
  options?: {
    year?: number
    month?: number
    dayKey?: string
    category?: FortuneCategory
    fortuneType?: FortuneType
  }
): string {
  const now = new Date()
  const year = options?.year ?? now.getFullYear()
  const month = options?.month ?? now.getMonth() + 1
  const dayKey = options?.dayKey ?? formatTodayKey(now)
  const category = options?.category ?? 'total'
  const fortuneType = options?.fortuneType ?? kind

  const parts = [
    ...buildProfileBaseParts(ctx),
    fortuneType,
    category,
  ]

  if (kind === 'lifetime') {
    parts.push('lifetime')
  } else if (kind === 'yearly') {
    parts.push('yearly', String(year))
  } else if (kind === 'monthly') {
    parts.push('monthly', String(year), pad2(month))
  } else if (kind === 'daily') {
    parts.push('daily', dayKey)
  }

  return joinParts(parts)
}

export function buildCompatibilitySeedKey(
  profileA: Pick<UserProfile, 'id' | 'birthYear' | 'birthMonth' | 'birthDay' | 'birthHour' | 'gender'>,
  profileB: Pick<UserProfile, 'id' | 'birthYear' | 'birthMonth' | 'birthDay' | 'birthHour' | 'gender'>
): string {
  const pair = [
    {
      id: profileA.id,
      birth: formatBirthdate(profileA.birthYear, profileA.birthMonth, profileA.birthDay),
      time: formatBirthtime(profileA.birthHour),
      gender: profileA.gender ?? 'male',
    },
    {
      id: profileB.id,
      birth: formatBirthdate(profileB.birthYear, profileB.birthMonth, profileB.birthDay),
      time: formatBirthtime(profileB.birthHour),
      gender: profileB.gender ?? 'male',
    },
  ].sort((a, b) => a.id.localeCompare(b.id))

  return joinParts([
    pair[0].id,
    pair[0].birth,
    pair[0].time,
    pair[0].gender,
    pair[1].id,
    pair[1].birth,
    pair[1].time,
    pair[1].gender,
    'compatibility',
  ])
}

export type TarotPeriodKind = 'daily' | 'monthly' | 'yearly' | 'wish'

export function buildTarotSeedKey(params: {
  profileId: string
  userCode?: string
  nickname?: string
  name?: string
  birthYear: number
  birthMonth: number
  birthDay: number
  birthHour?: number
  gender?: 'male' | 'female'
  calendarType?: 'solar' | 'lunar'
  tarotKind: string
  cardIds: number[]
  periodKind: TarotPeriodKind
  periodKey: string
  wishText?: string
}): string {
  const cards = [...params.cardIds].sort((a, b) => a - b).join(',')
  const parts = [
    params.userCode ?? '',
    params.nickname ?? '',
    params.profileId,
    params.name ?? '',
    params.gender ?? 'male',
    params.calendarType === 'lunar' ? 'lunar' : 'solar',
    formatBirthdate(params.birthYear, params.birthMonth, params.birthDay),
    formatBirthtime(params.birthHour),
    'tarot',
    params.tarotKind,
    cards,
    params.periodKind,
    params.periodKey,
  ]
  if (params.periodKind === 'wish' && params.wishText?.trim()) {
    parts.push(params.wishText.trim())
  }
  return joinParts(parts)
}

export function userProfileToFortuneContext(
  profile: UserProfile,
  extras?: { userCode?: string; nickname?: string }
): FortuneProfileSeedInput {
  return {
    profileId: profile.id,
    userCode: extras?.userCode,
    nickname: extras?.nickname,
    name: profile.name,
    birthYear: profile.birthYear,
    birthMonth: profile.birthMonth,
    birthDay: profile.birthDay,
    birthHour: profile.birthHour,
    gender: profile.gender ?? 'male',
    isLunar: profile.calendarType === 'lunar',
    profileHash: hashSeedKeyToNumber(
      joinParts([
        profile.id,
        profile.name,
        formatBirthdate(profile.birthYear, profile.birthMonth, profile.birthDay),
        formatBirthtime(profile.birthHour),
        profile.gender ?? 'male',
        profile.calendarType,
      ])
    ),
  }
}

export function resolveProfileNumericSeed(
  ctx: FortuneProfileSeedInput,
  kind: Exclude<FortuneSeedKind, 'compatibility' | 'tarot'>,
  options?: {
    year?: number
    month?: number
    dayKey?: string
    category?: FortuneCategory
  }
): number {
  if (ctx.profileId) {
    return hashSeedKeyToNumber(buildSajuSeedKey(ctx, kind, options))
  }
  return ctx.profileHash ?? hashSeedKeyToNumber(ctx.name)
}
