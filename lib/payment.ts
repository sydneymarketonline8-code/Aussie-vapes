export type PaymentMethod = 'payid' | 'bitcoin'

export const PAYMENT_METHODS: { id: PaymentMethod; label: string; tagline: string }[] = [
  { id: 'payid', label: 'PayID', tagline: 'Australian bank transfer — instant, no fees.' },
  { id: 'bitcoin', label: 'Bitcoin (BTC)', tagline: 'On-chain transfer. Confirmed in ~10 minutes.' },
]

export interface PayIdConfig {
  address: string
  name: string
}

export interface BitcoinConfig {
  address: string
}

export function getPayIdConfig(): PayIdConfig {
  return {
    address: process.env.PAYID_ADDRESS ?? '',
    name: process.env.PAYID_NAME ?? '',
  }
}

export function getBitcoinConfig(): BitcoinConfig {
  return { address: process.env.BTC_WALLET_ADDRESS ?? '' }
}

/**
 * Builds a BIP-21 bitcoin URI for QR rendering. Most wallets accept either
 * `bitcoin:<address>` or `bitcoin:<address>?amount=<btc>`; we only embed the
 * address because we don't perform AUD→BTC conversion server-side.
 */
export function buildBitcoinUri(address: string): string {
  return `bitcoin:${address}`
}

