import { NextRequest, NextResponse } from 'next/server'
import { subscribeNewsletter, unsubscribeNewsletter } from '@/lib/forms'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email address is required' },
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
    const referrer = request.headers.get('referer') || undefined

    // Subscribe to newsletter
    const result = await subscribeNewsletter({
      email: body.email,
      name: body.name,
      company: body.company,
      location: body.location,
      interests: body.interests || [],
      sourceUrl: body.sourceUrl || referrer,
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      subscribed: result.subscribed,
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const reason = searchParams.get('reason')

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    await unsubscribeNewsletter(email, reason || undefined)

    return NextResponse.json({
      success: true,
      message: 'You have been unsubscribed from our newsletter.',
    })
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    )
  }
}
