"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Gift, Truck, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PromotionalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    {
      id: 1,
      icon: <Gift className="w-6 h-6" />,
      title: "Anneler Günü'ne Özel",
      subtitle: "Sepette Ek %60 İndirim",
      description: "Tüm makyaj ürünlerinde geçerli • Sınırlı süre",
      bgColor: "bg-gradient-to-r from-brand-400 via-brand-500 to-rawises-400",
      textColor: "text-white",
      buttonText: "Hemen Al",
    },
    {
      id: 2,
      icon: <Sparkles className="w-6 h-6" />,
      title: "Yeni Üyelere Özel",
      subtitle: "%25 İndirim Kuponu",
      description: "İlk alışverişinizde geçerli • Ücretsiz üyelik",
      bgColor: "bg-gradient-to-r from-rawises-500 via-rawises-600 to-accent-500",
      textColor: "text-white",
      buttonText: "Üye Ol",
    },
    {
      id: 3,
      icon: <Truck className="w-6 h-6" />,
      title: "500 TL Üzeri",
      subtitle: "Ücretsiz Kargo",
      description: "Tüm Türkiye'ye hızlı teslimat • Aynı gün kargo",
      bgColor: "bg-gradient-to-r from-accent-400 via-rawises-500 to-accent-600",
      textColor: "text-white",
      buttonText: "Alışverişe Başla",
    },
    {
      id: 4,
      icon: <Star className="w-6 h-6" />,
      title: "Premium Markalar",
      subtitle: "En İyi Fiyatlar",
      description: "Orijinal ürünler • Güvenli alışveriş garantisi",
      bgColor: "bg-gradient-to-r from-brand-500 via-rawises-400 to-brand-600",
      textColor: "text-white",
      buttonText: "Keşfet",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleNextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="relative overflow-hidden h-20 group">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${slide.bgColor} ${slide.textColor} w-full flex-shrink-0 flex items-center justify-center px-4 relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-4 w-16 h-16 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-2 right-8 w-12 h-12 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 border border-white/20 rounded-full"></div>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 z-10 px-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">{slide.icon}</div>
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-semibold">{slide.title}</span>
                    <span className="text-xs sm:text-sm font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                      {slide.subtitle}
                    </span>
                  </div>
                  <p className="text-xs opacity-90 hidden sm:block">{slide.description}</p>
                </div>
              </div>

              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                variant="outline"
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handlePrevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleNextSlide}
        disabled={isAnimating}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  )
}
