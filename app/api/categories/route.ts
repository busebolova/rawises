import { NextResponse } from "next/server"

interface CategoryItem {
  category: string
  product: string
  mainCategory: string
  subCategory: string
  detailCategory?: string
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
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kategorili__r_n_Listesi-iosez1Am1EvZMsqWltO3EJjvEXJu84.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    const categories: CategoryItem[] = []
    const categoryStructure: Record<string, Record<string, string[]>> = {}

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const values = parseCSVLine(line)
      if (values.length < 2) continue

      const categoryPath = values[0] || ""
      const productName = values[1] || ""

      // Kategori hiyerarşisini parse et
      const categoryParts = categoryPath.split(">").map((part) => part.trim())

      if (categoryParts.length >= 2) {
        const mainCategory = categoryParts[1] // Ana kategori
        const subCategory = categoryParts[2] || "" // Alt kategori
        const detailCategory = categoryParts[3] || "" // Detay kategori

        const categoryItem: CategoryItem = {
          category: categoryPath,
          product: productName,
          mainCategory,
          subCategory,
          detailCategory: detailCategory || undefined,
        }

        categories.push(categoryItem)

        // Kategori yapısını oluştur
        if (!categoryStructure[mainCategory]) {
          categoryStructure[mainCategory] = {}
        }

        if (subCategory && !categoryStructure[mainCategory][subCategory]) {
          categoryStructure[mainCategory][subCategory] = []
        }

        if (detailCategory && !categoryStructure[mainCategory][subCategory].includes(detailCategory)) {
          categoryStructure[mainCategory][subCategory].push(detailCategory)
        }
      }
    }

    return NextResponse.json({
      categories,
      categoryStructure,
      total: categories.length,
    })
  } catch (error) {
    console.error("Category CSV parse error:", error)
    return NextResponse.json(
      {
        error: "Failed to parse category CSV",
        categories: [],
        categoryStructure: {},
        total: 0,
      },
      { status: 500 },
    )
  }
}
