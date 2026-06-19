import type { Metadata } from 'next'
import { InvoiceGenerator } from '@/components/invoice-generator'

export const metadata: Metadata = {
  title: 'Invoice & Quotation Generator | NETWISE',
  description: 'Internal NETWISE tool for generating CCTV & security invoices and quotations.',
  robots: { index: false, follow: false },
}

export default function InvoicePage() {
  return <InvoiceGenerator />
}
