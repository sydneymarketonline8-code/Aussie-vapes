export interface AdminCoupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderValue: number
  maxUses: number
  uses: number
  expiresAt: string | null
  isActive: boolean
}
