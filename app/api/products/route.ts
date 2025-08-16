import { NextResponse } from "next/server"

interface Product {
  id: string
  variantId: string
  name: string
  description: string
  salePrice: number
  discountPrice: number
  purchasePrice: number
  barcode: string
  sku: string
  brand: string
  categories: string
  tags: string
  imageUrl: string
  metaTitle: string
  metaDescription: string
  slug: string
  stockAdana: number
  stockMainWarehouse: number
  isActive: boolean
  createdDate: string
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

export async function GET() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()

    // CSV'yi parse et
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    const products: Product[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const values = parseCSVLine(line)

      if (values.length < headers.length) continue

      const product: Product = {
        id: values[headers.indexOf("Ürün Grup ID")] || "",
        variantId: values[headers.indexOf("Varyant ID")] || "",
        name: values[headers.indexOf("İsim")] || "",
        description: values[headers.indexOf("Açıklama")] || "",
        salePrice: Number.parseFloat(values[headers.indexOf("Satış Fiyatı")] || "0"),
        discountPrice: Number.parseFloat(values[headers.indexOf("İndirimli Fiyatı")] || "0"),
        purchasePrice: Number.parseFloat(values[headers.indexOf("Alış Fiyatı")] || "0"),
        barcode: values[headers.indexOf("Barkod Listesi")] || "",
        sku: values[headers.indexOf("SKU")] || "",
        brand: values[headers.indexOf("Marka")] || "",
        categories: values[headers.indexOf("Kategoriler")] || "",
        tags: values[headers.indexOf("Etiketler")] || "",
        imageUrl: values[headers.indexOf("Resim URL")] || "",
        metaTitle: values[headers.indexOf("Metadata Başlık")] || "",
        metaDescription: values[headers.indexOf("Metadata Açıklama")] || "",
        slug: values[headers.indexOf("Slug")] || "",
        stockAdana: Number.parseInt(values[headers.indexOf("Stok:Adana Selahattin Eyyübi")] || "0"),
        stockMainWarehouse: Number.parseInt(values[headers.indexOf("Stok:Ana Depo")] || "0"),
        isActive: values[headers.indexOf("Varyant Aktiflik")] === "true",
        createdDate: values[headers.indexOf("Oluşturulma Tarihi")] || "",
      }

      // Sadece aktif, geçerli fiyatlı ve resimli ürünleri ekle
      if (product.isActive && product.name && product.imageUrl && product.discountPrice > 0 && product.salePrice > 0) {
        products.push(product)
      }
    }

    return NextResponse.json({ products, total: products.length })
  } catch (error) {
    console.error("CSV parse error:", error)
    return NextResponse.json({ error: "Failed to parse CSV", products: [], total: 0 }, { status: 500 })
  }
}
