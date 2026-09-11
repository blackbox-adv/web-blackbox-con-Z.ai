import type { Metadata } from 'next'
import HomeClient from '@/components/home/HomeClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Productora Audiovisual en Lima | Videos Comerciales que Venden | BLACKBOX',
  description: 'Productora audiovisual en Lima especializada en spots publicitarios, videos corporativos y contenido vertical 9:16 en 4K/6K diseñados para vender más.',
  alternates: {
    canonical: 'https://blackboxperu.com',
  },
  openGraph: {
    title: 'Productora Audiovisual en Lima | Videos Comerciales que Venden | BLACKBOX',
    description: 'Productora audiovisual en Lima especializada en spots publicitarios, videos corporativos y contenido vertical 9:16 en 4K/6K diseñados para vender más.',
    url: 'https://blackboxperu.com',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <HomeClient />
  )
}
