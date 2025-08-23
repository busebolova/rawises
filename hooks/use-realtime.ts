"use client"

import { useEffect, useRef, useCallback } from "react"
import { useRealtimeStore } from "@/lib/realtime-store"

export function useRealtime() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { setConnected, updateInventory, addOrder, addNotification } = useRealtimeStore()

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setConnected(false)
  }, [setConnected])

  const startPolling = useCallback(() => {
    cleanup()

    console.log("[v0] Starting real-time polling...")
    setConnected(true)

    // Poll for updates every 5 seconds
    intervalRef.current = setInterval(async () => {
      try {
        // Simulate real-time updates
        if (Math.random() > 0.7) {
          const sampleUpdates = [
            {
              type: "inventory_update",
              productId: "prod_001",
              productName: "Nemlendirici Krem",
              quantity: Math.floor(Math.random() * 100) + 10,
            },
            {
              type: "new_order",
              order: {
                id: `ORD${Date.now()}`,
                total: (Math.random() * 500 + 50).toFixed(2),
                items: Math.floor(Math.random() * 5) + 1,
                customer: "Müşteri " + Math.floor(Math.random() * 1000),
                timestamp: new Date().toISOString(),
              },
            },
          ]

          const update = sampleUpdates[Math.floor(Math.random() * sampleUpdates.length)]

          switch (update.type) {
            case "inventory_update":
              updateInventory(update.productId, update.quantity)
              addNotification({
                type: "inventory",
                message: `Stok güncellendi: ${update.productName} - ${update.quantity} adet`,
                productId: update.productId,
              })
              break
            case "new_order":
              addOrder(update.order)
              addNotification({
                type: "order",
                message: `Yeni sipariş: #${update.order.id} - ₺${update.order.total}`,
                orderId: update.order.id,
              })
              break
          }
        }
      } catch (error) {
        console.error("[v0] Real-time polling error:", error)
      }
    }, 5000)
  }, [setConnected, updateInventory, addOrder, addNotification, cleanup])

  useEffect(() => {
    startPolling()
    return cleanup
  }, [startPolling, cleanup])

  return useRealtimeStore()
}
