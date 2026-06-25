/** Pi Platform foundation SDK (https://sdk.minepi.com/pi-sdk.js) */
interface PiAuthUser {
  uid: string
  username?: string
}

interface PiAuthResult {
  accessToken: string
  user: PiAuthUser
}

interface PiIncompletePayment {
  identifier: string
}

type PiScope = 'username' | 'payments' | 'wallet_address'

interface PiInitOptions {
  version: string
  sandbox?: boolean
}

interface PiSDK {
  init(options: PiInitOptions): Promise<void>
  authenticate(
    scopes: PiScope[],
    onIncompletePaymentFound: (payment: PiIncompletePayment) => void
  ): Promise<PiAuthResult>
}

interface Window {
  Pi?: PiSDK
}
