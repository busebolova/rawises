export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }[]
  shippingAddress: {
    name: string
    address: string
    city: string
    district: string
    postalCode: string
    phone: string
  }
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "RW-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.9,
    items: [
      {
        id: "1",
        name: "Maybelline New York Fit Me Matte + Poreless Fondöten",
        image: "/placeholder.svg?height=100&width=100",
        price: 149.95,
        quantity: 2,
      },
    ],
    shippingAddress: {
      name: "Demo Kullanıcı",
      address: "Demo Adres Mahallesi, Demo Sokak No:1",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      phone: "+90 555 123 4567",
    },
  },
  {
    id: "2",
    orderNumber: "RW-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 189.9,
    items: [
      {
        id: "2",
        name: "L'Oréal Paris True Match Fondöten",
        image: "/placeholder.svg?height=100&width=100",
        price: 189.9,
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "Demo Kullanıcı",
      address: "Demo Adres Mahallesi, Demo Sokak No:1",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
      phone: "+90 555 123 4567",
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, filter orders by user ID
    const userOrders = mockOrders

    return NextResponse.json({
      success: true,
      orders: userOrders,
    })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, total } = body

    // Create new order
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `RW-${new Date().getFullYear()}-${String(mockOrders.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      total,
      items,
      shippingAddress,
    }

    mockOrders.push(newOrder)

    return NextResponse.json({
      success: true,
      message: "Siparişiniz başarıyla oluşturuldu",
      order: newOrder,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
