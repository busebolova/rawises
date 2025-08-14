import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cookie,
  Shield,
  Settings,
  Eye,
  Clock,
  Target,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Chrome,
  ChromeIcon as Firefox,
  AppleIcon as Safari,
  Phone,
  MapPin,
} from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Cookie className="w-8 h-8 text-orange-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Çerez Aydınlatma Metni</h1>
            </div>
            <p className="text-gray-600">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</p>
            <Badge variant="outline" className="mt-2">
              KVKK Uyumlu Çerez Politikası
            </Badge>
          </div>

          {/* 1. GİRİŞ */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center text-orange-800">
                <Globe className="w-5 h-5 mr-2" />
                1. GİRİŞ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ (Rawises Size Güzel Bakıyoruz ve/veya Rawises) olarak
                uluslararası ve ulusal mevzuat gerekleri ile 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")
                10.maddesinden kaynaklanan aydınlatma yükümlülüğünü yerine getirmek amacıyla web sitemizde ve/veya mobil
                uygulamalarımızda bulunan çerezler konusunda tarafları bilgilendirmeyi amaçlamaktayız.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-orange-800 text-sm">
                  Bu Çerez Aydınlatma Metni, Rawises tarafından yönetilen
                  <a href="http://www.rawises.com" className="font-semibold hover:underline ml-1">
                    http://www.rawises.com
                  </a>
                  sitesi için geçerli olup çerezler ve SDK'lar bu metinde açıklanan şekilde kullanılmaktadır.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. ÇEREZLER NEDİR */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Cookie className="w-5 h-5 mr-2" />
                2. ÇEREZLER NEDİR VE NE İŞE YARARLAR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Çerezler, web sitelerinin ziyaretçilerin bilgisayarlarına yerleştirdiği, genellikle o ziyaretçiye özgü
                veya siteyi görüntülemek için kullandıkları cihaza (örneğin tarayıcı veya cep telefonu) özgü bir dizi
                bilgiyi depolamak için kullanılan, normalde metin dosyalarında saklanan veri parçalarıdır.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Çerezlerin Amacı</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Web sayfaları için bellek sağlama</li>
                    <li>• Oturum açma durumunu koruma</li>
                    <li>• Kullanıcı tercihlerini hatırlama</li>
                    <li>• Site performansını iyileştirme</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Çerezlerin Faydaları</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Daha hızlı sayfa yükleme</li>
                    <li>• Kişiselleştirilmiş deneyim</li>
                    <li>• Güvenli oturum yönetimi</li>
                    <li>• Gelişmiş kullanıcı deneyimi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. ÇEREZ TÜRLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center text-purple-800">
                <Settings className="w-5 h-5 mr-2" />
                3. KİŞİSEL VERİLERİNİZİN İŞLENME AMAÇLARI, HUKUKİ SEBEPLERİ VE ÇEREZ TÜRLERİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Çerezler; sürelerine, kullanım amaçlarına ve taraflarına olmak üzere 3 ana başlıkta toplanmaktadır.
              </p>

              {/* A. Sürelerine Göre Çerezler */}
              <div className="mb-6">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  A. Sürelerine Göre Çerezler
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Geçici (Oturum) Çerezleri</h5>
                    <p className="text-sm text-gray-700">
                      Oturum sürecinde aktif olan, sürekliliği sağlamaya yardımcı ve tarayıcının kapatılması ile silinen
                      çerezlerdir.
                    </p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Kalıcı Çerezler</h5>
                    <p className="text-sm text-gray-700">
                      Kullanıcının internet sitesini her ziyaret ettiğinde verilerin sunucuya iletildiği, tarayıcının
                      kapatılması ile silinmeyen çerezlerdir.
                    </p>
                  </div>
                </div>
              </div>

              {/* B. Kullanım Amaçlarına Göre Çerezler */}
              <div className="mb-6">
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  B. Kullanım Amaçlarına Göre Çerezler
                </h4>
                <div className="grid gap-4">
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Zorunlu Çerezler</h5>
                    <p className="text-sm text-green-700">
                      E-Ticaret sitesinin çalışması açısından zorunlu olan ve engellenmesi halinde internet sitesinin
                      çalışmasında problem yaşatabilecek çerezlerdir. KVKK açısından açık rıza şartı gerektirmez.
                    </p>
                  </div>
                  <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">İşlevsel Çerezler</h5>
                    <p className="text-sm text-blue-700">
                      E-ticaret sitesi için zorunlu olmayan, siteyi ziyaret eden üyeler ya da ziyaretçiler için
                      bireysellik sağlayan çerezlerdir.
                    </p>
                  </div>
                  <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
                    <h5 className="font-medium text-yellow-800 mb-2">Performans ve Analiz Çerezleri</h5>
                    <p className="text-sm text-yellow-700">
                      E-Ticaret sitesinin özelliklerini geliştirmek için kullanılır. Ziyaretçinin sitede ne kadar
                      kaldığı gibi teknik detayları kullanır.
                    </p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h5 className="font-medium text-red-800 mb-2">Reklam/Pazarlama Çerezleri</h5>
                    <p className="text-sm text-red-700">
                      Web sitesi ziyaretçilerinin ilgi alanlarına göre reklamlar sunarak onlara daha zevkli bir deneyim
                      oluşturmayı hedefler. Tamamen kişisel çerezlerdir.
                    </p>
                  </div>
                </div>
              </div>

              {/* C. Taraflarına Göre Çerezler */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  C. Taraflarına Göre Çerezler
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Birinci Taraf Çerezler</h5>
                    <p className="text-sm text-gray-700">
                      Doğrudan kullanıcının ziyaret ettiği internet sayfası (www.rawises.com) tarafından yerleştirilen
                      çerezlerdir.
                    </p>
                  </div>
                  <div className="border border-purple-200 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Üçüncü Taraf Çerezler</h5>
                    <p className="text-sm text-gray-700">
                      Kullanıcının ziyaret ettiği internet sitesinden farklı bir üçüncü kişi tarafından yerleştirilen
                      çerezlerdir (Facebook, Twitter, YouTube vb.).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. SİTEDE YER ALAN ÇEREZLER */}
          <Card className="mb-6">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center text-indigo-800">
                <Eye className="w-5 h-5 mr-2" />
                4. SİTEDE YER ALAN ÇEREZLERE İLİŞKİN BİLGİLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                Site'de yer alan çerezlere ilişkin bilgilere aşağıda yer alan tablodan göz atabilirsiniz:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="border border-gray-300 p-3 text-left">Çerez Sağlayıcı Domain</th>
                      <th className="border border-gray-300 p-3 text-left">Çerez İsmi</th>
                      <th className="border border-gray-300 p-3 text-left">Çerez Kullanım Amacı</th>
                      <th className="border border-gray-300 p-3 text-left">Çerez Tipi</th>
                      <th className="border border-gray-300 p-3 text-left">Çerez Kullanım Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">rawises.com</td>
                      <td className="border border-gray-300 p-3">session_id</td>
                      <td className="border border-gray-300 p-3">Oturum yönetimi</td>
                      <td className="border border-gray-300 p-3">Zorunlu</td>
                      <td className="border border-gray-300 p-3">Oturum süresi</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">rawises.com</td>
                      <td className="border border-gray-300 p-3">cart_items</td>
                      <td className="border border-gray-300 p-3">Sepet bilgilerini saklama</td>
                      <td className="border border-gray-300 p-3">İşlevsel</td>
                      <td className="border border-gray-300 p-3">30 gün</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">rawises.com</td>
                      <td className="border border-gray-300 p-3">user_preferences</td>
                      <td className="border border-gray-300 p-3">Kullanıcı tercihlerini saklama</td>
                      <td className="border border-gray-300 p-3">İşlevsel</td>
                      <td className="border border-gray-300 p-3">1 yıl</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3">google-analytics.com</td>
                      <td className="border border-gray-300 p-3">_ga</td>
                      <td className="border border-gray-300 p-3">Site analizi ve performans</td>
                      <td className="border border-gray-300 p-3">Performans</td>
                      <td className="border border-gray-300 p-3">2 yıl</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">facebook.com</td>
                      <td className="border border-gray-300 p-3">_fbp</td>
                      <td className="border border-gray-300 p-3">Reklam hedefleme</td>
                      <td className="border border-gray-300 p-3">Pazarlama</td>
                      <td className="border border-gray-300 p-3">90 gün</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 5. VERİ PAYLAŞIMI */}
          <Card className="mb-6">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center text-red-800">
                <Shield className="w-5 h-5 mr-2" />
                5. KİŞİSEL VERİLERİNİZİN ÜÇÜNCÜ KİŞİLERLE PAYLAŞILMASI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Çerez Aydınlatma Metni kapsamındaki kişisel verileriniz mevzuata uygun olarak yukarıda belirtilen
                amaçların yerine getirilebilmesi amacıyla bilişim alanında da faaliyet gösteren yurt içi ve yurt dışı
                tedarikçilerimize ve mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu
                kurum ve kuruluşlarına aktarabilmektedir.
              </p>
            </CardContent>
          </Card>

          {/* 6. VERİ TOPLAMA YÖNTEMİ */}
          <Card className="mb-6">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Smartphone className="w-5 h-5 mr-2" />
                6. KİŞİSEL VERİ TOPLAMANIN YÖNTEMİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Kişisel verileriniz elektronik ortamda web sitemizin/mobil uygulamamızın tarayıcınıza göndermiş olduğu
                çerezler veya SDK'lar vasıtasıyla toplanmaktadır.
              </p>
            </CardContent>
          </Card>

          {/* 7. ÇEREZ YÖNETİMİ */}
          <Card className="mb-6">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="flex items-center text-yellow-800">
                <Settings className="w-5 h-5 mr-2" />
                7. ÇEREZ YÖNETİMİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Tarayıcılar genellikle çerezleri otomatik olarak kabul etmektedir. İnternet sitemizi kullanabilmek
                  için çerez kullanımı zorunlu değildir, fakat tarayıcınızı çerezleri kabul etmemeye ayarlamanız halinde
                  kullanıcı deneyiminizin kalitesi düşebilir ve sitelerimizin çeşitli işlevleri bozulabilir.
                </p>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Önemli Uyarı</h4>
                  <p className="text-yellow-800 text-sm">
                    Özellikle teknik çerezler, Site'nin temel işlevlerini yerine getirebilmesini sağlamaktadır. Teknik
                    çerezleri kapatmanız halinde Site'nin bazı fonksiyonlarının gereği gibi çalışmaması söz konusu
                    olabilir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tarayıcı Ayarları</h4>
                  <p className="text-gray-700 text-sm">Tarayıcınızı aşağıdaki şekillerde yapılandırabilirsiniz:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                    <li>Çerezleri tüm siteler veya belirli siteler için engelleyecek şekilde</li>
                    <li>Çerez oluşturulduğunda uyarı verecek şekilde</li>
                    <li>Üçüncü taraf çerezleri engelleyecek şekilde</li>
                    <li>Tüm çerezleri oturum çerezi gibi sayacak şekilde</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. KVKK HAKLARI */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Shield className="w-5 h-5 mr-2" />
                8. KİŞİSEL VERİLERİN KORUMASI KANUNU UYARINCA HAKLARINIZ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                6698 sayılı Kişisel Verilerin Korunması Hakkında Kanun'un 11. maddesi hükümleri uyarınca kişisel
                verilerinize ilişkin olarak aşağıdaki haklara sahip olduğunuzu belirtmek isteriz:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel veri işlenip işlenmediğini öğrenme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel verileri işlenmişse buna ilişkin bilgi talep etme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel verilerin işlenme amacını öğrenme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel verilerin aktarıldığı üçüncü kişileri bilme
                  </li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel verilerin düzeltilmesini isteme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kişisel verilerin silinmesini veya yok edilmesini isteme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Otomatik sistemler vasıtasıyla analiz edilmesine itiraz etme
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Kanuna aykırı işleme sebebiyle zararın giderilmesini talep etme
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 9. ÇEREZ KONTROLÜ */}
          <Card className="mb-6">
            <CardHeader className="bg-slate-50">
              <CardTitle className="flex items-center text-slate-800">
                <Monitor className="w-5 h-5 mr-2" />
                9. ÇEREZLERİN KONTROLÜ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                İnternet sitemizde çerezlere ilişkin izinlerinizi Çerez Ayarları'ndan değiştirebilirsiniz. Aşağıda
                belirtilen tarayıcılardan birini kullanıyorsanız ilgili adımlardan ayarları değiştirebilirsiniz:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Chrome */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Chrome className="w-6 h-6 text-blue-500 mr-2" />
                    <h4 className="font-semibold text-gray-900">Chrome</h4>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>
                      <strong>Desktop:</strong>
                    </p>
                    <p>1. Chrome'u açın</p>
                    <p>2. Sağ üstte Ayarlar'ı tıklayın</p>
                    <p>3. Gizlilik ve güvenlik → Çerezler</p>
                    <p>4. Tüm site verilerini temizle</p>
                  </div>
                </div>

                {/* Firefox */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Firefox className="w-6 h-6 text-orange-500 mr-2" />
                    <h4 className="font-semibold text-gray-900">Firefox</h4>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>
                      <strong>Desktop & Mobil:</strong>
                    </p>
                    <p>1. Firefox → Tercihler</p>
                    <p>2. Gizlilik ve Güvenlik</p>
                    <p>3. Çerezler ve site verileri</p>
                    <p>4. Temizle düğmesine tıklayın</p>
                  </div>
                </div>

                {/* Safari */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Safari className="w-6 h-6 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900">Safari</h4>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>1. Safari açıkken menü çubuğında Safari'ye tıklayın</p>
                    <p>2. Geçmişi Temizle'yi seçin</p>
                    <p>3. Zaman aralığı seçin</p>
                    <p>4. Geçmişi Temizle'yi tıklayın</p>
                  </div>
                </div>

                {/* Edge */}
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Monitor className="w-6 h-6 text-blue-700 mr-2" />
                    <h4 className="font-semibold text-gray-900">Edge</h4>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p>1. Ayarlar → Gizlilik, arama ve hizmetler</p>
                    <p>2. Gözatma verilerini temizle</p>
                    <p>3. Zaman aralığı seçin</p>
                    <p>4. Şimdi temizle'yi seçin</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700 text-sm">
                  <strong>Not:</strong> Tarayıcı ayarları ile erişim kısmidir. Üçüncü kişi konumundaki sivil toplum
                  kuruluşlarının çeşitli sitelerinde çerezlere ilişkin daha detaylı bilgiler mevcuttur.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-orange-900 mb-4">İletişim Bilgileri</h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Mersis: 0735134318100001</span>
                  </div>
                </div>
                <p className="text-orange-700 text-sm mt-4">
                  Kişisel verileriniz ile ilgili bilgilendirmemiz için sitemizde bulunan aydınlatma metnine göz atmanızı
                  öneririz.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                    Çerez Ayarları
                  </Button>
                  <Button variant="outline" size="sm">
                    KVKK Başvuru Formu
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
