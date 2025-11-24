import { MetadataRoute } from 'next'
import { getServicePages } from '../lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://galwayseo.ai'

  // Get all service+location pages
  const servicePages = getServicePages()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Service category pages
  const serviceCategories = [
    'web-design-development',
    'seo-services',
    'ai-marketing',
    'content-marketing',
    'ppc-google-ads',
    'social-media-marketing',
    'brand-identity',
    'email-marketing',
    'ecommerce-marketing',
    'video-marketing',
  ]

  const serviceCategoryPages = serviceCategories.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Location pages
  const locations = [
    'galway-city', 'oranmore', 'salthill', 'knocknacarra', 'renmore',
    'athenry', 'loughrea', 'tuam', 'ballinasloe', 'clifden',
    'moycullen', 'barna', 'spiddal', 'oughterard', 'headford',
    'clarinbridge', 'craughwell', 'kinvara', 'gort', 'portumna',
  ]

  const locationPages = locations.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Service+Location pages (the main SEO pages)
  const serviceLocationPages = servicePages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...serviceCategoryPages,
    ...locationPages,
    ...serviceLocationPages,
  ]
}
