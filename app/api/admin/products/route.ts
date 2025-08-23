import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Admin products API: Starting database query...")
    const supabase = await createClient()

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to load products" }, { status: 500 })
    }

    console.log(`[v0] Successfully loaded ${products?.length || 0} products from database`)
    return NextResponse.json({ products: products || [], total: products?.length || 0 })
  } catch (error) {
    console.error("[v0] Error loading products:", error)
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Admin products API: Creating new product...")
    const productData = await request.json()
    const supabase = await createClient()

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert([
        {
          name: productData.name,
          description: productData.description,
          price: Number.parseFloat(productData.salePrice) || 0,
          category: productData.categories || productData.category,
          sku: productData.sku,
          stock_quantity: Number.parseInt(productData.stockMainWarehouse) || 0,
          image_url: productData.imageUrl,
          is_active: productData.isActive !== false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    console.log("[v0] Successfully created product:", newProduct.id)
    return NextResponse.json({ success: true, product: newProduct })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
