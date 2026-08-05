import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  buildWhatsAppOrderLink,
  getWhatsAppConfig,
  type PaymentMethod,
} from '@/lib/payment'
import WhatsAppAutoLaunch from './WhatsAppAutoLaunch'

interface OrderForSuccess {
  number: string
  total: number
  customer_email: string
  customer_name: string | null
  payment_method: PaymentMethod | null
  payment_reference: string
  payment_status: string
}

export default async function CheckoutSuccessPage({
  params,
}: {
  params: { reference: string }
}) {
  const supabase = await createSupabaseServerClient()
  const { data: rows, error } = await supabase.rpc('get_order_for_payment', {
    ref: params.reference,
  })
  if (error) console.error('[checkout success] get_order_for_payment failed', error)
  const order = Array.isArray(rows) ? (rows[0] as OrderForSuccess | undefined) : null

  if (!order || !order.payment_method) notFound()

  const totalNum = Number(order.total)
  const total = totalNum.toFixed(2)
  const whatsappNumber = getWhatsAppConfig().number
  const whatsappLink = buildWhatsAppOrderLink({
    number: order.number,
    reference: order.payment_reference,
    total: totalNum,
    paymentMethod: order.payment_method,
    customerName: order.customer_name ?? undefined,
    customerEmail: order.customer_email,
  })

  return (
    <div className="container-site py-12 max-w-3xl">
      {whatsappLink && <WhatsAppAutoLaunch href={whatsappLink} />}

      <div className="flex items-start gap-3 mb-6">
        <CheckCircleIcon className="h-10 w-10 text-success flex-shrink-0" />
        <div>
          <h1 className="font-display text-3xl font-bold text-ink lowercase">order received</h1>
          <p className="text-body mt-1">
            We&apos;ve emailed a copy to <strong className="text-ink">{order.customer_email}</strong>.
            {whatsappLink
              ? ' Message us on WhatsApp using the button below — our team will lock your order in and send payment details over chat.'
              : ' Email us with your reference code and we’ll send payment details directly.'}
          </p>
        </div>
      </div>

      <div className="bg-soft-100 border border-line rounded-sm p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Field label="Order #" value={order.number} />
        <Field label="Reference" value={order.payment_reference} highlight />
        <Field label="Total" value={`$${total} AUD`} />
        <Field label="Status" value="Awaiting payment" />
      </div>

      {whatsappLink ? (
        <WhatsAppHandoff
          href={whatsappLink}
          reference={order.payment_reference}
          phoneDisplay={formatPhoneForDisplay(whatsappNumber)}
        />
      ) : (
        <div className="bg-warning/10 border border-warning/30 rounded-sm p-4 text-sm text-body">
          <strong className="text-ink">WhatsApp handoff is not configured.</strong> Set
          <code className="font-mono mx-1">NEXT_PUBLIC_WHATSAPP_NUMBER</code>
          in the environment to enable the one-tap WhatsApp confirmation. In the meantime, email
          <a href="mailto:sales@vapehubvapesaustralia.com.au" className="text-price font-semibold hover:underline mx-1">sales@vapehubvapesaustralia.com.au</a>
          with reference <strong className="font-mono text-ink">{order.payment_reference}</strong> to arrange payment.
        </div>
      )}

      <div className="mt-8 bg-white border border-line rounded-sm p-5 text-sm text-body">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Need help?</p>
        <p>
          Email <a href="mailto:sales@vapehubvapesaustralia.com.au" className="text-price font-semibold hover:underline">sales@vapehubvapesaustralia.com.au</a> with your reference code and we&apos;ll sort it out.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  )
}

function WhatsAppHandoff({
  href,
  reference,
  phoneDisplay,
}: {
  href: string
  reference: string
  phoneDisplay: string | null
}) {
  return (
    <div className="bg-[#25D366]/5 border-2 border-[#25D366] rounded-sm p-6">
      <div className="flex items-start gap-3 mb-4">
        <ChatBubbleLeftRightIcon className="h-7 w-7 text-[#128C7E] flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide leading-tight">
            Confirm on WhatsApp
          </h2>
          <p className="text-sm text-body mt-1">
            Tap below to open WhatsApp with your order details ready to send. Our team will reply
            with the payment details for your chosen method.
          </p>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-[#25D366] hover:bg-[#128C7E] transition-colors text-white font-display font-bold uppercase tracking-wider text-base py-4 rounded-sm shadow-sm"
      >
        Open WhatsApp & Send Order #{reference}
      </a>

      {phoneDisplay && (
        <p className="mt-3 text-center text-xs text-mute">
          Or save and message us at <strong className="text-ink font-display">{phoneDisplay}</strong>
        </p>
      )}

      <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-body">
        <Step n={1} label="Tap the button to open WhatsApp" />
        <Step n={2} label="Send the pre-filled message" />
        <Step n={3} label="We reply with payment details" />
      </ol>
    </div>
  )
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-sm bg-white border border-line">
      <span className="h-5 w-5 rounded-full bg-[#25D366] text-white font-display font-bold text-[11px] flex items-center justify-center flex-shrink-0">
        {n}
      </span>
      <span className="font-display font-semibold text-ink leading-snug">{label}</span>
    </div>
  )
}

/** Best-effort pretty-print of an E.164 digits-only number (e.g. AU mobile). */
function formatPhoneForDisplay(digits: string): string | null {
  if (!digits) return null
  if (digits.startsWith('61') && digits.length === 11) {
    return `+61 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  }
  return `+${digits}`
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="font-display text-[10px] font-bold uppercase tracking-widest text-mute">{label}</p>
      <p className={`font-display text-sm font-bold mt-0.5 ${highlight ? 'text-price' : 'text-ink'}`}>{value}</p>
    </div>
  )
}
