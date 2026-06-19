import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://netwise.ae'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the internal invoice tooling out of search results.
      disallow: ['/invoice', '/data', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
