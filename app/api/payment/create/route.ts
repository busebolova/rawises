import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  const merchantKey = process.env.SIPAY_MERCHANT_KEY!

  // Standard Turkish payment gateway hash format
  const hashString = `${data.merchant_id}${data.merchant_oid}${data.email}${data.payment_amount}${data.user_basket}${data.no_installment}${data.max_installment}${data.user_name}${data.user_address}${data.user_phone}${merchantKey}`

  console.log("[v0] Hash string:", hashString)
  return crypto.createHash("sha256").update(hashString).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_MERCHANT_KEY:", process.env.SIPAY_MERCHANT_KEY ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_BASE_URL:", process.env.SIPAY_BASE_URL ? process.env.SIPAY_BASE_URL : "UNDEFINED")

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

    const userBasket = items
      .map((item: any, index: number) => `${item.name},${(item.price * item.quantity).toFixed(2)},${item.quantity}`)
      .join(";")

    const sipayPaymentData = {
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      merchant_oid: orderId,
      email: email,
      payment_amount: (amount * 100).toString(), // Amount in kuruş
      currency: "TL",
      user_name: userName,
      user_address: userAddress || userName,
      user_phone: userPhone,
      merchant_ok_url: `${baseUrl}/payment/success`,
      merchant_fail_url: `${baseUrl}/payment/failed`,
      user_basket: Buffer.from(userBasket).toString("base64"),
      debug_on: "0",
      test_mode: "0",
      no_installment: "0",
      max_installment: "0",
      lang: "tr",
      timeout_limit: "30",
    }

    const paytrToken = generateSipayHash(sipayPaymentData)
    sipayPaymentData.paytr_token = paytrToken

    console.log("[v0] Generated hash:", paytrToken)
    console.log("[v0] Sending payment data to Sipay:", sipayPaymentData)

    const sipayUrl = process.env.SIPAY_BASE_URL!
    console.log("[v0] Sipay URL:", sipayUrl)

    const formData = new URLSearchParams()
    Object.entries(sipayPaymentData).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const sipayResponse = await fetch(sipayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })

    console.log("[v0] Sipay response status:", sipayResponse.status)

    const responseText = await sipayResponse.text()
    console.log("[v0] Sipay response:", responseText.substring(0, 200))

    if (responseText.startsWith("SUCCESS")) {
      const token = responseText.split(":")[1]
      const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`

      return NextResponse.json({
        status: "success",
        payment_url: paymentUrl,
        orderId: orderId,
        message: "Ödeme sayfasına yönlendiriliyorsunuz...",
      })
    } else if (responseText.includes("FAILED")) {
      const errorMessage = responseText.split(":")[1] || "Bilinmeyen hata"
      return NextResponse.json(
        {
          status: "error",
          error_message: "Ödeme işlemi başlatılamadı: " + errorMessage,
        },
        { status: 400 },
      )
    } else {
      // Try to extract payment URL from HTML response
      const urlMatch =
        responseText.match(/action="([^"]+)"/i) ||
        responseText.match(/window\.location\.href\s*=\s*["']([^"']+)["']/i) ||
        responseText.match(/https?:\/\/[^\s"'<>]+/i)

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
