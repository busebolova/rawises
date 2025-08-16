import { type NextRequest, NextResponse } from "next/server"
import { generateSipayToken, sipayConfig, createSipayPaymentData } from "@/lib/sipay"

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

    const sipayPaymentData = createSipayPaymentData({
      orderId,
      email,
      amount,
      userName,
      userAddress: userAddress || userPhone, // Use phone as fallback for address
      userPhone,
      items,
    })

    const paytr_token = generateSipayToken({
      orderId,
      email,
      amount,
      userName,
      userAddress: userAddress || userPhone,
      userPhone,
      items,
    })

    const paymentData = {
      ...sipayPaymentData,
      merchant_key: sipayConfig.merchantKey,
      paytr_token,
    }

    console.log("[v0] Sending payment data to Sipay:", paymentData)

    // Sipay API'sine POST isteği gönder
    const sipayResponse = await fetch(sipayConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(paymentData as Record<string, string>).toString(),
    })

    const sipayResult = await sipayResponse.text()
    console.log("[v0] Sipay response:", sipayResult)

    // Sipay yanıtını kontrol et
    if (sipayResult.startsWith("SUCCESS")) {
      const token = sipayResult.split(":")[1]
      const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`

      return NextResponse.json({
        status: "success",
        payment_url: paymentUrl,
        orderId: orderId,
        message: "Ödeme sayfasına yönlendiriliyorsunuz...",
      })
    } else {
      console.error("Sipay Error:", sipayResult)
      return NextResponse.json(
        {
          status: "error",
          error_message: "Ödeme işlemi başlatılamadı: " + sipayResult,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      {
        status: "error",
        error_message: "Sunucu hatası oluştu",
      },
      { status: 500 },
    )
  }
}
