"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, Share2, ShoppingCart, Check, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { useCartStore } from "@/lib/cart-store"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/product/${slug}`)
        const data = await response.json()

        if (data.product) {
          setProduct(data.product)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error loading product:", error)
        setLoading(false)
      }
    }

    if (slug) {
      loadProduct()
    }
  }, [slug])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      setIsAddedToCart(true)

      // 3 saniye sonra butonu normale döndür
      setTimeout(() => {
        setIsAddedToCart(false)
      }, 3000)
    }
  }

  const handleGoBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Button onClick={handleGoBack} className="bg-rawises-600 hover:bg-rawises-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </div>
        <Footer />
        <MobileBottomNav />
      </div>
    )
  }

  const images = product.imageUrl ? [product.imageUrl] : ["/placeholder.svg?height=500&width=500"]
  const discountPercentage = calculateDiscountPercentage(product.salePrice, product.discountPrice)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={handleGoBack} className="hover:text-rawises-600">
            Ana Sayfa
          </button>
          <span>/</span>
          <span className="text-rawises-600">{product.name.substring(0, 50)}...</span>
        </div>

        {/* Back Button - Mobile */}
        <Button variant="ghost" onClick={handleGoBack} className="md:hidden mb-4 p-2 hover:bg-rawises-50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=500&width=500"
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? "border-rawises-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div>
              <Badge variant="outline" className="border-rawises-200 text-rawises-700">
                {product.brand}
              </Badge>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.8) • 127 değerlendirme</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                  {product.discountPrice} TL
                </span>
                {product.salePrice > product.discountPrice && (
                  <span className="text-xl text-gray-400 line-through">{product.salePrice} TL</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <Badge className="bg-accent-500 hover:bg-accent-600 text-white">%{discountPercentage} İndirim</Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ürün Açıklaması</h3>
              <p className="text-gray-600 leading-relaxed">
                {stripHtmlTags(product.description) || "Bu ürün için detaylı açıklama bulunmamaktadır."}
              </p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Stokta ({product.stockMainWarehouse + product.stockAdana} adet)</span>
              </div>
              <span className="text-gray-400">SKU: {product.sku}</span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Adet:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-base font-semibold transition-all duration-300 ${
                    isAddedToCart
                      ? "bg-accent-600 hover:bg-accent-700"
                      : "bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                  }`}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Sepete Eklendi
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Sepete Ekle
                    </>
                  )}
                </Button>

                <Button variant="outline" size="lg" className="px-4 bg-transparent">
                  <Heart className="w-5 h-5" />
                </Button>

                <Button variant="outline" size="lg" className="px-4 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rawises-100 rounded-full">
                  <Truck className="w-5 h-5 text-rawises-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Ücretsiz Kargo</p>
                  <p className="text-xs text-gray-600">500 TL üzeri</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-100 rounded-full">
                  <Shield className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Orijinal Ürün</p>
                  <p className="text-xs text-gray-600">Garantili</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-100 rounded-full">
                  <RotateCcw className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Kolay İade</p>
                  <p className="text-xs text-gray-600">14 gün içinde</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Ürün Detayları</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Marka:</span>
                    <span>{product.brand}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Kategori:</span>
                    <span>{product.categories.split(">").pop()?.trim()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Barkod:</span>
                    <span>{product.barcode || "Belirtilmemiş"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Stok Durumu:</span>
                    <span className="text-green-600 font-medium">Stokta</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Ana Depo:</span>
                    <span>{product.stockMainWarehouse} adet</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Adana Şube:</span>
                    <span>{product.stockAdana} adet</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
