import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-32 sm:h-36"></div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Size nasıl yardımcı olabiliriz? Bizimle iletişime geçin!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Yazın</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad
                    </label>
                    <Input id="firstName" placeholder="Adınız" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Soyad
                    </label>
                    <Input id="lastName" placeholder="Soyadınız" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <Input id="email" type="email" placeholder="ornek@email.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <Input id="phone" placeholder="0555 123 45 67" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu
                  </label>
                  <Input id="subject" placeholder="Mesajınızın konusu" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj
                  </label>
                  <Textarea id="message" placeholder="Mesajınızı buraya yazın..." rows={6} />
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600">
                  Mesaj Gönder
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-rawises-600">
                    <Phone className="w-5 h-5" />
                    Telefon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Müşteri Hizmetleri</p>
                  <p className="text-lg font-semibold">0850 123 45 67</p>
                  <p className="text-sm text-gray-500 mt-2">Pzt-Cum 09:00-18:00</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-rawises-600">
                    <Mail className="w-5 h-5" />
                    E-posta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Genel Sorular</p>
                  <p className="text-lg font-semibold">info@rawises.com</p>
                  <p className="text-gray-600 mb-2 mt-4">Destek</p>
                  <p className="text-lg font-semibold">destek@rawises.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-rawises-600">
                    <MapPin className="w-5 h-5" />
                    Adres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Merkez Ofis</p>
                  <p className="text-lg font-semibold">
                    Selahattin Eyyubi Mah. Kozan Cad. No:447
                    <br />
                    Yüreğir / Adana
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-rawises-600">
                    <Clock className="w-5 h-5" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pazartesi - Cuma</span>
                      <span className="font-semibold">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cumartesi</span>
                      <span className="font-semibold">10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pazar</span>
                      <span className="text-red-500">Kapalı</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    Hızlı Destek
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Acil durumlar için WhatsApp üzerinden 7/24 destek alabilirsiniz.</p>
                  <Button variant="secondary" className="w-full">
                    WhatsApp ile İletişim
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
