import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Truck, Package, MapPin, Phone, Mail } from "lucide-react"

export default function DeliveryConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <h1 className="text-4xl font-bold mb-4">Rawises Teslimat Koşulları</h1>
              <p className="text-xl opacity-90">Sipariş Teslimat Süreci ve Koşulları</p>
            </div>
          </div>

          {/* Delivery Time Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-blue-600">Teslimat Süresi</h2>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  Değerli Müşterilerimiz; Rawises (Rawises Size Güzel Bakıyoruz.) web sitesi veya mobil uygulama
                  üzerinden oluşturmuş olduğunuz siparişlerinizden/satın almış olduğunuz ürünlerinizden; sipariş
                  verdiğiniz ürün onaylandıktan sonra <strong className="text-blue-600">ortalama 5 iş günü</strong>{" "}
                  içerisinde adresinize teslim edilmek üzere kargo firmasına teslim edilir.
                </p>

                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Önemli:</strong> Hafta sonu ve resmi tatil günleri bu süreye dahil olmamakla birlikte bazı
                    durumlarda teslimat süresi uzayabilir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Areas Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-green-600">Teslimat Bölgeleri</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Türkiye Geneli</h3>
                  <p className="text-gray-700 text-sm">
                    Tüm Türkiye'ye ücretsiz kargo hizmeti sunuyoruz. Adana ve çevre illerde aynı gün teslimat imkanı.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Özel Teslimat Bölgeleri</h3>
                  <p className="text-gray-700 text-sm">
                    Adana, Mersin, Hatay, Osmaniye, Kilis ve Gaziantep illerinde hızlı teslimat seçeneği mevcuttur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Costs Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-600">Kargo Ücretleri</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-purple-800">150 TL ve Üzeri Siparişler</h3>
                    <p className="text-sm text-gray-600">Tüm Türkiye'ye ücretsiz kargo</p>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">ÜCRETSİZ</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">150 TL Altı Siparişler</h3>
                    <p className="text-sm text-gray-600">Standart kargo ücreti</p>
                  </div>
                  <Badge variant="outline">29,90 TL</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Process Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-orange-600">Teslimat Süreci</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Sipariş Onayı</h3>
                    <p className="text-sm text-gray-600">Siparişiniz alındıktan sonra 2 saat içinde onaylanır.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Hazırlık</h3>
                    <p className="text-sm text-gray-600">Ürünleriniz özenle paketlenir ve kargoya hazırlanır.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Kargo Teslimi</h3>
                    <p className="text-sm text-gray-600">
                      Paketiniz kargo firmasına teslim edilir ve takip numarası gönderilir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Teslimat</h3>
                    <p className="text-sm text-gray-600">Ürününüz belirtilen adrese güvenli şekilde teslim edilir.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Önemli Notlar</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">
                    Teslimat sırasında adresinizde bulunmanız gerekmektedir. Kimlik kontrolü yapılabilir.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">
                    Hasarlı veya eksik ürünler için kargo teslim sırasında tutanak tutulmalıdır.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">
                    Yanlış adres bilgisi nedeniyle oluşan gecikmelerden Rawises sorumlu değildir.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm">
                    Özel günlerde (bayram, yılbaşı vb.) teslimat süreleri uzayabilir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">İletişim</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-sm text-gray-600">+90 322 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">E-posta</h3>
                    <p className="text-sm text-gray-600">info@rawises.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Teslimat ile ilgili sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz. Hafta içi
                  09:00-18:00 saatleri arasında hizmetinizdeyiz.
                </p>
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
