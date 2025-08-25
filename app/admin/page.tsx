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
  RefreshCw,
  Sparkles,
  Upload,
} from "lucide-react"
import { useAdminStore } from "@/lib/admin-store"
import Link from "next/link"

export default function AdminDashboard() {
  const { products, orders, stats, isLoading, error, fetchStats } = useAdminStore()

  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isReplacing, setIsReplacing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [hasAutoImported, setHasAutoImported] = useState(false)
  const [isForcedImporting, setIsForcedImporting] = useState(false)

  useEffect(() => {
    console.log("[v0] Loading admin dashboard data from Supabase...")
    fetchStats().then(async () => {
      setLastUpdate(new Date())
      console.log("[v0] Admin dashboard data loaded successfully")

      if (!hasAutoImported && products.length > 0) {
        const hasSampleProducts = products.some(
          (p) =>
            p.name.includes("iPhone") ||
            p.name.includes("Samsung") ||
            p.name.includes("Nike") ||
            p.name.includes("Zara"),
        )

        if (hasSampleProducts) {
          console.log("[v0] Sample products detected, auto-importing CSV products...")
          setHasAutoImported(true)
          await handleImportCSV()
        }
      }
    })
  }, [fetchStats, products, hasAutoImported])

  const handleReplaceWithCosmetics = async () => {
    setIsReplacing(true)
    try {
      console.log("[v0] Starting product replacement with cosmetics...")
      const response = await fetch("/api/admin/replace-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok) {
        console.log("[v0] Products replaced successfully:", result.message)
        await fetchStats()
        setLastUpdate(new Date())
        alert("Ürünler başarıyla kozmetik ürünleriyle değiştirildi!")
      } else {
        console.error("[v0] Product replacement failed:", result.error)
        alert("Ürün değiştirme işlemi başarısız: " + result.error)
      }
    } catch (error) {
      console.error("[v0] Product replacement error:", error)
      alert("Ürün değiştirme işlemi sırasında hata oluştu")
    } finally {
      setIsReplacing(false)
    }
  }

  const handleImportCSV = async () => {
    setIsImporting(true)
    try {
      console.log("[v0] Starting CSV import from external URL...")
      const response = await fetch("/api/admin/import-csv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok) {
        console.log("[v0] CSV import successful:", result.message)
        await fetchStats()
        setLastUpdate(new Date())
        if (!hasAutoImported) {
          alert(`Başarılı! ${result.totalProducts} ürün CSV'den yüklendi ve sistemde görünür hale geldi.`)
        }
      } else {
        console.error("[v0] CSV import failed:", result.error)
        if (!hasAutoImported) {
          alert("CSV yükleme işlemi başarısız: " + result.error)
        }
      }
    } catch (error) {
      console.error("[v0] CSV import error:", error)
      if (!hasAutoImported) {
        alert("CSV yükleme işlemi sırasında hata oluştu")
      }
    } finally {
      setIsImporting(false)
    }
  }

  const handleForcedCSVImport = async () => {
    setIsForcedImporting(true)
    try {
      console.log("[v0] Starting FORCED CSV import - clearing all products and importing CSV...")
      const response = await fetch("/api/admin/force-csv-import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (response.ok) {
        console.log("[v0] Forced CSV import successful:", result.message)
        await fetchStats()
        setLastUpdate(new Date())
        alert(`BAŞARILI! Tüm ürünler temizlendi ve ${result.productsImported} adet CSV ürünü yüklendi!`)
      } else {
        console.error("[v0] Forced CSV import failed:", result.error)
        alert("Zorunlu CSV yükleme işlemi başarısız: " + result.error)
      }
    } catch (error) {
      console.error("[v0] Forced CSV import error:", error)
      alert("Zorunlu CSV yükleme işlemi sırasında hata oluştu")
    } finally {
      setIsForcedImporting(false)
    }
  }

  const dashboardStats = [
    {
      title: "Toplam Ürün",
      value: stats.totalProducts.toString(),
      change: stats.totalProducts > 0 ? "Aktif ürünler" : "Henüz ürün eklenmedi",
      changeType: "neutral" as const,
      icon: Package,
    },
    {
      title: "Bekleyen Siparişler",
      value: orders.filter((order) => order.status === "pending").length.toString(),
      change: stats.totalOrders > 0 ? "Toplam sipariş: " + stats.totalOrders : "İlk siparişinizi bekliyor",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Bu Ay Satış",
      value: `₺${stats.totalSales.toFixed(0)}`,
      change: stats.totalSales > 0 ? "Gerçek satış verisi" : "İlk satışınızı bekliyor",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Kayıtlı Müşteriler",
      value: stats.activeCustomers.toString(),
      change: stats.activeCustomers > 0 ? "Aktif müşteriler" : "Müşteri kaydı bekleniyor",
      changeType: "neutral" as const,
      icon: Users,
    },
  ]

  const recentOrders = orders.slice(0, 5).map((order) => ({
    id: `#${order.id.slice(0, 8)}`,
    customer: order.customer_name || "Müşteri",
    amount: `₺${Number(order.total_amount).toFixed(0)}`,
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
  }))

  const lowStockProducts = products
    .filter((product) => product.stock_quantity < 10 && product.stock_quantity > 0)
    .slice(0, 3)
    .map((product) => ({
      name: product.name,
      stock: product.stock_quantity,
      category: product.category || "Genel",
    }))

  const recentActivity = [
    { action: "Supabase veritabanı bağlantısı aktif", time: "Az önce", type: "system" },
    { action: `${stats.totalProducts} ürün yüklendi`, time: "Az önce", type: "product" },
    { action: `${stats.totalOrders} sipariş bulundu`, time: "Az önce", type: "order" },
    { action: "Admin paneli hazır", time: "Az önce", type: "admin" },
  ].slice(0, 6)

  const quickActions = [
    { title: "Yeni Ürün Ekle", icon: Plus, href: "/admin/products/new", color: "bg-blue-500" },
    { title: "Siparişleri Görüntüle", icon: ShoppingCart, href: "/admin/orders", color: "bg-green-500" },
    { title: "Stok Kontrolü", icon: Package, href: "/admin/stock", color: "bg-orange-500" },
    { title: "Analytics", icon: TrendingUp, href: "/admin/analytics", color: "bg-purple-500" },
  ]

  const topProducts = orders
    .reduce(
      (acc, order) => {
        if (order.order_items) {
          order.order_items.forEach((item) => {
            const existing = acc.find((p) => p.id === item.product_id)
            if (existing) {
              existing.sales += item.quantity
              existing.revenue += Number(item.total_price)
            } else {
              acc.push({
                id: item.product_id,
                name: `Ürün ${item.product_id.slice(0, 8)}`,
                sales: item.quantity,
                revenue: Number(item.total_price),
              })
            }
          })
        }
        return acc
      },
      [] as { id: string; name: string; sales: number; revenue: number }[],
    )
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3)
    .map((product) => ({
      name: product.name,
      sales: product.sales,
      revenue: `₺${product.revenue.toFixed(0)}`,
    }))

  const handleRefresh = () => {
    console.log("[v0] Refreshing admin dashboard data...")
    fetchStats().then(() => {
      setLastUpdate(new Date())
    })
  }

  return (
    <div className="p-0 space-y-0">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg mb-4 border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Rawises E-Ticaret Yönetim Paneli 🚀</h1>
            <p className="text-muted-foreground text-sm">
              {isLoading
                ? "Supabase verilerini yüklüyor..."
                : error
                  ? "Bağlantı hatası: " + error
                  : "Supabase veritabanı bağlantısı aktif - Tüm değişiklikler gerçek zamanlı yansıtılıyor"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleForcedCSVImport}
              disabled={isForcedImporting || isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 hover:from-red-600 hover:to-pink-600"
            >
              <Upload className={`h-4 w-4 ${isForcedImporting ? "animate-bounce" : ""}`} />
              {isForcedImporting ? "CSV Yükleniyor..." : "SADECE CSV ÜRÜNLERİ YÜKLE"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImportCSV}
              disabled={isImporting || isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 hover:from-green-600 hover:to-teal-600"
            >
              <Upload className={`h-4 w-4 ${isImporting ? "animate-bounce" : ""}`} />
              {isImporting ? "CSV Yükleniyor..." : "Gerçek Ürünleri Yükle (CSV)"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReplaceWithCosmetics}
              disabled={isReplacing || isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:from-pink-600 hover:to-purple-600"
            >
              <Sparkles className={`h-4 w-4 ${isReplacing ? "animate-spin" : ""}`} />
              {isReplacing ? "Değiştiriliyor..." : "Kozmetik Ürünleri Yükle"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Yenile
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${!error ? "bg-green-500 animate-pulse" : "bg-red-400"}`}></div>
              <span className="font-medium">{!error ? "Supabase Aktif" : "Bağlantı Hatası"}</span>
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
        {dashboardStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                {!error && <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>}
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
              {!error && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
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
                <p className="text-xs mt-1">Yeni siparişler otomatik görünecek</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Stok Durumu
              {!error && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/stock">
                <Plus className="h-4 w-4 mr-1" />
                Stok Ekle
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {lowStockProducts.length > 0 ? (
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
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Stok durumu iyi</p>
                {!error && <p className="text-xs mt-1">Stok seviyeleri canlı izleniyor</p>}
              </div>
            )}
            {!error && (
              <div className="mt-2 text-xs text-muted-foreground text-center">Stok seviyeleri canlı güncelleniyor</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              En Çok Satanlar
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analytics">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Detay
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {topProducts.length > 0 ? (
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
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">İlk satışınızı bekliyoruz</p>
                {!error && <p className="text-xs mt-1">Satış verileri gerçek zamanlı güncellenecek</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-500" />
              Sistemdeki Ürünler
              {!error && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">
                <Eye className="h-4 w-4 mr-1" />
                Tümünü Gör
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {products.length > 0 ? (
              <div className="space-y-2">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-1">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">₺{product.price}</p>
                        <Badge
                          variant={
                            product.stock_quantity > 10
                              ? "default"
                              : product.stock_quantity > 0
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {product.stock_quantity} adet
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <Eye className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" asChild className="flex-1 mr-2 bg-transparent">
                      <Link href="/admin/products/new">
                        <Plus className="h-4 w-4 mr-1" />
                        Yeni Ürün
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href="/admin/products">
                        <Package className="h-4 w-4 mr-1" />
                        Ürün Yönetimi
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Henüz ürün eklenmedi</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href="/admin/products/new">
                      <Plus className="h-4 w-4 mr-1" />
                      İlk Ürünü Ekle
                    </Link>
                  </Button>
                </div>
              </div>
            )}
            {!error && (
              <div className="mt-2 text-xs text-muted-foreground text-center">
                Ürün değişiklikleri gerçek zamanlı yansıtılıyor
              </div>
            )}
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
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 bg-transparent"
                asChild
              >
                <Link href="/admin/products/new">
                  <div className="p-1 rounded-lg bg-blue-500 text-white">
                    <Plus className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">Yeni Ürün Ekle</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 bg-transparent"
                asChild
              >
                <Link href="/admin/products">
                  <div className="p-1 rounded-lg bg-green-500 text-white">
                    <Package className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">Ürün Yönetimi</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 bg-transparent"
                asChild
              >
                <Link href="/admin/orders">
                  <div className="p-1 rounded-lg bg-orange-500 text-white">
                    <ShoppingCart className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">Siparişler</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 bg-transparent"
                asChild
              >
                <Link href="/admin/stock">
                  <div className="p-1 rounded-lg bg-purple-500 text-white">
                    <TrendingUp className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">Stok Kontrolü</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              Sistem Aktiviteleri
              {!error && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
            </CardTitle>
            <div className="flex items-center gap-2">
              {recentActivity.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {recentActivity.length} yeni
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
                    } ${index < 2 && !error ? "animate-pulse" : ""}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            {!error && (
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
