'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ArrowLeft, Play, X, ExternalLink, Video, TrendingUp, Sparkles, Send
} from 'lucide-react'

// Reuse the embed URL function
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

  // Mapeo inteligente por nombre o categoría de cliente si viene de un registro legado
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
    const urlObj = new URL(url)
    const autoplayParam = isAutoplay ? 'autoplay=1' : 'autoplay=0'
    
    // YouTube Shorts
    if (url.includes('/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1`
    }

    // Standard YouTube or youtu.be
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
      let videoId = urlObj.searchParams.get('v')
      if (!videoId && urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1)
      if (!videoId && urlObj.pathname.includes('/embed/')) videoId = urlObj.pathname.split('/embed/')[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}?${autoplayParam}&controls=1&rel=0&playsinline=1&modestbranding=1` : null
    }

    switch (platform.toLowerCase()) {
      case 'vimeo': {
        const vimeoId = urlObj.pathname.split('/').filter(Boolean).pop()
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}?${autoplayParam}` : null
      }
      case 'drive.google.com': {
        const fileId = urlObj.pathname.split('/')[3]
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null
      }
      default: return url
    }
  } catch { return null }
}

const DEFAULT_PROJECTS = [
  { 
    id: 'p1', 
    title: 'Clínica Avendaño', 
    category: 'Salud & Bariátrica', 
    format: 'Video Vertical 9:16',
    description: 'Estrategia integral de videos educativos y testimoniales para la clínica bariátrica líder de Lima, posicionando al especialista y derribando mitos sobre la cirugía.', 
    imageUrl: 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/Su_JcYkeyLw', 
    result: '+280 Citas / Mes', 
    impact: 'Multiplicó la agenda de evaluación quirúrgica con pacientes 100% calificados.',
    tags: ['Guion Médico', 'Grabación en Clínica', 'Subtítulos Dinámicos', 'Publicidad en Salud'],
    order: 1,
    videos: [
      { id: 'v_p1', title: 'Clínica Avendaño | Cirugía Bariátrica & Salud', platform: 'youtube', url: 'https://youtube.com/shorts/Su_JcYkeyLw', embedUrl: 'https://www.youtube.com/embed/Su_JcYkeyLw' }
    ]
  },
  { 
    id: 'p2', 
    title: 'Makita Perú', 
    category: 'Herramientas & Industria', 
    format: 'Video Vertical 9:16',
    description: 'Producción de alta energía demostrando el poder y precisión de herramientas inalámbricas e industriales para contratistas y distribuidores a nivel nacional.', 
    imageUrl: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/BaKc_hx3NwM', 
    result: 'Contactos Comerciales Calificados', 
    impact: 'Generó consultas continuas de distribuidores y talleres en todo el Perú.',
    tags: ['Demostración Técnica', 'Sonido Directo', 'Edición Dinámica', 'Pauta Publicitaria'],
    order: 2,
    videos: [
      { id: 'v_p2', title: 'Makita Perú | Herramientas Profesionales 40V Max', platform: 'youtube', url: 'https://youtube.com/shorts/BaKc_hx3NwM', embedUrl: 'https://www.youtube.com/embed/BaKc_hx3NwM' }
    ]
  },
  { 
    id: 'p3', 
    title: 'Leomar Muebles', 
    category: 'Muebles & Hogar', 
    format: 'Catálogo en Video 9:16',
    description: 'Videos dinámicos resaltando texturas, acabados en madera maciza y tapicería premium para venta directa por WhatsApp de juegos de sala y comedor.', 
    imageUrl: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/gixZWO9xOes', 
    result: '+320% Mensajes por WhatsApp', 
    impact: 'Aceleró el cierre de ventas directas desde anuncios en redes sociales.',
    tags: ['Grabación en Tienda', 'Narrativa Comercial', 'Llamada a la Acción', 'Catálogo'],
    order: 3,
    videos: [
      { id: 'v_p3', title: 'Leomar | Muebles de Diseño para el Hogar', platform: 'youtube', url: 'https://youtube.com/shorts/gixZWO9xOes', embedUrl: 'https://www.youtube.com/embed/gixZWO9xOes' }
    ]
  },
  { 
    id: 'p4', 
    title: 'LAP Custom Tapizados', 
    category: 'Automotriz & Cuero', 
    format: 'Transformación en Video 9:16',
    description: 'Documentación del proceso artesanal de retapizado en cuero genuino y personalización de interiores para vehículos de alta gama y camionetas.', 
    imageUrl: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/Poh1SGWA_Mg', 
    result: '100% Citas de Taller Llenas', 
    impact: 'Posicionó al taller como el referente número uno de personalización en Lima.',
    tags: ['Tomas en 4K', 'Tomas Macro', 'Proceso Artesanal', 'Sonido de Detalle'],
    order: 4,
    videos: [
      { id: 'v_p4', title: 'LAP Custom | Tapizado en Cuero de Alta Gama', platform: 'youtube', url: 'https://youtube.com/shorts/Poh1SGWA_Mg', embedUrl: 'https://www.youtube.com/embed/Poh1SGWA_Mg' }
    ]
  },
  { 
    id: 'p5', 
    title: 'Burger & Eventos', 
    category: 'Gastronomía & Restaurantes', 
    format: 'Gastronomía Visual 9:16',
    description: 'Contenido visual altamente apetitoso con planos cerrados de queso derretido, cortes smash y jugosidad para servicio de catering y activaciones.', 
    imageUrl: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/gP1V8yfkt0k', 
    result: '+180% Reservas para Eventos', 
    impact: 'Aumento récord en contrataciones para celebraciones y eventos corporativos.',
    tags: ['Iluminación Gastronómica', 'Cámara Lenta', 'Color Vibrante', 'Edición Dinámica'],
    order: 5,
    videos: [
      { id: 'v_p5', title: 'Burger & Eventos | Catering Gourmet & Smash Burgers', platform: 'youtube', url: 'https://youtube.com/shorts/gP1V8yfkt0k', embedUrl: 'https://www.youtube.com/embed/gP1V8yfkt0k' }
    ]
  },
  { 
    id: 'p6', 
    title: 'Shaking Bar', 
    category: 'Bar & Coctelería', 
    format: 'Estilo de Vida y Coctelería 9:16',
    description: 'Videos con estética de coctelería moderna y ritmo nocturno para impulsar la venta de sets de bar, cocteleras y accesorios de mixología.', 
    imageUrl: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/n6sieAKNPa4', 
    result: 'Alta Difusión (+450K)', 
    impact: 'Agotó stock de kits de coctelería profesional en su tienda virtual.',
    tags: ['Coctelería', 'Música en Tendencia', 'Comercio Electrónico', 'Ritmo Rápido'],
    order: 6,
    videos: [
      { id: 'v_p6', title: 'Shaking | Artículos & Cristalería para Bar', platform: 'youtube', url: 'https://youtube.com/shorts/n6sieAKNPa4', embedUrl: 'https://www.youtube.com/embed/n6sieAKNPa4' }
    ]
  },
  { 
    id: 'p7', 
    title: 'Checor Inmobiliaria', 
    category: 'Inmobiliaria & Edificios', 
    format: 'Video Cinematográfico 16:9',
    description: 'Recorrido audiovisual de departamentos piloto y arquitectura moderna en Lima, destacando iluminación natural, acabados y ubicación estratégica.', 
    imageUrl: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', 
    driveUrl: 'https://youtu.be/eGqahelD7yo', 
    result: '$2.8M en Departamentos Vendidos', 
    impact: 'Logró la venta de más del 70% de unidades en etapa de preventa.',
    tags: ['Tomas con Drone', 'Estabilización Gimbal', 'Música Orquestal', 'Colorimetría'],
    order: 7,
    videos: [
      { id: 'v_p7', title: 'Checor | Desarrollo Inmobiliario & Departamentos', platform: 'youtube', url: 'https://youtu.be/eGqahelD7yo', embedUrl: 'https://www.youtube.com/embed/eGqahelD7yo' }
    ]
  },
  { 
    id: 'p8', 
    title: 'Chalqui', 
    category: 'Comercial & Publicidad', 
    format: 'Spot Publicitario 9:16',
    description: 'Campaña publicitaria de alto impacto visual con mensaje de posicionamiento para conectar con audiencias jóvenes en redes sociales.', 
    imageUrl: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/eDVSSoWJwWg', 
    result: '+500K Reproducciones', 
    impact: 'Gran recordación de marca y comentarios positivos en toda la campaña.',
    tags: ['Casting', 'Dirección de Actores', 'Voz en Off', 'Efectos Visuales'],
    order: 8,
    videos: [
      { id: 'v_p8', title: 'Chalqui | Spot Comercial de Marca', platform: 'youtube', url: 'https://youtube.com/shorts/eDVSSoWJwWg', embedUrl: 'https://www.youtube.com/embed/eDVSSoWJwWg' }
    ]
  },
]

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null)
  const [cachedLogo, setCachedLogo] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const directLogo = localStorage.getItem('blackbox_cached_logo')
        if (directLogo) return directLogo
        const saved = localStorage.getItem('blackbox_site_data')
        if (saved) {
          const parsed = JSON.parse(saved)
          return parsed?.config?.brandLogo || null
        }
      } catch (e) {
        // ignore
      }
    }
    return null
  })
  const [activeCategory, setActiveCategory] = useState('todos')
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  useEffect(() => {
    // Check cached data immediately
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('blackbox_site_data')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.projects && parsed.projects.length > 0) {
            setData(parsed)
            if (parsed.config?.brandLogo) {
              setCachedLogo(parsed.config.brandLogo)
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // Fetch live public data
    fetch('/api/public/data')
      .then(r => r.json())
      .then(res => {
        if (res && res.projects && res.projects.length > 0) {
          setData(res)
          if (res.config?.brandLogo) {
            setCachedLogo(res.config.brandLogo)
            try {
              localStorage.setItem('blackbox_cached_logo', res.config.brandLogo)
            } catch (e) {}
          }
          if (res.config?.brandIcon) {
            try {
              localStorage.setItem('blackbox_cached_icon', res.config.brandIcon)
            } catch (e) {}
          }
        }
      })
      .catch((err) => {
        console.warn('Using local cache for portfolio:', err)
      })
  }, [])

  const allProjects = (data?.projects && data.projects.length > 0) ? data.projects : DEFAULT_PROJECTS

  const categories = ['todos', ...Array.from(new Set(allProjects.map((p: any) => p.category)))]

  const filteredProjects = activeCategory === 'todos'
    ? allProjects
    : allProjects.filter((p: any) => p.category === activeCategory)

  const config = data?.config
  const displayLogo = config?.brandLogo || cachedLogo || '/logo-white.svg'
  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent('Hola Black Box, estuve revisando su portafolio de proyectos y me gustaría cotizar una producción para mi marca.')}`

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-purple-500/30">
      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src={displayLogo} 
              alt={config?.brandName || 'Black Box'} 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
              onError={(e) => {
                const target = e.currentTarget
                if (target.src !== '/logo-white.svg') {
                  target.src = '/logo-white.svg'
                }
              }}
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white hover:bg-white/10 rounded-full px-4 py-2 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
            </Link>
            <Button
              onClick={() => window.open(whatsappUrl, '_blank')}
              className="hidden sm:inline-flex bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-xs font-bold gap-1.5 shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Cotizar Proyecto
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 lg:pt-32 pb-8 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="inline-flex mb-6 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <Badge variant="outline" className="text-purple-400 border-0 p-0 font-bold uppercase tracking-widest text-[10px]">Galería de Trabajos & Casos Reales</Badge>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic">
          Contenido de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-white/70">Alto Impacto</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-base lg:text-lg leading-relaxed font-medium mb-8">
          Explora nuestras producciones audiovisuales en formato vertical 9:16 y spots publicitarios. Cada pieza está creada con guion persuasivo, calidad cinematográfica y enfoque en ventas.
        </p>
      </header>

      {/* Filters */}
      <div className="sticky top-12 lg:top-16 z-40 bg-[#0a0a0c]/90 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar py-4 lg:py-6">
          <div className="flex gap-2 min-w-max lg:justify-center px-4">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-none rounded-full px-5 py-2.5 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-white/5 text-white/50 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {filteredProjects.map((project: any) => (
            <div 
              key={project.id} 
              className="group relative bg-[#111113] rounded-[2rem] overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 shadow-2xl flex flex-col h-full"
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
                className="aspect-video relative overflow-hidden flex items-center justify-center bg-zinc-900 cursor-pointer"
              >
                <div className="w-full h-full relative group/thumb">
                  <img 
                    src={getVideoThumbnail(project)} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                    onError={(e) => {
                      const ytId = (project.driveUrl || '').split('/shorts/')[1] || (project.driveUrl || '').split('youtu.be/')[1]
                      if (ytId) {
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${ytId.split('?')[0]}/hqdefault.jpg`
                      } else {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80'
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:via-black/10 transition-colors flex items-center justify-center">
                    <div className="w-14 lg:w-16 h-14 lg:h-16 rounded-full bg-purple-600/90 backdrop-blur-xl border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
                
                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                  <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/15 text-white shadow-md">
                    {project.category}
                  </span>
                  <span className="bg-purple-600/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-purple-100 border border-purple-400/30 shadow-md">
                    {project.format || '9:16 Vertical'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {project.result || 'Caso de Éxito'}
                </div>
                
                <h3 className="text-xl lg:text-2xl font-black mb-3 group-hover:text-purple-400 transition-colors leading-tight italic uppercase">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-normal">
                  {project.description || 'Estrategia y producción audiovisual de alto impacto desarrollada para este cliente.'}
                </p>

                {/* Impact Note */}
                {project.impact && (
                  <div className="mb-4 text-xs text-purple-300/90 bg-purple-950/40 border border-purple-800/40 rounded-xl p-3 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong className="text-purple-200">Impacto:</strong> {project.impact}</span>
                  </div>
                )}

                {/* Tags / Deliverables */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="text-[11px] font-medium bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded-lg border border-zinc-700/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Actions */}
                <div className="mt-auto space-y-2 pt-2 border-t border-zinc-800/60">
                  {(project.videos && project.videos.length > 0) || project.driveUrl ? (
                    <Button 
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
                      className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl font-black uppercase tracking-widest h-12 cursor-pointer text-xs flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-black" />
                      {project.driveUrl && project.driveUrl.includes('/folders/') ? 'Ver Carpeta de Proyectos' : 'Reproducir Muestra'}
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      disabled
                      className="w-full border-white/10 text-white/30 rounded-xl font-black uppercase tracking-widest h-12 text-xs"
                    >
                      Sin Video Disponible
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => {
                      const msg = `Hola Black Box, vi el caso de ${project.title} en su portafolio y quisiera cotizar una producción audiovisual similar para mi marca.`
                      window.open(`https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
                    }}
                    className="w-full text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl text-xs font-semibold h-9 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3 h-3" /> Cotizar video similar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-32 opacity-20">
            <Sparkles className="w-20 h-20 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">Próximamente</h3>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (() => {
        const isVertical = selectedVideo.url?.includes('/shorts/') || 
                           selectedVideo.platform?.toLowerCase() === 'tiktok' || 
                           selectedVideo.platform?.toLowerCase() === 'instagram' ||
                           (selectedVideo.title && selectedVideo.title.toLowerCase().includes('reel')) ||
                           (selectedVideo.title && selectedVideo.title.toLowerCase().includes('vertical'))

        return (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className={`relative w-full ${isVertical ? 'max-w-md' : 'max-w-5xl'} shadow-[0_0_100px_rgba(168,85,247,0.15)] bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header / Info */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight text-white line-clamp-1">{selectedVideo.title || 'Muestra de Video'}</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{isVertical ? 'Formato Vertical (9:16)' : selectedVideo.platform}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a 
                    href={selectedVideo.url} 
                    target="_blank" 
                    rel="noopener"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir original
                  </a>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Modal Player */}
              <div className={`${isVertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black flex items-center justify-center relative shadow-2xl overflow-hidden`}>
                {['youtube', 'vimeo', 'drive.google.com'].includes(selectedVideo.platform.toLowerCase()) ? (
                  <iframe
                    src={getEmbedUrl(selectedVideo.url, selectedVideo.platform, true) || ''}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center p-8 lg:p-16 bg-gradient-to-br from-[#111] to-black w-full h-full flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mb-6 border border-purple-500/20">
                      <Video className="w-8 h-8 text-purple-500" />
                    </div>
                    <h4 className="text-2xl lg:text-3xl font-black mb-4 uppercase italic">Reproductor Externo</h4>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">Para ver este contenido en máxima calidad, abre el enlace oficial de {selectedVideo.platform}.</p>
                    <Button 
                      size="lg"
                      className="bg-white text-black hover:bg-white/80 rounded-full px-8 py-6 text-sm font-black uppercase tracking-widest shadow-2xl transition-transform hover:scale-105"
                      onClick={() => window.open(selectedVideo.url, '_blank')}
                    >
                      Ver en {selectedVideo.platform} <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Bottom Quick Bar */}
              <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 truncate">
                  ¿Quieres un video con esta calidad para tu marca?
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
      <section className="py-24 lg:py-32 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-full h-[300px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto text-center border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-12 lg:p-24 rounded-[3rem]">
          <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-none tracking-tighter uppercase italic">
            ¿Listo para potenciar tu <span className="text-purple-500">marca</span>?
          </h2>
          <p className="text-gray-400 mb-10 text-lg lg:text-xl font-medium">Escríbenos y conversemos sobre la estrategia visual para tus próximos videos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
                size="lg" 
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-8 text-base font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
                Contactar por WhatsApp <Send className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center px-4">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Black Box Agency • Lima, Perú • Todos los derechos reservados
        </p>
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
