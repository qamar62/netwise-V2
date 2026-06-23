'use client'

import { Hash, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import type { DocumentData } from '@/lib/types'

interface DocumentDetailsFormProps {
  data: DocumentData
  onChange: (updates: Partial<DocumentData>) => void
}

export function DocumentDetailsForm({ data, onChange }: DocumentDetailsFormProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="h-5 w-5 text-secondary" />
          {data.type === 'invoice' ? 'Invoice' : 'Quotation'} Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="documentNumber">
              {data.type === 'invoice' ? 'Invoice' : 'Quote'} Number
            </FieldLabel>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="documentNumber"
                value={data.documentNumber}
                onChange={(e) => onChange({ documentNumber: e.target.value })}
                className="pl-10 font-mono"
              />
            </div>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={data.date}
                  onChange={(e) => onChange({ date: e.target.value })}
                  className="pl-10"
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="dueDate">
                {data.type === 'invoice' ? 'Due Date' : 'Valid Until'}
              </FieldLabel>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="dueDate"
                  type="date"
                  value={data.dueDate}
                  onChange={(e) => onChange({ dueDate: e.target.value })}
                  className="pl-10"
                />
              </div>
            </Field>
          </div>
          {data.type === 'invoice' && (
            <Field>
              <FieldLabel>Payment Status</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ status: 'paid' })}
                  className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    data.status === 'paid'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-input bg-background text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Paid
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ status: 'unpaid' })}
                  className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    data.status === 'unpaid'
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-input bg-background text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  Unpaid
                </button>
              </div>
            </Field>
          )}
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
