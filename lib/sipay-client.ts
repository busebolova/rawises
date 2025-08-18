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
  cardNumber?: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
  cardHolderName?: string
}): Promise<{
  status: string
  payment_html?: string
  error_message?: string
}> {
  try {
    const cartItems: CartItem[] = [
      {
        name: orderData.productName,
        price: orderData.amount,
        quantity: 1,
      },
    ]

    const apiPayload = {
      orderId: orderData.orderId,
      amount: orderData.amount,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      productName: orderData.productName,
      productDescription: orderData.productDescription,
      items: cartItems,
      cardNumber: orderData.cardNumber,
      expiryMonth: orderData.expiryMonth,
      expiryYear: orderData.expiryYear,
      cvv: orderData.cvv,
      cardHolderName: orderData.cardHolderName,
    }

    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    })

    const responseText = await response.text()

    if (!responseText) {
      return {
        status: "error",
        error_message: "Sunucudan boş yanıt alındı",
      }
    }

    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      return {
        status: "error",
        error_message: `Sunucu yanıtı geçersiz: ${responseText.substring(0, 100)}`,
      }
    }

    if (response.ok && result.status === "success") {
      return {
        status: "success",
        payment_html: result.payment_html,
      }
    } else {
      return {
        status: "error",
        error_message: result.error_message || "Sipay ödeme hatası",
      }
    }
  } catch (error) {
    return {
      status: "error",
      error_message: `Ödeme işlemi sırasında hata: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`,
    }
  }
}

export const sipayService = {
  config: sipayConfig,
  generateOrderId,
  calculateTotal,
  createPayment,
}
