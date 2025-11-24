# Database Setup - Kraft Agency Website

## Overview

Complete local PostgreSQL database with Prisma ORM for managing leads, contacts, and analytics for the Kraft Agency digital service website.

## Database Status

- **Database Engine**: PostgreSQL 15
- **Database Name**: kraft_agency_dev
- **ORM**: Prisma
- **Status**: Ready for use

## Tables Created

### 1. contact_forms
General contact form submissions and inquiries

**Fields:**
- id, createdAt, updatedAt
- name, email, phone, company
- message, service, location
- sourceUrl, ipAddress, userAgent, referrer
- status (new, contacted, qualified, converted, lost)
- notes, assignedTo, respondedAt, convertedAt

### 2. quote_requests
Serious leads requesting quotes or proposals

**Fields:**
- id, createdAt, updatedAt
- name, email, phone, company, website
- service, location
- budget, timeline, description
- hasExistingWebsite, currentProvider
- sourceUrl, ipAddress, userAgent
- status (pending, reviewing, quoted, accepted, declined, on-hold)
- quotedAmount, quotedAt, acceptedAt, notes, assignedTo

### 3. callback_requests
Quick lead capture for callback scheduling

**Fields:**
- id, createdAt, updatedAt
- name, phone, email
- preferredTime, preferredDate, service, location
- sourceUrl
- status (pending, scheduled, called, completed, no-answer)
- calledAt, scheduledFor, notes, callOutcome, assignedTo

### 4. newsletter_subscribers
Email newsletter subscribers

**Fields:**
- id, createdAt, updatedAt
- email (unique), name, company, location
- interests (array)
- subscribed, subscribedAt, unsubscribedAt, unsubscribeReason
- emailsSent, emailsOpened, emailsClicked
- lastEmailSentAt, lastOpenedAt
- sourceUrl

### 5. page_views
Analytics tracking for page views and engagement

**Fields:**
- id, createdAt
- pageUrl, pageTitle, pageType, service, location
- ipAddress, userAgent, referrer, country, city
- sessionId, isNewVisitor
- timeOnPage, scrollDepth
- deviceType, browser, os

### 6. lead_magnets
Downloadable resource tracking (guides, ebooks, templates)

**Fields:**
- id, createdAt, updatedAt
- name, email, company, phone
- resourceType, resourceTitle, resourceSlug
- sourceUrl, ipAddress
- downloadedAt, followedUp, followedUpAt, converted, convertedAt

### 7. blog_comments
Blog post comments (for future blog functionality)

**Fields:**
- id, createdAt, updatedAt
- name, email, website
- comment, postSlug
- approved, approvedAt, approvedBy
- status (pending, approved, spam, rejected)
- ipAddress, userAgent

## API Endpoints

### POST /api/contact
Submit a contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+353 87 123 4567",
  "company": "Acme Inc",
  "message": "I need help with web design",
  "service": "Web Design & Development",
  "location": "Galway"
}
```

**Response:**
```json
{
  "success": true,
  "id": "clx123abc...",
  "message": "Thank you for contacting us! We will get back to you shortly."
}
```

### POST /api/quote
Request a quote or proposal

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "phone": "+353 91 555 1234",
  "company": "Tech Startup",
  "website": "https://example.com",
  "service": "SEO Services",
  "location": "Dublin",
  "budget": "€5,000 - €10,000",
  "timeline": "1-3 months",
  "description": "Need comprehensive SEO audit and strategy",
  "hasExistingWebsite": true
}
```

### POST /api/callback
Request a callback

**Request Body:**
```json
{
  "name": "Bob Johnson",
  "phone": "+353 87 999 8888",
  "email": "bob@example.com",
  "preferredTime": "afternoon",
  "service": "Social Media Marketing"
}
```

### POST /api/newsletter
Subscribe to newsletter

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "Sarah Connor",
  "interests": ["Web Design", "SEO", "Content Marketing"]
}
```

### DELETE /api/newsletter?email=user@example.com
Unsubscribe from newsletter

### POST /api/analytics
Track page view (client-side analytics)

**Request Body:**
```json
{
  "pageUrl": "/web-design-galway-city",
  "pageTitle": "Web Design Galway - Kraft Agency",
  "pageType": "service-location",
  "service": "Web Design & Development",
  "location": "Galway City",
  "sessionId": "abc123...",
  "timeOnPage": 45,
  "scrollDepth": 80
}
```

## Helper Functions

All helper functions are available in `/lib/forms.ts`:

### Contact Forms
- `submitContactForm(data)`
- `getContactForms(options)`
- `updateContactFormStatus(id, status, notes)`

### Quote Requests
- `submitQuoteRequest(data)`
- `getQuoteRequests(options)`
- `updateQuoteRequestStatus(id, status, quotedAmount)`

### Callback Requests
- `submitCallbackRequest(data)`
- `getCallbackRequests(options)`
- `updateCallbackStatus(id, status, callOutcome)`

### Newsletter
- `subscribeNewsletter(data)`
- `unsubscribeNewsletter(email, reason)`
- `getNewsletterSubscribers(subscribed)`

### Analytics
- `trackPageView(data)`
- `getPageViewAnalytics(options)`

### Lead Magnets
- `trackLeadMagnetDownload(data)`
- `getLeadMagnetsToFollowUp()`

## Development Workflow

### Start Database
Database is already running (native PostgreSQL):
```bash
# Check status
pg_isready

# If needed, start PostgreSQL
brew services start postgresql@15
```

### View Database in Prisma Studio
```bash
npm run db:studio
```
Opens browser at http://localhost:5555 with visual database editor

### Run Migrations
```bash
npm run db:migrate
```

### Reset Database (Development Only)
```bash
npm run db:reset
```

### Check Database Tables
```bash
psql kraft_agency_dev -c "\dt"
```

### View Table Contents
```bash
# View contact forms
psql kraft_agency_dev -c "SELECT * FROM contact_forms ORDER BY created_at DESC LIMIT 10;"

# View quote requests
psql kraft_agency_dev -c "SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 10;"

# View page views
psql kraft_agency_dev -c "SELECT page_url, page_type, COUNT(*) as views FROM page_views GROUP BY page_url, page_type ORDER BY views DESC LIMIT 10;"
```

## Environment Variables

Local development uses `/Users/davison/opus4.5-test2/.env.local`:
```
DATABASE_URL="postgresql://davison@localhost:5432/kraft_agency_dev"
NODE_ENV="development"
```

For production deployment, update DATABASE_URL with production database credentials.

## Testing the Database

### Test Contact Form API
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+353 87 123 4567",
    "message": "This is a test message",
    "service": "Web Design",
    "location": "Galway"
  }'
```

### Test Quote Request API
```bash
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+353 87 123 4567",
    "service": "SEO Services",
    "budget": "€5,000 - €10,000",
    "timeline": "1-3 months"
  }'
```

## Database Backup (Future)

For production, consider:
- Automated daily backups
- Point-in-time recovery
- Backup to AWS S3 or similar
- Test restore procedures regularly

## Security Notes

1. **Never commit .env files** - Already in .gitignore
2. **Use environment variables** - All sensitive data in .env
3. **Input validation** - All API routes validate input
4. **SQL injection protection** - Prisma provides automatic protection
5. **Rate limiting** - Consider adding for production
6. **Authentication** - Add auth middleware for admin endpoints

## Production Deployment (Digital Ocean)

When ready for production:

1. Provision Digital Ocean Managed PostgreSQL
2. Update DATABASE_URL with production credentials
3. Run migrations: `npx prisma db push`
4. Set up automated backups
5. Configure monitoring and alerts

## Cost Estimates

- **Local Development**: Free (native PostgreSQL)
- **Digital Ocean Managed PostgreSQL**: ~$15/month (basic tier)
- **Includes**: Automatic backups, monitoring, scaling

## Next Steps

1. Start your Next.js dev server: `npm run dev`
2. Test forms by submitting data
3. View submissions in Prisma Studio: `npm run db:studio`
4. Build your frontend components to use these API routes
5. Add authentication for admin dashboard
6. Set up email notifications for new leads
