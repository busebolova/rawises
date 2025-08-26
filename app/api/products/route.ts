import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  console.log("[v0] Products API: Route handler called")
  console.log("[v0] Request URL:", request.url)
  console.log("[v0] Request method:", request.method)

  try {
    console.log("[v0] Products API: Creating Supabase client...")
    const supabase = await createClient()

    console.log("[v0] Products API: Fetching products from Supabase...")
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.log("[v0] Products API: Supabase error:", error)
      throw new Error(`Supabase error: ${error.message}`)
    }

    console.log(`[v0] Products API: Found ${products?.length || 0} products in Supabase`)

    // Supabase'den ürün varsa onları kullan, yoksa fallback'e geç
    if (products && products.length > 0) {
      // Supabase ürünlerini frontend'in beklediği formata çevir
      const formattedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price || 0,
        discountPrice: 0, // Şimdilik indirim yok
        salePrice: product.price || 0,
        category: product.category || "Genel",
        imageUrl: product.image_url || "",
        sku: product.sku || "",
        stockMainWarehouse: Math.floor((product.stock_quantity || 0) * 0.6), // Ana depo %60
        stockAdana: Math.floor((product.stock_quantity || 0) * 0.4), // Adana %40
        stock_quantity: product.stock_quantity || 0,
        is_active: product.is_active || true,
        created_at: product.created_at || new Date().toISOString(),
      }))

      console.log("[v0] Products API: Returning", formattedProducts.length, "products from Supabase")
      console.log("[v0] Products API: Sample product:", formattedProducts[0]?.name)

      const response = NextResponse.json({
        products: formattedProducts,
        total: formattedProducts.length,
        source: "supabase",
        timestamp: new Date().toISOString(),
      })

      response.headers.set("Content-Type", "application/json")
      return response
    }

    // Supabase'de ürün yoksa fallback products kullan
    console.log("[v0] Products API: No products in Supabase, using fallback products")

    const fallbackProducts = [
      {
        id: "1",
        name: "Flormar Oje - Kırmızı",
        description: "Uzun süre kalıcı kırmızı oje",
        price: 25.9,
        discountPrice: 0,
        salePrice: 25.9,
        category: "Makyaj > Oje",
        imageUrl:
          "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/flormar-oje-kirmizi.jpg",
        sku: "FL001",
        stockMainWarehouse: 30,
        stockAdana: 20,
        stock_quantity: 50,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "2",
        name: "Gabrini Ruj - Mat Finish",
        description: "Mat bitişli uzun süre kalıcı ruj",
        price: 45.9,
        discountPrice: 0,
        salePrice: 45.9,
        category: "Makyaj > Ruj",
        imageUrl:
          "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/gabrini-ruj-mat.jpg",
        sku: "GB001",
        stockMainWarehouse: 20,
        stockAdana: 10,
        stock_quantity: 30,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
      },
      {
        id: "3",
        name: "L'Oreal Paris Maskara",
        description: "Hacim veren siyah maskara",
        price: 89.9,
        discountPrice: 0,
        salePrice: 89.9,
        category: "Makyaj > Maskara",
        imageUrl:
          "https://cdn.myikas.com/cdn-cgi/image/width=540,height=540,quality=85/product_images/loreal-maskara.jpg",
        sku: "LO001",
        stockMainWarehouse: 25,
        stockAdana: 15,
        stock_quantity: 40,
        is_active: true,
        created_at: "2024-01-01T00:00:00Z",
      },
    ]

    console.log("[v0] Products API: Returning", fallbackProducts.length, "fallback products")

    const response = NextResponse.json({
      products: fallbackProducts,
      total: fallbackProducts.length,
      source: "fallback",
      timestamp: new Date().toISOString(),
    })

    response.headers.set("Content-Type", "application/json")

    console.log("[v0] Products API: Response created successfully")
    return response
  } catch (error) {
    console.error("[v0] Products API: Critical error:", error)

    const errorResponse = NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        products: [],
        total: 0,
        source: "error",
      },
      { status: 500 },
    )

    errorResponse.headers.set("Content-Type", "application/json")
    return errorResponse
  }
}
