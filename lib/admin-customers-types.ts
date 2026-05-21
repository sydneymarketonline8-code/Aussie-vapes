export interface AdminCustomerSummary {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'customer' | 'admin' | 'staff'
  joinedAt: string
  ordersCount: number
  totalSpent: number
  lastOrderAt: string | null
}

export interface AdminCustomerOrder {
  id: string
  number: string
  status: string
  placedAt: string
  itemsCount: number
  total: number
}

export interface AdminCustomerDetail extends AdminCustomerSummary {
  phone: string | null
  orders: AdminCustomerOrder[]
}
