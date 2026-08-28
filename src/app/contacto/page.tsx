import type { Metadata } from 'next'
import Link from 'next/link'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Phone, MapPin, Clock, MessageSquare, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contacto | Black Box Peru - Productora Audiovisual y Agencia de Marketing',
  description: 'Contáctanos para cotizar producción audiovisual, videos para e-commerce, gastronomía o campañas de marketing digital en Lima, Perú.',
  alternates: {
    canonical: 'https://blackboxperu.com/contacto',
  },
}

export default function ContactoPage() {
  const waUrl = 'https://wa.me/51958297236?text=¡Hola%20Black%20Box!%20Vengo%20de%20su%20web%20y%20me%20gustaría%20cotizar%20un%20proyecto%20para%20mi%20marca.'

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Top Navbar Claro */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo.svg" 
              alt="Black Box Peru" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">Inicio</Link>
            <Link href="/servicios" className="text-gray-600 hover:text-black transition-colors">Servicios</Link>
            <Link href="/portafolio" className="text-gray-600 hover:text-black transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-purple-700 font-bold">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">Contacto</span>
        </div>
      </div>

      {/* Hero & Contact Details Claro */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 uppercase tracking-tight mb-4">
            Contáctanos en Lima, Perú
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Estamos listos para hacer crecer tu marca con producción audiovisual de calidad cinematográfica y estrategias de marketing digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-gray-200 p-8 rounded-3xl space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-950 uppercase">WhatsApp & Teléfono</h2>
            <p className="text-sm text-gray-600">Atención rápida y asesoría directa:</p>
            <p className="text-xl font-black text-gray-950">+51 958 297 236</p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm px-6 py-3.5 rounded-full transition-all hover:scale-105 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-3xl space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-950 uppercase">Área de Servicio y Cobertura</h2>
            <p className="text-sm text-gray-600">Atención y cobertura técnica:</p>
            <p className="text-base font-bold text-gray-900 leading-snug">
              Lima, Perú. <br />
              <span className="text-sm font-normal text-gray-600">Cobertura en toda Lima Metropolitana y a nivel nacional.</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Lunes a Sábado: 09:00 - 19:00</span>
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
