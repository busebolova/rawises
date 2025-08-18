import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { sipayConfig } from "@/lib/sipay"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    // Sipay'den gelen parametreler
    const merchantOid = params.get("merchant_oid")
    const status = params.get("status")
    const totalAmount = params.get("total_amount")
    const hash = params.get("hash")
    const failedReasonCode = params.get("failed_reason_code")
    const failedReasonMsg = params.get("failed_reason_msg")
    const testMode = params.get("test_mode")
    const paymentType = params.get("payment_type")
    const currency = params.get("currency")
    const paymentAmount = params.get("payment_amount")

    // Hash doğrulama
    const hashString = `${merchantOid}${sipayConfig.merchantKey}${status}${totalAmount}`
    const calculatedHash = crypto.createHmac("sha256", sipayConfig.merchantKey).update(hashString).digest("base64")

    if (hash !== calculatedHash) {
      console.error("Hash doğrulama başarısız:", { hash, calculatedHash })
      return NextResponse.json({ error: "Hash doğrulama başarısız" }, { status: 400 })
    }

    // Ödeme durumuna göre işlem
    if (status === "success") {
      // Başarılı ödeme
      console.log("Başarılı ödeme:", {
        orderId: merchantOid,
        amount: totalAmount,
        paymentType,
        testMode,
      })

      // Burada sipariş durumunu güncelleyebilirsiniz
      // Örnek: await updateOrderStatus(merchantOid, 'paid')

      // E-posta gönderimi
      // Örnek: await sendOrderConfirmationEmail(merchantOid)

      return NextResponse.json({ status: "OK" })
    } else {
      // Başarısız ödeme
      console.log("Başarısız ödeme:", {
        orderId: merchantOid,
        failedReasonCode,
        failedReasonMsg,
        testMode,
      })

      // Burada sipariş durumunu güncelleyebilirsiniz
      // Örnek: await updateOrderStatus(merchantOid, 'failed')

      return NextResponse.json({ status: "OK" })
    }
  } catch (error) {
    console.error("Webhook işleme hatası:", error)
    return NextResponse.json({ error: "Webhook işleme hatası" }, { status: 500 })
  }
}

// GET metodu da ekleyelim (test için)
export async function GET() {
  return NextResponse.json({
    message: "Sipay Webhook Endpoint",
    status: "active",
    timestamp: new Date().toISOString(),
  })
}
