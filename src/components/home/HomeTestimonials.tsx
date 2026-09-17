'use client'

import React from 'react'
import Image from 'next/image'
import { Quote, Star } from 'lucide-react'

interface TestimonialItem {
  name: string
  role: string
  company: string
  quote: string
  rating: number
  image?: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    name: 'Dr. Luis Ramos',
    role: 'Director Médico',
    company: 'Clínica Avendaño',
    quote: 'Black Box transformó por completo nuestra captación de pacientes. Los reels de cirugía bariátrica transmiten confianza y calidad médica superior.',
    rating: 5,
    image: '/testimonials/doctor-luis-ramos.webp',
  },
  {
    name: 'Marco Mendoza',
    role: 'Brand Manager',
    company: 'Makita Perú',
    quote: 'La calidad técnica en 4K y el ritmo de edición en reels B2B nos permitieron posicionarnos con autoridad en el mercado industrial de Lima.',
    rating: 5,
    image: '/testimonials/marco-mendoza.webp',
  },
  {
    name: 'Jorge Quispe',
    role: 'Gerente General',
    company: 'Leomar Muebles',
    quote: 'Multiplicamos las consultas diarias por WhatsApp gracias a los videos dinámicos y la segmentación de pauta. Son socios estratégicos indispensables.',
    rating: 5,
    image: '/testimonials/jorge-quispe.webp',
  },
]

export default function HomeTestimonials({ testimonials = defaultTestimonials }: { testimonials?: TestimonialItem[] }) {
  const list = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-white contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1.5 bg-[#7A1BB5] text-white rounded-full font-bold text-xs uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-gray-900 tracking-tight">
            Lo que dicen nuestros <span className="text-[#7A1BB5]">clientes</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Historias reales de éxito de empresas que confiaron en nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {list.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-[#7A1BB5] flex items-center justify-center shadow-md">
                <Quote className="w-5 h-5 text-white" />
              </div>

              <div className="flex gap-1 mb-6 pt-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 text-sm sm:text-base leading-relaxed font-medium">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <Image
                  src={item.image || '/testimonials/doctor-luis-ramos.webp'}
                  alt={`Fotografía o avatar de ${item.name}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-200"
                />
                <div>
                  <div className="font-bold text-gray-900 text-base">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.role}, {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
