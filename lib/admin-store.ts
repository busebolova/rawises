import { createClient } from "@/lib/supabase/client"
import { create } from "zustand"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock_quantity: number
  category: string
  image_url: string
  sku: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  status: string
  shipping_address: any
  created_at: string
  updated_at: string
  order_items?: Array<{
    id: string
    product_id: string
    quantity: number
    unit_price: number
    total_price: number
  }>
}

interface AdminStore {
  products: Product[]
  orders: Order[]
  stats: {
    totalProducts: number
    totalOrders: number
    totalSales: number
    activeCustomers: number
  }
  isLoading: boolean
  error: string | null

  // Actions
  fetchProducts: () => Promise<void>
  fetchOrders: () => Promise<void>
  fetchStats: () => Promise<void>
  addProduct: (product: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  updateOrderStatus: (id: string, status: string) => Promise<void>
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  products: [],
  orders: [],
  stats: {
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    activeCustomers: 0,
  },
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error

      set({
        products: data || [],
        stats: { ...get().stats, totalProducts: data?.length || 0 },
      })
      console.log("[v0] Fetched products from Supabase:", data?.length)
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
      set({ error: error instanceof Error ? error.message : "Failed to fetch products" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            id,
            product_id,
            quantity,
            unit_price,
            total_price
          )
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const totalSales = data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
      const activeCustomers = new Set(data?.map((order) => order.customer_email)).size

      set({
        orders: data || [],
        stats: {
          ...get().stats,
          totalOrders: data?.length || 0,
          totalSales,
          activeCustomers,
        },
      })
      console.log("[v0] Fetched orders from Supabase:", data?.length)
    } catch (error) {
      console.error("[v0] Error fetching orders:", error)
      set({ error: error instanceof Error ? error.message : "Failed to fetch orders" })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStats: async () => {
    const { fetchProducts, fetchOrders } = get()
    await Promise.all([fetchProducts(), fetchOrders()])
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").insert([productData]).select().single()

      if (error) throw error

      set((state) => ({
        products: [data, ...state.products],
        stats: { ...state.stats, totalProducts: state.stats.totalProducts + 1 },
      }))
      console.log("[v0] Added product to Supabase:", data.name)
    } catch (error) {
      console.error("[v0] Error adding product:", error)
      set({ error: error instanceof Error ? error.message : "Failed to add product" })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateProduct: async (id, updates) => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("products")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      set((state) => ({
        products: state.products.map((p) => (p.id === id ? data : p)),
      }))
      console.log("[v0] Updated product in Supabase:", data.name)
    } catch (error) {
      console.error("[v0] Error updating product:", error)
      set({ error: error instanceof Error ? error.message : "Failed to update product" })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error

      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        stats: { ...state.stats, totalProducts: state.stats.totalProducts - 1 },
      }))
      console.log("[v0] Deleted product from Supabase:", id)
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
      set({ error: error instanceof Error ? error.message : "Failed to delete product" })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ isLoading: true, error: null })
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? data : o)),
      }))
      console.log("[v0] Updated order status in Supabase:", status)
    } catch (error) {
      console.error("[v0] Error updating order:", error)
      set({ error: error instanceof Error ? error.message : "Failed to update order" })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
}))
