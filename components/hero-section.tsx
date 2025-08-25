"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { Product } from "@/lib/csv-parser"

export function HeroSection() {
  const [heroProducts, setHeroProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadHeroProducts = async () => {
      try {
        console.log("[v0] Loading hero products from API...")
        const response = await fetch("/api/products")

        if (!response.ok) {
          console.error("[v0] Hero products API response not ok:", response.status)
          return
        }

        const data = await response.json()

        if (data.products && Array.isArray(data.products)) {
          const validProducts = data.products.filter((product: Product) => {
            const hasValidPrice =
              (product.discountPrice && product.discountPrice > 0) ||
              (product.salePrice && product.salePrice > 0) ||
              (product.price && product.price > 0)
            const hasStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0) > 0

            const hasValidImage =
              product.imageUrl &&
              typeof product.imageUrl === "string" &&
              product.imageUrl.trim() !== "" &&
              product.imageUrl.length > 10 &&
              (product.imageUrl.startsWith("https://") || product.imageUrl.startsWith("http://")) &&
              !product.imageUrl.includes("placeholder") &&
              !product.imageUrl.includes("default") &&
              (product.imageUrl.includes(".jpg") ||
                product.imageUrl.includes(".jpeg") ||
                product.imageUrl.includes(".png") ||
                product.imageUrl.includes(".webp"))

            console.log(
              `[v0] Hero product validation - ${product.name}: hasValidPrice=${hasValidPrice}, hasStock=${hasStock}, hasValidImage=${hasValidImage}, imageUrl=${product.imageUrl}`,
            )

            return hasValidPrice && hasStock && hasValidImage
          })

          console.log("[v0] Found valid hero products:", validProducts.length)
          setHeroProducts(validProducts.slice(0, 4))
        } else {
          console.log("[v0] No products found in hero API response")
          setHeroProducts([])
        }
      } catch (error) {
        console.error("[v0] Error loading hero products:", error)
        setHeroProducts([])
      }
    }

    loadHeroProducts()
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-rawises-200 via-rawises-300 to-rawises-400 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 lg:mb-6 shadow-lg">
                <div className="h-5 sm:h-6 w-16 bg-gradient-to-r from-rawises-600 to-brand-500 rounded text-white text-xs font-bold flex items-center justify-center">
                  RAWISES
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-rawises-800 mb-1 sm:mb-2">Üyelere Özel</h3>
              <h3 className="text-lg sm:text-xl font-semibold text-rawises-800 mb-4 lg:mb-6">Tüm Ürünlerde Sepette</h3>
            </div>

            <div className="relative inline-block mb-6 lg:mb-8">
              <div className="bg-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 rounded-2xl sm:rounded-3xl shadow-xl transform -rotate-1 sm:-rotate-2 border-2 border-rawises-100">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-rawises-700 to-brand-600 bg-clip-text text-transparent">
                  EK İNDİRİM
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <p className="text-xs sm:text-sm text-rawises-800 leading-relaxed">
                Bu kampanya yalnızca rawises.com'a üye olan kullanıcılar için geçerlidir. Kampanya, 4-31 Nisan 2025
                tarihleri arasında geçerlidir.
              </p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {heroProducts &&
                heroProducts.length > 0 &&
                heroProducts.slice(0, 4).map((product, index) => {
                  const displayPrice = product.discountPrice || product.salePrice || product.price || 0

                  return (
                    <div
                      key={product.id}
                      data-product-id={product.id}
                      className={`bg-white/95 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-lg border border-rawises-100 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        index % 2 === 1 ? "mt-4 sm:mt-6 lg:mt-8" : ""
                      }`}
                    >
                      <div className="aspect-square mb-2 sm:mb-3 overflow-hidden rounded-lg lg:rounded-xl bg-gray-50">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px]"
                          crossOrigin="anonymous"
                          onError={(e) => {
                            console.log(`[v0] Image failed to load for hero product: ${product.name}`)
                            // Görsel yüklenemezse ürünü DOM'dan kaldır
                            const productElement = (e.target as HTMLElement).closest("[data-product-id]")
                            if (productElement) {
                              productElement.style.display = "none"
                            }
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-rawises-600 to-brand-500 text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md">
                          {displayPrice} TL
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
