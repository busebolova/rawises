import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Gift, Star } from "lucide-react"
import Image from "next/image"

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      title: "Yeni Yıl Mega İndirimi",
      description: "Tüm kozmetik ürünlerinde %50'ye varan indirimler",
      discount: "50%",
      endDate: "31 Ocak 2024",
      image: "/placeholder.svg?height=200&width=300",
      type: "Mega İndirim",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Ücretsiz Kargo Kampanyası",
      description: "250 TL üzeri tüm siparişlerde kargo bedava",
      discount: "Ücretsiz",
      endDate: "Süresiz",
      image: "/placeholder.svg?height=200&width=300",
      type: "Kargo",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Cilt Bakım Seti",
      description: "3 al 2 öde! Cilt bakım ürünlerinde özel fırsat",
      discount: "3 Al 2 Öde",
      endDate: "15 Şubat 2024",
      image: "/placeholder.svg?height=200&width=300",
      type: "Set İndirimi",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Makyaj Ürünleri İndirimi",
      description: "Seçili makyaj ürünlerinde %30 indirim",
      discount: "30%",
      endDate: "28 Şubat 2024",
      image: "/placeholder.svg?height=200&width=300",
      type: "Kategori İndirimi",
      color: "bg-pink-500",
    },
    {
      id: 5,
      title: "Parfüm Festivali",
      description: "Tüm parfümlerde %25 indirim + hediye",
      discount: "25%",
      endDate: "10 Mart 2024",
      image: "/placeholder.svg?height=200&width=300",
      type: "Festival",
      color: "bg-blue-500",
    },
    {
      id: 6,
      title: "Saç Bakım Özel",
      description: "Saç bakım ürünlerinde 2. ürün %50 indirimli",
      discount: "2. Ürün %50",
      endDate: "20 Mart 2024",
      image: "/placeholder.svg?height=200&width=300",
      type: "Özel İndirim",
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-32 sm:h-36"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kampanyalar</h1>
            <p className="text-xl text-gray-600 leading-relaxed">En güncel kampanya ve fırsatları kaçırmayın!</p>
          </div>

          {/* Featured Campaign */}
          <div className="bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl p-8 text-white mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-white text-teal-600 mb-4">
                  <Gift className="w-4 h-4 mr-2" />
                  Özel Kampanya
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Yeni Üye Avantajları</h2>
                <p className="text-lg mb-6 opacity-90">
                  İlk siparişinizde %20 indirim + ücretsiz kargo fırsatı! Hemen üye olun ve avantajları keşfedin.
                </p>
                <Button variant="secondary" size="lg">
                  Hemen Üye Ol
                </Button>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Yeni Üye Kampanyası"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${campaign.color} text-white`}>{campaign.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <span className="text-lg font-bold text-gray-900">{campaign.discount}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Son tarih: {campaign.endDate}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                    Kampanyayı İncele
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12 text-center">
            <div className="max-w-2xl mx-auto">
              <Star className="w-12 h-12 text-rawises-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kampanyalardan İlk Sen Haberdar Ol!</h2>
              <p className="text-gray-600 mb-6">
                E-bültenimize abone ol, özel indirimler ve kampanyalardan ilk sen haberdar ol.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500"
                />
                <Button className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                  Abone Ol
                </Button>
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
