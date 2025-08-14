export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { parseCSVProducts, type Product } from "@/lib/csv-parser"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const sortBy = searchParams.get("sortBy")
    const limit = searchParams.get("limit")

    console.log(`Products API Request: query=${query}, sortBy=${sortBy}, limit=${limit}`)

    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const allProducts: Product[] = parseCSVProducts(csvText)

    console.log(`Total products loaded: ${allProducts.length}`)

    let filteredProducts = allProducts

    // Search filter
    if (query) {
      const lowerCaseQuery = query.toLowerCase()
      filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.brand.toLowerCase().includes(lowerCaseQuery) ||
          product.categories.toLowerCase().includes(lowerCaseQuery) ||
          product.tags.toLowerCase().includes(lowerCaseQuery),
      )

      console.log(`Products after search filter (${query}): ${filteredProducts.length}`)
    }

    // Sorting
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
          case "name-asc":
            return a.name.localeCompare(b.name, "tr")
          case "name-desc":
            return b.name.localeCompare(a.name, "tr")
          default:
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        }
      })
    } else {
      // Default sorting: En son eklenenler önce
      filteredProducts.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
    }

    // Limit results
    if (limit) {
      const limitNum = Number.parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredProducts = filteredProducts.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length,
      sortBy: sortBy || "date-desc",
    })
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        products: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}
