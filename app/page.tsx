import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { LatestProducts } from "@/components/latest-products"
import { PromotionalSlider } from "@/components/promotional-slider"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PromotionalSlider />
      <FeaturedProducts />
      <LatestProducts />
    </div>
  )
}
