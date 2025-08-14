import { type NextRequest, NextResponse } from "next/server"

// Mock chat history
const mockChatHistory = [
  {
    id: "1",
    message: "Merhaba, size nasıl yardımcı olabilirim?",
    sender: "support",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "2",
    message: "iPhone 15 Pro'nun stok durumu hakkında bilgi alabilir miyim?",
    sender: "user",
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: "3",
    message: "Tabii ki! iPhone 15 Pro şu anda stokta mevcut. Hangi renk ve depolama kapasitesini tercih ediyorsunuz?",
    sender: "support",
    timestamp: new Date(Date.now() - 3400000),
  },
  {
    id: "4",
    message: "128GB Space Black modelini istiyorum.",
    sender: "user",
    timestamp: new Date(Date.now() - 3300000),
  },
  {
    id: "5",
    message: "Mükemmel seçim! Bu model stokta mevcut. Sipariş vermek ister misiniz?",
    sender: "support",
    timestamp: new Date(Date.now() - 3200000),
  },
]

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would:
    // 1. Get user ID from session
    // 2. Fetch chat history from database
    // 3. Apply pagination

    return NextResponse.json({
      messages: mockChatHistory,
      total: mockChatHistory.length,
    })
  } catch (error) {
    console.error("Error fetching chat history:", error)
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 })
  }
}
