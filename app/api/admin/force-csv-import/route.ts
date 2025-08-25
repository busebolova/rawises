import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    console.log("[v0] Starting forced CSV import...")

    const supabase = await createClient()

    const { error: deleteError } = await supabase.from("products").delete().neq("id", "impossible-id") // This deletes all rows

    if (deleteError) {
      console.error("[v0] Error deleting existing products:", deleteError)
      return Response.json({ error: "Failed to clear existing products" }, { status: 500 })
    }

    console.log("[v0] Cleared all existing products")

    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-368Q0uZCs4pd5nkqxVHesBkFeOVzm4.csv"
    const response = await fetch(csvUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("[v0] Fetched CSV data, length:", csvText.length)

    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    console.log("[v0] CSV headers:", headers.slice(0, 10)) // Log first 10 headers

    const products = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

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

      const nameIndex = headers.findIndex((h) => h.includes("İsim") || h.includes("Isim"))
      const descIndex = headers.findIndex((h) => h.includes("Açıklama") || h.includes("Aciklama"))
      const salePriceIndex = headers.findIndex((h) => h.includes("Satış Fiyatı") || h.includes("Satis Fiyati"))
      const discountPriceIndex = headers.findIndex(
        (h) => h.includes("İndirimli Fiyatı") || h.includes("Indirimli Fiyati"),
      )
      const brandIndex = headers.findIndex((h) => h.includes("Marka"))
      const categoryIndex = headers.findIndex((h) => h.includes("Kategoriler"))
      const imageIndex = headers.findIndex((h) => h.includes("Resim URL"))
      const skuIndex = headers.findIndex((h) => h.includes("SKU"))
      const barcodeIndex = headers.findIndex((h) => h.includes("Barkod"))
      const stockAdanaIndex = headers.findIndex((h) => h.includes("Stok:Adana"))
      const stockMainIndex = headers.findIndex((h) => h.includes("Stok:Ana Depo"))

      const name = values[nameIndex]?.replace(/"/g, "") || ""
      if (!name) continue

      const salePrice = Number.parseFloat(values[salePriceIndex]?.replace(/"/g, "") || "0")
      const discountPrice = Number.parseFloat(values[discountPriceIndex]?.replace(/"/g, "") || "0")
      const stockAdana = Number.parseInt(values[stockAdanaIndex]?.replace(/"/g, "") || "0")
      const stockMain = Number.parseInt(values[stockMainIndex]?.replace(/"/g, "") || "0")
      const totalStock = stockAdana + stockMain

      const product = {
        name: name,
        description: values[descIndex]?.replace(/"/g, "").replace(/<[^>]*>/g, "") || "", // Remove HTML tags
        price: discountPrice > 0 ? discountPrice : salePrice,
        category: values[categoryIndex]?.replace(/"/g, "").split(">").pop()?.trim() || "Kozmetik",
        image_url: values[imageIndex]?.replace(/"/g, "") || "/placeholder.svg?height=300&width=300",
        sku: values[skuIndex]?.replace(/"/g, "") || "",
        stock_quantity: totalStock,
        is_active: true,
      }

      products.push(product)

      if (products.length >= 100) break // Limit to first 100 products for now
    }

    console.log("[v0] Parsed products count:", products.length)
    console.log("[v0] First product sample:", products[0])

    const batchSize = 50
    let insertedCount = 0

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize)

      const { error: insertError } = await supabase.from("products").insert(batch)

      if (insertError) {
        console.error("[v0] Error inserting batch:", insertError)
        continue
      }

      insertedCount += batch.length
      console.log("[v0] Inserted batch, total so far:", insertedCount)
    }

    console.log("[v0] CSV import completed successfully. Total products:", insertedCount)

    return Response.json({
      success: true,
      message: `Successfully imported ${insertedCount} products from CSV`,
      productsImported: insertedCount,
    })
  } catch (error) {
    console.error("[v0] CSV import error:", error)
    return Response.json(
      {
        error: "Failed to import CSV products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
