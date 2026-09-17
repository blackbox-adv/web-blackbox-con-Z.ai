'use client'

import React from 'react'
import { Play, X, Send } from 'lucide-react'

interface VideoModalProps {
  video: { url: string; platform: string; title: string | null } | null
  onClose: () => void
  whatsapp?: string | null
}

function getEmbedUrl(url: string) {
  if (!url) return ''
  if (url.includes('/shorts/')) {
    const id = url.split('/shorts/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0`
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0`
  }
  if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&]+)/)
    const id = match ? match[1] : ''
    return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0`
  }
  if (url.includes('youtube.com/embed/')) {
    return `${url}?autoplay=1&controls=1&rel=0`
  }
  return url
}

export default function VideoModal({ video, onClose, whatsapp = '51958297236' }: VideoModalProps) {
  if (!video) return null

  const isVertical =
    video.url.includes('/shorts/') ||
    video.platform.toLowerCase() === 'tiktok' ||
    video.platform.toLowerCase() === 'instagram' ||
    (video.title && video.title.toLowerCase().includes('reel')) ||
    (video.title && video.title.toLowerCase().includes('vertical'))

  const embedUrl = getEmbedUrl(video.url)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${isVertical ? 'max-w-md' : 'max-w-4xl'} bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
              <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm line-clamp-1">{video.title || 'Video'}</h3>
              <p className="text-zinc-400 text-xs">
                {isVertical ? 'Formato Vertical 9:16' : 'Video 16:9'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal de video"
            className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className={`${isVertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black flex items-center justify-center relative`}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title || 'Reproductor de video'}
            />
          ) : (
            <div className="p-8 text-center text-white">
              <p className="text-sm">Reproducir directamente en la plataforma:</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir enlace del video en nueva pestaña"
                className="mt-4 inline-block px-6 py-2.5 bg-[#7A1BB5] rounded-full text-white font-bold text-xs"
              >
                Abrir Video
              </a>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-3">
          <span className="text-xs text-zinc-400 truncate">
            ¿Te gustaría una producción como esta?
          </span>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
              `Hola, vi el video "${video.title || 'Muestra de Video'}" y quiero cotizar un proyecto similar.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp BlackBox Peru"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Cotizar en WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
