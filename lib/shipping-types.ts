export type ShippingProviderType = "mng" | "yurtici" | "aras" | "ptt" | "ups"

export type ShipmentStatus =
  | "created"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed_delivery"
  | "returned"

export interface ShippingRate {
  provider: ShippingProviderType
  serviceName: string
  price: number
  estimatedDays: number
  description: string
}

export interface ShippingAddress {
  name: string
  company?: string
  phone: string
  email: string
  street: string
  district: string
  city: string
  postalCode: string
  country: string
}

export interface ShipmentItem {
  productId: string
  productName: string
  quantity: number
  weight: number
  value: number
}

export interface Shipment {
  id: string
  orderId: string
  trackingNumber: string
  provider: ShippingProviderType
  serviceName: string
  status: ShipmentStatus
  sender: ShippingAddress
  recipient: ShippingAddress
  items: ShipmentItem[]
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  shippingCost: number
  insuranceValue: number
  estimatedDelivery: string
  actualDelivery?: string
  notes?: string
  labelUrl?: string
  createdAt: string
  updatedAt: string
  trackingEvents: TrackingEvent[]
}

export interface TrackingEvent {
  id: string
  status: ShipmentStatus
  description: string
  location: string
  timestamp: string
}

export interface ShippingProvider {
  id: ShippingProviderType
  name: string
  logo: string
  isActive: boolean
  apiKey?: string
  apiSecret?: string
  testMode: boolean
  supportedServices: ShippingService[]
}

export interface ShippingService {
  id: string
  name: string
  description: string
  maxWeight: number
  maxDimensions: {
    length: number
    width: number
    height: number
  }
  basePrice: number
  pricePerKg: number
  estimatedDays: number
}

export const SHIPPING_PROVIDERS: Record<ShippingProviderType, string> = {
  mng: "MNG Kargo",
  yurtici: "Yurtiçi Kargo",
  aras: "Aras Kargo",
  ptt: "PTT Kargo",
  ups: "UPS",
}

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  created: "Oluşturuldu",
  picked_up: "Alındı",
  in_transit: "Yolda",
  out_for_delivery: "Dağıtımda",
  delivered: "Teslim Edildi",
  failed_delivery: "Teslimat Başarısız",
  returned: "İade Edildi",
}

export const SHIPMENT_STATUS_COLORS: Record<ShipmentStatus, string> = {
  created: "bg-gray-100 text-gray-800",
  picked_up: "bg-blue-100 text-blue-800",
  in_transit: "bg-yellow-100 text-yellow-800",
  out_for_delivery: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
  failed_delivery: "bg-red-100 text-red-800",
  returned: "bg-purple-100 text-purple-800",
}
