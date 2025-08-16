import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface PaymentRequest {
  amount: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    country: string
  }
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()

    // Sipay konfigürasyonu
    const config = {
      merchantId: "13174794",
      merchantKey: "$2y$10$RwIRCb8UmjFrv6LR3kdJ0ePwxNPkKFQi1hC7xzHOm07w18lWIOPt",
      appId: "11ac0243ff9c07f67704f9ec8880d002",
      appSecret: "ecd2a1cd72e98bec991e4d92e71bcb67",
      baseUrl: "https://app.sipay.com.tr/ccpayment",
    }

    // Sipariş ID oluştur
    const orderId = `RW${Date.now()}${Math.floor(Math.random() * 1000)}`

    // Ödeme parametreleri
    const paymentData = {
      merchant_id: config.merchantId,
      merchant_oid: orderId,
      merchant_ok_url: `${request.nextUrl.origin}/payment/success`,
      merchant_fail_url: `${request.nextUrl.origin}/payment/failed`,
      payment_amount: (body.amount * 100).toString(), // Kuruş cinsinden
      currency: "TL",
      test_mode: "1", // Canlıda "0" olacak
      non_3d: "0", // 3D Secure aktif

      // Müşteri bilgileri
      email: body.customerInfo.email,
      payment_type: "card",
      installment_count: "",

      // Fatura bilgileri
      cc_owner: body.customerInfo.name,
      card_type: "1", // Kredi kartı

      // Ürün bilgileri
      user_basket: JSON.stringify(
        body.items.map((item) => [
          item.name,
          (item.price * 100).toString(), // Kuruş
          item.quantity.toString(),
        ]),
      ),

      // Adres bilgileri
      user_name: body.customerInfo.name,
      user_address: body.customerInfo.address,
      user_phone: body.customerInfo.phone,

      // Webhook URL
      merchant_webhook_url: `${request.nextUrl.origin}/api/sf/ps/payment/3d/check?code=SIPAY&requestType=webhook`,

      // Zaman damgası
      paytr_token: Date.now().toString(),
      debug_on: "1", // Test modunda debug aktif
    }

    // Hash oluştur
    const hashString = [
      paymentData.merchant_id,
      paymentData.merchant_oid,
      paymentData.payment_amount,
      paymentData.merchant_ok_url,
      paymentData.merchant_fail_url,
      config.merchantKey,
    ].join("")

    const paymentToken = crypto.createHmac("sha256", config.merchantKey).update(hashString).digest("hex")

    paymentData.paytr_token = paymentToken

    console.log("Creating payment with data:", {
      orderId,
      amount: body.amount,
      customer: body.customerInfo.email,
      itemCount: body.items.length,
    })

    // Sipay'a ödeme isteği gönder
    const sipayResponse = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(paymentData).toString(),
    })

    const responseText = await sipayResponse.text()

    try {
      const sipayResult = JSON.parse(responseText)

      if (sipayResult.status === "success") {
        return NextResponse.json({
          success: true,
          paymentUrl: sipayResult.redirect_url,
          orderId: orderId,
          token: sipayResult.token,
        })
      } else {
        console.error("Sipay error:", sipayResult)
        return NextResponse.json(
          {
            success: false,
            error: sipayResult.reason || "Ödeme oluşturulamadı",
          },
          { status: 400 },
        )
      }
    } catch (parseError) {
      console.error("Failed to parse Sipay response:", responseText)
      return NextResponse.json(
        {
          success: false,
          error: "Ödeme servisi yanıt hatası",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Ödeme oluşturulurken hata oluştu",
      },
      { status: 500 },
    )
  }
}
