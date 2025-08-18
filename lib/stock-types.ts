export type StockMovementType = "in" | "out" | "adjustment" | "transfer"

export interface StockMovement {
  id: string
  productId: string
  productName: string
  productSku: string
  type: StockMovementType
  quantity: number
  warehouse: "main" | "adana"
  reason: string
  notes?: string
  userId: string
  userName: string
  createdAt: string
}

export interface StockAlert {
  id: string
  productId: string
  productName: string
  productSku: string
  currentStock: number
  minStockLevel: number
  warehouse: "main" | "adana"
  severity: "low" | "critical" | "out"
  createdAt: string
}

export interface WarehouseStock {
  warehouse: "main" | "adana"
  warehouseName: string
  totalProducts: number
  totalStock: number
  lowStockCount: number
  outOfStockCount: number
}

export const STOCK_MOVEMENT_LABELS: Record<StockMovementType, string> = {
  in: "Stok Girişi",
  out: "Stok Çıkışı",
  adjustment: "Stok Düzeltmesi",
  transfer: "Depo Transferi",
}

export const STOCK_MOVEMENT_COLORS: Record<StockMovementType, string> = {
  in: "bg-green-100 text-green-800",
  out: "bg-red-100 text-red-800",
  adjustment: "bg-blue-100 text-blue-800",
  transfer: "bg-purple-100 text-purple-800",
}

export const WAREHOUSE_LABELS = {
  main: "Ana Depo",
  adana: "Adana Depo",
}
