'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, TrendingUp, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProjectItem {
  id: string
  title: string
  description?: string
  category: string
  imageUrl?: string
  driveUrl?: string
  result?: string
  videos?: Array<{
    id: string
    title: string
    platform: string
    url: string
  }>
}

interface HomePortfolioProps {
  projects?: ProjectItem[]
  onOpenVideo?: (video: { url: string; platform: string; title: string }) => void
}

const defaultProjects: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Clínica Avendaño',
    description: 'Campañas de video vertical de alta especialidad para la clínica bariátrica líder en Lima.',
    category: 'Salud & Bariátrica',
    imageUrl: '/portfolio/clinicas.webp',
    driveUrl: 'https://youtube.com/shorts/Su_JcYkeyLw',
    result: '+280% Pacientes',
    videos: [{ id: 'v1', title: 'Clínica Avendaño', platform: 'youtube', url: 'https://youtube.com/shorts/Su_JcYkeyLw' }],
  },
  {
    id: 'p2',
    title: 'Makita Perú',
    description: 'Producción audiovisual y reels de impacto para herramientas profesionales e industriales.',
    category: 'Herramientas & B2B',
    imageUrl: '/portfolio/industrial.webp',
    driveUrl: 'https://youtube.com/shorts/BaKc_hx3NwM',
    result: 'Leads B2B Calificados',
    videos: [{ id: 'v2', title: 'Makita Perú', platform: 'youtube', url: 'https://youtube.com/shorts/BaKc_hx3NwM' }],
  },
  {
    id: 'p3',
    title: 'Leomar Muebles',
    description: 'Reels dinámicos de catálogo y fabricación para venta de muebles de diseño para el hogar y oficina.',
    category: 'Muebles & Hogar',
    imageUrl: '/portfolio/retail.webp',
    driveUrl: 'https://youtube.com/shorts/gixZWO9xOes',
    result: '+320% Mensajes',
    videos: [{ id: 'v3', title: 'Leomar Muebles', platform: 'youtube', url: 'https://youtube.com/shorts/gixZWO9xOes' }],
  },
  {
    id: 'p4',
    title: 'LAP Custom',
    description: 'Personalización de interiores, tapizado en cuero genuino y restauración de autos de alta gama.',
    category: 'Automotriz & Cuero',
    imageUrl: '/portfolio/autos.webp',
    driveUrl: 'https://youtube.com/shorts/Poh1SGWA_Mg',
    result: '100% Citas Llenas',
    videos: [{ id: 'v4', title: 'LAP Custom', platform: 'youtube', url: 'https://youtube.com/shorts/Poh1SGWA_Mg' }],
  },
  {
    id: 'p5',
    title: 'Burger & Eventos',
    description: 'Contenido visual irresistible, food porn apetitoso y catering de hamburguesas gourmet.',
    category: 'Gastronomía & Eventos',
    imageUrl: '/portfolio/gastronomico.webp',
    driveUrl: 'https://youtube.com/shorts/gP1V8yfkt0k',
    result: '+180% Reservas',
    videos: [{ id: 'v5', title: 'Burger & Eventos', platform: 'youtube', url: 'https://youtube.com/shorts/gP1V8yfkt0k' }],
  },
  {
    id: 'p6',
    title: 'Shaking Bar',
    description: 'Videos con ritmo de edición rápido y estética nocturna para venta de artículos de bar y coctelería.',
    category: 'Bar & Coctelería',
    imageUrl: '/portfolio/bar-bebidas.webp',
    driveUrl: 'https://youtube.com/shorts/n6sieAKNPa4',
    result: 'Viral en TikTok',
    videos: [{ id: 'v6', title: 'Shaking Bar', platform: 'youtube', url: 'https://youtube.com/shorts/n6sieAKNPa4' }],
  },
  {
    id: 'p7',
    title: 'Checor Edificios',
    description: 'Video cinematográfico y recorridos de arquitectura para proyectos inmobiliarios y edificios.',
    category: 'Inmobiliaria & Edificios',
    imageUrl: '/portfolio/inmobiliaria.webp',
    driveUrl: 'https://youtu.be/eGqahelD7yo',
    result: '$2.8M Ventas',
    videos: [{ id: 'v7', title: 'Checor Edificios', platform: 'youtube', url: 'https://youtu.be/eGqahelD7yo' }],
  },
  {
    id: 'p8',
    title: 'Chalqui',
    description: 'Campañas comerciales y spot publicitario dinámico para posicionamiento de marca.',
    category: 'Comercial & Publicidad',
    imageUrl: '/portfolio/marca-personal.webp',
    driveUrl: 'https://youtube.com/shorts/eDVSSoWJwWg',
    result: '+500K Views',
    videos: [{ id: 'v8', title: 'Chalqui', platform: 'youtube', url: 'https://youtube.com/shorts/eDVSSoWJwWg' }],
  },
]

export default function HomePortfolio({
  projects = defaultProjects,
  onOpenVideo,
}: HomePortfolioProps) {
  const displayProjects = projects.length > 0 ? projects.slice(0, 8) : defaultProjects

  return (
    <section id="portfolio" className="py-20 lg:py-28 relative bg-gray-50 contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 px-4 py-1.5 bg-[#7A1BB5] text-white rounded-full font-bold text-xs uppercase tracking-wider">
            Portfolio & Casos Reales
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-gray-900 tracking-tight">
            Casos de <span className="text-[#7A1BB5]">éxito</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Resultados reales para marcas y negocios en diversos sectores comerciales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                if (project.videos && project.videos.length > 0 && onOpenVideo) {
                  onOpenVideo(project.videos[0])
                } else if (project.driveUrl) {
                  window.open(project.driveUrl, '_blank')
                }
              }}
              className="block group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                <Image
                  src={project.imageUrl || '/portfolio/autos.webp'}
                  alt={`Caso de éxito: ${project.title} - ${project.category}`}
                  width={400}
                  height={300}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/20 transition-colors" />

                {/* Play Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-[#7A1BB5] text-white flex items-center justify-center shadow-2xl backdrop-blur-sm">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {project.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                  <h3 className="text-base font-bold mb-1 leading-snug drop-shadow-md text-white">
                    {project.title}
                  </h3>
                  {project.result && (
                    <span className="text-emerald-300 inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                      <TrendingUp className="w-3 h-3" />
                      {project.result}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white flex items-center justify-between border-t border-gray-50">
                <p className="text-xs text-gray-500 line-clamp-2 pr-2">
                  {project.description || 'Ver caso de éxito completo'}
                </p>
                <Button
                  size="icon"
                  aria-label={`Ver caso de éxito de ${project.title}`}
                  className="shrink-0 rounded-full bg-black text-white hover:bg-[#7A1BB5] transition-colors w-8 h-8"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            aria-label="Ver galería completa de proyectos en el portafolio"
            className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-10 py-4 font-bold text-base group shadow-xl transition-all hover:scale-105"
          >
            Ver Galería Completa de Proyectos
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
