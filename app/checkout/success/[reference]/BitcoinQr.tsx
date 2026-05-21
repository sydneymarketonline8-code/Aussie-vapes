'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function BitcoinQr({ value }: { value: string }) {
  return <QRCodeSVG value={value} size={156} level="M" marginSize={0} />
}
