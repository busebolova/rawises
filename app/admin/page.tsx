"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertTriangle,
  Eye,
  Plus,
  Activity,
  Clock,
  Star,
  ArrowUpRight,
  Bell,
} from "lucide-react"
import { useRealtime } from "@/hooks/use-realtime"
import { RealtimeStatus } from "@/components/realtime-status"
import Link from "next/link"

export default function AdminDashboard() {
  const {
    inventory,
    orders: realtimeOrders,
    notifications,
    isConnected,
    lastUpdate,
    clearNotifications,
  } = useRealtime()

  const [stats, setStats] = useState([
    {
      title: "Toplam Ürün",
      value: "24",
      change: "Yeni sistem",
      changeType: "neutral" as const,
      icon: Package,
    },
    {
      title: "Bekleyen Siparişler",
      value: "2",
      change: "İlk siparişler",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Bu Ay Satış",
      value: "₺1,250",
      change: "Başlangıç",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Kayıtlı Müşteriler",
      value: "8",
      change: "Yeni üyeler",
      changeType: "positive" as const,
      icon: Users,
    },
  ])

  const [recentOrders, setRecentOrders] = useState([
    { id: "#00001", customer: "Ayşe Yılmaz", amount: "₺450", status: "Hazırlanıyor" },
    { id: "#00002", customer: "Mehmet Kaya", amount: "₺320", status: "Teslim Edildi" },
  ])

  const [lowStockProducts, setLowStockProducts] = useState([
    { name: "Nemlendirici Krem", stock: 2, category: "Cilt Bakımı" },
    { name: "Vitamin C Serum", stock: 1, category: "Serum" },
    { name: "Temizleme Jeli", stock: 3, category: "Temizlik" },
  ])

  const [recentActivity, setRecentActivity] = useState([
    { action: "İlk sipariş alındı", time: "30 dakika önce", type: "order" },
    { action: "Ürün kataloğu yüklendi", time: "2 saat önce", type: "product" },
    { action: "Sistem kurulumu tamamlandı", time: "1 gün önce", type: "system" },
    { action: "Admin hesabı oluşturuldu", time: "1 gün önce", type: "admin" },
  ])

  useEffect(() => {
    if (realtimeOrders.length > 0) {
      const pendingOrders = realtimeOrders.filter((order) => order.status === "pending").length
      const totalRevenue = realtimeOrders.reduce((sum, order) => sum + order.totalAmount, 0)

      setStats((prev) =>
        prev.map((stat) => {
          if (stat.title === "Bekleyen Siparişler") {
            return {
              ...stat,
              value: pendingOrders.toString(),
              change: isConnected ? "Canlı güncelleme" : "İlk siparişler",
              changeType: "positive" as const,
            }
          }
          if (stat.title === "Bu Ay Satış") {
            return {
              ...stat,
              value: `₺${totalRevenue.toFixed(0)}`,
              change: isConnected ? "Gerçek zamanlı" : "Başlangıç",
              changeType: "positive" as const,
            }
          }
          return stat
        }),
      )

      // Update recent orders
      setRecentOrders(
        realtimeOrders.slice(0, 5).map((order) => ({
          id: `#${order.orderNumber || order.id}`,
          customer: order.customer?.name || "Müşteri",
          amount: `₺${order.totalAmount.toFixed(0)}`,
          status:
            order.status === "pending"
              ? "Beklemede"
              : order.status === "processing"
                ? "Hazırlanıyor"
                : order.status === "shipped"
                  ? "Kargoda"
                  : order.status === "delivered"
                    ? "Teslim Edildi"
                    : "Bilinmiyor",
        })),
      )
    }
  }, [realtimeOrders, isConnected])

  useEffect(() => {
    if (Object.keys(inventory).length > 0) {
      const lowStockItems = Object.entries(inventory)
        .filter(([_, stock]) => stock < 10 && stock > 0)
        .slice(0, 3)
        .map(([productId, stock]) => ({
          name: `Ürün ${productId.slice(-3)}`,
          stock: stock,
          category: "Kozmetik",
        }))

      if (lowStockItems.length > 0) {
        setLowStockProducts(lowStockItems)
      }
    }
  }, [inventory])

  useEffect(() => {
    if (notifications.length > 0) {
      const newActivities = notifications.slice(0, 4).map((notification) => ({
        action: notification.message,
        time: notification.timestamp
          ? new Date(notification.timestamp).toLocaleString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            }) + " önce"
          : "Az önce",
        type: notification.type,
      }))

      setRecentActivity((prev) =>
        [
          ...newActivities,
          ...prev.filter((activity) => !newActivities.some((newActivity) => newActivity.action === activity.action)),
        ].slice(0, 6),
      )
    }
  }, [notifications])

  const quickActions = [
    { title: "Yeni Ürün Ekle", icon: Plus, href: "/admin/products/new", color: "bg-blue-500" },
    { title: "Siparişleri Görüntüle", icon: ShoppingCart, href: "/admin/orders", color: "bg-green-500" },
    { title: "Stok Kontrolü", icon: Package, href: "/admin/stock", color: "bg-orange-500" },
    { title: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "bg-purple-500" },
  ]

  const topProducts = [
    { name: "Nemlendirici Serum", sales: 3, revenue: "₺450" },
    { name: "Temizleme Köpüğü", sales: 2, revenue: "₺320" },
    { name: "Güneş Kremi", sales: 1, revenue: "₺180" },
  ]

  return (
    <div className="p-0 space-y-0">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg mb-4 border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Rawises E-Ticaret Sistemi 🚀</h1>
            <p className="text-muted-foreground text-sm">
              {isConnected
                ? "Sistem canlı! Gerçek zamanlı güncellemeler aktif."
                : "Sisteminiz başarıyla kuruldu! İlk adımlarınızı atabilirsiniz."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <RealtimeStatus />
            {notifications.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearNotifications}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Bell className="h-4 w-4" />
                  {notifications.length}
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span className="font-medium">{isConnected ? "Canlı Sistem" : "Yeni Sistem"}</span>
            </div>
          </div>
        </div>
        {lastUpdate && (
          <div className="mt-2 text-xs text-muted-foreground">
            Son güncelleme: {lastUpdate.toLocaleTimeString("tr-TR")}
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                {isConnected && <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`${stat.changeType === "positive" ? "text-green-600" : stat.changeType === "negative" ? "text-red-600" : "text-blue-600"}`}
                >
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              Son Siparişler
              {isConnected && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                <Eye className="h-4 w-4 mr-1" />
                Tümünü Gör
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {recentOrders.length > 0 ? (
              <div className="space-y-2">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-1">
                    <div>
                      <p className="font-medium text-foreground text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground text-sm">{order.amount}</p>
                      <Badge
                        variant={
                          order.status === "Teslim Edildi"
                            ? "default"
                            : order.status === "Kargoda"
                              ? "secondary"
                              : order.status === "Hazırlanıyor"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Henüz sipariş yok</p>
                {isConnected && <p className="text-xs mt-1">Yeni siparişler otomatik görünecek</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Stok Durumu
              {isConnected && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/stock">
                <Plus className="h-4 w-4 mr-1" />
                Stok Ekle
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div>
                    <p className="font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {product.stock} adet
                  </Badge>
                </div>
              ))}
            </div>
            {isConnected && (
              <div className="mt-2 text-xs text-muted-foreground text-center">Stok seviyeleri canlı güncelleniyor</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              İlk Satışlar
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Detay
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div>
                    <p className="font-medium text-foreground text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} satış</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground text-sm">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-14 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 bg-transparent"
                  asChild
                >
                  <Link href={action.href}>
                    <div className={`p-1 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-3 w-3" />
                    </div>
                    <span className="text-xs font-medium">{action.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              Sistem Aktiviteleri
              {isConnected && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {notifications.length} yeni
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                Tümü
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "order"
                        ? "bg-green-500"
                        : activity.type === "inventory"
                          ? "bg-orange-500"
                          : activity.type === "product"
                            ? "bg-blue-500"
                            : activity.type === "system"
                              ? "bg-purple-500"
                              : "bg-gray-500"
                    } ${index < 2 && isConnected ? "animate-pulse" : ""}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            {isConnected && (
              <div className="mt-2 text-xs text-muted-foreground text-center">
                Aktiviteler gerçek zamanlı güncelleniyor
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
