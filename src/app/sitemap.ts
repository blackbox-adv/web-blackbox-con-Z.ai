import { MetadataRoute } from 'next'
import { SERVICES_DATA } from '@/data/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.blackboxperu.com'
  const lastModified = new Date()

  const serviceUrls = Object.keys(SERVICES_DATA).map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
  ]
}

