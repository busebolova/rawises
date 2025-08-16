"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const [isLegalOpen, setIsLegalOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
    // Newsletter API entegrasyonu burada yapılacak
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Merhaba! Rawises ürünleri hakkında bilgi almak istiyorum.")
    window.open(`https://wa.me/905073027313?text=${message}`, "_blank")
  }

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/rawises-logo.png" alt="Rawises" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rawises, güzellik ve kişisel bakım ürünlerinde güvenilir adresiniz. Kaliteli ürünler, uygun fiyatlar ve
              hızlı teslimat ile yanınızdayız.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-rawises-100">
                <Facebook className="w-4 h-4 text-blue-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-rawises-100">
                <Instagram className="w-4 h-4 text-pink-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-rawises-100">
                <Twitter className="w-4 h-4 text-blue-400" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-rawises-100">
                <Youtube className="w-4 h-4 text-red-600" />
              </Button>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Hızlı Linkler</h3>
            <div className="space-y-2">
              <Link href="/hakkimizda" className="block text-gray-600 hover:text-rawises-600 transition-colors text-sm">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="block text-gray-600 hover:text-rawises-600 transition-colors text-sm">
                İletişim
              </Link>
              <Button
                onClick={handleWhatsAppContact}
                variant="ghost"
                className="p-0 h-auto text-gray-600 hover:text-rawises-600 transition-colors text-sm justify-start"
              >
                WhatsApp Destek
              </Button>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-rawises-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Seyhan, Adana</p>
                  <p>Türkiye</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-rawises-600 flex-shrink-0" />
                <Link
                  href="tel:+905073027313"
                  className="text-sm text-gray-600 hover:text-rawises-600 transition-colors"
                >
                  +90 507 302 73 13
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-rawises-600 flex-shrink-0" />
                <Link
                  href="mailto:info@rawises.com"
                  className="text-sm text-gray-600 hover:text-rawises-600 transition-colors"
                >
                  info@rawises.com
                </Link>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-rawises-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Pazartesi - Cumartesi</p>
                  <p>09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Newsletter */}
        <div className="mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Bültenimize Abone Olun</h3>
            <p className="text-gray-600 text-sm mb-4">Yeni ürünler ve özel fırsatlardan haberdar olun</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-rawises-600 hover:bg-rawises-700">
                Abone Ol
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Yasal Bilgiler - Collapsible */}
        <Collapsible open={isLegalOpen} onOpenChange={setIsLegalOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-semibold text-gray-900">Yasal Bilgiler</span>
              {isLegalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/kvkk" className="text-sm text-gray-600 hover:text-rawises-600 transition-colors">
                KVKK
              </Link>
              <Link
                href="/gizlilik-politikasi"
                className="text-sm text-gray-600 hover:text-rawises-600 transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-sm text-gray-600 hover:text-rawises-600 transition-colors"
              >
                Kullanım Koşulları
              </Link>
              <Link href="/cerez-politikasi" className="text-sm text-gray-600 hover:text-rawises-600 transition-colors">
                Çerez Politikası
              </Link>
              <Link
                href="/mesafeli-satis-sozlesmesi"
                className="text-sm text-gray-600 hover:text-rawises-600 transition-colors"
              >
                Mesafeli Satış Sözleşmesi
              </Link>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-8" />

        {/* Ödeme Yöntemleri */}
        <div className="text-center mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Güvenli Ödeme</h4>
          <div className="flex justify-center items-center space-x-4 flex-wrap gap-2">
            <div className="bg-white p-2 rounded border">
              <span className="text-xs font-semibold text-blue-600">VISA</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-xs font-semibold text-red-600">MasterCard</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-xs font-semibold text-green-600">Troy</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-xs font-semibold text-purple-600">Sipay</span>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 Rawises. Tüm hakları saklıdır.</p>
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-rawises-600"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Yukarı Çık</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
