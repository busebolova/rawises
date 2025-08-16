import { type NextRequest, NextResponse } from "next/server"

async function getSipayToken(): Promise<string> {
  const tokenResponse = await fetch("https://idsuat.walletgate.io/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "sts_api",
      client_id: process.env.SIPAY_APP_KEY!,
      client_secret: process.env.SIPAY_APP_SECRET!,
    }),
  })

  if (!tokenResponse.ok) {
    throw new Error(`Token request failed: ${tokenResponse.status}`)
  }

  const tokenData = await tokenResponse.json()
  console.log("[v0] Sipay token obtained successfully")
  return tokenData.access_token
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_APP_KEY:", process.env.SIPAY_APP_KEY ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_APP_SECRET:", process.env.SIPAY_APP_SECRET ? "SET" : "UNDEFINED")

    const requiredEnvVars = {
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
      SIPAY_APP_KEY: process.env.SIPAY_APP_KEY,
      SIPAY_APP_SECRET: process.env.SIPAY_APP_SECRET,
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

    console.log("[v0] Getting Sipay OAuth2 token...")
    const accessToken = await getSipayToken()

    const sipayPaymentData = {
      sender_account_number: process.env.SIPAY_MERCHANT_ID,
      ext_transaction_id: orderId,
      currency_code: "TRY",
      amount: amount,
      receiver_wallet_number: process.env.SIPAY_MERCHANT_ID,
      description: `Rawises.com - Sipariş #${orderId}`,
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/failed`,
      customer_info: {
        name: userName,
        email: email,
        phone: userPhone,
        address: userAddress || userName,
      },
      items: items.map((item: any) => ({
        name: item.name,
        price: item.price || amount,
        quantity: item.quantity || 1,
      })),
    }

    console.log("[v0] Sending payment request to Sipay API...")
    console.log("[v0] Payment data:", JSON.stringify(sipayPaymentData, null, 2))

    const sipayResponse = await fetch("https://walletapi.sipay.com.tr/v1/Transaction/Payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(sipayPaymentData),
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

      if (sipayResult.status === "success" || sipayResult.code === "200") {
        const paymentUrl = sipayResult.payload?.payment_url || sipayResult.payment_url

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
      console.error("[v0] JSON parse error:", parseError)
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
