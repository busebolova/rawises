import { create } from "zustand"

interface RealtimeState {
  isConnected: boolean
  lastUpdate: Date | null
  inventory: Record<string, number>
  orders: any[]
  notifications: any[]
  setConnected: (connected: boolean) => void
  updateInventory: (productId: string, quantity: number) => void
  addOrder: (order: any) => void
  addNotification: (notification: any) => void
  clearNotifications: () => void
}

export const useRealtimeStore = create<RealtimeState>((set, get) => ({
  isConnected: false,
  lastUpdate: null,
  inventory: {},
  orders: [],
  notifications: [],
  setConnected: (connected) => set({ isConnected: connected, lastUpdate: new Date() }),
  updateInventory: (productId, quantity) =>
    set((state) => ({
      inventory: { ...state.inventory, [productId]: quantity },
      lastUpdate: new Date(),
    })),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders.slice(0, 49)], // Keep last 50 orders
      lastUpdate: new Date(),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [{ ...notification, id: Date.now(), timestamp: new Date() }, ...state.notifications.slice(0, 19)],
      lastUpdate: new Date(),
    })),
  clearNotifications: () => set({ notifications: [] }),
}))
