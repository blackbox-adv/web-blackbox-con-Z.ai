'use client'

import { MessageCircle } from 'lucide-react'

interface FloatingWhatsAppProps {
  phone?: string
  whatsapp?: string
  brandName?: string
  brandLogo?: string
}

export function FloatingWhatsApp({
  phone,
  whatsapp,
}: FloatingWhatsAppProps) {
  const cleanNumber = (whatsapp || phone || '51958297236').replace(/\D/g, '')

  const handleOpenChat = () => {
    const text = '¡Hola Black Box! Me gustaría cotizar un proyecto para mi marca.'
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-50">
      <button
        id="floating-whatsapp-btn"
        onClick={handleOpenChat}
        className="relative group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse beacon ring */}
        <span className="absolute -inset-1 bg-emerald-400 rounded-full blur-sm opacity-40 group-hover:opacity-75 animate-ping duration-1000" />
        
        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-7 h-7 fill-white text-white" />
        </div>

        {/* Text Pill (visible on desktop) */}
        <span className="hidden sm:inline-block pr-1.5 font-bold text-sm text-white drop-shadow">
          WhatsApp
        </span>

        {/* Status dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white border-2 border-[#25D366] rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </span>
      </button>
    </div>
  )
}

