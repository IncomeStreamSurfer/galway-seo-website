import { NextRequest, NextResponse } from 'next/server'
import { trackPageView } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.pageUrl || !body.pageType) {
      return NextResponse.json(
        { error: 'Missing required fields: pageUrl and pageType are required' },
        { status: 400 }
      )
    }

    // Get metadata from request
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      undefined
    const userAgent = request.headers.get('user-agent') || undefined
    const referrer = request.headers.get('referer') || undefined

    // Parse user agent for device info (basic)
    let deviceType = 'desktop'
    if (userAgent) {
      if (/mobile/i.test(userAgent)) deviceType = 'mobile'
      else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet'
    }

    // Track page view
    await trackPageView({
      pageUrl: body.pageUrl,
      pageTitle: body.pageTitle,
      pageType: body.pageType,
      service: body.service,
      location: body.location,
      ipAddress,
      userAgent,
      referrer: body.referrer || referrer,
      country: body.country,
      city: body.city,
      sessionId: body.sessionId,
      isNewVisitor: body.isNewVisitor,
      timeOnPage: body.timeOnPage,
      scrollDepth: body.scrollDepth,
      deviceType,
      browser: body.browser,
      os: body.os,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    // Don't return error to client - fail silently for analytics
    return NextResponse.json({ success: false })
  }
}
