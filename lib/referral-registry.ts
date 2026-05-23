/** Maps referral codes to nicknames for cross-user rewards on the same device + Supabase points. */

const REGISTRY_KEY = 'fortune-referral-registry'

export type ReferralRegistryEntry = {
  nickname: string
  referralCount: number
}

type Registry = Record<string, ReferralRegistryEntry>

function readRegistry(): Registry {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(REGISTRY_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Registry
  } catch {
    return {}
  }
}

function writeRegistry(registry: Registry): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry))
  } catch {
    /* ignore */
  }
}

export function registerReferralUser(
  referralCode: string,
  nickname: string,
  referralCount?: number
): void {
  const code = referralCode.trim().toUpperCase()
  if (!code) return
  const registry = readRegistry()
  const prev = registry[code]
  registry[code] = {
    nickname: nickname.trim(),
    referralCount:
      referralCount !== undefined
        ? referralCount
        : (prev?.referralCount ?? 0),
  }
  writeRegistry(registry)
}

export function getReferrerByCode(referralCode: string): ReferralRegistryEntry | null {
  const code = referralCode.trim().toUpperCase()
  return readRegistry()[code] ?? null
}

export function incrementReferrerCountInRegistry(referralCode: string): number {
  const code = referralCode.trim().toUpperCase()
  const registry = readRegistry()
  const entry = registry[code]
  if (!entry) return 0
  entry.referralCount = (entry.referralCount ?? 0) + 1
  writeRegistry(registry)
  return entry.referralCount
}
