/**
 * Sales-team notifications for orders awaiting manual payment confirmation.
 *
 * Always emails the store inbox (STORE_EMAIL). If SLACK_SALES_WEBHOOK_URL is
 * also set, posts a Slack-formatted message to it as well.
 *
 * Never throws — a notification failure should not block order creation.
 */

import type { PaymentMethod } from '@/lib/payment'
import { escapeHtml, sendEmail, STORE_EMAIL } from '@/lib/email'

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

  const plain = [
    `New order awaiting payment — ${n.orderNumber}`,
    ``,
    `Method:    ${n.method.toUpperCase()}`,
    `Amount:    $${n.totalAud.toFixed(2)} AUD`,
    `Reference: ${n.reference}`,
    `Customer:  ${n.customerName} <${n.customerEmail}>`,
  ].join('\n')

  await sendEmail({
    to: STORE_EMAIL,
    subject: `New order ${n.orderNumber} — $${n.totalAud.toFixed(2)} via ${n.method.toUpperCase()}`,
    html: `<pre style="font-family: monospace; font-size: 14px;">${escapeHtml(plain)}</pre>`,
    text: plain,
    replyTo: n.customerEmail,
  })

  if (!webhook) return

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
