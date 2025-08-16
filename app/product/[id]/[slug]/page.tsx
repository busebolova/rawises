import { notFound } from "next/navigation"
import { ProductDetailPage } from "@/components/product-detail-page"
import type { Product } from "@/lib/csv-parser"

interface ProductPageProps {
  params: Promise<{
    id: string
    slug: string
  }>
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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const values = parseCSVLine(line)
      if (values.length < headers.length) continue

      const productId = values[headers.indexOf("Ürün Grup ID")] || ""

      if (productId === id) {
        const product: Product = {
          id: productId,
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

        // Sadece aktif, geçerli fiyatlı ürünleri döndür
        if (product.isActive && product.name && product.discountPrice > 0 && product.salePrice > 0) {
          return product
        }
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

async function getRelatedProducts(product: Product): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

    const relatedProducts: Product[] = []

    for (let i = 1; i < lines.length && relatedProducts.length < 4; i++) {
      const line = lines[i]
      if (!line.trim()) continue

      const values = parseCSVLine(line)
      if (values.length < headers.length) continue

      const productId = values[headers.indexOf("Ürün Grup ID")] || ""
      const productBrand = values[headers.indexOf("Marka")] || ""
      const productCategories = values[headers.indexOf("Kategoriler")] || ""

      // Aynı ürünü atla
      if (productId === product.id) continue

      // Aynı marka veya kategorideki ürünleri bul
      const isSameBrand = productBrand === product.brand
      const hasSameCategory = product.categories
        .split(">")
        .some((cat) => productCategories.split(">").includes(cat.trim()))

      if (isSameBrand || hasSameCategory) {
        const relatedProduct: Product = {
          id: productId,
          variantId: values[headers.indexOf("Varyant ID")] || "",
          name: values[headers.indexOf("İsim")] || "",
          description: values[headers.indexOf("Açıklama")] || "",
          salePrice: Number.parseFloat(values[headers.indexOf("Satış Fiyatı")] || "0"),
          discountPrice: Number.parseFloat(values[headers.indexOf("İndirimli Fiyatı")] || "0"),
          purchasePrice: Number.parseFloat(values[headers.indexOf("Alış Fiyatı")] || "0"),
          barcode: values[headers.indexOf("Barkod Listesi")] || "",
          sku: values[headers.indexOf("SKU")] || "",
          brand: productBrand,
          categories: productCategories,
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

        // Sadece aktif, geçerli fiyatlı ürünleri ekle
        if (
          relatedProduct.isActive &&
          relatedProduct.name &&
          relatedProduct.discountPrice > 0 &&
          relatedProduct.salePrice > 0
        ) {
          relatedProducts.push(relatedProduct)
        }
      }
    }

    return relatedProducts
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, slug } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product)

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
      description: "Aradığınız ürün bulunamadı.",
    }
  }

  return {
    title: `${product.name} - ${product.brand} | Rawises`,
    description:
      product.metaDescription ||
      `${product.name} ürününü en uygun fiyatlarla Rawises'ten satın alın. ${product.brand} markası güvencesiyle.`,
    keywords: `${product.name}, ${product.brand}, kozmetik, makyaj, ${product.tags}`,
    openGraph: {
      title: product.name,
      description: product.metaDescription || product.name,
      images: [product.imageUrl || "/placeholder.svg"],
      type: "product",
    },
  }
}
