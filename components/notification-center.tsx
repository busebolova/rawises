"use client"

import { useState, useEffect } from "react"
import { Bell, X, Check, AlertTriangle, Package, ShoppingCart, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRealtime } from "@/hooks/use-realtime"
import { useToast } from "@/hooks/use-toast"

interface NotificationCenterProps {
  showToasts?: boolean
  playSound?: boolean
}

export function NotificationCenter({ showToasts = true, playSound = true }: NotificationCenterProps) {
  const { notifications, clearNotifications, isConnected } = useRealtime()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [lastNotificationCount, setLastNotificationCount] = useState(0)
  const [readNotifications, setReadNotifications] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (notifications.length > lastNotificationCount && lastNotificationCount > 0) {
      const newNotifications = notifications.slice(0, notifications.length - lastNotificationCount)

      newNotifications.forEach((notification) => {
        // Play sound for important notifications
        if (playSound && (notification.type === "order" || notification.type === "inventory")) {
          try {
            const audio = new Audio("/notification-sound.mp3")
            audio.volume = 0.3
            audio.play().catch(() => {
              // Fallback: create a simple beep sound
              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
              const oscillator = audioContext.createOscillator()
              const gainNode = audioContext.createGain()

              oscillator.connect(gainNode)
              gainNode.connect(audioContext.destination)

              oscillator.frequency.value = notification.type === "order" ? 800 : 600
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

              oscillator.start(audioContext.currentTime)
              oscillator.stop(audioContext.currentTime + 0.3)
            })
          } catch (error) {
            console.log("[v0] Could not play notification sound:", error)
          }
        }

        // Show toast notification
        if (showToasts) {
          toast({
            title: getNotificationTitle(notification.type),
            description: notification.message,
            variant: notification.type === "error" ? "destructive" : "default",
          })
        }
      })
    }
    setLastNotificationCount(notifications.length)
  }, [notifications.length, lastNotificationCount, playSound, showToasts, toast])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-4 w-4 text-green-600" />
      case "inventory":
        return <Package className="h-4 w-4 text-orange-600" />
      case "user":
        return <Users className="h-4 w-4 text-blue-600" />
      case "system":
        return <Settings className="h-4 w-4 text-purple-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case "order":
        return "Yeni Sipariş"
      case "inventory":
        return "Stok Güncellemesi"
      case "user":
        return "Kullanıcı Aktivitesi"
      case "system":
        return "Sistem Bildirimi"
      case "error":
        return "Hata"
      default:
        return "Bildirim"
    }
  }

  const unreadCount = notifications.filter((_, index) => !readNotifications.has(index)).length

  const markAsRead = (index: number) => {
    setReadNotifications((prev) => new Set(prev).add(index))
  }

  const markAllAsRead = () => {
    setReadNotifications(new Set(notifications.map((_, index) => index)))
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} gün önce`
    if (hours > 0) return `${hours} saat önce`
    if (minutes > 0) return `${minutes} dakika önce`
    return "Az önce"
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="font-semibold">Bildirimler</span>
            {isConnected && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-3 w-3 mr-1" />
                Tümünü Okundu İşaretle
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={clearNotifications}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Henüz bildirim yok</p>
            {isConnected && <p className="text-xs mt-1">Yeni bildirimler otomatik görünecek</p>}
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => {
              const isRead = readNotifications.has(index)
              return (
                <div
                  key={notification.id || index}
                  className={`p-3 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                    !isRead ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => markAsRead(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{getNotificationTitle(notification.type)}</p>
                        {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp ? formatTime(notification.timestamp) : "Az önce"}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full justify-center" onClick={clearNotifications}>
                Tüm Bildirimleri Temizle
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
