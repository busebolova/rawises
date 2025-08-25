"use client"

import { useState, useEffect } from "react"
import { Sparkles, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onComplete: () => void
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500)
    const timer2 = setTimeout(() => setAnimationStep(2), 1000)
    const timer3 = setTimeout(() => setAnimationStep(3), 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleEnter = () => {
    setIsVisible(false)
    // Animasyon tamamlandıktan sonra parent'a bildir
    setTimeout(() => {
      onComplete()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-purple-400 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 border-2 border-pink-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-purple-300 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-pink-400 animate-bounce delay-100" />
        <Heart className="absolute top-1/3 right-1/3 w-5 h-5 text-purple-400 animate-bounce delay-300" />
        <Star className="absolute bottom-1/3 left-1/3 w-4 h-4 text-pink-500 animate-bounce delay-500" />
        <Sparkles className="absolute bottom-1/4 right-1/4 w-5 h-5 text-purple-500 animate-bounce delay-700" />
      </div>

      <div className="text-center px-4 max-w-2xl mx-auto">
        {/* Logo */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${
            animationStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="relative animate-bounce">
              <div className="h-12 sm:h-16 w-auto drop-shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-bold text-2xl flex items-center justify-center px-6">
                RAWISES
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Main Text */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-300 ${
            animationStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Size Güzel Bakıyoruz!
            </h1>

            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>

          <p className="text-lg sm:text-xl text-gray-700 mt-8 font-medium leading-relaxed">
            Güzelliğinizi öne çıkaran en kaliteli kozmetik ürünleri ile tanışın
          </p>
        </div>

        {/* Features */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-500 ${
            animationStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Premium Kalite</h3>
              <p className="text-sm text-gray-600">Orijinal ve kaliteli ürünler</p>
            </div>

            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Güvenli Alışveriş</h3>
              <p className="text-sm text-gray-600">%100 güvenli ödeme sistemi</p>
            </div>

            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hızlı Teslimat</h3>
              <p className="text-sm text-gray-600">Aynı gün kargo imkanı</p>
            </div>
          </div>
        </div>

        {/* Enter Button */}
        <div
          className={`transform transition-all duration-1000 delay-700 ${
            animationStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button
            onClick={handleEnter}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 animate-pulse"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Alışverişe Başla
            <Heart className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-gray-600 mt-4 opacity-75">Güzelliğinizi keşfetmeye hazır mısınız?</p>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleEnter}
        className="absolute top-6 right-6 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30"
      >
        Geç →
      </button>
    </div>
  )
}
