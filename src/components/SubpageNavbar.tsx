'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BrandLogo } from './BrandLogo'
import { Phone, Menu, X } from 'lucide-react'

interface SubpageNavbarProps {
  activePage?: 'inicio' | 'servicios' | 'portafolio' | 'portfolio' | 'contacto' | 'videoclips'
  ctaText?: string
  defaultMessage?: string
}

export function SubpageNavbar({
  activePage = 'servicios',
  ctaText = 'Cotizar Servicio',
  defaultMessage = 'Hola Black Box, me gustaría cotizar un proyecto para mi marca.'
}: SubpageNavbarProps) {
  const [cleanPhone, setCleanPhone] = useState('51958297236')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('blackbox_cached_config')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        const num = (parsed.whatsapp || parsed.phone || '51958297236').replace(/\D/g, '')
        if (num) setCleanPhone(num)
      }
    } catch {}

    fetch('/api/public/data')
      .then(r => r.json())
      .then(res => {
        if (res?.config) {
          const num = (res.config.whatsapp || res.config.phone || '51958297236').replace(/\D/g, '')
          if (num) setCleanPhone(num)
        }
      })
      .catch(() => {})
  }, [])

  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
        <BrandLogo href="/" />

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link 
            href="/" 
            className={`${activePage === 'inicio' ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-black'} transition-colors`}
          >
            Inicio
          </Link>
          <Link 
            href="/servicios" 
            className={`${activePage === 'servicios' ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-black'} transition-colors`}
          >
            Servicios
          </Link>
          <Link 
            href="/portfolio" 
            className={`${activePage === 'portafolio' || activePage === 'portfolio' ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-black'} transition-colors`}
          >
            Portafolio
          </Link>
          <Link 
            href="/videoclips" 
            className={`${activePage === 'videoclips' ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-black'} transition-colors`}
          >
            Videoclips
          </Link>
          <Link 
            href="/contacto" 
            className={`${activePage === 'contacto' ? 'text-purple-700 font-bold' : 'text-gray-600 hover:text-black'} transition-colors`}
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ctaText} por WhatsApp`}
            className="hidden sm:inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            {ctaText}
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link 
            href="/" 
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            href="/servicios" 
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link 
            href="/portfolio" 
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portafolio
          </Link>
          <Link 
            href="/videoclips" 
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Videoclips
          </Link>
          <Link 
            href="/contacto" 
            className="block py-2 text-sm font-semibold text-gray-800 hover:text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contacto
          </Link>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaText} por WhatsApp`}
              className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-bold py-3 rounded-full"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
