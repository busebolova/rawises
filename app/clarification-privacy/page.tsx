import type { Metadata } from "next"
import Link from "next/link"
import { Shield, FileText, Database, Share2, UserCheck, Mail, Clock, Lock, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Aydınlatma Metni ve Gizlilik Politikası | Rawises",
  description: "Rawises kişisel verilerin korunması, KVKK uyumu ve gizlilik politikası hakkında detaylı bilgiler.",
  keywords: "KVKK, kişisel veri, gizlilik politikası, veri koruma, aydınlatma metni",
}

export default function ClarificationPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aydınlatma Metni ve Gizlilik Politikası</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kişisel verilerinizin korunması ve KVKK uyumu konusundaki taahhütlerimiz
          </p>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/terms" className="text-blue-600 hover:text-blue-800 text-sm">
              Kullanım Şartları
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 text-sm">
              Gizlilik Politikası
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/membership-agreement" className="text-blue-600 hover:text-blue-800 text-sm">
              Üyelik Sözleşmesi
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/return-cancellation" className="text-blue-600 hover:text-blue-800 text-sm">
              İade ve İptal
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {/* 1. Veri Sorumlusu */}
          <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Veri Sorumlusu</h2>
              </div>
              <div className="prose prose-lg text-blue-50">
                <p>
                  İşbu metin ile <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong>
                  ("RAWİSES SİZE GÜZEL BAKIYORUZ") olarak, ürün ve hizmetlerimizden faydalanan müşterilerimize ve
                  şirketimiz ile ilişkili tüm gerçek kişilere ait kişisel verilerin 6698 sayılı Kişisel Verilerin
                  Korunması Kanunu'na ("KVKK") uygun olarak işlenerek saklanmasının önceliklerimizden biri olduğunu
                  beyan eder, KVKK uyarınca taşıdığımız "Veri Sorumlusu" sıfatı ve bu sorumluluğumuzun bilinci ile
                  kişisel verilerinizi aşağıda belirtildiği şekilde ve mevzuat tarafından çizilen sınırlar çerçevesinde
                  işleyeceğimizi beyan ederiz.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Kişisel Verilerin Toplanması */}
          <section className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Database className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Kişisel Verilerin Toplanması ve İşlenmesi</h2>
              </div>
              <div className="prose prose-lg text-green-50">
                <p>
                  Kişisel verileriniz, RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ tarafından verilen hizmet, ürün ya da
                  ticari faaliyete bağlı olarak mağazalar, çağrı merkezi, internet sitesi, sosyal medya mecraları
                  vasıtasıyla sözlü, yazılı ya da elektronik olarak toplanabilecek, Şirketimizin ürün ve hizmetlerinden
                  yararlandığınız süre güncellenerek işlenebilecektir.
                </p>
                <p>
                  Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve işbu
                  Aydınlatma Metni'nin 2. maddesinde yer verilen amaçlar doğrultusunda işlenebilecektir.
                </p>
              </div>
            </div>
          </section>

          {/* 3. İşleme Amaçları */}
          <section className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Kişisel Verilerin İşleme Amaçları</h2>
              </div>
              <div className="prose prose-lg text-purple-50">
                <p>
                  Toplanan kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartlarına
                  uygun olarak aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Kampanya, promosyon, indirim, teklif, etkinlikler, çekilişler konularında bilgilendirme</li>
                  <li>Ürün ve hizmetlerin temin edilmesi, geliştirilmesi ve iyileştirilmesi</li>
                  <li>İstatistiksel değerlendirmeler ve pazar araştırmaları</li>
                  <li>Veri tabanı oluşturulması ve müşteri ilişkileri yönetimi</li>
                  <li>Kullanıcı memnuniyeti anketleri ve geri bildirim toplama</li>
                  <li>Hukuki, ticari ve teknik güvenliğin temini</li>
                  <li>İş planları ve operasyonların oluşturulması</li>
                  <li>Mali işlerin yürütülmesi ve muhasebe süreçleri</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Veri Aktarımı */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Share2 className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Kişisel Verilerin Aktarılması</h2>
              </div>
              <div className="prose prose-lg text-orange-50">
                <p>
                  Toplanan kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri aktarımı şartları
                  çerçevesinde aşağıdaki taraflara aktarılabilir:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>İş ortaklarımız ve tedarikçilerimiz</li>
                  <li>Kanunen yetkili kamu kurumları ve özel kişiler</li>
                  <li>Hizmet sağlayıcıları ve teknoloji ortakları</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek için gerekli olan kurumlar</li>
                </ul>
                <p>
                  Veri aktarımları, yalnızca belirtilen amaçlar doğrultusunda ve yasal gereklilikler çerçevesinde
                  gerçekleştirilmektedir.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Veri Sahibi Hakları */}
          <section className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <UserCheck className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Kişisel Veri Sahibinin Hakları</h2>
              </div>
              <div className="prose prose-lg text-red-50">
                <p>KVKK madde 11 kapsamında kişisel veri sahipleri aşağıdaki haklara sahiptir:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Kişisel veri işlenip işlenmediğini öğrenme</li>
                  <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
                  <li>
                    Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
                  </li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                  <li>
                    İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini isteme
                  </li>
                  <li>
                    Otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhine bir sonucun ortaya çıkmasına
                    itiraz etme
                  </li>
                  <li>
                    Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın
                    giderilmesini talep etme
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Başvuru Yolları */}
          <section className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Mail className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Başvuru Usulleri</h2>
              </div>
              <div className="prose prose-lg text-teal-50">
                <p>
                  Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ile KVKK
                  madde 11'de belirtilen haklardan kullanmayı talep ettiğiniz hakkınıza yönelik açıklamalarınızla
                  birlikte talebinizi aşağıdaki yollarla iletebilirsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Yazılı başvuru</li>
                  <li>Kayıtlı elektronik posta (KEP) adresi</li>
                  <li>Güvenli elektronik imza</li>
                  <li>Mobil imza</li>
                  <li>Sistemimizde kayıtlı elektronik posta adresiniz</li>
                </ul>
                <p>
                  Başvurularınızı <strong>Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/Adana</strong>
                  adresine kimliğinizi tespit edici belgeler ile bizzat elden iletebilir, noter kanalıyla veya yukarıda
                  belirtilen diğer yöntemler ile gönderebilirsiniz.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Yanıt Süresi */}
          <section className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Yanıt Süresi ve Ücretlendirme</h2>
              </div>
              <div className="prose prose-lg text-indigo-50">
                <p>
                  Kişisel veri sahibi olarak, haklarınıza ilişkin taleplerinizi işbu Aydınlatma Metninde belirtilen
                  iletişim kanallarıyla Şirketimize iletmeniz durumunda Şirketimiz talebinizin niteliğine göre
                  tarafınıza
                  <strong>en geç otuz gün içinde ücretsiz olarak</strong> geri dönüş sağlayacaktır.
                </p>
                <p>
                  Ancak, 10 Mart 2018 tarihli Resmî Gazete'de yayımlanan Veri Sorumlusuna Başvuru Usul ve Esasları
                  Hakkında Tebliğ'in 6. maddesi uyarınca işlemin ayrıca bir maliyet gerektirmesi halinde Kişisel
                  Verileri Koruma Kurulunca belirlenen ücret alınacaktır.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Güvenlik Önlemleri */}
          <section className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Güvenlik Önlemleri</h2>
              </div>
              <div className="prose prose-lg text-gray-100">
                <p>
                  Şirketimiz, kişisel verilerinizin güvenliğini sağlamak için gerekli teknik ve idari tedbirleri
                  almaktadır. Bu kapsamda:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Veri güvenliği politikaları uygulanmaktadır</li>
                  <li>Erişim yetkilendirme sistemleri kullanılmaktadır</li>
                  <li>Düzenli güvenlik denetimleri yapılmaktadır</li>
                  <li>Personel eğitimleri düzenlenmektedir</li>
                  <li>Güncel güvenlik teknolojileri kullanılmaktadır</li>
                </ul>
              </div>
            </div>
          </section>

          {/* İletişim Bilgileri */}
          <section className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Phone className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">İletişim Bilgileri</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Şirket Bilgileri</h3>
                  <div className="space-y-2 text-purple-100">
                    <p>
                      <strong>Şirket:</strong> Rawises İç ve Dış Ticaret Limited Şirketi
                    </p>
                    <p>
                      <strong>Marka:</strong> "Rawises Size Güzel Bakıyoruz"
                    </p>
                    <p>
                      <strong>Adres:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/Adana
                    </p>
                    <p>
                      <strong>Mersis No:</strong> 0735134318100001
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">İletişim</h3>
                  <div className="space-y-2 text-purple-100">
                    <p>
                      <strong>Web:</strong> www.rawises.com
                    </p>
                    <p>
                      <strong>E-posta:</strong> info@rawises.com
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                    >
                      İletişim Formu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Diğer Yasal Belgeler</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/terms"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/privacy"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/membership-agreement"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Üyelik Sözleşmesi
              </Link>
              <Link
                href="/return-cancellation"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                İade ve İptal Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
