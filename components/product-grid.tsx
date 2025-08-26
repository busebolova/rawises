"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Filter } from "lucide-react"
import Image from "next/image"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Flormar Oje - Kırmızı",
    description: "Uzun süre kalıcı kırmızı oje",
    price: 25.9,
    discountPrice: 0,
    salePrice: 25.9,
    category: "Makyaj > Oje",
    imageUrl:
      "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/flormar-oje-kirmizi.jpg",
    sku: "FL001",
    stockMainWarehouse: 30,
    stockAdana: 20,
    stock_quantity: 50,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    brand: "Flormar",
  },
  {
    id: "2",
    name: "Gabrini Ruj - Mat Finish",
    description: "Mat bitişli uzun süre kalıcı ruj",
    price: 45.9,
    discountPrice: 0,
    salePrice: 45.9,
    category: "Makyaj > Ruj",
    imageUrl: "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/gabrini-ruj-mat.jpg",
    sku: "GB001",
    stockMainWarehouse: 20,
    stockAdana: 10,
    stock_quantity: 30,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    brand: "Gabrini",
  },
  {
    id: "3",
    name: "L'Oreal Paris Maskara",
    description: "Hacim veren siyah maskara",
    price: 89.9,
    discountPrice: 0,
    salePrice: 89.9,
    category: "Makyaj > Maskara",
    imageUrl: "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/loreal-maskara.jpg",
    sku: "LO001",
    stockMainWarehouse: 25,
    stockAdana: 15,
    stock_quantity: 40,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    brand: "L'Oreal",
  },
]

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([]) // Tüm ürünleri saklamak için
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // Seçili kategori
  const [loading, setLoading] = useState(true)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(50) // Show 50 products per page instead of limiting
  const { addItem } = useCartStore()

  useEffect(() => {
    const handleCategoryFilter = (event: CustomEvent) => {
      console.log("[v0] ProductGrid: Kategori filtresi alındı:", event.detail)
      const { category, subcategory } = event.detail

      if (category && subcategory) {
        const filterText = `${category}>${subcategory}`
        setSelectedCategory(filterText)

        // Ürünleri kategoriye göre filtrele
        const filteredProducts = allProducts.filter((product) => {
          const productCategory = product.category || ""
          return (
            productCategory.toLowerCase().includes(category.toLowerCase()) ||
            productCategory.toLowerCase().includes(subcategory.toLowerCase())
          )
        })

        console.log("[v0] ProductGrid: Filtrelenmiş ürün sayısı:", filteredProducts.length, "Kategori:", filterText)
        setProducts(filteredProducts)
      }
    }

    const handleResetFilter = () => {
      console.log("[v0] ProductGrid: Filtre sıfırlandı")
      setSelectedCategory(null)
      setProducts(allProducts)
    }

    // Event listener'ları ekle
    window.addEventListener("categoryFilter", handleCategoryFilter as EventListener)
    window.addEventListener("resetFilter", handleResetFilter as EventListener)

    return () => {
      window.removeEventListener("categoryFilter", handleCategoryFilter as EventListener)
      window.removeEventListener("resetFilter", handleResetFilter as EventListener)
    }
  }, [allProducts])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("[v0] ProductGrid: API'den ürünler yükleniyor...")

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch("/api/products", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        clearTimeout(timeoutId)

        console.log("[v0] ProductGrid: API response status:", response.status)
        console.log("[v0] ProductGrid: API response headers:", Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.error("[v0] ProductGrid: API returned non-JSON response:", contentType)
          throw new Error("API returned non-JSON response")
        }

        const data = await response.json()
        console.log(
          "[v0] ProductGrid: API'den",
          Array.isArray(data) ? data.length : data.products?.length || 0,
          "ürün yüklendi",
        )

        let productsArray: Product[] = []
        if (Array.isArray(data)) {
          productsArray = data
        } else if (data.products && Array.isArray(data.products)) {
          productsArray = data.products
        } else {
          throw new Error("Invalid API response format")
        }

        if (productsArray.length > 0) {
          const validProducts = productsArray.filter((product) => {
            return (
              product &&
              typeof product === "object" &&
              product.name &&
              typeof product.name === "string" &&
              product.name.trim().length > 0
            )
          })

          console.log("[v0] ProductGrid: Geçerli ürün sayısı:", validProducts.length, "/ Toplam:", productsArray.length)

          const productsWithImageTest = await Promise.all(
            validProducts.map(async (product) => {
              try {
                const hasStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0) > 0
                const hasName = product.name && product.name.trim().length > 0
                const hasImageUrl = product.imageUrl && product.imageUrl.trim().length > 0

                const imageLoads = true

                console.log("[v0] ProductGrid: Ürün filtreleme -", product.name, {
                  hasStock,
                  hasImageUrl,
                  hasName,
                  imageLoads,
                  imageUrl: product.imageUrl,
                })

                return {
                  ...product,
                  hasStock,
                  hasName,
                  hasImageUrl,
                  imageLoads,
                  isValid: hasName && hasImageUrl,
                }
              } catch (error) {
                console.error("[v0] ProductGrid: Ürün işleme hatası:", product?.name || "Bilinmeyen ürün", error)
                return null
              }
            }),
          )

          const validProcessedProducts = productsWithImageTest.filter((product) => product !== null)

          const sortedProducts = validProcessedProducts
            .filter((product) => product.isValid)
            .sort((a, b) => {
              // 1. Stoklu ve görseli olan ürünler
              const aHasBoth = a.hasStock && a.imageLoads
              const bHasBoth = b.hasStock && b.imageLoads

              if (aHasBoth && !bHasBoth) return -1
              if (!aHasBoth && bHasBoth) return 1

              // 2. Sadece stoklu olanlar
              if (a.hasStock && !b.hasStock) return -1
              if (!a.hasStock && b.hasStock) return 1

              // 3. Sadece görseli olanlar
              if (a.imageLoads && !b.imageLoads) return -1
              if (!a.imageLoads && b.imageLoads) return 1

              return 0
            })

          console.log("[v0] ProductGrid: Toplam ürün sayısı:", sortedProducts.length)
          console.log("[v0] ProductGrid: Stoklu ürün sayısı:", sortedProducts.filter((p) => p.hasStock).length)

          setAllProducts(sortedProducts)
          setProducts(sortedProducts)
        } else {
          throw new Error("Invalid API response format")
        }
      } catch (error) {
        console.error("[v0] ProductGrid: Ürün yükleme hatası:", error)
        console.log("[v0] ProductGrid: Fallback ürünler kullanılıyor...")

        setAllProducts(fallbackProducts)
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    const totalStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0)
    if (totalStock <= 0) {
      return
    }

    addItem(product)
    setAddedItems((prev) => new Set(prev).add(product.id))

    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const handleProductClick = (product: Product) => {
    const productDetailEvent = new CustomEvent("openProductDetail", {
      detail: { product },
    })
    window.dispatchEvent(productDetailEvent)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  if (loading) {
    return (
      <section className="py-6 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Öne Çıkan Ürünler</h2>
            <p className="text-sm lg:text-base text-gray-600">En popüler makyaj ürünleri</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-t-lg mb-2"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded mb-2"></div>
                <div className="bg-gray-200 h-8 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {selectedCategory ? `${selectedCategory} Ürünleri` : "Öne Çıkan Ürünler"}
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                {selectedCategory ? `${selectedCategory} kategorisindeki ürünler` : "En popüler makyaj ürünleri"}
              </p>
            </div>
            {selectedCategory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                  setProducts(allProducts)
                  console.log("[v0] ProductGrid: Kategori filtresi temizlendi")
                }}
                className="text-xs"
              >
                <Filter className="w-4 h-4 mr-2" />
                Tüm Ürünler
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {currentProducts.map((product) => {
            const isAdded = addedItems.has(product.id)
            const totalStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0)
            const isOutOfStock = totalStock === 0

            return (
              <Card
                key={product.id}
                className={`group hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-gray-300 flex flex-col h-full cursor-pointer ${
                  isOutOfStock ? "opacity-75" : ""
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      isOutOfStock ? "grayscale" : ""
                    }`}
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.src = "/placeholder.svg?height=300&width=300"
                    }}
                  />
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                    <Badge variant="destructive" className="bg-accent-500 hover:bg-accent-600 text-xs px-1 sm:px-2">
                      %{calculateDiscountPercentage(product.salePrice, product.discountPrice)}
                    </Badge>
                  </div>
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                    <Badge variant={totalStock > 10 ? "default" : "secondary"} className="text-xs px-1 sm:px-2">
                      {totalStock > 0 ? "Stokta" : "Stokta Yok"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-2 sm:p-3 lg:p-4 flex flex-col flex-grow">
                  <div className="mb-1 sm:mb-2">
                    <Badge variant="outline" className="text-xs border-gray-200 text-gray-700 px-1 sm:px-2">
                      {product.brand}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 text-gray-800 leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-1 hidden sm:block">
                    {stripHtmlTags(product.description || "").substring(0, 40)}...
                  </p>

                  <div className="flex flex-col gap-1 mb-2 sm:mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">KDV Hariç:</span>
                      <div className="text-right">
                        {product.discountPrice &&
                        product.discountPrice > 0 &&
                        product.discountPrice < (product.salePrice || 0) ? (
                          <>
                            <span className="text-xs line-through text-gray-400">
                              {(product.salePrice || 0).toFixed(2)} TL
                            </span>
                            <div className="text-sm font-bold text-green-600">
                              {product.discountPrice.toFixed(2)} TL
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-medium text-gray-800">
                            {(product.salePrice || product.price || 0).toFixed(2)} TL
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      className={`w-full transition-all duration-300 text-xs sm:text-sm py-1 sm:py-2 ${
                        isOutOfStock
                          ? "bg-gray-400 cursor-not-allowed"
                          : isAdded
                            ? "bg-accent-600 hover:bg-accent-700"
                            : "bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-400"
                      }`}
                      size="sm"
                      disabled={isOutOfStock}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      {isOutOfStock ? (
                        "Stokta Yok"
                      ) : isAdded ? (
                        <>
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Sepete Eklendi</span>
                          <span className="sm:hidden">Eklendi</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Sepete Ekle</span>
                          <span className="sm:hidden">Ekle</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Önceki
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i
                if (pageNum > totalPages) return null

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sonraki
            </Button>
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory
                ? `${selectedCategory} kategorisinde ürün bulunamadı.`
                : "Şu anda görüntülenecek ürün bulunmuyor."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
