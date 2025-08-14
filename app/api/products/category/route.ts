export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { parseCSVProducts, type Product } from "@/lib/csv-parser"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryParam = searchParams.get("category")
    const subcategoryParam = searchParams.get("subcategory")
    const sortBy = searchParams.get("sortBy")

    console.log(`API Request received: category=${categoryParam}, subcategory=${subcategoryParam}, sortBy=${sortBy}`)

    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const allProducts: Product[] = parseCSVProducts(csvText)

    console.log(`Total products parsed: ${allProducts.length}`)

    let filteredProducts: Product[] = allProducts

    if (categoryParam) {
      filteredProducts = allProducts.filter((product) => {
        const productCategories = product.categories.toLowerCase()
        const categoryLower = categoryParam.toLowerCase()
        return productCategories.includes(categoryLower)
      })

      console.log(`Products after category filter (${categoryParam}): ${filteredProducts.length}`)
    }

    if (subcategoryParam && filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const productCategories = product.categories.toLowerCase()
        const subcategoryLower = subcategoryParam.toLowerCase()
        return productCategories.includes(subcategoryLower)
      })

      console.log(`Products after subcategory filter (${subcategoryParam}): ${filteredProducts.length}`)
    }

    if (sortBy) {
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.discountPrice - b.discountPrice
          case "price-desc":
            return b.discountPrice - a.discountPrice
          case "discount-asc":
            return a.discountPercentage - b.discountPercentage
          case "discount-desc":
            return b.discountPercentage - a.discountPercentage
          case "date-asc":
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
          case "date-desc":
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
          default:
            return 0
        }
      })
    }

    console.log(`Final filtered products count: ${filteredProducts.length}`)

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      category: categoryParam || "Tüm Ürünler",
      subcategory: subcategoryParam || null,
    })
  } catch (error) {
    console.error("CSV parse error:", error)
    return NextResponse.json({ error: "Failed to parse CSV", products: [], total: 0 }, { status: 500 })
  }
}
