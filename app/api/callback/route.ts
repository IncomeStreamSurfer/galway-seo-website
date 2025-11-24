import { NextRequest, NextResponse } from 'next/server'
import { submitCallbackRequest } from '../../../lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name and phone are required' },
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

    // Email validation (if provided)
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        )
      }
    }

    // Get metadata from request
    const referrer = request.headers.get('referer') || undefined

    // Submit to database
    const result = await submitCallbackRequest({
      name: body.name,
      phone: body.phone,
      email: body.email,
      preferredTime: body.preferredTime,
      preferredDate: body.preferredDate ? new Date(body.preferredDate) : undefined,
      service: body.service,
      location: body.location,
      sourceUrl: body.sourceUrl || referrer,
    })

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Thank you! We will call you back at your preferred time.',
    })
  } catch (error) {
    console.error('Callback request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit callback request. Please try again.' },
      { status: 500 }
    )
  }
}
