export const SESSION_COOKIE = 'nw_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function getAuthCredentials() {
  return {
    username: process.env.BASIC_AUTH_USERNAME ?? '',
    password: process.env.BASIC_AUTH_PASSWORD ?? '',
  }
}

export function hasAuthConfig(): boolean {
  const { username, password } = getAuthCredentials()
  return Boolean(username && password)
}

export function validateCredentials(username: string, password: string): boolean {
  const creds = getAuthCredentials()
  if (!creds.username || !creds.password) return false
  return username === creds.username && password === creds.password
}

function getSecret(): string {
  const secret = process.env.BASIC_AUTH_PASSWORD
  if (!secret) throw new Error('Missing BASIC_AUTH_PASSWORD')
  return secret
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(b64: string): Uint8Array {
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
  const binary = atob(b64.replace(/-/g, '+').replace(/_/g, '/') + pad)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function importKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = JSON.stringify({ u: username, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  const encoder = new TextEncoder()
  const data = bytesToBase64Url(encoder.encode(payload))
  const key = await importKey()
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return `${data}.${bytesToBase64Url(new Uint8Array(sig))}`
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.')
    if (dot === -1) return false

    const data = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const encoder = new TextEncoder()
    const key = await importKey()

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlToBytes(sig),
      encoder.encode(data),
    )
    if (!valid) return false

    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(data))) as {
      u: string
      exp: number
    }
    return payload.exp > Date.now()
  } catch {
    return false
  }
}

/** Check Basic Auth header (useful for API clients). */
export function checkBasicAuth(authHeader: string | null): boolean {
  if (!authHeader?.startsWith('Basic ')) return false
  const { username, password } = getAuthCredentials()
  if (!username || !password) return false

  const decoded = atob(authHeader.split(' ')[1])
  const colon = decoded.indexOf(':')
  if (colon === -1) return false

  const user = decoded.slice(0, colon)
  const pass = decoded.slice(colon + 1)
  return user === username && pass === password
}
