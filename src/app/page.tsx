import type { Metadata } from 'next'
import HomeClient from '@/components/home/HomeClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Agencia de Marketing Digital y Productora Audiovisual en Lima | Videos que Venden | BLACKBOX',
  description: 'Agencia de marketing digital y productora audiovisual en Lima. Videos para redes, reels, TikTok, ads y catálogos digitales con Yape/Plin que generan ventas.',
  alternates: {
    canonical: 'https://blackboxperu.com',
  },
  openGraph: {
    title: 'Agencia de Marketing Digital y Productora Audiovisual en Lima | Videos que Venden | BLACKBOX',
    description: 'Agencia de marketing digital y productora audiovisual en Lima. Videos para redes, reels, TikTok, ads y catálogos digitales con Yape/Plin que generan ventas.',
    url: 'https://blackboxperu.com',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <HomeClient />
  )
}
