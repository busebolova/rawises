"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Filter, X, Calculator } from "lucide-react"
import Image from "next/image"
import { stripHtmlTags, calculateDiscountPercentage, type Product } from "@/lib/csv-parser"
import { useCartStore } from "@/lib/cart-store"
import { useRealtime } from "@/hooks/use-realtime"

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<{ category?: string; subcategory?: string } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const { addItem } = useCartStore()

  const { inventory, isConnected } = useRealtime()

  useEffect(() => {
    if (Object.keys(inventory).length > 0) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const updatedStock = inventory[product.id]
          if (updatedStock !== undefined) {
            return {
              ...product,
              stockMainWarehouse: Math.floor(updatedStock * 0.7),
              stockAdana: Math.floor(updatedStock * 0.3),
            }
          }
          return product
        }),
      )
    }
  }, [inventory])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= Math.ceil((filteredProducts?.length || 0) / productsPerPage)) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        let response
        try {
          response = await fetch("/api/products", {
            signal: controller.signal,
          })
        } catch (fetchError) {
          console.error("[v0] Fetch failed, using fallback data:", fetchError)
          setProducts([])
          setFilteredProducts([])
          setLoading(false)
          return
        }

        clearTimeout(timeoutId)

        if (!response.ok) {
          console.error("[v0] API response not ok:", response.status)
          setProducts([])
          setFilteredProducts([])
          setLoading(false)
          return
        }

        const data = await response.json()

        if (data.products && Array.isArray(data.products)) {
          const validProducts = data.products.filter(
            (product: Product) => product.discountPrice > 0 && product.salePrice > 0,
          )
          console.log("[v0] Loaded products successfully:", validProducts.length)
          setProducts(validProducts)
          setFilteredProducts(validProducts)
        } else {
          console.log("[v0] No products in response, using empty array")
          setProducts([])
          setFilteredProducts([])
        }
      } catch (error) {
        console.error("[v0] Error in loadProducts:", error)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleCategoryFilter = (event: CustomEvent) => {
    const { category, subcategory, csvCategory } = event.detail
    setActiveFilter({ category, subcategory })
    setSearchQuery("")
    setCurrentPage(1)

    const filtered = products.filter((product) => {
      const searchTerm = csvCategory || subcategory || category

      const categoryMatch = product.categories.toLowerCase().includes(searchTerm.toLowerCase())
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const brandMatch = product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const tagMatch = product.tags.toLowerCase().includes(searchTerm.toLowerCase())
      const descriptionMatch = stripHtmlTags(product.description).toLowerCase().includes(searchTerm.toLowerCase())

      let specialMatch = false

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

      if (searchTerm.toLowerCase().includes("cilt") || searchTerm.toLowerCase().includes("bakım")) {
        specialMatch =
          product.categories.toLowerCase().includes("cilt") ||
          product.categories.toLowerCase().includes("bakım") ||
          product.name.toLowerCase().includes("krem") ||
          product.name.toLowerCase().includes("serum")
      }

      if (searchTerm.toLowerCase().includes("saç") || searchTerm.toLowerCase().includes("şampuan")) {
        specialMatch =
          product.categories.toLowerCase().includes("saç") ||
          product.name.toLowerCase().includes("şampuan") ||
          product.name.toLowerCase().includes("saç")
      }

      return categoryMatch || nameMatch || brandMatch || tagMatch || descriptionMatch || specialMatch
    })

    console.log(`Filtering for: ${category}, Found: ${filtered.length} products`)
    setFilteredProducts(filtered)
  }

  const handleSearch = (event: CustomEvent) => {
    const { query } = event.detail
    setSearchQuery(query)
    setActiveFilter(null)
    setCurrentPage(1)

    if (!query.trim()) {
      setFilteredProducts(products)
      return
    }

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

      return searchTerms.some((term) => searchableText.includes(term))
    })

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

    const sortedResults = scoredResults.sort((a, b) => b.score - a.score).map((item) => item.product)

    setFilteredProducts(sortedResults)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setActiveFilter(null)
    setCurrentPage(1)
    setFilteredProducts(products)
  }

  useEffect(() => {
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
    const totalStock = product.stockMainWarehouse + product.stockAdana
    if (totalStock <= 0) {
      return
    }

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

  const handleProductClick = (product: Product) => {
    const productDetailEvent = new CustomEvent("openProductDetail", {
      detail: { product },
    })
    window.dispatchEvent(productDetailEvent)
  }

  const clearFilter = () => {
    setActiveFilter(null)
    setSearchQuery("")
    setCurrentPage(1)
    setFilteredProducts(products)
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

  const calculatePriceWithVAT = (price: number) => {
    const safePrice = Number(price) || 0
    return safePrice * 1.2
  }

  const getStockStatus = (product: Product) => {
    const totalStock = product.stockMainWarehouse + product.stockAdana
    if (totalStock === 0) return { label: "Stokta Yok", variant: "destructive" as const }
    if (totalStock < 10) return { label: "Son Ürünler", variant: "secondary" as const }
    return { label: "Stokta", variant: "default" as const }
  }

  const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage

  let currentProducts = (filteredProducts || []).slice(startIndex, endIndex)

  if (currentPage === 1 || currentPage === 5 || currentPage === totalPages) {
    currentProducts = currentProducts.filter(
      (product) => product.imageUrl && product.imageUrl.trim() !== "" && !product.imageUrl.includes("placeholder"),
    )

    if (currentProducts.length < productsPerPage) {
      const allProductsWithImages = (filteredProducts || []).filter(
        (product) => product.imageUrl && product.imageUrl.trim() !== "" && !product.imageUrl.includes("placeholder"),
      )

      const currentProductIds = new Set(currentProducts.map((p) => p.id))
      const additionalProducts = allProductsWithImages
        .filter((product) => !currentProductIds.has(product.id))
        .slice(0, productsPerPage - currentProducts.length)

      currentProducts = [...currentProducts, ...additionalProducts]
    }
  }

  if (loading) {
    return (
      <section className="py-6 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[...Array(12)].map((_, i) => (
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
              <h2 className="text-xl lg:text-2xl font-bold text-green-800">
                {activeFilter
                  ? `${activeFilter.subcategory || activeFilter.category} Ürünleri`
                  : searchQuery
                    ? `"${searchQuery}" Arama Sonuçları`
                    : "Öne Çıkan Ürünler"}
              </h2>
              <p className="text-sm lg:text-base text-green-600">
                {activeFilter || searchQuery
                  ? `${filteredProducts?.length || 0} ürün bulundu`
                  : "En popüler makyaj ürünleri"}
                {isConnected && <span className="ml-2 text-xs text-green-600">• Canlı stok takibi aktif</span>}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(activeFilter || searchQuery) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilter}
                  className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Temizle</span>
                </Button>
              )}
            </div>
          </div>

          {(activeFilter || searchQuery) && (
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-green-600" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {searchQuery
                  ? `Arama: ${searchQuery}`
                  : `${activeFilter?.category}${activeFilter?.subcategory ? ` > ${activeFilter.subcategory}` : ""}`}
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {currentProducts &&
            currentProducts.length > 0 &&
            currentProducts.map((product) => {
              const isAdded = addedItems.has(product.id)
              const productSlug = createProductSlug(product)
              const priceWithVAT = calculatePriceWithVAT(product.discountPrice || 0)
              const salePriceWithVAT = calculatePriceWithVAT(product.salePrice || 0)
              const stockStatus = getStockStatus(product)
              const totalStock = product.stockMainWarehouse + product.stockAdana
              const isOutOfStock = totalStock === 0

              return (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-300 flex flex-col h-full ${
                    isOutOfStock ? "opacity-75" : ""
                  }`}
                >
                  <div className="block cursor-pointer" onClick={() => handleProductClick(product)}>
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          isOutOfStock ? "grayscale" : ""
                        }`}
                        crossOrigin="anonymous"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=300"
                        }}
                      />
                      <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                        <Badge variant="destructive" className="bg-green-500 hover:bg-green-600 text-xs px-1 sm:px-2">
                          %{calculateDiscountPercentage(product.salePrice, product.discountPrice)}
                        </Badge>
                      </div>
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                        <Badge variant={stockStatus.variant} className="text-xs px-1 sm:px-2">
                          {stockStatus.label}
                        </Badge>
                      </div>
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">Stokta Yok</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-2 sm:p-3 lg:p-4 flex flex-col flex-grow">
                    <div className="mb-1 sm:mb-2">
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700 px-1 sm:px-2">
                        {product.brand}
                      </Badge>
                    </div>

                    <div className="cursor-pointer" onClick={() => handleProductClick(product)}>
                      <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 text-green-800 flex-grow leading-tight hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-green-600 mb-2 sm:mb-3 line-clamp-1 hidden sm:block">
                      {stripHtmlTags(product.description).substring(0, 40)}...
                    </p>

                    {!isOutOfStock && totalStock < 20 && (
                      <p className="text-xs text-orange-600 mb-2">Sadece {totalStock} adet kaldı!</p>
                    )}

                    <div className="flex flex-col gap-1 mb-2 sm:mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">KDV Hariç:</span>
                        <div className="text-right">
                          <span className="text-xs line-through text-gray-400">{product.salePrice || 0} TL</span>
                          <div className="text-sm font-medium text-green-600">{product.discountPrice || 0} TL</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calculator className="w-3 h-3" />
                          KDV Dahil:
                        </span>
                        <div className="text-right">
                          <span className="text-xs line-through text-gray-400">
                            {(salePriceWithVAT || 0).toFixed(2)} TL
                          </span>
                          <div className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                            {(priceWithVAT || 0).toFixed(2)} TL
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button
                        className={`w-full transition-all duration-300 text-xs sm:text-sm py-1 sm:py-2 ${
                          isOutOfStock
                            ? "bg-gray-400 cursor-not-allowed"
                            : isAdded
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        }`}
                        size="sm"
                        disabled={isOutOfStock}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        {isOutOfStock ? (
                          "Stokta Yok"
                        ) : isAdded ? (
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Önceki
            </Button>

            {Array.from({ length: totalPages || 0 }).map((_, index) => {
              const page = index + 1
              const isCurrentPage = page === currentPage

              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <Button
                    key={page}
                    variant={isCurrentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={
                      isCurrentPage
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-green-300 text-green-700 hover:bg-green-50"
                    }
                  >
                    {page}
                  </Button>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="text-gray-400">
                    ...
                  </span>
                )
              }
              return null
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              Sonraki
            </Button>
          </div>
        )}

        {filteredProducts?.length === 0 && !loading && (
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
            <Button onClick={clearFilter} className="bg-green-600 hover:bg-green-700">
              Tüm Ürünleri Gör
            </Button>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            * Tüm fiyatlara %20 KDV dahildir. Sepette KDV detayını görebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}
