import type { Metadata } from 'next'
import PortfolioClient from '@/components/portfolio/PortfolioClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Portafolio de Producción Audiovisual en Lima | Casos de Éxito | BLACKBOX',
  description: 'Explora nuestro portafolio de producción audiovisual en Lima: videos comerciales, reels 9:16 de alto impacto y spots publicitarios para marcas líderes en Perú.',
  alternates: {
    canonical: 'https://blackboxperu.com/portfolio',
  },
  openGraph: {
    title: 'Portafolio de Producción Audiovisual en Lima | Black Box Peru',
    description: 'Casos de éxito y portafolio audiovisual en Lima con resultados de negocio comprobados.',
    url: 'https://blackboxperu.com/portfolio',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return (
    <PortfolioClient />
  )
}
