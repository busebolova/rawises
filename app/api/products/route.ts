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

const fallbackProducts: Product[] = [
  {
    id: "1",
    variantId: "1",
    name: "Makyaj Fırçası Seti",
    description: "Profesyonel makyaj fırçası seti",
    salePrice: 150,
    discountPrice: 120,
    purchasePrice: 80,
    barcode: "123456789",
    sku: "MF001",
    brand: "Rawises",
    categories: "Makyaj, Fırça",
    tags: "makyaj, fırça, set",
    imageUrl: "/placeholder.svg?height=300&width=300",
    metaTitle: "Makyaj Fırçası Seti",
    metaDescription: "Profesyonel makyaj fırçası seti",
    slug: "makyaj-fircasi-seti",
    stockAdana: 10,
    stockMainWarehouse: 25,
    isActive: true,
    createdDate: "2024-01-01",
  },
  {
    id: "2",
    variantId: "2",
    name: "Ruj - Kırmızı",
    description: "Mat finish kırmızı ruj",
    salePrice: 80,
    discountPrice: 65,
    purchasePrice: 40,
    barcode: "123456790",
    sku: "RJ001",
    brand: "Rawises",
    categories: "Makyaj, Ruj",
    tags: "ruj, kırmızı, mat",
    imageUrl: "/placeholder.svg?height=300&width=300",
    metaTitle: "Kırmızı Ruj",
    metaDescription: "Mat finish kırmızı ruj",
    slug: "kirmizi-ruj",
    stockAdana: 15,
    stockMainWarehouse: 30,
    isActive: true,
    createdDate: "2024-01-01",
  },
]

export async function GET() {
  try {
    console.log("[v0] Starting products API request")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    let response
    try {
      response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
        { signal: controller.signal },
      )
      clearTimeout(timeoutId)
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("[v0] CSV fetch failed, using fallback data:", fetchError)
      return NextResponse.json({ products: fallbackProducts, total: fallbackProducts.length })
    }

    if (!response.ok) {
      console.error("[v0] CSV response not ok:", response.status)
      return NextResponse.json({ products: fallbackProducts, total: fallbackProducts.length })
    }

    const csvText = await response.text()
    console.log("[v0] CSV fetched successfully, parsing...")

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

      // Sadece aktif, geçerli fiyatlı ve resimli ürünleri ekle, saç açma tarama fırçası ürünlerini hariç tut
      if (
        product.isActive &&
        product.name &&
        product.imageUrl &&
        product.discountPrice > 0 &&
        product.salePrice > 0 &&
        !product.name.toLowerCase().includes("saç açma tarama fırçası")
      ) {
        products.push(product)
      }
    }

    console.log("[v0] Successfully parsed", products.length, "products")

    if (products.length === 0) {
      console.log("[v0] No products parsed, using fallback data")
      return NextResponse.json({ products: fallbackProducts, total: fallbackProducts.length })
    }

    return NextResponse.json({ products, total: products.length })
  } catch (error) {
    console.error("[v0] CSV parse error:", error)
    return NextResponse.json({ products: fallbackProducts, total: fallbackProducts.length })
  }
}
