import type { Metadata } from 'next'
import VideoclipsClient from '@/components/videoclips/VideoclipsClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Videoclips Oficiales en Lima | Productora Audiovisual Musical | BLACKBOX',
  description: 'Producción cinematográfica de videoclips en Lima en formato 4K Cinema. Rodajes con ópticas fijas y anamórficas, iluminación de atmósfera, dirección artística y color grading para artistas y bandas.',
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
    title: 'Videoclips Oficiales en Lima | Black Box Films',
    description: 'Producción cinematográfica de videoclips en Lima en 4K Cinema para artistas y sellos discográficos.',
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
    title: 'Videoclips Oficiales en Lima | Black Box Films',
    description: 'Producción cinematográfica de videoclips en Lima en 4K Cinema.',
    images: ['https://i.ytimg.com/vi/bhgJlSKKv50/maxresdefault.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
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
