import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  const merchantKey = process.env.SIPAY_MERCHANT_KEY!

  const hashString = `${data.merchant_id}${data.merchant_oid}${data.payment_amount}${data.currency}${merchantKey}`

  console.log("[v0] Sipay hash string:", hashString)
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
          status: "error",
          error_message: "Eksik ödeme bilgileri",
        },
        { status: 400 },
      )
    }

    const sipayPaymentData = {
      merchant_id: process.env.SIPAY_MERCHANT_ID,
      merchant_oid: orderId,
      payment_amount: Math.round(amount * 100).toString(), // Amount in kuruş
      currency: "TL",
      user_name: userName,
      user_address: userAddress || userName,
      user_phone: userPhone,
      email: email,
      merchant_ok_url: `${baseUrl}/payment/success`,
      merchant_fail_url: `${baseUrl}/payment/failed`,
      user_basket: JSON.stringify(
        items.map((item: any) => [item.name, Math.round((item.price || amount) * 100).toString(), item.quantity || 1]),
      ),
      debug_on: "0",
      test_mode: "0",
      non_3d: "0",
      client_lang: "tr",
    }

    const sipayHash = generateSipayHash(sipayPaymentData)
    const finalPaymentData = {
      ...sipayPaymentData,
      paytr_token: sipayHash, // Use PayTR compatible field name
    }

    console.log("[v0] Generated Sipay hash:", sipayHash)
    console.log("[v0] Sending payment data to Sipay:", finalPaymentData)

    const formData = new URLSearchParams()
    Object.entries(finalPaymentData).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const sipayEndpoints = [
      `${process.env.SIPAY_BASE_URL}`,
      `${process.env.SIPAY_BASE_URL}/api/paySmart2D`,
      `${process.env.SIPAY_BASE_URL}/ccpayment`,
    ]

    let lastError = null

    for (const endpoint of sipayEndpoints) {
      try {
        console.log("[v0] Trying Sipay endpoint:", endpoint)

        const sipayResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        })

        console.log("[v0] Sipay response status:", sipayResponse.status)

        const responseText = await sipayResponse.text()
        console.log("[v0] Sipay response:", responseText.substring(0, 500))

        if (responseText.includes("SUCCESS:")) {
          const token = responseText.split("SUCCESS:")[1]?.trim()
          if (token) {
            const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`
            console.log("[v0] Payment URL created:", paymentUrl)
            return NextResponse.json({
              status: "success",
              payment_url: paymentUrl,
              orderId: orderId,
              message: "Ödeme sayfasına yönlendiriliyorsunuz...",
            })
          }
        }

        // Try JSON parsing
        try {
          const jsonResponse = JSON.parse(responseText)
          console.log("[v0] Sipay JSON response:", jsonResponse)

          if (jsonResponse.status === "success" && jsonResponse.payment_url) {
            return NextResponse.json({
              status: "success",
              payment_url: jsonResponse.payment_url,
              orderId: orderId,
              message: "Ödeme sayfasına yönlendiriliyorsunuz...",
            })
          }
        } catch (parseError) {
          console.log("[v0] Response is not JSON, trying HTML parsing")
        }

        // Try HTML parsing for payment URLs
        const urlPatterns = [
          /action="([^"]+)"/i,
          /window\.location\.href\s*=\s*["']([^"']+)["']/i,
          /location\.href\s*=\s*["']([^"']+)["']/i,
          /https?:\/\/[^\s"'<>]*sipay[^\s"'<>]*/i,
        ]

        for (const pattern of urlPatterns) {
          const match = responseText.match(pattern)
          if (match && match[1]) {
            console.log("[v0] Found payment URL:", match[1])
            return NextResponse.json({
              status: "success",
              payment_url: match[1],
              orderId: orderId,
              message: "Ödeme sayfasına yönlendiriliyorsunuz...",
            })
          }
        }

        // Check for errors
        if (responseText.includes("FAILED") || responseText.includes("ERROR")) {
          lastError = responseText
          continue // Try next endpoint
        }
      } catch (fetchError) {
        console.error("[v0] Fetch error for endpoint", endpoint, ":", fetchError)
        lastError = fetchError
        continue // Try next endpoint
      }
    }

    return NextResponse.json(
      {
        status: "error",
        error_message: "Sipay ödeme sistemi şu anda erişilemez durumda. Lütfen daha sonra tekrar deneyin.",
        debug_info: lastError ? String(lastError).substring(0, 200) : "Tüm endpoint'ler başarısız",
      },
      { status: 400 },
    )
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
