'use client'

import React from 'react'
import { Target, Users, TrendingUp, Zap, Award } from 'lucide-react'

export default function HomeAbout() {
  const values = [
    { icon: Target, label: 'Enfoque en resultados', desc: 'Cada estrategia tiene un objetivo medible', color: 'text-[#7A1BB5]', bg: 'bg-purple-100' },
    { icon: Users, label: 'Equipo especializado', desc: 'Expertos en cada área digital', color: 'text-orange-600', bg: 'bg-orange-100' },
    { icon: TrendingUp, label: 'Crecimiento sostenible', desc: 'Estrategias a largo plazo', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Zap, label: 'Innovación constante', desc: 'Siempre un paso adelante', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ]

  return (
    <section id="nosotros" className="py-20 lg:py-28 relative overflow-hidden bg-white contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Stats Card */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-purple-50">
                    <div className="text-4xl font-bold text-[#7A1BB5] mb-1">150+</div>
                    <div className="text-sm text-gray-600 font-medium">Clientes Activos</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-orange-50">
                    <div className="text-4xl font-bold text-orange-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600 font-medium">Soporte</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-blue-50">
                    <div className="text-4xl font-bold text-blue-600 mb-1">50+</div>
                    <div className="text-sm text-gray-600 font-medium">Expertos</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-emerald-50">
                    <div className="text-4xl font-bold text-emerald-600 mb-1">15+</div>
                    <div className="text-sm text-gray-600 font-medium">Países</div>
                  </div>
                </div>
              </div>

              {/* Award Badge with will-change-transform */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7A1BB5] flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Top Agency</div>
                    <div className="text-xs text-gray-500">2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block mb-3 px-4 py-1.5 bg-orange-500 text-white rounded-full font-bold text-xs uppercase tracking-wider">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 tracking-tight">
              Somos tu socio <span className="text-[#7A1BB5]">estratégico</span>
            </h2>
            <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
              En Black Box creemos que cada marca tiene un potencial único. Nuestra misión es descubrirlo y potenciarlo a través de producción audiovisual cinematográfica y estrategias digitales innovadoras.
            </p>
            <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
              Con más de 8 años en el mercado, hemos ayudado a más de 150 empresas a alcanzar sus objetivos digitales. Nuestro equipo combina creatividad, datos y tecnología para resultados comerciales excepcionales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, index) => (
                <div key={index} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl ${val.bg} flex items-center justify-center shrink-0`}>
                    <val.icon className={`w-5 h-5 ${val.color}`} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-900 block">{val.label}</span>
                    <span className="text-xs text-gray-500 leading-tight">{val.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
