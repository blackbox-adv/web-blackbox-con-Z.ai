'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { ArrowRight, Menu, X, Target, TrendingUp, Users, Zap, BarChart3, Megaphone, Globe, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Play, CheckCircle2, Star, Quote, Send, ArrowUpRight, Layers, Lightbulb, Award, Clock, ChevronRight, Facebook, Youtube, ExternalLink, Volume2, VolumeX, Video, Clapperboard } from 'lucide-react'

// Función para obtener el thumbnail del video
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

// Función para obtener el embed URL según la plataforma y formato (MUTEADO por defecto para permitir autoplay en móviles)
function getEmbedUrl(url: string, platform?: string, isMuted: boolean = true): string | null {
  try {
    if (!url) return null
    const urlObj = new URL(url)
    const muteParam = isMuted ? 'mute=1' : 'mute=0'
    const extraParams = `autoplay=1&${muteParam}&loop=1&controls=1&rel=0&playsinline=1&enablejsapi=1&modestbranding=1`
    
    // YouTube Shorts
    if (url.includes('/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?${extraParams}&playlist=${videoId}`
    }

    // Standard YouTube or youtu.be
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
      let videoId = urlObj.searchParams.get('v')
      if (!videoId && urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.slice(1)
      }
      if (!videoId && urlObj.pathname.includes('/embed/')) {
        videoId = urlObj.pathname.split('/embed/')[1]
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}?${extraParams}&playlist=${videoId}` : null
    }

    switch ((platform || '').toLowerCase()) {
      case 'vimeo': {
        const vimeoId = urlObj.pathname.split('/').filter(Boolean).pop()
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&${isMuted ? 'muted=1' : 'muted=0'}&playsinline=1&loop=1` : null
      }
      case 'drive.google.com': {
        const fileId = urlObj.pathname.split('/')[3]
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null
      }
      default:
        return url
    }
  } catch {
    return null
  }
}

interface SiteConfig {
  // Marca
  brandName: string
  brandLogo: string | null
  brandIcon: string | null
  primaryColor: string
  secondaryColor: string
  // SEO
  siteTitle: string
  siteDescription: string
  siteKeywords: string
  // Contacto
  phone: string
  email: string
  address: string
  whatsapp: string
  // Redes Sociales
  facebook: string | null
  instagram: string | null
  twitter: string | null
  linkedin: string | null
  tiktok: string | null
  youtube: string | null
  // Showreel vertical
  heroReelUrl?: string | null
  heroReelTitle?: string | null
  heroClients?: string | null
  heroProjects?: string | null
  heroYears?: string | null
  heroAwards?: string | null
  ogImage?: string | null
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  image: string | null
  rating: number
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string;
  driveUrl: string;
  order: number;
  result?: string | null;
  gradient?: string | null;
  videos?: any[];
}


interface Brand {
  id: string
  name: string
  logo: string | null
  color: string
  website: string | null
}

interface SiteData {
  config: SiteConfig | null
  testimonials: Testimonial[]
  projects: Project[]
  brands: Brand[]
}

const DEFAULT_PROJECTS: Project[] = [
  { 
    id: 'p1', 
    title: 'Clínica Avendaño', 
    description: 'Campañas de video vertical de alta especialidad para la clínica bariátrica líder en Lima.', 
    category: 'Salud & Bariátrica', 
    imageUrl: 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/Su_JcYkeyLw', 
    gradient: 'from-purple-500 to-blue-500', 
    result: '+280% Pacientes', 
    order: 1, 
    videos: [
      { id: 'v_p1', projectId: 'p1', title: 'Clínica Avendaño | Cirugía Bariátrica', platform: 'youtube', url: 'https://youtube.com/shorts/Su_JcYkeyLw', embedUrl: 'https://www.youtube.com/embed/Su_JcYkeyLw', thumbnail: 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p2', 
    title: 'Makita Perú', 
    description: 'Producción audiovisual y reels de impacto para herramientas profesionales e industriales.', 
    category: 'Herramientas & B2B', 
    imageUrl: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/BaKc_hx3NwM', 
    gradient: 'from-red-600 to-zinc-900', 
    result: 'Leads B2B Calificados', 
    order: 2, 
    videos: [
      { id: 'v_p2', projectId: 'p2', title: 'Makita Perú | Herramientas Profesionales', platform: 'youtube', url: 'https://youtube.com/shorts/BaKc_hx3NwM', embedUrl: 'https://www.youtube.com/embed/BaKc_hx3NwM', thumbnail: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p3', 
    title: 'Leomar Muebles', 
    description: 'Reels dinámicos de catálogo y fabricación para venta de muebles de diseño para el hogar y oficina.', 
    category: 'Muebles & Hogar', 
    imageUrl: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/gixZWO9xOes', 
    gradient: 'from-amber-500 to-orange-600', 
    result: '+320% Mensajes', 
    order: 3, 
    videos: [
      { id: 'v_p3', projectId: 'p3', title: 'Leomar | Venta de Muebles de Diseño', platform: 'youtube', url: 'https://youtube.com/shorts/gixZWO9xOes', embedUrl: 'https://www.youtube.com/embed/gixZWO9xOes', thumbnail: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p4', 
    title: 'LAP Custom', 
    description: 'Personalización de interiores, tapizado en cuero genuino y restauración de autos de alta gama.', 
    category: 'Automotriz & Cuero', 
    imageUrl: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/Poh1SGWA_Mg', 
    gradient: 'from-blue-600 to-indigo-800', 
    result: '100% Citas Llenas', 
    order: 4, 
    videos: [
      { id: 'v_p4', projectId: 'p4', title: 'LAP Custom | Tapizado en Cuero para Autos', platform: 'youtube', url: 'https://youtube.com/shorts/Poh1SGWA_Mg', embedUrl: 'https://www.youtube.com/embed/Poh1SGWA_Mg', thumbnail: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p5', 
    title: 'Burger & Eventos', 
    description: 'Contenido visual irresistible, food porn apetitoso y catering de hamburguesas gourmet para eventos.', 
    category: 'Gastronomía & Eventos', 
    imageUrl: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/gP1V8yfkt0k', 
    gradient: 'from-amber-500 to-red-600', 
    result: '+180% Reservas', 
    order: 5, 
    videos: [
      { id: 'v_p5', projectId: 'p5', title: 'Burger & Eventos | Hamburguesas Gourmet', platform: 'youtube', url: 'https://youtube.com/shorts/gP1V8yfkt0k', embedUrl: 'https://www.youtube.com/embed/gP1V8yfkt0k', thumbnail: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p6', 
    title: 'Shaking', 
    description: 'Videos con ritmo de edición rápido y estética nocturna para venta de artículos de bar y coctelería.', 
    category: 'Bar & Coctelería', 
    imageUrl: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/n6sieAKNPa4', 
    gradient: 'from-purple-600 to-pink-600', 
    result: 'Viral en TikTok', 
    order: 6, 
    videos: [
      { id: 'v_p6', projectId: 'p6', title: 'Shaking | Artículos para Bar & Coctelería', platform: 'youtube', url: 'https://youtube.com/shorts/n6sieAKNPa4', embedUrl: 'https://www.youtube.com/embed/n6sieAKNPa4', thumbnail: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p7', 
    title: 'Checor', 
    description: 'Video cinematográfico y recorridos de arquitectura para proyectos inmobiliarios y edificios.', 
    category: 'Inmobiliaria & Edificios', 
    imageUrl: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', 
    driveUrl: 'https://youtu.be/eGqahelD7yo', 
    gradient: 'from-emerald-500 to-teal-800', 
    result: '$2.8M Ventas', 
    order: 7, 
    videos: [
      { id: 'v_p7', projectId: 'p7', title: 'Checor | Desarrollo de Edificios & Inmuebles', platform: 'youtube', url: 'https://youtu.be/eGqahelD7yo', embedUrl: 'https://www.youtube.com/embed/eGqahelD7yo', thumbnail: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg' }
    ] 
  },
  { 
    id: 'p8', 
    title: 'Chalqui', 
    description: 'Campañas comerciales y spot publicitario dinámico para posicionamiento de marca.', 
    category: 'Comercial & Publicidad', 
    imageUrl: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/eDVSSoWJwWg', 
    gradient: 'from-purple-700 to-indigo-900', 
    result: '+500K Views', 
    order: 8, 
    videos: [
      { id: 'v_p8', projectId: 'p8', title: 'Chalqui | Campaña Audiovisual', platform: 'youtube', url: 'https://youtube.com/shorts/eDVSSoWJwWg', embedUrl: 'https://www.youtube.com/embed/eDVSSoWJwWg', thumbnail: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg' }
    ] 
  },
]

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null)
  const [cachedLogo, setCachedLogo] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>('email')
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; platform: string; title: string | null } | null>(null)
  const [isHeroAudioActive, setIsHeroAudioActive] = useState(false)

  useEffect(() => {
    // Instant synchronous hydration of cached logo and config to prevent ANY flash
    try {
      const savedLogo = localStorage.getItem('blackbox_cached_logo')
      if (savedLogo) setCachedLogo(savedLogo)

      const savedConfig = localStorage.getItem('blackbox_cached_config')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        setData(prev => prev ? prev : { config: parsed, testimonials: [], projects: [], brands: [] })
      }
    } catch {}

    fetch('/api/public/data')
      .then(r => r.json())
      .then((res) => {
        setData(res)
        if (res?.config?.brandLogo) {
          setCachedLogo(res.config.brandLogo)
          try {
            localStorage.setItem('blackbox_cached_logo', res.config.brandLogo)
            localStorage.setItem('blackbox_cached_config', JSON.stringify(res.config))
          } catch {}
        }
        if (res?.config?.brandIcon) {
          try {
            localStorage.setItem('blackbox_cached_icon', res.config.brandIcon)
          } catch {}
        }
      })
      .catch(console.error)

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const config = data?.config
  const displayLogo = config?.brandLogo || cachedLogo || '/logo.svg'

  // Sanitizar número de WhatsApp a solo dígitos sin espacios ni signos
  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'
  
  const getWhatsappUrl = (text = 'Hola, quiero iniciar un proyecto con Blackbox') => 
    `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(text)}`

  const whatsappUrl = getWhatsappUrl('Hola, quiero iniciar un proyecto con Blackbox')

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Casos de Éxito', href: '#portfolio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contacto', href: '#contacto' },
  ]

  const services = [
    { icon: Target, title: 'SEO & Posicionamiento', description: 'Aparece en los primeros resultados de Google y genera tráfico orgánico de calidad.', features: ['Auditoría SEO', 'Keyword Research', 'Link Building', 'SEO Técnico'], iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { icon: Megaphone, title: 'Publicidad Digital', description: 'Campañas en Google Ads, Meta Ads y TikTok con máximo ROI.', features: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Remarketing'], iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { icon: Layers, title: 'Social Media', description: 'Gestión profesional de redes que conecta con tu audiencia.', features: ['Contenido', 'Community', 'Analítica', 'Estrategia'], iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { icon: Globe, title: 'Diseño Web', description: 'Websites modernos y optimizados para conversión.', features: ['UI/UX Design', 'Desarrollo', 'Landing Pages', 'E-commerce'], iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: BarChart3, title: 'Analytics & Data', description: 'Decisiones basadas en datos que impulsan resultados.', features: ['GA4 Setup', 'Dashboards', 'KPIs', 'Reportes'], iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
    { icon: Lightbulb, title: 'Content Marketing', description: 'Contenido que atrae, educa y convierte.', features: ['Blog', 'Email Marketing', 'Video', 'Copywriting'], iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ]

  const defaultBrands: Brand[] = [
    { id: '1', name: 'Makita', color: 'bg-red-600', logo: '/brands/makita.svg', website: '#' },
    { id: '2', name: 'Clínica Avendaño', color: 'bg-purple-600', logo: '/brands/clinica-avendano.svg', website: '#' },
    { id: '3', name: 'Leomar Muebles', color: 'bg-amber-600', logo: '/brands/leomar.svg', website: '#' },
    { id: '4', name: 'LAP Custom', color: 'bg-blue-600', logo: '/brands/lap-custom.svg', website: '#' },
    { id: '5', name: 'Burger & Eventos', color: 'bg-red-500', logo: '/brands/burger-eventos.svg', website: '#' },
    { id: '6', name: 'Shaking Bar', color: 'bg-pink-600', logo: '/brands/shaking.svg', website: '#' },
    { id: '7', name: 'Checor Edificios', color: 'bg-emerald-600', logo: '/brands/checor.svg', website: '#' },
    { id: '8', name: 'Chalqui', color: 'bg-purple-500', logo: '/brands/chalqui.svg', website: '#' },
    { id: '9', name: 'El Importador Perú', color: 'bg-blue-600', logo: '/brands/el-importador-peru.svg', website: '#' },
    { id: '10', name: 'Momentum', color: 'bg-red-700', logo: '/brands/momentum.svg', website: '#' },
  ];


  const brands = data?.brands?.length > 0 ? data.brands : defaultBrands

  // Fallback garantizado a DEFAULT_PROJECTS para que Casos de Éxito siempre se visualice
  const projects = (data?.projects && data.projects.length > 0) ? data.projects : DEFAULT_PROJECTS

  const defaultTestimonials = [
    { 
      id: '1', 
      name: 'Dr. Luis Ramos', 
      role: 'Director Médico', 
      company: 'Clínica Avendaño (Lima)', 
      quote: 'La producción de reels y el enfoque médico especializado de Black Box nos ayudó a generar más de 280 consultas mensuales para nuestros programas de cirugía bariátrica. El contenido transmite total confianza.', 
      image: '/testimonials/doctor-luis-ramos.jpg', 
      rating: 5 
    },
    { 
      id: '2', 
      name: 'Marco Mendoza', 
      role: 'Gerente General', 
      company: 'Leomar Muebles (Perú)', 
      quote: 'El contenido audiovisual de nuestro catálogo multiplicó nuestros mensajes diarios de clientes cotizando salas y comedores por WhatsApp. Supieron plasmar la calidad de nuestros acabados a la perfección.', 
      image: '/testimonials/marco-mendoza.jpg', 
      rating: 5 
    },
    { 
      id: '3', 
      name: 'Ing. Jorge Quispe', 
      role: 'Jefe de Marketing B2B', 
      company: 'Distribución Makita Perú', 
      quote: 'Lograron que herramientas técnicas y de uso industrial capten la atención en formatos verticales dinámicos, conectando directamente con contratistas y talleres en todo el país.', 
      image: '/testimonials/jorge-quispe.jpg', 
      rating: 5 
    },
  ]

  const testimonials = data?.testimonials?.length > 0 ? data.testimonials : defaultTestimonials

  const getSocialIcon = (name: string) => {
    const icons: Record<string, React.ReactNode> = { facebook: <Facebook className="w-4 h-4" />, instagram: <Instagram className="w-4 h-4" />, twitter: <Twitter className="w-4 h-4" />, linkedin: <Linkedin className="w-4 h-4" />, youtube: <Youtube className="w-4 h-4" />, tiktok: <Play className="w-4 h-4" /> }
    return icons[name] || <Globe className="w-4 h-4" />
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation - Barra fija blanca con frosted glass para legibilidad impecable al scrolear */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22 lg:h-24">
            <a href="#inicio" className="flex items-center gap-3 group py-1.5">
              <img 
                src={displayLogo} 
                alt={config?.brandName || 'Black Box'} 
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
                style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
                onError={(e) => {
                  const target = e.currentTarget
                  if (target.src !== '/logo.svg') {
                    target.src = '/logo.svg'
                  }
                }}
              />
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-700 hover:text-black font-semibold transition-colors text-sm relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full rounded-full" />
                  </Link>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-gray-700 hover:text-black font-semibold transition-colors text-sm relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full rounded-full" />
                  </a>
                )
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                onClick={() => window.open(getWhatsappUrl('Hola Black Box, quiero empezar un proyecto para mi marca'), '_blank')} 
                className="bg-black text-white hover:bg-gray-800 gap-2 shadow-lg shadow-black/10 rounded-full px-6 font-semibold cursor-pointer transition-all hover:scale-105"
              >
                Empezar Proyecto
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isOpen && (
            <div className="lg:hidden bg-white border-t border-gray-100 pb-4 rounded-b-2xl shadow-xl">
              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-black hover:bg-gray-100 font-semibold transition-colors px-4 py-3 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)} 
                      className="text-gray-700 hover:text-black hover:bg-gray-100 font-semibold transition-colors px-4 py-3 rounded-lg"
                    >
                      {link.name}
                    </a>
                  )
                ))}
                <div className="px-4 pt-2">
                  <Button 
                    onClick={() => {
                      setIsOpen(false)
                      window.open(getWhatsappUrl('Hola Black Box, quiero empezar un proyecto para mi marca'), '_blank')
                    }} 
                    className="w-full bg-black text-white hover:bg-gray-800 gap-2 rounded-full cursor-pointer font-semibold py-6"
                  >
                    Empezar Proyecto por WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-16 bg-gradient-to-b from-gray-50/80 via-white to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-zinc-200/50 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
                <Badge className="px-3.5 py-1.5 text-xs bg-black text-white rounded-full font-bold shadow-md border-0">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  {config?.address || 'Lima, Perú'}
                </Badge>
                <Badge className="px-3.5 py-1.5 text-xs bg-purple-50 text-purple-900 rounded-full font-bold shadow-sm border border-purple-200/60">
                  <Video className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                  Agencia de Marketing & Productora
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-gray-950 uppercase">
                Elevamos tu marca con contenido <span className="underline decoration-black decoration-4 underline-offset-8">de alto impacto</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed">
                {config?.siteDescription || 'Estrategias de marketing digital y producción audiovisual que generan resultados reales y multiplican tus ventas.'}
              </p>

              {/* Main Actions */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start mb-10">
                <Button 
                  size="lg" 
                  onClick={() => window.open(whatsappUrl, '_blank')} 
                  className="bg-black text-white hover:bg-gray-800 gap-2 text-base px-8 py-6 rounded-full shadow-xl shadow-black/15 font-bold cursor-pointer transition-all hover:scale-105"
                >
                  Solicitar Consultoría Gratis
                  <ArrowRight className="w-5 h-5" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => setSelectedVideo({
                    title: config?.heroReelTitle || 'Showreel Black Box | Recopilatorio de Trabajos',
                    url: config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ',
                    platform: 'youtube'
                  })}
                  className="gap-2 text-base px-6 py-6 border-2 border-purple-600 text-purple-700 bg-purple-50/50 hover:bg-purple-100/80 rounded-full font-bold group cursor-pointer shadow-md shadow-purple-500/10"
                >
                  <Play className="w-4 h-4 text-purple-600 fill-purple-600 transition-transform group-hover:scale-110" />
                  Ver Showreel en Vertical
                </Button>

                <Link 
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-1.5 text-base px-5 py-3.5 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full font-semibold transition-colors"
                >
                  Portafolio
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/80 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">{config?.heroClients || '150+'}</p>
                  <p className="text-xs text-gray-500 font-medium">Marcas Clientes</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">{config?.heroProjects || '500+'}</p>
                  <p className="text-xs text-gray-500 font-medium">Videos Creados</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-purple-600 tracking-tight">10M+</p>
                  <p className="text-xs text-gray-500 font-medium">Views Orgánicas</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Smartphone 9:16 Vertical Reel Player */}
            <div className="lg:col-span-5 flex justify-center relative">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-rose-500/20 to-transparent blur-2xl rounded-full transform scale-90 -z-10" />

              {/* Smartphone Frame (9:16 ratio) */}
              <div className="relative w-[280px] sm:w-[320px] rounded-[2.5rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-zinc-700/60 ring-1 ring-white/20">
                {/* Speaker / Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
                  <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                </div>

                {/* Video Screen Container (9:16 aspect ratio) */}
                <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden bg-black shadow-inner">
                  {/* YouTube Embed Player */}
                  <iframe
                    key={isHeroAudioActive ? 'hero-audio-on' : 'hero-audio-off'}
                    src={getEmbedUrl(config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ', 'youtube', !isHeroAudioActive) || ''}
                    className="w-full h-full object-cover border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={config?.heroReelTitle || 'Showreel Vertical Black Box'}
                  />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-7 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                    <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      Muestra Destacada
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-extrabold text-white uppercase tracking-wider">
                      Vertical 9:16
                    </div>
                  </div>

                  {/* Bottom Action Strip on Phone */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-2">
                    <button
                      onClick={() => setIsHeroAudioActive(!isHeroAudioActive)}
                      className={`flex-1 py-2 px-3 backdrop-blur-md text-white text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-1.5 shadow-xl cursor-pointer ${
                        isHeroAudioActive 
                          ? 'bg-purple-600 hover:bg-purple-700 border-purple-400 text-white shadow-purple-600/40 animate-pulse' 
                          : 'bg-black/85 hover:bg-black border-white/20'
                      }`}
                      title={isHeroAudioActive ? 'Silenciar audio' : 'Subir volumen'}
                    >
                      {isHeroAudioActive ? (
                        <>
                          <Volume2 className="w-4 h-4 text-white" />
                          <span>Volumen Activo</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-purple-400" />
                          <span>Subir Volumen</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedVideo({
                        title: config?.heroReelTitle || 'Producción Destacada Black Box',
                        url: config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ',
                        platform: 'youtube'
                      })}
                      className="py-2 px-3 bg-zinc-800/90 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center shadow-xl cursor-pointer"
                      title="Pantalla Completa"
                    >
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                    </button>
                    <button
                      onClick={() => window.open(whatsappUrl, '_blank')}
                      className="py-2 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center shadow-xl cursor-pointer"
                      title="Cotizar por WhatsApp"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Floating Metrics Badge Left */}
                <div className="hidden sm:flex absolute -left-12 top-1/4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-zinc-200/80 items-center gap-3 animate-bounce [animation-duration:4s]">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">+500% ROI</p>
                    <p className="text-[10px] text-gray-500 font-medium">Formato Vertical</p>
                  </div>
                </div>

                {/* Floating Metrics Badge Right */}
                <div className="hidden sm:flex absolute -right-10 bottom-1/4 bg-[#0a0a0c]/95 text-white backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-zinc-800 items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">4K / 6K Cinema</p>
                    <p className="text-[10px] text-zinc-400 font-medium">Producción Pro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-center text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">
            Marcas y empresas líderes que confían en Black Box
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee items-center">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex items-center justify-center min-w-[200px] sm:min-w-[220px] mx-2 sm:mx-3">
                <div className="group flex items-center justify-center w-48 sm:w-52 h-20 bg-gray-50/80 hover:bg-white rounded-2xl border border-gray-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all duration-300 px-5 py-3 cursor-default">
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-10 sm:max-h-12 w-auto max-w-[170px] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" 
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 ${brand.color || 'bg-black'} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xs`}>
                        {brand.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-bold text-sm whitespace-nowrap">{brand.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 lg:py-32 relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-5 py-2 bg-purple-600 text-white rounded-full font-medium text-sm">Nuestros Servicios</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Soluciones digitales <span className="text-purple-600">integrales</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Todo lo que necesitas para dominar el mundo digital, con estrategias personalizadas para tu negocio en Lima, Perú.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Producción Audiovisual 4K',
                desc: 'Comerciales, videos corporativos y cine digital que transmiten prestigio.',
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                slug: 'produccion-audiovisual',
                tag: '4K / 6K'
              },
              {
                title: 'Reels y TikTok 9:16',
                desc: 'Videos verticales con ganchos psicológicos, subtítulos y ritmo dinámico.',
                iconBg: 'bg-pink-100',
                iconColor: 'text-pink-600',
                slug: 'reels-y-tiktok',
                tag: 'Formato 9:16'
              },
              {
                title: 'Publicidad & Meta Ads',
                desc: 'Embudos de pauta con alto retorno para generar consultas diarias por WhatsApp.',
                iconBg: 'bg-emerald-100',
                iconColor: 'text-emerald-600',
                slug: 'publicidad-digital-meta-ads',
                tag: 'Alto ROAS'
              },
              {
                title: 'Marketing para Clínicas',
                desc: 'Estrategias médicas éticas para especialistas y cirujanos en Lima.',
                iconBg: 'bg-cyan-100',
                iconColor: 'text-cyan-600',
                slug: 'marketing-para-clinicas-salud',
                tag: 'Sector Salud'
              }
            ].map((service, index) => (
              <Link 
                key={index} 
                href={`/servicios/${service.slug}`}
                className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-200/70 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      {service.tag}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">{service.desc}</p>
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-purple-600">
                  Ver detalles y tarifas <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black bg-white border border-gray-200 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-xs"
            >
              Explorar directorio completo de servicios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 lg:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 rounded-2xl bg-purple-50"><div className="text-4xl font-bold text-purple-600 mb-1">150+</div><div className="text-sm text-gray-600">Clientes Activos</div></div>
                    <div className="text-center p-6 rounded-2xl bg-orange-50"><div className="text-4xl font-bold text-orange-500 mb-1">24/7</div><div className="text-sm text-gray-600">Soporte</div></div>
                    <div className="text-center p-6 rounded-2xl bg-blue-50"><div className="text-4xl font-bold text-blue-600 mb-1">50+</div><div className="text-sm text-gray-600">Expertos</div></div>
                    <div className="text-center p-6 rounded-2xl bg-green-50"><div className="text-4xl font-bold text-green-600 mb-1">15+</div><div className="text-sm text-gray-600">Países</div></div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-bounce"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center"><Award className="w-5 h-5 text-white" /></div><div><div className="text-sm font-bold text-gray-900">Top Agency</div><div className="text-xs text-gray-500">2024</div></div></div></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 px-5 py-2 bg-orange-500 text-white rounded-full font-medium text-sm">Sobre Nosotros</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Somos tu socio<span className="text-purple-600"> estratégico</span></h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">En Blackbox creemos que cada marca tiene un potencial único. Nuestra misión es descubrirlo y potenciarlo a través de estrategias digitales innovadoras.</p>
              <p className="text-gray-600 mb-8 leading-relaxed">Con más de 8 años en el mercado, hemos ayudado a más de 150 empresas a alcanzar sus objetivos digitales. Nuestro equipo combina creatividad, datos y tecnología para resultados excepcionales.</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: Target, label: 'Enfoque en resultados', desc: 'Cada estrategia tiene un objetivo medible', color: 'text-purple-600', bg: 'bg-purple-100' }, { icon: Users, label: 'Equipo especializado', desc: 'Expertos en cada área digital', color: 'text-orange-600', bg: 'bg-orange-100' }, { icon: TrendingUp, label: 'Crecimiento sostenible', desc: 'Estrategias a largo plazo', color: 'text-blue-600', bg: 'bg-blue-100' }, { icon: Zap, label: 'Innovación constante', desc: 'Siempre un paso adelante', color: 'text-green-600', bg: 'bg-green-100' }].map((value, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className={`w-10 h-10 rounded-xl ${value.bg} flex items-center justify-center shrink-0`}><value.icon className={`w-5 h-5 ${value.color}`} /></div>
                    <div><span className="text-sm font-bold text-gray-900 block">{value.label}</span><span className="text-xs text-gray-500">{value.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Reels & Audiovisual Production Section */}
      <section className="py-20 lg:py-28 relative bg-[#0a0a0c] text-white overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Features & Value Prop */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-purple-400 mb-6">
                <Clapperboard className="w-3.5 h-3.5" />
                Especialistas en Formato Vertical (9:16)
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 tracking-tight uppercase leading-tight">
                Reels, TikToks y Shorts que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">detienen el scroll</span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
                El 80% del consumo de video en redes es en vertical. Producimos contenido audiovisual con ganchos psicológicos, iluminación cinematográfica y edición dinámica diseñada para maximizar retención y ventas.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 font-bold">
                    01
                  </div>
                  <h4 className="font-bold text-white mb-1 text-sm">Hooks de 3 Segundos</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Estructura de guion y planos iniciales diseñados para frenar el dedo del espectador al instante.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-3 font-bold">
                    02
                  </div>
                  <h4 className="font-bold text-white mb-1 text-sm">Color & Cine 4K</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Corrección de color y textura cinematográfica que eleva el valor percibido de tu marca.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 font-bold">
                    03
                  </div>
                  <h4 className="font-bold text-white mb-1 text-sm">Ritmo & Sound Design</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Edición precisa al compás del audio, efectos sonoros inmersivos y tendencias de voz.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 font-bold">
                    04
                  </div>
                  <h4 className="font-bold text-white mb-1 text-sm">Packs Mensuales</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Planes de 8, 12 o 16 videos al mes con rodajes optimizados para tu negocio.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => window.open(getWhatsappUrl('Hola, quiero cotizar un pack de Reels y Videos Verticales con Black Box'), '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full px-8 py-6 shadow-xl shadow-purple-600/30 gap-2 cursor-pointer transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  Cotizar Pack de Reels por WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setSelectedVideo({
                    title: config?.heroReelTitle || 'Showreel Black Box | Recopilatorio de Trabajos',
                    url: config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ',
                    platform: 'youtube'
                  })}
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-6 font-semibold gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
                  Reproducir Reel Recopilatorio
                </Button>
              </div>
            </div>

            {/* Right Col: Interactive Reel Showcase Card */}
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

                  {/* 9:16 Video Container */}
                  <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                    <iframe
                      src={getEmbedUrl(config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ', 'youtube') || ''}
                      className="w-full h-full object-cover border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Showreel Black Box"
                    />

                    {/* Bottom CTA on Reel */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                      <button
                        onClick={() => setSelectedVideo({
                          title: config?.heroReelTitle || 'Showreel Black Box | Recopilatorio',
                          url: config?.heroReelUrl || 'https://youtube.com/shorts/nzdbM36oEKQ',
                          platform: 'youtube'
                        })}
                        className="flex-1 py-2 px-3 bg-white text-black font-bold text-xs rounded-xl shadow-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        Ver en Grande
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-32 relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-5 py-2 bg-purple-600 text-white rounded-full font-bold text-xs uppercase tracking-wider">Portfolio & Casos Reales</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Casos de <span className="text-purple-600">éxito</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Resultados reales para marcas y negocios en diversos sectores comerciales.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 8).map((project: any) => (
              <div 
                key={project.id} 
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
                        platform: 'drive.google.com'
                      })
                    }
                  } else {
                    window.open(project.driveUrl || '#', '_blank')
                  }
                }}
                className="block group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={getVideoThumbnail(project)} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                    onError={(e) => {
                      const ytId = (project.driveUrl || '').split('/shorts/')[1] || (project.driveUrl || '').split('youtu.be/')[1]
                      if (ytId) {
                        (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${ytId.split('?')[0]}/hqdefault.jpg`
                      } else {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80'
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/20 transition-colors" />
                  
                  {/* Play Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-white/20 shadow-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <h3 className="text-lg font-bold mb-1 leading-snug drop-shadow-md text-white">{project.title}</h3>
                    {project.result && (
                      <p className="text-emerald-400 flex items-center gap-1.5 text-xs font-bold bg-emerald-950/80 px-2.5 py-1 rounded-md w-fit border border-emerald-500/40 backdrop-blur-sm shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {project.result}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-white flex items-center justify-between border-t border-gray-50">
                  <p className="text-xs text-gray-500 line-clamp-2 pr-2">{project.description || 'Ver caso de éxito completo'}</p>
                  <Button size="icon" className="shrink-0 rounded-full bg-black text-white hover:bg-purple-600 transition-colors w-8 h-8">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-10 py-5 font-bold text-lg group shadow-xl shadow-black/10 transition-all hover:scale-105"
            >
              Ver Galería Completa de Proyectos <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-5 py-2 bg-purple-600 text-white rounded-full font-medium text-sm">Testimonios</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">Lo que dicen nuestros <span className="text-purple-600">clientes</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Historias reales de éxito de empresas que confiaron en nosotros</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"><Quote className="w-5 h-5 text-white" /></div>
                <div className="flex gap-1 mb-6 pt-4">{Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-gray-700 mb-8 text-base leading-relaxed font-medium">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=9333ea&color=fff&size=128`}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-purple-100"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=9333ea&color=fff&size=128` }}
                  />
                  <div><div className="font-bold text-gray-900 text-lg">{testimonial.name}</div><div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-zinc-950" />
            <div className="relative z-10 py-16 lg:py-24 px-6 lg:px-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-white uppercase">¿Listo para llevar tu negocio<br />al siguiente nivel?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">Agenda una consultoría gratuita y descubre cómo podemos ayudarte a multiplicar tus ventas y visibilidad.</p>
              <div className="flex flex-col items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => window.open(getWhatsappUrl('Hola, quiero agendar una consultoría gratuita con Black Box'), '_blank')} 
                  className="bg-white text-black hover:bg-gray-100 gap-2 text-base px-10 py-7 rounded-full shadow-2xl font-bold cursor-pointer transition-all hover:scale-105"
                >
                  Agendar Consultoría Gratis
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Respuesta inmediata por WhatsApp • Sin costo ni compromiso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 lg:py-32 relative bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <Badge className="mb-4 px-5 py-2 bg-purple-600 text-white rounded-full font-bold text-xs uppercase tracking-wider">Contacto Directo</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 uppercase">Hablemos de tu<span className="text-purple-600"> próximo proyecto</span></h2>
              <p className="text-gray-600 mb-10 text-lg">Estamos listos para escucharte. Cuéntanos sobre tu negocio y te responderemos en menos de 2 horas.</p>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: 'WhatsApp / Teléfono', value: config?.phone || '+51 958 297 236', href: getWhatsappUrl('Hola, quiero información sobre los servicios de Black Box'), bg: 'bg-emerald-100', color: 'text-emerald-600' },
                  { icon: Mail, label: 'Email Directo', value: config?.email || 'contacto@blackboxperu.com', href: `mailto:${config?.email || 'contacto@blackboxperu.com'}`, bg: 'bg-purple-100', color: 'text-purple-600' },
                  { icon: MapPin, label: 'Oficina', value: config?.address || 'Lima, Perú', href: '#', bg: 'bg-blue-100', color: 'text-blue-600' }
                ].map((item, index) => (
                  <a key={index} href={item.href} target={item.icon === Phone ? '_blank' : undefined} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-pointer hover:border-purple-200">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}><item.icon className={`w-5 h-5 ${item.color}`} /></div>
                    <div><div className="text-sm text-gray-500 font-medium">{item.label}</div><div className="text-gray-900 font-bold">{item.value}</div></div>
                  </a>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                {['instagram', 'linkedin', 'twitter', 'facebook', 'youtube'].map((social) => {
                  const url = config?.[social as keyof SiteConfig] as string | null
                  if (!url) return null
                  return (
                    <a key={social} href={url} target="_blank" rel="noopener" className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:bg-black transition-colors">
                      {getSocialIcon(social)}
                    </a>
                  )
                })}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h3>
              <p className="text-sm text-gray-500 mb-6">Elige cómo prefieres comunicarte con nuestro equipo comercial.</p>
              
              {/* Selector de método de envío */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => setSendMethod('email')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    sendMethod === 'email'
                      ? 'bg-white text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Por Correo
                </button>
                <button
                  type="button"
                  onClick={() => setSendMethod('whatsapp')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    sendMethod === 'whatsapp'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Por WhatsApp
                </button>
              </div>

              {formStatus === 'sent' ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">¡Mensaje preparado con éxito!</h4>
                  <p className="text-sm text-gray-600">
                    Se ha abierto tu cliente de correo para enviar a <strong className="text-gray-900">{config?.email || 'contacto@blackboxperu.com'}</strong>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormStatus('idle')
                      setFormData({ name: '', email: '', company: '', message: '' })
                    }}
                    className="mt-2 text-xs"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form 
                  className="space-y-5" 
                  onSubmit={async (e) => { 
                    e.preventDefault(); 
                    if (sendMethod === 'whatsapp') {
                      const msg = `Hola Black Box, soy ${formData.name || 'un cliente'}${formData.company ? ' de ' + formData.company : ''}. ${formData.message ? 'Mensaje: ' + formData.message : ''}${formData.email ? ' (Mi email: ' + formData.email + ')' : ''}`;
                      window.open(getWhatsappUrl(msg), '_blank');
                    } else {
                      setFormStatus('sending');
                      try {
                        const res = await fetch('/api/public/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(formData)
                        });
                        const resData = await res.json();
                        if (resData.mailtoUrl) {
                          window.location.href = resData.mailtoUrl;
                          setFormStatus('sent');
                        } else {
                          setFormStatus('sent');
                        }
                      } catch {
                        const recipient = config?.email || 'contacto@blackboxperu.com';
                        const subject = encodeURIComponent(`Nuevo Mensaje Web: ${formData.name}`);
                        const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nEmpresa: ${formData.company}\n\nMensaje:\n${formData.message}`);
                        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
                        setFormStatus('sent');
                      }
                    }
                  }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Nombre *</label>
                      <Input 
                        required 
                        placeholder="Tu nombre" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="bg-gray-50 border-gray-200 rounded-xl text-gray-900" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">{sendMethod === 'email' ? 'Email *' : 'Email'}</label>
                      <Input 
                        type="email" 
                        required={sendMethod === 'email'}
                        placeholder="tu@email.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="bg-gray-50 border-gray-200 rounded-xl text-gray-900" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Empresa / Marca</label>
                    <Input 
                      placeholder="Nombre de tu empresa (opcional)" 
                      value={formData.company} 
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                      className="bg-gray-50 border-gray-200 rounded-xl text-gray-900" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Mensaje *</label>
                    <Textarea 
                      required 
                      placeholder="Cuéntanos qué necesitas (Producción de Reels, Campañas de Marketing, Diseño Web...)" 
                      rows={4} 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      className="bg-gray-50 border-gray-200 rounded-xl resize-none text-gray-900" 
                    />
                  </div>
                  
                  {sendMethod === 'email' ? (
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 py-6 rounded-xl shadow-lg font-bold text-base cursor-pointer transition-all"
                    >
                      Enviar por Correo a contacto@blackboxperu.com
                      <Send className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 py-6 rounded-xl shadow-lg font-bold text-base cursor-pointer transition-all"
                    >
                      Enviar mensaje directo por WhatsApp
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <a href="#inicio" className="flex items-center gap-3 mb-4 group inline-block">
                <img 
                  src={displayLogo} 
                  alt={config?.brandName || 'Black Box'} 
                  className="h-14 sm:h-16 w-auto object-contain max-w-[320px]" 
                  style={{ maxHeight: '68px', maxWidth: '320px', width: 'auto' }}
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src !== '/logo.svg') {
                      target.src = '/logo.svg'
                    }
                  }}
                />
              </a>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Elevamos marcas a través de estrategias de marketing digital y producción audiovisual de alto impacto.
              </p>
              <div className="flex gap-2">
                {['instagram', 'linkedin', 'twitter', 'facebook', 'youtube', 'tiktok'].map((social) => {
                  const url = config?.[social as keyof SiteConfig] as string | null
                  if (!url) return null
                  return (
                    <a key={social} href={url} target="_blank" rel="noopener" className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-black transition-colors">
                      {getSocialIcon(social)}
                    </a>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Servicios</h4>
              <ul className="space-y-3">
                <li><Link href="/servicios/produccion-audiovisual" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Producción Audiovisual 4K</Link></li>
                <li><Link href="/servicios/reels-y-tiktok" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Reels y TikTok 9:16</Link></li>
                <li><Link href="/servicios/publicidad-digital-meta-ads" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Publicidad & Meta Ads</Link></li>
                <li><Link href="/servicios/marketing-para-clinicas-salud" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Marketing Médico y Clínicas</Link></li>
                <li><Link href="/servicios" className="text-purple-600 hover:text-purple-800 text-xs font-bold transition-colors">Ver todos los servicios →</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Empresa</h4>
              <ul className="space-y-3">
                <li><a href="#nosotros" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Sobre Nosotros</a></li>
                <li><Link href="/portfolio" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Portfolio de Proyectos</Link></li>
                <li><a href="#contacto" className="text-gray-600 hover:text-gray-950 text-sm transition-colors font-medium">Contacto</a></li>
                <li><Link href="/admin" className="text-zinc-400 hover:text-zinc-700 text-xs transition-colors">Panel Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Contacto Directo</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-black shrink-0" />
                  <span>{config?.address || 'Lima, Perú'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-black shrink-0" />
                  <span>{config?.phone || '+51 958 297 236'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-black shrink-0" />
                  <a href={`mailto:${config?.email || 'contacto@blackboxperu.com'}`} className="hover:text-purple-600 transition-colors">
                    {config?.email || 'contacto@blackboxperu.com'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Black Box Agency. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Disponibles para nuevos proyectos
            </div>
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

      {/* Video Modal with 9:16 Vertical & 16:9 Support */}
      {selectedVideo && (() => {
        const isVertical = selectedVideo.url.includes('/shorts/') || 
                           selectedVideo.platform.toLowerCase() === 'tiktok' || 
                           selectedVideo.platform.toLowerCase() === 'instagram' ||
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
                      {isVertical ? 'Formato Vertical (9:16)' : selectedVideo.platform}
                      {isVertical && <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold">REEL</span>}
                    </p>
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
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Video Container */}
              <div className={`${isVertical ? 'aspect-[9/16]' : 'aspect-video'} bg-black flex items-center justify-center relative`}>
                {['youtube', 'vimeo', 'drive.google.com'].includes(selectedVideo.platform.toLowerCase()) && (
                  <iframe
                    src={getEmbedUrl(selectedVideo.url, selectedVideo.platform, false) || ''}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
                {selectedVideo.platform.toLowerCase() === 'tiktok' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                    <Play className="w-16 h-16 text-purple-500 mb-4" />
                    <p className="text-lg font-bold mb-2">Video de TikTok</p>
                    <p className="text-gray-400 text-sm mb-6">Reproducir directamente en la aplicación para máxima resolución</p>
                    <a 
                      href={selectedVideo.url} 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-bold text-sm transition-colors shadow-lg shadow-purple-600/30"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver en TikTok
                    </a>
                  </div>
                )}
                {selectedVideo.platform.toLowerCase() === 'instagram' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                    <Instagram className="w-16 h-16 text-pink-500 mb-4" />
                    <p className="text-lg font-bold mb-2">Instagram Reel</p>
                    <p className="text-gray-400 text-sm mb-6">Reproducir en Instagram para disfrutar de audio original e interactuar</p>
                    <a 
                      href={selectedVideo.url} 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full text-white font-bold text-sm transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver en Instagram
                    </a>
                  </div>
                )}
                {selectedVideo.platform.toLowerCase() === 'facebook' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                    <Facebook className="w-16 h-16 text-blue-500 mb-4" />
                    <p className="text-lg font-bold mb-2">Video de Facebook</p>
                    <p className="text-gray-400 text-sm mb-6">Los videos de Facebook se reproducen en su plataforma</p>
                    <a 
                      href={selectedVideo.url} 
                      target="_blank" 
                      rel="noopener"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver en Facebook
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action */}
              <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 truncate">
                  ¿Te gustaría una producción como esta?
                </span>
                <button
                  onClick={() => window.open(`https://wa.me/${config?.whatsapp || '51958297236'}?text=Hola%2C%20vi%20el%20video%20"${encodeURIComponent(selectedVideo.title || 'Muestra de Video')}"%20y%20quiero%20cotizar%20un%20proyecto%20similar.`, '_blank')}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Cotizar en WhatsApp
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </main>
  )
}
