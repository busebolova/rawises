import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { parseCSV } from "@/lib/csv-parser"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting CSV upload process")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read CSV content
    const csvContent = await file.text()
    console.log("[v0] CSV file read, size:", csvContent.length)

    // Parse CSV
    const products = parseCSV(csvContent)
    console.log("[v0] Parsed products from CSV:", products.length)

    if (products.length === 0) {
      return NextResponse.json({ error: "No valid products found in CSV" }, { status: 400 })
    }

    // Connect to Supabase
    const supabase = await createClient()

    // Transform products for Supabase
    const supabaseProducts = products.map((product) => ({
      name: product.name,
      description: product.description || "",
      price: Number.parseFloat(product.salePrice?.toString() || "0"), // Map salePrice to price
      category: product.categories || "",
      image_url: product.imageUrl || "/placeholder.svg?height=300&width=300",
      sku: product.sku || "",
      stock_quantity: Number.parseInt(product.stockMainWarehouse?.toString() || "0"),
      is_active: product.isActive !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))

    console.log("[v0] Transformed products for Supabase:", supabaseProducts.length)

    // Insert products into Supabase
    const { data, error } = await supabase
      .from("products")
      .upsert(supabaseProducts, {
        onConflict: "sku",
        ignoreDuplicates: false,
      })
      .select()

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: "Database error: " + error.message }, { status: 500 })
    }

    console.log("[v0] Successfully imported products to Supabase:", data?.length || 0)

    return NextResponse.json({
      success: true,
      imported: data?.length || supabaseProducts.length,
      message: `${data?.length || supabaseProducts.length} ürün başarıyla içe aktarıldı`,
    })
  } catch (error) {
    console.error("[v0] CSV upload error:", error)
    return NextResponse.json(
      {
        error: "Upload failed: " + (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 },
    )
  }
}
