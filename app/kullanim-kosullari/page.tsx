"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function KullanimKosullariPage() {
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
            <h1 className="text-3xl font-bold text-rawises-800 mb-8 text-center">KULLANIM KOŞULLARI</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Giriş */}
              <section className="bg-rawises-50 p-6 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Bu kullanım koşulları, <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong> ("RAWİSES SİZE GÜZEL
                  BAKIYORUZ") tarafından işletilen www.rawises.com internet sitesi ve mobil uygulamasının kullanımına
                  ilişkin şartları belirler.
                </p>
              </section>

              {/* 1. Genel Hükümler */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">1. GENEL HÜKÜMLER</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Bu internet sitesini kullanarak, aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız.
                    Bu koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Site Kullanım Kuralları:</h3>
                    <ul className="space-y-1">
                      <li>• Yasal mevzuata uygun kullanım zorunludur</li>
                      <li>• Kamu düzenini bozucu faaliyetler yasaktır</li>
                      <li>• Başkalarının haklarına saygı gösterilmelidir</li>
                      <li>• Zararlı yazılım kullanımı yasaktır</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Üyelik Koşulları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">2. ÜYELİK KOŞULLARI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Üyelik Şartları</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 18 yaşını doldurmuş olmak</li>
                      <li>• Doğru bilgiler vermek</li>
                      <li>• Geçerli e-posta adresi</li>
                      <li>• Kullanım koşullarını kabul etmek</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Üye Sorumlulukları</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Hesap güvenliğini sağlamak</li>
                      <li>• Şifre gizliliğini korumak</li>
                      <li>• Bilgileri güncel tutmak</li>
                      <li>• Kurallara uymak</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Alışveriş Koşulları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">3. ALIŞVERİŞ KOŞULLARI</h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Sipariş Süreci</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Ürünleri sepete ekleme</li>
                      <li>• Teslimat adresini belirleme</li>
                      <li>• Ödeme yöntemini seçme</li>
                      <li>• Siparişi onaylama</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-800 mb-2">Ödeme Koşulları</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Kredi kartı ile ödeme</li>
                      <li>• Kapıda ödeme (nakit/kart)</li>
                      <li>• Havale/EFT ile ödeme</li>
                      <li>• Güvenli ödeme garantisi</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Teslimat Koşulları */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">4. TESLİMAT KOŞULLARI</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Teslimat Süreleri</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Standart teslimat: 1-3 iş günü</li>
                        <li>• Aynı gün teslimat: Seçili bölgeler</li>
                        <li>• Kargo takip numarası verilir</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-2">Kargo Ücretleri</h3>
                      <ul className="text-gray-700 space-y-1">
                        <li>• 500 TL üzeri ücretsiz kargo</li>
                        <li>• Standart kargo: 29,90 TL</li>
                        <li>• Hızlı kargo: 39,90 TL</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. İade ve Değişim */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">5. İADE VE DEĞİŞİM</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">İade Koşulları</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 14 gün içinde iade hakkı</li>
                      <li>• Ürün ambalajının açılmamış olması</li>
                      <li>• Hijyen ürünleri iade edilemez</li>
                      <li>• İade kargo ücreti müşteriye ait</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">İade Edilemeyen Ürünler</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Kozmetik ve kişisel bakım ürünleri</li>
                      <li>• İç giyim ürünleri</li>
                      <li>• Tek kullanımlık ürünler</li>
                      <li>• Kişiye özel hazırlanan ürünler</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Fikri Mülkiyet */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">6. FİKRİ MÜLKİYET HAKLARI</h2>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Bu sitede yer alan tüm içerik, tasarım, logo, metin, görsel ve yazılımlar RAWİSES'in fikri mülkiyeti
                    olup, telif hakları ile korunmaktadır.
                  </p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• İçeriklerin izinsiz kopyalanması yasaktır</li>
                    <li>• Ticari amaçlı kullanım için izin gereklidir</li>
                    <li>• Logo ve marka kullanımı yasaktır</li>
                    <li>• İhlaller hukuki takibe tabidir</li>
                  </ul>
                </div>
              </section>

              {/* 7. Sorumluluk Sınırlaması */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">7. SORUMLULUK SINIRLAMASI</h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">RAWİSES aşağıdaki durumlardan sorumlu değildir:</p>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Kullanıcı hatalarından kaynaklanan zararlar</li>
                    <li>• Teknik arızalar ve sistem kesintileri</li>
                    <li>• Üçüncü taraf hizmetlerindeki sorunlar</li>
                    <li>• Mücbir sebep durumları</li>
                    <li>• Kullanıcının güvenlik ihlalleri</li>
                  </ul>
                </div>
              </section>

              {/* 8. Değişiklikler */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">8. KOŞULLARDA DEĞİŞİKLİK</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700">
                    RAWİSES, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. Güncel
                    koşullar web sitesinde yayınlanır ve yayın tarihinden itibaren geçerli olur. Siteyi kullanmaya devam
                    etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.
                  </p>
                </div>
              </section>

              {/* İletişim */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">İLETİŞİM BİLGİLERİ</h2>
                <div className="bg-rawises-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong>
                      <br />
                      Selahattin Eyyubi Mah. Kozan Cad. No:447
                      <br />
                      Yüreğir/ADANA
                    </div>
                    <div>
                      <strong>E-posta:</strong> info@rawises.com
                      <br />
                      <strong>Web:</strong> www.rawises.com
                      <br />
                      <strong>Mersis:</strong> 0735134318100001
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">
                Bu kullanım koşulları 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili mevzuat uyarınca
                hazırlanmıştır.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
