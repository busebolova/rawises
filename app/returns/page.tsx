import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

      <main className="pt-32 pb-20 md:pb-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">İade & Değişim</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Memnuniyetiniz bizim önceliğimiz. İade ve değişim işlemlerinizi kolayca gerçekleştirin.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>İade Talebi</CardTitle>
                    <CardDescription>Ürününüzü iade etmek istiyorsanız</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="return-order">Sipariş Numarası</Label>
                    <Input id="return-order" placeholder="Örn: RW2024001234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="return-reason">İade Sebebi</Label>
                    <Textarea id="return-reason" placeholder="İade sebebinizi açıklayın..." />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                    İade Talebi Oluştur
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Değişim Talebi</CardTitle>
                    <CardDescription>Ürününüzü değiştirmek istiyorsanız</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="exchange-order">Sipariş Numarası</Label>
                    <Input id="exchange-order" placeholder="Örn: RW2024001234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exchange-reason">Değişim Sebebi</Label>
                    <Textarea id="exchange-reason" placeholder="Değişim sebebinizi açıklayın..." />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                    Değişim Talebi Oluştur
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Return Conditions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  İade Edilebilir Ürünler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Ambalajı açılmamış kozmetik ürünleri
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Kullanılmamış parfüm ve bakım ürünleri
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Orijinal ambalajında makyaj ürünleri
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    14 gün içinde talep edilen ürünler
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  İade Edilemez Ürünler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Kullanılmış kozmetik ürünleri
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Ambalajı açılmış parfüm ürünleri
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    Hijyen ürünleri (ruj, maskara vb.)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    14 günü geçen ürünler
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Return Process */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">İade Süreci</CardTitle>
              <CardDescription className="text-center">İade işleminiz 4 basit adımda tamamlanır</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Talep Oluştur</h3>
                  <p className="text-sm text-gray-600">Online form ile iade talebinizi oluşturun</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Onay Bekle</h3>
                  <p className="text-sm text-gray-600">24 saat içinde talebiniz değerlendirilir</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Kargo Gönder</h3>
                  <p className="text-sm text-gray-600">Ürünü orijinal ambalajında gönderin</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Para İadesi</h3>
                  <p className="text-sm text-gray-600">5-7 iş günü içinde ödeme iadeniz yapılır</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Returns */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Aktif İade Talepleriniz</CardTitle>
              <CardDescription>Mevcut iade ve değişim taleplerinizi takip edin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sipariş #RW2024001234</h4>
                      <p className="text-sm text-gray-600">Chanel Rouge Coco Lipstick</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Clock className="h-3 w-3 mr-1" />
                      İnceleniyor
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Detay <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sipariş #RW2024001189</h4>
                      <p className="text-sm text-gray-600">Dior Sauvage Parfüm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Kargoda
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Takip Et <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Yardıma mı İhtiyacınız Var?</CardTitle>
              <CardDescription className="text-center">
                İade ve değişim konularında size yardımcı olmaktan mutluluk duyarız
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Phone className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Telefon</h3>
                  <p className="text-sm text-gray-600 mb-3">0850 123 45 67</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Ara
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">E-posta</h3>
                  <p className="text-sm text-gray-600 mb-3">destek@rawises.com</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Mail Gönder
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Canlı Destek</h3>
                  <p className="text-sm text-gray-600 mb-3">7/24 online destek</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Sohbet Başlat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
