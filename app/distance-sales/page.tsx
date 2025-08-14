import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Package, RotateCcw, Scale, AlertTriangle, MapPin, Calendar } from "lucide-react"

export default function DistanceSalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Mesafeli Satış Sözleşmesi</h1>
            </div>
            <p className="text-gray-600">6502 Sayılı Tüketicinin Korunması Hakkında Kanun Kapsamında</p>
            <Badge variant="outline" className="mt-2">
              Mesafeli Sözleşmeler Yönetmeliği
            </Badge>
          </div>

          {/* 1. TARAFLAR */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Users className="w-5 h-5 mr-2" />
                1. TARAFLAR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                İşbu Sözleşme aşağıdaki taraflar aşağıda bilgileri verilen alıcı ve satıcı arasında aşağıda belirtilen
                hüküm ve şartlar çerçevesinde imzalanmıştır.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">"SATICI"</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Ünvanı:</span> RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ
                    </div>
                    <div>
                      <span className="font-medium">Adresi:</span> Selahattin Eyyubi Mah. Kozan Cad. No:447
                      Yüreğir/ADANA
                    </div>
                    <div>
                      <span className="font-medium">Mersis No:</span> 0735134318100001
                    </div>
                    <div>
                      <span className="font-medium">Telefon:</span> Sipariş sırasında belirtilecektir
                    </div>
                    <div>
                      <span className="font-medium">E-mail:</span> Sipariş sırasında belirtilecektir
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">"ALICI"</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Ad-Soyad:</span> Sipariş sırasında belirtilecektir
                    </div>
                    <div>
                      <span className="font-medium">Adresi:</span> Sipariş sırasında belirtilecektir
                    </div>
                    <div>
                      <span className="font-medium">Telefon:</span> Sipariş sırasında belirtilecektir
                    </div>
                    <div>
                      <span className="font-medium">E-mail/Kullanıcı Adı:</span> Sipariş sırasında belirtilecektir
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  İş bu sözleşmeyi kabul etmekle ALICI, sözleşme konusu siparişi onayladığı takdirde sipariş konusu
                  bedeli ve varsa kargo ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü altına gireceğini
                  ve bu konuda bilgilendirildiğini peşinen kabul ve taahhüt eder.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. TANIMLAR */}
          <Card className="mb-6">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center text-purple-800">
                <FileText className="w-5 h-5 mr-2" />
                2. TANIMLAR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                İşbu sözleşmenin uygulanmasında ve yorumlanmasında aşağıda yazılı terimler karşılarındaki yazılı
                açıklamaları ifade edeceklerdir:
              </p>

              <div className="grid gap-3">
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">BAKAN:</span>
                  <span className="text-gray-700">Gümrük ve Ticaret Bakanı'nı</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">BAKANLIK:</span>
                  <span className="text-gray-700">Gümrük ve Ticaret Bakanlığı'nı</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">KANUN:</span>
                  <span className="text-gray-700">6502 sayılı Tüketicinin Korunması Hakkında Kanun'u</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">YÖNETMELİK:</span>
                  <span className="text-gray-700">Mesafeli Sözleşmeler Yönetmeliği'ni (RG:27.11.2014/29188)</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">SİTE:</span>
                  <span className="text-gray-700">SATICI'ya ait internet sitesini</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">TARAFLAR:</span>
                  <span className="text-gray-700">SATICI ve ALICI'yı</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">SÖZLEŞME:</span>
                  <span className="text-gray-700">SATICI ve ALICI arasında akdedilen işbu sözleşmeyi</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-purple-700 min-w-[120px]">MAL:</span>
                  <span className="text-gray-700">
                    Alışverişe konu olan taşınır eşyayı ve elektronik ortamda kullanılmak üzere hazırlanan yazılım, ses,
                    görüntü ve benzeri gayri maddi malları
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. KONU */}
          <Card className="mb-6">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Package className="w-5 h-5 mr-2" />
                3. KONU
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                İşbu Sözleşme, ALICI'nın, SATICI'ya ait internet sitesi üzerinden elektronik ortamda siparişini verdiği
                ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerini düzenler.
              </p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme
                  yapılana ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise belirtilen süre
                  sonuna kadar geçerlidir.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4-6. BİLGİLER */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center text-orange-800">
                <Users className="w-5 h-5 mr-2" />
                4-6. SATICI, ALICI VE SİPARİŞ VEREN KİŞİ BİLGİLERİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">4. SATICI BİLGİLERİ</h4>
                  <div className="text-sm space-y-1">
                    <div>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</div>
                    <div>Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA</div>
                    <div>Mersis: 0735134318100001</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">5. ALICI BİLGİLERİ</h4>
                  <div className="text-sm space-y-1 text-gray-600">
                    <div>Teslim Alacak Kişi: Sipariş sırasında</div>
                    <div>Teslimat Adresi: Sipariş sırasında</div>
                    <div>Fatura Adresi: Sipariş sırasında</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">6. SİPARİŞ VEREN</h4>
                  <div className="text-sm space-y-1 text-gray-600">
                    <div>Ad/Soyad/Unvan: Sipariş sırasında</div>
                    <div>Adres: Sipariş sırasında</div>
                    <div>E-posta: Sipariş sırasında</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. SÖZLEŞME KONUSU ÜRÜN BİLGİLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center text-indigo-800">
                <Package className="w-5 h-5 mr-2" />
                7. SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.1 - Ürün Özellikleri</h4>
                  <p className="text-gray-700">
                    Malın/Ürün/Ürünlerin/Hizmetin temel özelliklerini (türü, miktarı, marka/modeli, rengi, adedi)
                    SATICI'ya ait{" "}
                    <a href="http://www.rawises.com" className="text-indigo-600 hover:underline">
                      http://www.rawises.com
                    </a>{" "}
                    adlı internet sitesinde yayınlanmaktadır.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.2 - Fiyat Bilgileri</h4>
                  <p className="text-gray-700">
                    Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler
                    güncelleme yapılana ve değiştirilene kadar geçerlidir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.3 - Sipariş Özeti</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Ürün Açıklaması</th>
                          <th className="text-center py-2">Adet</th>
                          <th className="text-right py-2">Birim Fiyat</th>
                          <th className="text-right py-2">Ara Toplam (KDV Dahil)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4 text-gray-500 italic text-center" colSpan={4}>
                            Sipariş detayları sepet sayfasında görüntülenecektir
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7.4 - Kargo Ücreti</h4>
                  <p className="text-gray-700">Ürün sevkiyat masrafı olan kargo ücreti ALICI tarafından ödenecektir.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. FATURA BİLGİLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center text-teal-800">
                <FileText className="w-5 h-5 mr-2" />
                8. FATURA BİLGİLERİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-teal-50 p-4 rounded-lg">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Ad/Soyad/Unvan:</td>
                      <td className="py-2 text-gray-600">Sipariş sırasında belirtilecektir</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Adres:</td>
                      <td className="py-2 text-gray-600">Sipariş sırasında belirtilecektir</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Telefon:</td>
                      <td className="py-2 text-gray-600">Sipariş sırasında belirtilecektir</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Fatura Teslim:</td>
                      <td className="py-2 text-gray-600">
                        Fatura sipariş teslimatı sırasında fatura adresine sipariş ile birlikte teslim edilecektir
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 9. GENEL HÜKÜMLER */}
          <Card className="mb-6">
            <CardHeader className="bg-slate-50">
              <CardTitle className="flex items-center text-slate-800">
                <Scale className="w-5 h-5 mr-2" />
                9. GENEL HÜKÜMLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.1 - Ön Bilgilendirme Teyidi</h4>
                  <p className="text-gray-700 text-sm">
                    ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve
                    ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda
                    gerekli teyidi verdiğini kabul, beyan ve taahhüt eder.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.2 - Teslimat Süresi</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      Sözleşme konusu her bir ürün,{" "}
                      <span className="font-semibold">30 günlük yasal süreyi aşmamak kaydı ile</span>
                      ALICI'nın yerleşim yeri uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında
                      belirtilen süre zarfında teslim edilir.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.3 - Satıcının Yükümlülükleri</h4>
                  <p className="text-gray-700 text-sm">
                    SATICI, sözleşme konusu ürünü eksiksiz, siparişte belirtilen niteliklere uygun ve varsa garanti
                    belgeleri, kullanım kılavuzları ile teslim etmeyi, her türlü ayıptan arî olarak yasal mevzuat
                    gereklerine göre sağlam, standartlara uygun bir şekilde işi doğruluk ve dürüstlük esasları dâhilinde
                    ifa etmeyi kabul eder.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.4 - Ürün Değişikliği</h4>
                  <p className="text-gray-700 text-sm">
                    SATICI, sözleşmeden doğan ifa yükümlülüğünün süresi dolmadan ALICI'yı bilgilendirmek ve açıkça
                    onayını almak suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.5 - İfa İmkansızlığı</h4>
                  <p className="text-gray-700 text-sm">
                    SATICI, sipariş konusu ürün veya hizmetin yerine getirilmesinin imkânsızlaşması halinde sözleşme
                    konusu yükümlülüklerini yerine getiremezse, bu durumu, öğrendiği tarihten itibaren 3 gün içinde
                    yazılı olarak tüketiciye bildireceğini, 14 günlük süre içinde toplam bedeli ALICI'ya iade edeceğini
                    kabul, beyan ve taahhüt eder.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.6 - Ödeme Yükümlülüğü</h4>
                  <p className="text-gray-700 text-sm">
                    ALICI, sözleşme konusu ürünün teslimatı için işbu Sözleşme'yi elektronik ortamda teyit edeceğini,
                    herhangi bir nedenle sözleşme konusu ürün bedelinin ödenmemesi ve/veya banka kayıtlarında iptal
                    edilmesi halinde, SATICI'nın sözleşme konusu ürünü teslim yükümlülüğünün sona ereceğini kabul, beyan
                    ve taahhüt eder.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.7 - Yetkisiz Kullanım</h4>
                  <p className="text-gray-700 text-sm">
                    ALICI, sözleşme konusu ürünün tesliminden sonra ALICI'ya ait kredi kartının yetkisiz kişilerce
                    haksız kullanılması sonucunda sözleşme konusu ürün bedelinin ilgili banka veya finans kuruluşu
                    tarafından SATICI'ya ödenmemesi halinde, ALICI sözleşme konusu ürünü 3 gün içerisinde nakliye gideri
                    SATICI'ya ait olacak şekilde SATICI'ya iade edeceğini kabul, beyan ve taahhüt eder.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">9.8 - Mücbir Sebepler</h4>
                  <p className="text-gray-700 text-sm">
                    SATICI, tarafların iradesi dışında gelişen, önceden öngörülemeyen ve tarafların borçlarını yerine
                    getirmesini engelleyici ve/veya geciktirici hallerin oluşması gibi mücbir sebepler nedeni ile
                    sözleşme konusu ürünü süresi içinde teslim edemez ise, durumu ALICI'ya bildireceğini kabul, beyan ve
                    taahhüt eder.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10. CAYMA HAKKI */}
          <Card className="mb-6">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center text-red-800">
                <RotateCcw className="w-5 h-5 mr-2" />
                10. CAYMA HAKKI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">10.1 - Cayma Hakkı Süresi</h4>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-red-800 font-medium">
                      ALICI; mesafeli sözleşmenin mal satışına ilişkin olması durumunda, ürünün kendisine veya
                      gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren{" "}
                      <span className="font-bold">14 (on dört) gün</span>
                      içerisinde, SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve
                      hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">10.2 - Cayma Hakkı Koşulları</h4>
                  <p className="text-gray-700 mb-3">
                    Cayma hakkının kullanılması için 14 günlük süre içinde SATICI'ya iadeli taahhütlü posta, faks veya
                    e-posta ile yazılı bildirimde bulunulması gerekir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>3. kişiye veya ALICI'ya teslim edilen ürünün faturası</li>
                    <li>İade formu</li>
                    <li>
                      İade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve
                      hasarsız olarak teslim edilmesi
                    </li>
                    <li>
                      SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam
                      bedeli ALICI'ya iade eder
                    </li>
                    <li>
                      ALICI'nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa ALICI kusuru
                      oranında SATICI'nın zararlarını tazmin eder
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">10.3 - Cayma Hakkı Kullanılamayacak Ürünler</h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800 font-medium mb-2">Aşağıdaki ürünler için cayma hakkı kullanılamaz:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                      <li>ALICI'nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan ürünler</li>
                      <li>İç giyim alt parçaları, mayo ve bikini altları, makyaj malzemeleri</li>
                      <li>Tek kullanımlık ürünler, çabuk bozulma tehlikesi olan mallar</li>
                      <li>Ambalajı açıldığı takdirde iade edilmesi sağlık ve hijyen açısından uygun olmayan ürünler</li>
                      <li>Ses veya görüntü kayıtları, kitap, dijital içerik, yazılım programları</li>
                      <li>Ambalajının ALICI tarafından açılmış olması halinde iade edilemeyen ürünler</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 11. TEMERRÜT HALİ */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center text-orange-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                11. TEMERRÜT HALİ VE HUKUKİ SONUÇLARI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde, kart sahibi banka
                ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu olacağını
                kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak masrafları ve
                vekâlet ücretini ALICI'dan talep edebilir ve her koşulda ALICI'nın borcundan dolayı temerrüde düşmesi
                halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI'nın uğradığı zarar ve ziyanını ödeyeceğini
                kabul, beyan ve taahhüt eder.
              </p>
            </CardContent>
          </Card>

          {/* 12. UYUŞMAZLIKLARIN ÇÖZÜMÜ */}
          <Card className="mb-6">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center text-indigo-800">
                <Scale className="w-5 h-5 mr-2" />
                12. UYUŞMAZLIKLARIN ÇÖZÜMÜ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Bu mesafeli satış sözleşmesinden kaynaklanan uyuşmazlıklarda sözleşmenin kurulduğu tarihte yürürlükte
                olan güncel parasal sınırlara göre alıcının ikamet ettiği ya da alıcının işlem yaptığı il/ilçe hakem
                heyetleri ile satıcının yerleşim yeri veya tüketicinin yerleşim yeri Tüketici Mahkemeleri görevli ve
                yetkilidirler.
              </p>
            </CardContent>
          </Card>

          {/* 13. YÜRÜRLÜK */}
          <Card className="mb-8">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Calendar className="w-5 h-5 mr-2" />
                13. YÜRÜRLÜK
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                ALICI, Site veya mobil uygulama üzerinden verdiği siparişe ait ödemeyi gerçekleştirdiğinde işbu
                sözleşmenin tüm şartlarını kabul etmiş sayılır. SATICI, siparişin gerçekleşmesi öncesinde işbu
                sözleşmenin sitede ALICI tarafından okunup kabul edildiğine dair onay alacak şekilde gerekli yazılımsal
                düzenlemeleri yapmakla yükümlüdür.
              </p>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-blue-900 mb-4">İletişim Bilgileri</h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Mersis: 0735134318100001</span>
                  </div>
                </div>
                <p className="text-blue-700 text-sm mt-4">
                  Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
                  kapsamında hazırlanmıştır.
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
