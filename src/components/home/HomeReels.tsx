'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Clapperboard, Play, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HomeReelsProps {
  whatsapp?: string | null
  phone?: string | null
  onOpenVideo?: (video: { url: string; platform: string; title: string }) => void
}

export default function HomeReels({
  whatsapp = '51958297236',
  phone = '+51 958 297 236',
  onOpenVideo,
}: HomeReelsProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false)

  const cleanWhatsappNumber = (whatsapp || phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    'Hola, quiero cotizar un pack de Reels y Videos Verticales con Black Box'
  )}&utm_source=web&utm_medium=cta&utm_campaign=home_reels`

  return (
    <section className="py-20 lg:py-28 relative bg-[#0a0a0c] text-white overflow-hidden contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-purple-400 mb-6">
              <Clapperboard className="w-3.5 h-3.5" />
              Especialistas en Formato Vertical (9:16)
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight uppercase leading-tight">
              Reels, TikToks y Shorts que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                detienen el scroll
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
              El 80% del consumo de video en redes es en vertical. Producimos contenido audiovisual con ganchos psicológicos, iluminación cinematográfica y edición dinámica diseñada para maximizar retención y ventas.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2.5 font-bold text-xs">
                  01
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Hooks de 3 Segundos</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Estructura de guion y planos iniciales diseñados para frenar el dedo del espectador al instante.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-2.5 font-bold text-xs">
                  02
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Color & Cine 4K</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Corrección de color y textura cinematográfica que eleva el valor percibido de tu marca.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5 font-bold text-xs">
                  03
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Ritmo & Sound Design</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Edición precisa al compás del audio, efectos sonoros inmersivos y tendencias de voz.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5 font-bold text-xs">
                  04
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">Packs Mensuales</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Planes de 8, 12 o 16 videos al mes con rodajes optimizados para tu negocio.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp BlackBox Peru"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full px-8 py-4 shadow-xl shadow-purple-600/30 cursor-pointer transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
                Cotizar Pack de Reels por WhatsApp
              </a>

              <Button
                variant="outline"
                onClick={() => {
                  if (onOpenVideo) {
                    onOpenVideo({
                      title: 'Showreel Black Box | Recopilatorio de Trabajos',
                      url: 'https://youtube.com/shorts/nzdbM36oEKQ',
                      platform: 'youtube',
                    })
                  } else {
                    setIsPlayingInline(true)
                  }
                }}
                aria-label="Reproducir Reel Recopilatorio de Trabajos en pantalla completa"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-4 font-semibold gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                Reproducir Reel Recopilatorio
              </Button>
            </div>
          </div>

          {/* Right Column: 9:16 Video Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl p-4">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">blackbox_reel_2026.mp4</span>
                </div>

                {/* 9:16 Container (Poster + On-Demand Iframe) */}
                <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                  {isPlayingInline ? (
                    <iframe
                      src="https://www.youtube.com/embed/nzdbM36oEKQ?autoplay=1&controls=1&rel=0"
                      className="w-full h-full object-cover border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Showreel Black Box Reels"
                    />
                  ) : (
                    <div className="relative w-full h-full group">
                      <Image
                        src="/portfolio/marca-personal.webp"
                        alt="Vista previa de reels y formato vertical"
                        width={360}
                        height={640}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                        <button
                          type="button"
                          onClick={() => setIsPlayingInline(true)}
                          aria-label="Reproducir video de muestra 9:16"
                          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-2xl shadow-purple-600/50 transform group-hover:scale-110 transition-transform cursor-pointer mb-3"
                        >
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </button>
                        <span className="text-white font-bold text-sm">Ver Muestra Vertical</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-20">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenVideo) {
                              onOpenVideo({
                                title: 'Showreel Black Box | Recopilatorio',
                                url: 'https://youtube.com/shorts/nzdbM36oEKQ',
                                platform: 'youtube',
                              })
                            } else {
                              setIsPlayingInline(true)
                            }
                          }}
                          aria-label="Ver video recopilatorio en grande"
                          className="flex-1 py-2.5 px-3 bg-white text-black font-bold text-xs rounded-xl shadow-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                          Ver en Grande
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
