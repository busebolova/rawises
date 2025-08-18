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
  Plus,
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  Settings,
  Eye,
  Printer,
} from "lucide-react"
import type { Shipment } from "@/lib/shipping-types"
import { SHIPPING_PROVIDERS, SHIPMENT_STATUS_LABELS, SHIPMENT_STATUS_COLORS } from "@/lib/shipping-types"
import Link from "next/link"

// Mock data for demonstration
const mockShipments: Shipment[] = [
  {
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
    labelUrl: "/shipping-labels/MNG123456789.pdf",
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
    ],
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    trackingNumber: "YK987654321",
    provider: "yurtici",
    serviceName: "Standart Kargo",
    status: "delivered",
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
      name: "Mehmet Kaya",
      phone: "0533 987 6543",
      email: "mehmet@example.com",
      street: "İnönü Bulvarı No: 78",
      district: "Konak",
      city: "İzmir",
      postalCode: "35220",
      country: "Türkiye",
    },
    items: [
      {
        productId: "2",
        productName: "Ruj - Kırmızı",
        quantity: 1,
        weight: 0.1,
        value: 156.0,
      },
    ],
    weight: 0.3,
    dimensions: {
      length: 15,
      width: 10,
      height: 5,
    },
    shippingCost: 12.0,
    insuranceValue: 156.0,
    estimatedDelivery: "2024-01-17T18:00:00Z",
    actualDelivery: "2024-01-17T15:30:00Z",
    labelUrl: "/shipping-labels/YK987654321.pdf",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-17T15:30:00Z",
    trackingEvents: [
      {
        id: "1",
        status: "created",
        description: "Kargo etiketi oluşturuldu",
        location: "İstanbul Merkez",
        timestamp: "2024-01-14T09:15:00Z",
      },
      {
        id: "2",
        status: "picked_up",
        description: "Kargo alındı",
        location: "İstanbul Merkez",
        timestamp: "2024-01-14T14:30:00Z",
      },
      {
        id: "3",
        status: "in_transit",
        description: "İzmir'e yola çıktı",
        location: "İstanbul Transfer Merkezi",
        timestamp: "2024-01-15T07:00:00Z",
      },
      {
        id: "4",
        status: "out_for_delivery",
        description: "Dağıtıma çıktı",
        location: "İzmir Konak Şubesi",
        timestamp: "2024-01-17T09:00:00Z",
      },
      {
        id: "5",
        status: "delivered",
        description: "Teslim edildi",
        location: "İzmir Konak",
        timestamp: "2024-01-17T15:30:00Z",
      },
    ],
  },
]

export default function ShippingPage() {
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments)
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>(mockShipments)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [shipmentsPerPage] = useState(10)

  // Filter shipments
  useEffect(() => {
    let filtered = shipments

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (shipment) =>
          shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shipment.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Provider filter
    if (selectedProvider !== "all") {
      filtered = filtered.filter((shipment) => shipment.provider === selectedProvider)
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((shipment) => shipment.status === selectedStatus)
    }

    setFilteredShipments(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedProvider, selectedStatus, shipments])

  // Calculate stats
  const stats = {
    totalShipments: shipments.length,
    inTransit: shipments.filter((s) => s.status === "in_transit").length,
    delivered: shipments.filter((s) => s.status === "delivered").length,
    pending: shipments.filter((s) => s.status === "created").length,
  }

  // Pagination
  const totalPages = Math.ceil(filteredShipments.length / shipmentsPerPage)
  const startIndex = (currentPage - 1) * shipmentsPerPage
  const currentShipments = filteredShipments.slice(startIndex, startIndex + shipmentsPerPage)

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
          <h1 className="text-3xl font-bold">Kargo Yönetimi</h1>
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
          <h1 className="text-3xl font-bold text-foreground">Kargo Yönetimi</h1>
          <p className="text-muted-foreground">
            Toplam {shipments.length} gönderi • {filteredShipments.length} gösteriliyor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/shipping/providers">
              <Settings className="h-4 w-4 mr-2" />
              Kargo Ayarları
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/shipping/create">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Gönderi
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gönderi</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalShipments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yolda</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inTransit}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teslim Edildi</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Takip numarası, sipariş no veya alıcı adı ile ara..."
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
                    Kargo Firması
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedProvider("all")}>Tüm Firmalar</DropdownMenuItem>
                  {Object.entries(SHIPPING_PROVIDERS).map(([provider, name]) => (
                    <DropdownMenuItem key={provider} onClick={() => setSelectedProvider(provider)}>
                      {name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Durum
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedStatus("all")}>Tüm Durumlar</DropdownMenuItem>
                  {Object.entries(SHIPMENT_STATUS_LABELS).map(([status, label]) => (
                    <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status)}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Takip No</TableHead>
                <TableHead>Sipariş</TableHead>
                <TableHead>Alıcı</TableHead>
                <TableHead>Kargo Firması</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tahmini Teslimat</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div className="font-mono font-medium">{shipment.trackingNumber}</div>
                    <div className="text-xs text-muted-foreground">{shipment.serviceName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{shipment.orderId}</div>
                    <div className="text-xs text-muted-foreground">
                      {shipment.items.length} ürün • {formatCurrency(shipment.shippingCost)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{shipment.recipient.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {shipment.recipient.city}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {SHIPPING_PROVIDERS[shipment.provider]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${SHIPMENT_STATUS_COLORS[shipment.status]}`}>
                      {SHIPMENT_STATUS_LABELS[shipment.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {shipment.actualDelivery
                        ? formatDate(shipment.actualDelivery)
                        : formatDate(shipment.estimatedDelivery)}
                    </div>
                    {shipment.actualDelivery && <div className="text-xs text-green-600">Teslim edildi</div>}
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
                          <Link href={`/admin/shipping/${shipment.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Detayları Gör
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/shipping/track/${shipment.trackingNumber}`}>
                            <Truck className="h-4 w-4 mr-2" />
                            Takip Et
                          </Link>
                        </DropdownMenuItem>
                        {shipment.labelUrl && (
                          <DropdownMenuItem asChild>
                            <a href={shipment.labelUrl} target="_blank" rel="noopener noreferrer">
                              <Printer className="h-4 w-4 mr-2" />
                              Etiketi Yazdır
                            </a>
                          </DropdownMenuItem>
                        )}
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
    </div>
  )
}
