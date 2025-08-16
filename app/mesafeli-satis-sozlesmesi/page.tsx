"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function MesafeliSatisSozlesmesiPage() {
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
            <h1 className="text-3xl font-bold text-rawises-800 mb-8 text-center">ÖN BİLGİLENDİRME FORMU</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* A. SATICI VE ALICI BİLGİLERİ */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">A. SATICI BİLGİLERİ VE ALICI BİLGİLERİ</h2>

                <div className="bg-rawises-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-rawises-800 mb-3">A.1. SATICI BİLGİLERİ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Ünvanı:</strong> RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ
                    </div>
                    <div>
                      <strong>Adresi:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA
                    </div>
                    <div>
                      <strong>Mersis No:</strong> 0735134318100001
                    </div>
                    <div>
                      <strong>E-mail:</strong> info@rawises.com
                    </div>
                  </div>
                </div>
              </section>

              {/* B. ÜRÜN BİLGİLERİ */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">
                  B. ÜRÜNE, ÜRÜNÜN SATIŞ FİYATINA VE NAKLİYESİNE İLİŞKİN BİLGİLER
                </h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    <strong>B.1-</strong> Malın/Ürün/Ürünlerin/Hizmetin temel özelliklerini (türü, miktarı,
                    marka/modeli, rengi, adedi) SATICI'ya ait http://www.rawises.com adlı internet sitesinde
                    yayınlanmaktadır.
                  </p>
                  <p>
                    <strong>B.2-</strong> Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen
                    fiyatlar ve vaatler güncelleme yapılana ve değiştirilene kadar geçerlidir.
                  </p>
                  <p>
                    <strong>B.3-</strong> Sözleşme konusu mal ya da hizmetin tüm vergiler dâhil satış fiyatı sipariş
                    sırasında gösterilmiştir.
                  </p>
                </div>
              </section>

              {/* C. ÖDEME YÖNTEMLERİ */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">
                  C. ÖDEME YÖNTEMİ VE ÖDEME YÖNTEMLERİNE İLİŞKİN BİLGİLER
                </h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Kredi kartı ile yapılan alışverişlerde kullanılan kredi kartının maliki olan Banka'nın taksit
                    uygulamaları değişiklik gösterebilir.
                  </p>
                  <p>
                    Konutta ödeme seçeneği ile alışveriş yapıldığı zaman alıcı kargo görevlisine makbuz karşılığında
                    ödeme yaparak ürünü teslim alabilir.
                  </p>
                </div>
              </section>

              {/* F. CAYMA HAKKI */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">
                  F. CAYMA HAKKI VE CAYMA HAKKININ KULLANILMASINA İLİŞKİN HÜKÜMLER
                </h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="space-y-4 text-sm text-gray-700">
                    <p>
                      <strong>F.1.</strong> ALICI; ürünün kendisine teslim tarihinden itibaren 14 (on dört) gün
                      içerisinde, SATICI'ya bildirmek şartıyla hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden
                      cayma hakkını kullanabilir.
                    </p>
                    <p>
                      <strong>F.2.</strong> Cayma hakkının kullanılması için 14 günlük süre içinde SATICI'ya yazılı
                      bildirimde bulunulması ve ürünün kullanılmamış olması şarttır.
                    </p>
                  </div>
                </div>
              </section>

              {/* G. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">G. CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER</h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="space-y-4 text-sm text-gray-700">
                    <p>Aşağıdaki ürünler için cayma hakkı kullanılamaz:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Kişisel ihtiyaçlar doğrultusunda hazırlanan ürünler</li>
                      <li>İç giyim alt parçaları, mayo ve bikini altları</li>
                      <li>Makyaj malzemeleri</li>
                      <li>Tek kullanımlık ürünler</li>
                      <li>Ambalajı açılan kozmetik ve kişisel bakım ürünleri</li>
                      <li>Hijyen açısından uygun olmayan ürünler</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* İ. UYUŞMAZLIKLARIN ÇÖZÜMÜ */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">İ. UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Bu sözleşmeden kaynaklanan uyuşmazlıklarda alıcının ikamet ettiği ya da işlem yaptığı il/ilçe hakem
                    heyetleri ile Tüketici Mahkemeleri görevli ve yetkilidirler.
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-gray-600">
                Bu sözleşme elektronik ortamda düzenlenmiş olup, 6502 sayılı Tüketicinin Korunması Hakkında Kanun
                hükümlerine tabidir.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
