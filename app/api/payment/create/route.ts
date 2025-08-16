import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateSipayHash(data: any): string {
  const merchantKey = process.env.SIPAY_MERCHANT_KEY!

  // Create hash string in the format Sipay expects
  const hashString = [
    data.merchant_id,
    data.invoice_id,
    data.amount,
    data.currency_code,
    data.success_url,
    data.fail_url,
    merchantKey,
  ].join("|")

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
      invoice_id: orderId,
      amount: (amount * 100).toString(), // Sipay expects amount in kuruş
      currency_code: "TRY",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      name: userName,
      email: email,
      phone: userPhone,
      address: userAddress || userPhone,
      items: items.map((item: any) => ({
        name: item.name,
        price: (item.price * 100).toString(),
        quantity: item.quantity.toString(),
      })),
    }

    const hash = generateSipayHash(sipayPaymentData)
    sipayPaymentData.hash = hash

    console.log("[v0] Sending payment data to Sipay:", JSON.stringify(sipayPaymentData, null, 2))

    const sipayResponse = await fetch("https://app.sipay.com.tr/ccpayment/api/paySmart2D", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.SIPAY_APP_KEY}:${process.env.SIPAY_APP_SECRET}`,
      },
      body: JSON.stringify(sipayPaymentData),
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
          error_message: "Sipay'dan geçersiz yanıt alındı: " + sipayResult.substring(0, 200),
        },
        { status: 400 },
      )
    }

    if (sipayResponse.ok && parsedResult.status === "success" && parsedResult.data?.payment_url) {
      return NextResponse.json({
        status: "success",
        payment_url: parsedResult.data.payment_url,
        orderId: orderId,
        message: "Ödeme sayfasına yönlendiriliyorsunuz...",
      })
    } else {
      console.error("Sipay Error Response:", parsedResult)
      return NextResponse.json(
        {
          status: "error",
          error_message:
            "Ödeme işlemi başlatılamadı: " + (parsedResult.message || parsedResult.error || "Bilinmeyen hata"),
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
