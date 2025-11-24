import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900']
})

export const metadata: Metadata = {
  title: 'Kraft Agency - Digital Craftspeople | Web Design, SEO, Marketing & AI Solutions',
  description: 'Full-service digital agency in Galway, Ireland. 9 years of crafting exceptional web design, SEO, marketing, and AI-powered solutions. Organic first approach.',
  keywords: 'digital agency Galway, web design Ireland, SEO Galway, AI marketing, digital marketing Ireland',
  openGraph: {
    title: 'Kraft Agency - Digital Craftspeople',
    description: 'Full-service digital agency in Galway. Web design, SEO, marketing & AI solutions.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-dark text-gray-100 font-sans antialiased">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
