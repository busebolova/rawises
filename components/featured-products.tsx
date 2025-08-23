"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart } from "lucide-react"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          const sortedByDiscount = data.products
            .filter(
              (p: Product) =>
                p.salePrice > p.discountPrice &&
                p.discountPrice > 0 &&
                p.salePrice > 0 &&
                p.imageUrl &&
                p.imageUrl.trim() !== "" &&
                !p.imageUrl.includes("placeholder"),
            )
            .sort(
              (a: Product, b: Product) =>
                calculateDiscountPercentage(b.salePrice, b.discountPrice) -
                calculateDiscountPercentage(a.salePrice, a.discountPrice),
            )
            .slice(0, 6)

          setFeaturedProducts(sortedByDiscount)
        }
      } catch (error) {
        console.error("Error loading featured products:", error)
      }
    }

    loadFeaturedProducts()
  }, [])

  const handleCampaignClick = () => {
    // Makyaj kategorisine yönlendir
    const filterEvent = new CustomEvent("categoryFilter", {
      detail: { category: "Makyaj" },
    })
    window.dispatchEvent(filterEvent)
  }

  const handleProductClick = (product: Product) => {
    // Ürün detay modal'ını aç
    const productDetailEvent = new CustomEvent("openProductDetail", {
      detail: { product },
    })
    window.dispatchEvent(productDetailEvent)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation() // Ürün detayına gitmesini engelle
    addItem(product)
  }

  // 3'lü gruplar halinde böl
  const productGroups = []
  for (let i = 0; i < featuredProducts.length; i += 2) {
    productGroups.push(featuredProducts.slice(i, i + 2))
  }

  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* FAQ Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {productGroups &&
            productGroups.length > 0 &&
            productGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-3 sm:p-4 text-center">
                  <div className="mb-2">
                    <span className="text-xs sm:text-sm font-bold bg-white text-purple-600 px-2 py-1 rounded">
                      Rawises
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold mb-2">Makyaj Ürünlerinde</h3>
                  <h3 className="text-xs sm:text-sm font-bold mb-2">ÜYELERE ÖZEL</h3>
                  <Button
                    onClick={handleCampaignClick}
                    className="bg-white text-purple-600 hover:bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-black text-sm sm:text-base lg:text-lg transition-colors duration-300"
                  >
                    SEPETTE EK İNDİRİM
                  </Button>
                </div>

                <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {group &&
                    group.length > 0 &&
                    group.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-800 mb-1 line-clamp-1 sm:line-clamp-2 font-medium group-hover:text-purple-700 transition-colors">
                            {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="text-xs line-through text-gray-400">{product.salePrice} TL</span>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs w-fit">
                              %{calculateDiscountPercentage(product.salePrice, product.discountPrice)} İndirim
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-center gap-2">
                          <Button
                            onClick={(e) => handleAddToCart(e, product)}
                            size="sm"
                            className="bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 px-1 py-1 rounded text-xs transition-colors duration-300 opacity-0 group-hover:opacity-100"
                            title="Sepete Ekle"
                          >
                            <ShoppingCart className="w-3 h-3" />
                          </Button>
                          <div className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-2 sm:px-3 py-1 rounded font-bold text-xs sm:text-sm transition-colors duration-300 group-hover:shadow-md">
                            {product.discountPrice} TL
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  )
}
