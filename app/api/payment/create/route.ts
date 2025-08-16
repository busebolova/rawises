import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  const appSecret = process.env.SIPAY_APP_SECRET!

  // Sipay hash format: app_id + merchant_id + invoice_id + currency_code + total + app_secret
  const hashString = `${data.app_id}${data.merchant_id}${data.invoice_id}${data.currency_code}${data.total}${appSecret}`

  console.log("[v0] Sipay hash string:", hashString)
  return crypto.createHash("sha256").update(hashString).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_APP_KEY:", process.env.SIPAY_APP_KEY ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_APP_SECRET:", process.env.SIPAY_APP_SECRET ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_BASE_URL:", process.env.SIPAY_BASE_URL ? process.env.SIPAY_BASE_URL : "UNDEFINED")

    const requiredEnvVars = {
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
      SIPAY_APP_KEY: process.env.SIPAY_APP_KEY,
      SIPAY_APP_SECRET: process.env.SIPAY_APP_SECRET,
      SIPAY_BASE_URL: process.env.SIPAY_BASE_URL,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.error("[v0] Missing environment variables:", missingVars)
      return NextResponse.json(
        {
          status: "error",
          error_message: `Sunucu konfigürasyon hatası: ${missingVars.join(", ")} tanımlanmamış`,
        },
        { status: 500 },
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : `https://${process.env.NEXT_PUBLIC_BASE_URL || "www.rawises.com"}`

    const body = await request.json()
    const { orderId, email, amount, userName, userPhone, items, userAddress } = body

    if (!orderId || !email || !amount || !userName || !userPhone || !items) {
      return NextResponse.json(
        {
          success: false,
          error: "Eksik ödeme bilgileri",
        },
        { status: 400 },
      )
    }

    const sipayPaymentData = {
      app_id: process.env.SIPAY_APP_KEY,
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      invoice_id: orderId,
      currency_code: "TRY",
      total: (amount * 100).toString(), // Amount in kuruş
      name: userName,
      email: email,
      phone: userPhone,
      address: userAddress || userName,
      return_url: `${baseUrl}/payment/return`,
      cancel_url: `${baseUrl}/payment/failed`,
      items: items.map((item: any) => ({
        name: item.name,
        price: (item.price * 100).toString(),
        quantity: item.quantity.toString(),
      })),
    }

    const sipayHash = generateSipayHash(sipayPaymentData)
    sipayPaymentData.hash = sipayHash

    console.log("[v0] Generated Sipay hash:", sipayHash)
    console.log("[v0] Sending payment data to Sipay:", sipayPaymentData)

    const sipayUrl = `${process.env.SIPAY_BASE_URL}/api/payment`
    console.log("[v0] Sipay URL:", sipayUrl)

    const sipayResponse = await fetch(sipayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(sipayPaymentData),
    })

    console.log("[v0] Sipay response status:", sipayResponse.status)

    const responseText = await sipayResponse.text()
    console.log("[v0] Sipay response:", responseText.substring(0, 200))

    try {
      const jsonResponse = JSON.parse(responseText)

      if (jsonResponse.status === "success" && jsonResponse.payment_url) {
        return NextResponse.json({
          status: "success",
          payment_url: jsonResponse.payment_url,
          orderId: orderId,
          message: "Ödeme sayfasına yönlendiriliyorsunuz...",
        })
      } else if (jsonResponse.status === "error") {
        return NextResponse.json(
          {
            status: "error",
            error_message: "Ödeme işlemi başlatılamadı: " + (jsonResponse.message || "Bilinmeyen hata"),
          },
          { status: 400 },
        )
      }
    } catch (parseError) {
      const urlMatch =
        responseText.match(/action="([^"]+)"/i) ||
        responseText.match(/window\.location\.href\s*=\s*["']([^"']+)["']/i) ||
        responseText.match(/https?:\/\/[^\s"'<>]+sipay[^\s"'<>]*/i)

      if (urlMatch && urlMatch[1]) {
        return NextResponse.json({
          status: "success",
          payment_url: urlMatch[1],
          orderId: orderId,
          message: "Ödeme sayfasına yönlendiriliyorsunuz...",
        })
      }
    }

    return NextResponse.json(
      {
        status: "error",
        error_message: "Sipay'dan beklenmeyen yanıt alındı. Lütfen tekrar deneyin.",
        debug_info: responseText.substring(0, 100),
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      {
        status: "error",
        error_message: "Sunucu hatası oluştu: " + error.message,
      },
      { status: 500 },
    )
  }
}
