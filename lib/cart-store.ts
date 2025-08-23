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
  memberDiscount: number
  memberDiscountAmount: number
  finalTotal: number
  isHydrated: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyMemberDiscount: () => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

const VAT_RATE = 0.2 // %20 KDV

const calculateTotals = (items: CartItem[], memberDiscount = 0) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPriceWithoutVAT = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.discountPrice?.toString() || "0") || 0
    return sum + price * item.quantity
  }, 0)

  const memberDiscountAmount = (totalPriceWithoutVAT * memberDiscount) / 100
  const discountedPriceWithoutVAT = totalPriceWithoutVAT - memberDiscountAmount

  const vatAmount = discountedPriceWithoutVAT * VAT_RATE
  const totalPrice = totalPriceWithoutVAT + totalPriceWithoutVAT * VAT_RATE
  const finalTotal = discountedPriceWithoutVAT + vatAmount

  return {
    totalItems,
    totalPrice,
    totalPriceWithoutVAT,
    vatAmount: totalPriceWithoutVAT * VAT_RATE,
    memberDiscountAmount,
    finalTotal,
  }
}

const getMemberDiscountSettings = () => {
  if (typeof window === "undefined")
    return { memberDiscountEnabled: false, memberDiscountRate: 0, minimumOrderAmount: 0 }

  const saved = localStorage.getItem("adminDiscountSettings")
  if (saved) {
    return JSON.parse(saved)
  }
  return { memberDiscountEnabled: true, memberDiscountRate: 15, minimumOrderAmount: 0 }
}

const isUserLoggedIn = () => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("user")
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalPriceWithoutVAT: 0,
      vatAmount: 0,
      memberDiscount: 0,
      memberDiscountAmount: 0,
      finalTotal: 0,
      isHydrated: false,
      _hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state, isHydrated: state })
        if (state) {
          get().applyMemberDiscount()
        }
      },

      applyMemberDiscount: () => {
        const discountSettings = getMemberDiscountSettings()
        const userLoggedIn = isUserLoggedIn()

        let memberDiscount = 0
        if (userLoggedIn && discountSettings.memberDiscountEnabled) {
          const currentTotal = get().totalPriceWithoutVAT
          if (currentTotal >= discountSettings.minimumOrderAmount) {
            memberDiscount = discountSettings.memberDiscountRate
          }
        }

        const items = get().items
        const totals = calculateTotals(items, memberDiscount)
        set({
          ...totals,
          memberDiscount,
        })
      },

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        let newItems: CartItem[]
        if (existingItem) {
          newItems = items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
          newItems = [...items, { ...product, quantity: 1 }]
        }

        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
        get().applyMemberDiscount()
      },

      removeItem: (productId: string) => {
        const newItems = get().items.filter((item) => item.id !== productId)
        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
        get().applyMemberDiscount()
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const newItems = get().items.map((item) => (item.id === productId ? { ...item, quantity } : item))

        const totals = calculateTotals(newItems)
        set({ items: newItems, ...totals })
        get().applyMemberDiscount()
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          totalPriceWithoutVAT: 0,
          vatAmount: 0,
          memberDiscount: 0,
          memberDiscountAmount: 0,
          finalTotal: 0,
        })
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const totals = calculateTotals(state.items)
          state.totalItems = totals.totalItems
          state.totalPrice = totals.totalPrice
          state.totalPriceWithoutVAT = totals.totalPriceWithoutVAT
          state.vatAmount = totals.vatAmount
          state.memberDiscountAmount = totals.memberDiscountAmount
          state.finalTotal = totals.finalTotal
          state.setHasHydrated(true)
        }
      },
    },
  ),
)
