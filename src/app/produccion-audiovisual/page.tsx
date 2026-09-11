import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { SubpageNavbar } from '@/components/SubpageNavbar'
import { 
  Video, 
  Film, 
  CheckCircle2, 
  Phone, 
  ChevronRight, 
  Clapperboard, 
  Tv,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Producción Audiovisual en Lima | Videos Comerciales y Contenido 4K | BLACKBOX',
  description: 'Servicio integral de producción audiovisual en Lima: spots publicitarios, videos corporativos, reels 9:16 y comerciales en 4K/6K para marcas que buscan vender más.',
  alternates: {
    canonical: 'https://blackboxperu.com/produccion-audiovisual',
  },
  openGraph: {
    title: 'Producción Audiovisual en Lima | Black Box Peru',
    description: 'Productora audiovisual en Lima especializada en spots comerciales, videos corporativos y contenido vertical 9:16 de alto impacto.',
    url: 'https://blackboxperu.com/produccion-audiovisual',
    type: 'website',
  }
}

export default function ProduccionAudiovisualPage() {
  const waUrl = 'https://wa.me/51958297236?text=¡Hola%20Black%20Box!%20Deseo%20cotizar%20un%20servicio%20de%20producción%20audiovisual%20en%20Lima.'

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      <SubpageNavbar activePage="servicios" ctaText="Cotizar por WhatsApp" defaultMessage="¡Hola Black Box! Deseo cotizar un servicio de producción audiovisual en Lima." />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <Link href="/servicios" className="hover:text-black transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">Producción Audiovisual en Lima</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-purple-700 mb-6 shadow-xs">
            <Clapperboard className="w-3.5 h-3.5 text-purple-600" />
            Producción Cinematográfica y Publicitaria en Lima
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 uppercase leading-[1.15] mb-6">
            Producción Audiovisual en Lima
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            En <strong>Black Box Peru</strong> somos la <strong>productora audiovisual en Lima</strong> especializada en crear piezas comerciales de alto calibre técnico, narrativa que cautiva y estrategia publicitaria orientada a resultados comerciales medibles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all text-sm uppercase tracking-wider"
            >
              <Phone className="w-4 h-4" /> Solicitar Presupuesto Directo
            </a>
            <Link 
              href="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-sm uppercase tracking-wider"
            >
              Ver Casos de Éxito <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios Especializados */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-950 uppercase mb-3">
            Servicios de Producción Audiovisual que Ofrecemos en Lima
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Equipamiento de cine, ópticas anamórficas, dirección de arte y montaje rítmico para cada etapa de tu campaña comercial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Spots Publicitarios y Comerciales</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Comerciales de televisión, cine y plataformas digitales grabados en resolución 4K y 6K con iluminación escénica y actores profesionales.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Guion y Storyboard Creativo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Casting y Locaciones en Lima</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Color Grading Davinci Resolve</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Contenido Vertical 9:16 (Reels & TikTok)</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Formatos de retención inmediata para redes sociales. Videos de alta conversión diseñados para detener el scroll y generar ventas directas.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-600" /> Hooks visuales en los primeros 3 segundos</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-600" /> Edición rítmica y subtitulado dinámico</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-600" /> Packs mensuales para marcas y e-commerce</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm hover:border-purple-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Videos Corporativos & Testimoniales</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Proyecta autoridad, solidez y confianza empresarial. Entrevistas cinematográficas y testimonios de clientes que cierran ventas B2B.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Audio profesional de solapa y cañón</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Tomas aéreas con Dron 4K en Lima</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /> Animación de logo y motion graphics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-zinc-950 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-4">
            ¿Listo para producir el video que tu marca necesita?
          </h2>
          <p className="text-gray-400 mb-8 text-base">
            Contáctanos hoy para recibir una propuesta personalizada y cronograma de producción en Lima sin compromiso.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-all uppercase tracking-wider text-sm"
          >
            <Phone className="w-4 h-4" /> Hablar con un Productor Audiovisual
          </a>
        </div>
      </section>

      <FloatingWhatsApp />
    </div>
  )
}
