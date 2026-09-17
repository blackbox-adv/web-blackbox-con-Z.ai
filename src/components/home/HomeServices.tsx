'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronRight, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Producción Audiovisual 4K',
    desc: 'Comerciales, videos corporativos y cine digital que transmiten prestigio.',
    slug: 'produccion-audiovisual',
    tag: '4K / 6K',
  },
  {
    title: 'Reels y TikTok 9:16',
    desc: 'Videos verticales con ganchos psicológicos, subtítulos y ritmo dinámico.',
    slug: 'reels-y-tiktok',
    tag: 'Formato 9:16',
  },
  {
    title: 'Publicidad & Meta Ads',
    desc: 'Embudos de pauta con alto retorno para generar consultas diarias por WhatsApp.',
    slug: 'publicidad-digital-meta-ads',
    tag: 'Alto ROAS',
  },
  {
    title: 'Marketing para Clínicas',
    desc: 'Estrategias médicas éticas para especialistas y cirujanos en Lima.',
    slug: 'marketing-para-clinicas-salud',
    tag: 'Sector Salud',
  },
]

export default function HomeServices() {
  return (
    <section id="servicios" className="py-20 lg:py-28 relative bg-gray-50 contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1.5 bg-[#7A1BB5] text-white rounded-full font-bold text-xs uppercase tracking-wider">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-gray-900 tracking-tight">
            Soluciones digitales <span className="text-[#7A1BB5]">integrales</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para dominar el mundo digital, con estrategias personalizadas para tu negocio en Lima, Perú.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/servicios/${service.slug}`}
              aria-label={`Ver detalles del servicio ${service.title}`}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
                    {service.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#7A1BB5] transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#7A1BB5] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">{service.desc}</p>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-[#7A1BB5]">
                Ver detalles y tarifas <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/servicios"
            aria-label="Explorar directorio completo de servicios de marketing digital y producción"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-black bg-white border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-xs"
          >
            Explorar directorio completo de servicios <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
