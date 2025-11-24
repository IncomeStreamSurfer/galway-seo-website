import Image from 'next/image'
import Link from 'next/link'
import { getServiceLocationPage, getAllServiceLocationPages } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContactForm from '@/components/ContactForm'

interface Props {
  params: {
    slug: string
  }
}

// Generate all static params for 242+ pages
export async function generateStaticParams() {
  const pages = await getAllServiceLocationPages()
  return pages.map((page) => ({
    slug: page.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getServiceLocationPage(params.slug)

  if (!page) {
    return {
      title: 'Page Not Found | Kraft Agency'
    }
  }

  return {
    title: page.pageTitle,
    description: page.metaDescription,
    keywords: [...page.keywords, ...page.localKeywords].join(', '),
    openGraph: {
      title: page.pageTitle,
      description: page.metaDescription,
      images: [page.images.heroImage.url],
      type: 'website',
    },
  }
}

export default async function ServiceLocationPage({ params }: Props) {
  const page = await getServiceLocationPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-darker overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={page.images.heroImage.url}
            alt={page.images.heroImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-darker/80 to-darker"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition">Services</Link>
              <span>/</span>
              <Link href={`/services/${page.serviceSlug}`} className="hover:text-white transition">{page.service}</Link>
              <span>/</span>
              <span className="text-white">{page.location}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {page.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {page.heroSubheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={`tel:${page.ctaPhone}`} className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {page.ctaPhone}
              </a>
              <Link href="#contact" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                {page.ctaText}
              </Link>
            </div>

            {/* Service Area Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm text-gray-300">Serving {page.serviceArea}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed">
                {page.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              {page.h2Headings[0] || `Why Choose Us for ${page.service} in ${page.location}?`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.benefits.map((benefit, index) => (
                <div key={index} className="glass-card rounded-xl p-6 flex items-start space-x-4">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.images.gallery.map((image, index) => (
                <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-darker/90 to-transparent p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              {page.h2Headings[1] || 'Our Process'}
            </h2>
            <div className="space-y-8">
              {page.process.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="w-12 h-12 gradient-purple-blue rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-xl">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Guarantees */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Qualifications */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">Our Qualifications</h2>
              <ul className="space-y-4">
                {page.qualifications.map((qual, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                    </svg>
                    <span className="text-gray-300">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6">Our Guarantees</h2>
              <ul className="space-y-4">
                {page.guarantees.map((guarantee, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    <span className="text-gray-300">{guarantee}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      {page.pricingInfo && (
        <section className="py-20 bg-darker">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="font-display text-3xl font-bold text-white mb-4">Pricing Information</h2>
                <p className="text-gray-300 leading-relaxed">{page.pricingInfo}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              {page.h2Headings[4] || 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {page.faq.map((item, index) => (
                <div key={index} className="glass-card rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{item.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                {page.h2Headings[5] || 'Ready to Get Started?'}
              </h2>
              <p className="text-xl text-gray-400">
                Contact us today for your free consultation for {page.service.toLowerCase()} in {page.location}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <ContactForm />
              </div>

              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                    <a href={`tel:${page.ctaPhone}`} className="text-gray-400 hover:text-primary transition">{page.ctaPhone}</a>
                  </div>
                </div>

                {page.ctaEmail && (
                  <div className="glass-card rounded-2xl p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                      <a href={`mailto:${page.ctaEmail}`} className="text-gray-400 hover:text-primary transition">{page.ctaEmail}</a>
                    </div>
                  </div>
                )}

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Service Area</h3>
                  <p className="text-gray-400 mb-4">{page.serviceArea}</p>
                  <p className="text-gray-400 text-sm">
                    <strong>Availability:</strong> {page.availability}
                  </p>
                  {page.emergencyAvailable && (
                    <div className="mt-4 bg-accent/10 border border-accent/30 rounded-lg p-3">
                      <p className="text-accent text-sm font-semibold">Emergency Service Available 24/7</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-8">Related Services</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="btn-outline text-white px-6 py-3 rounded-lg font-semibold">
                View All Services
              </Link>
              <Link href={`/services/${page.serviceSlug}`} className="btn-outline text-white px-6 py-3 rounded-lg font-semibold">
                {page.service} in Other Locations
              </Link>
              <Link href="/locations" className="btn-outline text-white px-6 py-3 rounded-lg font-semibold">
                All {page.location} Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
