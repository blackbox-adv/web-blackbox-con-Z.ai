'use client'

import React from 'react'
import { HelpCircle, ChevronDown, MessageCircle, ArrowRight } from 'lucide-react'

export default function HomeFaq({
  phone = '+51 958 297 236',
  whatsapp = '51958297236'
}: {
  phone?: string
  whatsapp?: string
}) {
  const cleanWhatsapp = (whatsapp || phone || '51958297236').replace(/\D/g, '')

  const faqs = [
    {
      question: '¿Por qué elegir a Black Box Perú como tu productora audiovisual en Lima?',
      answer: 'En Black Box combinamos dirección cinematográfica en 4K/6K con una visión publicitaria centrada en conversión y ventas. No solo hacemos tomas estéticas: estructuramos narrativas con ganchos de retención psicológica (hook-story-offer) para que cada video conecte con tu cliente ideal y posicione a tu marca por encima de la competencia en el mercado peruano.'
    },
    {
      question: '¿Cómo funciona la producción de contenido vertical para TikTok e Instagram Reels?',
      answer: 'Desarrollamos paquetes mensuales de contenido diseñados para empresas y marcas que necesitan presencia constante y relevante. Nuestro equipo se encarga de la investigación de tendencias en tu rubro, redacción de guiones comerciales, jornada de rodaje en estudio o locación con iluminación profesional, edición dinámica con subtítulos optimizados para retención y formatos listos para pauta en Meta Ads y TikTok Ads.'
    },
    {
      question: '¿Qué equipamiento y estándares de calidad técnica utilizan en los rodajes?',
      answer: 'Filmamos con cámaras de cine digital de alta gama con resolución nativa 4K y 6K, ópticas cinematográficas de apertura luminosa, sistemas de iluminación LED continua y RGB escénica, microfonía inalámbrica de solapa y cañón de estudio, y estaciones de corrección de color en DaVinci Resolve para garantizar acabados de nivel televisión y cine.'
    },
    {
      question: '¿Cómo puedo cotizar un proyecto audiovisual o paquete de videos en Lima?',
      answer: 'Puedes solicitar una cotización personalizada de forma inmediata a través de nuestro WhatsApp oficial (+51 958 297 236) o enviándonos un mensaje en el formulario web. Analizamos tu requerimiento en menos de 24 horas, coordinamos una llamada o reunión presencial en Lima y te presentamos un cronograma de producción a la medida de tu presupuesto.'
    },
    {
      question: '¿Con qué marcas y sectores han trabajado en Perú?',
      answer: 'A lo largo de más de 8 años en Lima, hemos producido piezas audiovisuales y campañas de pauta para marcas nacionales e internacionales como New Athletic, Renzo Costa, Hugo Boss, Vizzano, Makita Perú, y centros de salud como Clínica Avendaño (con más de 280 citas generadas en una sola campaña), además de destacados artistas de la escena musical nacional.'
    }
  ]

  return (
    <section id="faq" className="py-20 lg:py-28 bg-gray-50/70 border-t border-b border-gray-100 contain-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-100 text-[#7A1BB5] rounded-full font-bold text-xs uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight mb-4">
            Respuestas claras sobre <span className="text-[#7A1BB5]">nuestros servicios</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre producción audiovisual, creación de reels comerciales y planes a medida en Lima, Perú.
          </p>
        </div>

        {/* Accordion FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs hover:border-purple-200 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer select-none font-bold text-gray-900 text-base sm:text-lg text-left">
                <span>{faq.question}</span>
                <span className="w-8 h-8 rounded-full bg-purple-50 group-open:bg-[#7A1BB5] group-open:text-white flex items-center justify-center shrink-0 text-[#7A1BB5] transition-colors">
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                </span>
              </summary>
              <div className="pt-4 mt-3 border-t border-gray-100 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Quick CTA footer inside FAQ */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="font-bold text-gray-950 text-base">¿Tienes un proyecto específico en mente?</h3>
            <p className="text-xs sm:text-sm text-gray-500">Conversa directamente con un productor por WhatsApp sin compromiso.</p>
          </div>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hola Black Box, deseo cotizar un proyecto audiovisual en Lima.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-sm transition-colors shadow-sm shrink-0"
            aria-label="Hablar por WhatsApp con un productor de Black Box Perú"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
