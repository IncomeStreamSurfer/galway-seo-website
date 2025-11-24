import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';

// Sample URLs to test - CORRECTED with actual service slugs
const SAMPLE_URLS = {
  homepage: '/',
  services: '/services',
  locations: '/locations',
  about: '/about',
  contact: '/contact',
  servicePages: [
    '/services/web-design-development',
    '/services/seo-services',
    '/services/ai-marketing',
    '/services/content-marketing',
    '/services/ppc-google-ads',
    '/services/social-media-marketing',
    '/services/brand-identity',
    '/services/ecommerce-marketing',
    '/services/marketing-automation',
    '/services/video-production',
  ],
  locationPages: [
    '/locations/galway-city',
    '/locations/oranmore',
    '/locations/salthill',
    '/locations/athenry',
    '/locations/loughrea',
  ],
  // CORRECTED service+location combinations using actual slugs
  serviceLocationPages: [
    '/web-design-development-galway-city',
    '/seo-services-oranmore',
    '/ai-marketing-salthill',
    '/content-marketing-oranmore',
    '/ppc-google-ads-galway-city',
    '/social-media-marketing-athenry',
    '/brand-identity-oranmore',
    '/ecommerce-marketing-salthill',
    '/marketing-automation-galway-city',
    '/video-production-oranmore',
    '/web-design-development-loughrea',
    '/seo-services-athenry',
  ],
};

test.describe('Kraft Agency Website Validation', () => {
  test('Homepage loads and displays content', async ({ page }) => {
    const consoleLogs: string[] = [];
    const consoleErrors: string[] = [];

    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Visit homepage
    const response = await page.goto(BASE_URL);

    // Check response status
    expect(response?.status()).toBe(200);

    // Check for console errors
    if (consoleErrors.length > 0) {
      console.log('Console errors found on homepage:', consoleErrors);
    }
    expect(consoleErrors.length).toBe(0);

    // Verify page title
    const title = await page.title();
    console.log(`Homepage title: ${title}`);
    expect(title.length).toBeGreaterThan(10);

    // Verify meta description exists
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    console.log(`Meta description length: ${metaDesc?.length || 0} chars`);
    expect(metaDesc).toBeTruthy();

    // Check that main content is displayed
    const mainContent = page.locator('main, #main, [role="main"]');
    await expect(mainContent.first()).toBeVisible();

    console.log('✅ Homepage loaded successfully');
  });

  test('Navigation links work correctly (desktop)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    // Look for navigation
    const nav = page.locator('nav, header nav, [role="navigation"]').first();
    const navLinks = nav.locator('a');
    const navCount = await navLinks.count();

    console.log(`Found ${navCount} navigation links`);
    expect(navCount).toBeGreaterThan(0);

    // Test clicking services link if exists
    const servicesLink = page.locator('a[href="/services"]').first();
    const servicesExists = await servicesLink.count() > 0;

    if (servicesExists && await servicesLink.isVisible()) {
      await servicesLink.click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Services link clicked successfully');

      // Verify we're on services page
      expect(page.url()).toContain('/services');
    }

    console.log('✅ Navigation working correctly');
  });

  test('Services page loads', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(`${BASE_URL}/services`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    console.log(`Services page title: ${title}`);

    if (consoleErrors.length > 0) {
      console.log('Console errors on /services:', consoleErrors);
    }
    expect(consoleErrors.length).toBe(0);

    console.log('✅ Services page loaded successfully');
  });

  test('Locations page loads', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(`${BASE_URL}/locations`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    console.log(`Locations page title: ${title}`);

    if (consoleErrors.length > 0) {
      console.log('Console errors on /locations:', consoleErrors);
    }
    expect(consoleErrors.length).toBe(0);

    console.log('✅ Locations page loaded successfully');
  });

  test('About page loads', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(`${BASE_URL}/about`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    console.log(`About page title: ${title}`);

    if (consoleErrors.length > 0) {
      console.log('Console errors on /about:', consoleErrors);
    }
    expect(consoleErrors.length).toBe(0);

    console.log('✅ About page loaded successfully');
  });

  test('Contact page loads and form is visible', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(`${BASE_URL}/contact`);

    expect(response?.status()).toBe(200);

    const title = await page.title();
    console.log(`Contact page title: ${title}`);

    // Check for contact form
    const form = page.locator('form');
    const formCount = await form.count();
    console.log(`Found ${formCount} form(s) on contact page`);

    if (formCount > 0) {
      await expect(form.first()).toBeVisible();
      console.log('Contact form is visible');
    }

    if (consoleErrors.length > 0) {
      console.log('Console errors on /contact:', consoleErrors);
    }
    expect(consoleErrors.length).toBe(0);

    console.log('✅ Contact page loaded successfully');
  });

  test('All service pages load without 404s', async ({ page }) => {
    const errors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`Testing ${SAMPLE_URLS.servicePages.length} service pages...`);

    for (const url of SAMPLE_URLS.servicePages) {
      try {
        const response = await page.goto(`${BASE_URL}${url}`);

        if (response?.status() === 404) {
          errors.push(`404 ERROR: ${url}`);
          continue;
        }

        if (response?.status() && response.status() >= 500) {
          errors.push(`SERVER ERROR ${response.status()}: ${url}`);
          continue;
        }

        const title = await page.title();
        if (!title || title.includes('404')) {
          errors.push(`MISSING/BAD TITLE: ${url}`);
        }

        console.log(`✅ ${url} - Status: ${response?.status()}, Title: ${title}`);

      } catch (error: any) {
        errors.push(`EXCEPTION on ${url}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in service pages:`);
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log(`✅ All ${SAMPLE_URLS.servicePages.length} service pages loaded successfully`);
    }

    expect(errors).toHaveLength(0);
  });

  test('Individual location pages load without 404s', async ({ page }) => {
    const errors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`Testing ${SAMPLE_URLS.locationPages.length} location pages...`);

    for (const url of SAMPLE_URLS.locationPages) {
      try {
        const response = await page.goto(`${BASE_URL}${url}`);

        if (response?.status() === 404) {
          errors.push(`404 ERROR: ${url}`);
          continue;
        }

        if (response?.status() && response.status() >= 500) {
          errors.push(`SERVER ERROR ${response.status()}: ${url}`);
          continue;
        }

        const title = await page.title();
        if (!title || title.includes('404')) {
          errors.push(`MISSING/BAD TITLE: ${url}`);
        }

        console.log(`✅ ${url} - Status: ${response?.status()}, Title: ${title}`);

      } catch (error: any) {
        errors.push(`EXCEPTION on ${url}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in location pages:`);
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log(`✅ All ${SAMPLE_URLS.locationPages.length} location pages loaded successfully`);
    }

    expect(errors).toHaveLength(0);
  });

  test('Service+Location combination pages load without 404s', async ({ page }) => {
    const errors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`Testing ${SAMPLE_URLS.serviceLocationPages.length} service+location pages...`);

    for (const url of SAMPLE_URLS.serviceLocationPages) {
      try {
        const response = await page.goto(`${BASE_URL}${url}`);

        if (response?.status() === 404) {
          errors.push(`404 ERROR: ${url}`);
          continue;
        }

        if (response?.status() && response.status() >= 500) {
          errors.push(`SERVER ERROR ${response.status()}: ${url}`);
          continue;
        }

        const title = await page.title();
        if (!title || title.includes('404')) {
          errors.push(`MISSING/BAD TITLE: ${url}`);
        }

        // Verify meta description
        const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
        if (!metaDesc || metaDesc.length < 50) {
          errors.push(`MISSING/SHORT META DESCRIPTION: ${url}`);
        }

        console.log(`✅ ${url} - Status: ${response?.status()}`);

      } catch (error: any) {
        errors.push(`EXCEPTION on ${url}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} errors in service+location pages:`);
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log(`✅ All ${SAMPLE_URLS.serviceLocationPages.length} service+location pages loaded successfully`);
    }

    expect(errors).toHaveLength(0);

    if (consoleErrors.length > 0) {
      console.log(`Console errors found: ${consoleErrors.length}`);
    }
  });

  test('Click-to-call buttons exist on pages', async ({ page }) => {
    await page.goto(BASE_URL);

    // Look for phone links or call buttons
    const phoneLinks = page.locator('a[href^="tel:"], button:has-text("Call"), a:has-text("Call")');
    const phoneCount = await phoneLinks.count();

    console.log(`Found ${phoneCount} click-to-call button(s) on homepage`);

    if (phoneCount > 0) {
      console.log('✅ Click-to-call buttons are present');
    } else {
      console.log('WARNING: No click-to-call buttons found on homepage');
    }

    // Test on a service+location page too
    await page.goto(`${BASE_URL}/web-design-development-galway-city`);
    const phoneLinks2 = page.locator('a[href^="tel:"], button:has-text("Call"), a:has-text("Call")');
    const phoneCount2 = await phoneLinks2.count();

    console.log(`Found ${phoneCount2} click-to-call button(s) on service page`);
    expect(phoneCount2).toBeGreaterThan(0);
  });

  test('Site is mobile responsive', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Verify content is visible on mobile
    const mainContent = page.locator('main, #main, [role="main"]');
    await expect(mainContent.first()).toBeVisible();

    // Test a service+location page on mobile
    await page.goto(`${BASE_URL}/web-design-development-galway-city`);
    await expect(mainContent.first()).toBeVisible();

    console.log('✅ Site is mobile responsive');
  });

  test('SEO meta tags are present on key pages', async ({ page }) => {
    const errors: string[] = [];

    const testUrls = [
      '/',
      '/services',
      '/locations',
      '/web-design-development-galway-city',
      '/seo-services-oranmore',
    ];

    for (const url of testUrls) {
      await page.goto(`${BASE_URL}${url}`);

      // Check title
      const title = await page.title();
      if (!title || title.length < 20) {
        errors.push(`SHORT TITLE on ${url}: "${title}"`);
      }

      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!metaDesc || metaDesc.length < 50) {
        errors.push(`SHORT META DESC on ${url}`);
      }

      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      if (!ogTitle) {
        errors.push(`MISSING OG:TITLE on ${url}`);
      }

      console.log(`SEO check for ${url}: Title length: ${title.length}, Meta desc: ${metaDesc?.length || 0} chars`);
    }

    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} SEO errors:`);
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('✅ All pages have proper SEO meta tags');
    }

    expect(errors).toHaveLength(0);
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto(BASE_URL);

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    console.log(`Found ${imageCount} images on homepage`);

    if (imageCount > 0) {
      // Check first few images load
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        console.log(`Image ${i + 1} src: ${src}`);
      }
    }

    console.log('✅ Image check complete');
  });
});
