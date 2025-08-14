"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Check, ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface ProductDisplayGridProps {
  products: Product[]
  loading: boolean
}

export function ProductDisplayGrid({ products, loading }: ProductDisplayGridProps) {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const { addItem } = useCartStore()
  const searchParams = useSearchParams()
  const currentView = searchParams.get("view") || "grid-4"
  const { data: session } = useSession()
  const router = useRouter()

  // Filter out products that are out of stock
  const inStockProducts = products.filter((product) => {
    const totalStock = calculateTotalStock(product)
    return totalStock > 0
  })

  const calculateTotalStock = (product: Product): number => {
    const adanaStock = Number.parseInt(product.stockAdana?.toString() || "0")
    const anaDepoStock = Number.parseInt(
      product.stockMainWarehouse?.toString() || product.stockAnaDepo?.toString() || "0",
    )
    return adanaStock + anaDepoStock
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    const totalStock = calculateTotalStock(product)
    if (totalStock > 0) {
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
  }

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => new Set(prev).add(productId))
  }

  const getProductUrl = (product: Product) => {
    const identifier = product.slug || product.id || product.variantId
    return `/product/${identifier}`
  }

  const gridClasses =
    currentView === "grid-2"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
      : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"

  const handleAddToFavorites = async (e: React.MouseEvent, product: Product) => {
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
          image: product.imageUrl,
          price: product.discountPrice.toString(),
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

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  if (loading) {
    return (
      <div className={`${gridClasses} gap-3 sm:gap-4 lg:gap-6`}>
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-3 sm:p-4">
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-5 sm:h-6 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (inStockProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Stokta ürün bulunamadı.</p>
        <p className="text-gray-500 text-sm mt-2">Şu anda stokta bulunan ürün bulunmamaktadır.</p>
      </div>
    )
  }

  return (
    <div className={`${gridClasses} gap-4 sm:gap-6`}>
      {inStockProducts.map((product) => {
        const isAdded = addedItems.has(product.id)
        const hasImageError = imageErrors.has(product.id)
        const productUrl = getProductUrl(product)
        const totalStock = calculateTotalStock(product)

        return (
          <Card
            key={product.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-white shadow-sm hover:shadow-2xl flex flex-col h-full overflow-hidden"
          >
            <Link href={productUrl} className="flex flex-col h-full">
              <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                {!hasImageError && product.imageUrl ? (
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-105 transition-transform duration-300 max-w-full max-h-full"
                    onError={() => handleImageError(product.id)}
                    unoptimized // CORS sorunları için
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <span className="text-xs text-center">Görsel Yok</span>
                  </div>
                )}

                <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                  <Badge variant="destructive" className="bg-accent-500 hover:bg-accent-600 text-xs px-1 sm:px-2">
                    %{calculateDiscountPercentage(product.salePrice, product.discountPrice)}
                  </Badge>
                </div>
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

              <CardContent className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 text-teal-700 hover:bg-teal-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {product.brand}
                  </Badge>
                </div>

                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 flex-grow leading-tight">
                  {product.name.length > 40 ? product.name.substring(0, 40) + "..." : product.name}
                </h3>

                <p className="text-xs text-teal-600 mb-4 line-clamp-2 leading-relaxed hidden sm:block">
                  {stripHtmlTags(product.description).substring(0, 60)}...
                </p>

                <div className="mb-4">
                  <div className="text-sm text-gray-400 line-through mb-1">{formatPrice(product.salePrice)} TL</div>
                  <div className="text-xl font-bold text-teal-600">{formatPrice(product.discountPrice)} TL</div>
                </div>

                <div className="text-xs text-green-600 mb-3">{totalStock} adet stokta</div>

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
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
