"use client"

import { Badge } from "@/components/ui/badge"

interface LiveStockIndicatorProps {
  productId: string
  initialStock?: number
  className?: string
}

export function LiveStockIndicator({ productId, initialStock = 0, className = "" }: LiveStockIndicatorProps) {
  // Live stock updates disabled - show static stock info
  const getStockStatus = () => {
    if (initialStock === 0) {
      return { text: "Stokta Yok", variant: "destructive" as const }
    } else if (initialStock <= 5) {
      return { text: "Son Ürünler", variant: "secondary" as const }
    } else if (initialStock <= 20) {
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
          <span>{initialStock} adet</span>
        </div>
      </div>
    </div>
  )
}
