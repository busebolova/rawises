export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  brand: string
  sku: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    district: string
    postalCode: string
    country: string
  }
}

export interface OrderShipping {
  method: string
  company: string
  trackingNumber?: string
  estimatedDelivery?: string
  shippingCost: number
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shipping: OrderShipping
  notes?: string
  createdAt: string
  updatedAt: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Beklemede",
  confirmed: "Onaylandı",
  processing: "Hazırlanıyor",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
  refunded: "İade Edildi",
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
}
