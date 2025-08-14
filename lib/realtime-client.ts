"use client"

export interface NotificationData {
  id: string
  type: "order" | "stock" | "campaign" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export interface ChatMessage {
  id: string
  message: string
  sender: "user" | "support"
  timestamp: Date
  read: boolean
}

export interface StockUpdate {
  productId: string
  stock: number
  trend: "up" | "down" | "stable"
  lastUpdated: Date
}

class RealtimeClient {
  private notifications: NotificationData[] = []
  private chatMessages: ChatMessage[] = []
  private stockUpdates: Map<string, StockUpdate> = new Map()
  private listeners: Map<string, Function[]> = new Map()
  private isEnabled = false // Real-time events disabled

  constructor() {
    // Real-time functionality is disabled
    console.log("Real-time events are disabled")
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data: any) {
    // Disabled - no real-time events
    return
  }

  getNotifications(): NotificationData[] {
    return []
  }

  markNotificationAsRead(notificationId: string) {
    // Disabled
    return
  }

  getChatMessages(): ChatMessage[] {
    return []
  }

  sendChatMessage(message: string) {
    // Disabled
    return
  }

  getStockUpdate(productId: string): StockUpdate | undefined {
    return undefined
  }

  updateStock(productId: string, stock: number, trend: "up" | "down" | "stable" = "stable") {
    // Disabled
    return
  }

  disconnect() {
    // Nothing to disconnect
    return
  }
}

export const realtimeClient = new RealtimeClient()
