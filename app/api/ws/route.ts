import type { NextRequest } from "next/server"

export const dynamic = "force-dynamic"

// Mock data for demonstration
const mockNotifications = [
  {
    id: "1",
    type: "order" as const,
    title: "Sipariş Onaylandı",
    message: "Siparişiniz #12345 onaylandı ve hazırlanıyor.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: "2",
    type: "stock" as const,
    title: "Stok Güncellemesi",
    message: "iPhone 15 Pro tekrar stokta!",
    timestamp: new Date(Date.now() - 300000),
    read: false,
  },
  {
    id: "3",
    type: "campaign" as const,
    title: "Yeni Kampanya",
    message: "Elektronik ürünlerde %20 indirim başladı!",
    timestamp: new Date(Date.now() - 600000),
    read: true,
  },
]

const mockChatMessages = [
  {
    id: "1",
    message: "Merhaba, size nasıl yardımcı olabilirim?",
    sender: "support" as const,
    timestamp: new Date(Date.now() - 60000),
  },
]

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode('data: {"type":"connected","message":"WebSocket connection established"}\n\n'))

      // Send initial data
      const initialData = {
        type: "init",
        notifications: mockNotifications,
        chatMessages: mockChatMessages,
      }

      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`))

      // Send periodic updates
      const interval = setInterval(() => {
        // Send user count update
        const userCount = Math.floor(Math.random() * 100) + 50
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "user_count",
              payload: { count: userCount },
            })}\n\n`,
          ),
        )

        // Randomly send notifications
        if (Math.random() < 0.3) {
          const notifications = [
            {
              id: Date.now().toString(),
              type: "stock",
              title: "Stok Uyarısı",
              message: "MacBook Air M2 stoku azalıyor!",
              timestamp: new Date(),
              read: false,
            },
            {
              id: Date.now().toString(),
              type: "campaign",
              title: "Flash Sale",
              message: "Sadece bugün geçerli %30 indirim!",
              timestamp: new Date(),
              read: false,
            },
            {
              id: Date.now().toString(),
              type: "order",
              title: "Sipariş Güncelleme",
              message: "Siparişiniz kargoya verildi.",
              timestamp: new Date(),
              read: false,
            },
          ]

          const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "notification",
                payload: randomNotification,
              })}\n\n`,
            ),
          )
        }

        // Randomly send stock updates
        if (Math.random() < 0.4) {
          const products = ["iphone-15-pro", "macbook-air-m2", "airpods-pro", "ipad-pro"]
          const randomProduct = products[Math.floor(Math.random() * products.length)]
          const stock = Math.floor(Math.random() * 50)
          const trends = ["up", "down", "stable"] as const
          const randomTrend = trends[Math.floor(Math.random() * trends.length)]

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "stock",
                payload: {
                  productId: randomProduct,
                  stock,
                  trend: randomTrend,
                  lastUpdated: new Date(),
                },
              })}\n\n`,
            ),
          )
        }

        // Send server running update
        const serverRunningData = `data: ${JSON.stringify({
          type: "update",
          timestamp: new Date().toISOString(),
          message: "Server is running",
        })}\n\n`
        controller.enqueue(encoder.encode(serverRunningData))
      }, 5000) // Every 5 seconds

      // Send periodic heartbeat
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`data: {"type":"heartbeat","timestamp":${Date.now()}}\n\n`))
        } catch (error) {
          clearInterval(heartbeatInterval)
        }
      }, 30000)

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        clearInterval(heartbeatInterval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  })
}
