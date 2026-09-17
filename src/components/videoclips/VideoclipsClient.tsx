'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { BrandLogo } from '@/components/BrandLogo'
import { 
  ArrowLeft, Play, X, Video, Film, Send, Clapperboard,
  Music, CheckCircle2, Flame, Camera, Radio, Disc, Volume2, VolumeX,
  Phone, HelpCircle
} from 'lucide-react'

export interface MusicVideo {
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

const DEFAULT_MUSIC_VIDEOS: MusicVideo[] = [
  {
    id: 'mv-terco92',
    title: 'Una Más (Videoclip Oficial)',
    artist: 'Terco 92',
    genre: 'Urbano & Trap',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=vZANeQ4dhus',
    thumbnailUrl: 'https://i.ytimg.com/vi/vZANeQ4dhus/hqdefault.jpg',
    description: 'Producción audiovisual oficial para Terco 92. Rodaje cinematográfico urbano nocturno, óptica anamórfica, color grading estilizado y sincronización rítmica.',
    highlights: ['Videoclip Oficial de Rap Peruano', 'Canal Oficial de Terco 92', 'Estética Urbana & Noche', 'Color Grading Cinematográfico']
  },
  {
    id: 'mv-los-santos',
    title: 'Encierro Mental (Videoclip Oficial)',
    artist: 'Los Santos',
    genre: 'Rock & Bandas',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=r7g-P2atPiA',
    thumbnailUrl: 'https://i.ytimg.com/vi/r7g-P2atPiA/hqdefault.jpg',
    description: 'Producción cinematográfica de videoclip oficial para la banda de rock Los Santos. Concepto de encierro psicológico, fotografía en locación industrial, efectos escénicos y alto impacto visual.',
    highlights: ['Banda de Rock Nacional', 'Fotografía en Locación Industrial', 'Actuación Dramática y Performance', 'Post-producción Cinematográfica']
  },
  {
    id: 'mv-miserable',
    title: 'La Gran Voluntad (Videoclip Oficial)',
    artist: 'Miserable',
    genre: 'Rock & Bandas',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=Rud7FJi_zfE',
    thumbnailUrl: 'https://i.ytimg.com/vi/Rud7FJi_zfE/hqdefault.jpg',
    description: 'Videoclip oficial para la banda Miserable. Iluminación escénica teatral de alto contraste, atmósfera expresionista, diseño de vestuario y narrativa cinematográfica intensa.',
    highlights: ['Estética Teatral y Expresionista', 'Iluminación Escénica de Alto Contraste', 'Edición Rítmica Potente', 'Banda de Rock Peruana']
  },
  {
    id: 'mv-la-merka',
    title: 'Artificial (Videoclip Oficial)',
    artist: 'La Merka',
    genre: 'Pop & Fusión',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=XxthrqT0qp0',
    thumbnailUrl: 'https://i.ytimg.com/vi/XxthrqT0qp0/hqdefault.jpg',
    description: 'Producción audiovisual contemporánea para La Merka. Iluminación neón y fluorescente, despliegue escénico con músicos en vivo y tomas dinámicas.',
    highlights: ['Iluminación Neón Dinámica', 'Edición con Efectos Visuales', 'Performance Enérgico de Banda', 'Cámara en Mano Cinematográfica']
  },
  {
    id: 'mv-la-prinz',
    title: 'El Vuelo (Videoclip Oficial)',
    artist: 'La Prinz',
    genre: 'Pop & Fusión',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=n6yCR9bjG18',
    thumbnailUrl: 'https://i.ytimg.com/vi/n6yCR9bjG18/hqdefault.jpg',
    description: 'Videoclip estilizado para La Prinz con fotografía cuidada, dirección de arte moderna, planos secuencia expresivos y narrativa visual que acompaña la canción.',
    highlights: ['Dirección de Arte & Styling', 'Planos de Belleza & Retrato', 'Narrativa Sensible y Emocional', 'Colorimetría Suave y Cinematográfica']
  },
  {
    id: 'mv-el-paisa',
    title: 'Un Dos Tres (Videoclip Oficial)',
    artist: 'El Paisa x Alain Almeida',
    genre: 'Salsa & Tropical',
    format: '4K Cinema (16:9)',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=4QNwMr0zW6w',
    thumbnailUrl: 'https://i.ytimg.com/vi/4QNwMr0zW6w/hqdefault.jpg',
    description: "Producción audiovisual del videoclip oficial 'Un Dos Tres' para El Paisa en colaboración con Alain Almeida. Ritmo de timba cubana, baile urbano, despliegue de bailarines y fotografía cinematográfica.",
    highlights: ['Colaboración Internacional con Alain Almeida', 'Despliegue de Baile Urbano y Salsa Cubana', 'Fotografía de Escena y Energía Festiva', 'Sincronización Rítmica y Montaje Dinámico']
  },
  {
    id: 'mv-chalqui',
    title: 'Campaña & Rodaje Audiovisual',
    artist: 'Chalqui',
    genre: 'Comercial & Spots',
    format: '4K / 9:16 Vertical',
    year: '2024',
    youtubeUrl: 'https://youtube.com/shorts/eDVSSoWJwWg',
    thumbnailUrl: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg',
    description: 'Producción con ritmo publicitario rápido y despliegue de cámara en movimiento para campaña comercial masiva.',
    highlights: ['Formato Vertical de Alta Retención', 'Audio & Sincro de Impacto', 'Iluminación Escénica', '+500K Reproducciones']
  },
  {
    id: 'mv-shaking',
    title: 'Videos Musicales de Ambiente Nocturno',
    artist: 'Shaking Bar',
    genre: 'Comercial & Spots',
    format: '4K / 9:16 Vertical',
    year: '2024',
    youtubeUrl: 'https://youtube.com/shorts/n6sieAKNPa4',
    thumbnailUrl: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg',
    description: 'Videos rítmicos con música electrónica y diseño sonoro que transportan al usuario a la experiencia nocturna.',
    highlights: ['Diseño Sonoro & Mezcla', 'Edición al Ritmo del Beat', 'Colorimetría Nocturna', 'Viral en Redes Sociales']
  }
]

const GENRES = [
  'Todos',
  'Urbano & Trap',
  'Rock & Bandas',
  'Pop & Fusión',
  'Salsa & Tropical',
  'Comercial & Spots'
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
  } catch {
    return url
  }
}

export default function VideoclipsClient() {
  const [data, setData] = useState<any>(null)
  const [activeGenre, setActiveGenre] = useState<string>('Todos')
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null)
  const [isHeroAudioActive, setIsHeroAudioActive] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(d => {
        setData(d)
      })
      .catch(() => {})
  }, [])

  const config = data?.config
  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'
  
  // URL del Showreel Musical (por defecto el videoclip Blackbox Music 16:9 con el guitarrista de la imagen o configurado en admin)
  const musicReelUrl = config?.musicVideoUrl || config?.heroReelUrl || 'https://youtu.be/bhgJlSKKv50'

  const getWhatsappUrl = (msg = 'Hola BLACKBOX quiero cotizar videoclip') =>
    `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(msg)}&utm_source=web&utm_medium=cta&utm_campaign=videoclips`

  const filteredVideos = activeGenre === 'Todos'
    ? DEFAULT_MUSIC_VIDEOS
    : DEFAULT_MUSIC_VIDEOS.filter(v => v.genre === activeGenre)

  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900 selection:bg-purple-600 selection:text-white">
      {/* Header / Nav (Idéntico a la versión aprobada en circulación) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo href="/" className="h-12 sm:h-14 lg:h-16 w-auto object-contain max-w-[240px] sm:max-w-[300px] transition-transform group-hover:scale-105" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-black tracking-widest text-purple-900 uppercase shadow-xs">
              Films & Videoclips
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Volver al Inicio</span>
            </Link>
            <Link 
              href="/portfolio"
              className="hidden md:inline-flex items-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-full px-4 py-2 text-xs font-semibold transition-colors"
            >
              Portfolio Comercial
            </Link>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola BLACKBOX quiero cotizar videoclip'), '_blank')}
              className="bg-black hover:bg-gray-800 text-white rounded-full px-4 sm:px-6 py-2.5 text-xs font-bold gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Cotizar Videoclip
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section: Diseño a 2 columnas con el Visor de Cine Horizontal 16:9 */}
      <header className="pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-[#fafafa] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Titular y Propuesta de Valor */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-5">
                <span className="inline-flex px-4 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold tracking-wide">
                  Productora de Videoclips en Lima, Perú
                </span>
              </div>

              <h1 className="font-black tracking-tighter leading-[0.9] text-4xl sm:text-5xl lg:text-6xl uppercase mb-6 text-gray-950">
                VIDEOCLIPS QUE<br />
                <span className="text-[#8B5CF6]">DESPEGAN CARRERAS</span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-gray-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
                Producción cinematográfica 4K de videos musicales en Lima para artistas y bandas que buscan trascender en plataformas digitales.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8">
                <Button 
                  size="lg"
                  onClick={() => window.open(getWhatsappUrl('Hola BLACKBOX quiero cotizar videoclip'), '_blank')}
                  className="bg-black hover:bg-gray-800 text-white rounded-full px-7 py-5 text-sm sm:text-base font-bold shadow-xl shadow-black/10 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-emerald-400" />
                  Solicitar Cotización por WhatsApp
                </Button>
                
                <Link 
                  href="/portfolio?categoria=Videoclips"
                  className="inline-flex items-center justify-center rounded-full border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3.5 text-sm sm:text-base font-bold transition-all shadow-xs"
                >
                  Ver Casos en Portafolio
                </Link>
              </div>

              {/* Pilares técnicos (2x2) */}
              <div className="grid grid-cols-2 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Camera className="w-4 h-4 text-purple-700 mb-1" />
                  <h3 className="text-xs font-bold uppercase text-gray-900">Cámaras 4K Cine</h3>
                  <p className="text-[11px] text-gray-500">Ópticas fijas y anamórficas.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Radio className="w-4 h-4 text-purple-700 mb-1" />
                  <h3 className="text-xs font-bold uppercase text-gray-900">Iluminación</h3>
                  <p className="text-[11px] text-gray-500">Set, atmósfera y efectos de humo.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Disc className="w-4 h-4 text-purple-700 mb-1" />
                  <h3 className="text-xs font-bold uppercase text-gray-900">Color Grading</h3>
                  <p className="text-[11px] text-gray-500">Postproducción cinematográfica.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs">
                  <Flame className="w-4 h-4 text-purple-700 mb-1" />
                  <h3 className="text-xs font-bold uppercase text-gray-900">Teasers 9:16</h3>
                  <p className="text-[11px] text-gray-500">Cortes dinámicos para redes.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visor de Cine 16:9 Widescreen */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between w-full mb-3 px-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 border border-purple-200 text-purple-950 text-xs font-black uppercase tracking-wider shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  Visor de Cine 16:9 • Blackbox Music
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5 text-purple-600" /> Master Cinema 4K
                </span>
              </div>

              {/* Master Display Frame (16:9 ratio) */}
              <div className="relative w-full rounded-2xl sm:rounded-3xl bg-zinc-950 p-2.5 sm:p-3.5 shadow-2xl shadow-purple-950/20 border-2 border-zinc-800 ring-1 ring-white/10">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-zinc-900/90 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-bold text-red-500">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
                    </span>
                    <span className="text-zinc-600">|</span>
                    <span className="font-bold text-white tracking-wider">4K UHD</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-purple-400 font-semibold">24.00 FPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-zinc-400 font-sans text-[10px] uppercase font-bold tracking-wider">
                      Master Cinema
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 font-bold text-[10px] border border-zinc-700">
                      16:9 WIDESCREEN
                    </span>
                  </div>
                </div>

                {/* 16:9 Video Player Container */}
                <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner border border-zinc-800/80 group/player">
                  <iframe
                    key={isHeroAudioActive ? 'hero-music-audio-on' : 'hero-music-audio-off'}
                    src={getEmbedUrl(musicReelUrl, true, !isHeroAudioActive) || ''}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Blackbox Music - Showreel Oficial (16:9 Widescreen)"
                  />

                  {/* Top Right Quick Theater Modal Button */}
                  <div className="absolute top-3 right-3 z-20">
                    <button
                      onClick={() => setSelectedVideo({
                        id: 'mv-blackbox-music',
                        title: 'Blackbox Music (Showreel Oficial)',
                        artist: 'Black Box Music & Films',
                        genre: 'Urbano & Fusión',
                        format: '4K Cinema (16:9)',
                        year: '2026',
                        youtubeUrl: musicReelUrl,
                        thumbnailUrl: 'https://i.ytimg.com/vi/bhgJlSKKv50/maxresdefault.jpg',
                        description: 'Producción cinematográfica y showreel musical oficial de Black Box.',
                        highlights: ['4K Cinema Widescreen', 'Ópticas Anamórficas', 'Masterización de Audio']
                      })}
                      aria-label="Abrir showreel musical en pantalla completa de cine"
                      className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 hover:bg-purple-600 transition-all cursor-pointer text-[11px] font-bold flex items-center gap-1.5 shadow-lg hover:scale-105"
                      title="Abrir en pantalla completa de cine"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Teatro Fullscreen</span>
                    </button>
                  </div>

                  {/* Audio Toggle Overlay */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <button
                      onClick={() => setIsHeroAudioActive(!isHeroAudioActive)}
                      aria-label={isHeroAudioActive ? 'Silenciar audio del showreel' : 'Activar sonido del video'}
                      className="px-3.5 py-2 rounded-full bg-black/85 backdrop-blur-md text-white border border-white/20 hover:bg-black transition-all cursor-pointer shadow-lg hover:scale-105 flex items-center gap-2 text-xs font-bold"
                      title={isHeroAudioActive ? 'Silenciar audio' : 'Activar sonido del video'}
                    >
                      {isHeroAudioActive ? (
                        <>
                          <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                          <span className="text-purple-300 text-[11px]">Sonido Activado</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-4 h-4 text-white" />
                          <span className="text-white text-[11px]">Activar Audio</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Display Footer Bar */}
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="font-semibold text-zinc-200">
                      Blackbox Music • Showreel & Videoclips
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className={isHeroAudioActive ? 'text-purple-400 font-semibold' : 'text-zinc-400'}>
                      {isHeroAudioActive ? '🔊 Reproduciendo con sonido' : '🔇 Clic en "Activar Audio" para escuchar la pista'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Filter Tabs Sticky */}
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

      {/* Videos Grid con las Producciones Reales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map((video, index) => (
            <div 
              key={video.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/90 hover:border-purple-500 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                onClick={() => setSelectedVideo(video)}
                className="aspect-video relative overflow-hidden bg-black cursor-pointer group/thumb"
              >
                <Image 
                  src={video.thumbnailUrl} 
                  alt={`Producción audiovisual videoclip ${video.title} para ${video.artist} en Lima`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                  referrerPolicy="no-referrer"
                  className="object-cover transition-all duration-500 group-hover/thumb:scale-105 opacity-90 group-hover/thumb:opacity-100"
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

      {/* Production Process / Etapas de Trabajo */}
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
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Rodaje Cinematográfico 4K</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Filmamos con cámaras de cine, óptica profesional anamórfica, estabilizadores y paquete completo de iluminación para lograr texturas cinematográficas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">03</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Edición & Color Grading</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Montaje rítmico milimétrico al compás de la música, corrección de color profesional (DaVinci Resolve) y efectos visuales estilizados.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fafafa] border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all">
              <span className="text-3xl font-black text-purple-600 mb-3 block">04</span>
              <h3 className="text-lg font-black text-gray-950 uppercase mb-2">Teasers & Formatos 9:16</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Entregamos el Master en 4K Cinema (16:9) para YouTube y cortes optimizados verticales para TikTok, Instagram Reels y campañas de Spotify Canvas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes y Paquetes de Producción */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-600 text-xs font-black uppercase tracking-widest">Inversión Transparente</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 uppercase mt-2">
            Planes de Producción Musical
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Opciones adaptadas tanto para lanzamientos de bandas emergentes como para superproducciones oficiales de sellos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1 */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between hover:border-purple-300 hover:shadow-lg transition-all">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Opción 1</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase mt-1 mb-3">Live Session / Acústico</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-6">
                Ideal para presentar tu talento vocal en vivo, sesiones de estudio íntimas o versiones acústicas de alta fidelidad.
              </p>
              <ul className="space-y-3 text-xs text-gray-700 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Filmación multicámara 4K en estudio o set</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Iluminación cálida de atmósfera</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Sincronización con master de audio</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Color grading cinematográfico</li>
              </ul>
            </div>
            <Button 
              onClick={() => window.open(getWhatsappUrl('Hola Black Box, quiero cotizar un Live Session / Acústico para mi proyecto musical.'), '_blank')}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-xl font-bold uppercase text-xs h-11 cursor-pointer"
            >
              Cotizar Live Session
            </Button>
          </div>

          {/* Plan 2: Recomendado */}
          <div className="p-8 rounded-3xl bg-purple-50/60 border-2 border-purple-500 relative flex flex-col justify-between shadow-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              El Más Solicitado
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-700">Opción 2</span>
              <h3 className="text-2xl font-black text-gray-950 uppercase mt-1 mb-3">Videoclip Oficial Pro</h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-6">
                La fórmula definitiva para tu single principal. Guion visual, estética cuidada y rodaje con óptica de cine.
              </p>
              <ul className="space-y-3 text-xs text-gray-800 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Guion y concepto visual</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" /> Jornada completa de rodaje</li>
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

      {/* Video Modal (Visor de Teatro) */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl shadow-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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
                aria-label="Cerrar visor"
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
                title={selectedVideo.title}
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

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex px-4 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold tracking-wide mb-3">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Producción de Videoclips en Lima
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Respuestas claras sobre costos, rodaje, equipamiento y plazos de entrega.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <span>¿Cuánto cuesta producir un videoclip musical profesional en Lima?</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed pl-7">
                El costo de producir un videoclip musical profesional en Lima depende del concepto creativo, la cantidad de locaciones, el tipo de cámaras ópticas utilizadas y la complejidad de la postproducción visual. En Black Box estructuramos proyectos a la medida tanto para artistas emergentes como para bandas consolidadas y sellos discográficos en Perú. Disponemos desde formatos ágiles como live sessions acústicas multicámara en set controlado, hasta superproducciones cinematográficas con esquemas de iluminación escénica, efectos de humo, bailarines, actores y color grading de cine en DaVinci Resolve. Elaboramos un presupuesto transparente y desglosado desde el inicio para que conozcas con exactitud cada aspecto técnico y artístico de tu inversión, garantizando un resultado visual impactante que cumpla con los estándares de calidad de cadenas de televisión musical y plataformas como YouTube y Vevo.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <span>¿Qué incluye el servicio de producción de videoclips de Black Box en Lima?</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed pl-7">
                Nuestro servicio de producción de videoclips en Lima brinda un acompañamiento integral de principio a fin para convertir tu canción en una experiencia cinematográfica memorable. En la etapa de preproducción colaboramos contigo para conceptualizar la historia, redactar el guion técnico, diseñar el storyboard, coordinar el styling y gestionar locaciones públicas o privadas en Lima. Durante la jornada de rodaje desplegamos cámaras de cine digital 4K con ópticas fijas y anamórficas de alta gama, iluminación profesional y monitoreo en set para cuidar cada encuadre. En la postproducción realizamos el montaje rítmico sincronizado al beat del máster musical, corrección de color profesional, efectos visuales y exportación en formato panorámico 16:9 para YouTube, además de teasers y adaptaciones verticales en 9:16 especialmente diseñadas para promocionar el lanzamiento en Reels y TikTok.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <span>¿En cuánto tiempo se entrega el videoclip final y cómo coordinamos el rodaje?</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed pl-7">
                El proceso completo de producción de un videoclip musical en Lima toma en promedio entre dos y cuatro semanas, distribuidas entre la preproducción, el día del rodaje y la postproducción digital. Una vez aprobado el guion y aseguradas las locaciones requeridas, ejecutamos la filmación en jornadas de uno o dos días según la magnitud del proyecto. El primer corte de edición se presenta al artista habitualmente entre siete y diez días hábiles tras el rodaje para revisar el ritmo narrativo y la sincronización labial. Tras incorporar tus comentarios y aplicar el color grading cinematográfico final, entregamos el master definitivo en máxima resolución 4K y Full HD, acompañado de cápsulas promocionales para redes sociales que facilitan una campaña de estreno exitosa en todas tus plataformas digitales.
              </p>
            </div>
          </div>
        </div>
      </section>

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
