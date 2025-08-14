"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { ProductDisplayGrid } from "@/components/product-display-grid"
import { ProductSortFilter } from "@/components/product-sort-filter" // Yeni bileşeni import et
import type { Product } from "@/lib/csv-parser"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const sortBy = searchParams.get("sortBy") // sortBy parametresini al

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)

      console.log(`Search page: query=${query}, sortBy=${sortBy}`)

      if (!query) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        const params = new URLSearchParams()
        params.append("q", encodeURIComponent(query))
        if (sortBy) params.append("sortBy", sortBy)

        const apiUrl = `/api/products?${params.toString()}`
        console.log(`Fetching: ${apiUrl}`)

        const response = await fetch(apiUrl)
        const data = await response.json()

        console.log(`Search results:`, data)

        if (!response.ok) {
          throw new Error(data.error || "Arama sonuçları yüklenirken bir hata oluştu.")
        }

        setProducts(data.products)
      } catch (err) {
        console.error("Arama sonuçları yüklenirken hata:", err)
        setError("Arama sonuçları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, sortBy]) // sortBy değiştiğinde tekrar yükle

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Arama Sonuçları: <span className="text-rawises-600">{query || "Boş Sorgu"}</span>
        </h1>
        {query && products.length === 0 && !loading && !error && (
          <p className="text-gray-600 mb-8">
            "{query}" için herhangi bir ürün bulunamadı. Başka bir arama terimi deneyin.
          </p>
        )}
        {!query && <p className="text-gray-600 mb-8">Lütfen bir arama terimi girin.</p>}
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        )}
        {query && <ProductSortFilter totalProducts={products.length} />} {/* Sıralama bileşenini ekle */}
        {query && <ProductDisplayGrid products={products} loading={loading} />}
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
