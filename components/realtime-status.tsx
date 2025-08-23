"use client"

import { useRealtime } from "@/hooks/use-realtime"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

export function RealtimeStatus() {
  const { isConnected, lastUpdate } = useRealtime()

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <Badge variant="outline" className="text-green-600 border-green-200">
            Canlı
          </Badge>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <Badge variant="outline" className="text-red-600 border-red-200">
            Bağlantı Yok
          </Badge>
        </>
      )}
      {lastUpdate && <span className="text-xs text-muted-foreground">{lastUpdate.toLocaleTimeString("tr-TR")}</span>}
    </div>
  )
}
