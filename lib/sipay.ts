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
  merchantId: "13174794",
  merchantKey: "$2y$10$RwIRCb8UmjFrv6LR3kdJ0ePwxNPkKFQi1hC7xzHOm07w18lWIOPtO",
  appId: "11ac0243ff9c07f67704f9ec8880d002",
  appSecret: "ecd2a1cd72e98bec991e4d92e71bcb67",
  baseUrl: "https://app.sipay.com.tr/ccpayment",
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
    (item.price * 100).toString(), // Kuruş cinsinden
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
  // Bu fonksiyon sunucu tarafında çalışır
  const crypto = require("crypto")

  const basketStr = formatUserBasket(orderData.items)
  const amountInKurus = (orderData.amount * 100).toString()

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
  const amountInKurus = (orderData.amount * 100).toString()

  return {
    merchant_id: sipayConfig.merchantId,
    merchant_oid: orderData.orderId,
    email: orderData.email,
    payment_amount: amountInKurus,
    currency: "TL",
    test_mode: "1", // Test modu - canlıda "0" olacak
    non_3d: "0", // 3D Secure aktif
    merchant_ok_url: `${typeof window !== "undefined" ? window.location.origin : "https://rawises.com"}/payment/success`,
    merchant_fail_url: `${typeof window !== "undefined" ? window.location.origin : "https://rawises.com"}/payment/failed`,
    user_name: orderData.userName,
    user_address: orderData.userAddress,
    user_phone: orderData.userPhone,
    user_basket: basketStr,
    debug_on: "1", // Test için debug açık
    client_lang: "tr",
  }
}
