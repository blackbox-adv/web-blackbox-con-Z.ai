import type { Metadata } from 'next'
import Link from 'next/link'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  Camera, 
  Video, 
  Film, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  ChevronRight, 
  Clapperboard, 
  Tv 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Productora Audiovisual en Lima | Black Box Peru',
  description: 'Productora audiovisual en Lima especializada en spots comerciales, videos corporativos, contenido vertical 9:16 y producción publicitaria 4K/6K.',
  alternates: {
    canonical: 'https://blackboxperu.com/servicios/productora-audiovisual-lima',
  },
}

export default function ProductoraAudiovisualLimaPage() {
  const waUrl = 'https://wa.me/51958297236?text=¡Hola%20Black%20Box!%20Vengo%20de%20su%20web%20y%20me%20gustaría%20cotizar%20un%20proyecto%20para%20mi%20marca.'

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo-white.svg" 
              alt="Black Box Peru" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/servicios/productora-audiovisual-lima" className="text-white font-medium">Servicios</Link>
            <Link href="/portafolio" className="text-zinc-400 hover:text-white transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-zinc-400 hover:text-white transition-colors">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <Link href="/servicios/productora-audiovisual-lima" className="hover:text-white transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-medium">Productora Audiovisual en Lima</span>
        </div>
      </div>

      {/* Hero Section with exact H1 */}
      <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200 mb-6">
            <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
            Producción Cinematográfica y Comercial 4K / 6K
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1] mb-6">
            Productora Audiovisual en Lima
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            En <strong>Black Box Peru</strong> somos una <strong>productora audiovisual en Lima</strong> especializada en el desarrollo integral de spots comerciales, videos corporativos, contenido para marcas y producciones cinematográficas en resolución 4K y 6K.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Solicitar Cotización por WhatsApp
            </a>
            <Link
              href="/portafolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-6 py-4 rounded-full border border-white/10 transition-colors"
            >
              Ver Portafolio de Videos
            </Link>
          </div>
        </div>
      </section>

      {/* Main SEO Article Content (450+ Words) */}
      <article className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            Servicios Profesionales de Producción Audiovisual en Lima y Todo el Perú
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Como <strong>productora audiovisual en Lima</strong> que opera en toda la capital y a nivel nacional, brindamos cobertura técnica integral para empresas, corporaciones, marcas de retail, e-commerce y el sector gastronómico. Entendemos que un video publicitario de calidad no se limita al manejo de una cámara de alta gama, sino a la construcción de un mensaje estratégico respaldado por guiones publicitarios persuasivos, dirección de arte, esquemas de iluminación cinematográfica y una postproducción impecable.
          </p>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            Nuestro equipo multidisciplinario abarca todas las etapas del proceso audiovisual: desde la conceptualización creativa y el scouting de locaciones en Lima metropolitana y provincias, hasta la filmación en set con cámaras de cine digital, captura de sonido directo multipista, corrección de color profesional (color grading) y animación de gráficos en movimiento (motion graphics).
          </p>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <Video className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Comerciales y Spots Publicitarios</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Desarrollamos piezas comerciales pensadas para televisión, pauta digital en Meta Ads, YouTube Ads y TikTok Ads, enfocadas en captar la atención en los primeros segundos.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <Film className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Videos Corporativos e Institucionales</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mostramos la infraestructura, procesos industriales, tecnología y el factor humano de tu empresa para fortalecer la reputación corporativa y cerrar negociaciones B2B.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <Tv className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Contenido Vertical para Redes Sociales</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Producción continua en formato 9:16 para Instagram Reels, TikTok y YouTube Shorts con edición dinámica, subtítulos estilizados y ganchos de alto impacto.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6 bg-zinc-950 border border-white/10 p-8 sm:p-10 rounded-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            ¿Por Qué Elegir a Black Box Peru como tu Productora Audiovisual en Lima?
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            En el competitivo mercado limeño, las marcas requieren piezas audiovisuales que comuniquen valor y generen rentabilidad. En Black Box Peru combinamos la excelencia técnica del cine con una visión comercial y analítica de marketing digital:
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base text-zinc-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Equipamiento Cinematográfico 4K/6K:</strong> Ópticas fijas y anamórficas, estabilizadores electrónicos, teleprompter en set y microfonía profesional.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Dirección de Arte e Iluminación de Estudio:</strong> Esquemas de luz diseñados a medida para resaltar texturas de productos y calidez humana.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Puntualidad y Entrega Multi-Formato:</strong> Masters optimizados en 16:9 y adaptaciones verticales 9:16 listas para pauta y redes.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Atención Personalizada en Lima:</strong> Asesoría directa y visitas técnicas a tus instalaciones en San Isidro, Miraflores, Surco, San Borja y toda la ciudad.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 - Process */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            Nuestro Flujo de Trabajo en Producción Audiovisual
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Cada proyecto se ejecuta bajo una metodología rigurosa dividida en cuatro fases clave: <strong>Pre-producción</strong> (briefing, guion técnico y storyboard), <strong>Producción</strong> (jornada de filmación con equipo técnico y dirección), <strong>Post-producción</strong> (edición rítmica, colorización y diseño sonoro) y <strong>Entrega Final</strong> con revisiones garantizadas para asegurar el cumplimiento de tus objetivos comerciales.
          </p>
        </section>

        {/* WhatsApp CTA Card with exact requested WhatsApp URL */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-black border border-white/15 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
            Inicia tu Próximo Proyecto Audiovisual en Lima
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-base">
            Conversemos sobre las necesidades de tu empresa y recibe una propuesta económica personalizada sin compromiso.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base sm:text-lg px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Hablar con el Equipo de Producción por WhatsApp
            </a>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
