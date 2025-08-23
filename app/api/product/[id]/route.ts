import { type NextRequest, NextResponse } from "next/server"
import { parseCSV } from "@/lib/csv-parser"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Read CSV file
    const csvPath = path.join(process.cwd(), "data", "products.csv")
    const csvContent = fs.readFileSync(csvPath, "utf-8")
    const products = parseCSV(csvContent)

    // Find the product by ID
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get related products (same category, different product)
    const relatedProducts = products
      .filter(
        (p) =>
          p.id !== product.id && p.categories.toLowerCase().includes(product.categories.toLowerCase().split(",")[0]),
      )
      .slice(0, 4)

    return NextResponse.json({
      product,
      relatedProducts,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
