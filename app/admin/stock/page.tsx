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
  Minus,
  AlertTriangle,
  Package,
  Warehouse,
  TrendingDown,
  RotateCcw,
  ArrowRightLeft,
} from "lucide-react"
import type { Product } from "@/lib/csv-parser"
import type { WarehouseStock } from "@/lib/stock-types"
import { WAREHOUSE_LABELS } from "@/lib/stock-types"
import Image from "next/image"
import Link from "next/link"

const AdminStockPage = () => {
  // Real CSV product data
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWarehouse, setSelectedWarehouse] = useState<"all" | "main" | "adana">("all")
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  // Fetch real product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/admin/products")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
          setFilteredProducts(data)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Stock filter
    if (stockFilter === "low") {
      filtered = filtered.filter((product) => {
        const totalStock = product.stockMainWarehouse + product.stockAdana
        return totalStock > 0 && totalStock < 10
      })
    } else if (stockFilter === "out") {
      filtered = filtered.filter((product) => product.stockMainWarehouse + product.stockAdana === 0)
    }

    // Warehouse filter
    if (selectedWarehouse === "main") {
      filtered = filtered.filter((product) => product.stockMainWarehouse > 0)
    } else if (selectedWarehouse === "adana") {
      filtered = filtered.filter((product) => product.stockAdana > 0)
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchQuery, stockFilter, selectedWarehouse, products])

  // Calculate warehouse stats
  const warehouseStats: WarehouseStock[] = [
    {
      warehouse: "main",
      warehouseName: WAREHOUSE_LABELS.main,
      totalProducts: products.filter((p) => p.stockMainWarehouse > 0).length,
      totalStock: products.reduce((sum, p) => sum + p.stockMainWarehouse, 0),
      lowStockCount: products.filter((p) => p.stockMainWarehouse > 0 && p.stockMainWarehouse < 10).length,
      outOfStockCount: products.filter((p) => p.stockMainWarehouse === 0).length,
    },
    {
      warehouse: "adana",
      warehouseName: WAREHOUSE_LABELS.adana,
      totalProducts: products.filter((p) => p.stockAdana > 0).length,
      totalStock: products.reduce((sum, p) => sum + p.stockAdana, 0),
      lowStockCount: products.filter((p) => p.stockAdana > 0 && p.stockAdana < 10).length,
      outOfStockCount: products.filter((p) => p.stockAdana === 0).length,
    },
  ]

  // Overall stats
  const overallStats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stockMainWarehouse + p.stockAdana, 0),
    lowStockCount: products.filter((p) => {
      const total = p.stockMainWarehouse + p.stockAdana
      return total > 0 && total < 10
    }).length,
    outOfStockCount: products.filter((p) => p.stockMainWarehouse + p.stockAdana === 0).length,
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const getStockStatus = (product: Product) => {
    const totalStock = product.stockMainWarehouse + product.stockAdana
    if (totalStock === 0) return { label: "Stokta Yok", variant: "destructive" as const, icon: AlertTriangle }
    if (totalStock < 10) return { label: "Düşük Stok", variant: "secondary" as const, icon: TrendingDown }
    return { label: "Stokta", variant: "default" as const, icon: Package }
  }

  const handleStockAdjustment = (productId: string, warehouse: "main" | "adana", adjustment: number) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const newStock = Math.max(
            0,
            warehouse === "main" ? product.stockMainWarehouse + adjustment : product.stockAdana + adjustment,
          )
          return {
            ...product,
            [warehouse === "main" ? "stockMainWarehouse" : "stockAdana"]: newStock,
          }
        }
        return product
      }),
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Stok Yönetimi</h1>
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
          <h1 className="text-3xl font-bold text-foreground">Stok Yönetimi</h1>
          <p className="text-muted-foreground">
            Toplam {products.length} ürün • {filteredProducts.length} gösteriliyor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/stock/movements">
              <RotateCcw className="h-4 w-4 mr-2" />
              Stok Hareketleri
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/stock/adjustments">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Stok Düzeltme
            </Link>
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Stok</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Düşük Stok</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{overallStats.lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Stokta Yok
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallStats.outOfStockCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        {warehouseStats.map((warehouse) => (
          <Card key={warehouse.warehouse}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                {warehouse.warehouseName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Toplam Ürün</div>
                  <div className="text-2xl font-bold">{warehouse.totalProducts}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Toplam Stok</div>
                  <div className="text-2xl font-bold">{warehouse.totalStock}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Düşük Stok</div>
                  <div className="text-lg font-semibold text-orange-600">{warehouse.lowStockCount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Stokta Yok</div>
                  <div className="text-lg font-semibold text-red-600">{warehouse.outOfStockCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Ürün adı, marka veya SKU ile ara..."
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
                    Depo
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("all")}>Tüm Depolar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("main")}>Ana Depo</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedWarehouse("adana")}>Adana Depo</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Stok Durumu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setStockFilter("all")}>Tüm Ürünler</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStockFilter("low")}>Düşük Stok</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStockFilter("out")}>Stokta Yok</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Görsel</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Ana Depo</TableHead>
                <TableHead>Adana Depo</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => {
                const stockStatus = getStockStatus(product)
                const totalStock = product.stockMainWarehouse + product.stockAdana
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm line-clamp-1">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.brand}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.stockMainWarehouse}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => handleStockAdjustment(product.id, "main", -1)}
                            disabled={product.stockMainWarehouse === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => handleStockAdjustment(product.id, "main", 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{product.stockAdana}</span>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => handleStockAdjustment(product.id, "adana", -1)}
                            disabled={product.stockAdana === 0}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => handleStockAdjustment(product.id, "adana", 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-lg">{totalStock}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant} className="text-xs flex items-center gap-1 w-fit">
                        <stockStatus.icon className="h-3 w-3" />
                        {stockStatus.label}
                      </Badge>
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
                            <Link href={`/admin/stock/movements?product=${product.id}`}>
                              <RotateCcw className="h-4 w-4 mr-2" />
                              Stok Hareketleri
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/stock/adjustments?product=${product.id}`}>
                              <ArrowRightLeft className="h-4 w-4 mr-2" />
                              Stok Düzelt
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default AdminStockPage
