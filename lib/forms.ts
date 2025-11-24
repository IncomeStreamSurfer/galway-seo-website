import prisma from './db'
import { ContactForm, QuoteRequest, CallbackRequest, NewsletterSubscriber } from '@prisma/client'

// ============================================
// CONTACT FORM OPERATIONS
// ============================================

export interface ContactFormInput {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  service?: string
  location?: string
  sourceUrl?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
}

export async function submitContactForm(data: ContactFormInput): Promise<ContactForm> {
  return await prisma.contactForm.create({
    data,
  })
}

export async function getContactForms(options?: {
  status?: string
  service?: string
  location?: string
  limit?: number
}) {
  const where: any = {}

  if (options?.status) where.status = options.status
  if (options?.service) where.service = options.service
  if (options?.location) where.location = options.location

  return await prisma.contactForm.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 50,
  })
}

export async function updateContactFormStatus(
  id: string,
  status: string,
  notes?: string
) {
  return await prisma.contactForm.update({
    where: { id },
    data: {
      status,
      notes,
      respondedAt: status === 'contacted' ? new Date() : undefined,
      convertedAt: status === 'converted' ? new Date() : undefined,
    },
  })
}

// ============================================
// QUOTE REQUEST OPERATIONS
// ============================================

export interface QuoteRequestInput {
  name: string
  email: string
  phone: string
  company?: string
  website?: string
  service: string
  location?: string
  budget?: string
  timeline?: string
  description?: string
  hasExistingWebsite?: boolean
  currentProvider?: string
  sourceUrl?: string
  ipAddress?: string
  userAgent?: string
}

export async function submitQuoteRequest(data: QuoteRequestInput): Promise<QuoteRequest> {
  return await prisma.quoteRequest.create({
    data,
  })
}

export async function getQuoteRequests(options?: {
  status?: string
  service?: string
  limit?: number
}) {
  const where: any = {}

  if (options?.status) where.status = options.status
  if (options?.service) where.service = options.service

  return await prisma.quoteRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 50,
  })
}

export async function updateQuoteRequestStatus(
  id: string,
  status: string,
  quotedAmount?: number
) {
  return await prisma.quoteRequest.update({
    where: { id },
    data: {
      status,
      quotedAmount,
      quotedAt: status === 'quoted' && quotedAmount ? new Date() : undefined,
      acceptedAt: status === 'accepted' ? new Date() : undefined,
    },
  })
}

// ============================================
// CALLBACK REQUEST OPERATIONS
// ============================================

export interface CallbackRequestInput {
  name: string
  phone: string
  email?: string
  preferredTime?: string
  preferredDate?: Date
  service?: string
  location?: string
  sourceUrl?: string
}

export async function submitCallbackRequest(data: CallbackRequestInput): Promise<CallbackRequest> {
  return await prisma.callbackRequest.create({
    data,
  })
}

export async function getCallbackRequests(options?: {
  status?: string
  limit?: number
}) {
  const where: any = {}

  if (options?.status) where.status = options.status

  return await prisma.callbackRequest.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 50,
  })
}

export async function updateCallbackStatus(
  id: string,
  status: string,
  callOutcome?: string
) {
  return await prisma.callbackRequest.update({
    where: { id },
    data: {
      status,
      callOutcome,
      calledAt: status === 'called' || status === 'completed' ? new Date() : undefined,
    },
  })
}

// ============================================
// NEWSLETTER OPERATIONS
// ============================================

export interface NewsletterSubscriberInput {
  email: string
  name?: string
  company?: string
  location?: string
  interests?: string[]
  sourceUrl?: string
}

export async function subscribeNewsletter(
  data: NewsletterSubscriberInput
): Promise<NewsletterSubscriber> {
  return await prisma.newsletterSubscriber.upsert({
    where: { email: data.email },
    update: {
      subscribed: true,
      name: data.name,
      company: data.company,
      location: data.location,
      interests: data.interests || [],
    },
    create: data,
  })
}

export async function unsubscribeNewsletter(email: string, reason?: string) {
  return await prisma.newsletterSubscriber.update({
    where: { email },
    data: {
      subscribed: false,
      unsubscribedAt: new Date(),
      unsubscribeReason: reason,
    },
  })
}

export async function getNewsletterSubscribers(subscribed: boolean = true) {
  return await prisma.newsletterSubscriber.findMany({
    where: { subscribed },
    orderBy: { createdAt: 'desc' },
  })
}

// ============================================
// PAGE VIEW / ANALYTICS OPERATIONS
// ============================================

export interface PageViewInput {
  pageUrl: string
  pageTitle?: string
  pageType: string
  service?: string
  location?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  country?: string
  city?: string
  sessionId?: string
  isNewVisitor?: boolean
  timeOnPage?: number
  scrollDepth?: number
  deviceType?: string
  browser?: string
  os?: string
}

export async function trackPageView(data: PageViewInput) {
  return await prisma.pageView.create({
    data,
  })
}

export async function getPageViewAnalytics(options?: {
  pageType?: string
  service?: string
  location?: string
  startDate?: Date
  endDate?: Date
}) {
  const where: any = {}

  if (options?.pageType) where.pageType = options.pageType
  if (options?.service) where.service = options.service
  if (options?.location) where.location = options.location

  if (options?.startDate || options?.endDate) {
    where.createdAt = {}
    if (options.startDate) where.createdAt.gte = options.startDate
    if (options.endDate) where.createdAt.lte = options.endDate
  }

  const views = await prisma.pageView.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 1000,
  })

  // Calculate aggregated stats
  const totalViews = views.length
  const uniqueVisitors = new Set(views.map(v => v.sessionId || v.ipAddress)).size
  const avgTimeOnPage = views
    .filter(v => v.timeOnPage)
    .reduce((sum, v) => sum + (v.timeOnPage || 0), 0) / views.length || 0
  const avgScrollDepth = views
    .filter(v => v.scrollDepth)
    .reduce((sum, v) => sum + (v.scrollDepth || 0), 0) / views.length || 0

  // Top pages
  const pageUrlCounts = views.reduce((acc, view) => {
    acc[view.pageUrl] = (acc[view.pageUrl] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topPages = Object.entries(pageUrlCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([url, count]) => ({ url, views: count }))

  return {
    totalViews,
    uniqueVisitors,
    avgTimeOnPage: Math.round(avgTimeOnPage),
    avgScrollDepth: Math.round(avgScrollDepth),
    topPages,
  }
}

// ============================================
// LEAD MAGNET OPERATIONS
// ============================================

export interface LeadMagnetInput {
  name: string
  email: string
  company?: string
  phone?: string
  resourceType: string
  resourceTitle: string
  resourceSlug: string
  sourceUrl?: string
  ipAddress?: string
}

export async function trackLeadMagnetDownload(data: LeadMagnetInput) {
  return await prisma.leadMagnet.create({
    data,
  })
}

export async function getLeadMagnetsToFollowUp() {
  return await prisma.leadMagnet.findMany({
    where: {
      followedUp: false,
      downloadedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
    },
    orderBy: { downloadedAt: 'desc' },
  })
}
