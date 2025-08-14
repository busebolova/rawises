"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Gift, Sparkles, Heart } from "lucide-react"

export function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen welcome screen before
    const hasSeenWelcome = typeof window !== "undefined" ? localStorage.getItem("hasSeenWelcome") : null
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenWelcome", "true")
    }
  }

  const handleStartShopping = () => {
    setIsVisible(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenWelcome", "true")
    }
    // Scroll to products section
    const productsSection = document.getElementById("featured-products")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in-0 zoom-in-95 duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="text-center space-y-6">
          <div className="flex justify-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rawises'e Hoş Geldiniz! 🎉</h2>
            <p className="text-gray-600">Size güzel bakıyoruz! En kaliteli güzellik ürünlerini keşfedin.</p>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎁 Hoş Geldin Hediyesi</h3>
            <p className="text-sm text-gray-600">
              İlk siparişinizde <span className="font-bold text-teal-600">%20 indirim</span> kazanın!
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleStartShopping}
              className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white font-medium py-3"
            >
              Alışverişe Başla
            </Button>
            <Button variant="outline" onClick={handleClose} className="w-full bg-transparent">
              Daha Sonra
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
