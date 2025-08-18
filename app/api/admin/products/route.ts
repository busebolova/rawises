import { NextResponse } from "next/server"
import { parseCSV } from "@/lib/csv-parser"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), "data", "products.csv")
    const csvContent = fs.readFileSync(csvPath, "utf-8")
    const products = parseCSV(csvContent)

    return NextResponse.json({ products, total: products.length })
  } catch (error) {
    console.error("Error loading products:", error)
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 })
  }
}
