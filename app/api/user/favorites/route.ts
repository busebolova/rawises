import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Basit in-memory favorites store (production'da database kullanın)
const userFavorites: Record<string, any[]> = {
  "demo@rawises.com": [
    {
      id: "fav-1",
      name: "Charlotte Tilbury Magic Cream",
      image: "/placeholder.svg?height=150&width=150",
      price: "899.99",
      brand: "Charlotte Tilbury",
    },
    {
      id: "fav-2",
      name: "Fenty Beauty Pro Filt'r Foundation",
      image: "/placeholder.svg?height=150&width=150",
      price: "459.99",
      brand: "Fenty Beauty",
    },
    {
      id: "fav-3",
      name: "Drunk Elephant C-Firma Vitamin C Serum",
      image: "/placeholder.svg?height=150&width=150",
      price: "679.99",
      brand: "Drunk Elephant",
    },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const favorites = userFavorites[session.user.email] || []

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error("Favorites fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, name, image, price, brand } = body

    if (!userFavorites[session.user.email]) {
      userFavorites[session.user.email] = []
    }

    // Check if already in favorites
    const existingIndex = userFavorites[session.user.email].findIndex((fav) => fav.id === productId)

    if (existingIndex > -1) {
      // Remove from favorites
      userFavorites[session.user.email].splice(existingIndex, 1)
      return NextResponse.json({ message: "Removed from favorites", action: "removed" })
    } else {
      // Add to favorites
      userFavorites[session.user.email].push({
        id: productId,
        name,
        image,
        price,
        brand,
      })
      return NextResponse.json({ message: "Added to favorites", action: "added" })
    }
  } catch (error) {
    console.error("Favorites update error:", error)
    return NextResponse.json({ error: "Failed to update favorites" }, { status: 500 })
  }
}
