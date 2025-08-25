import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get the specific product
    const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", id).single()

    if (productError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get related products (same category, different product)
    const { data: relatedProducts } = await supabase
      .from("products")
      .select("*")
      .neq("id", product.id)
      .eq("category", product.category)
      .limit(4)

    return NextResponse.json({
      product,
      relatedProducts: relatedProducts || [],
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
