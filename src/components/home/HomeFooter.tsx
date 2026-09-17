'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

interface HomeFooterProps {
  brandLogo?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
}

export default function HomeFooter({
  brandLogo,
  phone = '+51 958 297 236',
  email = 'contacto@blackboxperu.com',
  address = 'Lima, Perú',
}: HomeFooterProps) {
  return (
    <footer className="bg-zinc-100 text-gray-900 border-t border-zinc-200 contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" aria-label="Ir al inicio de Black Box Peru" className="inline-block mb-4">
              <Image
                src={brandLogo || '/brand-logo-exact.webp'}
                alt="Black Box Peru Logo"
                width={150}
                height={42}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Productora audiovisual en Lima especializada en contenido vertical 9:16, spots comerciales y marketing digital de alto retorno.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/servicios/produccion-audiovisual" aria-label="Servicio de Producción Audiovisual 4K" className="hover:text-black transition-colors">
                  Producción Audiovisual 4K
                </Link>
              </li>
              <li>
                <Link href="/servicios/reels-y-tiktok" aria-label="Servicio de Reels y TikTok 9:16" className="hover:text-black transition-colors">
                  Reels & TikToks 9:16
                </Link>
              </li>
              <li>
                <Link href="/servicios/publicidad-digital-meta-ads" aria-label="Servicio de Publicidad Digital y Meta Ads" className="hover:text-black transition-colors">
                  Publicidad Digital Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/servicios/marketing-para-clinicas-salud" aria-label="Servicio de Marketing para Clínicas y Médicos" className="hover:text-black transition-colors">
                  Marketing para Clínicas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="#inicio" aria-label="Ir a Inicio" className="hover:text-black transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/portfolio" aria-label="Ir a Portfolio de Proyectos" className="hover:text-black transition-colors">
                  Portfolio de Proyectos
                </Link>
              </li>
              <li>
                <Link href="/videoclips" aria-label="Ir a Videoclips y Films Musicales" className="hover:text-black transition-colors">
                  Videoclips & Films Musicales
                </Link>
              </li>
              <li>
                <a href="#contacto" aria-label="Ir a formulario de Contacto" className="hover:text-black transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Contacto Directo</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-black shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black shrink-0" />
                <a href={`mailto:${email}`} aria-label={`Enviar correo a ${email}`} className="hover:text-[#7A1BB5] transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Black Box Agency Peru. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Disponibles para nuevos proyectos
          </div>
        </div>
      </div>
    </footer>
  )
}
