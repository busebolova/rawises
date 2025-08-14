"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Search, Plus, Eye, Edit, Trash2, Filter, Download, Package, AlertTriangle } from "lucide-react"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice: number
  stock: number
  image: string
  status: "active" | "inactive" | "out_of_stock"
  createdDate: string
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const products: Product[] = [
    {
      id: "1",
      name: "MAYBELLINE Instant Anti Age Eraser Kapatıcı 02 Nude",
      brand: "Maybelline New York",
      category: "Makyaj",
      price: 495,
      originalPrice: 745,
      stock: 3,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
      createdDate: "2023-12-01",
    },
    {
      id: "2",
      name: "Morfose Milk Therapy Hair Spray 75 ml",
      brand: "Morfose",
      category: "Saç Bakımı",
      price: 95,
      originalPrice: 225,
      stock: 3,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
      createdDate: "2023-12-02",
    },
    {
      id: "3",
      name: "Marmara Barber Kolonya Pet No 7 / 400 ML",
      brand: "Barber",
      category: "Erkek Bakımı",
      price: 90,
      originalPrice: 215,
      stock: 5,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
      createdDate: "2023-12-03",
    },
    {
      id: "4",
      name: "Deotak Deodorant Krem Çay Ağacı Yağı 35 ml",
      brand: "Deotak",
      category: "Kişisel Bakım",
      price: 165,
      originalPrice: 274,
      stock: 6,
      image: "/placeholder.svg?height=60&width=60",
      status: "active",
      createdDate: "2023-12-04",
    },
    {
      id: "5",
      name: "REDONE SPIDER WAX 100ML. SHOW-OFF",
      brand: "Red One",
      category: "Saç Bakımı",
      price: 99,
      originalPrice: 219,
      stock: 0,
      image: "/placeholder.svg?height=60&width=60",
      status: "out_of_stock",
      createdDate: "2023-12-05",
    },
  ]

  const categories = ["Makyaj", "Saç Bakımı", "Erkek Bakımı", "Kişisel Bakım"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "inactive":
        return "Pasif"
      case "out_of_stock":
        return "Stokta Yok"
      default:
        return "Bilinmiyor"
    }
  }

  const getDiscountPercentage = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>
          <p className="text-gray-600">Ürün bilgilerini görüntüleyin ve yönetin</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Ürün
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Aktif Ürün</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Stokta Yok</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "out_of_stock").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Düşük Stok</p>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock > 0 && p.stock <= 5).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Ürün adı veya marka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
                <option value="out_of_stock">Stokta Yok</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ürün Listesi ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Ürün</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fiyat</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">İndirim</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Stok</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Durum</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tarih</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                          unoptimized
                          crossOrigin="anonymous"
                        />
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-2">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand}</p>
                          <p className="text-xs text-gray-400">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{product.category}</td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">₺{product.price}</p>
                        {product.originalPrice > product.price && (
                          <p className="text-sm text-gray-500 line-through">₺{product.originalPrice}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {product.originalPrice > product.price && (
                        <Badge className="bg-red-100 text-red-800">
                          %{getDiscountPercentage(product.price, product.originalPrice)}
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${product.stock <= 5 ? "text-red-600" : "text-gray-900"}`}>
                          {product.stock}
                        </span>
                        {product.stock <= 5 && product.stock > 0 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(product.status)}>{getStatusText(product.status)}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{product.createdDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
