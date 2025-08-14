import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

// Basit in-memory bildirim depolama (production'da database kullanın)
interface Notification {
  id: string
  userId: string | null // null ise tüm kullanıcılara
  message: string
  type: "info" | "order" | "stock" | "promotion"
  read: boolean
  timestamp: Date
}

// Örnek bildirimler (production'da gerçek veritabanı kullanın)
const notifications: Notification[] = [
  // Genel bildirimler
  {
    id: "1",
    userId: null,
    message: "Tüm ürünlerde %15 indirim fırsatı!",
    type: "promotion",
    read: false,
    timestamp: new Date(Date.now() - 86400000), // 1 gün önce
  },
  {
    id: "2",
    userId: null,
    message: "Kargo teslimat süreleri Kurban Bayramı nedeniyle uzayabilir.",
    type: "info",
    read: false,
    timestamp: new Date(Date.now() - 172800000), // 2 gün önce
  },

  // Kullanıcıya özel bildirimler (Demo kullanıcı)
  {
    id: "3",
    userId: "1",
    message: "Siparişiniz hazırlanıyor. #ORD12345",
    type: "order",
    read: true,
    timestamp: new Date(Date.now() - 43200000), // 12 saat önce
  },
  {
    id: "4",
    userId: "1",
    message: "Siparişiniz kargoya verildi. #ORD12345",
    type: "order",
    read: false,
    timestamp: new Date(Date.now() - 7200000), // 2 saat önce
  },
  {
    id: "5",
    userId: "1",
    message: "İstek listenizde iPhone 13 Pro Max stokta!",
    type: "stock",
    read: false,
    timestamp: new Date(Date.now() - 3600000), // 1 saat önce
  },
]

// Bildirim ekle
export async function POST(request: Request) {
  // Admin oturumunu kontrol et
  const session = await getServerSession(authOptions)
  if (!session?.user || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { message, type, userIds } = body

    if (!message || !type) {
      return NextResponse.json({ error: "Message and type are required" }, { status: 400 })
    }

    // Birden fazla kullanıcıya bildirim gönder
    if (userIds && Array.isArray(userIds)) {
      const newNotifications = userIds.map((userId) => ({
        id: Date.now().toString() + "-" + userId,
        userId,
        message,
        type,
        read: false,
        timestamp: new Date(),
      }))

      notifications.push(...newNotifications)

      return NextResponse.json({
        success: true,
        notifications: newNotifications,
      })
    }

    // Herkese bildirim gönder
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: null,
      message,
      type,
      read: false,
      timestamp: new Date(),
    }

    notifications.push(newNotification)

    return NextResponse.json({
      success: true,
      notification: newNotification,
    })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}

// Bildirimleri listele
export async function GET(request: Request) {
  // Kullanıcı oturumunu kontrol et
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")
  const type = url.searchParams.get("type")
  const limit = Number.parseInt(url.searchParams.get("limit") || "20", 10)

  let userNotifications = notifications.filter(
    (notification) =>
      // Genel bildirimler veya kullanıcıya özel bildirimler
      notification.userId === null || notification.userId === session.user.id,
  )

  // Bildirim tipine göre filtrele
  if (type) {
    userNotifications = userNotifications.filter((n) => n.type === type)
  }

  // Admin kullanıcıları başka kullanıcıların bildirimlerini görebilir
  if (session.user.isAdmin && userId) {
    userNotifications = notifications.filter((notification) => notification.userId === userId)
  }

  // Bildirimler en yeni üstte olacak şekilde sırala
  userNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Sayfa limiti uygula
  userNotifications = userNotifications.slice(0, limit)

  return NextResponse.json({
    notifications: userNotifications,
    total: userNotifications.length,
  })
}
