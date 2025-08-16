import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayToken(data: any): string {
  const appKey = process.env.SIPAY_APP_KEY!
  const appSecret = process.env.SIPAY_APP_SECRET!

  // Create token using app_key + app_secret + timestamp
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const tokenString = `${appKey}${appSecret}${timestamp}`

  console.log("[v0] Token generation string:", tokenString)
  return crypto.createHash("sha256").update(tokenString).digest("hex")
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
      app_id: process.env.SIPAY_APP_KEY,
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      invoice_id: orderId,
      currency_code: "TRY",
      total: (amount * 100).toString(), // Amount in kuruş
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      name: userName,
      email: email,
      phone: userPhone,
      address: userAddress || userPhone,
      items: items.map((item: any) => ({
        name: item.name,
        price: (item.price * 100).toString(),
        quantity: item.quantity.toString(),
      })),
      test_mode: false,
      lang: "tr",
    }

    const token = generateSipayToken(sipayPaymentData)
    sipayPaymentData.token = token

    console.log("[v0] Generated token:", token)
    console.log("[v0] Sending payment data to Sipay:", JSON.stringify(sipayPaymentData, null, 2))

    const sipayUrl = `${sipayBaseUrl}/api/payment/create`
    console.log("[v0] Final Sipay URL:", sipayUrl)

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
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SIPAY_APP_KEY}`,
      },
      body: JSON.stringify(sipayPaymentData),
    })

    const contentType = sipayResponse.headers.get("content-type")
    console.log("[v0] Sipay response content-type:", contentType)
    console.log("[v0] Sipay response status:", sipayResponse.status)

    let sipayResult: any

    if (contentType?.includes("application/json")) {
      sipayResult = await sipayResponse.json()
      console.log("[v0] Sipay JSON response:", sipayResult)

      if (sipayResult.status === "success" && sipayResult.payment_url) {
        return NextResponse.json({
          status: "success",
          payment_url: sipayResult.payment_url,
          orderId: orderId,
          message: "Ödeme sayfasına yönlendiriliyorsunuz...",
        })
      } else if (sipayResult.error || sipayResult.message) {
        return NextResponse.json(
          {
            status: "error",
            error_message: "Ödeme işlemi başlatılamadı: " + (sipayResult.error || sipayResult.message),
          },
          { status: 400 },
        )
      }
    } else {
      // Handle HTML response
      sipayResult = await sipayResponse.text()
      console.log("[v0] Sipay HTML response:", sipayResult.substring(0, 500))

      // Try different endpoint if this one returns HTML
      const alternativeUrl = `${sipayBaseUrl}/api/v1/payment`
      console.log("[v0] Trying alternative endpoint:", alternativeUrl)

      const altResponse = await fetch(alternativeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-KEY": process.env.SIPAY_APP_KEY,
          "X-API-SECRET": process.env.SIPAY_APP_SECRET,
        },
        body: JSON.stringify(sipayPaymentData),
      })

      if (altResponse.headers.get("content-type")?.includes("application/json")) {
        const altResult = await altResponse.json()
        console.log("[v0] Alternative endpoint response:", altResult)

        if (altResult.status === "success" && altResult.payment_url) {
          return NextResponse.json({
            status: "success",
            payment_url: altResult.payment_url,
            orderId: orderId,
            message: "Ödeme sayfasına yönlendiriliyorsunuz...",
          })
        }
      }
    }

    return NextResponse.json(
      {
        status: "error",
        error_message: "Sipay entegrasyonu şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
        debug_info: "API endpoint veya format hatası",
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
