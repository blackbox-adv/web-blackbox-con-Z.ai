import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: any | undefined
  var inMemoryDb: any | undefined
}

// Initial seed data for fallback
const INITIAL_SITE_CONFIG = {
  id: 'cfg_default',
  phone: '+51 958 297 236',
  email: 'contacto@blackboxperu.com',
  address: 'Lima, Perú',
  whatsapp: '51958297236',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com/blackbox_pe',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  tiktok: 'https://tiktok.com/@blackbox_pe',
  youtube: 'https://youtube.com',
  brandIcon: '/logo-icon.svg',
  brandLogo: '/logo.svg',
  brandName: 'Black Box',
  heroAwards: '50+',
  heroClients: '150+',
  heroProjects: '500+',
  heroYears: '8+',
  heroReelUrl: 'https://youtube.com/shorts/nzdbM36oEKQ',
  heroReelTitle: 'Showreel 2026 | Recopilatorio de Trabajos',
  ogImage: '/og-image.png',
  primaryColor: '#9333ea',
  secondaryColor: '#f97316',
  siteDescription: 'Transformamos tu presencia digital con estrategias de marketing que generan resultados reales.',
  siteKeywords: 'marketing digital, SEO, publicidad, redes sociales, agencia digital, Lima, Perú',
  siteTitle: 'Blackbox - Agencia de Marketing Digital',
  updatedAt: new Date(),
}

const INITIAL_BRANDS = [
  { id: 'b1', name: 'Makita Perú', logo: '/brands/makita.svg', order: 1, active: true, color: 'bg-red-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b2', name: 'Clínica Avendaño', logo: '/brands/clinica-avendano.svg', order: 2, active: true, color: 'bg-purple-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b3', name: 'Leomar Muebles', logo: '/brands/leomar.svg', order: 3, active: true, color: 'bg-amber-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b4', name: 'LAP Custom Tapizados', logo: '/brands/lap-custom.svg', order: 4, active: true, color: 'bg-blue-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b5', name: 'Burger & Eventos', logo: '/brands/burger-eventos.svg', order: 5, active: true, color: 'bg-red-500', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b6', name: 'Shaking Bar', logo: '/brands/shaking.svg', order: 6, active: true, color: 'bg-pink-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b7', name: 'Checor Inmobiliaria', logo: '/brands/checor.svg', order: 7, active: true, color: 'bg-emerald-600', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b8', name: 'Chalqui', logo: '/brands/chalqui.svg', order: 8, active: true, color: 'bg-purple-500', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b9', name: 'El Importador Perú', logo: '/brands/el-importador-peru.svg', order: 9, active: true, color: 'bg-purple-500', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b10', name: 'Momentum', logo: '/brands/momentum.svg', order: 10, active: true, color: 'bg-purple-500', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b11', name: 'Innovateco', logo: '/brands/innovateco.svg', order: 11, active: true, color: 'bg-purple-500', website: '', createdAt: new Date(), updatedAt: new Date() },
  { id: 'b12', name: 'Nexa', logo: '/brands/nexa.svg', order: 12, active: true, color: 'bg-purple-500', website: '', createdAt: new Date(), updatedAt: new Date() },
]

const INITIAL_PROJECTS = [
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
    active: true, 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p1', projectId: 'p1', title: 'Clínica Avendaño | Cirugía Bariátrica', platform: 'youtube', url: 'https://youtube.com/shorts/Su_JcYkeyLw', embedUrl: 'https://www.youtube.com/embed/Su_JcYkeyLw', thumbnail: 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg', order: 1, active: true }
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
    active: true, 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p2', projectId: 'p2', title: 'Makita Perú | Herramientas Profesionales', platform: 'youtube', url: 'https://youtube.com/shorts/BaKc_hx3NwM', embedUrl: 'https://www.youtube.com/embed/BaKc_hx3NwM', thumbnail: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', order: 1, active: true }
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
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p3', projectId: 'p3', title: 'Leomar | Venta de Muebles de Diseño', platform: 'youtube', url: 'https://youtube.com/shorts/gixZWO9xOes', embedUrl: 'https://www.youtube.com/embed/gixZWO9xOes', thumbnail: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg', order: 1, active: true }
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
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p4', projectId: 'p4', title: 'LAP Custom | Tapizado en Cuero para Autos', platform: 'youtube', url: 'https://youtube.com/shorts/Poh1SGWA_Mg', embedUrl: 'https://www.youtube.com/embed/Poh1SGWA_Mg', thumbnail: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg', order: 1, active: true }
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
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p5', projectId: 'p5', title: 'Burger & Eventos | Hamburguesas Gourmet', platform: 'youtube', url: 'https://youtube.com/shorts/gP1V8yfkt0k', embedUrl: 'https://www.youtube.com/embed/gP1V8yfkt0k', thumbnail: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg', order: 1, active: true }
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
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p6', projectId: 'p6', title: 'Shaking | Artículos para Bar & Coctelería', platform: 'youtube', url: 'https://youtube.com/shorts/n6sieAKNPa4', embedUrl: 'https://www.youtube.com/embed/n6sieAKNPa4', thumbnail: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg', order: 1, active: true }
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
    active: true, 
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p7', projectId: 'p7', title: 'Checor | Desarrollo de Edificios & Inmuebles', platform: 'youtube', url: 'https://youtu.be/eGqahelD7yo', embedUrl: 'https://www.youtube.com/embed/eGqahelD7yo', thumbnail: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', order: 1, active: true }
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
    createdAt: new Date(), 
    updatedAt: new Date(), 
    videos: [
      { id: 'v_p8', projectId: 'p8', title: 'Chalqui | Campaña Audiovisual', platform: 'youtube', url: 'https://youtube.com/shorts/eDVSSoWJwWg', embedUrl: 'https://www.youtube.com/embed/eDVSSoWJwWg', thumbnail: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg', order: 1, active: true }
    ] 
  },
]

const INITIAL_SERVICES = [
  {
    id: 's1',
    title: 'Publicidad en Redes',
    description: 'Campañas pagadas en Meta, TikTok y LinkedIn para alcanzar a tu público objetivo y generar conversiones.',
    icon: 'Megaphone',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    features: 'Estrategia de campaña,Segmentación avanzada,Diseño de creativos,Reportes de rendimiento',
    order: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 's2',
    title: 'Gestión de Contenido',
    description: 'Creación y gestión de contenido de valor para redes sociales que construye comunidad y posiciona tu marca.',
    icon: 'Edit3',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    features: 'Plan de contenidos,Creación de videos y reels,Copywriting persuasivo,Análisis de engagement',
    order: 2,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 's3',
    title: 'Optimización SEO',
    description: 'Mejoramos tu ranking en Google para que más clientes potenciales te encuentren de forma orgánica.',
    icon: 'Search',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    features: 'Auditoría SEO,Optimización On-Page,Link Building,SEO Local',
    order: 3,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 's4',
    title: 'Branding y Diseño',
    description: 'Construimos identidades de marca sólidas y atractivas que conectan con tu audiencia y te diferencian.',
    icon: 'Palette',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    features: 'Diseño de logo y manual de marca,Creación de línea gráfica,Material publicitario,Diseño Web UX/UI',
    order: 4,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const INITIAL_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Dr. Luis Ramos',
    role: 'Director Médico',
    company: 'Clínica Avendaño (Lima)',
    quote: 'La producción de reels y el enfoque médico especializado de Black Box nos ayudó a generar más de 280 consultas mensuales para nuestros programas de cirugía bariátrica. El contenido transmite total confianza.',
    image: '/testimonials/doctor-luis-ramos.jpg',
    rating: 5,
    order: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 't2',
    name: 'Marco Mendoza',
    role: 'Gerente General',
    company: 'Leomar Muebles (Perú)',
    quote: 'El contenido audiovisual de nuestro catálogo multiplicó nuestros mensajes diarios de clientes cotizando salas y comedores por WhatsApp. Supieron plasmar la calidad de nuestros acabados a la perfección.',
    image: '/testimonials/marco-mendoza.jpg',
    rating: 5,
    order: 2,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 't3',
    name: 'Ing. Jorge Quispe',
    role: 'Jefe de Marketing B2B',
    company: 'Distribución Makita Perú',
    quote: 'Lograron que herramientas técnicas y de uso industrial capten la atención en formatos verticales dinámicos, conectando directamente con contratistas y talleres en todo el país.',
    image: '/testimonials/jorge-quispe.jpg',
    rating: 5,
    order: 3,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const INITIAL_ADMINS = [
  {
    id: 'adm_default',
    username: 'admin',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // sha256 for 'admin123'
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// In-Memory Repository Helper
function createInMemoryDb() {
  const initialVideos = INITIAL_PROJECTS.flatMap(p => (p.videos || []))

  const store = {
    siteConfig: [ { ...INITIAL_SITE_CONFIG } ],
    brands: [ ...INITIAL_BRANDS ],
    projects: [ ...INITIAL_PROJECTS ],
    services: [ ...INITIAL_SERVICES ],
    testimonials: [ ...INITIAL_TESTIMONIALS ],
    videos: [ ...initialVideos ],
    admins: [ ...INITIAL_ADMINS ],
    adminSessions: [] as any[],
  }

  function createModelHelper(collectionName: keyof typeof store) {
    return {
      findFirst: async (args?: any) => {
        const items = store[collectionName] as any[]
        let item = items[0] || null
        if (args?.where) {
          item = items.find(i => matchesWhere(i, args.where)) || null
        }
        return item ? attachRelations(item, collectionName, args?.include) : null
      },
      findUnique: async (args: any) => {
        const items = store[collectionName] as any[]
        if (!args || !args.where) return null
        const item = items.find(i => matchesWhere(i, args.where)) || null
        return item ? attachRelations(item, collectionName, args?.include) : null
      },
      findMany: async (args?: any) => {
        let items = [...(store[collectionName] as any[])]
        if (args?.where) {
          items = items.filter(item => matchesWhere(item, args.where))
        }
        if (args?.orderBy) {
          const key = Object.keys(args.orderBy)[0]
          const dir = args.orderBy[key]
          items.sort((a, b) => (dir === 'desc' ? (b[key] > a[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)))
        }
        return items.map(i => attachRelations(i, collectionName, args?.include))
      },
      create: async (args: any) => {
        const newItem = {
          id: args.data?.id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
          active: true,
          ...args.data,
        }
        ;(store[collectionName] as any[]).push(newItem)
        return newItem
      },
      createMany: async (args: any) => {
        const dataList = Array.isArray(args.data) ? args.data : [args.data]
        for (const d of dataList) {
          const newItem = {
            id: d?.id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true,
            ...d,
          }
          ;(store[collectionName] as any[]).push(newItem)
        }
        return { count: dataList.length }
      },
      update: async (args: any) => {
        const items = store[collectionName] as any[]
        const index = items.findIndex(item => matchesWhere(item, args.where))
        if (index === -1) {
          return null
        }
        items[index] = { ...items[index], ...args.data, updatedAt: new Date() }
        return items[index]
      },
      upsert: async (args: any) => {
        const items = store[collectionName] as any[]
        const index = items.findIndex(item => matchesWhere(item, args.where))
        if (index >= 0) {
          items[index] = { ...items[index], ...args.update, updatedAt: new Date() }
          return items[index]
        } else {
          const newItem = {
            id: args.create?.id || `id_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            active: true,
            ...args.create,
          }
          items.push(newItem)
          return newItem
        }
      },
      delete: async (args: any) => {
        const items = store[collectionName] as any[]
        const index = items.findIndex(item => matchesWhere(item, args.where))
        if (index >= 0) {
          const deleted = items.splice(index, 1)[0]
          return deleted
        }
        return null
      },
      deleteMany: async (args?: any) => {
        if (!args || !args.where) {
          const count = (store[collectionName] as any[]).length
          store[collectionName] = [] as any
          return { count }
        }
        const items = store[collectionName] as any[]
        const remaining = items.filter(item => !matchesWhere(item, args.where))
        const count = items.length - remaining.length
        store[collectionName] = remaining as any
        return { count }
      },
      count: async (args?: any) => {
        if (!args?.where) return (store[collectionName] as any[]).length
        return (store[collectionName] as any[]).filter(item => matchesWhere(item, args.where)).length
      }
    }
  }

  function attachRelations(item: any, collection: string, include?: any): any {
    if (!include || !item) return item
    const copy = { ...item }
    if (collection === 'projects' && include.videos) {
      copy.videos = store.videos.filter(v => v.projectId === item.id)
    }
    if (collection === 'adminSessions' && include.admin) {
      copy.admin = store.admins.find(a => a.id === item.adminId) || null
    }
    return copy
  }

  function matchesWhere(item: any, where: any): boolean {
    if (!where || !item) return false
    for (const key of Object.keys(where)) {
      if (item[key] !== where[key]) return false
    }
    return true
  }

  const api: any = {
    siteConfig: createModelHelper('siteConfig'),
    brand: createModelHelper('brands'),
    project: createModelHelper('projects'),
    service: createModelHelper('services'),
    testimonial: createModelHelper('testimonials'),
    video: createModelHelper('videos'),
    admin: createModelHelper('admins'),
    adminSession: createModelHelper('adminSessions'),
    $transaction: async (cb: any) => {
      if (typeof cb === 'function') {
        return cb(api)
      }
      return Promise.all(cb)
    },
    $disconnect: async () => {},
  }

  return api
}

// Resilient DB Client: Try Prisma with fallback to in-memory on any network error
function getOrCreateInMemory() {
  if (!globalThis.inMemoryDb) {
    globalThis.inMemoryDb = createInMemoryDb()
  }
  return globalThis.inMemoryDb
}

function createSafeDbProxy() {
  const inMemory = getOrCreateInMemory()

  let rawPrisma: any = null
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres')) {
    try {
      const sql = neon(process.env.DATABASE_URL)
      const adapter = new PrismaNeon(sql as any)
      rawPrisma = new PrismaClient({ adapter } as any)
    } catch {
      rawPrisma = null
    }
  }

  return new Proxy({}, {
    get: (_, modelProp: string) => {
      if (modelProp === '$transaction') {
        return async (cb: any) => {
          if (rawPrisma) {
            try {
              return await rawPrisma.$transaction(cb)
            } catch (err) {
              console.warn('[AI Studio] DB transaction failed, using in-memory fallback:', err)
              return inMemory.$transaction(cb)
            }
          }
          return inMemory.$transaction(cb)
        }
      }
      if (modelProp === '$disconnect') {
        return async () => {}
      }

      const inMemModel = inMemory[modelProp]
      const prismaModel = rawPrisma ? rawPrisma[modelProp] : null

      return new Proxy({}, {
        get: (__, methodProp: string) => {
          return async (...args: any[]) => {
            if (prismaModel && typeof prismaModel[methodProp] === 'function') {
              try {
                return await prismaModel[methodProp](...args)
              } catch (err: any) {
                console.warn(`[AI Studio] ${modelProp}.${methodProp} DB query failed, using in-memory fallback:`, err?.message || err)
                if (inMemModel && typeof inMemModel[methodProp] === 'function') {
                  return inMemModel[methodProp](...args)
                }
                return null
              }
            }

            if (inMemModel && typeof inMemModel[methodProp] === 'function') {
              return inMemModel[methodProp](...args)
            }
            return null
          }
        }
      })
    }
  })
}

export const db: any = createSafeDbProxy()
