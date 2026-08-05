/**
 * Transactional email via Resend.
 *
 * If RESEND_API_KEY is unset, falls back to logging the message to the
 * server console — so the code path works in dev without an account, and
 * production can be wired up later by just adding the key.
 *
 * RESEND_FROM controls the From address; defaults to "VapeHub Vapes Australia <orders@vapehubvapesaustralia.com.au>".
 * Whatever address you use must be verified in the Resend dashboard first.
 *
 * Never throws — email failures shouldn't block order creation.
 */

export interface EmailMessage {
  to: string
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export async function sendEmail(msg: EmailMessage): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'VapeHub Vapes Australia <orders@vapehubvapesaustralia.com.au>'

  if (!key) {
    console.log(
      `[email] (no RESEND_API_KEY — logging) to=${msg.to} subject="${msg.subject}"\n${msg.text ?? msg.html}`,
    )
    return { ok: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        reply_to: msg.replyTo,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('[email] resend api error', res.status, body)
      return { ok: false, error: `Resend ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    console.error('[email] resend fetch failed', err)
    return { ok: false, error: 'fetch failed' }
  }
}
