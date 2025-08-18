"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Search, Filter, Download, TrendingUp, TrendingDown, RotateCcw, ArrowRightLeft } from "lucide-react"
import type { StockMovement } from "@/lib/stock-types"
import { STOCK_MOVEMENT_LABELS, STOCK_MOVEMENT_COLORS, WAREHOUSE_LABELS } from "@/lib/stock-types"
import { useRouter } from "next/navigation"

// Mock data for demonstration
const mockMovements: StockMovement[] = [
  {
    id: "1",
    productId: "1",
    productName: "Nemlendirici Krem",
    productSku: "LOR-001",
    type: "in",
    quantity: 50,
    warehouse: "main",
    reason: "Yeni sevkiyat",
    notes: "Tedarikçiden gelen yeni stok",
    userId: "admin1",
    userName: "Admin User",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    productId: "2",
    productName: "Ruj - Kırmızı",
    productSku: "MAC-002",
    type: "out",
    quantity: 5,
    warehouse: "main",
    reason: "Satış",
    notes: "Online sipariş #ORD-2024-001",
    userId: "admin1",
    userName: "Admin User",
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "3",
    productId: "3",
    productName: "Şampuan",
    productSku: "PAN-003",
    type: "transfer",
    quantity: 10,
    warehouse: "adana",
    reason: "Depo transferi",
    notes: "Ana depodan Adana depoya transfer",
    userId: "admin2",
    userName: "Warehouse Manager",
    createdAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "4",
    productId: "1",
    productName: "Nemlendirici Krem",
    productSku: "LOR-001",
    type: "adjustment",
    quantity: -2,
    warehouse: "main",
    reason: "Sayım farkı",
    notes: "Fiziki sayımda eksik tespit edildi",
    userId: "admin1",
    userName: "Admin User",
    createdAt: "2024-01-14T09:15:00Z",
  },
  {
    id: "5",
    productId: "4",
    productName: "Parfüm - Erkek",
    productSku: "HB-004",
    type: "in",
    quantity: 25,
    warehouse: "adana",
    reason: "Yeni sevkiyat",
    notes: "Distribütörden gelen stok",
    userId: "admin2",
    userName: "Warehouse Manager",
    createdAt: "2024-01-13T11:20:00Z",
  },
]

export default function StockMovementsPage() {
  const router = useRouter()
  const [movements, setMovements] = useState<StockMovement[]>(mockMovements)
  const [filteredMovements, setFilteredMovements] = useState<StockMovement[]>(mockMovements)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [movementsPerPage] = useState(10)

  // Filter movements
  useEffect(() => {
    let filtered = movements

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (movement) =>
          movement.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movement.productSku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movement.reason.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((movement) => movement.type === selectedType)
    }

    // Warehouse filter
    if (selectedWarehouse !== "all") {
      filtered = filtered.filter((movement) => movement.warehouse === selectedWarehouse)
    }

    setFilteredMovements(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedType, selectedWarehouse, movements])

  // Calculate stats
  const stats = {
    totalMovements: movements.length,
    stockIn: movements.filter((m) => m.type === "in").reduce((sum, m) => sum + m.quantity, 0),
    stockOut: movements.filter((m) => m.type === "out").reduce((sum, m) => sum + Math.abs(m.quantity), 0),
    adjustments: movements.filter((m) => m.type === "adjustment").length,
  }

  // Pagination
  const totalPages = Math.ceil(filteredMovements.length / movementsPerPage)
  const startIndex = (currentPage - 1) * movementsPerPage
  const currentMovements = filteredMovements.slice(startIndex, startIndex + movementsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "in":
        return TrendingUp
      case "out":
        return TrendingDown
      case "adjustment":
        return RotateCcw
      case "transfer":
        return ArrowRightLeft
      default:
        return RotateCcw
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Stok Hareketleri</h1>
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">Stok Hareketleri</h1>
          <p className="text-muted-foreground">
            Toplam {movements.length} hareket • {filteredMovements.length} gösteriliyor
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Dışa Aktar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Hareket</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMovements}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Girişi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.stockIn}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Çıkışı</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.stockOut}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Düzeltmeler</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.adjustments}</div>
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
                  placeholder="Ürün adı, SKU veya sebep ile ara..."
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
                    Hareket Tipi
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedType("all")}>Tüm Hareketler</DropdownMenuItem>
                  {Object.entries(STOCK_MOVEMENT_LABELS).map(([type, label]) => (
                    <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Depo
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("all")}>Tüm Depolar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("main")}>Ana Depo</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("adana")}>Adana Depo</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead>Hareket Tipi</TableHead>
                <TableHead>Miktar</TableHead>
                <TableHead>Depo</TableHead>
                <TableHead>Sebep</TableHead>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Tarih</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMovements.map((movement) => {
                const MovementIcon = getMovementIcon(movement.type)
                return (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{movement.productName}</div>
                        <div className="text-xs text-muted-foreground font-mono">{movement.productSku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs flex items-center gap-1 w-fit ${STOCK_MOVEMENT_COLORS[movement.type]}`}
                      >
                        <MovementIcon className="h-3 w-3" />
                        {STOCK_MOVEMENT_LABELS[movement.type]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${
                          movement.quantity > 0 ? "text-green-600" : movement.quantity < 0 ? "text-red-600" : ""
                        }`}
                      >
                        {movement.quantity > 0 ? "+" : ""}
                        {movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {WAREHOUSE_LABELS[movement.warehouse]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{movement.reason}</div>
                        {movement.notes && <div className="text-xs text-muted-foreground">{movement.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{movement.userName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(movement.createdAt)}</div>
                    </TableCell>
                  </TableRow>
                )
              })}
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
