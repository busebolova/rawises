import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHashKey(data: any): string {
  const hashString = `${data.sender_account_number}${data.ext_transaction_id}${data.amount}${data.currency_code}${process.env.SIPAY_APP_SECRET}`
  console.log("[v0] Sipay hash string:", hashString)

  const hash = crypto.createHash("sha256").update(hashString).digest("hex")
  console.log("[v0] Generated Sipay hash_key:", hash)

  return hash
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Environment variables check:")
    console.log("[v0] SIPAY_MERCHANT_ID:", process.env.SIPAY_MERCHANT_ID ? "SET" : "UNDEFINED")
    console.log("[v0] SIPAY_APP_SECRET:", process.env.SIPAY_APP_SECRET ? "SET" : "UNDEFINED")

    const requiredEnvVars = {
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
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

    const sipayPaymentData = {
      sender_account_number: process.env.SIPAY_MERCHANT_ID,
      sender_wallet_number: process.env.SIPAY_MERCHANT_ID,
      ext_transaction_id: orderId,
      currency_code: "TRY",
      amount: amount,
      receiver_wallet_number: process.env.SIPAY_MERCHANT_ID,
      description: `Rawises.com - Sipariş #${orderId}`,
      business_code: "ECOMMERCE",
      source_type: "WEB",
      channel_type: "API",
    }

    // Generate hash_key from payment data
    const hashKey = generateSipayHashKey(sipayPaymentData)

    const finalPaymentData = {
      ...sipayPaymentData,
      hash_key: hashKey,
    }

    console.log("[v0] Sending payment request to Sipay wallet API...")
    console.log("[v0] Payment data:", JSON.stringify(finalPaymentData, null, 2))

    const sipayApiUrl = "https://walletapi.sipay.com.tr/api/v1/Transaction/Payment"

    const sipayResponse = await fetch(sipayApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(finalPaymentData),
    })

    const responseText = await sipayResponse.text()
    console.log("[v0] Sipay API response status:", sipayResponse.status)
    console.log("[v0] Sipay API response:", responseText)

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

      if (sipayResult.status === "SUCCESS" || sipayResult.code === "200") {
        const paymentUrl = sipayResult.payment_url || sipayResult.redirect_url || sipayResult.data?.payment_url

        if (paymentUrl) {
          console.log("[v0] Payment URL received:", paymentUrl)
          return NextResponse.json({
            status: "success",
            payment_url: paymentUrl,
            orderId: orderId,
            message: "Ödeme sayfasına yönlendiriliyorsunuz...",
          })
        }

        // If no payment URL but transaction was created, return transaction info
        if (sipayResult.data?.transaction_id) {
          return NextResponse.json({
            status: "success",
            transaction_id: sipayResult.data.transaction_id,
            orderId: orderId,
            message: "Ödeme işlemi başlatıldı.",
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
      console.error("[v0] Failed to parse Sipay response:", parseError)
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
