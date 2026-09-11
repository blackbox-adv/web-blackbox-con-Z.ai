import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blackboxperu.com'
  const lastModified = new Date()

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
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/videoclips`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produccion-audiovisual`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/servicios/productora-audiovisual-lima`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/agencia-marketing-digital-lima`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/servicios/videos-ecommerce-gastronomia`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
