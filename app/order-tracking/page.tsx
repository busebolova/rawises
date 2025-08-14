import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-32 sm:h-36"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sipariş Takibi</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Siparişinizin durumunu takip edin</p>
          </div>

          {/* Order Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="w-5 h-5 text-rawises-600" />
                Sipariş Sorgula
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Sipariş Numarası
                  </label>
                  <Input id="orderNumber" placeholder="Örn: RW2024001234" className="mb-4" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresi
                  </label>
                  <Input id="email" type="email" placeholder="ornek@email.com" className="mb-4" />
                </div>
              </div>
              <Button className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                <Search className="w-4 h-4 mr-2" />
                Sipariş Sorgula
              </Button>
            </CardContent>
          </Card>

          {/* Sample Order Status */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Sipariş #RW2024001234</CardTitle>
                  <p className="text-gray-600 mt-1">12 Ocak 2024 tarihinde verildi</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Teslim Edildi</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Order Timeline */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Teslim Edildi</h4>
                    <p className="text-gray-600 text-sm">15 Ocak 2024, 14:30</p>
                    <p className="text-gray-500 text-sm">Paket teslim alındı</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Dağıtımda</h4>
                    <p className="text-gray-600 text-sm">15 Ocak 2024, 09:00</p>
                    <p className="text-gray-500 text-sm">Kurye ile teslimat için yola çıktı</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 rounded-full p-2">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Kargoya Verildi</h4>
                    <p className="text-gray-600 text-sm">13 Ocak 2024, 16:45</p>
                    <p className="text-gray-500 text-sm">Paket kargo şirketine teslim edildi</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Hazırlanıyor</h4>
                    <p className="text-gray-600 text-sm">12 Ocak 2024, 18:20</p>
                    <p className="text-gray-500 text-sm">Siparişiniz hazırlanmaya başlandı</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-500 rounded-full p-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Sipariş Alındı</h4>
                    <p className="text-gray-600 text-sm">12 Ocak 2024, 15:30</p>
                    <p className="text-gray-500 text-sm">Siparişiniz başarıyla alındı</p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rawises-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teslimat Adresi</h4>
                    <p className="text-gray-600 text-sm">
                      Mehmet Yılmaz
                      <br />
                      Atatürk Mah. İstiklal Cad. No:123 Daire:5
                      <br />
                      Seyhan / Adana
                      <br />
                      Tel: 0555 123 45 67
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-rawises-600">Yardıma mı ihtiyacınız var?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Siparişinizle ilgili herhangi bir sorunuz varsa bizimle iletişime geçin.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Müşteri Hizmetleri
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-rawises-600">Kargo Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo Firması:</span>
                    <span className="font-semibold">Aras Kargo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Takip No:</span>
                    <span className="font-semibold">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tahmini Teslimat:</span>
                    <span className="font-semibold">1-2 İş Günü</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
