"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Check, Filter, X, Grid3X3, List, Star, Calculator } from "lucide-react"
import Image from "next/image"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<{ category?: string; subcategory?: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        if (data.products) {
          // 0 TL olmayan ürünleri filtrele
          const validProducts = data.products.filter(
            (product: Product) => product.discountPrice > 0 && product.salePrice > 0,
          )
          setProducts(validProducts)
          setFilteredProducts(validProducts.slice(0, 12))
        }
        setLoading(false)
      } catch (error) {
        console.error("Error loading products:", error)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const handleCategoryFilter = (event: CustomEvent) => {
      const { category, subcategory, csvCategory } = event.detail
      setActiveFilter({ category, subcategory })
      setSearchQuery("")

      // CSV kategorilerine göre gelişmiş filtreleme
      const filtered = products.filter((product) => {
        const searchTerm = csvCategory || subcategory || category

        // CSV'deki "Kategoriler" alanında arama yap
        const categoryMatch = product.categories.toLowerCase().includes(searchTerm.toLowerCase())

        // Ürün adında arama yap
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Marka alanında arama yap
        const brandMatch = product.brand.toLowerCase().includes(searchTerm.toLowerCase())

        // Etiketler alanında arama yap
        const tagMatch = product.tags.toLowerCase().includes(searchTerm.toLowerCase())

        // Açıklama alanında arama yap
        const descriptionMatch = stripHtmlTags(product.description).toLowerCase().includes(searchTerm.toLowerCase())

        // Özel kategori eşleştirmeleri
        let specialMatch = false

        // Makyaj kategorisi için özel eşleştirmeler
        if (
          searchTerm.toLowerCase().includes("makyaj") ||
          searchTerm.toLowerCase().includes("ruj") ||
          searchTerm.toLowerCase().includes("maskara") ||
          searchTerm.toLowerCase().includes("fondöten")
        ) {
          specialMatch =
            product.categories.toLowerCase().includes("makyaj") ||
            product.categories.toLowerCase().includes("kozmetik") ||
            product.name.toLowerCase().includes("ruj") ||
            product.name.toLowerCase().includes("maskara") ||
            product.name.toLowerCase().includes("fondöten")
        }

        // Cilt bakımı için özel eşleştirmeler
        if (searchTerm.toLowerCase().includes("cilt") || searchTerm.toLowerCase().includes("bakım")) {
          specialMatch =
            product.categories.toLowerCase().includes("cilt") ||
            product.categories.toLowerCase().includes("bakım") ||
            product.name.toLowerCase().includes("krem") ||
            product.name.toLowerCase().includes("serum")
        }

        // Saç bakımı için özel eşleştirmeler
        if (searchTerm.toLowerCase().includes("saç") || searchTerm.toLowerCase().includes("şampuan")) {
          specialMatch =
            product.categories.toLowerCase().includes("saç") ||
            product.name.toLowerCase().includes("şampuan") ||
            product.name.toLowerCase().includes("saç")
        }

        return categoryMatch || nameMatch || brandMatch || tagMatch || descriptionMatch || specialMatch
      })

      console.log(`Filtering for: ${category}, Found: ${filtered.length} products`)
      setFilteredProducts(filtered.slice(0, 24))
    }

    const handleSearch = (event: CustomEvent) => {
      const { query } = event.detail
      setSearchQuery(query)
      setActiveFilter(null)

      if (!query.trim()) {
        setFilteredProducts(products.slice(0, 12))
        return
      }

      // Gelişmiş arama algoritması
      const searchTerms = query
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0)

      const filtered = products.filter((product) => {
        const searchableText = [
          product.name,
          product.brand,
          product.categories,
          product.tags,
          stripHtmlTags(product.description),
        ]
          .join(" ")
          .toLowerCase()

        // Tüm arama terimlerinin en az birinin eşleşmesi gerekiyor
        return searchTerms.some((term) => searchableText.includes(term))
      })

      // Relevance scoring - daha iyi eşleşmeleri üstte göster
      const scoredResults = filtered.map((product) => {
        let score = 0
        const productName = product.name.toLowerCase()
        const productBrand = product.brand.toLowerCase()

        searchTerms.forEach((term) => {
          if (productName.includes(term)) score += 10
          if (productBrand.includes(term)) score += 8
          if (product.categories.toLowerCase().includes(term)) score += 5
          if (product.tags.toLowerCase().includes(term)) score += 3
        })

        return { product, score }
      })

      // Score'a göre sırala ve ürünleri al
      const sortedResults = scoredResults.sort((a, b) => b.score - a.score).map((item) => item.product)

      setFilteredProducts(sortedResults.slice(0, 24))
    }

    const handleClearSearch = () => {
      setSearchQuery("")
      setActiveFilter(null)
      setFilteredProducts(products.slice(0, 12))
    }

    window.addEventListener("categoryFilter", handleCategoryFilter as EventListener)
    window.addEventListener("searchProducts", handleSearch as EventListener)
    window.addEventListener("clearSearch", handleClearSearch as EventListener)

    return () => {
      window.removeEventListener("categoryFilter", handleCategoryFilter as EventListener)
      window.removeEventListener("searchProducts", handleSearch as EventListener)
      window.removeEventListener("clearSearch", handleClearSearch as EventListener)
    }
  }, [products])

  const handleAddToCart = (product: Product) => {
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

  const clearFilter = () => {
    setActiveFilter(null)
    setSearchQuery("")
    setFilteredProducts(products.slice(0, 12))
  }

  const createProductSlug = (product: Product) => {
    return (
      product.slug ||
      product.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
    )
  }

  // KDV dahil fiyat hesaplama
  const calculatePriceWithVAT = (price: number) => {
    return price * 1.2 // %20 KDV ekleme
  }

  if (loading) {
    return (
      <section className="py-6 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="relative aspect-square bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-2 sm:p-3 lg:p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-rawises-800">
                {activeFilter
                  ? `${activeFilter.subcategory || activeFilter.category} Ürünleri`
                  : searchQuery
                    ? `"${searchQuery}" Arama Sonuçları`
                    : "Öne Çıkan Ürünler"}
              </h2>
              <p className="text-sm lg:text-base text-rawises-600">
                {activeFilter || searchQuery ? `${filteredProducts.length} ürün bulundu` : "En popüler makyaj ürünleri"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle - Sadece desktop */}
              <div className="hidden lg:flex items-center border border-rawises-200 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid" ? "bg-rawises-600 text-white" : "text-rawises-600 hover:bg-rawises-50"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list" ? "bg-rawises-600 text-white" : "text-rawises-600 hover:bg-rawises-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {(activeFilter || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilter}
                  className="flex items-center gap-2 border-rawises-300 text-rawises-700 hover:bg-rawises-50 bg-transparent"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Temizle</span>
                </Button>
              )}
            </div>
          </div>

          {(activeFilter || searchQuery) && (
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-rawises-600" />
              <Badge variant="secondary" className="bg-rawises-100 text-rawises-800">
                {searchQuery
                  ? `Arama: ${searchQuery}`
                  : `${activeFilter?.category}${activeFilter?.subcategory ? ` > ${activeFilter.subcategory}` : ""}`}
              </Badge>
            </div>
          )}
        </div>

        {/* Grid View */}
        {(viewMode === "grid" || window.innerWidth < 1024) && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedItems.has(product.id)
              const productSlug = createProductSlug(product)
              const priceWithVAT = calculatePriceWithVAT(product.discountPrice)
              const salePriceWithVAT = calculatePriceWithVAT(product.salePrice)

              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 border-rawises-100 hover:border-rawises-300 flex flex-col h-full"
                >
                  <Link href={`/product/${product.id}/${productSlug}`} className="block">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=300"
                        }}
                      />
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                        <Badge variant="destructive" className="bg-accent-500 hover:bg-accent-600 text-xs px-1 sm:px-2">
                          %{calculateDiscountPercentage(product.salePrice, product.discountPrice)}
                        </Badge>
                      </div>
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/80 hover:bg-white text-rawises-600 hover:text-brand-500 h-6 w-6 sm:h-8 sm:w-8 p-0"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>

                  <CardContent className="p-2 sm:p-3 lg:p-4 flex flex-col flex-grow">
                    <div className="mb-1 sm:mb-2">
                      <Badge variant="outline" className="text-xs border-rawises-200 text-rawises-700 px-1 sm:px-2">
                        {product.brand}
                      </Badge>
                    </div>

                    <Link href={`/product/${product.id}/${productSlug}`}>
                      <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 text-rawises-800 flex-grow leading-tight hover:text-rawises-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-rawises-600 mb-2 sm:mb-3 line-clamp-1 hidden sm:block">
                      {stripHtmlTags(product.description).substring(0, 40)}...
                    </p>

                    <div className="flex flex-col gap-1 mb-2 sm:mb-3">
                      {/* KDV Hariç Fiyat */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">KDV Hariç:</span>
                        <div className="text-right">
                          <span className="text-xs line-through text-gray-400">{product.salePrice} TL</span>
                          <div className="text-sm font-medium text-rawises-600">{product.discountPrice} TL</div>
                        </div>
                      </div>

                      {/* KDV Dahil Fiyat */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calculator className="w-3 h-3" />
                          KDV Dahil:
                        </span>
                        <div className="text-right">
                          <span className="text-xs line-through text-gray-400">{salePriceWithVAT.toFixed(2)} TL</span>
                          <div className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                            {priceWithVAT.toFixed(2)} TL
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button
                        className={`w-full transition-all duration-300 text-xs sm:text-sm py-1 sm:py-2 ${
                          isAdded
                            ? "bg-accent-600 hover:bg-accent-700"
                            : "bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                        }`}
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Sepete Eklendi</span>
                            <span className="sm:hidden">Eklendi</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Sepete Ekle</span>
                            <span className="sm:hidden">Ekle</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* List View - Sadece desktop */}
        {viewMode === "list" && window.innerWidth >= 1024 && (
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const isAdded = addedItems.has(product.id)
              const productSlug = createProductSlug(product)
              const priceWithVAT = calculatePriceWithVAT(product.discountPrice)
              const salePriceWithVAT = calculatePriceWithVAT(product.salePrice)

              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 border-rawises-100 hover:border-rawises-300"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link href={`/product/${product.id}/${productSlug}`} className="flex-shrink-0">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                          <Image
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=128&width=128"
                            }}
                          />
                          <div className="absolute top-1 left-1">
                            <Badge variant="destructive" className="bg-accent-500 text-xs px-1">
                              %{calculateDiscountPercentage(product.salePrice, product.discountPrice)}
                            </Badge>
                          </div>
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs border-rawises-200 text-rawises-700 mb-2">
                              {product.brand}
                            </Badge>
                            <Link href={`/product/${product.id}/${productSlug}`}>
                              <h3 className="font-semibold text-sm sm:text-base text-rawises-800 mb-2 line-clamp-2 hover:text-rawises-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-rawises-600 mb-3 line-clamp-2">
                              {stripHtmlTags(product.description).substring(0, 120)}...
                            </p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-rawises-600 hover:text-brand-500 ml-2">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">KDV Hariç:</div>
                              <span className="text-sm line-through text-gray-400 block">{product.salePrice} TL</span>
                              <div className="text-base font-medium text-rawises-600">{product.discountPrice} TL</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                <Calculator className="w-3 h-3" />
                                KDV Dahil:
                              </div>
                              <span className="text-sm line-through text-gray-400 block">
                                {salePriceWithVAT.toFixed(2)} TL
                              </span>
                              <div className="text-lg font-bold bg-gradient-to-r from-rawises-600 to-brand-500 bg-clip-text text-transparent">
                                {priceWithVAT.toFixed(2)} TL
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <Star className="w-4 h-4 text-gray-300" />
                              <span className="text-xs text-gray-500 ml-1">(4.2)</span>
                            </div>
                          </div>

                          <Button
                            className={`transition-all duration-300 ${
                              isAdded
                                ? "bg-accent-600 hover:bg-accent-700"
                                : "bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                            }`}
                            onClick={() => handleAddToCart(product)}
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Ürün Bulunamadı</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? `"${searchQuery}" araması için sonuç bulunamadı.`
                : `${activeFilter?.subcategory || activeFilter?.category} kategorisinde ürün bulunamadı.`}
            </p>
            <Button onClick={clearFilter} className="bg-rawises-600 hover:bg-rawises-700">
              Tüm Ürünleri Gör
            </Button>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="border-rawises-300 text-rawises-700 hover:bg-rawises-50 bg-transparent"
            >
              Daha Fazla Ürün Gör
            </Button>
          </div>
        )}

        {/* KDV Bilgi Notu */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            * Tüm fiyatlara %20 KDV dahildir. Sepette KDV detayını görebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}
