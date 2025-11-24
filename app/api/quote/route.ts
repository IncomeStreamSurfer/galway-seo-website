import { NextRequest, NextResponse } from 'next/server'
import { submitQuoteRequest } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.service) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, and service are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Get metadata from request
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      undefined
    const userAgent = request.headers.get('user-agent') || undefined
    const referrer = request.headers.get('referer') || undefined

    // Submit to database
    const result = await submitQuoteRequest({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      website: body.website,
      service: body.service,
      location: body.location,
      budget: body.budget,
      timeline: body.timeline,
      description: body.description,
      hasExistingWebsite: body.hasExistingWebsite || false,
      currentProvider: body.currentProvider,
      sourceUrl: body.sourceUrl || referrer,
      ipAddress,
      userAgent,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Thank you for your quote request! We will review your requirements and get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again.' },
      { status: 500 }
    )
  }
}
