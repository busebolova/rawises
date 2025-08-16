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

export function parseCSVProducts(csvText: string): Product[] {
  const products: Product[] = []
  // Implement CSV parsing logic here based on the structure of your CSV data
  // This is a placeholder, replace with your actual parsing logic
  return products
}
