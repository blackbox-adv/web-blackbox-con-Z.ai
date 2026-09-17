'use client'

import React from 'react'
import { ArrowRight, Phone } from 'lucide-react'

interface HomeCtaProps {
  whatsapp?: string | null
  phone?: string | null
}

export default function HomeCta({
  whatsapp = '51958297236',
  phone = '+51 958 297 236',
}: HomeCtaProps) {
  const cleanWhatsappNumber = (whatsapp || phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero agendar una consultoría gratuita con Black Box'
  )}&utm_source=web&utm_medium=cta&utm_campaign=home_cta`

  return (
    <section className="py-20 lg:py-28 relative contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-black via-zinc-900 to-zinc-950 py-16 lg:py-24 px-6 lg:px-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-white uppercase tracking-tight">
            ¿Listo para llevar tu negocio<br />al siguiente nivel?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Agenda una consultoría gratuita y descubre cómo podemos ayudarte a multiplicar tus ventas y visibilidad con video marketing de alta conversión.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp BlackBox Peru"
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 text-base font-bold px-10 py-4 rounded-full shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Agendar Consultoría Gratis</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </a>
            <p className="text-xs text-zinc-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Respuesta inmediata por WhatsApp • Sin costo ni compromiso
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
