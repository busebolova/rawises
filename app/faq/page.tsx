import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Phone, Mail } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Sipariş ve Ödeme",
      questions: [
        {
          question: "Nasıl sipariş verebilirim?",
          answer:
            "Sitemizden istediğiniz ürünleri sepete ekleyip, ödeme sayfasından güvenli bir şekilde siparişinizi tamamlayabilirsiniz. Üye olmadan da misafir kullanıcı olarak sipariş verebilirsiniz.",
        },
        {
          question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
          answer:
            "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm kart ödemeleri 256-bit SSL güvenlik sertifikası ile korunmaktadır.",
        },
        {
          question: "Siparişimi iptal edebilir miyim?",
          answer:
            "Henüz kargoya verilmemiş siparişlerinizi ücretsiz olarak iptal edebilirsiniz. Bunun için müşteri hizmetlerimizle iletişime geçmeniz yeterlidir.",
        },
        {
          question: "Fatura nasıl alırım?",
          answer:
            "Bireysel faturalar otomatik olarak e-posta adresinize gönderilir. Kurumsal fatura için sipariş sırasında firma bilgilerinizi girmeniz gerekmektedir.",
        },
      ],
    },
    {
      title: "Kargo ve Teslimat",
      questions: [
        {
          question: "Kargo ücreti ne kadar?",
          answer:
            "500 TL ve üzeri siparişlerde kargo ücretsizdir. 500 TL altındaki siparişlerde kargo ücreti 29,90 TL'dir.",
        },
        {
          question: "Siparişim ne zaman teslim edilir?",
          answer:
            "Stokta bulunan ürünler 1-2 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz ile göre 1-3 iş günü arasında değişmektedir.",
        },
        {
          question: "Aynı gün teslimat var mı?",
          answer:
            "Adana il merkezi içinde 14:00'a kadar verilen siparişlerde aynı gün teslimat seçeneği bulunmaktadır. Ek ücret 19,90 TL'dir.",
        },
        {
          question: "Siparişimi nasıl takip edebilirim?",
          answer:
            "Sipariş takibi sayfasından sipariş numaranız ve e-posta adresinizle siparişinizin durumunu takip edebilirsiniz.",
        },
      ],
    },
    {
      title: "İade ve Değişim",
      questions: [
        {
          question: "Ürünü iade edebilir miyim?",
          answer:
            "Ambalajı açılmamış ürünleri 14 gün içinde iade edebilirsiniz. Kozmetik ürünlerde hijyen kuralları gereği açılmış ürünler iade edilememektedir.",
        },
        {
          question: "İade süreci nasıl işliyor?",
          answer:
            "Online iade talebinizi oluşturduktan sonra, ürünü ücretsiz kargo ile gönderebilirsiniz. İade onaylandıktan sonra 3-5 iş günü içinde paranız iade edilir.",
        },
        {
          question: "Değişim yapabilir miyim?",
          answer:
            "Evet, aynı kategorideki ürünlerle değişim yapabilirsiniz. Fiyat farkı varsa ek ödeme yapabilir veya fark iade edilir.",
        },
        {
          question: "Hasarlı ürün aldım, ne yapmalıyım?",
          answer:
            "Hasarlı veya hatalı ürün teslimatında derhal müşteri hizmetlerimizle iletişime geçin. Ürün fotoğrafları ile birlikte talebinizi iletmeniz yeterlidir.",
        },
      ],
    },
    {
      title: "Üyelik ve Hesap",
      questions: [
        {
          question: "Üye olmak zorunda mıyım?",
          answer:
            "Hayır, misafir kullanıcı olarak da sipariş verebilirsiniz. Ancak üye olarak sipariş geçmişinizi takip edebilir ve özel kampanyalardan yararlanabilirsiniz.",
        },
        {
          question: "Şifremi unuttum, ne yapmalıyım?",
          answer:
            "Giriş sayfasında 'Şifremi Unuttum' linkine tıklayarak e-posta adresinize şifre sıfırlama linki gönderebilirsiniz.",
        },
        {
          question: "Hesap bilgilerimi nasıl güncellerim?",
          answer:
            "Hesabınıza giriş yaptıktan sonra 'Profil' bölümünden kişisel bilgilerinizi, adres ve iletişim bilgilerinizi güncelleyebilirsiniz.",
        },
        {
          question: "Hesabımı silebilir miyim?",
          answer:
            "Evet, müşteri hizmetlerimizle iletişime geçerek hesabınızın silinmesini talep edebilirsiniz. Bu işlem geri alınamaz.",
        },
      ],
    },
    {
      title: "Ürünler ve Stok",
      questions: [
        {
          question: "Ürünler orijinal mi?",
          answer:
            "Evet, tüm ürünlerimiz yetkili distribütörlerden temin edilmekte olup %100 orijinaldir. Sahte ürün satışı yapmıyoruz.",
        },
        {
          question: "Stokta olmayan ürün ne zaman gelir?",
          answer:
            "Stokta olmayan ürünler için tahmini temin süresi ürün sayfasında belirtilmektedir. E-posta ile bilgilendirme almak için 'Stokta olunca haber ver' butonunu kullanabilirsiniz.",
        },
        {
          question: "Ürün önerisi alabilir miyim?",
          answer:
            "Tabii ki! Cilt tipiniz ve ihtiyaçlarınıza göre ürün önerisi almak için müşteri hizmetlerimizle iletişime geçebilirsiniz.",
        },
        {
          question: "Ürün yorumları güvenilir mi?",
          answer:
            "Sadece ürünü satın almış müşterilerimiz yorum yapabilmektedir. Tüm yorumlar moderasyon sürecinden geçmektedir.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-32 sm:h-36"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Soru ara..." className="pl-10" />
                </div>
                <Button className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                  Ara
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-rawises-600" />
                    {category.title}
                  </h2>

                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="mt-12 bg-gradient-to-r from-teal-500 to-purple-500 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Aradığınız Cevabı Bulamadınız mı?</h2>
              <p className="mb-6 opacity-90">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyar.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  0850 123 45 67
                </Button>
                <Button variant="secondary" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Bize Yazın
                </Button>
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
