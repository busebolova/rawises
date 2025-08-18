import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  // Test log to verify API route is being called
  console.log("[v0] ===== PAYMENT API ROUTE CALLED =====")
  console.log("[v0] Request method:", request.method)
  console.log("[v0] Request URL:", request.url)
  console.log("[v0] Timestamp:", new Date().toISOString())

  try {
    console.log("[v0] Step 1: Checking environment variables")
    const requiredEnvVars = {
      SIPAY_BASE_URL: process.env.SIPAY_BASE_URL,
      SIPAY_MERCHANT_ID: process.env.SIPAY_MERCHANT_ID,
      SIPAY_MERCHANT_KEY: process.env.SIPAY_MERCHANT_KEY,
      SIPAY_APP_KEY: process.env.SIPAY_APP_KEY,
      SIPAY_APP_SECRET: process.env.SIPAY_APP_SECRET,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    }

    console.log("[v0] Environment variables check:", {
      SIPAY_BASE_URL: !!process.env.SIPAY_BASE_URL,
      SIPAY_MERCHANT_ID: !!process.env.SIPAY_MERCHANT_ID,
      SIPAY_MERCHANT_KEY: !!process.env.SIPAY_MERCHANT_KEY,
      SIPAY_APP_KEY: !!process.env.SIPAY_APP_KEY,
      SIPAY_APP_SECRET: !!process.env.SIPAY_APP_SECRET,
      NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
    })

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

    console.log("[v0] Step 2: Parsing request body")
    const body = await request.json()
    console.log("[v0] Request body:", body)

    console.log("[v0] Extracting fields from body:")
    console.log("[v0] - orderId:", body.orderId)
    console.log("[v0] - amount:", body.amount)
    console.log("[v0] - customerName:", body.customerName)
    console.log("[v0] - customerEmail:", body.customerEmail)
    console.log("[v0] - customerPhone:", body.customerPhone)
    console.log("[v0] - cardNumber:", body.cardNumber)
    console.log("[v0] - expiryMonth:", body.expiryMonth)
    console.log("[v0] - expiryYear:", body.expiryYear)
    console.log("[v0] - cvv:", body.cvv)
    console.log("[v0] - cardHolderName:", body.cardHolderName)

    const {
      orderId,
      amount,
      customerName,
      customerEmail,
      customerPhone,
      productName,
      productDescription,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      cardHolderName,
    } = body

    console.log("[v0] Step 3: Skipping token request for now, creating direct payment form")

    console.log("[v0] Step 4: Preparing payment data")
    const invoice_id = `RW-${orderId}-${Date.now()}`
    const installments_number = 1
    const currency_code = "TRY"

    console.log("[v0] Step 5: Generating hash key")
    const hash_key = generateSipayHashKey(
      amount,
      installments_number,
      currency_code,
      process.env.SIPAY_MERCHANT_KEY!,
      invoice_id,
      process.env.SIPAY_APP_SECRET!,
    )

    console.log("[v0] Step 6: Creating payment data object")
    console.log("[v0] Payment data fields:")
    console.log("[v0] - cc_holder_name will be:", cardHolderName || customerName)
    console.log("[v0] - cc_no will be:", cardNumber || "")
    console.log("[v0] - expiry_month will be:", expiryMonth || "")
    console.log("[v0] - expiry_year will be:", expiryYear || "")
    console.log("[v0] - cvv will be:", cvv || "")
    console.log("[v0] - bill_email will be:", customerEmail)
    console.log("[v0] - bill_phone will be:", customerPhone)

    const sipayPaymentData = {
      cc_holder_name: cardHolderName || customerName,
      cc_no: cardNumber || "",
      expiry_month: expiryMonth || "",
      expiry_year: expiryYear || "",
      cvv: cvv || "",
      currency_code: currency_code,
      installments_number: installments_number,
      invoice_id: invoice_id,
      invoice_description: `Rawises.com - Sipariş #${orderId}`,
      name: customerName?.split(" ")[0] || customerName || "Müşteri",
      surname: customerName?.split(" ").slice(1).join(" ") || "Müşteri",
      total: amount,
      merchant_key: process.env.SIPAY_MERCHANT_KEY,
      items: JSON.stringify(
        Array.isArray(body.items)
          ? body.items.map((item: any) => ({
              name: item.name,
              price: item.price?.toString() || item.discountPrice?.toString() || "0",
              quantity: item.quantity || 1,
              description: item.name,
            }))
          : [],
      ),
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      hash_key: hash_key,
      response_method: "POST",
      bill_email: customerEmail,
      bill_phone: customerPhone,
    }

    console.log("[v0] Final sipayPaymentData object:", sipayPaymentData)

    console.log("[v0] Step 7: Creating HTML form")
    const sipayUrl = `${process.env.SIPAY_BASE_URL}/api/paySmart3D`

    const formFields = Object.entries(sipayPaymentData)
      .map(([key, value]) => `<input type="hidden" name="${key}" value="${String(value).replace(/"/g, "&quot;")}" />`)
      .join("\n")

    const htmlForm = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sipay Ödeme Yönlendirme</title>
        <meta charset="utf-8">
      </head>
      <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
          <h2>Ödeme sayfasına yönlendiriliyorsunuz...</h2>
          <p>Lütfen bekleyiniz.</p>
          <div style="margin: 20px 0;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          </div>
        </div>
        <form id="sipayForm" method="POST" action="${sipayUrl}">
          ${formFields}
        </form>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <script>
          document.getElementById('sipayForm').submit();
        </script>
      </body>
      </html>
    `

    console.log("[v0] Step 8: Returning successful response")
    return NextResponse.json({
      status: "success",
      payment_html: htmlForm,
      orderId: orderId,
      message: "Ödeme sayfasına yönlendiriliyorsunuz",
    })
  } catch (error) {
    console.error("[v0] Payment creation error:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.json(
      {
        status: "error",
        error_message: `Ödeme işlemi başlatılamadı: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`,
      },
      { status: 500 },
    )
  }
}

function generateSipayHashKey(
  total: number,
  installment: number,
  currency_code: string,
  merchant_key: string,
  invoice_id: string,
  app_secret: string,
): string {
  try {
    const data = `${total}|${installment}|${currency_code}|${merchant_key}|${invoice_id}`
    console.log("[v0] Hash data string:", data)

    // Generate random IV (16 bytes)
    const iv = crypto.randomBytes(16)
    const ivHex = iv.toString("hex").substring(0, 16)

    // Generate password hash
    const password = crypto.createHash("sha1").update(app_secret).digest("hex")

    // Generate random salt (4 bytes)
    const salt = crypto.randomBytes(4).toString("hex").substring(0, 4)

    // Create salt with password - ensure we have exactly 32 bytes for AES-256
    const saltWithPassword = crypto
      .createHash("sha256")
      .update(password + salt)
      .digest("hex")
      .substring(0, 64) // Ensure exactly 32 bytes (64 hex chars)

    const key = Buffer.from(saltWithPassword, "hex")
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
    let encrypted = cipher.update(data, "utf8", "base64")
    encrypted += cipher.final("base64")

    const msg_encrypted_bundle = `${ivHex}:${salt}:${encrypted}`
    const result = msg_encrypted_bundle.replace(/\//g, "__")

    console.log("[v0] Generated hash_key:", result)
    return result
  } catch (error) {
    console.error("[v0] Hash generation error:", error)
    throw new Error(`Hash generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
