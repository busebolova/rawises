import { type NextRequest, NextResponse } from "next/server"
import { generateSipayToken, sipayConfig } from "@/lib/sipay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      merchant_id,
      merchant_oid,
      email,
      payment_amount,
      currency,
      test_mode,
      non_3d,
      merchant_ok_url,
      merchant_fail_url,
      user_name,
      user_address,
      user_phone,
      user_basket,
      debug_on,
      client_lang,
      customerInfo,
    } = body

    // Token oluştur
    const orderData = {
      orderId: merchant_oid,
      email,
      amount: Number.parseFloat(payment_amount) / 100, // Kuruştan TL'ye çevir
      userName: user_name,
      userAddress: user_address,
      userPhone: user_phone,
      items: JSON.parse(user_basket).map((item: any) => ({
        name: item[0],
        price: Number.parseFloat(item[1]) / 100, // Kuruştan TL'ye çevir
        quantity: Number.parseInt(item[2]),
      })),
    }

    const paytr_token = generateSipayToken(orderData)

    // Sipay'a gönderilecek form verisi
    const paymentData = {
      merchant_id,
      merchant_key: sipayConfig.merchantKey,
      merchant_oid,
      email,
      payment_amount, // KDV hariç tutar (kuruş cinsinden)
      currency,
      test_mode,
      non_3d,
      merchant_ok_url,
      merchant_fail_url,
      user_name,
      user_address,
      user_phone,
      user_basket,
      debug_on,
      client_lang,
      paytr_token,
    }

    // Sipay API'sine POST isteği gönder
    const sipayResponse = await fetch(sipayConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(paymentData).toString(),
    })

    const sipayResult = await sipayResponse.text()

    // Sipay yanıtını kontrol et
    if (sipayResult.startsWith("SUCCESS")) {
      const token = sipayResult.split(":")[1]
      const paymentUrl = `https://www.paytr.com/odeme/guvenli/${token}`

      return NextResponse.json({
        success: true,
        paymentUrl,
        orderId: merchant_oid,
        message: "Ödeme sayfasına yönlendiriliyorsunuz...",
      })
    } else {
      console.error("Sipay Error:", sipayResult)
      return NextResponse.json(
        {
          success: false,
          error: "Ödeme işlemi başlatılamadı: " + sipayResult,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Sunucu hatası oluştu",
      },
      { status: 500 },
    )
  }
}
