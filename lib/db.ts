import { Pool, type QueryResultRow } from 'pg'

/**
 * Single shared Postgres connection pool.
 *
 * Credentials come from .env.local:
 *   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 *
 * Optional:
 *   DB_SSL = "true" | "false"  (default: false — use true only for cloud/managed Postgres)
 *
 * A module-level singleton is reused across hot reloads in dev so we don't
 * exhaust connections.
 */

const globalForDb = globalThis as unknown as {
  __netwisePool?: Pool
  __netwiseTableReady?: Promise<void>
}

/**
 * Parse DB_SSL (and similar flags). Default is false — typical for LAN/Proxmox Postgres.
 * Only enables SSL when explicitly set to true/1/yes/on.
 */
function envFlag(value: string | undefined, defaultValue = false): boolean {
  if (value == null) return defaultValue
  const normalized = value.trim().toLowerCase().replace(/^['"]|['"]$/g, '')
  if (normalized === '') return defaultValue
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true
  if (['false', '0', 'no', 'off'].includes(normalized)) return false
  return defaultValue
}

function createPool(): Pool {
  const host = process.env.DB_HOST
  const database = process.env.DB_NAME
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const port = Number(process.env.DB_PORT ?? 5432)

  if (!host || !database || !user) {
    throw new Error(
      'Missing Postgres env vars. Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD and DB_NAME in .env.local.',
    )
  }

  const useSsl = envFlag(process.env.DB_SSL, false)

  return new Pool({
    host,
    port,
    database,
    user,
    password,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  })
}

export function getPool(): Pool {
  if (!globalForDb.__netwisePool) {
    globalForDb.__netwisePool = createPool()
  }
  return globalForDb.__netwisePool
}

/**
 * Creates the invoices table if it does not exist. Runs once per process.
 */
export function ensureSchema(): Promise<void> {
  if (!globalForDb.__netwiseTableReady) {
    globalForDb.__netwiseTableReady = getPool()
      .query(
        `
        CREATE TABLE IF NOT EXISTS invoices (
          id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          type            TEXT NOT NULL,
          document_number TEXT NOT NULL,
          client_name     TEXT,
          data            JSONB NOT NULL,
          subtotal        NUMERIC(12, 2) NOT NULL DEFAULT 0,
          vat             NUMERIC(12, 2) NOT NULL DEFAULT 0,
          total           NUMERIC(12, 2) NOT NULL DEFAULT 0,
          created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices (created_at DESC);
        `,
      )
      .then(() => undefined)
      .catch((error) => {
        // Reset so a later request can retry schema creation.
        globalForDb.__netwiseTableReady = undefined
        throw error
      })
  }
  return globalForDb.__netwiseTableReady
}

/**
 * Convenience query helper that guarantees the schema exists first.
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  await ensureSchema()
  return getPool().query<T>(text, params as never)
}
