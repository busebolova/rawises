"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { ProductDisplayGrid } from "@/components/product-display-grid"
import { ProductSortFilter } from "@/components/product-sort-filter" // Yeni bileşeni import et
import type { Product } from "@/lib/csv-parser"

export default function CategoryPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")
  const sortBy = searchParams.get("sortBy") // sortBy parametresini al

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true)
      setError(null)

      console.log(`Category page: category=${category}, subcategory=${subcategory}, sortBy=${sortBy}`)

      try {
        const params = new URLSearchParams()
        if (category) params.append("category", category)
        if (subcategory) params.append("subcategory", subcategory)
        if (sortBy) params.append("sortBy", sortBy)

        const apiUrl = `/api/products/category?${params.toString()}`
        console.log(`Fetching: ${apiUrl}`)

        const response = await fetch(apiUrl)
        const data = await response.json()

        console.log(`Category results:`, data)

        if (!response.ok) {
          throw new Error(data.error || "Ürünler yüklenirken bir hata oluştu.")
        }

        setProducts(data.products)
      } catch (err) {
        console.error("Kategori ürünleri yüklenirken hata:", err)
        setError("Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [category, subcategory, sortBy]) // sortBy değiştiğinde tekrar yükle

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Kategori: <span className="text-rawises-600">{category || "Tüm Kategoriler"}</span>
        </h1>
        {subcategory && (
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6">
            Alt Kategori: <span className="text-brand-600">{subcategory}</span>
          </h2>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <ProductSortFilter totalProducts={products.length} /> {/* Sıralama bileşenini ekle */}
        <ProductDisplayGrid products={products} loading={loading} />
      </div>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
