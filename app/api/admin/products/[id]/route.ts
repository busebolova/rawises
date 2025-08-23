import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`[v0] Admin products API: Getting product ${params.id}...`)
    const supabase = await createClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    console.log(`[v0] Successfully loaded product: ${product.name}`)
    return NextResponse.json({ product })
  } catch (error) {
    console.error("[v0] Error loading product:", error)
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`[v0] Admin products API: Updating product ${params.id}...`)
    const updateData = await request.json()
    const supabase = await createClient()

    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update({
        name: updateData.name,
        description: updateData.description,
        price: Number.parseFloat(updateData.salePrice || updateData.price) || 0,
        category: updateData.categories || updateData.category,
        sku: updateData.sku,
        stock_quantity: Number.parseInt(updateData.stockMainWarehouse || updateData.stock_quantity) || 0,
        image_url: updateData.imageUrl || updateData.image_url,
        is_active: updateData.isActive !== false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error updating product:", error)
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    console.log(`[v0] Successfully updated product: ${updatedProduct.name}`)
    return NextResponse.json({ success: true, product: updatedProduct })
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`[v0] Admin products API: Deleting product ${params.id}...`)
    const supabase = await createClient()

    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) {
      console.error("[v0] Database error deleting product:", error)
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    console.log(`[v0] Successfully deleted product: ${params.id}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
