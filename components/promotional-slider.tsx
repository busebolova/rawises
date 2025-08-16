"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PromotionalSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const products = [
    {
      id: 1,
      name: "Koleston Supreme Saç Boyası",
      originalPrice: "140.50 TL",
      discountPrice: "98 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "30%",
    },
    {
      id: 2,
      name: "Ponza Taşı (Topuk Taşı)",
      originalPrice: "170 TL",
      discountPrice: "79 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "53%",
    },
    {
      id: 3,
      name: "Gabrini Mat Oje M15",
      originalPrice: "105 TL",
      discountPrice: "73 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "30%",
    },
    {
      id: 4,
      name: "Doruk Vazelin Gül Özlü 90 Ml",
      originalPrice: "100 TL",
      discountPrice: "81 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "19%",
    },
    {
      id: 5,
      name: "Sabit Gül Kolonyası",
      originalPrice: "215 TL",
      discountPrice: "74 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "66%",
    },
    {
      id: 6,
      name: "Gabrini Oje B12",
      originalPrice: "105 TL",
      discountPrice: "73 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "30%",
    },
    {
      id: 7,
      name: "Makyaj Fırça Seti",
      originalPrice: "180 TL",
      discountPrice: "120 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "33%",
    },
    {
      id: 8,
      name: "Yüz Kremi",
      originalPrice: "95 TL",
      discountPrice: "65 TL",
      image: "/placeholder.svg?height=200&width=200",
      discount: "32%",
    },
  ]

  const itemsPerView = 4
  const maxSlide = Math.max(0, Math.ceil(products.length / itemsPerView) - 1)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const handleNextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getCurrentProducts = () => {
    const startIndex = currentSlide * itemsPerView
    return products.slice(startIndex, startIndex + itemsPerView)
  }

  return (
    <div className="bg-gradient-to-r from-rawises-300 to-rawises-400 py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-12">
          <div className="flex-shrink-0 w-72">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 mb-4 inline-block">
              <span className="text-rawises-800 font-bold text-lg">Rawises</span>
            </div>

            <div className="text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">Üyelere Özel</h2>
              <h3 className="text-xl mb-4">Tüm Ürünlerde Sepette</h3>

              <div className="bg-white rounded-2xl px-6 py-3 inline-block mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-rawises-600 to-purple-600 bg-clip-text text-transparent">
                  EK İNDİRİM
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-sm">
              <p>
                Bu kampanya yalnızca rawises.com'a üye olan kullanıcılar için geçerlidir. Kampanya, 4-31 Nisan 2025
                tarihleri arasında geçerlidir.
              </p>
            </div>
          </div>

          <div className="flex-1 relative group">
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              {getCurrentProducts() &&
                getCurrentProducts().map((product) => (
                  <Card
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="p-4">
                      <div className="relative mb-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          %{product.discount}
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-800 mb-2 text-sm line-clamp-2">{product.name}</h4>

                      <div className="mb-3">
                        <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
                        <div className="text-purple-600 font-bold text-base">{product.discountPrice}</div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-rawises-500 to-purple-600 hover:from-rawises-600 hover:to-purple-700 text-white py-2 text-sm">
                        Sepete Ekle
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm rounded-full"
              onClick={handlePrevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 p-2 h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm rounded-full"
              onClick={handleNextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
