import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type CartItem = { id: number; qty: number }

type CartContextType = {
  items: CartItem[]
  count: number
  addItem: (id: number, qty?: number) => void
  setQty: (id: number, qty: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)
const STORAGE_KEY = 'greenshop-cart'

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [items])

  const addItem = (id: number, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id)
      return found
        ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { id, qty }]
    })

  const setQty = (id: number, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clearCart = () => setItems([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, addItem, setQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}