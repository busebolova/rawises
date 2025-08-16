import crypto from "crypto" // Added ES6 import for crypto module

export interface SipayConfig {
  merchantId: string
  merchantKey: string
  appId: string
  appSecret: string
  baseUrl: string
}

export interface SipayPaymentRequest {
  merchant_id: string
  merchant_key: string
  merchant_oid: string
  email: string
  payment_amount: string
  currency: string
  test_mode: string
  non_3d: string
  merchant_ok_url: string
  merchant_fail_url: string
  user_name: string
  user_address: string
  user_phone: string
  user_basket: string
  debug_on: string
  client_lang: string
  paytr_token: string
}

export interface CartItem {
  name: string
  price: number
  quantity: number
}

export const sipayConfig: SipayConfig = {
  merchantId: process.env.SIPAY_MERCHANT_ID || "13174794",
  merchantKey: process.env.SIPAY_MERCHANT_KEY || "$2y$10$RwIRCb8UmjFrv6LR3kdJ0ePwxNPkKFQi1hC7xzHOm07w18lWIOPtO",
  appId: process.env.SIPAY_APP_KEY || "11ac0243ff9c07f67704f9ec8880d002",
  appSecret: process.env.SIPAY_APP_SECRET || "ecd2a1cd72e98bec991e4d92e71bcb67",
  baseUrl: process.env.SIPAY_BASE_URL || "https://app.sipay.com.tr/ccpayment",
}

export function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `RW${timestamp}${random}`
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function formatUserBasket(items: CartItem[]): string {
  const basketItems = items.map((item) => [
    item.name,
    (item.price * 100).toString(), // Kuruş cinsinden (KDV hariç)
    item.quantity.toString(),
  ])

  return JSON.stringify(basketItems)
}

export function generateSipayToken(orderData: {
  orderId: string
  email: string
  amount: number
  userName: string
  userAddress: string
  userPhone: string
  items: CartItem[]
}): string {
  const basketStr = formatUserBasket(orderData.items)
  const amountInKurus = (orderData.amount * 100).toString() // KDV hariç tutar

  // Token oluşturma string'i
  const tokenString = `${sipayConfig.merchantId}${orderData.orderId}${amountInKurus}${orderData.email}${sipayConfig.merchantKey}`

  // HMAC-SHA256 ile token oluştur
  const token = crypto.createHmac("sha256", sipayConfig.merchantKey).update(tokenString).digest("base64")

  return token
}

export function createSipayPaymentData(orderData: {
  orderId: string
  email: string
  amount: number
  userName: string
  userAddress: string
  userPhone: string
  items: CartItem[]
}): Partial<SipayPaymentRequest> {
  const basketStr = formatUserBasket(orderData.items)
  const amountInKurus = (orderData.amount * 100).toString() // KDV hariç tutar kuruş cinsinden

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rawises.com"
  const successUrl = `${baseUrl}/payment/success`
  const failUrl = `${baseUrl}/payment/failed`

  console.log("[v0] Base URL:", baseUrl)
  console.log("[v0] Success URL:", successUrl)
  console.log("[v0] Fail URL:", failUrl)

  return {
    merchant_id: sipayConfig.merchantId,
    merchant_oid: orderData.orderId,
    email: orderData.email,
    payment_amount: amountInKurus, // KDV hariç tutar
    currency: "TL",
    test_mode: "1", // Test modu - canlıda "0" olacak
    non_3d: "0", // 3D Secure aktif
    merchant_ok_url: successUrl,
    merchant_fail_url: failUrl,
    user_name: orderData.userName,
    user_address: orderData.userAddress,
    user_phone: orderData.userPhone,
    user_basket: basketStr,
    debug_on: "1", // Test için debug açık
    client_lang: "tr",
  }
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

    // Make API call to create payment (token generation happens server-side)
    const response = await fetch("/api/payment/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    })

    const result = await response.json()

    if (response.ok && result.status === "success") {
      return {
        status: "success",
        payment_url: result.payment_url,
      }
    } else {
      return {
        status: "error",
        error_message: result.error_message || "Ödeme oluşturulamadı",
      }
    }
  } catch (error) {
    console.error("Sipay createPayment error:", error)
    return {
      status: "error",
      error_message: "Ödeme işlemi sırasında bir hata oluştu",
    }
  }
}

export const sipayService = {
  config: sipayConfig,
  generateOrderId,
  calculateTotal,
  formatUserBasket,
  generateSipayToken,
  createSipayPaymentData,
  createPayment, // Added createPayment method to service
}
