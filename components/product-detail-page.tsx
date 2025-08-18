"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { calculateDiscountPercentage, stripHtmlTags, type Product } from "@/lib/csv-parser"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProductDetailPageProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCartStore()
  const router = useRouter()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discountPercentage = calculateDiscountPercentage(product.salePrice, product.discountPrice)

  // Ürün görselleri (şimdilik tek görsel, gelecekte çoklu görsel için hazır)
  const productImages = [product.imageUrl || "/placeholder.svg"]

  const createProductSlug = (prod: Product) => {
    return (
      prod.slug ||
      prod.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:bg-rawises-50 text-rawises-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri Dön
          </Button>
          <span>/</span>
          <Link href="/" className="hover:text-rawises-600">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-rawises-800 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 border">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=600&width=600"
                }}
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="bg-accent-500 text-white text-sm px-3 py-1">
                    %{discountPercentage} İndirim
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail images - gelecekte çoklu görsel için */}
            {productImages && productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      selectedImage === index ? "border-rawises-500" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      crossOrigin="anonymous"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3 border-rawises-200 text-rawises-700">
                {product.brand}
              </Badge>
              <h1 className="text-2xl lg:text-3xl font-bold text-rawises-800 mb-4 leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.2)</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">127 değerlendirme</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                {product.salePrice > product.discountPrice && (
                  <span className="text-xl line-through text-gray-400">{product.salePrice} TL</span>
                )}
                <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                  {product.discountPrice} TL
                </span>
              </div>
            </div>

            {/* Stock and Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Stokta ({product.stockMainWarehouse + product.stockAdana} adet)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Truck className="w-3 h-3 mr-1" />
                  Hızlı Teslimat
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Orijinal Ürün
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  14 Gün İade
                </Badge>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Adet:</span>
                <div className="flex items-center border border-rawises-200 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 hover:bg-rawises-50"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 hover:bg-rawises-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 ${
                    isAdded
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                  }`}
                  size="lg"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Sepete Eklendi
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Sepete Ekle ({((product.discountPrice || 0) * quantity).toFixed(2)} TL)
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" className="px-4 bg-transparent hover:bg-rawises-50">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-4 bg-transparent hover:bg-rawises-50">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <h3 className="font-semibold text-rawises-800 mb-3">Ürün Açıklaması</h3>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="leading-relaxed">
                  {stripHtmlTags(product.description) || "Bu ürün için detaylı açıklama bulunmamaktadır."}
                </p>
              </div>
            </div>

            <Separator />

            {/* Product Features */}
            <div>
              <h3 className="font-semibold text-rawises-800 mb-3">Ürün Özellikleri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Marka:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Barkod:</span>
                  <span className="font-medium">{product.barcode || "Belirtilmemiş"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">{product.categories.split(">").pop()?.trim() || "Genel"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-rawises-800 mb-8">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedSlug = createProductSlug(relatedProduct)
                return (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                    <Link href={`/product/${relatedProduct.id}/${relatedSlug}`}>
                      <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.imageUrl || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=300&width=300"
                          }}
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="destructive" className="bg-accent-500 text-xs px-2">
                            %{calculateDiscountPercentage(relatedProduct.salePrice, relatedProduct.discountPrice)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="text-xs border-rawises-200 text-rawises-700 mb-2">
                        {relatedProduct.brand}
                      </Badge>
                      <Link href={`/product/${relatedProduct.id}/${relatedSlug}`}>
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-rawises-800 hover:text-rawises-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs line-through text-gray-400 block">
                            {relatedProduct.salePrice} TL
                          </span>
                          <span className="text-lg font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                            {relatedProduct.discountPrice} TL
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                          onClick={() => addItem(relatedProduct)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
