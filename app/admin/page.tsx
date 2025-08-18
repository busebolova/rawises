"use client"

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
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Toplam Ürün",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Bekleyen Siparişler",
      value: "23",
      change: "+5%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Bu Ay Satış",
      value: "₺45,231",
      change: "+18%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Aktif Müşteriler",
      value: "892",
      change: "+7%",
      changeType: "positive" as const,
      icon: Users,
    },
  ]

  const recentOrders = [
    { id: "#12345", customer: "Ayşe Yılmaz", amount: "₺234", status: "Hazırlanıyor" },
    { id: "#12346", customer: "Mehmet Kaya", amount: "₺156", status: "Kargoda" },
    { id: "#12347", customer: "Fatma Demir", amount: "₺89", status: "Teslim Edildi" },
    { id: "#12348", customer: "Ali Özkan", amount: "₺345", status: "Beklemede" },
  ]

  const lowStockProducts = [
    { name: "Nemlendirici Krem", stock: 5, category: "Cilt Bakımı" },
    { name: "Ruj - Kırmızı", stock: 3, category: "Makyaj" },
    { name: "Şampuan", stock: 8, category: "Saç Bakımı" },
  ]

  const quickActions = [
    { title: "Yeni Ürün Ekle", icon: Plus, href: "/admin/products/new", color: "bg-blue-500" },
    { title: "Siparişleri Görüntüle", icon: ShoppingCart, href: "/admin/orders", color: "bg-green-500" },
    { title: "Stok Kontrolü", icon: Package, href: "/admin/stock", color: "bg-orange-500" },
    { title: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "bg-purple-500" },
  ]

  const recentActivity = [
    { action: "Yeni sipariş alındı", time: "2 dakika önce", type: "order" },
    { action: "Stok güncellendi", time: "15 dakika önce", type: "stock" },
    { action: "Ürün eklendi", time: "1 saat önce", type: "product" },
    { action: "Müşteri kaydı", time: "2 saat önce", type: "customer" },
  ]

  const topProducts = [
    { name: "Nemlendirici Serum", sales: 45, revenue: "₺2,340" },
    { name: "Anti-Aging Krem", sales: 38, revenue: "₺1,890" },
    { name: "Vitamin C Serum", sales: 32, revenue: "₺1,600" },
  ]

  return (
    <div className="p-0 space-y-0">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg mb-4 border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Hoş Geldiniz! 👋</h1>
            <p className="text-muted-foreground text-sm">İşletmenizin genel durumunu buradan takip edebilirsiniz.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Sistem Aktif</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>{" "}
                geçen aydan
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Son Siparişler</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Tümünü Gör
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Düşük Stok Uyarısı
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Stok Ekle
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              En Çok Satan Ürünler
            </CardTitle>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Detay
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
                >
                  <div className={`p-1 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              Son Aktiviteler
            </CardTitle>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              Tümü
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "order"
                        ? "bg-green-500"
                        : activity.type === "stock"
                          ? "bg-orange-500"
                          : activity.type === "product"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
