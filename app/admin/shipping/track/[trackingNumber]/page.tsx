"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import type { Shipment } from "@/lib/shipping-types"
import { SHIPPING_PROVIDERS, SHIPMENT_STATUS_LABELS, SHIPMENT_STATUS_COLORS } from "@/lib/shipping-types"
import { useRouter } from "next/navigation"

// Mock shipment data
const mockShipment: Shipment = {
  id: "1",
  orderId: "ORD-2024-001",
  trackingNumber: "MNG123456789",
  provider: "mng",
  serviceName: "Hızlı Kargo",
  status: "in_transit",
  sender: {
    name: "Rawises Kozmetik",
    company: "Rawises Ltd.",
    phone: "0212 555 0123",
    email: "info@rawises.com",
    street: "Atatürk Cad. No: 100",
    district: "Kadıköy",
    city: "İstanbul",
    postalCode: "34710",
    country: "Türkiye",
  },
  recipient: {
    name: "Ayşe Yılmaz",
    phone: "0532 123 4567",
    email: "ayse@example.com",
    street: "Cumhuriyet Cad. No: 45 Daire: 3",
    district: "Çankaya",
    city: "Ankara",
    postalCode: "06100",
    country: "Türkiye",
  },
  items: [
    {
      productId: "1",
      productName: "Nemlendirici Krem",
      quantity: 2,
      weight: 0.5,
      value: 179.8,
    },
  ],
  weight: 1.0,
  dimensions: {
    length: 20,
    width: 15,
    height: 10,
  },
  shippingCost: 15.0,
  insuranceValue: 179.8,
  estimatedDelivery: "2024-01-18T18:00:00Z",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-16T14:20:00Z",
  trackingEvents: [
    {
      id: "1",
      status: "created",
      description: "Kargo etiketi oluşturuldu",
      location: "İstanbul Merkez",
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      status: "picked_up",
      description: "Kargo alındı",
      location: "İstanbul Merkez",
      timestamp: "2024-01-15T16:45:00Z",
    },
    {
      id: "3",
      status: "in_transit",
      description: "Ankara'ya yola çıktı",
      location: "İstanbul Transfer Merkezi",
      timestamp: "2024-01-16T08:20:00Z",
    },
    {
      id: "4",
      status: "in_transit",
      description: "Ankara'ya ulaştı",
      location: "Ankara Transfer Merkezi",
      timestamp: "2024-01-16T14:20:00Z",
    },
  ],
}

interface TrackingPageProps {
  params: {
    trackingNumber: string
  }
}

export default function TrackingPage({ params }: TrackingPageProps) {
  const router = useRouter()
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch shipment data
    const fetchShipment = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShipment(mockShipment)
      setLoading(false)
    }

    fetchShipment()
  }, [params.trackingNumber])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventIcon = (status: string) => {
    switch (status) {
      case "created":
        return Package
      case "picked_up":
        return CheckCircle
      case "in_transit":
        return Truck
      case "out_for_delivery":
        return MapPin
      case "delivered":
        return CheckCircle
      case "failed_delivery":
        return AlertCircle
      default:
        return Clock
    }
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

  if (!shipment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Geri Dön
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Kargo Takibi</h1>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Kargo Bulunamadı</h3>
            <p className="text-muted-foreground">
              {params.trackingNumber} takip numaralı kargo bulunamadı. Lütfen takip numarasını kontrol edin.
            </p>
          </CardContent>
        </Card>
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kargo Takibi</h1>
          <p className="text-muted-foreground">{shipment.trackingNumber}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tracking Timeline */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Kargo Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {shipment.trackingEvents
                  .slice()
                  .reverse()
                  .map((event, index) => {
                    const EventIcon = getEventIcon(event.status)
                    const isLatest = index === 0
                    return (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isLatest ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <EventIcon className="h-5 w-5" />
                          </div>
                          {index < shipment.trackingEvents.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={`text-xs ${SHIPMENT_STATUS_COLORS[event.status]}`}
                              variant={isLatest ? "default" : "secondary"}
                            >
                              {SHIPMENT_STATUS_LABELS[event.status]}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{formatDate(event.timestamp)}</span>
                          </div>
                          <p className="font-medium">{event.description}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Details */}
        <div className="space-y-6">
          {/* Shipment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Gönderi Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Sipariş No</div>
                <div className="font-medium">{shipment.orderId}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Kargo Firması</div>
                <div className="font-medium">{SHIPPING_PROVIDERS[shipment.provider]}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Servis</div>
                <div className="font-medium">{shipment.serviceName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tahmini Teslimat</div>
                <div className="font-medium">{formatDate(shipment.estimatedDelivery)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Durum</div>
                <Badge className={`${SHIPMENT_STATUS_COLORS[shipment.status]}`}>
                  {SHIPMENT_STATUS_LABELS[shipment.status]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recipient Info */}
          <Card>
            <CardHeader>
              <CardTitle>Alıcı Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="font-medium">{shipment.recipient.name}</div>
                <div className="text-sm text-muted-foreground">{shipment.recipient.phone}</div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{shipment.recipient.street}</p>
                <p>
                  {shipment.recipient.district} / {shipment.recipient.city}
                </p>
                <p>{shipment.recipient.postalCode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Package Info */}
          <Card>
            <CardHeader>
              <CardTitle>Paket Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ağırlık:</span>
                <span className="font-medium">{shipment.weight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Boyutlar:</span>
                <span className="font-medium">
                  {shipment.dimensions.length}x{shipment.dimensions.width}x{shipment.dimensions.height} cm
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ürün Sayısı:</span>
                <span className="font-medium">{shipment.items.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
