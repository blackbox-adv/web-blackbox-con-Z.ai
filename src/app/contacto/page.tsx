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
            <Link href="/servicios/productora-audiovisual-lima" className="text-zinc-400 hover:text-white transition-colors">Servicios</Link>
            <Link href="/portafolio" className="text-zinc-400 hover:text-white transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-white font-medium">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-medium">Contacto</span>
        </div>
      </div>

      {/* Hero & Contact Details */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Contáctanos en Lima, Perú
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Estamos listos para hacer crecer tu marca con producción audiovisual de calidad cinematográfica y estrategias de marketing digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-950 border border-white/10 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase">WhatsApp & Teléfono</h2>
            <p className="text-sm text-zinc-400">Atención rápida y asesoría directa:</p>
            <p className="text-lg font-bold text-white">+51 958 297 236</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-sm px-6 py-3 rounded-full transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Escribir por WhatsApp
            </a>
          </div>

          <div className="bg-zinc-950 border border-white/10 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase">Área de Servicio y Cobertura</h2>
            <p className="text-sm text-zinc-400">Atención y cobertura:</p>
            <p className="text-base font-semibold text-zinc-200">
              Lima, Perú. <br />
              Cobertura en toda Lima Metropolitana y a nivel nacional.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 pt-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>Lunes a Sábado: 09:00 - 19:00</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
