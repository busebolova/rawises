"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
} from "lucide-react"
import Link from "next/link"

export default function OdemeSecenekleriPage() {
  const paymentMethods = [
    {
      title: "Kredi Kartı",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      features: ["3D Secure güvenlik", "Anında onay", "Taksit seçenekleri"],
      color: "bg-blue-100 text-blue-600",
      popular: true,
    },
    {
      title: "Banka Kartı",
      icon: CreditCard,
      description: "Debit kartlarla güvenli ödeme",
      features: ["Anında ödeme", "3D Secure", "Komisyon yok"],
      color: "bg-green-100 text-green-600",
      popular: false,
    },
    {
      title: "Havale/EFT",
      icon: Building2,
      description: "Banka havalesi ile ödeme",
      features: ["Komisyon yok", "Güvenli transfer", "1-2 gün sürer"],
      color: "bg-purple-100 text-purple-600",
      popular: false,
    },
    {
      title: "Mobil Ödeme",
      icon: Smartphone,
      description: "Mobil cüzdan uygulamaları",
      features: ["Hızlı ödeme", "Tek tıkla", "Güvenli"],
      color: "bg-orange-100 text-orange-600",
      popular: false,
    },
  ]

  const installmentOptions = [
    { bank: "Ziraat Bankası", installments: [2, 3, 6, 9, 12], minAmount: 100 },
    { bank: "İş Bankası", installments: [2, 3, 6, 9, 12], minAmount: 150 },
    { bank: "Garanti BBVA", installments: [2, 3, 6, 9, 12], minAmount: 200 },
    { bank: "Akbank", installments: [2, 3, 6, 9, 12], minAmount: 100 },
    { bank: "Yapı Kredi", installments: [2, 3, 6, 9, 12], minAmount: 150 },
    { bank: "Halkbank", installments: [2, 3, 6, 9, 12], minAmount: 100 },
  ]

  const securityFeatures = [
    {
      title: "SSL Sertifikası",
      description: "256-bit SSL şifreleme ile güvenli veri aktarımı",
      icon: Lock,
    },
    {
      title: "3D Secure",
      description: "Ekstra güvenlik katmanı ile kart doğrulama",
      icon: Shield,
    },
    {
      title: "PCI DSS",
      description: "Uluslararası ödeme güvenlik standartları",
      icon: CheckCircle,
    },
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
          <span className="text-rawises-600 font-medium">Ödeme Seçenekleri</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-rawises-800 mb-4">Ödeme Seçenekleri</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Size en uygun ödeme yöntemini seçin. Tüm ödemeleriniz güvenli altyapımızla korunmaktadır.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {paymentMethods.map((method, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-lg transition-shadow ${method.popular ? "ring-2 ring-rawises-200" : ""}`}
            >
              {method.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-rawises-600">Popüler</Badge>
              )}
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-rawises-800 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Installment Options */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-rawises-800 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Taksit Seçenekleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {installmentOptions.map((bank, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">{bank.bank}</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {bank.installments.map((installment) => (
                      <Badge key={installment} variant="outline">
                        {installment} Taksit
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Minimum tutar: {bank.minAmount} TL</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Taksit Bilgileri</h4>
                  <p className="text-sm text-blue-700">
                    Taksit seçenekleri bankanızın kampanyalarına göre değişiklik gösterebilir. Ödeme sayfasında güncel
                    taksit seçeneklerini görebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-rawises-800 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Güvenlik Önlemleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Güvenlik Garantisi
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                <div className="space-y-2">
                  <p>• Kart bilgileriniz hiçbir zaman saklanmaz</p>
                  <p>• Tüm işlemler şifreli bağlantı ile yapılır</p>
                  <p>• 3D Secure doğrulama zorunludur</p>
                </div>
                <div className="space-y-2">
                  <p>• PCI DSS sertifikalı altyapı</p>
                  <p>• 7/24 güvenlik izleme</p>
                  <p>• Fraud koruma sistemi</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-rawises-800 flex items-center gap-2">
              <Banknote className="w-6 h-6" />
              Havale/EFT Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Banka Hesap Bilgileri</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Banka:</span>
                    <p className="font-medium">Ziraat Bankası</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Hesap Sahibi:</span>
                    <p className="font-medium">Rawises Kozmetik Ltd. Şti.</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">IBAN:</span>
                    <p className="font-medium font-mono">TR64 0001 0000 0000 0000 0000 01</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Şube Kodu:</span>
                    <p className="font-medium">1234</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Havale Talimatları</h4>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Havale açıklamasına sipariş numaranızı yazınız</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Havale dekontu fotoğrafını WhatsApp'tan gönderin</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Ödeme onayı sonrası siparişiniz hazırlanır</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>İşlem süresi: 1-2 iş günü</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a
                      href="https://wa.me/905073027313?text=Merhaba, havale yaptım. Dekont göndermek istiyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp'ta Dekont Gönder
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-gradient-to-r from-rawises-50 to-brand-50">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-rawises-800 mb-4">Ödeme ile İlgili Sorularınız mı Var?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ödeme seçenekleri ve güvenlik hakkında daha fazla bilgi almak için sıkça sorulan sorular sayfamızı ziyaret
              edebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-rawises-600 hover:bg-rawises-700">
                <Link href="/sss">Sıkça Sorulan Sorular</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/musteri-hizmetleri">Müşteri Hizmetleri</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
