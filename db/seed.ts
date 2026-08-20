
import { PrismaClient, Project, Brand, Service, Testimonial } from '@prisma/client';

const prisma = new PrismaClient();

const brandLogos: Record<string, string> = {
  'el-importador-peru': '/brands/el-importador-peru.svg',
  'clinica-avendano': '/brands/clinica-avendano.svg',
  'pf-diego-galvan': '/brands/pf-diego-galvan.svg',
  makita: '/brands/makita.svg',
  momentum: '/brands/momentum.svg',
  innovateco: '/brands/innovateco.svg',
  nexa: '/brands/nexa.svg',
  quantum: '/brands/quantum.svg',
  'sala-fabulosa': '/brands/sala-fabulosa.svg',
  stampitas: '/brands/stampitas.svg',
  stellar: '/brands/stellar.svg',
  techflow: '/brands/techflow.svg',
  vertex: '/brands/vertex.svg',
};

async function main() {
  console.log('Iniciando el proceso de seeding...');

  // Clean up database
  await prisma.project.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.testimonial.deleteMany({});
  console.log('Bases de datos limpiadas.');


  // --- Create Brands ---
  const brandsData: Omit<Brand, 'id' | 'createdAt' | 'updatedAt' | 'active' | 'website' | 'color'>[] = [
    { name: 'El Importador Perú', logo: brandLogos['el-importador-peru'], order: 1 },
    { name: 'Clínica Avendaño', logo: brandLogos['clinica-avendano'], order: 2 },
    { name: 'Diego Galván', logo: brandLogos['pf-diego-galvan'], order: 3 },
    { name: 'Makita', logo: brandLogos.makita, order: 4 },
    { name: 'Momentum', logo: brandLogos.momentum, order: 5 },
    { name: 'Innovateco', logo: brandLogos.innovateco, order: 6 },
    { name: 'Nexa', logo: brandLogos.nexa, order: 7 },
    { name: 'Quantum', logo: brandLogos.quantum, order: 8 },
    { name: 'Sala Fabulosa', logo: brandLogos['sala-fabulosa'], order: 9 },
    { name: 'Stampitas', logo: brandLogos.stampitas, order: 10 },
    { name: 'Stellar', logo: brandLogos.stellar, order: 11 },
    { name: 'TechFlow', logo: brandLogos.techflow, order: 12 },
    { name: 'Vertex', logo: brandLogos.vertex, order: 13 },
  ];
  await prisma.brand.createMany({
    data: brandsData as any,
  });
  console.log(`${brandsData.length} marcas han sido creadas.`);


  // --- Create Projects ---
  const projectsData: any[] = [
    { title: 'Clínica Avendaño', description: 'Estrategia integral de videos educativos y testimoniales para la clínica bariátrica líder de Lima, posicionando al especialista y derribando mitos sobre la cirugía.', category: 'Salud & Bariátrica', imageUrl: 'https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/Su_JcYkeyLw', order: 1, result: '+280 Citas / Mes', gradient: 'from-purple-500 to-blue-500' },
    { title: 'Makita Perú', description: 'Producción audiovisual y reels de alto impacto para herramientas profesionales e industriales.', category: 'Herramientas & B2B', imageUrl: 'https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/BaKc_hx3NwM', order: 2, result: 'Leads B2B Calificados', gradient: 'from-red-600 to-zinc-900' },
    { title: 'Leomar Muebles', description: 'Reels dinámicos de catálogo y fabricación para venta de muebles de diseño para el hogar y oficina.', category: 'Muebles & Hogar', imageUrl: 'https://img.youtube.com/vi/gixZWO9xOes/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/gixZWO9xOes', order: 3, result: '+320% Mensajes', gradient: 'from-amber-500 to-orange-600' },
    { title: 'LAP Custom', description: 'Personalización de interiores, tapizado en cuero genuino y restauración de autos de alta gama.', category: 'Automotriz & Cuero', imageUrl: 'https://img.youtube.com/vi/Poh1SGWA_Mg/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/Poh1SGWA_Mg', order: 4, result: '100% Citas Llenas', gradient: 'from-blue-600 to-indigo-800' },
    { title: 'Burger & Eventos', description: 'Contenido visual irresistible, food porn apetitoso y catering de hamburguesas gourmet para eventos.', category: 'Gastronomía & Eventos', imageUrl: 'https://img.youtube.com/vi/gP1V8yfkt0k/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/gP1V8yfkt0k', order: 5, result: '+180% Reservas', gradient: 'from-amber-500 to-red-600' },
    { title: 'Shaking', description: 'Videos con ritmo de edición rápido y estética nocturna para venta de artículos de bar y coctelería.', category: 'Bar & Coctelería', imageUrl: 'https://img.youtube.com/vi/n6sieAKNPa4/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/n6sieAKNPa4', order: 6, result: 'Viral en TikTok', gradient: 'from-purple-600 to-pink-600' },
    { title: 'Checor Inmobiliaria', description: 'Video cinematográfico y recorridos de arquitectura para proyectos inmobiliarios y departamentos en Lima.', category: 'Inmobiliaria & Edificios', imageUrl: 'https://img.youtube.com/vi/eGqahelD7yo/hqdefault.jpg', driveUrl: 'https://youtu.be/eGqahelD7yo', order: 7, result: '$2.8M Ventas', gradient: 'from-emerald-500 to-teal-800' },
    { title: 'Chalqui', description: 'Campañas comerciales y spot publicitario dinámico para posicionamiento de marca.', category: 'Comercial & Publicidad', imageUrl: 'https://img.youtube.com/vi/eDVSSoWJwWg/hqdefault.jpg', driveUrl: 'https://youtube.com/shorts/eDVSSoWJwWg', order: 8, result: '+500K Views', gradient: 'from-purple-700 to-indigo-900' },
  ];

  await prisma.project.createMany({
    data: projectsData as any,
  });
  console.log(`${projectsData.length} proyectos han sido creados.`);

  // --- Create Services ---
  const servicesData: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'active'>[] = [
    {
      title: 'Publicidad en Redes',
      description: 'Campañas pagadas en Meta, TikTok y LinkedIn para alcanzar a tu público objetivo y generar conversiones.',
      icon: 'Megaphone',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      features: 'Estrategia de campaña,Segmentación avanzada,Diseño de creativos,Reportes de rendimiento',
      order: 1,
    },
    {
      title: 'Gestión de Contenido',
      description: 'Creación y gestión de contenido de valor para redes sociales que construye comunidad y posiciona tu marca.',
      icon: 'Edit3',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      features: 'Plan de contenidos,Creación de videos y reels,Copywriting persuasivo,Análisis de engagement',
      order: 2,
    },
    {
      title: 'Optimización SEO',
      description: 'Mejoramos tu ranking en Google para que más clientes potenciales te encuentren de forma orgánica.',
      icon: 'Search',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      features: 'Auditoría SEO,Optimización On-Page,Link Building,SEO Local',
      order: 3,
    },
     {
      title: 'Branding y Diseño',
      description: 'Construimos identidades de marca sólidas y atractivas que conectan con tu audiencia y te diferencian.',
      icon: 'Palette',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      features: 'Diseño de logo y manual de marca,Creación de línea gráfica,Material publicitario,Diseño Web UX/UI',
      order: 4,
    },
  ];
  await prisma.service.createMany({
    data: servicesData as any,
  });
  console.log(`${servicesData.length} servicios han sido creados.`);

  // --- Create Testimonials ---
  const testimonialsData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt' | 'active'>[] = [
    {
      name: 'Carlos Rodríguez',
      role: 'CEO',
      company: 'Innovateco',
      quote: 'El equipo de Blackbox revolucionó nuestra presencia en redes. Su estrategia de contenido duplicó nuestro engagement en menos de 3 meses.',
      image: '/testimonials/carlos-rodriguez.png',
      rating: 5,
      order: 1,
    },
    {
      name: 'Laura Torres',
      role: 'Gerente de Marketing',
      company: 'Nexa',
      quote: 'Gracias a su campaña de publicidad, superamos nuestros objetivos de ventas del trimestre. Son un socio estratégico indispensable.',
      image: '/testimonials/laura-torres.png',
      rating: 5,
      order: 2,
    },
    {
      name: 'Diego Galván',
      role: 'Marca Personal',
      company: 'Diego Galván',
      quote: 'Lograron capturar la esencia de mi marca personal y proyectarla de una manera que nunca hubiera imaginado. ¡El resultado ha sido increíble!',
      image: '/testimonials/diego-galvan.png',
      rating: 5,
      order: 3,
    }
  ];

  await prisma.testimonial.createMany({
    data: testimonialsData as any,
  });
  console.log(`${testimonialsData.length} testimonios han sido creados.`);


  // --- Create SiteConfig ---
  const existingConfig = await prisma.siteConfig.findFirst();
  if (!existingConfig) {
    console.log('No existe configuración del sitio, creando una por defecto...');
    await prisma.siteConfig.create({ data: { brandName: 'Blackbox', siteTitle: 'Blackbox | Tu Socio Estratégico en Marketing Digital', siteDescription: 'Transformamos marcas con estrategias de contenido, marketing de influencers y campañas en redes sociales que capturan y convierten.', phone: '+51 958 297 236', email: 'hola@blackbox.agency', address: 'Lima, Perú', whatsapp: '51958297236', heroClients: '150+', heroProjects: '500+', heroYears: '8+', heroAwards: '50+' } });
    console.log('Configuración del sitio creada.');
  } else {
    console.log('La configuración del sitio ya existe.');
  }

  console.log('Seeding finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Desconectado de la base de datos.');
  });
