"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Filter } from "lucide-react"
import Image from "next/image"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"

const testImageLoad = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000)
  })
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("[v0] ProductGrid: API'den ürünler yükleniyor...")
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("[v0] ProductGrid: API'den", data.products?.length || 0, "ürün yüklendi")

        if (data.products && Array.isArray(data.products)) {
          const validProducts = []

          for (const product of data.products) {
            const hasStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0) > 0
            const hasName = product.name && product.name.trim().length > 0
            const hasImageUrl = product.imageUrl && product.imageUrl.trim().length > 0

            if (!hasStock || !hasName || !hasImageUrl) {
              console.log("[v0] ProductGrid: Ürün filtrelendi (temel kriterler) -", product.name)
              continue
            }

            // Test if image actually loads
            const imageLoads = await testImageLoad(product.imageUrl)

            console.log("[v0] ProductGrid: Ürün filtreleme -", product.name, {
              hasStock,
              hasImageUrl,
              hasName,
              imageLoads,
              imageUrl: product.imageUrl,
            })

            if (imageLoads) {
              validProducts.push(product)
            } else {
              console.log("[v0] ProductGrid: Ürün görseli yüklenemedi, filtrelendi -", product.name)
            }
          }

          console.log("[v0] ProductGrid: Filtrelenmiş ürün sayısı:", validProducts.length)
          setProducts(validProducts)
        }
      } catch (error) {
        console.error("[v0] ProductGrid: Ürün yükleme hatası:", error)
        setProducts([])
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
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Öne Çıkan Ürünler</h2>
          <p className="text-sm lg:text-base text-gray-600">En popüler makyaj ürünleri</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => {
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
                      const target = e.target as HTMLImageElement
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
                        <span className="text-xs line-through text-gray-400">{product.salePrice || 0} TL</span>
                        <div className="text-sm font-medium text-gray-600">{product.discountPrice || 0} TL</div>
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

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500 mb-4">Şu anda stokta olan ve geçerli görseli bulunan ürün bulunmuyor.</p>
          </div>
        )}
      </div>
    </section>
  )
}
