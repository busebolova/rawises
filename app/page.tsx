import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { PromotionalSlider } from "@/components/promotional-slider"
import { LatestProducts } from "@/components/latest-products"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import WelcomeScreen from "@/components/welcome-screen"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeScreen />
      <Header />

      <main className="pt-20 pb-20 md:pb-8">
        <HeroSection />
        <PromotionalSlider />
        <FeaturedProducts />
        <LatestProducts />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
