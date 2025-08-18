"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

    setTimeout(() => setIsSubmitted(false), 5000)
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
              <Badge className="mb-6 bg-white/20 text-white border-white/30">İletişim</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-rawises-100 bg-clip-text text-transparent">
                Bizimle İletişime Geçin
              </h1>
              <p className="text-xl md:text-2xl text-rawises-100 mb-8 leading-relaxed">
                Sorularınız, önerileriniz veya destek talepleriniz için buradayız. Size en iyi şekilde yardımcı olmak
                için sabırsızlanıyoruz!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 -mt-10 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Adresimiz</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Selahattin Eyyubi Mah.
                    <br />
                    Kozan Cad. No:447
                    <br />
                    Yüreğir / ADANA
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
                  <p className="text-sm text-gray-600 mb-2">+90 (322) 123 45 67</p>
                  <p className="text-xs text-gray-500">
                    Pazartesi - Cuma
                    <br />
                    09:00 - 18:00
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">E-posta</h3>
                  <p className="text-sm text-gray-600 mb-2">info@rawises.com</p>
                  <p className="text-xs text-gray-500">
                    24 saat içinde
                    <br />
                    yanıt veriyoruz
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeadphonesIcon className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Canlı Destek</h3>
                  <p className="text-sm text-gray-600 mb-2">Anlık yardım</p>
                  <p className="text-xs text-gray-500">
                    Pazartesi - Cuma
                    <br />
                    09:00 - 18:00
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-rawises-600" />
                      Bize Mesaj Gönderin
                    </CardTitle>
                    <p className="text-gray-600">
                      Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. En kısa sürede size geri dönüş
                      yapacağız.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Send className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Mesajınız Gönderildi!</h3>
                        <p className="text-gray-600">Teşekkür ederiz. En kısa sürede size geri dönüş yapacağız.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                              Ad Soyad *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Adınız ve soyadınız"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              E-posta *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="ornek@email.com"
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                              Telefon
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="0532 123 45 67"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                              Konu *
                            </label>
                            <Input
                              id="subject"
                              name="subject"
                              type="text"
                              required
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Mesajınızın konusu"
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Mesajınız *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Mesajınızı buraya yazın..."
                            rows={6}
                            className="w-full"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-rawises-600 to-brand-600 hover:from-rawises-700 hover:to-brand-700 text-white py-3"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Mesajı Gönder
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                {/* Working Hours */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-rawises-600" />
                      Çalışma Saatleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pazartesi - Cuma</span>
                      <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cumartesi</span>
                      <span className="font-semibold text-gray-900">10:00 - 17:00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pazar</span>
                      <span className="font-semibold text-gray-900">11:00 - 16:00</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-rawises-50 to-brand-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Hızlı İletişim</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">
                      Acil durumlar için doğrudan arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.
                    </p>

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => window.open("tel:+903221234567")}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Hemen Ara
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => window.open("mailto:info@rawises.com")}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        E-posta Gönder
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Link */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">Sıkça Sorulan Sorular</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Merak ettiğiniz konular hakkında hızlı yanıtlar bulabilirsiniz.
                    </p>
                    <Button variant="outline" size="sm">
                      SSS'ye Git
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
