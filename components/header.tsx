'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database, FileText, LogOut, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_INFO } from '@/lib/types'

interface HeaderProps {
  documentType?: 'invoice' | 'quotation'
  onTypeChange?: (type: 'invoice' | 'quotation') => void
}

async function handleLogout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/login'
}

export function Header({ documentType, onTypeChange }: HeaderProps) {
  const pathname = usePathname()
  const isDataActive = pathname?.startsWith('/data')
  const isInvoiceActive = pathname === '/invoice'
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
              <Image src="/logo.png" alt="NETWISE logo" width={40} height={40} className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">{COMPANY_INFO.name.toUpperCase()}</h1>
              <p className="text-sm text-muted-foreground">CCTV & Security Solutions</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant={isInvoiceActive ? 'default' : 'outline'} size="sm" className="gap-2">
              <Link href="/invoice">
                <Receipt className="h-4 w-4" />
                Generator
              </Link>
            </Button>
            <Button asChild variant={isDataActive ? 'default' : 'outline'} size="sm" className="gap-2">
              <Link href="/data">
                <Database className="h-4 w-4" />
                Data
              </Link>
            </Button>
            {documentType && onTypeChange ? (
              <>
                <Button
                  variant={documentType === 'invoice' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTypeChange('invoice')}
                  className="gap-2"
                >
                  <Receipt className="h-4 w-4" />
                  Invoice
                </Button>
                <Button
                  variant={documentType === 'quotation' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onTypeChange('quotation')}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Quotation
                </Button>
              </>
            ) : null}
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
