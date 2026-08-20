import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/servicesData'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  Star, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Video, 
  Camera, 
  FileText, 
  Zap, 
  Calendar, 
  MessageSquare, 
  BarChart, 
  Stethoscope, 
  Heart, 
  Target,
  HelpCircle
} from 'lucide-react'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for fast SSG rendering
export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }))
}

// Generate rich SEO metadata for Google positioning
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    return {
      title: 'Servicio No Encontrado | Black Box Perú',
    }
  }

  const url = `https://www.blackboxperu.com/servicios/${service.slug}`

  return {
    title: `${service.seoTitle} | Black Box`,
    description: service.seoDescription,
    keywords: [
      service.title,
      service.shortTitle,
      'Productora audiovisual Lima',
      'Agencia de marketing digital Perú',
      'Videos corporativos',
      'Publicidad en redes Perú',
      'Black Box Perú'
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | Black Box Perú`,
      description: service.seoDescription,
      url,
      type: 'article',
      siteName: 'Black Box Perú',
      locale: 'es_PE',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Black Box`,
      description: service.seoDescription,
      images: ['/og-image.png'],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    notFound()
  }

  const cleanPhone = '51958297236'
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola Black Box, estoy interesado en el servicio de ${service.title}. Me gustaría recibir información y cotización.`)}`

  // Schema.org Structured Data for Google (Service + FAQPage + BreadcrumbList)
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': service.title,
        'description': service.seoDescription,
        'provider': {
          '@type': 'LocalBusiness',
          'name': 'Black Box Perú',
          'image': 'https://www.blackboxperu.com/logo-icon.svg',
          'telephone': '+51 958 297 236',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Lima',
            'addressRegion': 'Lima',
            'addressCountry': 'PE'
          },
          'priceRange': '$$'
        },
        'areaServed': {
          '@type': 'City',
          'name': 'Lima'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Inicio',
            'item': 'https://www.blackboxperu.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Servicios',
            'item': 'https://www.blackboxperu.com/servicios'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': service.shortTitle,
            'item': `https://www.blackboxperu.com/servicios/${service.slug}`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        'mainEntity': service.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Schema.org Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
      />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo-white.svg" 
              alt="Black Box" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/servicios" className="text-white font-medium">Servicios</Link>
            <Link href="/portfolio" className="text-zinc-400 hover:text-white transition-colors">Portafolio</Link>
            <Link href="/#nosotros" className="text-zinc-400 hover:text-white transition-colors">Nosotros</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              Cotizar Servicio
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-medium">{service.shortTitle}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/40 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {service.heroBadge}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1] mb-6">
            {service.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {service.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              Consultar Disponibilidad por WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-6 py-4 rounded-full border border-white/10 transition-colors"
            >
              Ver Casos en Video
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 mt-16 pt-10 border-t border-white/10 max-w-2xl mx-auto">
            {service.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-4xl font-black text-white mb-1">{m.value}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-2">El Desafío Actual</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">¿Por qué la mayoría de marcas no logran resultados?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {service.problems.map((p, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-sm mb-4">
                ✕
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">El Enfoque Black Box</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Nuestra Solución Estratégica</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.solutions.map((s, idx) => (
            <div key={idx} className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm mb-4">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Metodología Comprobada</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">¿Cómo trabajamos paso a paso?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl relative group hover:border-white/20 transition-all">
                <div className="text-3xl font-black text-zinc-600 mb-4 group-hover:text-white transition-colors">{step.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables & Target Industries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Deliverables */}
          <div className="bg-zinc-900/70 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ¿Qué incluye el servicio?
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Industries */}
          <div className="bg-zinc-900/70 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-400" />
              Especializado para estos rubros:
            </h2>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {service.targetIndustries.map((ind, idx) => (
                <span key={idx} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-200">
                  {ind}
                </span>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
              <strong className="block text-emerald-200 text-sm mb-1">Garantía de Compromiso:</strong>
              Coordinamos cada detalle de la producción con entrega puntual de versiones master y optimizaciones para pauta.
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section (Schema.org compliant) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-2">Preguntas Frecuentes</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">Dudas Comunes sobre {service.shortTitle}</h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-zinc-900/60 border border-white/10 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:border-white/25 transition-all">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-white text-base sm:text-lg">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 transition-transform group-open:rotate-180">
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                  </span>
                </summary>
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services (Internal Linking for SEO) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <h2 className="text-xl font-bold text-white mb-8">Otros Servicios de Black Box</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.values(SERVICES_DATA)
            .filter((s) => s.slug !== service.slug)
            .map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors mb-2">{s.shortTitle}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2">{s.seoDescription}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-zinc-300 mt-4">
                  Ver detalle <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* CTA Final Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-zinc-900 via-zinc-800 to-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-4">¿Listo para impulsar tu marca?</h2>
          <p className="text-zinc-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Escríbenos directamente para agendar una sesión de asesoría y armar una propuesta a la medida de tu negocio en Lima.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            Cotizar por WhatsApp Ahora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Black Box Perú. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box" />
    </div>
  )
}
