'use server'

import { escapeHtml, sendEmail, STORE_EMAIL } from '@/lib/email'

/**
 * Server actions behind the contact, wholesale and newsletter forms. Each one
 * emails the store inbox with the submitter as Reply-To, so staff can answer
 * straight from their mail client.
 *
 * Every form carries a hidden `website` field; bots fill it, humans can't see
 * it. Submissions with it set are silently "accepted" so bots get no signal.
 */

export interface FormState {
  status: 'idle' | 'sent' | 'error'
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(form: FormData, name: string, max = 200): string {
  const v = form.get(name)
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

function isBot(form: FormData): boolean {
  return field(form, 'website') !== ''
}

async function sendToStore(subject: string, rows: [string, string][], replyTo: string): Promise<FormState> {
  const text = rows.map(([k, v]) => `${k}:\n${v}`).join('\n\n')
  const html = `<table cellpadding="6" style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; font-size: 14px; border-collapse: collapse;">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color: #888; vertical-align: top; white-space: nowrap;"><strong>${escapeHtml(k)}</strong></td><td style="color: #111; white-space: pre-wrap;">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>`

  const res = await sendEmail({ to: STORE_EMAIL, subject, html, text, replyTo })
  return res.ok
    ? { status: 'sent' }
    : { status: 'error', message: `Something went wrong. Please email ${STORE_EMAIL} directly.` }
}

export async function sendContactMessage(_prev: FormState, form: FormData): Promise<FormState> {
  if (isBot(form)) return { status: 'sent' }

  const name = field(form, 'name')
  const email = field(form, 'email')
  const order = field(form, 'order', 50)
  const topic = field(form, 'topic', 50)
  const message = field(form, 'message', 5000)

  if (!name || !EMAIL_RE.test(email) || !message) {
    return { status: 'error', message: 'Please fill in your name, a valid email and a message.' }
  }

  return sendToStore(
    `Contact form: ${topic || 'Enquiry'} — ${name}`,
    [
      ['Name', name],
      ['Email', email],
      ['Order number', order || '—'],
      ['Topic', topic || '—'],
      ['Message', message],
    ],
    email,
  )
}

export async function sendWholesaleApplication(_prev: FormState, form: FormData): Promise<FormState> {
  if (isBot(form)) return { status: 'sent' }

  const business = field(form, 'business')
  const abn = field(form, 'abn', 30)
  const name = field(form, 'name')
  const email = field(form, 'email')
  const monthly = field(form, 'monthly', 50)

  if (!business || !abn || !name || !EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Please complete every field with a valid email.' }
  }

  return sendToStore(
    `Wholesale application — ${business}`,
    [
      ['Business', business],
      ['ABN', abn],
      ['Contact name', name],
      ['Email', email],
      ['Est. monthly spend', monthly || '—'],
    ],
    email,
  )
}

export async function subscribeNewsletter(_prev: FormState, form: FormData): Promise<FormState> {
  if (isBot(form)) return { status: 'sent' }

  const email = field(form, 'email')
  if (!EMAIL_RE.test(email)) return { status: 'error', message: 'Please enter a valid email.' }

  return sendToStore(`Newsletter sign-up — ${email}`, [['Email', email]], email)
}
