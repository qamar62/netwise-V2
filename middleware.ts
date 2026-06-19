import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  SESSION_COOKIE,
  checkBasicAuth,
  hasAuthConfig,
  verifySessionToken,
} from '@/lib/auth'

const PROTECTED_PREFIXES = ['/invoice', '/data', '/api/invoices']
const PUBLIC_AUTH_PATHS = ['/login', '/api/auth/login', '/api/auth/logout']

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const session = request.cookies.get(SESSION_COOKIE)?.value
  if (session && (await verifySessionToken(session))) return true
  return checkBasicAuth(request.headers.get('authorization'))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isProtected(pathname) && !isPublicAuthPath(pathname)) {
    return NextResponse.next()
  }

  const authed = hasAuthConfig() ? await isAuthenticated(request) : false

  // Already signed in — skip the login page.
  if (pathname === '/login' && authed) {
    const redirect = request.nextUrl.searchParams.get('redirect')
    const dest =
      redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/invoice'
    return NextResponse.redirect(new URL(dest, request.url))
  }

  // Public auth endpoints and the login page itself.
  if (isPublicAuthPath(pathname)) {
    return NextResponse.next()
  }

  if (!authed) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
