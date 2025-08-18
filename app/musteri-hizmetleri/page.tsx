"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HeadphonesIcon,
  Package,
  RotateCcw,
  CreditCard,
  Truck,
  CheckCircle,
  HelpCircle,
} from "lucide-react"

export default function CustomerServicePage() {
  const [activeTab, setActiveTab] = useState("genel")

  const handleWhatsAppClick = () => {
    const phoneNumber = "905073027313" // +90 507 302 73 13
    const message = "Merhaba! Rawises müşteri hizmetleri ile iletişime geçmek istiyorum."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handlePhoneClick = () => {
    window.open("tel:+905073027313")
  }

  const faqData = {
    genel: [
      {
        question: "Siparişimi nasıl takip edebilirim?",
        answer:
          "Siparişinizi verdikten sonra e-posta adresinize gönderilen kargo takip numarası ile kargo firmasının web sitesinden takip edebilirsiniz.",
      },
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer:
          "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Tüm ödemeler SSL güvenlik sertifikası ile korunmaktadır.",
      },
      {
        question: "Kargo ücreti ne kadar?",
        answer:
          "500 TL ve üzeri alışverişlerde kargo ücretsizdir. 500 TL altı alışverişlerde kargo ücreti 29,90 TL'dir.",
      },
    ],
    iade: [
      {
        question: "İade sürem ne kadar?",
        answer: "Ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilirsiniz.",
      },
      {
        question: "Hangi ürünleri iade edemem?",
        answer:
          "Kozmetik ve kişisel bakım ürünleri, iç giyim ürünleri, tek kullanımlık ürünler ve ambalajı açılmış hijyen ürünleri iade edilemez.",
      },
      {
        question: "İade kargo ücreti kim öder?",
        answer:
          "Ürünün kusurlu olması durumunda kargo ücreti tarafımızca karşılanır. Diğer durumlarda iade kargo ücreti müşteriye aittir.",
      },
    ],
    teslimat: [
      {
        question: "Teslimat süresi ne kadar?",
        answer: "Standart teslimat 1-3 iş günü, aynı gün teslimat seçili bölgelerde mevcuttur.",
      },
      {
        question: "Hangi bölgelere teslimat yapıyorsunuz?",
        answer:
          "Türkiye genelinde tüm illere teslimat yapıyoruz. Aynı gün teslimat sadece İstanbul, Ankara ve İzmir'de mevcuttur.",
      },
      {
        question: "Kargom kaybolursa ne olur?",
        answer: "Kargo firması sorumluluğundaki kayıplar için yeni ürün gönderimi veya iade işlemi yapılır.",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-rawises-600 to-brand-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 border border-white rounded-full"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">Müşteri Hizmetleri</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-rawises-100 bg-clip-text text-transparent">
                Size Yardımcı Olmak İçin Buradayız
              </h1>
              <p className="text-xl md:text-2xl text-rawises-100 mb-8 leading-relaxed">
                7/24 canlı destek, hızlı çözümler ve güler yüzlü hizmet anlayışımızla yanınızdayız.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-16 -mt-10 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {/* WhatsApp Support */}
              <Card
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Canlı Destek</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    +90 507 302 73 13
                    <br />
                    Anında yanıt alın
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp'ta Yaz
                  </Button>
                </CardContent>
              </Card>

              {/* Phone Support */}
              <Card
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer"
                onClick={handlePhoneClick}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefon Desteği</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    +90 507 302 73 13
                    <br />
                    Pazartesi - Cuma: 09:00-18:00
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                </CardContent>
              </Card>

              {/* Email Support */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">E-posta Desteği</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    info@rawises.com
                    <br />
                    24 saat içinde yanıt
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-rawises-600 text-rawises-600 hover:bg-rawises-50 bg-transparent"
                    onClick={() => window.open("mailto:info@rawises.com")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    E-posta Gönder
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sipariş Takibi</h3>
                  <p className="text-sm text-gray-600">Siparişinizin durumunu öğrenin</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">İade & Değişim</h3>
                  <p className="text-sm text-gray-600">14 gün içinde kolay iade</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ödeme Sorunları</h3>
                  <p className="text-sm text-gray-600">Ödeme ile ilgili destek</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kargo & Teslimat</h3>
                  <p className="text-sm text-gray-600">Teslimat bilgileri</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* FAQ Tabs */}
              <div className="lg:col-span-1">
                <Card className="border-0 shadow-lg sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-rawises-600" />
                      Kategoriler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant={activeTab === "genel" ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === "genel" ? "bg-rawises-600 text-white" : "text-gray-600 hover:bg-rawises-50"
                      }`}
                      onClick={() => setActiveTab("genel")}
                    >
                      Genel Sorular
                    </Button>
                    <Button
                      variant={activeTab === "iade" ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === "iade" ? "bg-rawises-600 text-white" : "text-gray-600 hover:bg-rawises-50"
                      }`}
                      onClick={() => setActiveTab("iade")}
                    >
                      İade & Değişim
                    </Button>
                    <Button
                      variant={activeTab === "teslimat" ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === "teslimat" ? "bg-rawises-600 text-white" : "text-gray-600 hover:bg-rawises-50"
                      }`}
                      onClick={() => setActiveTab("teslimat")}
                    >
                      Kargo & Teslimat
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">
                      {activeTab === "genel" && "Genel Sorular"}
                      {activeTab === "iade" && "İade & Değişim"}
                      {activeTab === "teslimat" && "Kargo & Teslimat"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {faqData[activeTab as keyof typeof faqData].map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed ml-7">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-16">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-rawises-50 to-brand-50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeadphonesIcon className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sorunuz Çözülmedi mi?</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Aradığınız cevabı bulamadıysanız, müşteri hizmetleri ekibimiz size yardımcı olmaktan mutluluk duyar.
                    WhatsApp üzerinden anında destek alabilirsiniz.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleWhatsAppClick}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp'ta Destek Al
                    </Button>
                    <Button
                      variant="outline"
                      className="border-rawises-600 text-rawises-600 hover:bg-rawises-50 bg-transparent"
                      onClick={handlePhoneClick}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Telefon ile Ara
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Working Hours */}
            <div className="mt-12">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-rawises-600" />
                    Müşteri Hizmetleri Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">WhatsApp Destek</h4>
                      <p className="text-sm text-gray-600">7/24 Aktif</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Anında Yanıt</Badge>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Telefon Destek</h4>
                      <p className="text-sm text-gray-600">Pazartesi - Cuma</p>
                      <p className="text-sm text-gray-600">09:00 - 18:00</p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-rawises-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">E-posta Destek</h4>
                      <p className="text-sm text-gray-600">24 saat içinde</p>
                      <p className="text-sm text-gray-600">yanıt garantisi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
