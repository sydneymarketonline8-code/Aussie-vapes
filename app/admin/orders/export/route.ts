import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin-auth'
import { listAdminOrders } from '@/lib/admin-orders'

export const dynamic = 'force-dynamic'

function escapeCsv(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

const HEADERS = [
  'Order #',
  'Placed At',
  'Status',
  'Payment Status',
  'Payment Method',
  'Payment Reference',
  'Customer Name',
  'Customer Email',
  'Items',
  'Total AUD',
]

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const orders = await listAdminOrders()

  const lines: string[] = []
  lines.push(HEADERS.join(','))
  for (const o of orders) {
    lines.push([
      o.number,
      o.placedAt,
      o.status,
      o.paymentStatus,
      o.paymentMethod ?? '',
      o.paymentReference ?? '',
      o.customerName,
      o.customerEmail,
      String(o.itemsCount),
      o.total.toFixed(2),
    ].map(escapeCsv).join(','))
  }
  // Excel-friendly UTF-8 BOM + CRLF line endings
  const csv = '﻿' + lines.join('\r\n') + '\r\n'

  const today = new Date().toISOString().slice(0, 10)
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="aussievapes-orders-${today}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
