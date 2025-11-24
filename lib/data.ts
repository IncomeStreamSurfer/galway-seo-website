import fs from 'fs'
import path from 'path'

export interface ServiceLocation {
  id: string
  service: string
  serviceSlug: string
  location: string
  locationSlug: string
  pageTitle: string
  metaDescription: string
  heroHeadline: string
  heroSubheadline: string
  description: string
  shortDescription: string
  benefits: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  pricingInfo: string
  serviceArea: string
  availability: string
  qualifications: string[]
  yearsExperience: string
  guarantees: string[]
  emergencyAvailable: boolean
  images: {
    heroImage: {
      url: string
      alt: string
      caption: string
    }
    gallery: Array<{
      url: string
      alt: string
      caption: string
    }>
  }
  h2Headings: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  keywords: string[]
  localKeywords: string[]
  ctaPhone: string
  ctaEmail?: string
  ctaText: string
  ctaSecondary: string
}

export interface Location {
  id: string
  name: string
  slug: string
  type: string
  isMainLocation?: boolean
  distanceFromMain: {
    value: number
    unit: string
  }
  county: string
  population?: number
}

export interface Service {
  name: string
  slug: string
  category: string
  description: string
}

const PAGES_DIR = path.join(process.cwd(), 'pages')
const LOCATIONS_FILE = path.join(process.cwd(), 'locations.json')
const SCHEMA_FILE = path.join(process.cwd(), 'service-schema-template.json')

// Get all service+location pages
export async function getAllServiceLocationPages(): Promise<ServiceLocation[]> {
  const files = fs.readdirSync(PAGES_DIR).filter(file => file.endsWith('.json'))

  const pages = files.map(file => {
    const filePath = path.join(PAGES_DIR, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    try {
      return JSON.parse(fileContents) as ServiceLocation
    } catch (error) {
      console.error(`Error parsing ${file}:`, error)
      throw error
    }
  })

  return pages
}

// Get a single service+location page by ID
export async function getServiceLocationPage(id: string): Promise<ServiceLocation | null> {
  const filePath = path.join(PAGES_DIR, `${id}.json`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents) as ServiceLocation
}

// Get all locations
export async function getAllLocations(): Promise<Location[]> {
  const fileContents = fs.readFileSync(LOCATIONS_FILE, 'utf8')
  const data = JSON.parse(fileContents)
  return data.locations as Location[]
}

// Get a single location by slug
export async function getLocation(slug: string): Promise<Location | null> {
  const locations = await getAllLocations()
  return locations.find(loc => loc.slug === slug) || null
}

// Get all services
export async function getAllServices(): Promise<Service[]> {
  const fileContents = fs.readFileSync(SCHEMA_FILE, 'utf8')
  const data = JSON.parse(fileContents)
  return data.services as Service[]
}

// Get a single service by slug
export async function getService(slug: string): Promise<Service | null> {
  const services = await getAllServices()
  return services.find(svc => svc.slug === slug) || null
}

// Get all pages for a specific service
export async function getPagesByService(serviceSlug: string): Promise<ServiceLocation[]> {
  const allPages = await getAllServiceLocationPages()
  return allPages.filter(page => page.serviceSlug === serviceSlug)
}

// Get all pages for a specific location
export async function getPagesByLocation(locationSlug: string): Promise<ServiceLocation[]> {
  const allPages = await getAllServiceLocationPages()
  return allPages.filter(page => page.locationSlug === locationSlug)
}

// Get unique service slugs
export async function getUniqueServiceSlugs(): Promise<string[]> {
  const allPages = await getAllServiceLocationPages()
  const slugs = new Set(allPages.map(page => page.serviceSlug))
  return Array.from(slugs)
}

// Get unique location slugs
export async function getUniqueLocationSlugs(): Promise<string[]> {
  const allPages = await getAllServiceLocationPages()
  const slugs = new Set(allPages.map(page => page.locationSlug))
  return Array.from(slugs)
}
