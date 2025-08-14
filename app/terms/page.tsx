import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-rawises-800 mb-4">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</h1>
            <h2 className="text-xl text-rawises-600 mb-2">("RAWİSES SİZE GÜZEL BAKIYORUZ")</h2>
            <h3 className="text-lg font-semibold text-rawises-700">ELEKTRONİK TİCARET SİTESİ KULLANIM KOŞULLARI</h3>
            <h4 className="text-lg font-semibold text-rawises-700">HÜKÜM VE ŞARTLAR</h4>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">1. Tanımlar ve Genel Hükümler</h2>
              <p className="text-gray-700 leading-relaxed">
                İşbu Online Satışlar için Hüküm ve Şartlar ("Hüküm ve Şartlar") kapsamında sipariş alan olarak RAWİSES
                İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ ("RAWİSES SİZE GÜZEL BAKIYORUZ, RAWİSES VEYA ŞİRKET") 'ni ifade eder.
                "Müşteri" veya "Siz" Rawises'e sipariş veren kişi, firma, şirket ve kuruluşları ifade eder. Lütfen bu
                Web sitesini veya mobil uygulamamızı kullanmaya başlamadan önce işbu Hüküm ve Şartları dikkatlice
                okuyunuz.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">2. Kabul ve Kullanım Şartları</h2>
              <p className="text-gray-700 leading-relaxed">
                İşbu Hüküm ve Şartlar, Web sitesine ve mobil uygulamaya erişiminizin ve kullanımınızın şartlarını
                düzenler. Bu Web sitesi veya Mobil Uygulama, ancak aşağıda belirtilen kullanım şartlarına uymayı kabul
                etmeniz halinde kullanımınıza açık hale gelir ve Web sitesine ve/veya mobil uygulamayı kullanmaya
                başladığınızda İşbu Hüküm ve Şartları ve bunlarla bağlı olmayı kabul etmiş sayılırsınız. Eğer işbu Hüküm
                ve Şartlara katılmıyorsanız, Web sitesine ya da Mobil Uygulama'ya erişmeyiniz ya da kullanmayınız.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">3. Sipariş ve Üyelik Koşulları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tüm siparişleri Rawises son geçerlilik onayına tabidir. Rawises talep edilen ürün veya servisin mevcut
                olamaması durumunda siparişi reddetme hakkını saklı tutar. Web sitesi ve mobil uygulamadan sipariş
                verebilmek için kullanıcı olarak üye olmanız gerekmektedir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Kayıt esnasında:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Bize doğru, tam ve güncel kayıt bilgilerinizi sağlamalısınız</li>
                <li>Kullanıcı adı ve şifrenizin güvenliğinden siz sorumlusunuz</li>
                <li>
                  Bu bilgileri kullanan siz veya yalnızca sizin tarafından yetkilendirilmiş biri olarak kabul
                  edilecektir
                </li>
                <li>
                  Rawises tamamen kendi takdirine bağlı olarak herhangi bir sebeple muhtemel bir müşteri kaydını
                  reddedebilir
                </li>
                <li>Bize sağladığınız bilgilerde bir değişiklik olması halinde, bizi derhal bilgilendirmelisiniz</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">4. Hesap Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed">
                Hesabınızın 3 yıl süre ile kullanılmaması halinde, sizin kendi korumanız için, hesabınızın artık
                kullanımda olmadığını kabul edip ve hesabınızı, varsa tüm birikmiş puanlarınızı etkisiz hale
                getireceğimizi bildiririz. Bu durumda eğer mevcutsa e-faturalanız imha edilebilir. Böyle bir durumda Web
                sitesi ve mobil uygulamadan sipariş verebilmek için yeni bir hesap için başvuru yapmanız gerekir.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">5. Gizlilik ve Kişisel Veriler</h2>
              <p className="text-gray-700 leading-relaxed">
                Üye'nin Rawises'e, Web sitesine veya Mobil Uygulama'ya üye olurken, siteyi veya Rawises Mobil
                Uygulama'yı kullanmaya başlamasından itibaren kişisel verileri, rawises.com.tr adresinden ulaşılabilen
                Aydınlatma Metni'nde detaylı bir şekilde belirtildiği gibi, toplama, kaydetme, düzenleme, kategorize
                etme, sınıflandırma, saklama, güncelleme, düzeltme, kullanma, analiz etme, değiştirme, yeniden düzenleme
                ve Türkiye'de ve/veya yurt dışında bulunan ve tamamı Aydınlatma Metni'nde sıralanan üçüncü kişilere
                aktarma ve bu kişilerce aynı amaçların gerçekleştirilebilmesi ve bu amaçların sürdürülebilmesi için
                işleme hakkına sahip olacaktır.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">6. Ödeme ve Güvenlik</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Web sitesi ve mobil uygulama siparişleri için MasterCard, Visa, Amex ve Troy kartları kabul
                edilmektedir. Kredi Kartı Satın Alma Güvenliği hizmeti kapsamında müşterilerimiz güvenli alışveriş için,
                kendi kredi kartlarını özel bir şifre ve güvenlik kodu kullanarak çıkarabilirler.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bununla birlikte alışverişte kullanılan kredi kartları geçerli olmalı ve alıcının kendi ismini
                taşımalıdır. Aksi durumdan şirketimiz sorumlu değildir. Ayrıca müşterilerimizin satın alma işlemlerini
                güvenli şekilde tamamlayabilmesi için 3D güvenlik adımı uygulanabilmektedir.
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">7. Teslimat ve Fiyatlandırma</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Teslimat için herhangi bir ek bedel ödenmesi gerektiğinde bu durum ödeme işleminin tamamlanmasından önce
                tarafınıza bildirilecek ve onayınıza sunulacaktır. Tüm ürün fiyatları Türk Lirası cinsinden
                listelenmiştir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Web sitesi ve mobil uygulamada yer alan ürün fiyatları fiziksel mağazalarımızdaki aynı ürünlere ilişkin
                fiyatlardan farklı olabilir. Bu durumda geçerli fiyat satın alma tarihinde Web sitesi ve mobil
                uygulamada yer alan fiyatlardır. Siparişlerin kabulü şirketimizin takdirindedir.
              </p>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">8. Son Tüketici Politikası</h2>
              <p className="text-gray-700 leading-relaxed">
                Rawises olarak sadece hizmet ve ürünleri sadece son tüketiciye veriyoruz. Eğer ürünlerimizi son tüketici
                olarak satın almadığınızı düşünürsek, siparişi reddetme veya iptal etme hakkımızı saklı tutuyoruz.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">9. Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Web sitesinin ve mobil uygulamanın tasarımı, içerik, metin, fotoğraf, ses, müzik, artwork, görsel,
                grafik, imge, html kodu ve diğer kodlar da dahil ve fakat bunlarla sınırlı olmamak kaydıyla tüm
                unsurları şirketimiz Rawises'e aittir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Söz konusu fikri mülkiyet haklarının sahibinin rızası olmadan indirdiği, kopyaladığı, aktardığı,
                yayınladığı, sakladığı veya başka herhangi bir şekilde kullandığınız takdirde ilgili yasa ve hakları
                ihlal ediyor olabilirsiniz.
              </p>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">10. Marka ve Logo Kullanımı</h2>
              <p className="text-gray-700 leading-relaxed">
                Kullanıcı, hiçbir koşul ve şartta Rawises'e ait marka, logo, ticari unvan bilgilerini ve yukarıdaki
                paragrafta sayılan içerik ve unsurları, Rawises'e yazılı onayı olmadan kendi faaliyetleri için
                kullanamaz, kopyalayamaz, çoğaltamaz, yayınlayamaz, yükleyemez.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">11. Sorumluluk Sınırlamaları</h2>
              <p className="text-gray-700 leading-relaxed">
                Web sitesi ve mobil uygulama kalitesi, operasyonu, kullanımı, doğruluğu, zamanlaması, uygunluğu ya da
                amacıyla ile ilgili; Web sitesi ve mobil uygulama üzerinden sunulan, erişilen veya temin edilen her
                türlü mal ve hizmet ile ilgili; Web sitesi ve mobil uygulama erişiminin kesintisiz, hatasız olduğuna
                veya herhangi bir virüs veya bulaşıcı veya yıkıcı özellikler içermediğine ilişkin olarak size karşı
                herhangi bir sorumluluğu bulunmamaktadır.
              </p>
            </div>

            <div className="bg-cyan-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">12. Üçüncü Kişi İçerikleri</h2>
              <p className="text-gray-700 leading-relaxed">
                Web sitesi ve mobil uygulamada, üçüncü kişiler tarafından üretilen içerikler veya başka sitelere
                yönlendiren bağlantılar içerebilir. Rawises, kendisinin doğrudan kontrolü altında bulunmayan üçüncü kişi
                içeriklerine, üçüncü kişi web sitelerinin operasyonu veya içeriğine ilişkin herhangi bir sorumluluk
                kabul etmemektedir.
              </p>
            </div>

            <div className="bg-lime-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">13. İçerik Güncellemeleri</h2>
              <p className="text-gray-700 leading-relaxed">
                Rawises web sitesi ve mobil uygulamada yer alan bilgi veya malzemelerin güncel veya doğru olduğunu veya
                sunulan herhangi bir ürün veya hizmetin mevcut olduğunu garanti etmez. Rawises önceden bildirimde
                bulunmaksızın ve tamamen kendi takdirine bağlı olarak Rawises Uygulamalarında görünen materyalleri
                değiştirebilir.
              </p>
            </div>

            <div className="bg-violet-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">14. Yorum ve Değerlendirme Kuralları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Müşteri, ürün yorum ve değerlendirme bölümünde ürünü yorumlama amacı dışında yorum yapmayacağını, konusu
                suç teşkil eden ya da internet sitesindeki kurallara, yürürlükteki mevzuata aykırı şekilde yasadışı,
                tehditkar, reklam ve/veya pazarlama içerikli, rahatsız edici, hakaret ve küfür içeren, aşağılayıcı,
                küçük düşürücü, kaba, pornografik ya da ahlaka aykırı yorumda bulunmayacağını kabul, beyan ve taahhüt
                eder.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Rawises, ürün yorum ve değerlendirme bölümünde devamlı olarak inceleme yapmak ve işbu maddeye aykırı
                şekilde bir yorumun tespit edilmesi halinde bahse konu içeriği yayımlamamak ya da silmek hakkına
                sahiptir.
              </p>
            </div>

            <div className="bg-rose-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">15. İhlal Durumunda Sorumluluk</h2>
              <p className="text-gray-700 leading-relaxed">
                İşbu Hüküm ve Şartların ihlali halinde, bu ihlalden cezai ve hukuki olarak şahsen sorumlu olacaksınız.
                Ayrıca Web sitesi ve mobil uygulamanın hukuka aykırı kullanımı ile ilgili olarak Rawises aleyhinde
                herhangi bir üçüncü şahıs tarafından öne sürülebilecek her türlü talep, zarar, sorumluluk, iddia veya
                gidere karşı (vekalet ücretleri ve dava masrafları dahil olmak üzere) Rawises'ı muaf tutmak ve tazmin
                etmek durumundasınız.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">16. Mücbir Sebep</h2>
              <p className="text-gray-700 leading-relaxed">
                Mücbir Sebep, doğal afet, yangın, sel, kaza, isyan, savaş, devlet müdahalesi, ambargo, grev, işçilik
                ayaklanmaları veya kontrolümüz dışında gerçekleşen bir sebeple herhangi bir yükümlüğü zamanında veya hiç
                yerine getirememekten sorumlu değiliz.
              </p>
            </div>

            <div className="bg-sky-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">17. Devir ve Geçerlilik</h2>
              <p className="text-gray-700 leading-relaxed">
                İşbu Hüküm ve Şartlardan doğan hiçbir hak ve yükümlülüğünüzü bizim yazılı ön onayımız olmaksızın üçüncü
                kişilere devir ve temlik edemezsiniz. İşbu Hüküm ve Şartların bir hükmünün herhangi bir yargı alanının
                kanunları uyarınca geçersiz, kanuna aykırı veya uygulanamaz olması halinde, ilgili yargı alanında, kalan
                hükümler geçerli, hukuka uygun ve uygulanabilir olmaya devam edecek ve sözü geçen hükümden
                etkilenmeyecektir.
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-rawises-700 mb-4">18. Yetki ve Hukuk</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rawises bahse konu hükümleri ve şartları yeniden düzenleyebilir, değiştirebilir veya tamamen veya kısmen
                bütünleyici düzenlemeler yapabiliriz. İşbu Kullanım Şartları metni Türkiye Cumhuriyeti kanunlarına tabi
                olacak ve bu kanunlar doğrultusunda yorumlanacaktır.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Adana Mahkemeleri ve İcra Daireleri Taraflar arasındaki anlaşmazlıkların çözümlenmesinde yetkilidir.
              </p>
            </div>

            <div className="bg-rawises-50 border border-rawises-200 p-6 rounded-lg mt-8">
              <p className="text-sm text-rawises-600 text-center">
                Bu kullanım şartları son güncelleme tarihi: <strong>1 Ocak 2024</strong>
              </p>
              <p className="text-sm text-rawises-600 text-center mt-2">
                Sorularınız için: <strong>info@rawises.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
