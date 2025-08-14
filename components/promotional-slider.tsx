"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Gift, Truck, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PromotionalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    {
      id: 1,
      icon: <Gift className="w-4 h-4 sm:w-6 sm:h-6" />,
      // title: "Anneler Günü'ne Özel", // Kaldırıldı
      // subtitle: "Sepette Ek %60 İndirim", // Kaldırıldı
      // description: "Tüm makyaj ürünlerinde geçerli", // Kaldırıldı
      bgColor: "bg-gradient-to-r from-brand-400 via-brand-500 to-rawises-400",
      textColor: "text-white",
      buttonText: "Hemen Al",
      link: "/category?category=makyaj",
    },
    {
      id: 2,
      icon: <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />,
      // title: "Yeni Üyelere Özel", // Kaldırıldı
      // subtitle: "%25 İndirim Kuponu", // Kaldırıldı
      // description: "İlk alışverişinizde geçerli", // Kaldırıldı
      bgColor: "bg-gradient-to-r from-rawises-500 via-rawises-600 to-accent-500",
      textColor: "text-white",
      buttonText: "Üye Ol",
      link: "/login",
    },
    {
      id: 3,
      icon: <Truck className="w-4 h-4 sm:w-6 sm:h-6" />,
      // title: "500 TL Üzeri", // Kaldırıldı
      // subtitle: "Ücretsiz Kargo", // Kaldırıldı
      // description: "Tüm Türkiye'ye hızlı teslimat", // Kaldırıldı
      bgColor: "bg-gradient-to-r from-accent-400 via-rawises-500 to-accent-600",
      textColor: "text-white",
      buttonText: "Alışverişe Başla",
      link: "/",
    },
    {
      id: 4,
      icon: <Star className="w-4 h-4 sm:w-6 sm:h-6" />,
      // title: "Premium Markalar", // Kaldırıldı
      // subtitle: "En İyi Fiyatlar", // Kaldırıldı
      // description: "Orijinal ürünler garantisi", // Kaldırıldı
      bgColor: "bg-gradient-to-r from-brand-500 via-rawises-400 to-brand-600",
      textColor: "text-white",
      buttonText: "Keşfet",
      link: "/",
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
    <div className="relative overflow-hidden h-16 sm:h-20 group">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${slide.bgColor} ${slide.textColor} w-full flex-shrink-0 flex items-center justify-center px-2 sm:px-4 relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1 left-2 sm:top-2 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-1 right-4 sm:bottom-2 sm:right-8 w-6 h-6 sm:w-12 sm:h-12 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-4 h-4 sm:w-8 sm:h-8 border border-white/20 rounded-full"></div>
            </div>

            <div className="flex items-center justify-center w-full max-w-6xl mx-auto z-10 gap-4"> {/* justify-center eklendi */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">{slide.icon}</div>
                {/* Metin alanları kaldırıldı */}
              </div>

              <Link href={slide.link}>
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                  variant="outline"
                >
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons - Hidden on mobile */}
      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handlePrevSlide}
        disabled={isAnimating}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
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
