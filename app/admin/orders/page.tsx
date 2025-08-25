"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  TrendingUp,
  PackageOpen,
  RefreshCw,
} from "lucide-react"
import type { Order, OrderStatus } from "@/lib/order-types"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/order-types"
import Link from "next/link"
import { useRealtime } from "@/hooks/use-realtime"
import { RealtimeStatus } from "@/components/realtime-status"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const { orders: realtimeOrders, addNotification, isConnected } = useRealtime()

  useEffect(() => {
    if (realtimeOrders.length > 0) {
      console.log("[v0] Received real-time orders:", realtimeOrders.length)
      setOrders((prevOrders) => {
        const newOrders = [...realtimeOrders, ...prevOrders]
        // Remove duplicates based on order ID
        const uniqueOrders = newOrders.filter(
          (order, index, self) => index === self.findIndex((o) => o.id === order.id),
        )
        return uniqueOrders.slice(0, 100) // Keep last 100 orders
      })
      setLastRefresh(new Date())
    }
  }, [realtimeOrders])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time order checking
      console.log("[v0] Checking for new orders...")
      setLastRefresh(new Date())
      // In a real app, this would fetch from an API
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    console.log("[v0] Manually refreshing orders...")

    // Simulate API call
    setTimeout(() => {
      setLastRefresh(new Date())
      setLoading(false)
    }, 1000)
  }

  // Filter orders
  useEffect(() => {
    let filtered = orders

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus)
    }

    setFilteredOrders(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedStatus, orders])

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
  }

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage)

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus, updatedAt: new Date().toISOString() }

          addNotification({
            type: "order",
            message: `Sipariş durumu güncellendi: #${order.orderNumber} - ${ORDER_STATUS_LABELS[newStatus]}`,
            orderId: order.id,
          })

          return updatedOrder
        }
        return order
      }),
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sipariş Yönetimi</h1>
          <p className="text-muted-foreground">
            Sistem yeni kuruldu • Son güncelleme: {lastRefresh.toLocaleTimeString("tr-TR")}
            {isConnected && <span className="ml-2 text-green-600">• Canlı takip aktif</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RealtimeStatus />
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{isConnected ? "Gerçek zamanlı" : "Yeni sistem"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">{isConnected ? "Canlı güncelleme" : "Gerçek zamanlı"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kargoda</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.shipped}</div>
            <p className="text-xs text-muted-foreground">Takip edilebilir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Canlı hesaplama</p>
          </CardContent>
        </Card>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <PackageOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Henüz Sipariş Yok</h3>
            <p className="text-muted-foreground mb-4">
              Sistem yeni kuruldu. İlk siparişler geldiğinde burada görüntülenecek.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              {isConnected ? "Gerçek zamanlı sipariş takibi aktif" : "Bağlantı bekleniyor"}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Sipariş numarası, müşteri adı veya e-posta ile ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Durum
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setSelectedStatus("all")}>Tüm Durumlar</DropdownMenuItem>
                      {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => (
                        <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status as OrderStatus)}>
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sipariş No</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Ürünler</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.orderNumber}</div>
                        <div className="text-xs text-muted-foreground">{order.paymentMethod}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{order.customer.name}</div>
                          <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                          <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{order.items.length} ürün</div>
                        <div className="text-xs text-muted-foreground">
                          {order.items[0]?.productName}
                          {order.items.length > 1 && ` +${order.items.length - 1} diğer`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(order.totalAmount)}</div>
                        <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="text-xs">
                          {order.paymentStatus === "paid" ? "Ödendi" : "Beklemede"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`text-xs ${ORDER_STATUS_COLORS[order.status]}`}>
                          {ORDER_STATUS_LABELS[order.status]}
                        </Badge>
                        {order.shipping?.trackingNumber && (
                          <div className="text-xs text-muted-foreground mt-1">{order.shipping.trackingNumber}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(order.createdAt)}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders/${order.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Detayları Gör
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "confirmed")}
                              disabled={order.status !== "pending"}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Onayla
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "processing")}
                              disabled={!["pending", "confirmed"].includes(order.status)}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Hazırla
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "shipped")}
                              disabled={order.status !== "processing"}
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Kargoya Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "cancelled")}
                              disabled={["delivered", "cancelled", "refunded"].includes(order.status)}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              İptal Et
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Önceki
              </Button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="text-muted-foreground">
                      ...
                    </span>
                  )
                }
                return null
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Sonraki
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
