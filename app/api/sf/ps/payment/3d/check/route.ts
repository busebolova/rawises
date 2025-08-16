import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Sipay webhook endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const requestType = searchParams.get("requestType")

    // Sadece Sipay webhook'larını kabul et
    if (code !== "SIPAY" || requestType !== "webhook") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    console.log("Sipay Webhook received:", {
      timestamp: new Date().toISOString(),
      body: body,
      headers: Object.fromEntries(request.headers.entries()),
    })

    // Webhook body'sini parse et
    let webhookData
    try {
      webhookData = JSON.parse(body)
    } catch (parseError) {
      console.error("Failed to parse webhook body:", parseError)
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    // Hash doğrulama (güvenlik için)
    const merchantKey = process.env.SIPAY_MERCHANT_KEY || "$2y$10$RwIRCb8UmjFrv6LR3kdJ0ePwxNPkKFQi1hC7xzHOm07w18lWIOPt"

    if (webhookData.hash) {
      const expectedHash = crypto.createHmac("sha256", merchantKey).update(JSON.stringify(webhookData)).digest("hex")

      if (webhookData.hash !== expectedHash) {
        console.error("Hash verification failed")
        return NextResponse.json({ error: "Hash verification failed" }, { status: 401 })
      }
    }

    // Ödeme durumuna göre işlem yap
    if (webhookData.status === "success") {
      console.log("Payment successful:", {
        orderId: webhookData.merchant_oid,
        amount: webhookData.total_amount,
        paymentType: webhookData.payment_type,
      })

      // Burada sipariş durumunu veritabanında güncelleyebilirsiniz
      // await updateOrderStatus(webhookData.merchant_oid, "paid")

      // E-posta bildirimi gönderebilirsiniz
      // await sendPaymentConfirmationEmail(webhookData)
    } else if (webhookData.status === "failed") {
      console.log("Payment failed:", {
        orderId: webhookData.merchant_oid,
        failureReason: webhookData.failed_reason_msg,
        failureCode: webhookData.failed_reason_code,
      })

      // Başarısız ödeme için işlemler
      // await updateOrderStatus(webhookData.merchant_oid, "failed")
    }

    // Sipay'a başarılı yanıt döndür
    return NextResponse.json({
      status: "OK",
      message: "Webhook processed successfully",
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// GET isteği için de destek (test amaçlı)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const requestType = searchParams.get("requestType")

  if (code !== "SIPAY" || requestType !== "webhook") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  return NextResponse.json({
    status: "OK",
    message: "Sipay webhook endpoint is active",
    timestamp: new Date().toISOString(),
  })
}
