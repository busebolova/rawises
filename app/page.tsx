"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/csv-parser"

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkWelcomeStatus = () => {
      try {
        const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
        console.log("[v0] Welcome status check:", hasSeenWelcome)

        if (hasSeenWelcome === "true") {
          setShowWelcome(false)
        }
      } catch (error) {
        console.log("[v0] localStorage not available, showing welcome screen")
        setShowWelcome(true)
      }
      setIsLoading(false)
    }

    setTimeout(checkWelcomeStatus, 100)
  }, [])

  useEffect(() => {
    const handleOpenProductDetail = (event: CustomEvent) => {
      setSelectedProduct(event.detail.product)
      setIsModalOpen(true)
    }

    window.addEventListener("openProductDetail", handleOpenProductDetail as EventListener)

    return () => {
      window.removeEventListener("openProductDetail", handleOpenProductDetail as EventListener)
    }
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleWelcomeComplete = () => {
    console.log("[v0] Welcome completed, setting localStorage")
    setShowWelcome(false)
    try {
      localStorage.setItem("hasSeenWelcome", "true")
    } catch (error) {
      console.log("[v0] Could not save to localStorage")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {!showWelcome && (
        <>
          <Header />
          <HeroSection />
          <ProductGrid />
          <Footer />
        </>
      )}

      <ProductDetailModal isOpen={isModalOpen} product={selectedProduct} onClose={closeModal} />
    </div>
  )
}
