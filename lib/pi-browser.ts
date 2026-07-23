'use client'

/**
 * Detect Pi Browser / Pi webview.
 * Regular Chrome/Safari must not auto-trigger Pi auth API traffic.
 */
export function isPiBrowserEnvironment(): boolean {
  if (typeof window === 'undefined') return false

  const ua = navigator.userAgent || ''
  if (/PiBrowser/i.test(ua)) return true
  if (/PiNetwork/i.test(ua)) return true

  // Pi injects window.Pi early in its browser; absence usually means normal browser
  try {
    if (typeof (window as Window & { Pi?: unknown }).Pi !== 'undefined') {
      return true
    }
  } catch {
    /* ignore */
  }

  return false
}
