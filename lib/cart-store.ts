"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./csv-parser"

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
          }))
        }

        // Update totals
        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)

        set({ totalItems, totalPrice })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))

        // Update totals
        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)

        set({ totalItems, totalPrice })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))

        // Update totals
        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = newItems.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0)

        set({ totalItems, totalPrice })
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
