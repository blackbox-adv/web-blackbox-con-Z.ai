import type { Metadata } from 'next'
import VideoclipsClient from '@/components/videoclips/VideoclipsClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Videoclips Oficiales en Lima 4K | Productora Musical | BLACKBOX',
  description: 'Producción de videoclips en Lima en 4K Cinema. Guion, dirección artística, ópticas de cine y color grading para artistas y sellos discográficos.',
  keywords: [
    'productora de videoclips lima',
    'videos musicales lima',
    'produccion de videoclips peru',
    'grabacion de videos musicales',
    'videoclips 4k lima',
    'productora audiovisual musical',
    'black box videoclips'
  ],
  alternates: {
    canonical: 'https://blackboxperu.com/videoclips',
  },
  openGraph: {
    title: 'Videoclips Oficiales en Lima 4K | Productora Musical | BLACKBOX',
    description: 'Producción de videoclips en Lima en 4K Cinema. Guion, dirección artística, ópticas de cine y color grading para artistas y sellos discográficos.',
    url: 'https://blackboxperu.com/videoclips',
    siteName: 'Black Box Films',
    locale: 'es_PE',
    type: 'website',
    images: [
      {
        url: 'https://i.ytimg.com/vi/bhgJlSKKv50/maxresdefault.jpg',
        width: 1280,
        height: 720,
        alt: 'Black Box Music - Productora de Videoclips en Lima',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videoclips Oficiales en Lima 4K | Productora Musical | BLACKBOX',
    description: 'Producción de videoclips en Lima en 4K Cinema para artistas y sellos.',
    images: ['https://i.ytimg.com/vi/bhgJlSKKv50/maxresdefault.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EntertainmentBusiness',
      '@id': 'https://blackboxperu.com/videoclips#organization',
      name: 'Black Box Films - Productora de Videoclips en Lima',
      description: 'Servicio integral de dirección, rodaje cinematográfico 4K, edición y postproducción de videoclips musicales en Lima, Perú.',
      url: 'https://blackboxperu.com/videoclips',
      telephone: '+51958297236',
      areaServed: {
        '@type': 'City',
        name: 'Lima',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Paquetes de Producción de Videoclips',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Live Session / Grabación Acústica Multicámara',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Videoclip Oficial Pro (4K Cinema 16:9 + Teasers 9:16)',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Producción Cinematográfica para Sellos y Artistas',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://blackboxperu.com/videoclips#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta producir un videoclip musical profesional en Lima?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El costo de producir un videoclip musical profesional en Lima depende del concepto creativo, la cantidad de locaciones, el tipo de cámaras ópticas utilizadas y la complejidad de la postproducción visual. En Black Box estructuramos proyectos a la medida tanto para artistas emergentes como para bandas consolidadas y sellos discográficos en Perú. Disponemos desde formatos ágiles como live sessions acústicas multicámara en set controlado, hasta superproducciones cinematográficas con esquemas de iluminación escénica, efectos de humo, bailarines, actores y color grading de cine en DaVinci Resolve. Elaboramos un presupuesto transparente y desglosado desde el inicio para que conozcas con exactitud cada aspecto técnico y artístico de tu inversión, garantizando un resultado visual impactante que cumpla con los estándares de calidad de cadenas de televisión musical y plataformas como YouTube y Vevo.'
          }
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye el servicio de producción de videoclips de Black Box en Lima?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nuestro servicio de producción de videoclips en Lima brinda un acompañamiento integral de principio a fin para convertir tu canción en una experiencia cinematográfica memorable. En la etapa de preproducción colaboramos contigo para conceptualizar la historia, redactar el guion técnico, diseñar el storyboard, coordinar el styling y gestionar locaciones públicas o privadas en Lima. Durante la jornada de rodaje desplegamos cámaras de cine digital 4K con ópticas fijas y anamórficas de alta gama, iluminación profesional y monitoreo en set para cuidar cada encuadre. En la postproducción realizamos el montaje rítmico sincronizado al beat del máster musical, corrección de color profesional, efectos visuales y exportación en formato panorámico 16:9 para YouTube, además de teasers y adaptaciones verticales en 9:16 especialmente diseñadas para promocionar el lanzamiento en Reels y TikTok.'
          }
        },
        {
          '@type': 'Question',
          name: '¿En cuánto tiempo se entrega el videoclip final y cómo coordinamos el rodaje?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El proceso completo de producción de un videoclip musical en Lima toma en promedio entre dos y cuatro semanas, distribuidas entre la preproducción, el día del rodaje y la postproducción digital. Una vez aprobado el guion y aseguradas las locaciones requeridas, ejecutamos la filmación en jornadas de uno o dos días según la magnitud del proyecto. El primer corte de edición se presenta al artista habitualmente entre siete y diez días hábiles tras el rodaje para revisar el ritmo narrativo y la sincronización labial. Tras incorporar tus comentarios y aplicar el color grading cinematográfico final, entregamos el master definitivo en máxima resolución 4K y Full HD, acompañado de cápsulas promocionales para redes sociales que facilitan una campaña de estreno exitosa en todas tus plataformas digitales.'
          }
        }
      ]
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://blackboxperu.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Videoclips Oficiales en Lima',
          item: 'https://blackboxperu.com/videoclips'
        }
      ]
    }
  ]
}

export default function VideoclipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideoclipsClient />
    </>
  )
}
