import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SessionProvider } from "@/components/providers/session-provider"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rawises - Güzellik ve Kozmetik Ürünleri",
  description:
    "Güzellik ve kozmetik dünyasının en kaliteli ürünlerini uygun fiyatlarla sunuyoruz. Orijinal ürün garantisi ile güvenli alışveriş.",
  keywords: "kozmetik, güzellik, makyaj, parfüm, cilt bakımı, saç bakımı",
  authors: [{ name: "Rawises" }],
  creator: "Rawises",
  publisher: "Rawises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rawises.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rawises - Güzellik ve Kozmetik Ürünleri",
    description: "Güzellik ve kozmetik dünyasının en kaliteli ürünlerini uygun fiyatlarla sunuyoruz.",
    url: "https://rawises.com",
    siteName: "Rawises",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Rawises - Güzellik ve Kozmetik",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawises - Güzellik ve Kozmetik Ürünleri",
    description: "Güzellik ve kozmetik dünyasının en kaliteli ürünlerini uygun fiyatlarla sunuyoruz.",
    images: ["/hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
          <WelcomeScreen />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
