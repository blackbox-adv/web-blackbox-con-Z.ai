'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HomeContactProps {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  address?: string | null
}

export default function HomeContact({
  phone = '+51 958 297 236',
  whatsapp = '51958297236',
  email = 'contacto@blackboxperu.com',
  address = 'Lima, Perú',
}: HomeContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>('email')

  const cleanWhatsappNumber = (whatsapp || phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero información sobre los servicios de Black Box'
  )}&utm_source=web&utm_medium=cta&utm_campaign=home_contact`

  return (
    <section id="contacto" className="py-20 lg:py-28 relative bg-gray-50 contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <span className="inline-block mb-3 px-4 py-1.5 bg-[#7A1BB5] text-white rounded-full font-bold text-xs uppercase tracking-wider">
              Contacto Directo
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 uppercase tracking-tight">
              Hablemos de tu <span className="text-[#7A1BB5]">próximo proyecto</span>
            </h2>
            <p className="text-gray-600 mb-10 text-base sm:text-lg">
              Estamos listos para escucharte. Cuéntanos sobre tu negocio y te responderemos en menos de 2 horas.
            </p>

            <div className="space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp BlackBox Peru"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-xs border border-gray-200/80 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">WhatsApp / Teléfono</div>
                  <div className="text-gray-900 font-bold text-sm sm:text-base">{phone}</div>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                aria-label={`Enviar correo a ${email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-xs border border-gray-200/80 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#7A1BB5]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">Email Directo</div>
                  <div className="text-gray-900 font-bold text-sm sm:text-base">{email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-xs border border-gray-200/80">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">Ubicación</div>
                  <div className="text-gray-900 font-bold text-sm sm:text-base">{address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">Elige cómo prefieres comunicarte con nuestro equipo comercial.</p>

            {/* Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setSendMethod('email')}
                aria-label="Seleccionar envío por correo"
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  sendMethod === 'email' ? 'bg-white text-[#7A1BB5] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                Por Correo
              </button>
              <button
                type="button"
                onClick={() => setSendMethod('whatsapp')}
                aria-label="Seleccionar envío por WhatsApp"
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  sendMethod === 'whatsapp' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Phone className="w-4 h-4" />
                Por WhatsApp
              </button>
            </div>

            {formStatus === 'sent' ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">¡Mensaje preparado con éxito!</h4>
                <p className="text-xs sm:text-sm text-gray-600">Nos pondremos en contacto contigo a la brevedad.</p>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Enviar otro mensaje"
                  onClick={() => {
                    setFormStatus('idle')
                    setFormData({ name: '', email: '', company: '', message: '' })
                  }}
                  className="mt-2 text-xs"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (sendMethod === 'whatsapp') {
                    const msg = `Hola Black Box, soy ${formData.name || 'un cliente'}${
                      formData.company ? ' de ' + formData.company : ''
                    }. ${formData.message ? 'Mensaje: ' + formData.message : ''}${
                      formData.email ? ' (Mi email: ' + formData.email + ')' : ''
                    }`
                    window.open(`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
                    setFormStatus('sent')
                  } else {
                    const recipient = email
                    const subject = encodeURIComponent(`Nuevo Mensaje Web: ${formData.name}`)
                    const body = encodeURIComponent(
                      `Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company}\n\nMensaje:\n${formData.message}`
                    )
                    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
                    setFormStatus('sent')
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold text-gray-900">
                      Nombre *
                    </label>
                    <Input
                      id="contact-name"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-50 border-gray-200 rounded-xl text-gray-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-bold text-gray-900">
                      {sendMethod === 'email' ? 'Email *' : 'Email'}
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      required={sendMethod === 'email'}
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-50 border-gray-200 rounded-xl text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-company" className="text-xs font-bold text-gray-900">
                    Empresa / Marca
                  </label>
                  <Input
                    id="contact-company"
                    placeholder="Nombre de tu negocio"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-gray-50 border-gray-200 rounded-xl text-gray-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold text-gray-900">
                    Mensaje / Detalles del Proyecto
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Cuéntanos brevemente qué necesitas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7A1BB5]"
                  />
                </div>

                <button
                  type="submit"
                  aria-label={sendMethod === 'whatsapp' ? 'Contactar por WhatsApp BlackBox Peru' : 'Enviar mensaje por correo a Black Box Peru'}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-[#7A1BB5] hover:bg-[#68149d] transition-colors cursor-pointer shadow-md shadow-purple-600/20"
                >
                  {sendMethod === 'whatsapp' ? 'Enviar por WhatsApp' : 'Enviar Mensaje Directo'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
