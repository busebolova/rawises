"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function GizlilikPolitikasiPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-rawises-50 text-rawises-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-rawises-800 mb-8 text-center">
              AYDINLATMA METNİ VE GİZLİLİK POLİTİKASI
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Giriş */}
              <section className="bg-rawises-50 p-6 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  İşbu metin ile <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong> ("RAWİSES SİZE GÜZEL
                  BAKIYORUZ") olarak, ürün ve hizmetlerimizden faydalanan müşterilerimize ait kişisel verilerin 6698
                  sayılı Kişisel Verilerin Korunması Kanunu'na ("KVKK") uygun olarak işlenmesinin önceliklerimizden biri
                  olduğunu beyan ederiz.
                </p>
              </section>

              {/* 1. Kişisel Verilerin Toplanması */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">
                  1. KİŞİSEL VERİLERİN TOPLANMASI VE İŞLENMESİ
                </h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Kişisel verileriniz, RAWİSES tarafından verilen hizmet, ürün ya da ticari faaliyete bağlı olarak
                    mağazalar, çağrı merkezi, internet sitesi, sosyal medya mecraları vasıtasıyla sözlü, yazılı ya da
                    elektronik olarak toplanabilecektir.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Kişisel Verileri Toplama Yolları:</h3>
                    <ul className="space-y-1">
                      <li>• Üye olunması</li>
                      <li>• RAWİSES tarafından yapılan anket, çekiliş ve yarışma gibi etkinliklere katılım</li>
                      <li>• RAWİSES'e yazılı olarak şikâyet ve önerilerde bulunulması</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. İşleme Amaçları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">2. KİŞİSEL VERİLERİN İŞLEME AMAÇLARI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Pazarlama ve İletişim</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Kampanya ve promosyon bilgilendirmeleri</li>
                      <li>• İndirim ve teklif bildirimleri</li>
                      <li>• Etkinlik ve çekiliş duyuruları</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Hizmet Geliştirme</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ürün ve hizmet geliştirme</li>
                      <li>• İstatistiksel değerlendirmeler</li>
                      <li>• Pazar araştırmaları</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Müşteri Hizmetleri</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Talep ve şikayet takibi</li>
                      <li>• Müşteri memnuniyeti anketleri</li>
                      <li>• Kullanıcı ilişkileri yönetimi</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Güvenlik ve Uyum</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Hukuki ve teknik güvenlik</li>
                      <li>• Muhasebesel işlemler</li>
                      <li>• Hukuki uyum süreçleri</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Veri Aktarımı */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">3. KİŞİSEL VERİLERİN AKTARILDIĞI TARAFLAR</h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Toplanan kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde
                    aşağıdaki taraflara aktarılabilir:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• İş ortaklarımız ve tedarikçilerimiz</li>
                    <li>• Kanunen yetkili kamu kurumları</li>
                    <li>• Hizmet sağlayıcılar (kargo, ödeme sistemleri vb.)</li>
                    <li>• Bulut hizmet sağlayıcıları</li>
                  </ul>
                </div>
              </section>

              {/* 4. Veri Sahibinin Hakları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">4. VERİ SAHİBİNİN HAKLARI</h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">KVKK madde 11 kapsamında sahip olduğunuz haklar:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✓ Kişisel veri işlenip işlenmediğini öğrenme</li>
                      <li>✓ İşlenmişse bilgi talep etme</li>
                      <li>✓ İşlenme amacını öğrenme</li>
                      <li>✓ Aktarıldığı üçüncü kişileri bilme</li>
                    </ul>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✓ Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
                      <li>✓ Silinmesini/yok edilmesini isteme</li>
                      <li>✓ Otomatik sistemlerle analize itiraz etme</li>
                      <li>✓ Zarara uğraması halinde tazminat talep etme</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Başvuru Bilgileri */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">BAŞVURU BİLGİLERİ</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Haklarınızı kullanmak için aşağıdaki yollarla başvurabilirsiniz:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Posta Adresi:</strong>
                      <br />
                      Selahattin Eyyubi Mah. Kozan Cad. No:447
                      <br />
                      Yüreğir/ADANA
                    </div>
                    <div>
                      <strong>E-posta:</strong> info@rawises.com
                      <br />
                      <strong>Web Sitesi:</strong> www.rawises.com
                      <br />
                      <strong>Mersis No:</strong> 0735134318100001
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Başvurularınız en geç 30 gün içerisinde ücretsiz olarak yanıtlanacaktır. İşlemin ayrıca maliyet
                    gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından belirlenen ücret alınacaktır.
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">
                Bu gizlilik politikası 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmıştır.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
