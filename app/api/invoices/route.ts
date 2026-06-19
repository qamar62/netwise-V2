import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, subtotal, vat, total } = body ?? {}
    if (!data?.documentNumber) {
      return NextResponse.json({ error: 'Missing document data.' }, { status: 400 })
    }

    const { rows } = await query<{ id: string }>(
      `INSERT INTO invoices (type, document_number, client_name, data, subtotal, vat, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        data.type,
        data.documentNumber,
        data.client?.name ?? null,
        JSON.stringify(data),
        subtotal ?? 0,
        vat ?? 0,
        total ?? 0,
      ],
    )

    return NextResponse.json({ ok: true, id: rows[0]?.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { rows } = await query(
      `SELECT id, document_number, type, client_name, created_at, total
       FROM invoices
       ORDER BY created_at DESC
       LIMIT 10`,
    )

    const data = rows.map((row) => ({
      ...row,
      total: Number(row.total),
    }))

    return NextResponse.json({ data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
