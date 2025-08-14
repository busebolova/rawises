import { Server, type Socket } from "socket.io"
import { createServer } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import { parse } from "url"

// Basit kullanıcı durum takibi
interface User {
  id: string
  name: string
  status: "online" | "offline" | "away"
  lastActivity: Date
}

// Kullanıcıları in-memory saklama (production'da veritabanı kullanın)
const onlineUsers = new Map<string, User>()

// Son bildirimler (max 50)
const recentNotifications = new Array<{
  id: string
  userId: string | null // null ise herkese gönderilmiş
  message: string
  type: "info" | "order" | "stock" | "promotion"
  read: boolean
  timestamp: Date
}>()

// Stok güncellemesi için ürün durumları
interface ProductStock {
  productId: string
  stock: number
  lastUpdated: Date
}

const productStocks = new Map<string, ProductStock>()

// Aktif sohbetleri takip
interface ChatMessage {
  id: string
  userId: string
  adminId: string | null
  message: string
  timestamp: Date
  read: boolean
}

const activeChats = new Map<string, ChatMessage[]>()

// Socket.IO instance
let io: Server | null = null

export function initSocketServer(req: NextApiRequest, res: NextApiResponse) {
  if (io) return io

  // HTTP server oluştur
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true)
    res.writeHead(200).end("WebSocket server is running")
  })

  // Socket.IO server başlat
  io = new Server(httpServer, {
    path: "/api/ws",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

  // Bağlantı dinle
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id)

    // Kullanıcı kimlik doğrulama
    socket.on("authenticate", (userData: { userId: string; userName: string }) => {
      // Kullanıcı bilgisini sakla
      onlineUsers.set(userData.userId, {
        id: userData.userId,
        name: userData.userName,
        status: "online",
        lastActivity: new Date(),
      })

      // Kullanıcıyı odaya ekle
      socket.join(`user:${userData.userId}`)

      // Online kullanıcı sayısını yayınla
      io?.emit("onlineUsers", onlineUsers.size)

      console.log(`User authenticated: ${userData.userName} (${userData.userId})`)
    })

    // Bildirim alma
    socket.on("getNotifications", (userId: string) => {
      // Kullanıcıya ait veya genel bildirimleri filtrele
      const userNotifications = recentNotifications.filter(
        (notification) => notification.userId === null || notification.userId === userId,
      )

      // Bildirimleri gönder
      socket.emit("notifications", userNotifications)
    })

    // Bildirimi okundu olarak işaretle
    socket.on("markNotificationRead", (data: { userId: string; notificationId: string }) => {
      const notification = recentNotifications.find((n) => n.id === data.notificationId)
      if (notification) {
        notification.read = true

        // Bildirimi güncellenmiş haliyle kullanıcıya gönder
        socket.emit("notificationUpdated", notification)
      }
    })

    // Canlı destek mesajı gönderme
    socket.on("sendChatMessage", (data: { userId: string; message: string }) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: data.userId,
        adminId: null,
        message: data.message,
        timestamp: new Date(),
        read: false,
      }

      // Kullanıcının mesajlarını sakla
      const userMessages = activeChats.get(data.userId) || []
      userMessages.push(newMessage)
      activeChats.set(data.userId, userMessages)

      // Kullanıcıya ve destek ekibine mesajı yayınla
      io?.to(`user:${data.userId}`).emit("newChatMessage", newMessage)
      io?.to("admin").emit("newChatMessage", { ...newMessage, userId: data.userId })

      // Oto cevap (gerçek senaryoda daha karmaşık olabilir)
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: Date.now().toString(),
          userId: data.userId,
          adminId: "system",
          message: "Mesajınız için teşekkürler. Ekibimiz en kısa sürede size dönüş yapacak.",
          timestamp: new Date(),
          read: false,
        }

        // Oto cevabı sakla
        const userMessages = activeChats.get(data.userId) || []
        userMessages.push(autoReply)
        activeChats.set(data.userId, userMessages)

        // Oto cevabı kullanıcıya gönder
        io?.to(`user:${data.userId}`).emit("newChatMessage", autoReply)
      }, 2000)
    })

    // Stok bilgilerini takip etme
    socket.on("watchProductStock", (productId: string) => {
      socket.join(`product:${productId}`)

      // Eğer varsa, ürün stok bilgisini gönder
      const stockInfo = productStocks.get(productId)
      if (stockInfo) {
        socket.emit("productStockUpdate", stockInfo)
      }
    })

    // Bağlantı kapandığında
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)

      // Kullanıcıyı bul ve offline olarak işaretle
      for (const [userId, user] of onlineUsers.entries()) {
        const userSocket = io?.sockets.adapter.rooms.get(`user:${userId}`)

        // Eğer kullanıcının başka aktif bağlantısı yoksa offline yap
        if (!userSocket || userSocket.size === 0) {
          user.status = "offline"
          user.lastActivity = new Date()
        }
      }

      // Online kullanıcı sayısını güncelle
      io?.emit("onlineUsers", Array.from(onlineUsers.values()).filter((u) => u.status === "online").length)
    })
  })

  // HTTP server'ı dinle
  const PORT = process.env.WS_PORT || 3001
  httpServer.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`)
  })

  return io
}

// Stok güncellemesi yayınla
export function broadcastStockUpdate(productId: string, newStock: number) {
  // Stok bilgisini güncelle
  productStocks.set(productId, {
    productId,
    stock: newStock,
    lastUpdated: new Date(),
  })

  // Ürünü takip eden tüm kullanıcılara bildir
  io?.to(`product:${productId}`).emit("productStockUpdate", productStocks.get(productId))

  // Eğer stok kritik seviyede ise bildirim ekle
  if (newStock < 5 && newStock > 0) {
    const notification = {
      id: Date.now().toString(),
      userId: null, // Herkese açık bildirim
      message: `Dikkat! "${productId}" ürününden sadece ${newStock} adet kaldı!`,
      type: "stock" as const,
      read: false,
      timestamp: new Date(),
    }

    recentNotifications.push(notification)

    // Bildirim listesini 50 ile sınırla
    if (recentNotifications.length > 50) {
      recentNotifications.shift()
    }

    // Tüm kullanıcılara bildir
    io?.emit("newNotification", notification)
  }

  // Eğer stok tükenmişse bildirim ekle
  if (newStock === 0) {
    const notification = {
      id: Date.now().toString(),
      userId: null,
      message: `"${productId}" ürünü tükendi!`,
      type: "stock" as const,
      read: false,
      timestamp: new Date(),
    }

    recentNotifications.push(notification)

    // Bildirim listesini 50 ile sınırla
    if (recentNotifications.length > 50) {
      recentNotifications.shift()
    }

    // Tüm kullanıcılara bildir
    io?.emit("newNotification", notification)
  }
}

// Yeni kampanya bildirimi yayınla
export function broadcastPromotion(message: string, targetUserIds?: string[]) {
  const notification = {
    id: Date.now().toString(),
    userId: targetUserIds ? null : null, // Hedeflenen kullanıcılar varsa, yoksa herkese
    message,
    type: "promotion" as const,
    read: false,
    timestamp: new Date(),
  }

  recentNotifications.push(notification)

  // Bildirim listesini 50 ile sınırla
  if (recentNotifications.length > 50) {
    recentNotifications.shift()
  }

  // Hedeflenen kullanıcılara veya herkese gönder
  if (targetUserIds) {
    targetUserIds.forEach((userId) => {
      io?.to(`user:${userId}`).emit("newNotification", notification)
    })
  } else {
    io?.emit("newNotification", notification)
  }
}

// Sipariş durumu güncellemesi
export function broadcastOrderUpdate(orderId: string, userId: string, status: string, additionalInfo?: string) {
  const notification = {
    id: Date.now().toString(),
    userId,
    message: `Sipariş #${orderId} durumu: ${status}${additionalInfo ? ` (${additionalInfo})` : ""}`,
    type: "order" as const,
    read: false,
    timestamp: new Date(),
  }

  recentNotifications.push(notification)

  // Bildirim listesini 50 ile sınırla
  if (recentNotifications.length > 50) {
    recentNotifications.shift()
  }

  // Kullanıcıya bildir
  io?.to(`user:${userId}`).emit("newNotification", notification)
}

// Mesaj geçmişi al
export function getChatHistory(userId: string): ChatMessage[] {
  return activeChats.get(userId) || []
}
