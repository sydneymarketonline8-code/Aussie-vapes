/**
 * Sales-team notifications for orders awaiting manual payment confirmation.
 *
 * If SLACK_SALES_WEBHOOK_URL is set, posts a Slack-formatted message to it.
 * Otherwise logs to the server console so the wiring works in dev without
 * any external service configured.
 *
 * Never throws — a notification failure should not block order creation.
 */

import type { PaymentMethod } from '@/lib/payment'

export interface PendingPaymentNotification {
  orderNumber: string
  reference: string
  method: PaymentMethod
  totalAud: number
  customerEmail: string
  customerName: string
}

export async function notifySalesPendingPayment(n: PendingPaymentNotification) {
  const webhook = process.env.SLACK_SALES_WEBHOOK_URL
  const lines = [
    `*New order awaiting payment* — ${n.orderNumber}`,
    `• Method: *${n.method.toUpperCase()}*`,
    `• Amount: *$${n.totalAud.toFixed(2)} AUD*`,
    `• Reference: \`${n.reference}\``,
    `• Customer: ${n.customerName} <${n.customerEmail}>`,
  ]
  const text = lines.join('\n')

  if (!webhook) {
    console.log('[sales notify]\n' + text)
    return
  }

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  } catch (err) {
    console.error('[sales notify] webhook post failed', err)
  }
}
