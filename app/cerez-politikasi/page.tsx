"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CerezPolitikasiPage() {
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
            <h1 className="text-3xl font-bold text-rawises-800 mb-8 text-center">ÇEREZ AYDINLATMA METNİ</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Giriş */}
              <section className="bg-rawises-50 p-6 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong> ("RAWİSES SİZE GÜZEL BAKIYORUZ") olarak,
                  6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca web sitemizde kullanılan çerezler
                  hakkında sizi bilgilendirmek amacıyla bu aydınlatma metnini hazırladık.
                </p>
              </section>

              {/* 1. Çerezler Nedir */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">1. ÇEREZLER NEDİR VE NE İŞE YARARLAR?</h2>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    Çerezler, web sitelerinin ziyaretçilerin bilgisayarlarına yerleştirdiği, genellikle o ziyaretçiye
                    özgü veya siteyi görüntülemek için kullandıkları cihaza özgü bir dizi bilgiyi depolamak için
                    kullanılan, normalde metin dosyalarında saklanan veri parçalarıdır.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Çerezlerin Faydaları:</h3>
                    <ul className="space-y-1">
                      <li>• Oturum açma durumunuzu hatırlar</li>
                      <li>• Tercihlerinizi kaydeder</li>
                      <li>• Site performansını artırır</li>
                      <li>• Kişiselleştirilmiş deneyim sunar</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Çerez Türleri */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">2. ÇEREZ TÜRLERİ</h2>
                <div className="space-y-6">
                  {/* Süre Bazında */}
                  <div>
                    <h3 className="text-lg font-semibold text-rawises-700 mb-3">A. Sürelerine Göre Çerezler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Geçici (Oturum) Çerezleri</h4>
                        <p className="text-sm text-gray-700">
                          Oturum sürecinde aktif olan, tarayıcının kapatılması ile silinen çerezlerdir.
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Kalıcı Çerezler</h4>
                        <p className="text-sm text-gray-700">
                          Belirli bir süre boyunca cihazınızda kalan ve her ziyarette kullanılan çerezlerdir.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amaç Bazında */}
                  <div>
                    <h3 className="text-lg font-semibold text-rawises-700 mb-3">
                      B. Kullanım Amaçlarına Göre Çerezler
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Zorunlu Çerezler</h4>
                        <p className="text-sm text-gray-700">
                          Sitenin çalışması için gerekli olan, pazarlama amaçlı olmayan çerezlerdir.
                        </p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">İşlevsel Çerezler</h4>
                        <p className="text-sm text-gray-700">
                          Kullanıcı deneyimini geliştiren, kişiselleştirme sağlayan çerezlerdir.
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Performans Çerezleri</h4>
                        <p className="text-sm text-gray-700">
                          Site performansını analiz eden, iyileştirme amaçlı kullanılan çerezlerdir.
                        </p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Pazarlama Çerezleri</h4>
                        <p className="text-sm text-gray-700">
                          Kişiselleştirilmiş reklamlar sunmak için kullanılan çerezlerdir.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Taraf Bazında */}
                  <div>
                    <h3 className="text-lg font-semibold text-rawises-700 mb-3">C. Taraflarına Göre Çerezler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Birinci Taraf Çerezleri</h4>
                        <p className="text-sm text-gray-700">Doğrudan RAWİSES tarafından yerleştirilen çerezlerdir.</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Üçüncü Taraf Çerezleri</h4>
                        <p className="text-sm text-gray-700">
                          İş ortaklarımız (Google, Facebook vb.) tarafından yerleştirilen çerezlerdir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Çerez Yönetimi */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">3. ÇEREZ YÖNETİMİ</h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz. Ancak çerezleri devre dışı bırakmanız
                    durumunda site işlevselliği etkilenebilir.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Çerez Ayarları</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Tüm çerezleri kabul et</li>
                        <li>• Sadece zorunlu çerezleri kabul et</li>
                        <li>• Çerez tercihlerini özelleştir</li>
                        <li>• Tüm çerezleri reddet</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Tarayıcı Ayarları</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Chrome: Ayarlar &gt; Gizlilik</li>
                        <li>• Firefox: Ayarlar &gt; Gizlilik</li>
                        <li>• Safari: Tercihler &gt; Gizlilik</li>
                        <li>• Edge: Ayarlar &gt; Gizlilik</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Kullanılan Çerezler */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">4. SİTEMİZDE KULLANILAN ÇEREZLER</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-rawises-100">
                        <th className="border border-gray-300 p-3 text-left">Çerez Adı</th>
                        <th className="border border-gray-300 p-3 text-left">Amacı</th>
                        <th className="border border-gray-300 p-3 text-left">Türü</th>
                        <th className="border border-gray-300 p-3 text-left">Süresi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">session_id</td>
                        <td className="border border-gray-300 p-3">Oturum yönetimi</td>
                        <td className="border border-gray-300 p-3">Zorunlu</td>
                        <td className="border border-gray-300 p-3">Oturum</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">cart_items</td>
                        <td className="border border-gray-300 p-3">Sepet bilgileri</td>
                        <td className="border border-gray-300 p-3">İşlevsel</td>
                        <td className="border border-gray-300 p-3">7 gün</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">user_preferences</td>
                        <td className="border border-gray-300 p-3">Kullanıcı tercihleri</td>
                        <td className="border border-gray-300 p-3">İşlevsel</td>
                        <td className="border border-gray-300 p-3">1 yıl</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 p-3">_ga</td>
                        <td className="border border-gray-300 p-3">Google Analytics</td>
                        <td className="border border-gray-300 p-3">Performans</td>
                        <td className="border border-gray-300 p-3">2 yıl</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. Haklarınız */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">5. KVKK UYARINCA HAKLARINIZ</h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    6698 sayılı KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar:
                  </p>
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

              {/* İletişim */}
              <section>
                <h2 className="text-xl font-bold text-rawises-800 mb-4">İLETİŞİM</h2>
                <div className="bg-rawises-50 p-6 rounded-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    Çerezler hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Adres:</strong>
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
                Bu çerez aydınlatma metni 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmıştır.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
