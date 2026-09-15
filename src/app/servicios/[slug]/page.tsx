import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/servicesData'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { SubpageNavbar } from '@/components/SubpageNavbar'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  HelpCircle,
  Video,
  Camera,
  Layers,
  Award,
  Clock
} from 'lucide-react'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    return {
      title: 'Servicio No Encontrado | Black Box Perú',
    }
  }

  const url = `https://blackboxperu.com/servicios/${service.slug}`

  return {
    title: `${service.seoTitle} | Black Box Peru`,
    description: service.seoDescription,
    keywords: [
      service.title,
      service.shortTitle,
      'Productora audiovisual Lima',
      'Agencia marketing Lima',
      'Videos para empresas',
      'Reels publicitarios Lima'
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} | Black Box Peru`,
      description: service.seoDescription,
      url: url,
      siteName: 'Black Box Peru',
      locale: 'es_PE',
      type: 'article',
    }
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    notFound()
  }

  const cleanPhone = '51958297236'
  const waMessage = encodeURIComponent(`Hola BLACKBOX quiero cotizar ${service.shortTitle}`)
  const waUrl = `https://wa.me/${cleanPhone}?text=${waMessage}&utm_source=web&utm_medium=cta&utm_campaign=${service.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `https://blackboxperu.com/servicios/${service.slug}#service`,
        name: `BLACKBOX - ${service.title}`,
        description: service.seoDescription,
        url: `https://blackboxperu.com/servicios/${service.slug}`,
        telephone: '+51958297236',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lima',
          addressRegion: 'Lima',
          addressCountry: 'PE'
        },
        areaServed: {
          '@type': 'City',
          name: 'Lima'
        }
      },
      ...(service.faqs && service.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `https://blackboxperu.com/servicios/${service.slug}#faq`,
        mainEntity: service.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }] : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://blackboxperu.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Servicios',
            item: 'https://blackboxperu.com/servicios'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `https://blackboxperu.com/servicios/${service.slug}`
          }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navbar Dinámico con Logo de Admin */}
      <SubpageNavbar activePage="servicios" ctaText="Cotizar Servicio" defaultMessage={`Hola BLACKBOX quiero cotizar ${service.shortTitle}`} />

      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <Link href="/servicios" className="hover:text-black transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">{service.shortTitle}</span>
        </div>
      </div>

      {/* Hero Section Claro */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <span className="inline-flex px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold tracking-wide border border-purple-200/60 shadow-xs">
              {service.heroPill || service.heroBadge || `${service.title} en Lima, Perú`}
            </span>
          </div>

          <h1 className="font-black tracking-tighter leading-[0.9] text-4xl sm:text-6xl lg:text-7xl uppercase mb-6 text-gray-950">
            {service.heroH1Line1 || service.heroHeadline}<br />
            <span className="text-[#8B5CF6]">{service.heroH1Line2 || ''}</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {service.heroSubheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              Solicitar Cotización por WhatsApp
            </a>
            <Link
              href={`/portfolio?categoria=${encodeURIComponent(service.portfolioCategory || service.shortTitle)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-base px-6 py-4 rounded-full border border-gray-200 transition-colors"
            >
              Ver Casos en Portafolio
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Row Claro */}
      {service.metrics && service.metrics.length > 0 && (
        <section className="border-b border-gray-200 bg-gray-50/50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {service.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">{metric.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions / Features Section Claro */}
      {service.solutions && service.solutions.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight mb-4">
              ¿Qué incluye nuestro servicio de {service.shortTitle}?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Un flujo técnico integral diseñado para cuidar cada detalle visual, narrativo y comercial de tu marca.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-3xl p-8 space-y-4 hover:border-purple-300 hover:shadow-lg transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-950">{sol.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Step by Step Process Claro */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight mb-4">
                Paso a Paso de la Producción
              </h2>
              <p className="text-gray-600 text-base">
                Metodología ágil y estructurada para garantizar tiempos de entrega exactos y calidad publicitaria.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="bg-slate-50 border border-gray-200 p-6 rounded-2xl relative space-y-3">
                  <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-gray-950">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables Checklist Claro */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-xs space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight">
              Entregables y Garantías del Servicio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section Claro */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight mb-3">
              Preguntas Frecuentes sobre {service.shortTitle}
            </h2>
            <p className="text-gray-600 text-sm">Todo lo que necesitas saber antes de iniciar tu proyecto.</p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pl-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interlinking Entre Servicios */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-xs uppercase font-bold tracking-widest text-gray-400">
              Explora Más Soluciones en Lima
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link 
              href="/servicios/produccion-audiovisual" 
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${service.slug === 'produccion-audiovisual' ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'}`}
            >
              Productora Audiovisual en Lima
            </Link>
            <Link 
              href="/servicios/reels-y-tiktok" 
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${service.slug === 'reels-y-tiktok' ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'}`}
            >
              Reels y TikTok Ads en Lima
            </Link>
            <Link 
              href="/servicios/publicidad-digital-meta-ads" 
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${service.slug === 'publicidad-digital-meta-ads' ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'}`}
            >
              Agencia de Meta Ads en Lima
            </Link>
            <Link 
              href="/servicios/marketing-para-clinicas-salud" 
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${service.slug === 'marketing-para-clinicas-salud' ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'}`}
            >
              Marketing Médico para Clínicas en Lima
            </Link>
            <Link 
              href="/videoclips" 
              className="px-4 py-2 rounded-full text-xs font-bold border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Videoclips Oficiales en Lima 4K
            </Link>
            <Link 
              href="/portfolio" 
              className="px-4 py-2 rounded-full text-xs font-bold border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Portafolio de Videos Comerciales
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            ¿Listo para llevar tu marca al siguiente nivel?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Escríbenos directamente a WhatsApp y cuéntanos sobre tu proyecto. Te responderemos con asesoría y cotización inmediata.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base sm:text-lg px-10 py-5 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Cotizar {service.shortTitle} por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer Claro */}
      <footer className="py-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
