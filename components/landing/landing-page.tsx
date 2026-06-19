import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  Clock,
  DoorOpen,
  Eye,
  Fingerprint,
  Home,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Phone,
  Quote,
  Search,
  ShieldCheck,
  Star,
  Store,
  Users,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react'
import { LandingNav } from './landing-nav'
import { Reveal } from './reveal'
import { ContactForm } from './contact-form'
import { FaqSection } from './faq-section'
import { WhatsAppButton } from './whatsapp-button'

const SERVICES = [
  {
    icon: Camera,
    title: 'CCTV Installation',
    description:
      'HD & 4K IP camera systems designed and installed for homes, shops, villas and commercial sites across Dubai.',
  },
  {
    icon: Eye,
    title: '24/7 Remote Monitoring',
    description:
      'Watch your property live from your phone, anywhere in the world, with secure cloud and NVR recording.',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Repair',
    description:
      'Fast servicing, upgrades and fault-finding for existing camera systems — any brand, any age.',
  },
  {
    icon: Fingerprint,
    title: 'Access Control',
    description:
      'Biometric, card and PIN access systems that control exactly who enters every door on your premises.',
  },
  {
    icon: DoorOpen,
    title: 'Intercom & Video Door',
    description:
      'Video door phones and intercoms so you can see and speak to visitors before you let them in.',
  },
  {
    icon: Network,
    title: 'Network & IT Cabling',
    description:
      'Structured cabling, switches and Wi-Fi that keep your cameras and office network fast and reliable.',
  },
]

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Licensed & Approved',
    description: 'Fully licensed security installer compliant with Dubai (SIRA) regulations.',
  },
  {
    icon: Users,
    title: 'Certified Technicians',
    description: 'Experienced, background-checked engineers who do the job right the first time.',
  },
  {
    icon: ShieldCheck,
    title: '1-Year Warranty',
    description: 'Workmanship and hardware warranty on every installation, in writing.',
  },
  {
    icon: Zap,
    title: 'Same-Day Response',
    description: 'Urgent call-outs and quotations handled fast — often the very same day.',
  },
]

const STATS = [
  { value: '500+', label: 'Systems Installed' },
  { value: '12+', label: 'Years of Experience' },
  { value: '24/7', label: 'Support & Monitoring' },
  { value: '100%', label: 'Client Satisfaction' },
]

const PROJECTS = [
  { icon: Store, label: 'Retail & Shops', tint: 'from-primary/85 to-primary' },
  { icon: Home, label: 'Villas & Homes', tint: 'from-accent/80 to-accent' },
  { icon: Warehouse, label: 'Warehouses', tint: 'from-primary to-accent' },
  { icon: Building2, label: 'Offices & Towers', tint: 'from-accent to-primary' },
]

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Free Site Survey',
    description:
      'We visit your property, assess blind spots and recommend the right camera types, storage and cabling.',
  },
  {
    step: '02',
    icon: Camera,
    title: 'Design & Install',
    description:
      'Our certified technicians install HD/4K cameras, NVR and cabling with a clean, professional finish.',
  },
  {
    step: '03',
    icon: Eye,
    title: 'Monitor & Support',
    description:
      'We configure remote viewing on your phone and provide ongoing maintenance with 24/7 support.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'NETWISE installed 12 cameras across our warehouse in JAFZA. Clean cabling, clear night vision, and the app works perfectly.',
    name: 'Ahmed K.',
    role: 'Warehouse Manager, Dubai',
    rating: 5,
  },
  {
    quote:
      'Had our villa system upgraded to 4K. The team was professional, on time, and explained everything clearly.',
    name: 'Sarah M.',
    role: 'Homeowner, Arabian Ranches',
    rating: 5,
  },
  {
    quote:
      'We use NETWISE for our retail shops. Fast response when something goes wrong and fair pricing every time.',
    name: 'Raj P.',
    role: 'Retail Business Owner',
    rating: 5,
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* ---------------- HERO ---------------- */}
      <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="nw-grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background"
          aria-hidden
        />
        <div
          className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -left-24 top-40 -z-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="nw-reveal is-visible">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trusted Security Partner in Dubai
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Smart CCTV &{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Surveillance
              </span>{' '}
              for total peace of mind
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              NETWISE designs, installs and maintains professional security camera systems for homes
              and businesses — so you can see what matters, anytime, from anywhere.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Explore Services
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['Licensed installer', 'Free site survey', '1-year warranty'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero visual — CCTV monitor mockup */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="nw-float relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              {/* Monitor header bar */}
              <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-muted-foreground">
                  CAM-01 · LIVE
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-[10px] font-bold uppercase text-red-500">REC</span>
                </span>
              </div>

              {/* Camera feed area */}
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="nw-grid-bg absolute inset-0 opacity-30" aria-hidden />
                {/* Scan line */}
                <div className="nw-scan-line absolute inset-x-0 top-0 h-px bg-accent/60" aria-hidden />

                <div className="relative z-10 text-center">
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/10 text-accent backdrop-blur-sm">
                    <Camera className="h-9 w-9" />
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-accent/80">
                    4K · Night Vision · 24/7
                  </p>
                </div>

                {/* Corner brackets */}
                {(['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'] as const).map((pos) => (
                  <span key={pos} className={`absolute h-6 w-6 border-accent/50 ${pos}`} aria-hidden />
                ))}

                {/* Timestamp overlay */}
                <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white/80 backdrop-blur-sm">
                  {new Date().toLocaleDateString('en-AE', { day: '2-digit', month: 'short', year: 'numeric' })}{' '}
                  · 14:32:08
                </span>
              </div>

              {/* Camera grid thumbnails */}
              <div className="grid grid-cols-4 gap-1 border-t border-border bg-muted/40 p-2">
                {['CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'].map((cam, i) => (
                  <div
                    key={cam}
                    className={`flex aspect-video items-center justify-center rounded text-[8px] font-mono font-bold uppercase ${
                      i === 0
                        ? 'border border-accent bg-accent/20 text-accent'
                        : 'bg-slate-800/80 text-white/40'
                    }`}
                  >
                    {cam}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:-left-8">
              <p className="text-2xl font-extrabold text-primary">500+</p>
              <p className="text-xs text-muted-foreground">Systems installed</p>
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:-right-8">
              <p className="flex items-center gap-1 text-sm font-bold text-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                5.0 Rating
              </p>
              <p className="text-xs text-muted-foreground">Client satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-primary-foreground/75">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section id="process" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              From survey to live cameras in 3 steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              No guesswork. We handle everything — design, supply, installation and handover.
            </p>
          </Reveal>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            <div
              className="absolute top-12 right-[16.67%] left-[16.67%] hidden h-0.5 bg-gradient-to-r from-primary via-accent to-primary md:block"
              aria-hidden
            />
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="relative text-center">
                <span className="relative z-10 mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-md">
                  <span className="text-xs font-bold text-accent">{step.step}</span>
                  <step.icon className="mt-1 h-8 w-8 text-primary" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              What We Do
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Complete security solutions, end to end
            </h2>
            <p className="mt-4 text-muted-foreground">
              From a single doorbell camera to a multi-site surveillance network, NETWISE handles
              the design, supply, installation and support.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal
                key={service.title}
                delay={(i % 3) * 90}
                as="article"
                className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/15 text-primary transition-colors group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground">
                  <service.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- WHY NETWISE ---------------- */}
      <section id="why" className="bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Why NETWISE
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              The security partner Dubai businesses rely on
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don&apos;t just sell cameras — we deliver a system that works, backed by people who
              answer the phone. Quality hardware, clean installs and honest advice.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110"
            >
              Book a Free Site Survey
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <Reveal
                key={feature.title}
                delay={(i % 2) * 100}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section id="projects" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Where We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Trusted across homes &amp; businesses
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every site is different. We tailor camera placement, storage and access to the way you
              actually live and work.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((project, i) => (
              <Reveal
                key={project.label}
                delay={i * 80}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-sm"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.tint}`} aria-hidden />
                <div
                  className="nw-grid-bg absolute inset-0 opacity-20 mix-blend-overlay"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center text-white">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <project.icon className="h-8 w-8" />
                  </span>
                  <p className="text-lg font-bold">{project.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Client Reviews
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Trusted by homes &amp; businesses across Dubai
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 100}
                className="relative rounded-2xl border border-border bg-card p-7 shadow-sm"
              >
                <Quote className="absolute top-5 right-5 h-8 w-8 text-accent/20" aria-hidden />
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <FaqSection />

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Request your free quote today
            </h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your property and what you want to protect. We&apos;ll recommend the
              right system and give you a clear, no-obligation price.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+971508836613"
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Call / WhatsApp
                  </span>
                  <span className="text-sm font-semibold text-foreground">+971 50 883 6613</span>
                </span>
              </a>
              <a
                href="mailto:sarfrazibrahim@outlook.com"
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    sarfrazibrahim@outlook.com
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Service Area
                  </span>
                  <span className="text-sm font-semibold text-foreground">Dubai, UAE</span>
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <Clock className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Hours
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Sat–Thu, 8am–8pm · 24/7 Support
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">Send us a message</h3>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">
              We typically reply within a couple of hours.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA BANNER ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-accent py-16 text-primary-foreground">
        <div className="nw-grid-bg absolute inset-0 opacity-10 mix-blend-overlay" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to secure your property?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
              Get a free, no-obligation quote. We&apos;ll survey your site and recommend the right
              system for your budget.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-md transition-all hover:shadow-lg hover:brightness-105"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/971508836613"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold tracking-tight text-foreground">
              NETWISE <span className="font-normal text-muted-foreground">Security Systems</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NETWISE. CCTV & Security Solutions, Dubai UAE.
          </p>
          <Link
            href="/login"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Staff Login
          </Link>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
