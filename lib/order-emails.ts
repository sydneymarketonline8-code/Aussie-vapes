import { sendEmail } from './email'
import { getBitcoinConfig, getPayIdConfig, type PaymentMethod } from './payment'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vapehubvapesaustralia.com.au'

export interface OrderConfirmationParams {
  to: string
  customerName: string
  orderNumber: string
  reference: string
  method: PaymentMethod
  totalAud: number
}

/**
 * Sends the customer the "thanks for your order" email with the payment
 * instructions matching their chosen method. Mirrors what the success page
 * shows, plus a link back to it.
 */
export async function sendOrderConfirmationEmail(p: OrderConfirmationParams) {
  const successUrl = `${SITE_URL}/checkout/success/${p.reference}`
  const payid = getPayIdConfig()
  const btc = getBitcoinConfig()

  const paymentBlock = p.method === 'payid'
    ? payIdBlock(payid.address, payid.name, p.totalAud, p.reference)
    : bitcoinBlock(btc.address, p.totalAud, p.reference)

  const html = `
<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f5f5f5; padding: 24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="background: #ffffff; max-width: 600px; width: 100%; border: 1px solid #e5e5e5; border-radius: 4px;">
    <tr><td style="padding: 28px 28px 20px;">
      <h1 style="font-size: 24px; margin: 0 0 4px; color: #111;">Thanks for your order</h1>
      <p style="margin: 0; color: #555;">Hi ${escape(p.customerName)} — we've received order <strong>${escape(p.orderNumber)}</strong>. Send payment below and we'll dispatch as soon as it lands.</p>
    </td></tr>

    <tr><td style="padding: 0 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 4px;">
        <tr>
          <td style="padding: 12px 16px; border-right: 1px solid #e5e5e5;">
            <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.08em; font-weight: bold;">Order #</div>
            <div style="font-size: 14px; color: #111; font-weight: bold; margin-top: 2px;">${escape(p.orderNumber)}</div>
          </td>
          <td style="padding: 12px 16px; border-right: 1px solid #e5e5e5;">
            <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.08em; font-weight: bold;">Reference</div>
            <div style="font-size: 14px; color: #ff0000; font-weight: bold; font-family: monospace; margin-top: 2px;">${escape(p.reference)}</div>
          </td>
          <td style="padding: 12px 16px;">
            <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.08em; font-weight: bold;">Total</div>
            <div style="font-size: 14px; color: #111; font-weight: bold; margin-top: 2px;">$${p.totalAud.toFixed(2)} AUD</div>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding: 24px 28px 0;">
      ${paymentBlock}
    </td></tr>

    <tr><td style="padding: 20px 28px 28px;">
      <a href="${successUrl}" style="display: inline-block; background: #111; color: #fff; text-decoration: none; padding: 10px 18px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.06em; border-radius: 4px;">View payment instructions online</a>
      <p style="margin: 18px 0 0; font-size: 12px; color: #888; line-height: 1.5;">
        Questions? Reply to this email or contact <a href="mailto:sales@vapehubvapesaustralia.com.au" style="color: #ff0000;">sales@vapehubvapesaustralia.com.au</a> with your reference code.
      </p>
    </td></tr>
  </table>
</body></html>`.trim()

  const text = [
    `Thanks for your order, ${p.customerName}.`,
    ``,
    `Order:     ${p.orderNumber}`,
    `Reference: ${p.reference}`,
    `Total:     $${p.totalAud.toFixed(2)} AUD`,
    ``,
    p.method === 'payid'
      ? `PAY BY PAYID
Address:   ${payid.address}
Account:   ${payid.name}
Amount:    $${p.totalAud.toFixed(2)} AUD
Reference: ${p.reference}   (include exactly so we can match the transfer)`
      : `PAY WITH BITCOIN
Address:   ${btc.address}
Amount:    $${p.totalAud.toFixed(2)} AUD equivalent in BTC
Reference: ${p.reference}   (include in the transaction note)`,
    ``,
    `View instructions online: ${successUrl}`,
  ].join('\n')

  return sendEmail({
    to: p.to,
    subject: `Order ${p.orderNumber} received — payment instructions inside`,
    html,
    text,
    replyTo: 'sales@vapehubvapesaustralia.com.au',
  })
}

function payIdBlock(address: string, name: string, total: number, reference: string): string {
  return `
<div style="border: 2px solid #111; border-radius: 4px; padding: 16px;">
  <h2 style="font-size: 16px; margin: 0 0 12px; color: #111; text-transform: uppercase; letter-spacing: 0.04em;">Pay by PayID</h2>
  <p style="font-size: 13px; color: #555; margin: 0 0 14px;">Open your bank app, choose <strong>PayID</strong>, and transfer the exact amount.</p>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #888; width: 130px;">PayID</td><td style="padding: 6px 0; color: #111; font-family: monospace;"><strong>${escape(address)}</strong></td></tr>
    <tr><td style="padding: 6px 0; color: #888;">Account name</td><td style="padding: 6px 0; color: #111;"><strong>${escape(name)}</strong></td></tr>
    <tr><td style="padding: 6px 0; color: #888;">Amount</td><td style="padding: 6px 0; color: #ff0000;"><strong>$${total.toFixed(2)} AUD</strong></td></tr>
    <tr><td style="padding: 6px 0; color: #888;">Reference</td><td style="padding: 6px 0; color: #ff0000; font-family: monospace;"><strong>${escape(reference)}</strong></td></tr>
  </table>
  <p style="font-size: 11px; color: #888; margin: 12px 0 0;"><strong>Important:</strong> include the reference exactly. Without it, dispatch will be delayed.</p>
</div>`.trim()
}

function bitcoinBlock(address: string, total: number, reference: string): string {
  return `
<div style="border: 2px solid #111; border-radius: 4px; padding: 16px;">
  <h2 style="font-size: 16px; margin: 0 0 12px; color: #111; text-transform: uppercase; letter-spacing: 0.04em;">Pay with Bitcoin</h2>
  <p style="font-size: 13px; color: #555; margin: 0 0 14px;">Send the BTC equivalent of <strong>$${total.toFixed(2)} AUD</strong> to:</p>
  <p style="font-size: 13px; word-break: break-all; background: #f5f5f5; border: 1px solid #e5e5e5; padding: 10px; border-radius: 4px; font-family: monospace; margin: 0 0 12px;">${escape(address)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #888; width: 130px;">Amount due</td><td style="padding: 6px 0; color: #ff0000;"><strong>$${total.toFixed(2)} AUD</strong></td></tr>
    <tr><td style="padding: 6px 0; color: #888;">Reference</td><td style="padding: 6px 0; color: #ff0000; font-family: monospace;"><strong>${escape(reference)}</strong></td></tr>
  </table>
  <p style="font-size: 11px; color: #888; margin: 12px 0 0;">Email <a href="mailto:sales@vapehubvapesaustralia.com.au" style="color: #ff0000;">sales@vapehubvapesaustralia.com.au</a> with your reference code once you've broadcast the transaction.</p>
</div>`.trim()
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
