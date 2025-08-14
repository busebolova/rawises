"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome screen before
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenWelcome", "true")
  }

  const handleContinue = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenWelcome", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
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
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Rawises'e Hoş Geldiniz!</h1>
            <p className="text-gray-600">Size güzel bakıyoruz ✨</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-rawises-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">Orijinal ürün garantisi ile güvenli alışveriş</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-rawises-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">500 TL üzeri siparişlerde ücretsiz kargo</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-rawises-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">Hızlı teslimat ve kolay iade</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-rawises-500 to-rawises-600 hover:from-rawises-600 hover:to-rawises-700"
          >
            Alışverişe Başla
          </Button>
        </div>
      </div>
    </div>
  )
}
