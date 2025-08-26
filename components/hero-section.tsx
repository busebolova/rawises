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
          setFallbackHeroProducts()
          return
        }

        const data = await response.json()
        console.log(
          "[v0] HeroSection: API'den",
          Array.isArray(data) ? data.length : data.products?.length || 0,
          "ürün yüklendi",
        )

        const products = Array.isArray(data) ? data : data.products && Array.isArray(data.products) ? data.products : []

        if (products.length > 0) {
          const validProductsForProcessing = products.filter((product: any) => {
            return (
              product &&
              typeof product === "object" &&
              product.name &&
              typeof product.name === "string" &&
              product.name.trim() !== "" &&
              product.imageUrl &&
              typeof product.imageUrl === "string" &&
              product.imageUrl.trim() !== ""
            )
          })

          console.log(
            `[v0] Processing ${validProductsForProcessing.length} valid products out of ${products.length} total products`,
          )

          const processedProducts = validProductsForProcessing
            .map((product: any) => {
              try {
                const hasValidPrice =
                  (product.discountPrice && product.discountPrice > 0) ||
                  (product.salePrice && product.salePrice > 0) ||
                  (product.price && product.price > 0)
                const hasStock = (product.stockMainWarehouse || 0) + (product.stockAdana || 0) > 0

                const hasValidImageUrl =
                  product.imageUrl &&
                  typeof product.imageUrl === "string" &&
                  product.imageUrl.trim() !== "" &&
                  product.imageUrl.length > 10 &&
                  (product.imageUrl.startsWith("https://") || product.imageUrl.startsWith("http://"))

                console.log(
                  `[v0] Hero product validation - ${product.name}: hasValidPrice=${hasValidPrice}, hasStock=${hasStock}, hasValidImage=${hasValidImageUrl}`,
                )

                return {
                  ...product,
                  hasValidPrice,
                  hasStock,
                  hasValidImageUrl,
                  isValid: hasValidPrice && hasStock && hasValidImageUrl,
                }
              } catch (error) {
                console.error("[v0] Error processing hero product:", product?.name || "unknown", error)
                return null
              }
            })
            .filter((product) => product !== null)

          const sortedProducts = processedProducts.sort((a, b) => {
            if (a.isValid && !b.isValid) return -1
            if (!a.isValid && b.isValid) return 1

            if (a.hasStock && !b.hasStock) return -1
            if (!a.hasStock && b.hasStock) return 1

            return 0
          })

          const validProducts = sortedProducts.filter((product) => product.isValid)

          console.log("[v0] Found valid hero products:", validProducts.length)
          if (validProducts.length > 0) {
            setHeroProducts(validProducts.slice(0, 4))
          } else {
            setFallbackHeroProducts()
          }
        } else {
          console.log("[v0] No products found in hero API response")
          setFallbackHeroProducts()
        }
      } catch (error) {
        console.error("[v0] Error loading hero products:", error)
        setFallbackHeroProducts()
      }
    }

    const setFallbackHeroProducts = () => {
      console.log("[v0] Using fallback hero products...")
      const fallbackProducts: Product[] = [
        {
          id: "hero-1",
          name: "Maybelline Instant Anti Age Eraser Kapatıcı",
          price: 89.9,
          discountPrice: 67.43,
          salePrice: 67.43,
          imageUrl: "/maybelline-foundation.png",
          category: "Makyaj",
          description: "Yaşlanma karşıtı kapatıcı",
          stockMainWarehouse: 25,
          stockAdana: 15,
          sku: "MAY-001",
        },
        {
          id: "hero-2",
          name: "L'Oreal Paris Voluminous Maskara",
          price: 129.9,
          discountPrice: 97.43,
          salePrice: 97.43,
          imageUrl: "/loreal-mascara.png",
          category: "Makyaj",
          description: "Hacim veren maskara",
          stockMainWarehouse: 30,
          stockAdana: 20,
          sku: "LOR-001",
        },
        {
          id: "hero-3",
          name: "MAC Ruby Woo Ruj",
          price: 199.9,
          discountPrice: 149.93,
          salePrice: 149.93,
          imageUrl: "/mac-ruby-woo-lipstick.png",
          category: "Makyaj",
          description: "Klasik kırmızı ruj",
          stockMainWarehouse: 20,
          stockAdana: 10,
          sku: "MAC-001",
        },
        {
          id: "hero-4",
          name: "Urban Decay Naked Palette",
          price: 299.9,
          discountPrice: 224.93,
          salePrice: 224.93,
          imageUrl: "/urban-decay-naked-palette.png",
          category: "Makyaj",
          description: "Göz farı paleti",
          stockMainWarehouse: 15,
          stockAdana: 8,
          sku: "UD-001",
        },
      ]
      setHeroProducts(fallbackProducts)
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
                  %15 EK İNDİRİM
                </span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <p className="text-xs sm:text-sm text-rawises-800 leading-relaxed">
                İlk üye olan müşterilerimize özel %15 indirim kampanyası! Bu kampanya yalnızca rawises.com'a ilk kez üye
                olan kullanıcılar için geçerlidir.
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
                            if (e && e.target) {
                              const imgElement = e.target as HTMLImageElement
                              imgElement.src =
                                "/placeholder.svg?height=180&width=180&text=" + encodeURIComponent(product.name)
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
