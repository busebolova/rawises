"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Heart, Check, ImageIcon, AlertCircle, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/csv-parser"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const { addItem } = useCartStore()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products?sortBy=date-desc&limit=16")

        if (!response.ok) {
          throw new Error("Ürünler yüklenemedi")
        }

        const data = await response.json()

        if (data.products && Array.isArray(data.products)) {
          // Filter out products that are out of stock
          const inStockProducts = data.products
            .filter((product: any) => {
              const totalStock = calculateTotalStock(product)
              return totalStock > 0
            })
            .slice(0, 8) // Take only first 8 products after filtering

          setProducts(inStockProducts)
        } else {
          setProducts([])
        }
      } catch (err) {
        console.error("Latest products fetch error:", err)
        setError(err instanceof Error ? err.message : "Bir hata oluştu")
      } finally {
        setLoading(false)
      }
    }

    fetchLatestProducts()
  }, [])

  const formatPrice = (price: number): string => {
    try {
      return new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price)
    } catch (error) {
      return `${price.toFixed(2)}`
    }
  }

  const calculateTotalStock = (product: any): number => {
    const adanaStock = Number.parseInt(product.stockAdana?.toString() || "0")
    const anaDepoStock = Number.parseInt(
      product.stockMainWarehouse?.toString() || product.stockAnaDepo?.toString() || "0",
    )
    return adanaStock + anaDepoStock
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    const totalStock = calculateTotalStock(product)
    if (totalStock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.imageUrl || product.image,
        brand: product.brand,
      })
      setAddedItems((prev) => new Set(prev).add(product.id))

      setTimeout(() => {
        setAddedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(product.id)
          return newSet
        })
      }, 2000)
    }
  }

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId))
  }

  const getProductUrl = (product: any) => {
    const identifier = product.slug || product.id || product.variantId
    return `/product/${identifier}`
  }

  const handleAddToFavorites = async (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          image: product.imageUrl || product.image,
          price: (product.discountPrice || product.price).toString(),
          brand: product.brand,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.message)
      }
    } catch (error) {
      console.error("Error updating favorites:", error)
    }
  }

  if (loading) {
    return (
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">En Yeni Ürünler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Koleksiyonumuza yeni eklenen ürünleri keşfedin</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 animate-pulse rounded-t-2xl"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">En Yeni Ürünler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Koleksiyonumuza yeni eklenen ürünleri keşfedin</p>
          </div>
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ürünler Yüklenemedi</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Tekrar Dene
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">En Yeni Ürünler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Koleksiyonumuza yeni eklenen ürünleri keşfedin</p>
          </div>
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stokta Ürün Yok</h3>
            <p className="text-gray-600">Şu anda stokta bulunan yeni ürün bulunmuyor</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">En Yeni Ürünler</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Koleksiyonumuza yeni eklenen ürünleri keşfedin</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {products.map((product) => {
            const totalStock = calculateTotalStock(product)
            const isAdded = addedItems.has(product.id)
            const hasImageError = imageErrors.has(product.id)
            const productUrl = getProductUrl(product)

            return (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-white shadow-sm hover:shadow-2xl flex flex-col h-full overflow-hidden"
              >
                <Link href={productUrl} onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                    {!hasImageError && (product.imageUrl || product.image) ? (
                      <Image
                        src={product.imageUrl || product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain group-hover:scale-105 transition-transform duration-300 max-w-full max-h-full"
                        onError={() => handleImageError(product.id)}
                        unoptimized
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs text-center">Görsel Yok</span>
                      </div>
                    )}

                    {/* Heart Icon - Top Right */}
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/90 hover:bg-white text-gray-400 hover:text-teal-500 p-2 h-8 w-8 rounded-full shadow-sm"
                        onClick={(e) => handleAddToFavorites(e, product)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Link>

                <CardContent className="p-4 flex flex-col flex-grow">
                  {/* Brand Badge */}
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-teal-100 text-teal-700 hover:bg-teal-200 text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {product.brand}
                    </Badge>
                  </div>

                  {/* Product Title */}
                  <Link href={productUrl} onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 flex-grow leading-tight hover:text-teal-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Product Description */}
                  <p className="text-xs text-teal-600 mb-4 line-clamp-2 leading-relaxed">
                    {product.description ? product.description.substring(0, 60) + "..." : ""}
                  </p>

                  {/* Price Section */}
                  <div className="mb-4">
                    {product.salePrice && product.discountPrice && product.salePrice > product.discountPrice ? (
                      <>
                        <div className="text-sm text-gray-400 line-through mb-1">
                          {formatPrice(product.salePrice)} TL
                        </div>
                        <div className="text-xl font-bold text-teal-600">{formatPrice(product.discountPrice)} TL</div>
                      </>
                    ) : (
                      <div className="text-xl font-bold text-teal-600">
                        {formatPrice(product.discountPrice || product.price || product.salePrice)} TL
                      </div>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="text-xs text-green-600 mb-3">{totalStock} adet stokta</div>

                  {/* Add to Cart Button */}
                  <div className="mt-auto">
                    <Button
                      className={`w-full transition-all duration-300 text-sm py-3 rounded-xl font-medium ${
                        isAdded
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
                      }`}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Sepete Eklendi
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Sepete Ekle
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/category" onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}>
            <Button variant="outline" size="lg">
              Tüm Ürünleri Görüntüle
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
