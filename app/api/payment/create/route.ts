import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  // Sipay hash format: merchant_id + merchant_oid + payment_amount + currency + merchant_key
  const hashString = `${data.merchant_id}${data.merchant_oid}${data.payment_amount}${data.currency}${process.env.SIPAY_MERCHANT_KEY}`
  console.log("[v0] Hash string:", hashString)

  const hash = crypto.createHash("sha256").update(hashString).digest("hex")
  console.log("[v0] Generated hash:", hash)

  return hash
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_BASE_URL:", process.env.SIPAY_BASE_URL ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_MERCHANT_KEY:", process.env.SIPAY_MERCHANT_KEY ? "SET" : "UNDEFINED")

    const requiredEnvVars = {
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
      SIPAY_BASE_URL: process.env.SIPAY_BASE_URL,
      SIPAY_MERCHANT_KEY: process.env.SIPAY_MERCHANT_KEY,
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
          status: "error",
          error_message: "Eksik ödeme bilgileri",
        },
        { status: 400 },
      )
    }

    const sipayPaymentData = {
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      merchant_oid: orderId,
      email: email,
      payment_amount: Math.round(amount * 100), // Convert to kuruş
      currency: "TL",
      user_name: userName,
      user_address: userAddress || userName,
      user_phone: userPhone,
      merchant_ok_url: `${baseUrl}/payment/success`,
      merchant_fail_url: `${baseUrl}/payment/failed`,
      user_basket: JSON.stringify(items.map((item: any) => [item.name, item.price || amount, item.quantity || 1])),
      debug_on: "1",
      test_mode: "0",
      no_installment: "0",
      max_installment: "0",
      user_ip: "127.0.0.1",
      timeout_limit: "30",
      lang: "tr",
    }

    // Generate hash after all data is set
    const hash = generateSipayHash(sipayPaymentData)
    sipayPaymentData.hash = hash

    console.log("[v0] Sending payment request to Sipay ccpayment...")
    console.log("[v0] Payment data:", JSON.stringify(sipayPaymentData, null, 2))

    const formData = new URLSearchParams()
    Object.entries(sipayPaymentData).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    const sipayResponse = await fetch(`${process.env.SIPAY_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    console.log("[v0] Sipay response status:", sipayResponse.status)

    const responseText = await sipayResponse.text()
    console.log("[v0] Sipay response:", responseText.substring(0, 500))

    if (!sipayResponse.ok) {
      console.error("[v0] Sipay API error:", responseText)
      return NextResponse.json(
        {
          status: "error",
          error_message: "Sipay ödeme sistemi hatası. Lütfen tekrar deneyin.",
          debug_info: responseText.substring(0, 200),
        },
        { status: 400 },
      )
    }

    try {
      const sipayResult = JSON.parse(responseText)
      console.log("[v0] Sipay JSON response:", sipayResult)

      if (sipayResult.status === "success") {
        const paymentUrl = sipayResult.payment_url || sipayResult.redirect_url

        if (paymentUrl) {
          console.log("[v0] Payment URL received:", paymentUrl)
          return NextResponse.json({
            status: "success",
            payment_url: paymentUrl,
            orderId: orderId,
            message: "Ödeme sayfasına yönlendiriliyorsunuz...",
          })
        }
      }

      return NextResponse.json(
        {
          status: "error",
          error_message: sipayResult.message || "Sipay'dan beklenmeyen yanıt alındı.",
          debug_info: JSON.stringify(sipayResult),
        },
        { status: 400 },
      )
    } catch (parseError) {
      console.log("[v0] Parsing HTML response...")

      // Look for payment URL in HTML
      const urlPatterns = [
        /action="([^"]+)"/i,
        /href="([^"]+payment[^"]+)"/i,
        /window\.location\.href\s*=\s*["']([^"']+)["']/i,
        /location\.replace$$["']([^"']+)["']$$/i,
      ]

      for (const pattern of urlPatterns) {
        const match = responseText.match(pattern)
        if (match && match[1]) {
          const paymentUrl = match[1]
          console.log("[v0] Found payment URL in HTML:", paymentUrl)

          return NextResponse.json({
            status: "success",
            payment_url: paymentUrl,
            orderId: orderId,
            message: "Ödeme sayfasına yönlendiriliyorsunuz...",
          })
        }
      }

      // If no payment URL found, check for error messages
      if (responseText.includes("hata") || responseText.includes("error") || responseText.includes("başarısız")) {
        return NextResponse.json(
          {
            status: "error",
            error_message: "Sipay ödeme işlemi başlatılamadı. Lütfen bilgilerinizi kontrol edin.",
            debug_info: responseText.substring(0, 200),
          },
          { status: 400 },
        )
      }

      return NextResponse.json(
        {
          status: "error",
          error_message: "Sipay yanıtı işlenemedi.",
          debug_info: responseText.substring(0, 200),
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("[v0] Payment creation error:", error)
    return NextResponse.json(
      {
        status: "error",
        error_message: `Ödeme işlemi başlatılamadı: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`,
      },
      { status: 500 },
    )
  }
}
