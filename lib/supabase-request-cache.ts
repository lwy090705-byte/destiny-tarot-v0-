/**
 * In-flight dedupe + short TTL memory cache for Supabase reads.
 * Prevents identical concurrent/repeated requests from multiplying API usage.
 *
 * Cache key conventions:
 * - User-scoped reads MUST include nickname (or user code): e.g. `points-total:${nick}`
 * - Shared public reads may use global keys: e.g. `visit-stats:${date}` (operator dashboard)
 * - Never put one user's points/profile under a key without their nickname
 */

type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const memory = new Map<string, CacheEntry<unknown>>()
const inflight = new Map<string, Promise<unknown>>()

export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number
): Promise<T> {
  const now = Date.now()
  const hit = memory.get(key) as CacheEntry<T> | undefined
  if (hit && hit.expiresAt > now) {
    return hit.value
  }

  const pending = inflight.get(key) as Promise<T> | undefined
  if (pending) return pending

  const promise = fetcher()
    .then((value) => {
      memory.set(key, { value, expiresAt: Date.now() + ttlMs })
      return value
    })
    .catch((err) => {
      // Do not cache failures / empty fallbacks from rejected fetchers.
      memory.delete(key)
      throw err
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, promise)
  return promise
}

export function invalidateCachedFetch(keyPrefix: string): void {
  for (const key of memory.keys()) {
    if (key === keyPrefix || key.startsWith(keyPrefix)) {
      memory.delete(key)
    }
  }
  for (const key of inflight.keys()) {
    if (key === keyPrefix || key.startsWith(keyPrefix)) {
      inflight.delete(key)
    }
  }
}

/** Drop every memory + in-flight entry (logout / full reset). */
export function clearAllCachedFetches(): void {
  memory.clear()
  inflight.clear()
}

/**
 * Clear caches that can hold user-specific data.
 * Call on nickname change or logout so the next user never sees prior totals.
 */
export function clearUserScopedCaches(nickname?: string): void {
  const nick = nickname?.trim().toLowerCase()
  if (nick) {
    invalidateCachedFetch(`points-total:${nick}`)
  } else {
    invalidateCachedFetch('points-total:')
  }
  // Operator visit stats are not user PII but should not survive session switches
  invalidateCachedFetch('visit-stats:')
}
