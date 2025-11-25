import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '900']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://galwayseo.ai'),
  title: 'Galway SEO - Digital Craftspeople | Web Design, SEO, Marketing & AI Solutions',
  description: 'Full-service digital agency in Galway, Ireland. 9 years of crafting exceptional web design, SEO, marketing, and AI-powered solutions. Organic first approach.',
  keywords: 'digital agency Galway, web design Ireland, SEO Galway, AI marketing, digital marketing Ireland',
  openGraph: {
    title: 'Galway SEO - Digital Craftspeople',
    description: 'Full-service digital agency in Galway. Web design, SEO, marketing & AI solutions.',
    images: ['/og-image.jpg'],
    type: 'website',
    url: 'https://galwayseo.ai',
    siteName: 'Galway SEO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galway SEO - Digital Craftspeople',
    description: 'Full-service digital agency in Galway. Web design, SEO, marketing & AI solutions.',
  },
  alternates: {
    canonical: 'https://galwayseo.ai',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
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
