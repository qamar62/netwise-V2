import { NextResponse } from 'next/server'
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  hasAuthConfig,
  validateCredentials,
} from '@/lib/auth'

export async function POST(request: Request) {
  if (!hasAuthConfig()) {
    return NextResponse.json({ error: 'Server auth not configured' }, { status: 500 })
  }

  let body: { username?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { username, password } = body
  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  const token = await createSessionToken(username)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return response
}
