"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  Package,
  RefreshCw,
  CheckCircle,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function IadeDeğişimPage() {
  const returnSteps = [
    {
      step: 1,
      title: "İade Talebinde Bulunun",
      description: "Müşteri hizmetlerimizle iletişime geçin veya online form doldurun",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      step: 2,
      title: "Ürünü Hazırlayın",
      description: "Ürünü orijinal ambalajında, etiketleriyle birlikte hazırlayın",
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
    {
      step: 3,
      title: "Kargo ile Gönderin",
      description: "Size verilen kargo etiketiyle ürünü ücretsiz gönderebilirsiniz",
      icon: RefreshCw,
      color: "bg-orange-100 text-orange-600",
    },
    {
      step: 4,
      title: "İade İşlemi Tamamlanır",
      description: "Ürün kontrolünden sonra 3-5 iş günü içinde iadesi yapılır",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ]

  const returnConditions = [
    "Ürün 14 gün içinde iade edilmelidir",
    "Ürün kullanılmamış ve orijinal ambalajında olmalıdır",
    "Hijyen ürünleri (kozmetik, parfüm) açılmamış olmalıdır",
    "Fatura ve garanti belgesi eksiksiz olmalıdır",
    "Ürün hasarsız ve temiz durumda olmalıdır",
  ]

  const exchangeReasons = [
    { reason: "Ürün hasarlı/kusurlu geldi", time: "Anında" },
    { reason: "Yanlış ürün gönderildi", time: "Anında" },
    { reason: "Ürün beğenilmedi", time: "14 gün" },
    { reason: "Boyut/renk uygun değil", time: "14 gün" },
    { reason: "Beklentileri karşılamadı", time: "14 gün" },
  ]

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
          <span className="text-rawises-600 font-medium">İade & Değişim</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-rawises-800 mb-4">İade & Değişim</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Memnuniyetiniz bizim için önemli. İade ve değişim işlemlerinizi kolayca gerçekleştirebilirsiniz.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-rawises-600" />
              </div>
              <h3 className="font-semibold text-rawises-800 mb-2">Canlı Destek</h3>
              <p className="text-sm text-gray-600 mb-4">WhatsApp üzerinden anında destek alın</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a
                  href="https://wa.me/905073027313?text=Merhaba, iade/değişim konusunda yardım almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp'ta Yaz
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
              <p className="text-sm text-gray-600 mb-4">Hafta içi 09:00-18:00 arası</p>
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
              <p className="text-sm text-gray-600 mb-4">24 saat içinde yanıt alın</p>
              <Button variant="outline" asChild>
                <a href="mailto:info@rawises.com">E-posta Gönder</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-rawises-800 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" />
              İade Süreci
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step, index) => (
                <div key={step.step} className="text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">
                      Adım {step.step}
                    </Badge>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {index < returnSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-auto mt-4 hidden lg:block" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Return Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-rawises-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                İade Koşulları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {returnConditions.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Önemli Not</h4>
                    <p className="text-sm text-yellow-700">
                      Hijyen kuralları gereği açılmış kozmetik ve parfüm ürünleri iade edilemez. Sadece hasarlı veya
                      yanlış gönderim durumunda iade kabul edilir.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchange Reasons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-rawises-800 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                İade Süreleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exchangeReasons.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 text-sm">{item.reason}</span>
                    <Badge variant={item.time === "Anında" ? "default" : "secondary"}>{item.time}</Badge>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">İade Süreci</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• Ürün tarafımıza ulaştıktan sonra 1-2 iş günü içinde kontrol edilir</p>
                  <p>• Onay sonrası 3-5 iş günü içinde ödeme iadesi yapılır</p>
                  <p>• İade tutarı aynı ödeme yöntemiyle geri ödenir</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-rawises-50 to-brand-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-rawises-800 mb-4">Hala Sorularınız mı Var?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              İade ve değişim sürecinizle ilgili herhangi bir sorunuz varsa, müşteri hizmetlerimiz size yardımcı
              olmaktan mutluluk duyar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-rawises-600 hover:bg-rawises-700">
                <Link href="/musteri-hizmetleri">Müşteri Hizmetleri</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/sss">Sıkça Sorulan Sorular</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
