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
  totalPriceWithoutVAT: number
  vatAmount: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const VAT_RATE = 0.2 // %20 KDV

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalPriceWithoutVAT: 0,
      vatAmount: 0,

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

        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPriceWithoutVAT = newItems.reduce((sum, item) => {
          const price = Number.parseFloat(item.discountPrice?.toString() || "0") || 0
          return sum + price * item.quantity
        }, 0)
        const vatAmount = totalPriceWithoutVAT * VAT_RATE
        const totalPrice = totalPriceWithoutVAT + vatAmount

        set({ totalItems, totalPrice, totalPriceWithoutVAT, vatAmount })
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))

        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPriceWithoutVAT = newItems.reduce((sum, item) => {
          const price = Number.parseFloat(item.discountPrice?.toString() || "0") || 0
          return sum + price * item.quantity
        }, 0)
        const vatAmount = totalPriceWithoutVAT * VAT_RATE
        const totalPrice = totalPriceWithoutVAT + vatAmount

        set({ totalItems, totalPrice, totalPriceWithoutVAT, vatAmount })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))

        const newItems = get().items
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPriceWithoutVAT = newItems.reduce((sum, item) => {
          const price = Number.parseFloat(item.discountPrice?.toString() || "0") || 0
          return sum + price * item.quantity
        }, 0)
        const vatAmount = totalPriceWithoutVAT * VAT_RATE
        const totalPrice = totalPriceWithoutVAT + vatAmount

        set({ totalItems, totalPrice, totalPriceWithoutVAT, vatAmount })
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0, totalPriceWithoutVAT: 0, vatAmount: 0 })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
