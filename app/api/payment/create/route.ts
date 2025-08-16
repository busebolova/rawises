import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  const merchantKey = process.env.SIPAY_MERCHANT_KEY!

  const hashString = [
    data.merchant_id,
    data.merchant_oid,
    data.payment_amount,
    data.currency,
    data.user_name,
    data.user_email,
    data.user_phone,
    data.user_address,
    data.user_basket,
    data.success_url,
    data.fail_url,
    merchantKey,
  ].join("|")

  console.log("[v0] Hash string:", hashString)
  return crypto.createHash("sha256").update(hashString).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_MERCHANT_KEY:", process.env.SIPAY_MERCHANT_KEY ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_BASE_URL:", process.env.SIPAY_BASE_URL ? process.env.SIPAY_BASE_URL : "UNDEFINED")
    console.log(
      "[v0] NEXT_PUBLIC_BASE_URL:",
      process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : "UNDEFINED",
    )

    const requiredEnvVars = {
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
      SIPAY_MERCHANT_KEY: process.env.SIPAY_MERCHANT_KEY,
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

    const sipayBaseUrl = process.env.SIPAY_BASE_URL || "https://app.sipay.com.tr/ccpayment"

    console.log("[v0] Using baseUrl:", baseUrl)
    console.log("[v0] Using sipayBaseUrl:", sipayBaseUrl)

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
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      merchant_oid: orderId,
      payment_amount: (amount * 100).toString(), // Sipay expects amount in kuruş
      currency: "TRY",
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      user_name: userName,
      user_email: email,
      user_phone: userPhone,
      user_address: userAddress || userPhone,
      user_basket: JSON.stringify(
        items.map((item: any) => [item.name, (item.price * 100).toString(), item.quantity.toString()]),
      ),
      debug_on: "0",
      test_mode: "0",
      non_3d: "0",
      client_lang: "tr",
    }

    const hash = generateSipayHash(sipayPaymentData)
    sipayPaymentData.hash = hash

    console.log("[v0] Generated hash:", hash)
    console.log("[v0] Sending payment data to Sipay:", JSON.stringify(sipayPaymentData, null, 2))

    const formData = new URLSearchParams()
    Object.entries(sipayPaymentData).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const sipayUrl = `${sipayBaseUrl}/api/paySmart2D`
    console.log("[v0] Final Sipay URL:", sipayUrl)

    // Validate URL before making request
    try {
      new URL(sipayUrl)
    } catch (urlError) {
      console.error("[v0] Invalid Sipay URL:", sipayUrl, urlError)
      return NextResponse.json(
        {
          status: "error",
          error_message: "Sipay URL konfigürasyon hatası",
        },
        { status: 500 },
      )
    }

    const sipayResponse = await fetch(sipayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      body: formData.toString(),
    })

    const sipayResult = await sipayResponse.text()
    console.log("[v0] Sipay raw response:", sipayResult)
    console.log("[v0] Sipay response status:", sipayResponse.status)

    if (sipayResponse.ok) {
      // Sipay returns HTML with redirect or error message
      if (sipayResult.includes("window.location.href") || sipayResult.includes("form")) {
        // Extract payment URL from HTML response
        const urlMatch =
          sipayResult.match(/window\.location\.href\s*=\s*["']([^"']+)["']/) ||
          sipayResult.match(/action\s*=\s*["']([^"']+)["']/)

        if (urlMatch && urlMatch[1]) {
          return NextResponse.json({
            status: "success",
            payment_url: urlMatch[1],
            orderId: orderId,
            message: "Ödeme sayfasına yönlendiriliyorsunuz...",
          })
        }
      }

      // Check for error messages in HTML
      if (sipayResult.includes("HATA") || sipayResult.includes("ERROR") || sipayResult.includes("Unauthenticated")) {
        const errorMatch =
          sipayResult.match(/<[^>]*>([^<]*(?:HATA|ERROR|Unauthenticated)[^<]*)<\/[^>]*>/) ||
          sipayResult.match(/(?:HATA|ERROR|Unauthenticated)[^<\n]*/)

        return NextResponse.json(
          {
            status: "error",
            error_message:
              "Ödeme işlemi başlatılamadı: " + (errorMatch ? errorMatch[1] || errorMatch[0] : "Bilinmeyen hata"),
          },
          { status: 400 },
        )
      }
    }

    return NextResponse.json(
      {
        status: "error",
        error_message: "Sipay'dan geçersiz yanıt alındı: " + sipayResult.substring(0, 200),
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
