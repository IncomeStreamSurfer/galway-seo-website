import Link from 'next/link'
import { getLocation, getPagesByLocation, getAllLocations } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const locations = await getAllLocations()
  return locations.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = await getLocation(params.slug)

  if (!location) {
    return {
      title: 'Location Not Found | Galway SEO'
    }
  }

  return {
    title: `Digital Services in ${location.name} | Web Design, SEO & Marketing | Galway SEO`,
    description: `Professional digital agency services in ${location.name}, ${location.county}. Web design, SEO, AI marketing, and more. Trusted by local businesses.`,
    keywords: `digital agency ${location.name}, web design ${location.name}, SEO ${location.name}, marketing ${location.county}`,
  }
}

export default async function LocationPage({ params }: Props) {
  const location = await getLocation(params.slug)

  if (!location) {
    notFound()
  }

  const services = await getPagesByLocation(params.slug)

  // Group by service type
  const groupedServices: { [key: string]: typeof services } = {}
  services.forEach(page => {
    if (!groupedServices[page.service]) {
      groupedServices[page.service] = []
    }
    groupedServices[page.service].push(page)
  })

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-white transition">Locations</Link>
              <span>/</span>
              <span className="text-white">{location.name}</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Digital Services in <span className="gradient-text">{location.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional web design, SEO, and marketing services for businesses in {location.name}, {location.county}.
            </p>

            <div className="inline-flex items-center space-x-6 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8">
              {location.population && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">{location.population.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Population</div>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                </>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">{services.length}</div>
                <div className="text-xs text-gray-400">Services Available</div>
              </div>
              {location.distanceFromMain.value > 0 && (
                <>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">{location.distanceFromMain.value}{location.distanceFromMain.unit}</div>
                    <div className="text-xs text-gray-400">From Galway City</div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Get Started
              </Link>
              <a href="tel:+353861530832" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Call +353 86 153 0832
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              Services in {location.name}
            </h2>
            <p className="text-xl text-gray-400 mb-12 text-center">
              We offer {services.length} professional digital services to help your {location.name} business succeed online
            </p>

            <div className="space-y-8">
              {Object.entries(groupedServices).map(([serviceName, pages], index) => (
                <div key={serviceName} className="glass-card rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{serviceName}</h3>
                  <p className="text-gray-400 mb-6">
                    {pages[0]?.shortDescription || `Professional ${serviceName.toLowerCase()} services in ${location.name}.`}
                  </p>
                  <Link
                    href={`/${pages[0]?.id}`}
                    className="btn-primary text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center"
                  >
                    Learn More About {serviceName}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">
              All Available Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.id}`}
                  className="glass-card rounded-xl p-6 hover:scale-105 transition-transform"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{page.service}</h3>
                  <p className="text-sm text-gray-400 mb-4">{location.name}</p>
                  <span className="text-primary font-semibold inline-flex items-center text-sm">
                    View Details
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Location */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Why Choose Galway SEO in {location.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Local Expertise',
                  description: `We understand the ${location.name} market and what works for local businesses. Our strategies are tailored to your specific location.`
                },
                {
                  title: 'Proven Track Record',
                  description: `9+ years serving businesses across Galway with measurable results. We've helped numerous ${location.name} businesses grow online.`
                },
                {
                  title: 'Comprehensive Services',
                  description: `From web design to AI-powered marketing, we offer everything your ${location.name} business needs under one roof.`
                },
                {
                  title: 'Dedicated Support',
                  description: `Your success is our priority. Get personalized support from our team based in Galway who understand your needs.`
                }
              ].map((item, index) => (
                <div key={index} className="glass-card rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Grow Your {location.name} Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today for a free consultation and discover how we can help your business succeed online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Get Free Consultation
              </Link>
              <a href="mailto:hello@galwayseo.ai" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
