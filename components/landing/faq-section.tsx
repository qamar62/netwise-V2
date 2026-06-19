'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from './reveal'

const FAQS = [
  {
    q: 'How much does CCTV installation cost in Dubai?',
    a: 'Costs depend on the number of cameras, cable runs, storage (NVR vs cloud) and whether you need night vision or PTZ. We offer a free site survey and a clear written quote — no hidden fees.',
  },
  {
    q: 'Do you install cameras in villas and apartments?',
    a: 'Yes. We install systems for villas, townhouses, apartments and commercial units across Dubai. We work with your building management where access permissions are needed.',
  },
  {
    q: 'Can I view my cameras on my phone?',
    a: 'Absolutely. We set up secure remote viewing on iOS and Android so you can check live feeds and playback recordings from anywhere in the world.',
  },
  {
    q: 'Are your installations SIRA compliant?',
    a: 'Yes. NETWISE is a licensed security installer and we follow Dubai SIRA regulations for CCTV and access-control work.',
  },
  {
    q: 'What warranty do you provide?',
    a: 'Every installation includes a 1-year workmanship warranty plus the manufacturer warranty on hardware. We also offer annual maintenance contracts.',
  },
  {
    q: 'How quickly can you respond to a call-out?',
    a: 'For urgent faults we aim for same-day response within Dubai. New installations are typically scheduled within a few days of your site survey.',
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know before getting started. Can&apos;t find your answer?{' '}
            <a href="#contact" className="font-medium text-primary hover:underline">
              Get in touch
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 rounded-2xl border border-border bg-card px-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
