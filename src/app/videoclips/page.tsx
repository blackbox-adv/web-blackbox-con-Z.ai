'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ArrowLeft, Play, X, ExternalLink, Video, Target, Film, Send, Clapperboard,
  Music, CheckCircle2, Flame, Award, Camera, Radio, Disc, ArrowUpRight, Volume2, VolumeX
} from 'lucide-react'

interface MusicVideo {
  id: string
  title: string
  artist: string
  genre: string
  format: string
  year: string
  youtubeUrl: string
  thumbnailUrl: string
  description: string
  highlights: string[]
  director?: string
}

// Muestras iniciales representativas con estética limpia y profesional
const DEFAULT_MUSIC_VIDEOS: MusicVideo[] = [
  {
    id: 'mv-1',
    title: 'Noche de Fuego',
    artist: 'Artista Urbano / Trap',
    genre: 'Urbano & Trap',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=Su_JcYkeyLw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    description: 'Producción urbana con iluminación estilizada de neón, locación industrial nocturna y planos en movimiento con estabilizador.',
    highlights: ['Iluminación de Neón & Humo', 'Dirección de Arte Urbana', 'Color Grading Teal & Orange']
  },
  {
    id: 'mv-2',
    title: 'Amor en la Distancia',
    artist: 'Orquesta & Cumbia Fusión',
    genre: 'Cumbia & Tropical',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=gixZWO9xOes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80',
    description: 'Videoclip narrativo para agrupación musical. Rodaje en locaciones exteriores y puesta en escena con cuerpo de baile completo.',
    highlights: ['Multi-locación Lima', 'Casting de Actores', 'Edición Dinámica']
  },
  {
    id: 'mv-3',
    title: 'Sesión Acústica en Vivo',
    artist: 'Voz & Guitarra',
    genre: 'Live Session & Pop',
    format: '4K Ultra HD',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=n6sieAKNPa4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
    description: 'Grabación de sesión íntima con óptica fija de cine, captura de audio multipista y atmósfera cálida de estudio.',
    highlights: ['Sonido Directo en Set', 'Lentes Anamórficos', 'Luz Cálida & Bokeh']
  },
  {
    id: 'mv-4',
    title: 'Ritmos de Mi Tierra',
    artist: 'Fusión Andina Contemporánea',
    genre: 'Folclore & Fusión',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=BaKc_hx3NwM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
    description: 'Videoclip de alto impacto con tomas aéreas con drone cinematográfico, vestuarios autóctonos y fotografía paisajística.',
    highlights: ['Tomas Aéreas con Drone 4K', 'Paisajes Naturales', 'Color Grading Cinematográfico']
  }
]

const GENRES = [
  'Todos',
  'Urbano & Trap',
  'Cumbia & Tropical',
  'Live Session & Pop',
  'Folclore & Fusión',
]

function getEmbedUrl(url: string, isAutoplay: boolean = true, isMuted: boolean = false): string | null {
  try {
    if (!url) return null
    const autoplayParam = isAutoplay ? 'autoplay=1' : 'autoplay=0'
    const muteParam = isMuted ? '&mute=1' : '&mute=0'
    
    if (url.includes('/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${autoplayParam}${muteParam}&controls=1&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${autoplayParam}${muteParam}&controls=1&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`
    }
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v')
      if (videoId) return `https://www.youtube.com/embed/${videoId}?${autoplayParam}${muteParam}&controls=1&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`
    }
    return url
  } catch (e) {
    return url
  }
}

export default function VideoclipsPage() {
  const [data, setData] = useState<any>(null)
  const [cachedLogo, setCachedLogo] = useState<string | null>(null)
  const [activeGenre, setActiveGenre] = useState<string>('Todos')
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null)
  const [isHeroAudioActive, setIsHeroAudioActive] = useState<boolean>(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('blackbox_brand_logo')
      if (saved) setCachedLogo(saved)
    } catch (e) {}

    fetch('/api/public/data')
      .then(res => res.json())
      .then(d => {
        setData(d)
        if (d?.config?.brandLogo) {
          try { localStorage.setItem('blackbox_brand_logo', d.config.brandLogo) } catch (e) {}
        }
      })
      .catch(console.error)
  }, [])

  const config = data?.config
  const displayLogo = config?.brandLogo || cachedLogo || '/logo.svg'
  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'
  
  // URL del Showreel Musical (puede ser el reel general o uno específico)
  const musicReelUrl = config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ'

  const getWhatsappUrl = (msg = 'Hola Black Box, tengo un proyecto musical y me gustaría cotizar la producción de un videoclip.') =>
    `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(msg)}`

  const filteredVideos = activeGenre === 'Todos'
    ? DEFAULT_MUSIC_VIDEOS
    : DEFAULT_MUSIC_VIDEOS.filter(v => v.genre === activeGenre)

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-purple-600 selection:text-white">
      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src={displayLogo} 
              alt={config?.brandName || 'Black Box'} 
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain max-w-[240px] sm:max-w-[300px] transition-transform group-hover:scale-105" 
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== '/logo.svg') target.src = '/logo.svg'
              }}
            />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-black tracking-widest text-purple-900 uppercase shadow-xs">
              Films & Videoclips
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full px-3 sm:px-4 py-2 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> <span className="hidden sm:inline">Volver al</span> Inicio
            </Link>
            <Link 
              href="/portfolio"
              className="hidden md:inline-flex items-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full px-4 py-2 text-xs font-semibold transition-colors"
            >
              Portfolio Comercial
            </Link>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, quiero cotizar la producción de un videoclip musical para mi proyecto.'), '_blank')}
              className="bg-black hover:bg-gray-800 text-white rounded-full px-4 sm:px-6 py-2.5 text-xs font-bold gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Cotizar Videoclip
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Claro, Elegante y con Reel en Smartphone/Pantalla Central) */}
      <header className="pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-[#fafafa] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-purple-100/70 border border-purple-200 rounded-full shadow-xs">
                <Clapperboard className="w-3.5 h-3.5 text-purple-700" />
                <span className="text-purple-900 font-bold uppercase tracking-widest text-[11px]">
                  Producción Audiovisual para Artistas & Bandas
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-gray-950 uppercase leading-[1.08]">
                Lleva tu música a la <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-900">
                  Pantalla Grande
                </span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-gray-600 text-base sm:text-lg leading-relaxed font-medium mb-8">
                Dirección cinematográfica, cámaras de cine 4K, iluminación profesional, color grading y teasers en 9:16 para cantantes, solistas, orquestas y sellos discográficos en Perú.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button 
                  size="lg"
                  onClick={() => window.open(getWhatsappUrl('Hola Black Box, quiero agendar una llamada para cotizar la producción de mi videoclip musical.'), '_blank')}
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider shadow-xl shadow-black/10 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Cotizar Mi Video Musical
                </Button>
                
                <a 
                  href="#galeria"
                  className="inline-flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-gray-900 bg-white px-7 py-3.5 text-sm font-bold text-gray-800 hover:text-black transition-all shadow-xs"
                >
                  <Play className="w-4 h-4 mr-2 fill-gray-800" /> Ver Muestras
                </a>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Camera className="w-4 h-4 text-purple-700 mb-1.5" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">Cámaras 4K Cine</h4>
                  <p className="text-[11px] text-gray-500">Ópticas fijas y anamórficas.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Radio className="w-4 h-4 text-purple-700 mb-1.5" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">Iluminación</h4>
                  <p className="text-[11px] text-gray-500">Set, neón, atmósfera y humo.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Disc className="w-4 h-4 text-purple-700 mb-1.5" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">Color Grading</h4>
                  <p className="text-[11px] text-gray-500">Postproducción cinematográfica.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Flame className="w-4 h-4 text-purple-700 mb-1.5" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">Teasers 9:16</h4>
                  <p className="text-[11px] text-gray-500">Reels & TikToks para estreno.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Reel Player en Smartphone 9:16 */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="text-center mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
                  <Play className="w-3 h-3 fill-purple-900" /> Showreel en Vertical 9:16
                </span>
              </div>

              {/* Smartphone Frame (9:16 ratio) */}
              <div className="relative w-[280px] sm:w-[310px] rounded-[2.5rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3 shadow-2xl border-4 border-zinc-700/60 ring-1 ring-black/10">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
                  <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                </div>

                {/* Video Container */}
                <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-black shadow-inner">
                  <iframe
                    key={isHeroAudioActive ? 'music-audio-on' : 'music-audio-off'}
                    src={getEmbedUrl(musicReelUrl, true, !isHeroAudioActive) || ''}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Showreel Black Box"
                  />

                  {/* Audio Toggle Overlay */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <button
                      onClick={() => setIsHeroAudioActive(!isHeroAudioActive)}
                      className="p-2.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 hover:bg-black transition-all cursor-pointer shadow-lg hover:scale-110"
                      title={isHeroAudioActive ? 'Silenciar audio' : 'Activar sonido del video'}
                    >
                      {isHeroAudioActive ? (
                        <Volume2 className="w-4 h-4 text-purple-400" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 font-medium">
                {isHeroAudioActive ? '🔊 Audio activado' : '🔇 Toca el altavoz para escuchar con música'}
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div id="galeria" className="sticky top-20 sm:top-22 lg:top-24 z-40 bg-white/95 backdrop-blur-xl border-y border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-3 sm:py-4">
          <div className="flex gap-2 min-w-max lg:justify-center px-2">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`flex-none rounded-full px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  activeGenre === genre 
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20' 
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:text-black'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Videos Grid (Cartas con diseño claro y moderno) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-purple-500 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                onClick={() => setSelectedVideo(video)}
                className="aspect-video relative overflow-hidden bg-black cursor-pointer group/thumb"
              >
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover/thumb:scale-105 opacity-90 group-hover/thumb:opacity-100"
                />
                
                {/* Gradient and Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center transform group-hover/thumb:scale-110 transition-transform duration-300 shadow-2xl border-2 border-white/80">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 text-white shadow-md">
                    {video.genre}
                  </span>
                  <span className="bg-purple-600 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    {video.format}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>{video.artist}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-2.5 text-gray-950 uppercase group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed font-normal">
                  {video.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {video.highlights.map((h, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-200">
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-2 pt-4 border-t border-gray-100">
                  <Button 
                    onClick={() => setSelectedVideo(video)}
                    className="w-full bg-black text-white hover:bg-gray-800 rounded-xl font-bold uppercase tracking-wider h-11 cursor-pointer text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-white" /> Ver Muestra en Video
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      const msg = `Hola Black Box, vi la muestra de "${video.title}" en su catálogo de videoclips y quisiera cotizar un video musical similar para mi proyecto.`
                      window.open(getWhatsappUrl(msg), '_blank')
                    }}
                    className="w-full text-gray-600 hover:text-black hover:bg-gray-100 rounded-xl text-xs font-semibold h-9 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Cotizar producción similar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Process / Etapas de Trabajo (Diseño Claro) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-y border-gray-200 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-purple-100 border border-purple-200 rounded-full">
              <Film className="w-3.5 h-3.5 text-purple-700" />
              <span className="text-purple-900 font-bold uppercase tracking-wider text-xs">
                Método de Trabajo Cinematográfico
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 uppercase tracking-tight">
              ¿Cómo Producimos tu Video Musical?
            </h2>
            <p className="text-gray-600 mt-3 text-base">
              Nos encargamos del 100% del proceso: desde el concepto en papel hasta la entrega en 4K lista para YouTube y redes sociales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">01</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Pre-Producción & Guion</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Escuchamos tu tema, definimos la narrativa visual, scouting de locaciones en Lima/provincias, casting de modelos/bailarines y desglose de arte.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">02</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Rodaje Profesional</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Jornada de filmación con equipo técnico completo: cámaras 4K/6K, gaffer, iluminación especializada, gimbal, drone y playback sincronizado.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">03</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Post & Color Grading</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Montaje al ritmo del beat, corrección de color profesional (LUTs cinematográficos), efectos visuales (VFX) y masterización final para streaming.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">04</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Lanzamiento & Redes</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Entregamos versiones en 16:9 para YouTube, teasers verticales 9:16 para TikTok/Reels y portadas de alta resolución para que tu estreno destaque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages / Cotización (Diseño Claro) */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 uppercase tracking-tight mb-4">
            Paquetes Adaptados a tu Escala
          </h2>
          <p className="text-gray-600 text-base">
            Diseñamos soluciones audiovisuales tanto para lanzamientos independientes como para producciones discográficas de gran envergadura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between hover:border-purple-300 hover:shadow-lg transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Opción 1</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase mt-1 mb-3">Live Session & Acústico</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-6">
                Ideal para solistas, bandas y lanzamientos que buscan capturar la vibra en directo con calidad de estudio.
              </p>
              <ul className="space-y-3 text-xs text-gray-700 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 1 Jornada de rodaje en estudio/set</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Grabación multi-cámara 4K</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Iluminación cálida de atmósfera</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Color grading y edición final</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, me interesa cotizar una Live Session o Sesión Acústica para mi música.'), '_blank')}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-xl font-bold uppercase text-xs h-11 cursor-pointer"
            >
              Cotizar Live Session
            </Button>
          </div>

          {/* Plan 2 - Featured */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-50 to-white border-2 border-purple-600 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              Más Solicitado
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-800">Opción 2</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase mt-1 mb-3">Videoclip Oficial Pro</h3>
              <p className="text-gray-700 text-xs leading-relaxed mb-6">
                Producción completa para el single principal de tu álbum o lanzamiento comercial.
              </p>
              <ul className="space-y-3 text-xs text-gray-800 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Guion visual y plan de rodaje</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 1-2 Locaciones (Interiores / Exteriores)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Equipo de iluminación y ópticas de cine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Color grading cinematográfico profesional</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> 2 Teasers verticales 9:16 para TikTok/Reels</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, me interesa cotizar el paquete Videoclip Oficial Pro para mi nuevo single.'), '_blank')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-black uppercase text-xs h-11 shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              Cotizar Videoclip Pro
            </Button>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between hover:border-purple-300 hover:shadow-lg transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Opción 3</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase mt-1 mb-3">Producción Cinematográfica</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-6">
                Para orquestas, sellos y artistas que buscan superproducciones con narrativa compleja, actores y efectos.
              </p>
              <ul className="space-y-3 text-xs text-gray-700 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Multi-jornadas de filmación y locaciones</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Casting de actores, bailarines y extras</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Drone FPV / Cinema 4K & VFX</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Campaña integral de expectativa para redes</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, quiero cotizar una Producción Cinematográfica / Superproducción para mi proyecto musical.'), '_blank')}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-xl font-bold uppercase text-xs h-11 cursor-pointer"
            >
              Cotizar Gran Producción
            </Button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl shadow-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-md">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1">{selectedVideo.title}</h3>
                  <p className="text-purple-400 text-[10px] font-bold uppercase tracking-wider">{selectedVideo.artist} • {selectedVideo.genre}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <iframe 
                src={getEmbedUrl(selectedVideo.youtubeUrl, true) || ''} 
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            
            {/* Bottom Quick Bar */}
            <div className="p-3.5 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-300">
                ¿Quieres un videoclip con este nivel cinematográfico para tu tema?
              </span>
              <Button 
                size="sm"
                onClick={() => {
                  const msg = `Hola Black Box, estuve viendo el videoclip de "${selectedVideo.title}" y me gustaría cotizar una producción para mi canción.`
                  window.open(getWhatsappUrl(msg), '_blank')
                }}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white rounded-full px-5 text-xs font-bold gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-3 h-3" /> Cotizar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Banner */}
      <section className="py-20 lg:py-24 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-900 via-purple-950 to-black text-white p-10 lg:p-16 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight uppercase">
            Hagamos que tu música <br />
            <span className="text-purple-300">Se Vea Increíble</span>
          </h2>
          <p className="text-gray-200 mb-8 text-base lg:text-lg font-medium max-w-xl mx-auto">
            Cuéntanos tu idea, el género de tu tema y las fechas tentativas de estreno. Nosotros armamos la propuesta técnica y visual.
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, tengo una canción lista y quiero planificar la grabación del videoclip.'), '_blank')}
              className="bg-white text-black hover:bg-gray-100 rounded-full px-10 py-7 text-sm font-black uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              Escribir a Producción por WhatsApp <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200 text-center px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Black Box Films & Videoclips • Lima, Perú</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <Link href="/portfolio" className="hover:text-black transition-colors">Portfolio Comercial</Link>
            <Link href="/#contacto" className="hover:text-black transition-colors">Contacto</Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp 
        phone={config?.phone} 
        whatsapp={config?.whatsapp} 
        brandName="Black Box Videoclips" 
        brandLogo="/logo-icon.svg" 
      />
    </main>
  )
}
