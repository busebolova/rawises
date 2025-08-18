"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function KVKKPage() {
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
              KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Giriş */}
              <section className="bg-rawises-50 p-6 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  İşbu Aydınlatma Metni'nde, kişisel verilerinizin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
                  ("Kanun") ve ilgili mevzuata uygun olarak, veri sorumlusu olan{" "}
                  <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong> nezdinde işlenmesine ilişkin esaslar
                  aşağıda belirtilmiştir.
                </p>
              </section>

              {/* 1. Veri Sorumlusu */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">1. VERİ SORUMLUSU</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Ticaret Unvanı:</strong> RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ
                    </div>
                    <div>
                      <strong>Adres:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA
                    </div>
                    <div>
                      <strong>Mersis No:</strong> 0735134318100001
                    </div>
                    <div>
                      <strong>E-posta:</strong> info@rawises.com
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Veri Sahibi Kişiler */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">2. VERİ SAHİBİ KİŞİLER</h2>
                <p className="text-sm text-gray-700">Üye olan ve olmayan müşteriler</p>
              </section>

              {/* 3. İşlenen Kişisel Veriler */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">3. İŞLENEN KİŞİSEL VERİLER</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Kimlik Bilgileri</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ad, soyad</li>
                      <li>• Cinsiyet</li>
                      <li>• Doğum tarihi</li>
                      <li>• T.C. kimlik numarası</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">İletişim Bilgileri</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Telefon numarası</li>
                      <li>• E-posta adresi</li>
                      <li>• Fatura adresi</li>
                      <li>• Teslimat adresi</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Güvenlik Bilgileri</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Trafik bilgisi</li>
                      <li>• Kullanıcı adı ve şifresi</li>
                      <li>• Cihaz bilgileri</li>
                      <li>• Site hareketleri</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Müşteri İşlem Bilgileri</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Alışveriş detayları</li>
                      <li>• Talep ve şikayetler</li>
                      <li>• Favoriler, sepet bilgileri</li>
                      <li>• Ödeme yöntemi</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. İşlenme Amaçları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">4. KİŞİSEL VERİLERİN İŞLENME AMAÇLARI</h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Kişisel verileriniz, 6698 sayılı Kanun'un 5. maddesinde belirtilen aşağıdaki hallerde işlenir:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>a) İlgili kişinin açık rızasının varlığı</li>
                    <li>b) Kanunlarda açıkça öngörülmesi</li>
                    <li>c) Hayat veya beden bütünlüğünün korunması için zorunlu olması</li>
                    <li>d) Sözleşmenin kurulması veya ifası için gerekli olması</li>
                    <li>e) Hukuki yükümlülüğün yerine getirilmesi için zorunlu olması</li>
                    <li>f) İlgili kişi tarafından alenileştirilmiş olması</li>
                    <li>g) Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması</li>
                    <li>h) Meşru menfaatler için zorunlu olması</li>
                  </ul>
                </div>
              </section>

              {/* 8. Veri Sahibinin Hakları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">8. VERİ SAHİBİNİN HAKLARI</h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    KVKK'nın 11. maddesi uyarınca, şirketimize başvurarak kişisel verilerinizin:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>a) İşlenip işlenmediğini öğrenme</li>
                    <li>b) İşlenmişse bilgi talep etme</li>
                    <li>c) İşlenme amacını öğrenme</li>
                    <li>d) Transfer edildiği tarafları öğrenme</li>
                    <li>e) Eksik/yanlış işlenmişse düzeltilmesini isteme</li>
                    <li>f) Silinmesini/yok edilmesini isteme</li>
                    <li>g) Üçüncü kişilere bildirilmesini isteme</li>
                    <li>h) Otomatik sistemlerle analiz edilmesine itiraz etme</li>
                    <li>i) Zarara uğraması halinde zararın giderilmesini talep etme</li>
                  </ul>
                </div>
              </section>

              {/* Başvuru Yolları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">9. BAŞVURU YOLLARI</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Haklarınızı kullanmak için aşağıdaki yollarla başvurabilirsiniz:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Yazılı Başvuru:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA
                    </li>
                    <li>
                      <strong>E-posta:</strong> info@rawises.com
                    </li>
                    <li>
                      <strong>Web Sitesi:</strong> www.rawises.com üzerindeki KVKK başvuru formu
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4">Başvurularınız en geç 30 gün içerisinde yanıtlanacaktır.</p>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">
                Bu aydınlatma metni 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmıştır.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
