import Link from 'next/link'
import { getAllLocations, getPagesByLocation } from '@/lib/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Locations Across County Galway | Galway SEO',
  description: 'Galway SEO provides digital marketing, web design, SEO, and AI solutions across 48+ locations in County Galway, Ireland. Find services in your area.',
  keywords: 'digital agency Galway locations, web design Galway, SEO services Ireland, local digital marketing',
}

export default async function LocationsPage() {
  const locations = await getAllLocations()

  // Get count of services for each location
  const locationCounts = await Promise.all(
    locations.map(async (location) => {
      const pages = await getPagesByLocation(location.slug)
      return {
        ...location,
        serviceCount: pages.length
      }
    })
  )

  // Sort by population (biggest cities first)
  const sortedLocations = locationCounts.sort((a, b) => {
    if (a.isMainLocation) return -1
    if (b.isMainLocation) return 1
    return (b.population || 0) - (a.population || 0)
  })

  // Group by type
  const groupedLocations = sortedLocations.reduce((acc, loc) => {
    if (!acc[loc.type]) {
      acc[loc.type] = []
    }
    acc[loc.type].push(loc)
    return acc
  }, {} as Record<string, typeof locationCounts>)

  const typeOrder = ['city', 'town', 'suburb', 'village']
  const typeLabels: Record<string, string> = {
    city: 'Cities',
    town: 'Towns',
    suburb: 'Suburbs',
    village: 'Villages'
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-darker relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Serving <span className="gradient-text">All of Galway</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional digital services across {locations.length} locations in County Galway. From Galway City to the smallest villages, we're here to help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Main Locations */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Our Main <span className="gradient-text">Service Areas</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {sortedLocations.filter(loc => loc.isMainLocation).map((location) => (
                <div key={location.id} className="glass-card rounded-2xl p-8 group hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{location.name}</h3>
                      <p className="text-gray-400">{location.county}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">{location.serviceCount}</div>
                      <div className="text-sm text-gray-400">Services</div>
                    </div>
                  </div>
                  {location.population && (
                    <p className="text-gray-500 text-sm mb-4">Population: {location.population.toLocaleString()}</p>
                  )}
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-primary group-hover:text-secondary transition font-semibold inline-flex items-center"
                  >
                    View All Services
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

      {/* All Locations by Type */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              All Locations
            </h2>

            {typeOrder.map(type => {
              const locs = groupedLocations[type]
              if (!locs || locs.length === 0) return null

              return (
                <div key={type} className="mb-12">
                  <h3 className="text-2xl font-bold text-white mb-6">{typeLabels[type]}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {locs.map((location) => (
                      <Link
                        key={location.id}
                        href={`/locations/${location.slug}`}
                        className="glass-card rounded-lg p-4 hover:scale-105 transition-transform"
                      >
                        <div className="text-white font-semibold mb-1">{location.name}</div>
                        <div className="text-sm text-gray-400">{location.serviceCount} services</div>
                        {location.distanceFromMain.value > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            {location.distanceFromMain.value}{location.distanceFromMain.unit} from city
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Area Map Info */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <div className="w-20 h-20 gradient-purple-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Serving a 50km Radius
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Based in Galway/Oranmore, we provide comprehensive digital services to businesses across County Galway and beyond. No matter where you're located, we're here to help your business succeed online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-white px-8 py-4 rounded-lg font-semibold">
                  Get Started
                </Link>
                <a href="tel:+353861530832" className="btn-outline text-white px-8 py-4 rounded-lg font-semibold">
                  Call +353 86 153 0832
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
