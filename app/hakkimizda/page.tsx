import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Award, Users, Sparkles, Shield, Truck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
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
              <Badge className="mb-6 bg-white/20 text-white border-white/30">Rawises Hakkında</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-rawises-100 bg-clip-text text-transparent">
                Size Güzel Bakıyoruz
              </h1>
              <p className="text-xl md:text-2xl text-rawises-100 mb-8 leading-relaxed">
                2024 yılından beri güzellik ve kişisel bakım sektöründe, kaliteli ürünler ve güvenilir hizmetle
                yanınızdayız.
              </p>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Rawises Kimdir?</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-rawises-600">RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ</strong> olarak,
                    güzellik ve kişisel bakım sektöründe faaliyet gösteren, müşteri memnuniyetini ön planda tutan bir
                    e-ticaret platformuyuz.
                  </p>
                  <p>
                    Adana merkezli şirketimiz, Türkiye genelinde hizmet vererek, kaliteli kozmetik ve kişisel bakım
                    ürünlerini uygun fiyatlarla müşterilerimizle buluşturmaktadır.
                  </p>
                  <p>
                    "Size Güzel Bakıyoruz" mottosuyla, sadece ürün satışı yapmakla kalmayıp, müşterilerimizin güzellik
                    yolculuğunda güvenilir bir partner olmayı hedefliyoruz.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-rawises-100 to-brand-100 rounded-2xl p-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-rawises-100 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-rawises-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Kalite Garantisi</h3>
                          <p className="text-sm text-gray-600">Orijinal ve güvenilir ürünler</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <Truck className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Hızlı Teslimat</h3>
                          <p className="text-sm text-gray-600">Türkiye geneli güvenli kargo</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-rawises-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-rawises-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Güvenli Alışveriş</h3>
                          <p className="text-sm text-gray-600">SSL sertifikalı ödeme sistemi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Rawises olarak bizi biz yapan temel değerler ve ilkelerimiz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Müşteri Odaklılık</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Müşterilerimizin ihtiyaçlarını anlayarak, onlara en uygun çözümleri sunmak bizim önceliğimizdir.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Kalite</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sadece orijinal, test edilmiş ve güvenilir markaların ürünlerini müşterilerimizle buluşturuyoruz.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-rawises-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Güven</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Şeffaf iletişim, güvenilir hizmet ve müşteri memnuniyeti odaklı yaklaşımımızla güven veriyoruz.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Şirket Bilgileri</h2>
                <p className="text-lg text-gray-600">Yasal bilgilerimiz ve iletişim detaylarımız</p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Şirket Bilgileri</h3>
                      <div className="space-y-3 text-gray-600">
                        <p>
                          <strong>Ünvan:</strong> RAWİSES İÇ VE DIŞ TİCARET LİMİTED ŞİRKETİ
                        </p>
                        <p>
                          <strong>Mersis No:</strong> 0735134318100001
                        </p>
                        <p>
                          <strong>Faaliyet Alanı:</strong> Kozmetik ve Kişisel Bakım Ürünleri E-Ticaret
                        </p>
                        <p>
                          <strong>Kuruluş Yılı:</strong> 2024
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">İletişim</h3>
                      <div className="space-y-3 text-gray-600">
                        <p>
                          <strong>Adres:</strong> Selahattin Eyyubi Mah. Kozan Cad. No:447 Yüreğir/ADANA
                        </p>
                        <p>
                          <strong>Telefon:</strong> +90 (322) 123 45 67
                        </p>
                        <p>
                          <strong>E-posta:</strong> info@rawises.com
                        </p>
                        <p>
                          <strong>Web:</strong> www.rawises.com
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gradient-to-r from-rawises-50 to-brand-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-rawises-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-rawises-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Misyonumuz</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Güzellik ve kişisel bakım sektöründe, kaliteli ürünleri uygun fiyatlarla müşterilerimize
                    ulaştırarak, onların güzellik yolculuğunda güvenilir bir partner olmak ve "Size Güzel Bakıyoruz"
                    anlayışıyla hizmet vermektir.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-brand-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Vizyonumuz</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-center">
                    Türkiye'nin en güvenilir ve tercih edilen online güzellik platformu olmak, müşteri memnuniyetinde
                    sektör standardını belirlemek ve sürekli yenilikçi çözümlerle sektöre öncülük etmektir.
                  </p>
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
