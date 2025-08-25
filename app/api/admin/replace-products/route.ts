import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    console.log("[v0] Starting product replacement...")

    const supabase = await createClient()

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all products

    if (deleteError) {
      console.error("[v0] Error deleting products:", deleteError)
      return Response.json({ error: "Failed to delete existing products" }, { status: 500 })
    }

    const cosmeticsProducts = [
      {
        name: "Maybelline Fit Me Foundation",
        description: "Doğal görünümlü fondöten, tüm cilt tonlarına uygun",
        price: 89.99,
        category: "Makyaj",
        sku: "MAY-FIT-001",
        stock_quantity: 50,
        is_active: true,
        image_url: "/maybelline-foundation.png",
      },
      {
        name: "L'Oreal Paris Voluminous Mascara",
        description: "Hacim veren siyah maskara, suya dayanıklı formül",
        price: 65.99,
        category: "Makyaj",
        sku: "LOR-VOL-001",
        stock_quantity: 75,
        is_active: true,
        image_url: "/loreal-mascara.png",
      },
      {
        name: "MAC Ruby Woo Ruj",
        description: "Klasik kırmızı mat ruj, uzun süre kalıcı",
        price: 159.99,
        category: "Makyaj",
        sku: "MAC-RUB-001",
        stock_quantity: 30,
        is_active: true,
        image_url: "/mac-ruby-woo-lipstick.png",
      },
      {
        name: "Urban Decay Naked Eyeshadow Palette",
        description: "12 renk göz farı paleti, mat ve simli tonlar",
        price: 299.99,
        category: "Makyaj",
        sku: "UD-NAK-001",
        stock_quantity: 25,
        is_active: true,
        image_url: "/urban-decay-naked-palette.png",
      },
      {
        name: "Fenty Beauty Gloss Bomb",
        description: "Şeffaf dudak parlatıcısı, nem verici formül",
        price: 119.99,
        category: "Makyaj",
        sku: "FEN-GLO-001",
        stock_quantity: 40,
        is_active: true,
        image_url: "/fenty-beauty-gloss-bomb.png",
      },
      {
        name: "NYX Professional Makeup Setting Spray",
        description: "Makyaj sabitleyici sprey, 8 saat kalıcılık",
        price: 79.99,
        category: "Makyaj",
        sku: "NYX-SET-001",
        stock_quantity: 60,
        is_active: true,
        image_url: "/nyx-setting-spray.png",
      },
      {
        name: "The Ordinary Niacinamide Serum",
        description: "%10 Niacinamide + %1 Zinc, gözenek küçültücü serum",
        price: 45.99,
        category: "Cilt Bakımı",
        sku: "ORD-NIA-001",
        stock_quantity: 80,
        is_active: true,
        image_url: "/the-ordinary-niacinamide.png",
      },
      {
        name: "CeraVe Hydrating Cleanser",
        description: "Nemlendirici yüz temizleyici, kuru ciltler için",
        price: 89.99,
        category: "Cilt Bakımı",
        sku: "CER-HYD-001",
        stock_quantity: 45,
        is_active: true,
        image_url: "/cerave-hydrating-cleanser.png",
      },
    ]

    const { data, error: insertError } = await supabase.from("products").insert(cosmeticsProducts).select()

    if (insertError) {
      console.error("[v0] Error inserting products:", insertError)
      return Response.json({ error: "Failed to insert new products" }, { status: 500 })
    }

    console.log(`[v0] Successfully replaced products with ${data?.length} cosmetics items`)

    return Response.json({
      success: true,
      message: `Successfully replaced products with ${data?.length} cosmetics items`,
      products: data,
    })
  } catch (error) {
    console.error("[v0] Product replacement error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
