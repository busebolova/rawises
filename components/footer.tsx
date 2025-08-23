"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter kayıt işlemi burada yapılacak
    console.log("Newsletter subscription:", email)
    setEmail("")
    alert("Newsletter aboneliğiniz başarıyla oluşturuldu!")
  }

  return (
    <footer className="bg-rawises-50 border-t border-rawises-100">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Desktop Footer */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <Image src="/rawises-logo.png" alt="Rawises" width={150} height={50} className="h-12 w-auto mb-4" />
                <p className="text-rawises-600 text-sm leading-relaxed">
                  Güzellik ve kişisel bakım ürünlerinde güvenilir adresiniz. Kaliteli ürünler, uygun fiyatlar ve hızlı
                  teslimat.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-rawises-800 mb-3">İletişim</h3>
                <div className="flex items-center gap-3 text-sm text-rawises-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+90 507 302 73 13</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-rawises-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>info@rawises.com</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-rawises-600">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold text-rawises-800 mb-3">Sosyal Medya</h3>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-rawises-800 mb-4">Hızlı Linkler</h3>
                <div className="space-y-2">
                  <Link
                    href="/hakkimizda"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Hakkımızda
                  </Link>
                  <Link
                    href="/iletisim"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    İletişim
                  </Link>
                  <Link href="/sss" className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors">
                    Sıkça Sorulan Sorular
                  </Link>
                  <Link
                    href="/musteri-hizmetleri"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Müşteri Hizmetleri
                  </Link>
                  <Link
                    href="/iade-degisim"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    İade & Değişim
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-rawises-800 mb-4">Yasal</h3>
                <div className="space-y-2">
                  <Link
                    href="/kvkk"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    KVKK
                  </Link>
                  <Link
                    href="/gizlilik-politikasi"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Gizlilik Politikası
                  </Link>
                  <Link
                    href="/kullanim-kosullari"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Kullanım Koşulları
                  </Link>
                  <Link
                    href="/cerez-politikasi"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Çerez Politikası
                  </Link>
                  <Link
                    href="/mesafeli-satis-sozlesmesi"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 transition-colors"
                  >
                    Mesafeli Satış Sözleşmesi
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-rawises-800 mb-4">Newsletter</h3>
                <p className="text-sm text-rawises-600 mb-4">
                  Kampanyalar ve yeni ürünlerden haberdar olmak için e-bültenimize abone olun.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-rawises-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 focus:border-transparent text-sm"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
                  >
                    Abone Ol
                  </Button>
                </form>
              </div>

              {/* Payment & Security */}
              <div>
                <h3 className="font-semibold text-rawises-800 mb-4">Güvenli Alışveriş</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-rawises-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>256-bit SSL Şifreleme</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-rawises-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>3D Secure Ödeme</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-rawises-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Hızlı & Güvenli Teslimat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden space-y-6">
          {/* Logo & Company Info */}
          <div className="text-center space-y-4">
            <Image src="/rawises-logo.png" alt="Rawises" width={120} height={40} className="h-10 w-auto mx-auto" />
            <p className="text-rawises-600 text-sm">Güzellik ve kişisel bakım ürünlerinde güvenilir adresiniz.</p>
          </div>

          {/* Contact Info */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-rawises-600">
              <Phone className="w-4 h-4" />
              <span>+90 507 302 73 13</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-rawises-600">
              <Mail className="w-4 h-4" />
              <span>info@rawises.com</span>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {/* Company Links */}
            <Collapsible open={isCompanyOpen} onOpenChange={setIsCompanyOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-lg border border-rawises-200">
                <span className="font-medium text-rawises-800">Şirket</span>
                {isCompanyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-lg border border-rawises-200">
                <div className="space-y-2">
                  <Link href="/hakkimizda" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    Hakkımızda
                  </Link>
                  <Link href="/iletisim" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    İletişim
                  </Link>
                  <Link
                    href="/musteri-hizmetleri"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 py-1"
                  >
                    Müşteri Hizmetleri
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Help Links */}
            <Collapsible open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-lg border border-rawises-200">
                <span className="font-medium text-rawises-800">Yardım</span>
                {isHelpOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-lg border border-rawises-200">
                <div className="space-y-2">
                  <Link href="/sss" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    Sıkça Sorulan Sorular
                  </Link>
                  <Link href="/iade-degisim" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    İade & Değişim
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Legal Links */}
            <Collapsible open={isLegalOpen} onOpenChange={setIsLegalOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white rounded-lg border border-rawises-200">
                <span className="font-medium text-rawises-800">Yasal Bilgiler</span>
                {isLegalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-3 bg-white rounded-lg border border-rawises-200">
                <div className="space-y-2">
                  <Link href="/kvkk" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    KVKK
                  </Link>
                  <Link
                    href="/gizlilik-politikasi"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 py-1"
                  >
                    Gizlilik Politikası
                  </Link>
                  <Link
                    href="/kullanim-kosullari"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 py-1"
                  >
                    Kullanım Koşulları
                  </Link>
                  <Link href="/cerez-politikasi" className="block text-sm text-rawises-600 hover:text-rawises-800 py-1">
                    Çerez Politikası
                  </Link>
                  <Link
                    href="/mesafeli-satis-sozlesmesi"
                    className="block text-sm text-rawises-600 hover:text-rawises-800 py-1"
                  >
                    Mesafeli Satış Sözleşmesi
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Newsletter Mobile */}
          <div className="bg-white p-4 rounded-lg border border-rawises-200">
            <h3 className="font-semibold text-rawises-800 mb-3 text-center">Newsletter</h3>
            <p className="text-sm text-rawises-600 mb-4 text-center">Kampanyalardan haberdar olun</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-rawises-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rawises-500 text-sm"
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rawises-600 to-brand-500 hover:from-rawises-700 hover:to-brand-600"
              >
                Abone Ol
              </Button>
            </form>
          </div>

          {/* Social Media Mobile */}
          <div className="text-center">
            <h3 className="font-semibold text-rawises-800 mb-3">Sosyal Medya</h3>
            <div className="flex justify-center gap-3">
              <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2 bg-transparent hover:bg-rawises-100">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rawises-200 mt-8 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-rawises-600">
            <div className="text-center lg:text-left">
              <p>&copy; 2024 Rawises. Tüm hakları saklıdır.</p>
            </div>
            <div className="text-center lg:text-right">
              <p>Tüm fiyatlara %20 KDV dahildir.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
