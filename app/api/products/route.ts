import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface Product {
  id: string
  variantId: string
  name: string
  description: string
  salePrice: number
  discountPrice: number
  purchasePrice: number
  barcode: string
  sku: string
  brand: string
  categories: string
  tags: string
  imageUrl: string
  metaTitle: string
  metaDescription: string
  slug: string
  stockAdana: number
  stockMainWarehouse: number
  isActive: boolean
  createdDate: string
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    variantId: "1",
    name: "Makyaj Fırçası Seti",
    description: "Profesyonel makyaj fırçası seti",
    salePrice: 150,
    discountPrice: 120,
    purchasePrice: 80,
    barcode: "123456789",
    sku: "MF001",
    brand: "Rawises",
    categories: "Makyaj, Fırça",
    tags: "makyaj, fırça, set",
    imageUrl: "/placeholder.svg?height=300&width=300",
    metaTitle: "Makyaj Fırçası Seti",
    metaDescription: "Profesyonel makyaj fırçası seti",
    slug: "makyaj-fircasi-seti",
    stockAdana: 10,
    stockMainWarehouse: 25,
    isActive: true,
    createdDate: "2024-01-01",
  },
  {
    id: "2",
    variantId: "2",
    name: "Ruj - Kırmızı",
    description: "Mat finish kırmızı ruj",
    salePrice: 80,
    discountPrice: 65,
    purchasePrice: 40,
    barcode: "123456790",
    sku: "RJ001",
    brand: "Rawises",
    categories: "Makyaj, Ruj",
    tags: "ruj, kırmızı, mat",
    imageUrl: "/placeholder.svg?height=300&width=300",
    metaTitle: "Kırmızı Ruj",
    metaDescription: "Mat finish kırmızı ruj",
    slug: "kirmizi-ruj",
    stockAdana: 15,
    stockMainWarehouse: 30,
    isActive: true,
    createdDate: "2024-01-01",
  },
]

export async function GET() {
  try {
    console.log("[v0] Starting products API request from Supabase")

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("API timeout")), 3000) // 3 second timeout
    })

    const apiPromise = async () => {
      let supabase
      try {
        supabase = await createClient()
      } catch (clientError) {
        console.error("[v0] Failed to create Supabase client:", clientError)
        console.log("[v0] Using fallback products due to client creation failure")
        return { products: fallbackProducts, total: fallbackProducts.length }
      }

      let supabaseResponse
      try {
        supabaseResponse = await supabase
          .from("products")
          .select("id, name, description, price, category, image_url, sku, stock_quantity, is_active, created_at")
          .eq("is_active", true)
          .gt("stock_quantity", 0)
          .order("created_at", { ascending: false })
          .limit(50) // Reduced limit for faster response
      } catch (queryError) {
        console.error("[v0] Supabase query failed:", queryError)
        console.log("[v0] Using fallback products due to query failure")
        return { products: fallbackProducts, total: fallbackProducts.length }
      }

      if (!supabaseResponse) {
        console.log("[v0] No response from Supabase, using fallback products")
        return { products: fallbackProducts, total: fallbackProducts.length }
      }

      const { data: products, error } = supabaseResponse

      if (error) {
        console.error("[v0] Supabase query error:", error.message || error)
        console.log("[v0] Using fallback products due to Supabase error")
        return { products: fallbackProducts, total: fallbackProducts.length }
      }

      if (!products || products.length === 0) {
        console.log("[v0] No products found in Supabase, using fallback data")
        return { products: fallbackProducts, total: fallbackProducts.length }
      }

      const validRawProducts = products.filter(
        (product) =>
          product &&
          typeof product === "object" &&
          product.name &&
          typeof product.name === "string" &&
          product.price !== null &&
          product.price !== undefined &&
          !isNaN(Number(product.price)) &&
          product.stock_quantity > 0,
      )

      console.log("[v0] Found", validRawProducts.length, "valid products with stock in Supabase")

      const transformedProducts: Product[] = validRawProducts.map((product) => {
        const categoryParts = (product.category || "").split(">").map((part) => part.trim())
        const mainCategory = categoryParts[0] || "Genel"
        const subCategory = categoryParts.slice(1).join(" > ")

        const currentPrice = Number(product.price) || 0
        const originalPrice = currentPrice * 1.25 // Assume 25% markup for original price
        const discountPrice = currentPrice // Current price is the discounted price

        return {
          id: product.id?.toString() || Math.random().toString(),
          variantId: product.id?.toString() || Math.random().toString(),
          name: product.name || "",
          description: product.description || "",
          salePrice: originalPrice,
          discountPrice: discountPrice,
          purchasePrice: discountPrice * 0.6 || 0,
          barcode: product.sku || "",
          sku: product.sku || "",
          brand: "Rawises",
          categories: product.category || mainCategory,
          tags: `${mainCategory}, ${subCategory}, ${product.name}`.toLowerCase(),
          imageUrl: product.image_url || "/placeholder.svg?height=300&width=300",
          metaTitle: product.name || "",
          metaDescription: product.description || "",
          slug: product.name?.toLowerCase().replace(/\s+/g, "-") || "",
          stockAdana: Math.floor(Number(product.stock_quantity) * 0.3) || 0,
          stockMainWarehouse: Math.ceil(Number(product.stock_quantity) * 0.7) || 0,
          isActive: product.is_active !== false,
          createdDate: product.created_at || new Date().toISOString(),
        }
      })

      const validProducts = transformedProducts.filter(
        (product) =>
          product.isActive &&
          product.name &&
          product.salePrice > 0 &&
          product.stockAdana + product.stockMainWarehouse > 0,
      )

      console.log("[v0] Successfully loaded", validProducts.length, "in-stock products from Supabase")

      if (validProducts.length > 0) {
        console.log("[v0] First product sample:", JSON.stringify(validProducts[0]).substring(0, 200) + "...")
      }

      return { products: validProducts, total: validProducts.length }
    }

    const result = await Promise.race([apiPromise(), timeoutPromise])

    console.log("[v0] API completed successfully")
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Supabase products API error:", error)
    console.log("[v0] Using fallback products due to timeout or unexpected error")
    return NextResponse.json({ products: fallbackProducts, total: fallbackProducts.length })
  }
}
