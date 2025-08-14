export default function MembershipAgreementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Rawises Üyelik Sözleşmesi</h1>
            <p className="text-blue-100">Elektronik Ticaret Sitesi Üyelik Koşulları</p>
          </div>
        </div>

        {/* Giriş */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">Üyelik Avantajları</h2>
              <p className="text-green-700 leading-relaxed">
                <strong>www.rawises.com</strong> adresinden üye olmadan güvenilir bir şekilde alışveriş yapabilir,
                <strong> www.rawises.com</strong>'a üye olarak üyeliğe özel indirim ve promosyonlardan
                yararlanabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Taraflar */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">1. Taraflar</h2>
              <p className="text-blue-700 leading-relaxed mb-4">
                Bu sözleşme <strong>WWW.RAWİSES.COM</strong> internet sitesini (sözleşmenin devam eden hükümlerinde
                internet sitesi olarak anılacaktır) ve bu sitedeki faaliyetleri yürüten:
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="font-semibold text-blue-800">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</p>
                <p className="text-sm text-blue-600">Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/Adana</p>
                <p className="text-sm text-blue-600">Mersis: 0735134318100001</p>
              </div>
              <p className="text-blue-700 leading-relaxed mt-4">
                ile www.rawises.com sitesine üye olmak isteyen internet kullanıcısı arasında akdedilmiştir.
              </p>
            </div>
          </div>
        </div>

        {/* Tanımlar */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 mb-3">2. Tanımlar</h2>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Site:</strong>{" "}
                    <span className="text-yellow-700">
                      http://www.rawises.com adresinde yer alan ve Rawises'in hizmetlerini sunduğu internet sitesini
                      ifade etmektedir.
                    </span>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Mobil Uygulama:</strong>{" "}
                    <span className="text-yellow-700">Rawises tarafından yönetilen mobil uygulamayı ifade eder.</span>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Kullanıcı:</strong>{" "}
                    <span className="text-yellow-700">Siteye erişen gerçek ve tüzel kişileri ifade eder.</span>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Üye:</strong>{" "}
                    <span className="text-yellow-700">
                      İşbu Sözleşme uyarınca http://www.rawises.com adresindeki internet sitesi "Rawises Web Sitesi"'ne
                      T.C. kanunları çerçevesinde üye olan reşit olan Kullanıcıları ifade eder.
                    </span>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Üyelik:</strong>{" "}
                    <span className="text-yellow-700">
                      Üye olmak isteyen kullanıcı tarafından doldurulan üyelik formu ile verilen bilgilerin şirket
                      tarafından onaylanması ve bildirimi ile Üye olma işleminin tamamlanmasıdır.
                    </span>
                  </p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                  <p>
                    <strong className="text-yellow-800">Sözleşme:</strong>{" "}
                    <span className="text-yellow-700">
                      İşbu üyelik sözleşmesini ifade eder. Rawises Sitesinde yer alan Kişisel Verilerin Korunması, Çerez
                      Politikası ve Aydınlatma Metinleri sayfaları işbu Sözleşmenin ayrılmaz bir parçası niteliğindedir.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sözleşmenin Konusu */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-800 mb-3">3. Sözleşmenin Konusu</h2>
              <p className="text-purple-700 leading-relaxed">
                İşbu bahse konu Sözleşme'nin konusu, Rawises internet sitesinde veya mobil uygulamada sunulan
                hizmetlerden Kullanıcı'nın yararlanma şartları ile üyelik ilişkisine dair hak ve yükümlülüklerin
                belirlenmesidir.
              </p>
            </div>
          </div>
        </div>

        {/* Hak ve Yükümlülükler */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-800 mb-3">Hak ve Yükümlülükler</h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">5. Bilgi Verme Yükümlülüğü</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Bu sözleşme Rawises'e ait internet sitesinden üyenin faydalanmasına ilişkin şartları ve üyelik
                    ilişkisine ilişkin hak ve borçları düzenler. Üye, internet sitesine üye olurken kendisinden talep
                    edilen bilgileri güncel ve doğru bir şekilde beyan etmekle yükümlüdür.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">6. Şifre Güvenliği</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Üye, internet sitesine giriş için belirlenen şifreyi başka kişi veya kuruluşlara açıklayamaz,
                    veremez. Şifre bizzat üye tarafından kullanılabilir. Aksi gibi bir davranış nedeniyle doğabilecek
                    bütün sorumluluk Üye'ye aittir.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">7. Yasalara Uygunluk</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Üye, internet sitesini kullanırken kamu düzenini bozucu, suç teşkil eden, Rawises'in ve başka
                    kimselerin kişilik hakkını ihlal eden, fikri ve sınai haklarını ihlal eden davranışlarda bulunamaz.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">8. Tanıtım Yasağı</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Üye, internet sitesini kullanırken herhangi bir ürün veya hizmete ilişkin tanıtım yapamaz. Üye'nin
                    fikirleri ve açıklamaları Rawises'i bağlamaz.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">9. Hukuki Sorumluluk</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    Üyelik sözleşmesinde belirtilen yükümlülüklerin herhangi birine aykırı davranıştan doğan hukuki ve
                    cezai sorumluluk yalnızca üyeye aittir.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-2">10. Fikri Mülkiyet</h3>
                  <p className="text-red-700 text-sm leading-relaxed">
                    İnternet sitesinin tasarımı, Rawises markası ve Rawises'e ait ürünlerde yer alan, marka, logo ve
                    tasarımlar Fikri ve Sınai Mülkiyet Hukuku çerçevesinde koruma altındadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kişisel Veri İşleme */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-indigo-800 mb-3">Kişisel Veri İşleme</h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-800 mb-2">12. Veri Toplama</h3>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    İnternet sitesi üzerinden sunulan hizmetlerin iyileştirilmesi, Üye'nin siteden yararlanmasının
                    kolaylaştırılması ve kanun hükümleri gereği siteye erişmek için kullanılan İnternet Servis
                    Sağlayıcısının adı ve İnternet Protokol/IP adresi, erişim tarih ve saatleri gibi bilgiler
                    toplanmaktadır.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-800 mb-2">13. Veri İşleme Amaçları</h3>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    Rawises, Üye'nin Kişisel Veri İşleme Aydınlatma Bildirimi çerçevesinde sitenin kullanımı, üyelik
                    ilişkisinden kaynaklı hak ve borçların yerine getirilmesi, Üye'nin ilgi alanlarının belirlenerek
                    önerilerde bulunulması için kişisel verilerini işlemektedir.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-indigo-500">
                  <h3 className="font-semibold text-indigo-800 mb-2">14. Veri Saklama ve Paylaşım</h3>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    Rawises, üyenin kendisine bildirdiği kişisel verilerinin tamamını üyelik ilişkisi devam ettiği
                    sürece kendisi, bağlı bulunduğu iştirakleri ve üçüncü kişi çözüm ortakları nezdinde saklayabilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sözleşmenin Sona Ermesi */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-teal-800 mb-3">18. Sözleşmenin Sona Ermesi</h2>
              <p className="text-teal-700 leading-relaxed">
                Üye, üyelik ilişkisini internet sitesinde bu hak için ayrılmış bölümden her zaman sona erdirebilir.
                Rawises, üyelik ilişkisini her zaman herhangi bir neden göstermeksizin veya üyenin üyelik sözleşmesinden
                kaynaklanan yükümlülüklerinden birini ihlal etmesi üzerine tek taraflı olarak sona erdirebilir.
              </p>
            </div>
          </div>
        </div>

        {/* Mücbir Sebep */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-orange-800 mb-3">19. Mücbir Sebep</h2>
              <p className="text-orange-700 leading-relaxed mb-3">
                Aşağıda belirtilen, fakat bununla sınırlı kalmaksızın Taraflar'ın kontrolü dışında gelişen hallerin
                meydana çıkması mücbir sebep hali olarak değerlendirilecektir:
              </p>
              <ul className="text-orange-700 text-sm space-y-1 list-disc list-inside">
                <li>Tabiat hadisesi, tabii afetler (yangın, sel, salgın hastalık, deprem, su baskını vs.)</li>
                <li>Savaş, iç savaş, terör eylemleri, kalkışma, devrim, ihtilal</li>
                <li>Endüstriyel ihtilaflar, grevler, lokavtlar, ablukalar</li>
                <li>Resmi makamlarca yapılan kısıtlama veya müdahaleler</li>
                <li>Site'ye erişimi engelleyecek her türlü idari ve/veya yargı kararı</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Yetki ve Görev */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Görevli ve Yetkili Mahkeme</h2>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h3 className="font-semibold text-gray-800 mb-2">20. Tebligat</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Sözleşme ile ilgili her türlü tebligat şirketin Sözleşme'nin ilk maddesinde belirtilen adresine ve
                    Kullanıcı'nın beyan ettiği adrese yapılacaktır.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h3 className="font-semibold text-gray-800 mb-2">21. Yetkili Mahkeme</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Bu sözleşme Türk Hukukuna tabidir. Bu sözleşmeden kaynaklanan uyuşmazlıklarda
                    <strong> Adana Mahkemeleri ve İcra Daireleri</strong> yetkili ve görevlidir.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-gray-500">
                  <h3 className="font-semibold text-gray-800 mb-2">22. Yürürlük</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Bu üyelik sözleşmesi, üyelik süreci tamamlanmadan önce üyenin dikkatine sunulmuştur. Üyenin, üyelik
                    kaydı yapması bu sözleşmede yer alan bütün hükümleri okuduğu ve kabul ettiği anlamına gelir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Adres:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/Adana
              </p>
              <p>
                <strong>Mersis No:</strong> 0735134318100001
              </p>
            </div>
            <div>
              <p>
                <strong>İnternet Adresi:</strong> www.rawises.com
              </p>
              <p>
                <strong>E-Posta:</strong> info@rawises.com
              </p>
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
