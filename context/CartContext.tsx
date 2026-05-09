'use client'

import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import type { CartItem, CartState, Product } from '@/types'

type Action =
  | { type: 'ADD_ITEM'; payload: { product: Product; flavour?: string; nicotine?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, flavour, nicotine } = action.payload
      const key = `${product.id}-${flavour ?? ''}-${nicotine ?? ''}`
      const existing = state.items.find(
        (i) =>
          i.product.id === product.id &&
          i.selectedFlavour === flavour &&
          i.selectedNicotine === nicotine
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === existing.product.id &&
            i.selectedFlavour === existing.selectedFlavour &&
            i.selectedNicotine === existing.selectedNicotine
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product, quantity: 1, selectedFlavour: flavour, selectedNicotine: nicotine },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
          )
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

const STORAGE_KEY = 'vapevault-cart'

interface CartContextValue {
  state: CartState
  addItem: (product: Product, flavour?: string, nicotine?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false }, (init) => {
    if (typeof window === 'undefined') return init
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...JSON.parse(saved), isOpen: false } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }))
  }, [state.items])

  const addItem = useCallback(
    (product: Product, flavour?: string, nicotine?: string) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, flavour, nicotine } })
      dispatch({ type: 'OPEN_CART' })
    },
    []
  )

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id: productId, quantity } })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), [])
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), [])

  const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal = state.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
