import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Gerçek CSV import başlatılıyor...")

    const supabase = await createClient()

    // Önce mevcut ürünleri temizle
    console.log("[v0] Mevcut ürünler temizleniyor...")
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000") // Tüm ürünleri sil

    if (deleteError) {
      console.log("[v0] Ürün silme hatası:", deleteError)
    } else {
      console.log("[v0] Mevcut ürünler temizlendi")
    }

    // CSV'yi fetch et
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-qFIu0YFQr9s35KRY9tH4G1Rous8QSY.csv"
    console.log("[v0] CSV dosyası indiriliyor...")

    const csvResponse = await fetch(csvUrl)
    if (!csvResponse.ok) {
      throw new Error(`CSV indirilemedi: ${csvResponse.status}`)
    }

    const csvText = await csvResponse.text()
    console.log(`[v0] CSV indirildi. Boyut: ${csvText.length} karakter`)

    // CSV'yi parse et
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())
    console.log(`[v0] CSV başlıkları: ${headers.slice(0, 5).join(", ")}...`)

    const products = []
    let processedCount = 0

    for (let i = 1; i < lines.length && i <= 51; i++) {
      // İlk 50 ürün
      const line = lines[i].trim()
      if (!line) continue

      processedCount++

      // Basit CSV parsing (gerçek CSV parser kullanmak daha iyi olur)
      const values = line.split(",").map((v) => v.replace(/"/g, "").trim())

      if (values.length < headers.length) continue

      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })

      // Ürün verilerini map et
      const name = row["İsim"] || ""
      if (!name) continue

      const description = (row["Açıklama"] || "").replace(/<[^>]*>/g, "").substring(0, 500)
      const salePrice = Number.parseFloat(row["Satış Fiyatı"] || "0") || 0
      const discountPrice = Number.parseFloat(row["İndirimli Fiyatı"] || "0") || 0
      const finalPrice = discountPrice > 0 ? discountPrice : salePrice

      const stockAdana = Number.parseInt(row["Stok:Adana Selahattin Eyyübi"] || "0") || 0
      const stockAnaDepo = Number.parseInt(row["Stok:Ana Depo"] || "0") || 0
      const totalStock = stockAdana + stockAnaDepo

      const category = (row["Kategoriler"] || "").replace("Tüm Ürünler>", "").replace(/>/g, " > ")
      const imageUrl = row["Resim URL"] || ""
      const sku = row["SKU"] || `SKU-${Date.now()}-${i}`
      const brand = row["Marka"] || ""

      const isActive = (row["Varyant Aktiflik"] || "false").toLowerCase() === "true"
      const isDeleted = (row["Silindi mi?"] || "false").toLowerCase() === "true"

      // Sadece aktif, silinmemiş ve stokta olan ürünleri al
      if (!isDeleted && isActive && totalStock > 0 && finalPrice > 0) {
        const product = {
          id: crypto.randomUUID(),
          name: name,
          description: description || `${brand} ${name}`,
          price: finalPrice,
          stock_quantity: totalStock,
          category: category || "Genel",
          image_url: imageUrl,
          sku: sku,
          is_active: true,
        }

        products.push(product)

        if (products.length <= 5) {
          console.log(`[v0] Ürün eklendi: ${name} - ${finalPrice} TL - Stok: ${totalStock}`)
        }
      }
    }

    console.log(`[v0] Toplam ${processedCount} satır işlendi`)
    console.log(`[v0] ${products.length} geçerli ürün bulundu`)

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Geçerli ürün bulunamadı",
        processed: processedCount,
      })
    }

    // Ürünleri Supabase'e ekle
    console.log(`[v0] ${products.length} ürün Supabase'e ekleniyor...`)

    const { data, error } = await supabase.from("products").insert(products).select()

    if (error) {
      console.log("[v0] Supabase insert hatası:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        processed: processedCount,
        found: products.length,
      })
    }

    console.log(`[v0] ${data?.length || 0} ürün başarıyla eklendi`)

    return NextResponse.json({
      success: true,
      message: `${data?.length || 0} ürün başarıyla import edildi`,
      processed: processedCount,
      imported: data?.length || 0,
      sampleProducts: products.slice(0, 3).map((p) => ({ name: p.name, price: p.price, stock: p.stock_quantity })),
    })
  } catch (error) {
    console.log("[v0] CSV import hatası:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    })
  }
}
