#!/usr/bin/env node

/**
 * Real-time Events Simulation Script
 * Bu script gerçek zamanlı olayları simüle eder
 */

const events = {
  notifications: [
    {
      type: "order",
      title: "Yeni Sipariş",
      message: "Sipariş #12345 başarıyla oluşturuldu.",
    },
    {
      type: "stock",
      title: "Stok Uyarısı",
      message: "iPhone 15 Pro stoku kritik seviyede!",
    },
    {
      type: "campaign",
      title: "Yeni Kampanya",
      message: "Elektronik ürünlerde %25 indirim başladı!",
    },
    {
      type: "system",
      title: "Sistem Bildirimi",
      message: "Bakım çalışması 02:00-04:00 arası yapılacak.",
    },
  ],

  chatMessages: [
    "Merhaba, size nasıl yardımcı olabilirim?",
    "Ürün hakkında daha fazla bilgi alabilir miyim?",
    "Kargo süresi ne kadar?",
    "İade politikanız nasıl?",
    "Teşekkür ederiz, iyi günler!",
  ],

  stockUpdates: [
    { productId: "iphone-15-pro", stock: 15, trend: "down" },
    { productId: "macbook-air-m2", stock: 8, trend: "up" },
    { productId: "airpods-pro", stock: 25, trend: "stable" },
    { productId: "ipad-pro", stock: 3, trend: "down" },
  ],
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function simulateNotification() {
  const notification = getRandomItem(events.notifications)
  console.log(`📢 [${new Date().toLocaleTimeString()}] NOTIFICATION:`)
  console.log(`   Type: ${notification.type}`)
  console.log(`   Title: ${notification.title}`)
  console.log(`   Message: ${notification.message}`)
  console.log("")
}

function simulateChatMessage() {
  const message = getRandomItem(events.chatMessages)
  const sender = Math.random() > 0.5 ? "user" : "support"
  console.log(`💬 [${new Date().toLocaleTimeString()}] CHAT MESSAGE:`)
  console.log(`   Sender: ${sender}`)
  console.log(`   Message: ${message}`)
  console.log("")
}

function simulateStockUpdate() {
  const update = getRandomItem(events.stockUpdates)
  const newStock = Math.max(0, update.stock + Math.floor(Math.random() * 10) - 5)
  const trends = ["up", "down", "stable"]
  const newTrend = getRandomItem(trends)

  console.log(`📦 [${new Date().toLocaleTimeString()}] STOCK UPDATE:`)
  console.log(`   Product: ${update.productId}`)
  console.log(`   Stock: ${update.stock} → ${newStock}`)
  console.log(`   Trend: ${newTrend}`)
  console.log("")
}

function simulateUserCount() {
  const count = Math.floor(Math.random() * 150) + 50
  console.log(`👥 [${new Date().toLocaleTimeString()}] USER COUNT: ${count} online`)
  console.log("")
}

function startSimulation() {
  console.log("🚀 Real-time Events Simulation Started")
  console.log("=====================================")
  console.log("")

  // Initial events
  simulateNotification()
  simulateStockUpdate()
  simulateUserCount()

  // Periodic events
  setInterval(() => {
    const eventType = Math.random()

    if (eventType < 0.3) {
      simulateNotification()
    } else if (eventType < 0.6) {
      simulateChatMessage()
    } else if (eventType < 0.9) {
      simulateStockUpdate()
    } else {
      simulateUserCount()
    }
  }, 3000)

  // User count updates more frequently
  setInterval(simulateUserCount, 10000)

  console.log("Press Ctrl+C to stop simulation")
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Simulation stopped")
  process.exit(0)
})

// Start simulation
startSimulation()
