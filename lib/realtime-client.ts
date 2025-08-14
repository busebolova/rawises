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

  constructor() {
    // Initialize with some demo data
    this.initializeDemoData()
  }

  private initializeDemoData() {
    this.notifications = [
      {
        id: "1",
        type: "order",
        title: "Sipariş Onaylandı",
        message: "RW2024001234 numaralı siparişiniz onaylandı ve hazırlanıyor.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      },
      {
        id: "2",
        type: "campaign",
        title: "Yeni Kampanya",
        message: "Parfüm kategorisinde %25 indirim başladı!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
      },
    ]

    this.chatMessages = [
      {
        id: "1",
        message: "Merhaba, size nasıl yardımcı olabilirim?",
        sender: "support",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
      },
    ]
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
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  getNotifications(): NotificationData[] {
    return this.notifications
  }

  markNotificationAsRead(notificationId: string) {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.emit("notifications", this.notifications)
    }
  }

  getChatMessages(): ChatMessage[] {
    return this.chatMessages
  }

  sendChatMessage(message: string) {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      sender: "user",
      timestamp: new Date(),
      read: true,
    }

    this.chatMessages.push(newMessage)
    this.emit("chatMessages", this.chatMessages)
    this.emit("chatMessage", newMessage)

    // Simulate support response
    setTimeout(() => {
      const supportResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
        sender: "support",
        timestamp: new Date(),
        read: false,
      }

      this.chatMessages.push(supportResponse)
      this.emit("chatMessages", this.chatMessages)
      this.emit("chatMessage", supportResponse)
    }, 2000)
  }

  getStockUpdate(productId: string): StockUpdate | undefined {
    return this.stockUpdates.get(productId)
  }

  updateStock(productId: string, stock: number, trend: "up" | "down" | "stable" = "stable") {
    const update: StockUpdate = {
      productId,
      stock,
      trend,
      lastUpdated: new Date(),
    }

    this.stockUpdates.set(productId, update)
    this.emit("stockUpdate", update)
  }
}

export const realtimeClient = new RealtimeClient()
