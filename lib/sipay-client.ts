export interface SipayConfig {
  merchantId: string
  baseUrl: string
}

export interface CartItem {
  name: string
  price: number
  quantity: number
}

export const sipayConfig: SipayConfig = {
  merchantId: process.env.NEXT_PUBLIC_SIPAY_MERCHANT_ID || "13174794",
  baseUrl: process.env.NEXT_PUBLIC_SIPAY_BASE_URL || "https://app.sipay.com.tr/ccpayment",
}

export function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `RW${timestamp}${random}`
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export async function createPayment(orderData: {
  orderId: string
  amount: number
  customerName: string
  customerEmail: string
  customerPhone: string
  productName: string
  productDescription: string
}): Promise<{
  status: string
  payment_url?: string
  error_message?: string
}> {
  try {
    console.log("[v0] Starting payment creation with data:", orderData)

    // Convert cart items format for Sipay
    const cartItems: CartItem[] = [
      {
        name: orderData.productName,
        price: orderData.amount,
        quantity: 1,
      },
    ]

    // Prepare order data for API
    const apiPayload = {
      orderId: orderData.orderId,
      email: orderData.customerEmail,
      amount: orderData.amount,
      userName: orderData.customerName,
      userAddress: orderData.customerPhone, // Using phone as address for now
      userPhone: orderData.customerPhone,
      items: cartItems,
    }

    console.log("[v0] API payload:", apiPayload)

    // Make API call to create payment (token generation happens server-side)
    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    })

    console.log("[v0] API response status:", response.status)
    console.log("[v0] API response ok:", response.ok)

    let result
    const responseText = await response.text()
    console.log("[v0] Raw response text:", responseText.substring(0, 500))

    try {
      result = JSON.parse(responseText)
      console.log("[v0] Parsed response:", result)
    } catch (parseError) {
      console.error("[v0] Failed to parse response as JSON:", parseError)
      return {
        status: "error",
        error_message: `Sunucu yanıtı işlenemedi: ${responseText.substring(0, 100)}...`,
      }
    }

    if (response.ok && result.status === "success") {
      console.log("[v0] Payment creation successful")
      return {
        status: "success",
        payment_url: result.payment_url,
      }
    } else {
      console.error("[v0] Payment creation failed:", result)
      return {
        status: "error",
        error_message: result.error_message || result.message || "Ödeme oluşturulamadı",
      }
    }
  } catch (error) {
    console.error("[v0] Sipay createPayment error:", error)
    return {
      status: "error",
      error_message: `Ödeme işlemi sırasında bir hata oluştu: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`,
    }
  }
}

export const sipayService = {
  config: sipayConfig,
  generateOrderId,
  calculateTotal,
  createPayment,
}
