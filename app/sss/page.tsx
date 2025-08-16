"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  RefreshCw,
  User,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function SSSSayfasi() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqCategories = [
    {
      id: "siparis",
      title: "Sipariş & Teslimat",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
      questions: [
        {
          id: "siparis-1",
          question: "Siparişim ne zaman kargoya verilir?",
          answer:
            "Siparişleriniz ödeme onayı sonrası 1-2 iş günü içinde kargoya verilir. Stokta olmayan ürünler için 3-5 iş günü sürebilir.",
        },
        {
          id: "siparis-2",
          question: "Kargo ücreti ne kadar?",
          answer:
            "150 TL ve üzeri siparişlerde kargo ücretsizdir. 150 TL altındaki siparişler için kargo ücreti 15 TL'dir.",
        },
        {
          id: "siparis-3",
          question: "Hangi kargo firması ile çalışıyorsunuz?",
          answer:
            "Aras Kargo, Yurtiçi Kargo ve PTT Kargo ile çalışmaktayız. Kargo firması seçimi otomatik olarak yapılır.",
        },
        {
          id: "siparis-4",
          question: "Siparişimi nasıl takip edebilirim?",
          answer:
            "Kargo takip numaranız SMS ile gönderilir. Bu numara ile kargo firmasının web sitesinden takip yapabilirsiniz.",
        },
      ],
    },
    {
      id: "odeme",
      title: "Ödeme & Faturalama",
      icon: CreditCard,
      color: "bg-green-100 text-green-600",
      questions: [
        {
          id: "odeme-1",
          question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
          answer:
            "Kredi kartı, banka kartı, havale/EFT ve mobil ödeme seçeneklerini kabul ediyoruz. Tüm kartlar için 3D Secure zorunludur.",
        },
        {
          id: "odeme-2",
          question: "Taksit seçenekleri var mı?",
          answer:
            "Evet, 6 farklı banka ile 2-12 taksit seçenekleri sunuyoruz. Minimum 100 TL üzeri alışverişlerde taksit yapabilirsiniz.",
        },
        {
          id: "odeme-3",
          question: "Fatura nasıl alırım?",
          answer:
            "E-fatura otomatik olarak e-posta adresinize gönderilir. Kurumsal fatura için sipariş sırasında bilgilerinizi girebilirsiniz.",
        },
        {
          id: "odeme-4",
          question: "Ödeme güvenli mi?",
          answer:
            "Evet, SSL sertifikası ve 3D Secure ile korumalı ödeme altyapısı kullanıyoruz. Kart bilgileriniz hiçbir zaman saklanmaz.",
        },
      ],
    },
    {
      id: "iade",
      title: "İade & Değişim",
      icon: RefreshCw,
      color: "bg-purple-100 text-purple-600",
      questions: [
        {
          id: "iade-1",
          question: "İade sürem ne kadar?",
          answer:
            "Ürünleri teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Kozmetik ürünler açılmamış olmalıdır.",
        },
        {
          id: "iade-2",
          question: "İade nasıl yapabilirim?",
          answer: "Müşteri hizmetlerimizle iletişime geçin, iade kodunuzu alın ve ürünü ücretsiz kargo ile gönderin.",
        },
        {
          id: "iade-3",
          question: "İade ücretim ne zaman ödenir?",
          answer:
            "Ürün tarafımıza ulaştıktan sonra 1-2 iş günü içinde kontrol edilir, onay sonrası 3-5 iş günü içinde ödeme iadesi yapılır.",
        },
        {
          id: "iade-4",
          question: "Hangi ürünler iade edilemez?",
          answer: "Hijyen kuralları gereği açılmış kozmetik, parfüm ve kişisel bakım ürünleri iade edilemez.",
        },
      ],
    },
    {
      id: "hesap",
      title: "Hesap & Üyelik",
      icon: User,
      color: "bg-orange-100 text-orange-600",
      questions: [
        {
          id: "hesap-1",
          question: "Üye olmak zorunda mıyım?",
          answer:
            "Hayır, misafir kullanıcı olarak da alışveriş yapabilirsiniz. Ancak üyelik avantajlarından yararlanmak için üye olmanızı öneririz.",
        },
        {
          id: "hesap-2",
          question: "Şifremi unuttum, ne yapmalıyım?",
          answer:
            "Giriş sayfasında 'Şifremi Unuttum' linkine tıklayın. E-posta adresinize şifre sıfırlama linki gönderilecektir.",
        },
        {
          id: "hesap-3",
          question: "Hesap bilgilerimi nasıl güncellerim?",
          answer:
            "Hesabınıza giriş yaparak 'Profil Bilgileri' bölümünden adres, telefon ve diğer bilgilerinizi güncelleyebilirsiniz.",
        },
        {
          id: "hesap-4",
          question: "Hesabımı nasıl silerim?",
          answer:
            "Hesap silme işlemi için müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir. KVKK kapsamında verileriniz silinecektir.",
        },
      ],
    },
  ]

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-rawises-600">
            Ana Sayfa
          </Link>
          <ArrowRight className="w-4 h-4" />
          <span className="text-rawises-600 font-medium">Sıkça Sorulan Sorular</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-rawises-800 mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Aradığınız cevabı bulamıyor musunuz? Size yardımcı olmak için buradayız.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Soru ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Contact */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-rawises-800 mb-2">WhatsApp Destek</h3>
              <p className="text-sm text-gray-600 mb-4">Anında cevap alın</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a
                  href="https://wa.me/905073027313?text=Merhaba, yardım almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mesaj Gönder
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-rawises-800 mb-2">Telefon Desteği</h3>
              <p className="text-sm text-gray-600 mb-4">09:00 - 18:00</p>
              <Button variant="outline" asChild>
                <a href="tel:+905073027313">+90 507 302 73 13</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-rawises-800 mb-2">E-posta</h3>
              <p className="text-sm text-gray-600 mb-4">24 saat içinde yanıt</p>
              <Button variant="outline" asChild>
                <a href="mailto:info@rawises.com">E-posta Gönder</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${category.color} rounded-full flex items-center justify-center`}>
                    <category.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl text-rawises-800">{category.title}</span>
                  <Badge variant="secondary">{category.questions.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <Collapsible key={faq.id} open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-4 h-auto text-left hover:bg-gray-50"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredCategories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aradığınız soru bulunamadı</h3>
              <p className="text-gray-600 mb-6">
                "{searchTerm}" için sonuç bulunamadı. Farklı kelimeler deneyebilir veya bizimle iletişime
                geçebilirsiniz.
              </p>
              <Button asChild className="bg-rawises-600 hover:bg-rawises-700">
                <Link href="/musteri-hizmetleri">Müşteri Hizmetleri</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="mt-12 bg-gradient-to-r from-rawises-50 to-brand-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-rawises-800 mb-4">Cevabını Bulamadınız mı?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Aradığınız cevabı bulamadıysanız, müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-rawises-600 hover:bg-rawises-700">
                <Link href="/musteri-hizmetleri">Müşteri Hizmetleri</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/iletisim">İletişim</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
