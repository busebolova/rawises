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
    const body = await request.json()

    const { orderId, email, amount, userName, userAddress, userPhone, items } = body

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
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

    const sipayResponse = await fetch(`${process.env.NEXT_PUBLIC_SIPAY_BASE_URL}/api/paySmart2D`, {
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
