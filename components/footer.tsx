import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/rawises-logo.png"
                alt="Rawises"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Güzellik ve kozmetik dünyasının en kaliteli ürünlerini uygun fiyatlarla sunuyoruz. Orijinal ürün garantisi
              ile güvenli alışveriş.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rawises-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rawises-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rawises-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rawises-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-rawises-400">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Kampanyalar
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sipariş Takibi
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">
                  İade & Değişim
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-rawises-400">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/distance-sales" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rawises-400">İletişim</h3>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rawises-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">0850 123 45 67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rawises-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@rawises.com</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rawises-400">Adres</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rawises-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Selahattin Eyyubi Mah. Kozan Cad. No:447
                  <br />
                  Yüreğir / Adana
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rawises-400">Çalışma Saatleri</h3>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-rawises-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Pzt-Cum 09:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="bg-rawises-600 p-2 rounded-full">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Ücretsiz Kargo</h4>
                <p className="text-xs text-gray-400">500 TL üzeri siparişlerde</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="bg-rawises-600 p-2 rounded-full">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Güvenli Alışveriş</h4>
                <p className="text-xs text-gray-400">256-bit SSL sertifikası</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="bg-rawises-600 p-2 rounded-full">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Kolay Ödeme</h4>
                <p className="text-xs text-gray-400">Taksit imkanları</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="bg-rawises-600 p-2 rounded-full">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Hızlı Teslimat</h4>
                <p className="text-xs text-gray-400">Aynı gün kargo seçeneği</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-400">© 2024 Rawises. Tüm hakları saklıdır.</p>
              <p className="text-xs text-gray-500 mt-1">Mersis No: 0735134318100001</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Güvenli ödeme yöntemleri:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-blue-600">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-red-600">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-bold text-green-600">TROY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
