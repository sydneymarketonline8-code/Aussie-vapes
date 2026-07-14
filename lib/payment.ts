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

/**
 * WhatsApp confirmation flow.
 *
 * After the customer places an order, we redirect them to WhatsApp with a
 * pre-filled message so the sales team can lock the order in and arrange
 * payment offline. The number is configured via NEXT_PUBLIC_WHATSAPP_NUMBER
 * (E.164, with or without the leading "+", spaces and dashes are stripped).
 */
export interface WhatsAppConfig {
  /** Sanitised E.164 number (digits only, no leading "+"). */
  number: string
}

// Hardcoded, NOT env-driven — a stale NEXT_PUBLIC_WHATSAPP_NUMBER in the host
// kept resurrecting old/banned numbers. Keep in sync with WHATSAPP_NUMBER in
// components/layout/WhatsAppButton.tsx.
const WHATSAPP_NUMBER = '61485882439'

export function getWhatsAppConfig(): WhatsAppConfig {
  return { number: WHATSAPP_NUMBER.replace(/\D+/g, '') }
}

export interface WhatsAppOrderSummary {
  number: string
  reference: string
  total: number
  paymentMethod: PaymentMethod
  customerName?: string
  customerEmail?: string
}

/**
 * Returns a wa.me deep-link with the order summary pre-filled, or null when
 * NEXT_PUBLIC_WHATSAPP_NUMBER is not configured (in which case the UI should
 * fall back to manual payment instructions).
 */
export function buildWhatsAppOrderLink(summary: WhatsAppOrderSummary): string | null {
  const { number } = getWhatsAppConfig()
  if (!number) return null

  const methodLabel =
    PAYMENT_METHODS.find((m) => m.id === summary.paymentMethod)?.label ?? summary.paymentMethod

  const lines = [
    `Hi Vapes Australia, I'd like to confirm my order:`,
    ``,
    `Order: ${summary.number}`,
    `Reference: ${summary.reference}`,
    `Total: $${summary.total.toFixed(2)} AUD`,
    `Payment method: ${methodLabel}`,
    summary.customerName ? `Name: ${summary.customerName}` : null,
    summary.customerEmail ? `Email: ${summary.customerEmail}` : null,
    ``,
    `Ready to send payment — please confirm the details.`,
  ]
    .filter((l): l is string => l !== null)
    .join('\n')

  return `https://wa.me/${number}?text=${encodeURIComponent(lines)}`
}

