import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Truck,
} from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-purple-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-4">İade & Değişim</h1>
          <p className="text-lg opacity-90">
            Memnuniyetiniz bizim önceliğimiz. İade ve değişim işlemlerinizi kolayca gerçekleştirin.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>İade Talebi</CardTitle>
                  <CardDescription>Ürününüzü iade etmek istiyorsanız</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                İade Talebi Oluştur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Değişim Talebi</CardTitle>
                  <CardDescription>Ürününüzü değiştirmek istiyorsanız</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Değişim Talebi Oluştur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Return Conditions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                İade Edilebilir Ürünler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Orijinal ambalajında, etiketli ve kullanılmamış ürünler</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">14 gün içinde iade edilen ürünler</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Fatura ile birlikte gönderilen ürünler</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Hijyen kurallarına uygun ürünler</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <XCircle className="mr-2 h-5 w-5" />
                İade Edilemez Ürünler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Açılmış kozmetik ve kişisel bakım ürünleri</p>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">14 günü geçen ürünler</p>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Hasarlı veya kirlenmiş ürünler</p>
              </div>
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Özel üretim ürünler</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>İade Süreci</CardTitle>
            <CardDescription>4 kolay adımda iade işleminizi tamamlayın</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">Talep Oluştur</h3>
                <p className="text-sm text-gray-600">İade talebinizi oluşturun ve nedenini belirtin</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Onay Bekle</h3>
                <p className="text-sm text-gray-600">Talebiniz 24 saat içinde değerlendirilir</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Ürünü Gönder</h3>
                <p className="text-sm text-gray-600">Onaylanan ürünü kargo ile gönderin</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold mb-2">Para İadesi</h3>
                <p className="text-sm text-gray-600">Ürün kontrolü sonrası 3-5 iş günü içinde iade</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Returns */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Aktif İade Talepleriniz</CardTitle>
            <CardDescription>Mevcut iade ve değişim taleplerinizi takip edin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Maybelline Kapatıcı</h4>
                    <p className="text-sm text-gray-600">Sipariş #12345 - 15 Aralık 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Clock className="mr-1 h-3 w-3" />
                    İnceleniyor
                  </Badge>
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Morfose Hair Spray</h4>
                    <p className="text-sm text-gray-600">Sipariş #12344 - 12 Aralık 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Truck className="mr-1 h-3 w-3" />
                    Kargoda
                  </Badge>
                  <Button variant="outline" size="sm">
                    Takip Et
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Deotak Deodorant</h4>
                    <p className="text-sm text-gray-600">Sipariş #12343 - 10 Aralık 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Tamamlandı
                  </Badge>
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Destek & İletişim</CardTitle>
            <CardDescription>İade sürecinizde yardıma mı ihtiyacınız var?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <Phone className="h-8 w-8 text-teal-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Telefon</h3>
                <p className="text-sm text-gray-600 mb-3">0850 123 45 67</p>
                <Button variant="outline" size="sm">
                  Ara
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <Mail className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">E-posta</h3>
                <p className="text-sm text-gray-600 mb-3">iade@rawises.com</p>
                <Button variant="outline" size="sm">
                  Mail Gönder
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <MessageCircle className="h-8 w-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Canlı Destek</h3>
                <p className="text-sm text-gray-600 mb-3">7/24 anlık yardım</p>
                <Button variant="outline" size="sm">
                  Sohbet Başlat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
