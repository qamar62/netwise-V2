'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Toaster, toast } from 'sonner'
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import { Header } from './header'
import { ClientForm } from './client-form'
import { DocumentDetailsForm } from './document-details-form'
import { LineItemsForm } from './line-items-form'
import { PricingSummary } from './pricing-summary'
import { NotesForm } from './notes-form'
import { DocumentPreview } from './document-preview'
import { ActionButtons } from './action-buttons'
import type { DocumentData, ClientInfo, LineItem } from '@/lib/types'
import {
  createDefaultDocument,
  loadDraft,
  saveDraft,
  generateDocumentNumber,
  calculateSubtotal,
  calculateVAT,
  calculateGrandTotal,
} from '@/lib/document-store'
import { fetchInvoices, saveInvoice, type IssuedInvoiceRecord } from '@/lib/invoices-api'

export function InvoiceGenerator() {
  const [data, setData] = useState<DocumentData>(() => createDefaultDocument('invoice'))
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [isSavingIssued, setIsSavingIssued] = useState(false)
  const [issuedInvoices, setIssuedInvoices] = useState<IssuedInvoiceRecord[]>([])
  const previewRef = useRef<HTMLDivElement>(null)

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft()
    if (draft) {
      setData(draft)
      toast.info('Previous draft loaded')
    }
  }, [])

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const records = await fetchInvoices()
        setIssuedInvoices(records)
      } catch (error) {
        console.error('Failed to load invoices:', error)
      }
    }

    loadInvoices()
  }, [])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft(data)
    }, 30000)
    return () => clearInterval(interval)
  }, [data])

  const handleTypeChange = useCallback((type: 'invoice' | 'quotation') => {
    setData((prev) => ({
      ...prev,
      type,
      documentNumber: generateDocumentNumber(type),
      notes:
        type === 'invoice'
          ? 'Payment is due within 30 days. Thank you for your business!'
          : 'This quotation is valid for 30 days from the date of issue.',
    }))
  }, [])

  const handleClientChange = useCallback((client: ClientInfo) => {
    setData((prev) => ({ ...prev, client }))
  }, [])

  const handleDocumentChange = useCallback((updates: Partial<DocumentData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }, [])

  const handleItemsChange = useCallback((items: LineItem[]) => {
    setData((prev) => ({ ...prev, items }))
  }, [])

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return

    setIsGeneratingPdf(true)
    let sandbox: HTMLDivElement | null = null
    try {
      const element = previewRef.current.querySelector('#document-preview') as HTMLElement
      if (!element) {
        throw new Error('Preview element not found')
      }

      // Render the preview at a fixed full A4 width so nothing (e.g. the right
      // "Total" column) gets clipped by the constrained on-screen layout.
      // 794px ≈ A4 width (210mm) at 96 DPI.
      const A4_WIDTH_PX = 794
      sandbox = document.createElement('div')
      sandbox.style.position = 'fixed'
      sandbox.style.top = '0'
      sandbox.style.left = '-10000px'
      sandbox.style.width = `${A4_WIDTH_PX}px`
      sandbox.style.background = '#ffffff'

      const clone = element.cloneNode(true) as HTMLElement
      clone.style.width = `${A4_WIDTH_PX}px`
      sandbox.appendChild(clone)
      document.body.appendChild(sandbox)

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: A4_WIDTH_PX,
      })

      const pageWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm

      // Scale the captured image to fit entirely within a single A4 page,
      // preserving aspect ratio. Width-bound by default; if that would exceed
      // the page height, fall back to height-bound so it always fits one page.
      let imgWidth = pageWidth
      let imgHeight = (canvas.height * imgWidth) / canvas.width
      if (imgHeight > pageHeight) {
        imgHeight = pageHeight
        imgWidth = (canvas.width * imgHeight) / canvas.height
      }

      const pdf = new jsPDF('p', 'mm', 'a4')
      const offsetX = (pageWidth - imgWidth) / 2
      const offsetY = (pageHeight - imgHeight) / 2
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        offsetX,
        offsetY > 0 ? offsetY : 0,
        imgWidth,
        imgHeight,
      )

      const fileName = `${data.type === 'invoice' ? 'Invoice' : 'Quotation'}_${data.documentNumber}.pdf`
      pdf.save(fileName)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF. Please try again.')
    } finally {
      if (sandbox && sandbox.parentNode) {
        sandbox.parentNode.removeChild(sandbox)
      }
      setIsGeneratingPdf(false)
    }
  }

  const handleSaveIssued = async () => {
    setIsSavingIssued(true)
    try {
      const subtotal = calculateSubtotal(data.items)
      const vat = calculateVAT(subtotal, data.discount, data.vatRate)
      const total = calculateGrandTotal(subtotal, data.discount, vat)

      await saveInvoice({ data, subtotal, vat, total })
      const records = await fetchInvoices()
      setIssuedInvoices(records)
      toast.success('Invoice saved to database')
    } catch (error) {
      console.error('Error saving invoice:', error)
      toast.error('Failed to save invoice')
    } finally {
      setIsSavingIssued(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <Header documentType={data.type} onTypeChange={handleTypeChange} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <ActionButtons
              data={data}
              onDataChange={setData}
              isGeneratingPdf={isGeneratingPdf}
              isSavingIssued={isSavingIssued}
              onGeneratePdf={handleGeneratePdf}
              onSaveIssued={handleSaveIssued}
            />
            <DocumentDetailsForm data={data} onChange={handleDocumentChange} />
            <ClientForm client={data.client} onChange={handleClientChange} />
            <LineItemsForm items={data.items} onChange={handleItemsChange} />
            <PricingSummary
              items={data.items}
              discount={data.discount}
              vatRate={data.vatRate}
              onDiscountChange={(discount) => handleDocumentChange({ discount })}
              onVatRateChange={(vatRate) => handleDocumentChange({ vatRate })}
            />
            <NotesForm
              notes={data.notes}
              paymentDetails={data.paymentDetails}
              onNotesChange={(notes) => handleDocumentChange({ notes })}
              onPaymentDetailsChange={(paymentDetails) => handleDocumentChange({ paymentDetails })}
            />
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Recently issued</h3>
                  <p className="text-xs text-muted-foreground">
                    Saved to your Postgres database.
                  </p>
                </div>
                {issuedInvoices.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {issuedInvoices.length}
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-2">
                {issuedInvoices.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No invoices saved yet.</p>
                ) : (
                  issuedInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2.5 transition-colors hover:border-accent/50 hover:bg-muted/40"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {invoice.document_number}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {invoice.client_name || 'Unnamed client'}
                          <span className="mx-1.5 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                            {invoice.type}
                          </span>
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-foreground">
                        AED {invoice.total.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Live Preview</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Updates as you type
              </span>
            </div>
            <div className="overflow-auto rounded-xl border border-border bg-muted/30 p-2 shadow-lg sm:p-4">
              <DocumentPreview ref={previewRef} data={data} />
            </div>
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #document-preview,
          #document-preview * {
            visibility: visible;
          }
          #document-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
