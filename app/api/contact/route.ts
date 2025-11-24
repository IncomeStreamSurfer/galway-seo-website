import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
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

    // Get metadata from request
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      undefined
    const userAgent = request.headers.get('user-agent') || undefined
    const referrer = request.headers.get('referer') || undefined

    // Submit to database
    const result = await submitContactForm({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      service: body.service,
      location: body.location,
      sourceUrl: body.sourceUrl || referrer,
      ipAddress,
      userAgent,
      referrer,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Thank you for contacting us! We will get back to you shortly.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve contact forms (protected route)
export async function GET(request: NextRequest) {
  // TODO: Add authentication middleware
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )
}
