"use client"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { realtimeClient, type NotificationData } from "@/lib/realtime-client"
// import { formatDistanceToNow } from "date-fns"
// import { tr } from "date-fns/locale"

export function RealtimeNotifications() {
  // const [notifications, setNotifications] = useState<NotificationData[]>([])
  // const [isOpen, setIsOpen] = useState(false)

  // useEffect(() => {
  //   const handleNotifications = (newNotifications: NotificationData[]) => {
  //     setNotifications(newNotifications)
  //   }

  //   const handleNewNotification = (notification: NotificationData) => {
  //     // Show browser notification if permission granted
  //     if (Notification.permission === "granted") {
  //       new Notification(notification.title, {
  //         body: notification.message,
  //         icon: "/rawises-logo.png",
  //       })
  //     }
  //   }

  //   realtimeClient.on("notifications", handleNotifications)
  //   realtimeClient.on("notification", handleNewNotification)

  //   // Request notification permission
  //   if (Notification.permission === "default") {
  //     Notification.requestPermission()
  //   }

  //   // Load initial notifications
  //   setNotifications(realtimeClient.getNotifications())

  //   return () => {
  //     realtimeClient.off("notifications", handleNotifications)
  //     realtimeClient.off("notification", handleNewNotification)
  //   }
  // }, [])

  // const unreadCount = notifications.filter((n) => !n.read).length

  // const getNotificationIcon = (type: NotificationData["type"]) => {
  //   switch (type) {
  //     case "order":
  //       return <Package className="h-4 w-4 text-blue-500" />
  //     case "stock":
  //       return <TrendingUp className="h-4 w-4 text-green-500" />
  //     case "campaign":
  //       return <Megaphone className="h-4 w-4 text-purple-500" />
  //     case "system":
  //       return <AlertCircle className="h-4 w-4 text-orange-500" />
  //     default:
  //       return <Bell className="h-4 w-4 text-gray-500" />
  //   }
  // }

  // const markAsRead = (notificationId: string) => {
  //   realtimeClient.markNotificationAsRead(notificationId)
  // }

  // const markAllAsRead = () => {
  //   notifications.forEach((notification) => {
  //     if (!notification.read) {
  //       realtimeClient.markNotificationAsRead(notification.id)
  //     }
  //   })
  // }

  // return (
  //   <Sheet open={isOpen} onOpenChange={setIsOpen}>
  //     <SheetTrigger asChild>
  //       <Button variant="ghost" size="icon" className="relative">
  //         <Bell className="h-5 w-5" />
  //         {unreadCount > 0 && (
  //           <Badge
  //             variant="destructive"
  //             className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
  //           >
  //             {unreadCount > 99 ? "99+" : unreadCount}
  //           </Badge>
  //         )}
  //       </Button>
  //     </SheetTrigger>
  //     <SheetContent className="w-[400px] sm:w-[540px]">
  //       <SheetHeader>
  //         <div className="flex items-center justify-between">
  //           <SheetTitle>Bildirimler</SheetTitle>
  //           {unreadCount > 0 && (
  //             <Button variant="ghost" size="sm" onClick={markAllAsRead}>
  //               Tümünü Okundu İşaretle
  //             </Button>
  //           )}
  //         </div>
  //       </SheetHeader>
  //       <ScrollArea className="h-[calc(100vh-120px)] mt-4">
  //         {notifications.length === 0 ? (
  //           <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
  //             <Bell className="h-8 w-8 mb-2" />
  //             <p>Henüz bildirim yok</p>
  //           </div>
  //         ) : (
  //           <div className="space-y-2">
  //             {notifications.map((notification) => (
  //               <div
  //                 key={notification.id}
  //                 className={`p-3 rounded-lg border transition-colors cursor-pointer ${
  //                   notification.read ? "bg-background hover:bg-muted/50" : "bg-muted hover:bg-muted/80"
  //                 }`}
  //                 onClick={() => markAsRead(notification.id)}
  //               >
  //                 <div className="flex items-start gap-3">
  //                   <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
  //                   <div className="flex-1 min-w-0">
  //                     <div className="flex items-center justify-between mb-1">
  //                       <h4 className="text-sm font-medium truncate">{notification.title}</h4>
  //                       {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />}
  //                     </div>
  //                     <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
  //                     <p className="text-xs text-muted-foreground">
  //                       {formatDistanceToNow(notification.timestamp, {
  //                         addSuffix: true,
  //                         locale: tr,
  //                       })}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         )}
  //       </ScrollArea>
  //     </SheetContent>
  //   </Sheet>
  // )

  // Real-time notifications disabled
  return (
    <Button variant="ghost" size="icon" className="relative opacity-50 cursor-not-allowed" disabled>
      <Bell className="h-5 w-5" />
    </Button>
  )
}
