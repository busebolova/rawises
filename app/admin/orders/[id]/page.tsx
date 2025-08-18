"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Package, Truck, MapPin, Phone, Mail, CreditCard, Save, Printer, MessageSquare } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/order-types"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/order-types"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Mock order data - in real app, this would come from API
const mockOrder: Order = {
  id: "1",
  orderNumber: "ORD-2024-001",
  status: "processing",
  customer: {
    name: "Ayşe Yılmaz",
    email: "ayse@example.com",
    phone: "0532 123 4567",
    address: {
      street: "Atatürk Cad. No: 123 Daire: 5",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      country: "Türkiye",
    },
  },
  items: [
    {
      id: "1",
      productId: "p1",
      productName: "Nemlendirici Krem - Hassas Ciltler İçin",
      productImage: "/placeholder.svg",
      brand: "L'Oreal",
      sku: "LOR-001",
      quantity: 2,
      unitPrice: 89.9,
      totalPrice: 179.8,
    },
    {
      id: "2",
      productId: "p2",
      productName: "Vitamin C Serumu",
      productImage: "/placeholder.svg",
      brand: "The Ordinary",
      sku: "TO-002",
      quantity: 1,
      unitPrice: 45.5,
      totalPrice: 45.5,
    },
  ],
  subtotal: 225.3,
  shippingCost: 15.0,
  taxAmount: 45.06,
  discountAmount: 10.0,
  totalAmount: 275.36,
  paymentMethod: "Kredi Kartı",
  paymentStatus: "paid",
  shipping: {
    method: "Hızlı Kargo",
    company: "MNG Kargo",
    trackingNumber: "MNG123456789",
    estimatedDelivery: "2024-01-18",
    shippingCost: 15.0,
  },
  notes: "Müşteri kapı zilinin çalmamasını istedi, telefon ile aranmasını talep etti.",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:20:00Z",
}

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter()
  const [order, setOrder] = useState<Order>(mockOrder)
  const [loading, setLoading] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(order.shipping.trackingNumber || "")
  const [orderNotes, setOrderNotes] = useState(order.notes || "")

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder((prev) => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleSaveTracking = () => {
    setOrder((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        trackingNumber,
      },
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleSaveNotes = () => {
    setOrder((prev) => ({
      ...prev,
      notes: orderNotes,
      updatedAt: new Date().toISOString(),
    }))
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
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Sipariş Detayı</h1>
          <p className="text-muted-foreground">{order.orderNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Yazdır
          </Button>
          <Badge className={`${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Sipariş Ürünleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=64&width=64"
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2">{item.productName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.brand} • SKU: {item.sku}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm">Adet: {item.quantity}</span>
                        <span className="text-sm">Birim: {formatCurrency(item.unitPrice)}</span>
                        <span className="text-sm font-medium">Toplam: {formatCurrency(item.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ara Toplam:</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kargo:</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>KDV:</span>
                  <span>{formatCurrency(order.taxAmount)}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>İndirim:</span>
                    <span>-{formatCurrency(order.discountAmount)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Toplam:</span>
                  <span>{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Müşteri Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">İletişim</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Teslimat Adresi</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>{order.customer.address.street}</p>
                    <p>
                      {order.customer.address.district} / {order.customer.address.city}
                    </p>
                    <p>
                      {order.customer.address.postalCode} {order.customer.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Durumu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Durum Değiştir</Label>
                <Select value={order.status} onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => (
                      <SelectItem key={status} value={status}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Oluşturulma: {formatDate(order.createdAt)}</p>
                <p>Güncelleme: {formatDate(order.updatedAt)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Ödeme Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ödeme Yöntemi:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ödeme Durumu:</span>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="text-xs">
                    {order.paymentStatus === "paid" ? "Ödendi" : "Beklemede"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Toplam Tutar:</span>
                  <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Kargo Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Kargo Firması:</span>
                  <span className="font-medium">{order.shipping.company}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo Yöntemi:</span>
                  <span className="font-medium">{order.shipping.method}</span>
                </div>
                {order.shipping.estimatedDelivery && (
                  <div className="flex justify-between">
                    <span>Tahmini Teslimat:</span>
                    <span className="font-medium">
                      {new Date(order.shipping.estimatedDelivery).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tracking">Takip Numarası</Label>
                <div className="flex gap-2">
                  <Input
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Takip numarası girin"
                  />
                  <Button size="sm" onClick={handleSaveTracking}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Sipariş Notları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notlar</Label>
                <Textarea
                  id="notes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Sipariş ile ilgili notlar..."
                  rows={4}
                />
                <Button size="sm" onClick={handleSaveNotes} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Notları Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
