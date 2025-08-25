import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Admin products API: Starting Supabase request")
    const supabase = await createClient()

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Admin products API error:", error)
      throw error
    }

    console.log("[v0] Admin products API: Successfully loaded", products?.length || 0, "products from Supabase")

    // Transform Supabase data to match expected Product interface
    const transformedProducts = (products || []).map((product: any) => ({
      id: product.id,
      variantId: product.id,
      name: product.name || "",
      description: product.description || "",
      salePrice: product.price || 0,
      discountPrice: product.price ? product.price * 0.8 : 0, // 20% discount
      purchasePrice: product.price ? product.price * 0.6 : 0, // 40% margin
      barcode: product.sku || "",
      sku: product.sku || "",
      brand: "Rawises",
      categories: product.category || "Genel",
      tags: product.category || "",
      imageUrl: product.image_url || "/placeholder.svg?height=300&width=300",
      metaTitle: product.name || "",
      metaDescription: product.description || "",
      slug: product.name
        ? product.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : "",
      isActive: product.is_active !== false,
      stockMainWarehouse: product.stock_quantity || 0,
      stockAdana: 0,
      createdDate: product.created_at
        ? new Date(product.created_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    }))

    console.log("[v0] Admin products API: Transformed products count:", transformedProducts.length)
    if (transformedProducts.length > 0) {
      console.log(
        "[v0] Admin products API: First product sample:",
        JSON.stringify(transformedProducts[0]).substring(0, 200) + "...",
      )
    }

    return NextResponse.json({
      products: transformedProducts,
      total: transformedProducts.length,
    })
  } catch (error) {
    console.error("[v0] Admin products API error:", error)
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const productData = await request.json()
    const supabase = await createClient()

    // Transform admin product data to Supabase schema
    const supabaseProduct = {
      name: productData.name,
      description: productData.description,
      price: productData.salePrice || productData.discountPrice || 0,
      category: productData.categories || "Genel",
      sku: productData.sku || `SKU-${Date.now()}`,
      image_url: productData.imageUrl || "/placeholder.svg?height=300&width=300",
      stock_quantity: productData.stockMainWarehouse || 0,
      is_active: productData.isActive !== false,
    }

    const { data: newProduct, error } = await supabase.from("products").insert([supabaseProduct]).select().single()

    if (error) {
      console.error("[v0] Error creating product:", error)
      throw error
    }

    // Transform back to admin format
    const transformedProduct = {
      id: newProduct.id,
      variantId: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      salePrice: newProduct.price,
      discountPrice: newProduct.price * 0.8,
      purchasePrice: newProduct.price * 0.6,
      barcode: newProduct.sku,
      sku: newProduct.sku,
      brand: "Rawises",
      categories: newProduct.category,
      tags: newProduct.category,
      imageUrl: newProduct.image_url,
      metaTitle: newProduct.name,
      metaDescription: newProduct.description,
      slug: newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      isActive: newProduct.is_active,
      stockMainWarehouse: newProduct.stock_quantity,
      stockAdana: 0,
      createdDate: new Date(newProduct.created_at).toISOString().split("T")[0],
    }

    return NextResponse.json({ success: true, product: transformedProduct })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
