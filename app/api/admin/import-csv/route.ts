import { createClient } from "@/lib/supabase/server"
import { randomUUID } from "crypto"

export async function POST() {
  try {
    console.log("[v0] Starting CSV import from external URL...")

    // Fetch the CSV data from the provided URL
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-368Q0uZCs4pd5nkqxVHesBkFeOVzm4.csv"
    const response = await fetch(csvUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("[v0] CSV fetched successfully, length:", csvText.length)

    // Parse CSV data
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())
    console.log("[v0] CSV headers:", headers.slice(0, 10)) // Log first 10 headers

    const products = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Parse CSV line (handling quoted values)
      const values = []
      let current = ""
      let inQuotes = false

      for (let j = 0; j < line.length; j++) {
        const char = line[j]
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === "," && !inQuotes) {
          values.push(current.trim())
          current = ""
        } else {
          current += char
        }
      }
      values.push(current.trim()) // Add the last value

      if (values.length < headers.length) continue

      const discountPrice = Number.parseFloat(values[headers.indexOf("İndirimli Fiyatı")] || "0")
      const regularPrice = Number.parseFloat(values[headers.indexOf("Satış Fiyatı")] || "0")

      const product = {
        id: randomUUID(), // Generate new UUID for each product
        name: values[headers.indexOf("İsim")] || "",
        description: values[headers.indexOf("Açıklama")] || values[headers.indexOf("İsim")] || "",
        price: discountPrice > 0 ? discountPrice : regularPrice, // Use discount price if available
        sku: values[headers.indexOf("SKU")] || values[headers.indexOf("Barkod Listesi")] || "",
        category: values[headers.indexOf("Kategoriler")] || "Kozmetik",
        image_url: values[headers.indexOf("Resim URL")] || "/placeholder.svg?height=300&width=300",
        stock_quantity: Number.parseInt(
          values[headers.indexOf("Stok:Ana Depo")] || values[headers.indexOf("Stok:Adana Selahattin Eyyübi")] || "0",
        ),
        is_active:
          values[headers.indexOf("Silindi mi?")] !== "true" && values[headers.indexOf("Varyant Aktiflik")] === "true",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Only add products with valid names and positive stock
      if (product.name && product.name.length > 0 && product.stock_quantity > 0) {
        products.push(product)
      }
    }

    console.log("[v0] Parsed products count:", products.length)
    console.log("[v0] Sample product:", products[0])

    // Connect to Supabase
    const supabase = await createClient()

    console.log("[v0] Clearing existing products...")
    const { error: deleteError } = await supabase.from("products").delete().gte("created_at", "1900-01-01")

    if (deleteError) {
      console.error("[v0] Error clearing products:", deleteError)
      throw new Error("Failed to clear existing products")
    }

    console.log("[v0] Inserting new products...")
    const batchSize = 50 // Reduced batch size for better reliability
    let insertedCount = 0

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize)

      const mappedBatch = batch.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        sku: product.sku,
        category: product.category,
        image_url: product.image_url,
        stock_quantity: product.stock_quantity,
        is_active: product.is_active,
        created_at: product.created_at,
        updated_at: product.updated_at,
      }))

      const { error: insertError } = await supabase.from("products").insert(mappedBatch)

      if (insertError) {
        console.error("[v0] Error inserting batch:", insertError)
        throw new Error(`Failed to insert products: ${insertError.message}`)
      } else {
        insertedCount += batch.length
        console.log("[v0] Inserted batch:", insertedCount, "/", products.length)
      }
    }

    console.log("[v0] CSV import completed. Total products imported:", insertedCount)

    return Response.json({
      success: true,
      message: `Successfully imported ${insertedCount} products from CSV`,
      totalProducts: insertedCount,
    })
  } catch (error) {
    console.error("[v0] CSV import error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
