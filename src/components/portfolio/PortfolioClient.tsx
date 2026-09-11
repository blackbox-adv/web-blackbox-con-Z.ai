'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { BrandLogo } from '@/components/BrandLogo'
import { 
  ArrowLeft, Play, X, ExternalLink, Video, TrendingUp, Target, Film, Send
} from 'lucide-react'

function getVideoThumbnail(project: any): string {
  if (project?.imageUrl && !project.imageUrl.startsWith('/portfolio/') && !project.imageUrl.includes('unsplash.com')) {
    return project.imageUrl
  }
  if (project?.videos && project.videos[0]?.thumbnail) {
    return project.videos[0].thumbnail
  }
  const url = project?.driveUrl || (project?.videos && project.videos[0]?.url)
  if (url) {
    if (url.includes('/shorts/')) {
      const id = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0].split('&')[0]
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
    if (url.includes('v=')) {
      const id = url.split('v=')[1].split('&')[0]
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    }
  }

  const key = `${project?.title || ''} ${project?.category || ''}`.toLowerCase()
  if (key.includes('avendaño') || key.includes('clínica') || key.includes('salud') || key.includes('bariátrica')) return 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg'
  if (key.includes('makita') || key.includes('herramienta') || key.includes('industrial') || key.includes('b2b')) return 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg'
  if (key.includes('leomar') || key.includes('mueble') || key.includes('hogar') || key.includes('retail')) return 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg'
  if (key.includes('lap') || key.includes('custom') || key.includes('auto') || key.includes('cuero')) return 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg'
  if (key.includes('burger') || key.includes('gastro') || key.includes('comida') || key.includes('restaurante')) return 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg'
  if (key.includes('shaking') || key.includes('bar') || key.includes('bebida') || key.includes('trago')) return 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg'
  if (key.includes('checor') || key.includes('inmobil') || key.includes('edificio') || key.includes('departamento')) return 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg'
  if (key.includes('chalqui') || key.includes('personal') || key.includes('publicidad') || key.includes('comercial')) return 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg'

  return project?.imageUrl || 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg'
}

function getEmbedUrl(url: string, platform: string, isAutoplay: boolean = true): string | null {
  try {
    if (!url) return null
    const autoplayParam = isAutoplay ? 'autoplay=1' : 'autoplay=0'
    
    if (url.includes('/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1`
    }
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1`
      }
    }
    if (url.includes('youtube.com/embed/')) {
      const base = url.split('?')[0]
      return `${base}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1`
    }

    if (platform === 'drive.google.com' || url.includes('drive.google.com')) {
      return url.replace('/view', '/preview').replace('/edit', '/preview')
    }

    return url
  } catch {
    return url
  }
}

export default function PortfolioClient() {
  const [data, setData] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  useEffect(() => {
    fetch('/api/public/data')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const config = data?.config
  const allProjects = data?.projects || []

  const categories = [
    { id: 'all', name: 'Todos los Proyectos' },
    { id: 'Salud & Bariátrica', name: 'Salud & Medicina' },
    { id: 'Herramientas & B2B', name: 'B2B & Industrial' },
    { id: 'Muebles & Hogar', name: 'Muebles & Diseño' },
    { id: 'Automotriz & Cuero', name: 'Automotriz' },
    { id: 'Gastronomía & Eventos', name: 'Gastronomía' },
    { id: 'Bar & Coctelería', name: 'Bares & Coctelería' },
    { id: 'Inmobiliaria & Edificios', name: 'Inmobiliaria' },
    { id: 'Comercial & Publicidad', name: 'Publicidad & Spots' },
    { id: 'Videoclips & Música', name: 'Videoclips Musicales 🎵' },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter((p: any) => p.category === selectedCategory)

  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hola Black Box, quiero cotizar un proyecto audiovisual para mi marca')}`

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 hidden sm:block" />
            <BrandLogo href="/" className="h-10 sm:h-12 w-auto object-contain max-w-[220px]" />
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/videoclips"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all border border-purple-200/60"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videoclips Musicales</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105"
            >
              <span>Cotizar Proyecto</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200 text-xs font-extrabold text-purple-800 uppercase tracking-widest mb-4">
          <Target className="w-3.5 h-3.5 text-purple-600" />
          Portafolio Oficial Lima
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 uppercase mb-4 leading-tight">
          Portafolio de Producción Audiovisual en Lima
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Campañas de alto impacto, videos verticales 9:16 para redes sociales, spots comerciales y videoclips de artistas que generan resultados comerciales medibles.
        </p>
      </section>

      {/* Category Pills Filter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-gray-200/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200/80 hover:border-gray-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200/80">
            <p className="text-gray-500 font-semibold">No se encontraron proyectos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: any, index: number) => (
              <div 
                key={project.id} 
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:border-purple-400/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Thumbnail Container */}
                <div 
                  onClick={() => {
                    if (project.videos && project.videos.length > 0) {
                      setSelectedVideo(project.videos[0])
                    } else if (project.driveUrl) {
                      if (project.driveUrl.includes('/folders/')) {
                        window.open(project.driveUrl, '_blank')
                      } else {
                        setSelectedVideo({
                          title: project.title,
                          url: project.driveUrl,
                          platform: project.driveUrl.includes('drive.google.com') ? 'drive.google.com' : 'youtube'
                        })
                      }
                    }
                  }}
                  className="aspect-video relative overflow-hidden flex items-center justify-center bg-black cursor-pointer"
                >
                  <div className="w-full h-full relative group/thumb">
                    <Image 
                      src={getVideoThumbnail(project)} 
                      alt={`Producción audiovisual ${project.category || 'comercial'} para ${project.title} en Lima`} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 3}
                      className="object-cover transition-all duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 lg:w-16 h-14 lg:h-16 rounded-full bg-purple-600 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl border-2 border-white/40">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
                    <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 text-white shadow-md">
                      {project.category}
                    </span>
                    <span className="bg-purple-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      {project.format || '9:16 Vertical'}
                    </span>
                  </div>

                  {project.result && (
                    <div className="absolute bottom-3.5 right-3.5 z-10">
                      <span className="bg-white/95 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-black shadow-md border border-gray-100 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                        {project.result}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-950 mb-2 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (project.videos && project.videos.length > 0) {
                          setSelectedVideo(project.videos[0])
                        } else if (project.driveUrl) {
                          setSelectedVideo({
                            title: project.title,
                            url: project.driveUrl,
                            platform: 'youtube'
                          })
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 uppercase tracking-wider cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-purple-600" />
                      Reproducir Video
                    </button>

                    <a
                      href={`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(`Hola Black Box, vi su trabajo "${project.title}" en su portafolio y deseo cotizar un video similar.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Cotizar similar</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal with 9:16 Vertical & 16:9 Support */}
      {selectedVideo && (() => {
        const isVertical = selectedVideo.url?.includes('/shorts/') || 
                           selectedVideo.platform?.toLowerCase() === 'tiktok' || 
                           selectedVideo.platform?.toLowerCase() === 'instagram' ||
                           (selectedVideo.title && selectedVideo.title.toLowerCase().includes('reel')) ||
                           (selectedVideo.title && selectedVideo.title.toLowerCase().includes('vertical'))

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={() => setSelectedVideo(null)}>
            <div 
              className={`relative w-full ${isVertical ? 'max-w-md' : 'max-w-4xl'} bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all`} 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm line-clamp-1">{selectedVideo.title || 'Video'}</h3>
                    <p className="text-zinc-400 text-xs capitalize flex items-center gap-1.5">
                      {isVertical ? 'Formato Vertical (9:16)' : (selectedVideo.platform || 'Video')}
                      {isVertical && <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold">REEL</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedVideo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir original
                  </a>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Video Frame */}
              <div className={`${isVertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black flex items-center justify-center relative`}>
                <iframe
                  src={getEmbedUrl(selectedVideo.url, selectedVideo.platform || 'youtube', false) || ''}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Bottom CTA */}
              <div className="p-3.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 truncate">
                  ¿Quieres un video de este nivel para tu marca en Lima?
                </span>
                <Button
                  size="sm"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs gap-1.5 cursor-pointer shadow-md shrink-0"
                >
                  Cotizar en WhatsApp <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Final Section */}
      <section className="py-20 lg:py-28 px-4 relative overflow-hidden bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-50 via-indigo-50/40 to-white border border-purple-100 p-10 lg:p-20 rounded-[2.5rem] shadow-sm">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight tracking-tight text-gray-900 uppercase">
            ¿Listo para potenciar tu <span className="text-purple-600">marca</span>?
          </h2>
          <p className="text-gray-600 mb-8 text-base lg:text-lg font-medium max-w-xl mx-auto">
            Escríbenos y conversemos sobre la estrategia visual y el paquete de videos verticales ideales para tu negocio en Lima.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="bg-black text-white hover:bg-zinc-800 rounded-full px-10 py-7 text-sm font-bold uppercase tracking-wider shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              Contactar por WhatsApp <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-slate-50 border-t border-gray-200/80 text-center px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-semibold">
          <p>© {new Date().getFullYear()} Black Box Agency • Lima, Perú • Todos los derechos reservados</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <Link href="/videoclips" className="text-purple-600 hover:text-purple-800 transition-colors">Videoclips & Films Musicales 🎬</Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp 
        phone={config?.phone} 
        whatsapp={config?.whatsapp} 
        brandName={config?.brandName || 'Black Box'} 
        brandLogo="/logo-icon.svg" 
      />
    </main>
  )
}
