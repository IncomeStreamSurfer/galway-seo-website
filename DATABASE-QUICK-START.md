# Database Quick Start Guide

## What Was Set Up

✓ PostgreSQL database: `kraft_agency_dev`
✓ Prisma ORM configured
✓ 7 database tables created
✓ 5 API endpoints ready to use
✓ Helper functions for all operations

## Quick Commands

```bash
# View database in browser
npm run db:studio

# Start development server
npm run dev

# Reset database (careful!)
npm run db:reset

# Push schema changes
npm run db:migrate
```

## Test the API

### 1. Start your server
```bash
npm run dev
```

### 2. Test contact form (in another terminal)
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+353 87 123 4567",
    "message": "Testing the contact form",
    "service": "Web Design & Development",
    "location": "Galway"
  }'
```

### 3. View the submission
```bash
npm run db:studio
```
Then navigate to: http://localhost:5555

## Using in Your Components

### React Component Example (Contact Form)

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      service: formData.get('service') as string,
      location: 'Galway', // or get from page context
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Thank you! We will contact you soon.')
        e.currentTarget.reset()
      } else {
        setMessage('Error: ' + result.error)
      }
    } catch (error) {
      setMessage('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        className="w-full px-4 py-2 border rounded"
      />
      <select
        name="service"
        required
        className="w-full px-4 py-2 border rounded"
      >
        <option value="">Select a service</option>
        <option value="Web Design & Development">Web Design & Development</option>
        <option value="SEO Services">SEO Services</option>
        <option value="AI Marketing">AI Marketing</option>
        <option value="Content Marketing">Content Marketing</option>
      </select>
      <textarea
        name="message"
        placeholder="Your Message"
        required
        rows={4}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {message && (
        <p className="text-center text-sm">{message}</p>
      )}
    </form>
  )
}
```

### Quick Quote Button Example

```typescript
'use client'

export default function QuickQuoteButton() {
  const handleQuickQuote = async () => {
    const name = prompt('Your name:')
    const email = prompt('Your email:')
    const phone = prompt('Your phone:')

    if (!name || !email || !phone) return

    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        service: 'General Inquiry',
        timeline: 'ASAP',
      }),
    })

    const result = await response.json()
    alert(result.message)
  }

  return (
    <button
      onClick={handleQuickQuote}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
    >
      Get Free Quote
    </button>
  )
}
```

### Track Page Views Example

```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker({
  pageType,
  service,
  location,
}: {
  pageType: string
  service?: string
  location?: string
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pageUrl: pathname,
        pageTitle: document.title,
        pageType,
        service,
        location,
        sessionId: getSessionId(), // Implement your session tracking
      }),
    })

    // Track time on page when user leaves
    const startTime = Date.now()
    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        pageUrl: pathname,
        pageType,
        timeOnPage,
      }))
    }
  }, [pathname, pageType, service, location])

  return null
}

function getSessionId() {
  // Simple session ID using localStorage
  let sessionId = localStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2)
    localStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}
```

## Available API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact` | POST | Contact form submissions |
| `/api/quote` | POST | Quote/proposal requests |
| `/api/callback` | POST | Callback scheduling |
| `/api/newsletter` | POST | Newsletter subscriptions |
| `/api/newsletter?email=...` | DELETE | Unsubscribe |
| `/api/analytics` | POST | Page view tracking |

## Database Tables

| Table | Purpose |
|-------|---------|
| `contact_forms` | General contact inquiries |
| `quote_requests` | Quote/proposal requests |
| `callback_requests` | Callback scheduling |
| `newsletter_subscribers` | Email subscribers |
| `page_views` | Analytics tracking |
| `lead_magnets` | Downloadable resources |
| `blog_comments` | Blog comments (future) |

## Next Steps

1. Build your form components using the examples above
2. Add email notifications when leads come in
3. Create an admin dashboard to view submissions
4. Set up automated follow-ups
5. Deploy to production with Digital Ocean Managed PostgreSQL

## Getting Help

- Full documentation: `/DATABASE.md`
- Helper functions: `/lib/forms.ts`
- Database schema: `/prisma/schema.prisma`
- API routes: `/app/api/*/route.ts`

## Pro Tips

1. Always validate input on both client and server
2. Use Prisma Studio to debug database issues
3. Track page views to see which services/locations are most popular
4. Set up email alerts for new quote requests
5. Use status tracking to manage your sales pipeline
