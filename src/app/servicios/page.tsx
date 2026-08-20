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
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Producción Audiovisual y Marketing Digital en Lima | Black Box',
  description: 'Descubre nuestros servicios especializados: Producción Audiovisual 4K, Creación de Reels y TikToks, Meta Ads y Pauta Digital, y Marketing Médico para Clínicas en Lima, Perú.',
  alternates: {
    canonical: 'https://www.blackboxperu.com/servicios',
  },
  openGraph: {
    title: 'Servicios de Producción Audiovisual & Marketing Digital | Black Box Perú',
    description: 'Soluciones audiovisuales y estratégicas para marcas y empresas en Lima, Perú.',
    url: 'https://www.blackboxperu.com/servicios',
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
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
              href={waGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              Contacto Directo
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-medium">Servicios</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Soluciones Audiovisuales & Marketing
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
          Servicios Especializados para Hacer Crecer tu Marca
        </h1>
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Desde producción de cine publicitario en 4K hasta estrategias continuas de contenido vertical 9:16 y pauta en Meta Ads para empresas en Lima, Perú.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(SERVICES_DATA).map((service) => {
            const IconComponent = iconMap[service.icon] || Video
            return (
              <div 
                key={service.slug}
                className="bg-zinc-950 border border-white/10 hover:border-white/25 rounded-3xl p-8 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">{service.heroBadge}</span>
                  <h2 className="text-2xl font-black text-white uppercase mb-3 group-hover:text-emerald-400 transition-colors">
                    {service.shortTitle}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.seoDescription}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    Ver detalle completo <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-zinc-400">
                    Lima, Perú
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Target Industries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-8">Sectores donde hemos generado mayor impacto</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Clínicas y Especialistas Médicos',
              'Mueblerías y Fabricantes de Hogar',
              'Distribuidores de Herramientas y B2B',
              'Talleres y Tapizado Automotriz',
              'Restaurantes y Cadenas Gastronómicas',
              'Inmobiliarias y Arquitectura',
              'Bares y Artículos de Coctelería'
            ].map((industry, idx) => (
              <span key={idx} className="px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 text-xs sm:text-sm font-medium text-zinc-300">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-4">¿No estás seguro de qué servicio necesitas?</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
          Conversemos por WhatsApp. Evaluamos la situación de tu marca y te recomendamos el plan más rentable para tu presupuesto.
        </p>
        <a
          href={waGeneralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105"
        >
          <Phone className="w-5 h-5" />
          Hablar con un Asesor de Black Box
        </a>
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
