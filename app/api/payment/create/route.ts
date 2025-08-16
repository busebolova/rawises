import { type NextRequest, NextResponse } from "next/server"
import { generateSipayToken } from "@/lib/sipay"

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
      email: email,
      payment_amount: (amount * 100).toString(), // Sipay expects amount in kuruş
      currency: "TL",
      test_mode: "0",
      non_3d: "0",
      merchant_ok_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      merchant_fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      user_name: userName,
      user_address: userAddress || userPhone,
      user_phone: userPhone,
      user_basket: JSON.stringify(
        items.map((item: any) => [item.name, (item.price * 100).toString(), item.quantity.toString()]),
      ),
      debug_on: "1",
      client_lang: "tr",
    }

    // Generate token server-side
    const sipay_token = generateSipayToken(sipayPaymentData)
    sipayPaymentData.sipay_token = sipay_token

    console.log("[v0] Sending payment data to Sipay:", JSON.stringify(sipayPaymentData, null, 2))

    const sipayResponse = await fetch("https://api.sipay.com.tr/ccpayment/api/paySmart2D", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(sipayPaymentData).toString(),
    })

    const sipayResult = await sipayResponse.text()
    console.log("[v0] Sipay raw response:", sipayResult)
    console.log("[v0] Sipay response status:", sipayResponse.status)

    let parsedResult
    try {
      parsedResult = JSON.parse(sipayResult)
      console.log("[v0] Sipay parsed response:", parsedResult)
    } catch (e) {
      // Sipay might return HTML on error
      console.log("[v0] Response is not JSON, treating as text:", sipayResult)
      return NextResponse.json(
        {
          status: "error",
          error_message: "Sipay'dan geçersiz yanıt alındı",
        },
        { status: 400 },
      )
    }

    if (sipayResponse.ok && parsedResult.status === "success" && parsedResult.payment_url) {
      return NextResponse.json({
        status: "success",
        payment_url: parsedResult.payment_url,
        orderId: orderId,
        message: "Ödeme sayfasına yönlendiriliyorsunuz...",
      })
    } else {
      console.error("Sipay Error Response:", parsedResult)
      return NextResponse.json(
        {
          status: "error",
          error_message:
            "Ödeme işlemi başlatılamadı: " + (parsedResult.reason || parsedResult.message || "Bilinmeyen hata"),
        },
        { status: 400 },
      )
    }
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
