import { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/servicesData'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Phone, 
  Video, 
  Smartphone, 
  TrendingUp, 
  Stethoscope, 
  CheckCircle2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Producción Audiovisual y Marketing Digital en Lima | Black Box Peru',
  description: 'Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.',
  alternates: {
    canonical: 'https://blackboxperu.com/servicios',
  },
  openGraph: {
    title: 'Servicios de Producción Audiovisual & Marketing Digital | Black Box Peru',
    description: 'Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.',
    url: 'https://blackboxperu.com/servicios',
  }
}

export default function ServicesIndexPage() {
  const cleanPhone = '51958297236'
  const waGeneralUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola Black Box, me gustaría consultar sobre sus servicios de producción y marketing.')}`

  const iconMap: Record<string, any> = {
    Video: Video,
    Smartphone: Smartphone,
    TrendingUp: TrendingUp,
    Stethoscope: Stethoscope,
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Top Navbar Claro */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo.svg" 
              alt="Black Box" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">Inicio</Link>
            <Link href="/servicios" className="text-purple-700 font-bold">Servicios</Link>
            <Link href="/portafolio" className="text-gray-600 hover:text-black transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-gray-600 hover:text-black transition-colors">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Contacto Directo
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">Servicios</span>
        </div>
      </div>

      {/* Hero Section Claro */}
      <section className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-purple-700 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          Soluciones Audiovisuales & Marketing
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 uppercase mb-6 leading-tight">
          Servicios Especializados para Hacer Crecer tu Marca
        </h1>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Desde producción de cine publicitario en 4K hasta estrategias continuas de contenido vertical 9:16 y pauta en Meta Ads para empresas en Lima, Perú.
        </p>
      </section>

      {/* Services Grid Claro */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(SERVICES_DATA).map((service) => {
            const IconComponent = iconMap[service.icon] || Video
            return (
              <div 
                key={service.slug}
                className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between group shadow-xs"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                      {service.shortTitle}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight mb-3 group-hover:text-purple-700 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                      {service.heroSubheadline}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {service.solutions?.slice(0, 3).map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>{sol.title}:</strong> {sol.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 font-extrabold text-sm text-gray-900 group-hover:text-purple-700 transition-colors"
                  >
                    Ver detalles del servicio
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola Black Box, me interesa cotizar el servicio de ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-full transition-colors"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer Claro */}
      <footer className="py-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
