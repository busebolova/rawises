"use client"

import { useState, useEffect } from "react"
import { X, ShoppingCart, Heart, Star, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { calculateDiscountPercentage, stripHtmlTags, type Product } from "@/lib/csv-parser"
import Image from "next/image"

interface ProductDetailModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
}

export function ProductDetailModal({ isOpen, product, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discountPercentage = calculateDiscountPercentage(product.salePrice, product.discountPrice)
  const hasDiscount = product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.salePrice
  const displayPrice = hasDiscount ? product.discountPrice : product.salePrice
  const originalPrice = hasDiscount ? product.salePrice : null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-rawises-800">Ürün Detayı</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=400&width=400"
                    }}
                  />
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="bg-accent-500 text-white">
                        %{discountPercentage} İndirim
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-2 border-rawises-200 text-rawises-700">
                    {product.brand}
                  </Badge>
                  <h1 className="text-2xl font-bold text-rawises-800 mb-4">{product.name}</h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.2) • 127 değerlendirme</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    {originalPrice && <span className="text-lg line-through text-gray-400">{originalPrice} TL</span>}
                    <span className="text-3xl font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                      {displayPrice || 0} TL
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-rawises-800 mb-2">Ürün Açıklaması</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {stripHtmlTags(product.description) || "Bu ürün için detaylı açıklama bulunmamaktadır."}
                  </p>
                </div>

                {/* Stock Info */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Stokta ({product.stockMainWarehouse + product.stockAdana} adet)
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Hızlı Teslimat
                  </Badge>
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
                        className="px-3"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
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
                          Sepete Ekle ({((displayPrice || 0) * quantity).toFixed(2)} TL)
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="lg" className="px-4 bg-transparent">
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Product Features */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-rawises-800 mb-3">Ürün Özellikleri</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Marka:</span>
                      <span className="ml-2 font-medium">{product.brand}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">SKU:</span>
                      <span className="ml-2 font-medium">{product.sku}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Barkod:</span>
                      <span className="ml-2 font-medium">{product.barcode || "Belirtilmemiş"}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Kategori:</span>
                      <span className="ml-2 font-medium">
                        {product.categories?.split(">").pop()?.trim() || "Genel"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
