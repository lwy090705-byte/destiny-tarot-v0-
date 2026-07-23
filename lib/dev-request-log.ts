/**
 * Development-only request instrumentation.
 * Never logs tokens, cookies, or PII.
 */

type DevRequestMeta = {
  url: string
  source: string
  method?: string
  attempt?: number
  inFlight?: boolean
}

const isDev =
  typeof process !== 'undefined' && process.env.NODE_ENV === 'development'

export function logDevRequest(meta: DevRequestMeta): void {
  if (!isDev) return
  const time = new Date().toISOString()
  console.debug('[dev-request]', {
    time,
    url: meta.url,
    source: meta.source,
    method: meta.method ?? 'GET',
    attempt: meta.attempt,
    inFlight: meta.inFlight,
  })
}

/** Wrap fetch to log /api/* calls in development only. */
export function createDevLoggedFetch(
  source: string,
  baseFetch: typeof fetch = fetch
): typeof fetch {
  if (!isDev) return baseFetch

  return async (input, init) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url
    if (url.includes('/api/')) {
      logDevRequest({
        url: url.split('?')[0] ?? url,
        source,
        method: init?.method ?? 'GET',
      })
    }
    return baseFetch(input, init)
  }
}
