"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { PromotionalBanners } from "@/components/promotional-banners"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/csv-parser"

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Her zaman welcome screen'i göster (test için)
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
    setShowWelcome(false)
    // localStorage.setItem("hasSeenWelcome", "true") // Test için kapalı
  }

  return (
    <div className="min-h-screen bg-white">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {!showWelcome && (
        <>
          <Header />
          <PromotionalBanners />
          <HeroSection />
          <FeaturedProducts />
          <ProductGrid />
          <Footer />
        </>
      )}

      <ProductDetailModal isOpen={isModalOpen} product={selectedProduct} onClose={closeModal} />
    </div>
  )
}
