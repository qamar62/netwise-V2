import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Staff Login | NETWISE',
  description: 'Sign in to the NETWISE invoice and quotation generator.',
  robots: { index: false, follow: false },
}

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirect } = await searchParams
  const redirectTo = redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/invoice'

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="nw-grid-bg absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/80 to-background"
        aria-hidden
      />
      <div
        className="absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
              <Image src="/logo.png" alt="NETWISE logo" width={44} height={44} className="h-full w-full object-contain" />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="text-xl font-extrabold tracking-tight text-foreground">NETWISE</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Security Systems
              </span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-foreground">Staff Login</h1>
              <p className="text-sm text-muted-foreground">Invoice &amp; quotation generator</p>
            </div>
          </div>

          <LoginForm redirectTo={redirectTo} />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-primary transition-colors hover:text-primary/80">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
