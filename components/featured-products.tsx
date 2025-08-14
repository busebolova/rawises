"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { calculateDiscountPercentage, type Product } from "@/lib/csv-parser"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          // En yüksek indirimli ilk 6 ürünü al
          const sortedByDiscount = data.products
            .filter((p: Product) => p.salePrice > p.discountPrice)
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

  const getProductUrl = (product: Product) => {
    const identifier = product.slug || product.id || product.variantId
    return `/product/${identifier}`
  }

  // 3'lü gruplar halinde böl
  const productGroups = []
  for (let i = 0; i < featuredProducts.length; i += 2) {
    productGroups.push(featuredProducts.slice(i, i + 2))
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {productGroups.map((group, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 text-center">
                <div className="mb-2">
                  <span className="text-sm font-bold bg-white text-purple-600 px-2 py-1 rounded">Rawises</span>
                </div>
                <h3 className="text-sm font-bold mb-2">Makyaj Ürünlerinde</h3>
                <h3 className="text-sm font-bold mb-2">ÜYELERE ÖZEL</h3>
                <div className="bg-white text-purple-600 px-3 py-2 rounded-lg inline-block">
                  <span className="font-black text-lg">SEPETTE EK İNDİRİM</span>
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                {group.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductUrl(product)}
                    className="block hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">
                          {product.name.length > 35 ? product.name.substring(0, 35) + "..." : product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs line-through text-gray-400">{product.salePrice} TL</span>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                            %{calculateDiscountPercentage(product.salePrice, product.discountPrice)} İndirim
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-white border-2 border-purple-600 text-purple-600 px-3 py-1 rounded font-bold text-sm">
                          {product.discountPrice} TL
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
