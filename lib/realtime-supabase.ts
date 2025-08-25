"use client"

import { createClient } from "./supabase/client"
import { create } from "zustand"
import { useState, useEffect } from "react"

interface RealtimeState {
  products: any[]
  orders: any[]
  stockMovements: any[]
  discountSettings: any[]
  isConnected: boolean
  setProducts: (products: any[]) => void
  setOrders: (orders: any[]) => void
  setStockMovements: (movements: any[]) => void
  setDiscountSettings: (settings: any[]) => void
  setConnected: (connected: boolean) => void
  addProduct: (product: any) => void
  updateProduct: (id: string, updates: any) => void
  deleteProduct: (id: string) => void
  addOrder: (order: any) => void
  updateOrder: (id: string, updates: any) => void
  addStockMovement: (movement: any) => void
  updateDiscountSetting: (id: string, updates: any) => void
}

export const useRealtimeStore = create<RealtimeState>((set, get) => ({
  products: [],
  orders: [],
  stockMovements: [],
  discountSettings: [],
  isConnected: false,
  setProducts: (products) => set({ products }),
  setOrders: (orders) => set({ orders }),
  setStockMovements: (movements) => set({ stockMovements: movements }),
  setDiscountSettings: (settings) => set({ discountSettings: settings }),
  setConnected: (connected) => set({ isConnected: connected }),
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrder: (id, updates) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, ...updates } : o)),
    })),
  addStockMovement: (movement) =>
    set((state) => ({
      stockMovements: [movement, ...state.stockMovements],
    })),
  updateDiscountSetting: (id, updates) =>
    set((state) => ({
      discountSettings: state.discountSettings.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
}))

// Real-time subscription hook
export function useRealtimeSubscriptions() {
  const store = useRealtimeStore()
  const supabase = createClient()

  const initializeSubscriptions = () => {
    console.log("[v0] Initializing Supabase real-time subscriptions")

    // Products subscription
    const productsChannel = supabase
      .channel("products-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload) => {
        console.log("[v0] Products change:", payload)
        if (payload.eventType === "INSERT") {
          store.addProduct(payload.new)
        } else if (payload.eventType === "UPDATE") {
          store.updateProduct(payload.new.id, payload.new)
        } else if (payload.eventType === "DELETE") {
          store.deleteProduct(payload.old.id)
        }
      })
      .subscribe()

    // Orders subscription
    const ordersChannel = supabase
      .channel("orders-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        console.log("[v0] Orders change:", payload)
        if (payload.eventType === "INSERT") {
          store.addOrder(payload.new)
        } else if (payload.eventType === "UPDATE") {
          store.updateOrder(payload.new.id, payload.new)
        }
      })
      .subscribe()

    // Stock movements subscription
    const stockChannel = supabase
      .channel("stock-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "stock_movements" }, (payload) => {
        console.log("[v0] Stock movement change:", payload)
        if (payload.eventType === "INSERT") {
          store.addStockMovement(payload.new)
        }
      })
      .subscribe()

    // Discount settings subscription
    const discountChannel = supabase
      .channel("discount-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "discount_settings" }, (payload) => {
        console.log("[v0] Discount settings change:", payload)
        if (payload.eventType === "UPDATE") {
          store.updateDiscountSetting(payload.new.id, payload.new)
        }
      })
      .subscribe()

    // Set connection status
    store.setConnected(true)

    return () => {
      productsChannel.unsubscribe()
      ordersChannel.unsubscribe()
      stockChannel.unsubscribe()
      discountChannel.unsubscribe()
      store.setConnected(false)
    }
  }

  return { initializeSubscriptions }
}

// Hook that combines store and subscriptions
export function useRealtimeSupabase() {
  const store = useRealtimeStore()
  const { initializeSubscriptions } = useRealtimeSubscriptions()
  const supabase = createClient()

  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initializeData = async () => {
      try {
        console.log("[v0] Initializing Supabase data...")

        // Fetch initial data
        const [productsResult, ordersResult, stockResult, discountResult] = await Promise.all([
          supabase.from("products").select("*"),
          supabase.from("orders").select("*"),
          supabase.from("stock_movements").select("*"),
          supabase.from("discount_settings").select("*"),
        ])

        if (productsResult.data) store.setProducts(productsResult.data)
        if (ordersResult.data) store.setOrders(ordersResult.data)
        if (stockResult.data) store.setStockMovements(stockResult.data)
        if (discountResult.data) store.setDiscountSettings(discountResult.data)

        setLastUpdate(new Date())
        console.log("[v0] Initial data loaded successfully")

        // Initialize real-time subscriptions
        cleanup = initializeSubscriptions()
      } catch (error) {
        console.error("[v0] Error initializing Supabase data:", error)
        store.setConnected(false)
      }
    }

    initializeData()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  const clearNotifications = () => {
    setNotifications([])
  }

  return {
    products: store.products,
    orders: store.orders,
    inventory: store.products.reduce(
      (acc, product) => {
        acc[product.id] = product.stock_quantity || 0
        return acc
      },
      {} as Record<string, number>,
    ),
    stockMovements: store.stockMovements,
    discountSettings: store.discountSettings,
    isConnected: store.isConnected,
    lastUpdate,
    notifications,
    clearNotifications,
    // Store actions
    addProduct: store.addProduct,
    updateProduct: store.updateProduct,
    deleteProduct: store.deleteProduct,
    addOrder: store.addOrder,
    updateOrder: store.updateOrder,
    addStockMovement: store.addStockMovement,
    updateDiscountSetting: store.updateDiscountSetting,
  }
}
