"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"

interface FavoriteProduct {
  id: string
  name: string
  image: string
  price: string
  brand: string
}

export default function FavoritesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    loadFavorites()
  }, [session, status, router])

  const loadFavorites = async () => {
    try {
      const response = await fetch("/api/user/favorites")
      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites)
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromFavorites = async (productId: string) => {
    try {
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      if (response.ok) {
        setFavorites((prev) => prev.filter((fav) => fav.id !== productId))
      }
    } catch (error) {
      console.error("Error removing from favorites:", error)
    }
  }

  const handleAddToCart = (product: FavoriteProduct) => {
    // Convert favorite product to cart item format
    const cartItem = {
      id: product.id,
      variantId: product.id,
      name: product.name,
      description: "",
      salePrice: Number.parseFloat(product.price),
      discountPrice: Number.parseFloat(product.price),
      purchasePrice: 0,
      barcode: "",
      sku: "",
      brand: product.brand,
      categories: "",
      tags: "",
      imageUrl: product.image,
      metaTitle: "",
      metaDescription: "",
      slug: "",
      stockAdana: 10,
      stockMainWarehouse: 10,
      isActive: true,
      createdDate: new Date().toISOString(),
      discountPercentage: 0,
    }

    addItem(cartItem)
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-rawises-800 mb-2">Favorilerim</h1>
          <p className="text-gray-600">Beğendiğiniz ürünleri buradan takip edebilirsiniz</p>
        </div>

        {favorites.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Henüz favori ürününüz bulunmuyor</h3>
              <p className="text-gray-600 mb-6">Beğendiğiniz ürünleri favorilere ekleyerek kolayca ulaşabilirsiniz</p>
              <Link href="/">
                <Button className="bg-rawises-600 hover:bg-rawises-700">Ürünleri Keşfet</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{favorites.length}</span> favori ürününüz var
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 p-2 h-8 w-8"
                      onClick={() => removeFromFavorites(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs border-rawises-200 text-rawises-700">
                        {product.brand}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-rawises-800 leading-snug">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-lg font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                        {product.price} TL
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600 text-white"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Sepete Ekle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
