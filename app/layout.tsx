import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"
import { RealtimeNotifications } from "@/components/realtime-notifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rawises - Size Güzel Bakıyoruz",
  description:
    "Rawises ile güvenli alışveriş yapın. Kaliteli ürünler, hızlı teslimat ve müşteri memnuniyeti odaklı hizmet.",
  keywords: "rawises, alışveriş, e-ticaret, güvenli alışveriş, kaliteli ürünler",
  authors: [{ name: "Rawises" }],
  creator: "Rawises",
  publisher: "Rawises",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.rawises.com",
    title: "Rawises - Size Güzel Bakıyoruz",
    description:
      "Rawises ile güvenli alışveriş yapın. Kaliteli ürünler, hızlı teslimat ve müşteri memnuniyeti odaklı hizmet.",
    siteName: "Rawises",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawises - Size Güzel Bakıyoruz",
    description:
      "Rawises ile güvenli alışveriş yapın. Kaliteli ürünler, hızlı teslimat ve müşteri memnuniyeti odaklı hizmet.",
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
          {children}
          <Toaster />
          <RealtimeNotifications />
        </SessionProvider>
      </body>
    </html>
  )
}
