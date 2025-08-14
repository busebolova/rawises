"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Minus, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { realtimeClient, type StockUpdate } from "@/lib/realtime-client"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"

interface LiveStockIndicatorProps {
  productId: string
  initialStock?: number
  className?: string
}

export function LiveStockIndicator({ productId, initialStock = 0, className = "" }: LiveStockIndicatorProps) {
  const [stockData, setStockData] = useState<StockUpdate>({
    productId,
    stock: initialStock,
    trend: "stable",
    lastUpdated: new Date(),
  })

  useEffect(() => {
    const handleStockUpdate = (update: StockUpdate) => {
      if (update.productId === productId) {
        setStockData(update)
      }
    }

    realtimeClient.on("stockUpdate", handleStockUpdate)

    // Check for existing stock data
    const existingUpdate = realtimeClient.getStockUpdate(productId)
    if (existingUpdate) {
      setStockData(existingUpdate)
    }

    return () => {
      realtimeClient.off("stockUpdate", handleStockUpdate)
    }
  }, [productId])

  const getTrendIcon = () => {
    switch (stockData.trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />
      default:
        return <Minus className="h-3 w-3 text-gray-500" />
    }
  }

  const getStockStatus = () => {
    if (stockData.stock === 0) {
      return { text: "Stokta Yok", variant: "destructive" as const }
    } else if (stockData.stock <= 5) {
      return { text: "Son Ürünler", variant: "secondary" as const }
    } else if (stockData.stock <= 20) {
      return { text: "Sınırlı Stok", variant: "outline" as const }
    } else {
      return { text: "Stokta Var", variant: "default" as const }
    }
  }

  const stockStatus = getStockStatus()

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Badge variant={stockStatus.variant}>{stockStatus.text}</Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {getTrendIcon()}
          <span>{stockData.stock} adet</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>
          Son güncelleme:{" "}
          {formatDistanceToNow(stockData.lastUpdated, {
            addSuffix: true,
            locale: tr,
          })}
        </span>
      </div>
    </div>
  )
}
