import { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES_DATA } from '@/data/servicesData'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { SubpageNavbar } from '@/components/SubpageNavbar'
import { 
  ArrowRight, 
  ChevronRight, 
  Phone,
  Video, 
  Smartphone, 
  TrendingUp, 
  Stethoscope, 
  CheckCircle2,
  Film
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Marketing y Producción Audiovisual en Lima | BLACKBOX',
  description: 'Servicios audiovisuales en Lima: producción de comerciales, reels 9:16, videoclips y campañas de Meta Ads para hacer crecer tu marca.',
  alternates: {
    canonical: 'https://blackboxperu.com/servicios',
  },
  openGraph: {
    title: 'Servicios de Marketing y Producción Audiovisual en Lima | BLACKBOX',
    description: 'Servicios audiovisuales en Lima: producción de comerciales, reels 9:16, videoclips y campañas de Meta Ads para hacer crecer tu marca.',
    url: 'https://blackboxperu.com/servicios',
  }
}

export default function ServicesIndexPage() {
  const cleanPhone = '51958297236'

  const iconMap: Record<string, any> = {
    Video: Video,
    Smartphone: Smartphone,
    TrendingUp: TrendingUp,
    Stethoscope: Stethoscope,
  }

  // Mapeo exacto de anchor texts según requerimientos de SEO
  const exactAnchorMap: Record<string, string> = {
    'produccion-audiovisual': 'Producción audiovisual en Lima',
    'publicidad-digital-meta-ads': 'Agencia de Meta Ads en Lima',
    'marketing-para-clinicas-salud': 'Marketing médico en Lima',
    'reels-y-tiktok': 'Reels y TikTok Ads en Lima',
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Top Navbar Dinámico con Logo de Admin */}
      <SubpageNavbar activePage="servicios" ctaText="Contacto Directo" defaultMessage="Hola Black Box, me gustaría consultar sobre sus servicios de producción y marketing." />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">Servicios</span>
        </div>
      </div>

      {/* Hero Section Unificado */}
      <section className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <span className="inline-flex px-4 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold tracking-wide">
            Servicios Audiovisuales en Lima, Perú
          </span>
        </div>
        <h1 className="font-black tracking-tighter leading-[0.9] text-5xl md:text-6xl lg:text-7xl uppercase mb-6 text-black">
          SOLUCIONES QUE<br />
          <span className="text-[#8B5CF6]">HACEN CRECER</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
          Soluciones audiovisuales y de marketing digital diseñadas para posicionar marcas y aumentar ventas en Lima, Perú.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/51958297236?text=Hola%20BLACKBOX%20quiero%20cotizar%20servicios%20audiovisuales&utm_source=web&utm_medium=cta&utm_campaign=servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-extrabold text-base px-8 py-5 rounded-full shadow-lg transition-all hover:scale-105"
          >
            <Phone className="w-5 h-5 text-emerald-400" />
            Solicitar Cotización por WhatsApp
          </a>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white text-base px-8 py-4 rounded-full font-bold transition-all"
          >
            Ver Casos en Portafolio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Grid Claro con Anchor Exacto */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(SERVICES_DATA).map((service) => {
            const IconComponent = iconMap[service.icon] || Video
            const exactAnchor = exactAnchorMap[service.slug] || service.title
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
                      <Link href={`/servicios/${service.slug}`} title={exactAnchor} className="hover:underline">
                        {service.title}
                      </Link>
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

                <div className="pt-8 mt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 font-extrabold text-sm text-gray-900 group-hover:text-purple-700 transition-colors"
                  >
                    <span>{exactAnchor}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola BLACKBOX quiero cotizar ${service.shortTitle}`)}&utm_source=web&utm_medium=cta&utm_campaign=${service.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-full transition-colors"
                  >
                    Cotizar {service.shortTitle}
                  </a>
                </div>
              </div>
            )
          })}

          {/* Tarjeta destacada adicional para Videoclips Oficiales */}
          <div className="bg-gradient-to-br from-purple-950 via-gray-900 to-black text-white rounded-3xl p-8 flex flex-col justify-between group shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-700/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Film className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/50 border border-purple-700/40 px-3 py-1 rounded-full">
                  Música & Cine
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                  <Link href="/videoclips" title="Videoclips oficiales en Lima" className="hover:underline">
                    Videoclips Oficiales en Lima
                  </Link>
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Dirección cinematográfica en 4K, ópticas de cine, iluminación de atmósfera y color grading para artistas y sellos en Perú.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cámaras 4K Cinema con ópticas anamórficas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Color grading en DaVinci Resolve para look cinematográfico</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/videoclips"
                className="inline-flex items-center gap-2 font-extrabold text-sm text-purple-300 hover:text-white transition-colors"
              >
                <span>Videoclips oficiales en Lima</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/51958297236?text=Hola%20BLACKBOX%20quiero%20cotizar%20videoclip&utm_source=web&utm_medium=cta&utm_campaign=videoclips"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-full transition-colors"
              >
                Cotizar Videoclip
              </a>
            </div>
          </div>
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
