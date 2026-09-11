import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://blackboxperu.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/admin'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
