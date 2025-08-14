import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Info, Clock, HelpCircle, Truck, CreditCard, CheckCircle, XCircle, Laptop, Scale, Phone } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "İade ve İptal Koşulları - Rawises",
  description: "Rawises iade ve iptal koşulları. 30 gün iade hakkı, ücretsiz iade kargo ve detaylı süreç bilgileri.",
  keywords: "iade, iptal, cayma hakkı, iade koşulları, rawises iade",
}

export default function ReturnCancellationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İade ve İptal Koşulları</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rawises olarak müşteri memnuniyetini ön planda tutuyoruz. İade ve iptal süreçleriniz hakkında detaylı
            bilgiler aşağıda yer almaktadır.
          </p>
        </div>

        {/* Müşteri Bilgilendirmesi */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Info className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Müşteri Bilgilendirmesi</h2>
                <p className="text-green-100">30 Gün İade Hakkı</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Değerli Müşterilerimiz, Rawises (Rawises Size Güzel Bakıyoruz.) web sitesi veya mobil uygulama üzerinden
                oluşturmuş olduğunuz siparişlerinizden/satın almış olduğunuz ürünlerinizden; cayma hakkı istisnası
                kapsamında olmayan ürünler <strong>teslim tarihinden itibaren 30 gün içinde</strong>
                cayma hakkınızı kullanarak herhangi bir gerekçe göstermeksizin iade veya iptal edebilirsiniz.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-green-800 font-medium">
                  ✓ Cayma hakkı istisnası kapsamında olmayan ürünlerin iadesi yapılamamaktadır.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İptal ve İade Süreci */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">İptal ve İade Süreci</h2>
                <p className="text-blue-100">45 Dakika İptal - 7 Gün İşlem</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sipariş İptal</h3>
                <p className="text-gray-700 mb-3">
                  Ürün tarafınıza henüz ulaşmadan önce sistem üzerinden gerçekleştirilmiş olan işlem olup bu durumda
                  ürün tarafınıza teslim edilmeden sipariş iptali edilmektedir.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800">
                    <strong>45 dakika kuralı:</strong> Siparişinizi oluşturmanızın ardından 45 dakika geçmemiş ise
                    sipariş iptal talebinde bulunabilirsiniz.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ürün İade</h3>
                <p className="text-gray-700">
                  Ürünün teslim sırasında veya ürün teslim alındıktan sonra gerçekleştirilen ürünün iadesi işlemidir.
                  Siparişinizi oluşturmanızın ardından 45 dakika geçmiş ise sistemsel olarak iptal işlemi yapılamamakta
                  olup ürün tarafınıza teslim edilirken iade talebinde bulunabilirsiniz.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nasıl Yapılır */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Nasıl İptal/İade Yapılır?</h2>
                <p className="text-purple-100">Üye ve Üye Olmayan Kullanıcılar İçin</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Üye Kullanıcılar</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">1</Badge>
                    <p className="text-gray-700">Üyelik hesabınız ile giriş yapın</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">2</Badge>
                    <p className="text-gray-700">"Siparişlerim" sayfasına gidin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">3</Badge>
                    <p className="text-gray-700">"Görüntüle" butonuna tıklayın</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">4</Badge>
                    <p className="text-gray-700">"Siparişi İptal Et" seçeneğini kullanın</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Üye Olmayan Kullanıcılar</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">1</Badge>
                    <p className="text-gray-700">"Sipariş Takip" sayfasına gidin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">2</Badge>
                    <p className="text-gray-700">Cep telefonu numaranızı girin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">3</Badge>
                    <p className="text-gray-700">SMS kodunu girin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">4</Badge>
                    <p className="text-gray-700">"İade Talebi Oluştur" adımlarını takip edin</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kargo ve Gönderim */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Kargo ve Gönderim</h2>
                <p className="text-orange-100">Ücretsiz İade Kargo</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Ürünleri, Rawises iade için öngördüğü taşıyıcı kargo firmasının size en yakın şubesinden, iade kodunu
                kullanarak tarafımıza <strong>ücretsiz olarak</strong> geri gönderebilirsiniz.
              </p>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">Önemli Notlar:</h4>
                <ul className="text-orange-700 space-y-1">
                  <li>• Takip numarasını muhafaza edin</li>
                  <li>• İade formunu doldurun</li>
                  <li>• Faturanızı ekleyin</li>
                  <li>• Mağazalarımızdan iade seçeneğimiz bulunmamaktadır</li>
                </ul>
              </div>

              <p className="text-gray-700">
                İadeyi Rawises tarafından iade için öngörülen taşıyıcı firma dışında bir firma ile gerçekleştirmeniz
                halinde, iadeden kaynaklı tüm masraf ve zararlara ilişkin sorumluluk tarafınıza aittir.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ücret İadesi */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Ücret İadesi</h2>
                <p className="text-indigo-100">1-8 İş Günü Banka Süreci</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                İade talebiniz kapsamında tarafımıza geri göndermiş olduğunuz ürünler, depo adresimize teslim edildikten
                sonra tarafımızca incelenecek ve bu işlemler, <strong>7 iş günü içerisinde</strong>
                tamamlanarak tarafınıza bilgilendirme sağlanacaktır.
              </p>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">İade Süreci:</h4>
                <div className="text-indigo-700 space-y-2">
                  <p>• İade talebiniz olumlu sonuçlandığında ücret iadesi talimatı verilir</p>
                  <p>• Alışveriş aşamasında kullanılan kartın bankasına iade yapılır</p>
                  <p>• E-posta ile bilgilendirme yapılır</p>
                  <p>
                    • Hesabınıza yansıma süresi: <strong>1-8 iş günü</strong>
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                Tedarikçi firmalarımız tarafından gönderimi ve/veya teslimatı sağlanan ürünlerin iadesinin ilgili
                tedarikçi firmaya yapılması gerekmektedir. Tedarikçi firmalara ilişkin adres bilgileri için lütfen
                tarafımızla irtibata geçiniz.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ürün Koşulları */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">İade Edilebilir Ürün Koşulları</h2>
                <p className="text-yellow-100">Ürün Durumu Kriterleri</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                İade edilmek istenen ürünlerin, <strong>tüm aksesuarları ile birlikte</strong> tarafımıza gönderilmesi
                gerekmektedir.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">✓ Kabul Edilir:</h4>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• Kullanım talimatlarına uygun kullanım</li>
                    <li>• Orijinal kutu/ambalaj bozulmamış</li>
                    <li>• Ekonomik değer korunmuş</li>
                    <li>• Yeniden satılabilir durumda</li>
                    <li>• Hasar almamış</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2">✗ Kabul Edilmez:</h4>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>• Mutat kullanım dışı kullanım</li>
                    <li>• Değer kaybı meydana gelmiş</li>
                    <li>• Makul kullanım ölçüsü aşılmış</li>
                    <li>• Ambalaj/kutu hasarlı</li>
                    <li>• Eksik aksesuar</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-yellow-800">
                  <strong>Önemli:</strong> Ürünle birlikte alınan hediye ya da kampanyalı ürün varsa, ilgili ürünler de
                  iade olarak gönderilmelidir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cayma Hakkı İstisnaları */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Cayma Hakkı İstisnaları</h2>
                <p className="text-red-100">10 Yasal İstisna Maddesi</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                Mevzuatımız gereğince, aşağıdaki sözleşmelere ilişkin olarak cayma hakkının kullanılamadığını belirtmek
                isteriz:
              </p>

              <div className="grid gap-3">
                {[
                  "Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler.",
                  "Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler",
                  "Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmeler.",
                  "Tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.",
                  "Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.",
                  "Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınların teslimine ilişkin sözleşmeler.",
                  "Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve satıcı veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler.",
                  "Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin sözleşmeler.",
                  "Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.",
                  "Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <Badge className="bg-red-100 text-red-800 min-w-fit">{index + 1}</Badge>
                    <p className="text-red-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Elektronik Ürünler */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Laptop className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Elektronik Ürünler Özel Koşulları</h2>
                <p className="text-gray-100">Yetkili Servis Raporu Gerekli</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Buharlı ütü, saç maşası, dijital baskül, türk kahvesi makinesi gibi elektronik ürünlerin her türlü
                iadesi, <strong>ürünlerin iadeye uygun olduğuna ilişkin yetkili servis raporu alınması halinde</strong>{" "}
                yapılabilmektedir.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Elektronik Ürün İade Koşulları:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Tüm aksesuarları ile birlikte iade edilmeli</li>
                  <li>• Yetkili servis garantisinde bulunmaktadır</li>
                  <li>• Ayıplı mal sebebiyle yapılacak iadeler yetkili servis onayı gerektirir</li>
                  <li>• Garanti belgesinin kaşelenmesi için kutu açılabilir</li>
                  <li>• Kutunun açık olması iade sebebi olarak kabul edilmez</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800">
                  <strong>Not:</strong> Bazı elektronik ürünlerde garanti belgesinin kaşelenmesi için elektronik
                  ürünlerin kutusu açılmakta ve orijinal ambalajı açık şekilde teslim edilmektedir. Bu nedenle kutunun
                  açık olması iade sebebi olarak kabul edilmemektedir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yasal Uyumluluk */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Yasal Uyumluluk</h2>
                <p className="text-green-100">6502 Sayılı Kanun Uyumu</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                İptal ve iade süreçlerimizde <strong>6502 sayılı Kanun</strong>,
                <strong>Mesafeli Sözleşmeler Yönetmeliği</strong> ve sair mevzuata uygun hareket ettiğimizi, burada
                yazmayan konularda ilgili mevzuat hükümlerini inceleyebileceğinizi belirtmek isteriz.
              </p>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Yasal Haklar:</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• 30 gün cayma hakkı</li>
                  <li>• Gerekçe göstermeksizin iade</li>
                  <li>• Cezai şart ödemeksizin iptal</li>
                  <li>• Tüketici hakları koruması</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İletişim Bilgileri */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3">
              <Phone className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">İletişim Bilgileri</h2>
                <p className="text-purple-100">Rawises Müşteri Hizmetleri</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Şirket Bilgileri</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Rawises İç ve Dış Ticaret Limited Şirketi</strong>
                    </p>
                    <p>"Rawises Size Güzel Bakıyoruz"</p>
                    <p>Selahattin Eyyubi Mah. Kozan Cad. No:447</p>
                    <p>Yüreğir/Adana</p>
                    <p>Mersis No: 0735134318100001</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">İletişim</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Web: www.rawises.com</p>
                    <p>E-posta: info@rawises.com</p>
                    <p>Telefon: [Telefon numarası]</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/contact">İletişime Geç</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/orders">Siparişlerim</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Diğer yasal belgelerimizi de inceleyebilirsiniz:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/terms">Kullanım Şartları</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/privacy">Gizlilik Politikası</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/membership-agreement">Üyelik Sözleşmesi</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/delivery-conditions">Teslimat Koşulları</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
