import Link from 'next/link'
import Image from 'next/image'
import { getService, getPagesByService, getAllServices } from '@/lib/data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found | Kraft Agency'
    }
  }

  return {
    title: `${service.name} Services in Galway | Kraft Agency`,
    description: `Expert ${service.name.toLowerCase()} services across County Galway. ${service.description}`,
    keywords: `${service.name}, ${service.slug}, Galway digital agency, ${service.category}`,
  }
}

export default async function ServicePage({ params }: Props) {
  const service = await getService(params.slug)

  if (!service) {
    notFound()
  }

  const servicePages = await getPagesByService(params.slug)

  // Group by location for display
  const locationGroups: { [key: string]: typeof servicePages } = {}
  servicePages.forEach(page => {
    if (!locationGroups[page.location]) {
      locationGroups[page.location] = []
    }
    locationGroups[page.location].push(page)
  })

  // Get first page for example content
  const examplePage = servicePages[0]

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
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {service.name} <span className="gradient-text">in Galway</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Get Started Today
              </Link>
              <a href="tel:+353861530832" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Call +353 86 153 0832
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      {examplePage && (
        <>
          {/* Benefits Section */}
          <section className="py-20 bg-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                  Why Choose Our {service.name} Services?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {examplePage.benefits.map((benefit, index) => (
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

          {/* Process Section */}
          <section className="py-20 bg-darker">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                  Our Process
                </h2>
                <div className="space-y-8">
                  {examplePage.process.map((step, index) => (
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
        </>
      )}

      {/* Locations Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 text-center">
              Available in <span className="gradient-text">{servicePages.length} Locations</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 text-center">
              We provide {service.name.toLowerCase()} services across County Galway
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {servicePages.map((page) => (
                <Link
                  key={page.id}
                  href={`/${page.id}`}
                  className="glass-card rounded-lg p-4 hover:scale-105 transition-transform text-center"
                >
                  <div className="text-white font-semibold mb-1">{page.location}</div>
                  <div className="text-sm text-gray-400">{service.name}</div>
                </Link>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today for a free consultation and discover how our {service.name.toLowerCase()} services can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Get Free Consultation
              </Link>
              <a href="mailto:hello@kraftagency.ie" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
