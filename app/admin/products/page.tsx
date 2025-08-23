"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Upload, Download, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  sku: string
  stock_quantity: number
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("[v0] Loading products from database...")
        const response = await fetch("/api/admin/products")
        const data = await response.json()

        if (data.products) {
          setProducts(data.products)
          setFilteredProducts(data.products)
          console.log(`[v0] Loaded ${data.products.length} products`)
        }
        setLoading(false)
      } catch (error) {
        console.error("[v0] Error loading products:", error)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Filter products
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase().includes(selectedCategory.toLowerCase()))
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, products])

  const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)))

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      try {
        console.log(`[v0] Deleting product ${productId}...`)
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setProducts((prev) => prev.filter((p) => p.id !== productId))
          console.log("[v0] Product deleted successfully")
          alert("Ürün başarıyla silindi!")
        } else {
          throw new Error("Failed to delete product")
        }
      } catch (error) {
        console.error("[v0] Error deleting product:", error)
        alert("Ürün silinirken hata oluştu")
      }
    }
  }

  const getStockStatus = (product: Product) => {
    const totalStock = product.stock_quantity
    if (totalStock === 0) return { label: "Stokta Yok", variant: "destructive" as const }
    if (totalStock < 10) return { label: "Düşük Stok", variant: "secondary" as const }
    return { label: "Stokta", variant: "default" as const }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
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
          <h1 className="text-3xl font-bold text-foreground">Ürün Yönetimi</h1>
          <p className="text-muted-foreground">
            Toplam {products.length} ürün • {filteredProducts.length} gösteriliyor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Upload className="h-4 w-4 mr-2" />
            Toplu İçe Aktar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{products.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Ürün</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{products.filter((p) => p.is_active).length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Düşük Stok</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {products.filter((p) => p.stock_quantity < 10 && p.stock_quantity > 0).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stokta Yok</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {products.filter((p) => p.stock_quantity === 0).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
                <Input
                  placeholder="Ürün adı, kategori veya SKU ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Kategori
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedCategory("all")}>Tüm Kategoriler</DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-green-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-green-100">
                <TableHead className="w-16">Görsel</TableHead>
                <TableHead>Ürün</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => {
                const stockStatus = getStockStatus(product)
                return (
                  <TableRow key={product.id} className="border-green-50">
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-green-50">
                        <Image
                          src={product.image_url || "/placeholder.svg?height=48&width=48"}
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
                        <div className="text-xs text-muted-foreground">{product.category}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        {product.category || "Genel"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={stockStatus.variant} className="text-xs w-fit">
                          {stockStatus.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{product.stock_quantity} adet</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-700">{product.price} TL</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.is_active ? "default" : "secondary"}
                        className={product.is_active ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {product.is_active ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="hover:bg-green-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/product/${product.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Görüntüle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Sil
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
            className="border-green-200 text-green-700 hover:bg-green-50"
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
                  className={
                    currentPage === page
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }
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
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            Sonraki
          </Button>
        </div>
      )}
    </div>
  )
}
