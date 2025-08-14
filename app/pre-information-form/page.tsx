import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, User, Package, CreditCard, Truck, RotateCcw, Phone, Mail, MapPin } from "lucide-react"

export default function PreInformationFormPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">Ön Bilgilendirme Formu</h1>
            </div>
            <p className="text-gray-600">Mesafeli Satış Sözleşmesi Kapsamında</p>
            <Badge variant="outline" className="mt-2">
              6502 Sayılı Tüketicinin Korunması Hakkında Kanun
            </Badge>
          </div>

          {/* A. SATICI VE ALICI BİLGİLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <User className="w-5 h-5 mr-2" />
                A. SATICI BİLGİLERİ VE ALICI BİLGİLERİ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* A.1 SATICI BİLGİLERİ */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">A.1. SATICI BİLGİLERİ</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Ünvanı:</span>
                      <p className="text-gray-900">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Adresi:</span>
                      <p className="text-gray-900">Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Mersis No:</span>
                      <p className="text-gray-900">0735134318100001</p>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">Telefon bilgisi sipariş sırasında verilecektir</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">E-posta bilgisi sipariş sırasında verilecektir</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* A.2 ALICI BİLGİLERİ */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 border-b pb-2">A.2. ALICI BİLGİLERİ</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Teslim Alacak Kişi:</span>
                      <p className="text-gray-500 italic">Sipariş sırasında belirtilecektir</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Teslimat Adresi:</span>
                      <p className="text-gray-500 italic">Sipariş sırasında belirtilecektir</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fatura Adresi:</span>
                      <p className="text-gray-500 italic">Sipariş sırasında belirtilecektir</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Telefon:</span>
                      <p className="text-gray-500 italic">Sipariş sırasında belirtilecektir</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">E-mail/Kullanıcı Adı:</span>
                      <p className="text-gray-500 italic">Sipariş sırasında belirtilecektir</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* B. ÜRÜN BİLGİLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <Package className="w-5 h-5 mr-2" />
                B. ÜRÜNE, ÜRÜNÜN SATIŞ FİYATINA VE NAKLİYESİNE İLİŞKİN BİLGİLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">B.1 - Ürün Özellikleri</h4>
                  <p className="text-gray-700">
                    Malın/Ürün/Ürünlerin/Hizmetin temel özelliklerini (türü, miktarı, marka/modeli, rengi, adedi)
                    SATICI'ya ait{" "}
                    <a href="http://www.rawises.com" className="text-blue-600 hover:underline">
                      http://www.rawises.com
                    </a>{" "}
                    adlı internet sitesinde yayınlanmaktadır. Satıcı tarafından kampanya düzenlenmiş ise ilgili ürünün
                    temel özelliklerini kampanya süresince inceleyebilirsiniz. Kampanya tarihine kadar geçerlidir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">B.2 - Fiyat Bilgileri</h4>
                  <p className="text-gray-700">
                    Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler
                    güncelleme yapılana ve değiştirilene kadar geçerlidir. Süreli olarak ilan edilen fiyatlar ise
                    belirtilen süre sonuna kadar geçerlidir.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">B.3 - Sipariş Özeti</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full">
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
                          <td className="py-2 text-gray-500 italic" colSpan={4}>
                            Sipariş detayları sepet sayfasında görüntülenecektir
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="border-t">
                        <tr>
                          <td className="py-2 font-semibold" colSpan={3}>
                            Kargo Tutarı:
                          </td>
                          <td className="py-2 text-right text-gray-500 italic">Hesaplanacak</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold text-lg" colSpan={3}>
                            Toplam:
                          </td>
                          <td className="py-2 text-right font-bold text-lg text-gray-500 italic">Hesaplanacak</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* C. ÖDEME YÖNTEMİ */}
          <Card className="mb-6">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center text-purple-800">
                <CreditCard className="w-5 h-5 mr-2" />
                C. ÖDEME YÖNTEMİ VE ÖDEME YÖNTEMLERİNE İLİŞKİN BİLGİLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">C.1 - Ödeme Seçenekleri</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Ödeme Yöntemi:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında seçilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Ödeme Tipi:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında seçilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Kargo Ücreti:</td>
                          <td className="py-2 text-gray-500 italic">Hesaplanacak</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Toplam Sipariş Bedeli:</td>
                          <td className="py-2 text-gray-500 italic">Hesaplanacak</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">Taksit Sayısı:</td>
                          <td className="py-2 text-gray-500 italic">Seçilecektir</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Konutta Ödeme:</td>
                          <td className="py-2 text-gray-500 italic">Mevcut</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">C.2 - Kredi Kartı Bilgileri</h5>
                    <p className="text-sm text-gray-700">
                      Kredi kartı ile yapılan alışverişlerde kullanılan kredi kartının maliki olan Banka'nın taksit
                      uygulamaları, taksit adetleri değişiklik gösterebilir.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">C.3 - Konutta Nakit Ödeme</h5>
                    <p className="text-sm text-gray-700">
                      Alıcı siparişini oluştururken konutta nakit ödeme yöntemi tercih ettiği takdirde, alıcının
                      belirtmiş olduğu teslimat adresine siparişi teslim eden kuryeye nakit olarak ödenir.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">C.4 - Konutta Kredi Kartı Ödeme</h5>
                    <p className="text-sm text-gray-700">
                      Konutta kredi kartı ile tek çekim ödeme yöntemi tercih edildiğinde, kuryenin getirdiği POS cihazı
                      ile ödeme yapılır.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* D. TESLİM BİLGİLERİ */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center text-orange-800">
                <Truck className="w-5 h-5 mr-2" />
                D. FATURA BİLGİLERİ, TESLİM BİLGİLERİ VE TESLİME İLİŞKİN BİLGİLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">D.1 - Teslimat Bilgileri</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium">ALICI AD-SOYAD/UNVAN:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında belirtilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">ÜRÜNÜN TESLİMAT ADRESİ:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında belirtilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">FATURA ADRESİ:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında belirtilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">TELEFON:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında belirtilecektir</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium">E-MAİL/KULLANICI ADI:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş sırasında belirtilecektir</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">FATURA TESLİM:</td>
                          <td className="py-2 text-gray-500 italic">Sipariş ile birlikte</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">D.2 - Teslimat Süresi</h5>
                    <p className="text-sm text-gray-700">
                      Siparişin tamamlanması halinde ürünler satıcının anlaşmalı olduğu kargo ile nakledilir. Kargo
                      ücreti alıcı tarafından karşılanır.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">D.3 - Teslimat Süresi</h5>
                    <p className="text-sm text-gray-700">
                      Alıcı tarafından sipariş tamamlandığı andan itibaren satıcı siparişe konu ürünü/ürünleri
                      <span className="font-semibold text-orange-600"> 30 gün içinde</span> teslimini sağlar.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">D.4 - Teslimat Sorunları</h5>
                    <p className="text-sm text-gray-700">
                      Adresin yanlış verilmesi, adreste alıcının bulunmaması gibi alıcı kaynaklı nedenlerden ötürü ürün
                      teslim alınamadığı takdirde alıcı durumla ilgili bilgilendirilir.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* E. ŞİKAYETLER */}
          <Card className="mb-6">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center text-red-800">
                <Phone className="w-5 h-5 mr-2" />
                E. ALICININ ŞİKAYETLERİNİ SATICIYA İLETMESİ İÇİN YÖNTEMLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Alıcı bütün kanuni ve sözleşmesel haklarının yanı sıra satıcının elektronik sitesindeki müşteri
                hizmetleri bölümü ile iletişime geçerek şikayetlerini, eleştirilerini, önerilerini iletebilir.
              </p>
            </CardContent>
          </Card>

          {/* F. CAYMA HAKKI */}
          <Card className="mb-6">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center text-indigo-800">
                <RotateCcw className="w-5 h-5 mr-2" />
                F. CAYMA HAKKI VE CAYMA HAKKININ KULLANILMASINA İLİŞKİN HÜKÜMLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">F.1 - Cayma Hakkı Süresi</h4>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-indigo-800 font-medium">
                      ALICI; mesafeli sözleşmenin mal satışına ilişkin olması durumunda, ürünün kendisine veya
                      gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren{" "}
                      <span className="font-bold">14 (on dört) gün</span>
                      içerisinde, SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve
                      hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">F.2 - Cayma Hakkı Koşulları</h4>
                  <p className="text-gray-700 mb-3">
                    Cayma hakkının kullanılması için 14 günlük süre içinde SATICI'ya iadeli taahhütlü posta, faks veya
                    e-posta ile yazılı bildirimde bulunulması gerekir. Bu hakkın kullanılması halinde:
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
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* G. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER */}
          <Card className="mb-6">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="flex items-center text-yellow-800">
                <Package className="w-5 h-5 mr-2" />
                G. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">Aşağıdaki ürünler için cayma hakkı kullanılamaz:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>ALICI'nın isteği veya açıkça kişisel ihtiyaçları doğrultusunda hazırlanan ürünler</li>
                  <li>İç giyim alt parçaları, mayo ve bikini altları</li>
                  <li>Makyaj malzemeleri, tek kullanımlık ürünler</li>
                  <li>Çabuk bozulma tehlikesi olan veya son kullanma tarihi geçme ihtimali olan mallar</li>
                  <li>Ambalajı açıldığı takdirde iade edilmesi sağlık ve hijyen açısından uygun olmayan ürünler</li>
                  <li>
                    Teslim edildikten sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan
                    ürünler
                  </li>
                  <li>Ses veya görüntü kayıtları, kitap, dijital içerik, yazılım programları</li>
                  <li>Ambalajının ALICI tarafından açılmış olması halinde iade edilemeyen ürünler</li>
                </ul>

                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Önemli:</strong> Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, mayo, bikini, kitap,
                    kopyalanabilir yazılım ve programlar iade edilebilmesi için ambalajlarının açılmamış, denenmemiş,
                    bozulmamış ve kullanılmamış olmaları gerekir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* H. TEMERRÜT HALİ */}
          <Card className="mb-6">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center text-gray-800">
                <CreditCard className="w-5 h-5 mr-2" />
                H. TEMERRÜT HALİ VE HUKUKİ SONUÇLARI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde, kart sahibi banka
                ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu olacağını
                kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak masrafları ve
                vekâlet ücretini ALICI'dan talep edebilir.
              </p>
            </CardContent>
          </Card>

          {/* İ. UYUŞMAZLIKLARIN ÇÖZÜMÜ */}
          <Card className="mb-8">
            <CardHeader className="bg-slate-50">
              <CardTitle className="flex items-center text-slate-800">
                <FileText className="w-5 h-5 mr-2" />
                İ. UYUŞMAZLIKLARIN ÇÖZÜMÜ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Bu ön bilgilendirme formunun konusunu oluşturan siparişten ve taraflar arasında mesafeli satış
                sözleşmesinden kaynaklanan uyuşmazlıklarda sözleşmenin kurulduğu tarihte yürürlükte olan güncel parasal
                sınırlara göre alıcının ikamet ettiği ya da alıcının işlem yaptığı il/ilçe hakem heyetleri ile satıcının
                yerleşim yeri veya tüketicinin yerleşim yeri Tüketici Mahkemeleri görevli ve yetkilidirler.
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
                  Bu form, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
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
