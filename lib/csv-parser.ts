export interface Product {
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

export function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim()
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export function parseCSV(csvText: string): Product[] {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
  const products: Product[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
    if (values.length < headers.length) continue

    const product: Product = {
      id: values[0] || `product-${i}`,
      variantId: values[1] || "",
      name: values[2] || "Ürün Adı",
      description: stripHtmlTags(values[3] || ""),
      salePrice: Number.parseFloat(values[4]) || 0,
      discountPrice: Number.parseFloat(values[5]) || 0,
      purchasePrice: Number.parseFloat(values[6]) || 0,
      barcode: values[7] || "",
      sku: values[8] || "",
      brand: values[9] || "",
      categories: values[10] || "",
      tags: values[11] || "",
      imageUrl: values[12] || "/placeholder.svg",
      metaTitle: values[13] || "",
      metaDescription: values[14] || "",
      slug: values[15] || "",
      stockAdana: Number.parseInt(values[16]) || 0,
      stockMainWarehouse: Number.parseInt(values[17]) || 0,
      isActive: values[18]?.toLowerCase() === "true" || true,
      createdDate: values[19] || new Date().toISOString(),
    }

    products.push(product)
  }

  return products
}

export function parseCSVProducts(csvText: string): Product[] {
  // Implement CSV parsing logic here based on the structure of your CSV data
  // This is a placeholder, replace with your actual parsing logic
  return parseCSV(csvText)
}
