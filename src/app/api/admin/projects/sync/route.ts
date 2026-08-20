import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

const CURATED_PROJECTS = [
  { 
    id: 'p1', 
    title: 'Clínica Avendaño', 
    description: 'Estrategia integral de videos educativos y testimoniales para la clínica bariátrica líder de Lima, posicionando al especialista y derribando mitos sobre la cirugía.', 
    category: 'Salud & Bariátrica', 
    imageUrl: 'https://img.youtube.com/vi/nzdbM36oEKQ/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/nzdbM36oEKQ', 
    gradient: 'from-purple-500 to-blue-500', 
    result: '+280 Citas / Mes', 
    order: 1,
    active: true,
    videos: [
      { id: 'v_p1', title: 'Clínica Avendaño | Cirugía Bariátrica & Salud', platform: 'youtube', url: 'https://youtube.com/shorts/nzdbM36oEKQ', embedUrl: 'https://www.youtube.com/embed/nzdbM36oEKQ', thumbnail: 'https://img.youtube.com/vi/nzdbM36oEKQ/hqdefault.jpg', order: 1, active: true }
    ] 
  },
  { 
    id: 'p2', 
    title: 'Makita Perú', 
    description: 'Producción audiovisual y reels de alto impacto para herramientas profesionales e industriales.', 
    category: 'Herramientas & B2B', 
    imageUrl: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', 
    driveUrl: 'https://youtube.com/shorts/BaKc_hx3NwM', 
    gradient: 'from-red-600 to-zinc-900', 
    result: 'Leads B2B Calificados', 
    order: 2,
    active: true,
    videos: [
      { id: 'v_p2', title: 'Makita Perú | Herramientas Profesionales 40V Max', platform: 'youtube', url: 'https://youtube.com/shorts/BaKc_hx3NwM', embedUrl: 'https://www.youtube.com/embed/BaKc_hx3NwM', thumbnail: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', order: 1, active: true }
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
    active: true,
    videos: [
      { id: 'v_p3', title: 'Leomar | Muebles de Diseño para el Hogar', platform: 'youtube', url: 'https://youtube.com/shorts/gixZWO9xOes', embedUrl: 'https://www.youtube.com/embed/gixZWO9xOes', thumbnail: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg', order: 1, active: true }
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
    active: true,
    videos: [
      { id: 'v_p4', title: 'LAP Custom | Tapizado en Cuero de Alta Gama', platform: 'youtube', url: 'https://youtube.com/shorts/Poh1SGWA_Mg', embedUrl: 'https://www.youtube.com/embed/Poh1SGWA_Mg', thumbnail: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg', order: 1, active: true }
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
    active: true,
    videos: [
      { id: 'v_p5', title: 'Burger & Eventos | Catering Gourmet & Smash Burgers', platform: 'youtube', url: 'https://youtube.com/shorts/gP1V8yfkt0k', embedUrl: 'https://www.youtube.com/embed/gP1V8yfkt0k', thumbnail: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg', order: 1, active: true }
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
    active: true,
    videos: [
      { id: 'v_p6', title: 'Shaking | Artículos & Cristalería para Bar', platform: 'youtube', url: 'https://youtube.com/shorts/n6sieAKNPa4', embedUrl: 'https://www.youtube.com/embed/n6sieAKNPa4', thumbnail: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg', order: 1, active: true }
    ] 
  },
  { 
    id: 'p7', 
    title: 'Checor Inmobiliaria', 
    description: 'Video cinematográfico y recorridos de arquitectura para proyectos inmobiliarios y departamentos en Lima.', 
    category: 'Inmobiliaria & Edificios', 
    imageUrl: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', 
    driveUrl: 'https://youtu.be/eGqahelD7yo', 
    gradient: 'from-emerald-500 to-teal-800', 
    result: '$2.8M Ventas', 
    order: 7,
    active: true,
    videos: [
      { id: 'v_p7', title: 'Checor | Desarrollo Inmobiliario & Departamentos', platform: 'youtube', url: 'https://youtu.be/eGqahelD7yo', embedUrl: 'https://www.youtube.com/embed/eGqahelD7yo', thumbnail: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', order: 1, active: true }
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
    active: true,
    videos: [
      { id: 'v_p8', title: 'Chalqui | Spot Comercial de Marca', platform: 'youtube', url: 'https://youtube.com/shorts/eDVSSoWJwWg', embedUrl: 'https://www.youtube.com/embed/eDVSSoWJwWg', thumbnail: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg', order: 1, active: true }
    ] 
  },
]

export async function POST() {
  try {
    await db.project.deleteMany({})
    for (const proj of CURATED_PROJECTS) {
      const { videos, ...projectData } = proj
      const created = await db.project.create({ data: projectData })
      if (videos && videos.length > 0) {
        for (const v of videos) {
          await db.video.create({
            data: {
              ...v,
              projectId: created.id
            }
          })
        }
      }
    }
    return NextResponse.json({ success: true, count: CURATED_PROJECTS.length })
  } catch (error: any) {
    console.error('Error syncing projects:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
