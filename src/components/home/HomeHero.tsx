'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HomeHeroProps {
  brandLogo?: string | null
  phone?: string | null
  whatsapp?: string | null
  onOpenVideo?: (video: { url: string; platform: string; title: string }) => void
}

export default function HomeHero({
  brandLogo,
  phone = '+51 958 297 236',
  whatsapp = '51958297236',
  onOpenVideo,
}: HomeHeroProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false)

  const cleanWhatsappNumber = (whatsapp || phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Hola BLACKBOX quiero cotizar marketing digital'
  )}&utm_source=web&utm_medium=cta&utm_campaign=home_hero`

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Casos de Éxito', href: '#portfolio' },
    { name: 'Videoclips', href: '/videoclips' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contacto', href: '#contacto' },
  ]

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              aria-label="Ir al inicio de Black Box Peru"
              className="flex items-center gap-3 group"
            >
              <Image
                src={brandLogo || '/brand-logo-exact.webp'}
                alt="Black Box Peru - Productora Audiovisual y Agencia de Marketing"
                width={160}
                height={44}
                priority
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-label={`Ir a sección ${link.name}`}
                  className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp BlackBox Peru"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Cotizar WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Cerrar menú móvil' : 'Abrir menú móvil'}
                className="p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Ir a sección ${link.name}`}
                className="block text-base font-semibold text-gray-800 py-2 border-b border-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Contactar por WhatsApp BlackBox Peru"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-sm py-3 rounded-full mt-4"
            >
              <Phone className="w-4 h-4" />
              Cotizar por WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-zinc-50/50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Service Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-200/80 text-[#7A1BB5] text-xs sm:text-sm font-bold tracking-wide w-fit mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#7A1BB5]" />
                Productora Audiovisual 4K/6K en Lima, Perú
              </div>

              {/* Single Sequential H1 */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.94] tracking-tight text-gray-950 uppercase mb-6">
                AGENCIA DE MARKETING<br />
                <span className="text-[#7A1BB5]">EN LIMA</span>
              </h1>

              {/* Subheading */}
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-normal max-w-xl mb-8 leading-relaxed">
                Producción audiovisual de alto impacto y estrategias de marketing digital enfocadas en resultados comerciales reales. Spots 4K/6K, reels 9:16 y pauta para marcas líderes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp BlackBox Peru"
                  className="inline-flex items-center justify-center gap-2 bg-[#7A1BB5] hover:bg-[#68149d] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-purple-600/25 transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <Link
                  href="#portfolio"
                  aria-label="Ver galería de casos de éxito y portafolio"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-bold text-base px-7 py-4 rounded-full border border-gray-300 transition-colors shadow-xs"
                >
                  <span>Ver Casos de Éxito</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900">+150</div>
                  <div className="text-xs text-gray-500 font-semibold">Proyectos Realizados</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#7A1BB5]">4K / 6K</div>
                  <div className="text-xs text-gray-500 font-semibold">Calidad Cine Digital</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600">ROAS 4x+</div>
                  <div className="text-xs text-gray-500 font-semibold">Retorno en Pauta</div>
                </div>
              </div>
            </div>

            {/* Right Media Column - Mobile Phone Video Frame (LCP Element) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
                {/* Outer frame styling */}
                <div className="relative rounded-[2.5rem] p-3 bg-zinc-950 shadow-2xl border-4 border-zinc-800">
                  {/* Speaker & camera notch */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-zinc-950 mr-2" />
                    <div className="w-8 h-1 bg-zinc-800 rounded-full" />
                  </div>

                  {/* Screen Content */}
                  <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-black hero-poster-preload">
                    {isPlayingHeroVideo ? (
                      <iframe
                        src="https://www.youtube.com/embed/nzdbM36oEKQ?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
                        className="w-full h-full object-cover border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Reel 4K Black Box Peru"
                      />
                    ) : (
                      <div className="relative w-full h-full group">
                        <Image
                          src="/hero-poster.webp"
                          alt="Showreel Black Box Peru Productora Audiovisual"
                          width={320}
                          height={568}
                          priority
                          sizes="(max-width: 640px) 280px, 320px"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                        {/* Interactive Play Button overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                          <button
                            type="button"
                            onClick={() => setIsPlayingHeroVideo(true)}
                            aria-label="Reproducir video reel en formato vertical 9:16"
                            className="w-16 h-16 rounded-full bg-[#7A1BB5] hover:bg-[#68149d] text-white flex items-center justify-center shadow-2xl shadow-purple-600/60 transform group-hover:scale-110 transition-all cursor-pointer mb-3"
                          >
                            <Play className="w-7 h-7 fill-white ml-1" />
                          </button>
                          <span className="text-white font-black text-sm uppercase tracking-wider drop-shadow-md">
                            Reproducir Reel 4K
                          </span>
                          <span className="text-zinc-300 text-xs mt-1">
                            Click para cargar video
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video controls / modal trigger bar below smartphone */}
                <div className="flex items-center justify-between mt-4 px-2">
                  <span className="text-xs font-semibold text-gray-500">
                    Formato Vertical 9:16
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenVideo) {
                        onOpenVideo({
                          title: 'Showreel Black Box | Producción Audiovisual 4K',
                          url: 'https://youtube.com/shorts/nzdbM36oEKQ',
                          platform: 'youtube',
                        })
                      } else {
                        setIsPlayingHeroVideo(true)
                      }
                    }}
                    aria-label="Ver video en pantalla completa"
                    className="text-xs font-bold text-[#7A1BB5] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#7A1BB5]" />
                    Ver Pantalla Completa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
