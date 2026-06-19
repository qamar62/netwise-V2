import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing/landing-page'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://netwise.ae'

export const metadata: Metadata = {
  title: 'NETWISE | CCTV Installation & Security Camera Systems in Dubai',
  description:
    'NETWISE installs and maintains professional CCTV, surveillance and access-control systems for homes and businesses across Dubai, UAE. Free site survey and quote.',
  keywords: [
    'CCTV Dubai',
    'security cameras Dubai',
    'CCTV installation UAE',
    'surveillance systems Dubai',
    'access control Dubai',
    'NETWISE',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'NETWISE | CCTV & Security Camera Systems in Dubai',
    description:
      'Professional CCTV installation, monitoring and maintenance for homes and businesses in Dubai, UAE.',
    url: SITE_URL,
    siteName: 'NETWISE',
    locale: 'en_AE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NETWISE | CCTV & Security Camera Systems in Dubai',
    description:
      'Professional CCTV installation, monitoring and maintenance for homes and businesses in Dubai, UAE.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SecuritySystemInstallationService',
  name: 'NETWISE',
  description:
    'CCTV installation, surveillance, access control and security camera maintenance for homes and businesses in Dubai, UAE.',
  url: SITE_URL,
  telephone: '+971508836613',
  email: 'sarfrazibrahim@outlook.com',
  areaServed: { '@type': 'City', name: 'Dubai' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  openingHours: 'Sa-Th 08:00-20:00',
  priceRange: '$$',
  serviceType: [
    'CCTV Installation',
    '24/7 Remote Monitoring',
    'Maintenance & Repair',
    'Access Control',
    'Intercom Systems',
    'Network & IT Cabling',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  )
}
