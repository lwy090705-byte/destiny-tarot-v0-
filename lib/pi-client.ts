'use client'

const PI_SDK_URL = 'https://sdk.minepi.com/pi-sdk.js'
const SCOPES: PiScope[] = ['username']

let sdkLoadPromise: Promise<void> | null = null
let initPromise: Promise<void> | null = null

function waitForPiObject(timeoutMs = 15_000): Promise<PiSDK> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Pi SDK is only available in the browser'))
      return
    }

    if (window.Pi) {
      resolve(window.Pi)
      return
    }

    const started = Date.now()
    const timer = window.setInterval(() => {
      if (window.Pi) {
        window.clearInterval(timer)
        resolve(window.Pi)
        return
      }
      if (Date.now() - started >= timeoutMs) {
        window.clearInterval(timer)
        reject(new Error('Pi SDK failed to load'))
      }
    }, 50)
  })
}

export function loadPiSdk(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Pi SDK is only available in the browser'))
  }

  if (window.Pi) {
    return Promise.resolve()
  }

  if (sdkLoadPromise) {
    return sdkLoadPromise
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${PI_SDK_URL}"]`
    )
    if (existing) {
      waitForPiObject()
        .then(() => resolve())
        .catch(reject)
      return
    }

    const script = document.createElement('script')
    script.src = PI_SDK_URL
    script.async = true
    script.onload = () => {
      waitForPiObject()
        .then(() => resolve())
        .catch(reject)
    }
    script.onerror = () => reject(new Error('Failed to load Pi SDK script'))
    document.head.appendChild(script)
  })

  return sdkLoadPromise
}

export async function ensurePiInitialized(): Promise<PiSDK> {
  await loadPiSdk()

  if (!initPromise) {
    initPromise = (async () => {
      const Pi = window.Pi
      if (!Pi) {
        throw new Error('Pi SDK is not available')
      }
      await Pi.init({
        version: '2.0',
        sandbox: process.env.NEXT_PUBLIC_PI_SANDBOX === 'true',
      })
    })()
  }

  await initPromise

  const Pi = window.Pi
  if (!Pi) {
    throw new Error('Pi SDK is not available after init')
  }
  return Pi
}

function onIncompletePaymentFound(payment: PiIncompletePayment): void {
  console.warn('[pi] incomplete payment found:', payment.identifier)
}

export async function authenticateWithPi(): Promise<PiAuthResult> {
  const Pi = await ensurePiInitialized()
  return Pi.authenticate(SCOPES, onIncompletePaymentFound)
}
