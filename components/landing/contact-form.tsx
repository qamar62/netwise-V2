'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

const WHATSAPP_NUMBER = '971508836613'
const CONTACT_EMAIL = 'sarfrazibrahim@outlook.com'

export function ContactForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('CCTV Installation')
  const [message, setMessage] = useState('')

  const summary = `Hello NETWISE,%0A%0AName: ${encodeURIComponent(
    name,
  )}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(
    service,
  )}%0A%0A${encodeURIComponent(message)}`

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${summary}`, '_blank', 'noopener')
  }

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Quote request: ${service}`,
    )}&body=${summary}`
  }

  const fieldClass =
    'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30'

  return (
    <form onSubmit={handleEmail} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className={fieldClass}
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={fieldClass}
          placeholder="Phone / WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <select className={fieldClass} value={service} onChange={(e) => setService(e.target.value)}>
        {[
          'CCTV Installation',
          '24/7 Monitoring',
          'Maintenance & Repair',
          'Access Control',
          'Intercom Systems',
          'Network & IT Cabling',
        ].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <textarea
        className={`${fieldClass} min-h-28 resize-y`}
        placeholder="Tell us about your site and what you need..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          <Send className="h-4 w-4" />
          Send via Email
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent/20"
        >
          Chat on WhatsApp
        </button>
      </div>
    </form>
  )
}
