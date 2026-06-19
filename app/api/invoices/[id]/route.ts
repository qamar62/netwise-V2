import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export const runtime = 'nodejs'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    const { rows } = await query(
      `SELECT id, document_number, type, client_name, created_at, total, subtotal, vat, data
       FROM invoices
       WHERE id = $1
       LIMIT 1`,
      [id],
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 })
    }

    const row = rows[0]
    const data = {
      ...row,
      total: Number(row.total),
      subtotal: Number(row.subtotal),
      vat: Number(row.vat),
    }

    return NextResponse.json({ data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { data, subtotal, vat, total } = body ?? {}

    if (!data?.documentNumber) {
      return NextResponse.json({ error: 'Missing document data.' }, { status: 400 })
    }

    const { rowCount } = await query(
      `UPDATE invoices
       SET type = $1,
           document_number = $2,
           client_name = $3,
           data = $4,
           subtotal = $5,
           vat = $6,
           total = $7
       WHERE id = $8`,
      [
        data.type,
        data.documentNumber,
        data.client?.name ?? null,
        JSON.stringify(data),
        subtotal ?? 0,
        vat ?? 0,
        total ?? 0,
        id,
      ],
    )

    if (rowCount === 0) {
      return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
