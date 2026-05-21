import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { buildBitcoinUri, getBitcoinConfig, getPayIdConfig, type PaymentMethod } from '@/lib/payment'
import BitcoinQr from './BitcoinQr'
import CopyButton from './CopyButton'

interface OrderForSuccess {
  number: string
  total: number
  customer_email: string
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

  const method = order.payment_method
  const total = Number(order.total).toFixed(2)
  const payid = getPayIdConfig()
  const btc = getBitcoinConfig()

  return (
    <div className="container-site py-12 max-w-3xl">
      <div className="flex items-start gap-3 mb-6">
        <CheckCircleIcon className="h-10 w-10 text-success flex-shrink-0" />
        <div>
          <h1 className="font-display text-3xl font-bold text-ink lowercase">order received</h1>
          <p className="text-body mt-1">
            We&apos;ve emailed a copy to <strong className="text-ink">{order.customer_email}</strong>. Send payment below and we&apos;ll dispatch your order as soon as it lands.
          </p>
        </div>
      </div>

      <div className="bg-soft-100 border border-line rounded-sm p-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Field label="Order #" value={order.number} />
        <Field label="Reference" value={order.payment_reference} highlight />
        <Field label="Total" value={`$${total} AUD`} />
        <Field label="Status" value="Awaiting payment" />
      </div>

      {method === 'payid' ? (
        <PayIdInstructions
          amount={total}
          reference={order.payment_reference}
          address={payid.address}
          name={payid.name}
        />
      ) : (
        <BitcoinInstructions
          amount={total}
          reference={order.payment_reference}
          address={btc.address}
        />
      )}

      <div className="mt-8 bg-white border border-line rounded-sm p-5 text-sm text-body">
        <p className="font-display text-xs font-bold uppercase tracking-wider text-ink mb-1">Need help?</p>
        <p>
          Email <a href="mailto:sales@aussievapes.com.au" className="text-price font-semibold hover:underline">sales@aussievapes.com.au</a> with your reference code and we&apos;ll sort it out.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  )
}

function Field({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="font-display text-[10px] font-bold uppercase tracking-widest text-mute">{label}</p>
      <p className={`font-display text-sm font-bold mt-0.5 ${highlight ? 'text-price' : 'text-ink'}`}>{value}</p>
    </div>
  )
}

function PayIdInstructions({
  amount,
  reference,
  address,
  name,
}: {
  amount: string
  reference: string
  address: string
  name: string
}) {
  return (
    <div className="bg-white border-2 border-ink rounded-sm p-6">
      <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide mb-1">Pay by PayID</h2>
      <p className="text-sm text-body mb-5">
        Open your bank&apos;s app, choose <strong className="text-ink">PayID</strong>, and transfer the exact amount using the details below.
      </p>

      <div className="divide-y divide-line border border-line rounded-sm bg-soft-100">
        <Row label="PayID">
          <Mono value={address} />
        </Row>
        <Row label="Account name">
          <span className="font-display font-bold text-ink">{name}</span>
        </Row>
        <Row label="Amount">
          <span className="font-display font-bold text-price">${amount} AUD</span>
        </Row>
        <Row label="Reference (required)">
          <Mono value={reference} highlight />
        </Row>
      </div>

      <p className="mt-4 text-xs text-mute">
        <strong className="text-ink">Important:</strong> include the reference exactly as shown so we can match your payment to this order. Without it, dispatch will be delayed.
      </p>
    </div>
  )
}

function BitcoinInstructions({
  amount,
  reference,
  address,
}: {
  amount: string
  reference: string
  address: string
}) {
  const uri = buildBitcoinUri(address)
  return (
    <div className="bg-white border-2 border-ink rounded-sm p-6">
      <h2 className="font-display text-xl font-bold text-ink uppercase tracking-wide mb-1">Pay with Bitcoin</h2>
      <p className="text-sm text-body mb-5">
        Send the BTC equivalent of <strong className="text-ink">${amount} AUD</strong> to the address below. Scan the QR with your wallet, or copy the address manually.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-[180px,1fr] gap-5 items-start">
        <div className="bg-white p-3 border border-line rounded-sm self-start">
          <BitcoinQr value={uri} />
        </div>

        <div className="divide-y divide-line border border-line rounded-sm bg-soft-100">
          <Row label="BTC address">
            <Mono value={address} small />
          </Row>
          <Row label="Amount due">
            <span className="font-display font-bold text-price">${amount} AUD</span>
          </Row>
          <Row label="Reference (include in note)">
            <Mono value={reference} highlight />
          </Row>
        </div>
      </div>

      <p className="mt-4 text-xs text-mute">
        Convert the AUD total to BTC at the current rate when you send. Email <a href="mailto:sales@aussievapes.com.au" className="text-price hover:underline">sales@aussievapes.com.au</a> with your reference code once you&apos;ve broadcast the transaction.
      </p>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3">
      <span className="font-display text-[11px] font-bold uppercase tracking-widest text-mute">{label}</span>
      <span>{children}</span>
    </div>
  )
}

function Mono({ value, highlight, small }: { value: string; highlight?: boolean; small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-mono break-all ${small ? 'text-xs' : 'text-sm'} ${highlight ? 'text-price font-bold' : 'text-ink'}`}>{value}</span>
      <CopyButton value={value} />
    </div>
  )
}
