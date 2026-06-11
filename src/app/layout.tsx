import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Elara London Events — Luxury Event Management & DMC',
    template: '%s | Elara London Events',
  },
  description:
    "Elara London Events — London's most trusted luxury event management and DMC partner. Corporate events, private celebrations, venue sourcing, and bespoke experiences.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-ink font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
