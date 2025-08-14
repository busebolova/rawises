import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-32 sm:h-36"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Güzellik ve kozmetik dünyasının en kaliteli ürünlerini sizlere sunuyoruz
            </p>
          </div>

          {/* Company Story */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hikayemiz</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Rawises olarak 2020 yılında güzellik ve kozmetik sektöründe faaliyet göstermeye başladık. Amacımız,
                  kaliteli ve orijinal ürünleri uygun fiyatlarla müşterilerimize ulaştırmaktır.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Adana merkezli firmamız, Türkiye genelinde hizmet vererek binlerce müşterinin güzellik ihtiyaçlarını
                  karşılamaktadır.
                </p>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=400" alt="Rawises Mağaza" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-rawises-600 mb-4">Misyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Güzellik ve bakım ürünlerinde en kaliteli markaları, en uygun fiyatlarla müşterilerimize sunarak,
                herkesin kendini güzel hissetmesine katkıda bulunmak.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-rawises-600 mb-4">Vizyonumuz</h2>
              <p className="text-gray-600 leading-relaxed">
                Türkiye'nin en güvenilir ve tercih edilen online kozmetik platformu olmak, müşteri memnuniyetini her
                zaman ön planda tutmak.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Değerlerimiz</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-rawises-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Kalite</h3>
                <p className="text-sm text-gray-600">Sadece orijinal ve kaliteli ürünler</p>
              </div>
              <div className="text-center">
                <div className="bg-rawises-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Güven</h3>
                <p className="text-sm text-gray-600">Şeffaf ve güvenilir hizmet</p>
              </div>
              <div className="text-center">
                <div className="bg-rawises-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hız</h3>
                <p className="text-sm text-gray-600">Hızlı teslimat ve müşteri hizmetleri</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Neden Rawises?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">Orijinal ürün garantisi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">Hızlı ve güvenli kargo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">7/24 müşteri desteği</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">Kolay iade ve değişim</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">Uygun fiyat garantisi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rawises-600 text-xl">✓</span>
                    <span className="text-gray-600">Güvenli ödeme seçenekleri</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
