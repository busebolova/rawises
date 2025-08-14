export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Rawises Gizlilik Politikası</h1>
            <p className="text-blue-100">Kişisel Verilerinizin Korunması ve İşlenmesi</p>
          </div>
        </div>

        {/* Genel Bilgiler */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">Genel Bilgiler</h2>
              <p className="text-blue-700 leading-relaxed mb-4">
                İşbu Gizlilik Politikası,{" "}
                <strong>RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ ("RAWİSES SİZE GÜZEL BAKIYORUZ")</strong>
                tarafından satışı yapılacak ürünlerin, satışına ilişkin tüm hususları içeren{" "}
                <strong>www.rawises.com</strong> adresi üzerinden erişim sağlanacak internet sitesi'ne ilişkin gizlilik
                uygulamalarını ihtiva eder.
              </p>
              <p className="text-blue-700 leading-relaxed">
                Bu Gizlilik Politikası Web Sitesine erişen kişilerin ("Kullanıcılar") sitede yer alan www.rawises.com
                adresindeki Üyelik Formunu doldurması ile birlikte yürürlüğe girmiş olacaktır.
              </p>
            </div>
          </div>
        </div>

        {/* Kullanıcı Bilgilerine Erişim */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-3">Kullanıcı Bilgilerine Erişim</h2>
              <p className="text-green-700 leading-relaxed mb-4">
                Web Sitesi'ne giriş yaparak Üyelik Formunu doldurup onayladıktan sonra, kullanıcıların bu kapsamda
                sağladığı tüm bilgileri (e-posta adresi, teslimat adresi, telefon numarası, ürün bilgileri, satın alma
                tarihi) şirket hizmetlerinin sağlanması amacıyla süresiz olarak kayıt altına alınacaktır.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-green-700 text-sm">
                  <strong>Önemli:</strong> Kullanıcılara ait kredi kartı bilgileri ilgili bankalara ait web sayfaları
                  üzerinden iletilmektedir bu nedenle şirket, kredi kartı bilgilerine erişemez. 3D Secure Sanal Pos
                  sistemi kullanılmaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toplanacak Bilgiler */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 mb-3">Toplanacak Bilgiler</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                  <h3 className="font-semibold text-yellow-800 mb-2">Teknik Bilgiler</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Cihaza özel bilgiler</li>
                    <li>• IP adresi ve konum bilgileri</li>
                    <li>• Çerez bilgileri</li>
                    <li>• Site kullanım süreleri</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
                  <h3 className="font-semibold text-yellow-800 mb-2">Kullanıcı Bilgileri</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Kayıt bilgileri</li>
                    <li>• Teslimat bilgileri</li>
                    <li>• Satın alınan ürün bilgileri</li>
                    <li>• Arama sorguları</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bilgilerin Kullanım Amaçları */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">Bilgilerin Kullanım Amaçları</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">a) Promosyonlar hakkında bilgilendirme</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">
                      b) Kampanyalar, etkinlikler, çekilişler hakkında bilgilendirme
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">c) Ürünlerle ilgili bilgi mesajı gönderimi</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">d) İstatistiksel değerlendirmeler ve pazar araştırmaları</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">e) Özelleştirilmiş reklamlar ve sponsorlu içerik</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">f) Özelleştirilmiş içerik sağlama ve tavsiyeler</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">g) Puan/alışveriş bilgisi sorgulaması</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">h) Müşteri anketleri ve görüş alma</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">i) Hizmetlerin geliştirilmesi ve iyileştirilmesi</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                    <p className="text-purple-700 text-sm">j) Kullanıcı deneyiminin artırılması</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bilgilerin Paylaşılması */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-800 mb-3">Bilgilerin Paylaşılması</h2>
              <p className="text-red-700 leading-relaxed mb-4">
                Şirket, Kullanıcılardan alınan bilgileri Aydınlatma Metninde detaylı bir şekilde belirtildiği gibi
                Kullanıcılara daha iyi hizmet sunmak amacıyla yurt içi ve yurt dışında şirkete ve gerekli hizmeti
                Kullanıcılarına ulaştırmak için bilgilerinize erişimi olan İşbirliği Ortakları ile paylaşma hakkını
                saklı tutmaktadır.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <h3 className="font-semibold text-red-800 mb-2">Zorunlu Paylaşım Durumları:</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Kanunun öngördüğü zorunluluk durumları</li>
                  <li>• Kamu yararına veya resmi görev gereği</li>
                  <li>• Hukuki ve cezai soruşturma kapsamında</li>
                  <li>• Kullanıcıların veya başkasının hayatını korumak amacıyla</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Güvenlik Tedbirleri */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-indigo-800 mb-3">Güvenlik Tedbirleri</h2>
              <p className="text-indigo-700 leading-relaxed mb-4">
                RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ, bilgileri gizli tutmayı, gizliliğin sağlanması ve
                sürdürülmesi, yetkisiz kullanımını veya üçüncü bir kişiye ifşasını önlemek için gerekli tüm tedbirleri
                almayı ve gerekli özeni göstermeyi taahhüt etmektedir.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                <h3 className="font-semibold text-indigo-800 mb-2">Güvenlik Önlemleri:</h3>
                <ul className="text-indigo-700 text-sm space-y-1">
                  <li>• SSL sertifikası ile korumalı sayfalar</li>
                  <li>• Makul fiziksel ve teknik tedbirler</li>
                  <li>• Kişisel Verilerin Korunması Kanunu uyumluluğu</li>
                  <li>• Düzenli güvenlik güncellemeleri</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Uygulama İzinleri */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-teal-800 mb-3">Uygulama İzinleri</h2>
              <p className="text-teal-700 leading-relaxed mb-4">
                Rawises Uygulaması telefonunuzla çekilen herhangi bir fotoğrafı kayıt altında tutmaz. Uygulamamız
                içerisinde kameranızı açmanız için ilgili izinler sizin ayrıca onayınıza sunulacaktır.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-teal-500">
                <p className="text-teal-700 text-sm">
                  <strong>Önemli:</strong> Eğer fikrinizi değiştirirseniz, bu izinleri kullandığınız cihazdaki ayarlar
                  aracılığı ile istediğiniz zaman iptal edebilirsiniz. Bu izinlerin verilmemesi ya da verilen iznin
                  iptalinin uygulamanın size sunacağı bazı özellikleri kısıtlayacağını hatırlatmak isteriz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marka ve Telif Hakkı */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Marka ve Telif Hakkı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ adına kayıtlı Rawises ve diğer marka ve eserlerin (Web Sitesi
                kapsamındaki; tasarım, metin, imge ve diğer kodlar da dâhil ve fakat bunlarla sınırlı olmamak kaydıyla
                tüm elemanlarının) izinsiz kullanılması yasaktır.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                <h3 className="font-semibold text-gray-800 mb-2">Yasal Düzenlemeler:</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• 6769 Sayılı Sınai Mülkiyet Kanunu</li>
                  <li>• 5846 sayılı Fikri ve Sanat Eserleri Kanunu</li>
                  <li>• Diğer ilgili mevzuat uyarınca korunmaktadır</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Butonları */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <a
            href="mailto:info@rawises.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            E-posta Gönder
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            İletişim Formu
          </a>
        </div>
      </div>
    </div>
  )
}
