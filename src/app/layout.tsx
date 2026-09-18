import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DynamicFavicon } from "@/components/DynamicFavicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blackboxperu.com"),
  title: "Black Box Peru | Productora Audiovisual y Agencia de Marketing Digital en Lima",
  description: "Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.",
  keywords: [
    "Productora audiovisual Lima",
    "Agencia de marketing digital Lima",
    "Videos para marcas",
    "Videos para e-commerce Lima",
    "Videos gastronomia Lima",
    "Spots comerciales Lima",
    "Black Box Peru",
    "Black Box"
  ],
  authors: [{ name: "Black Box Peru S.A.C.", url: "https://blackboxperu.com" }],
  creator: "Black Box Peru",
  publisher: "Black Box Peru S.A.C.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://blackboxperu.com",
    languages: {
      "es-PE": "https://blackboxperu.com",
      "es": "https://blackboxperu.com",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico", "/favicon.png", "/favicon.svg"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Black Box Peru | Productora Audiovisual y Agencia de Marketing Digital en Lima",
    description: "Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.",
    url: "https://blackboxperu.com",
    siteName: "Black Box Peru",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Black Box Peru - Productora Audiovisual y Agencia de Marketing Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Box Peru | Productora Audiovisual y Agencia de Marketing Digital en Lima",
    description: "Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.",
    images: ["/og-image.png"],
    creator: "@blackbox_pe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://blackboxperu.com/#localbusiness",
        "name": "Black Box Peru - Productora Audiovisual en Lima",
        "alternateName": "BLACKBOX Films & Publicidad",
        "url": "https://blackboxperu.com",
        "logo": "https://blackboxperu.com/brand-logo-exact.png",
        "image": "https://blackboxperu.com/og-image.png",
        "telephone": "+51958297236",
        "priceRange": "$$",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+51958297236",
          "contactType": "sales",
          "availableLanguage": ["es", "Spanish"],
          "areaServed": "PE"
        },
        "knowsAbout": [
          "Producción Audiovisual",
          "Reels y TikTok para Empresas",
          "Spots Publicitarios",
          "Videoclips Musicales 4K",
          "Videos Corporativos e Institucionales",
          "Campañas de Publicidad Digital Meta Ads",
          "Marketing Digital en Lima Perú"
        ],
        "brand": [
          { "@type": "Brand", "name": "New Athletic" },
          { "@type": "Brand", "name": "Renzo Costa" },
          { "@type": "Brand", "name": "Hugo Boss" },
          { "@type": "Brand", "name": "Makita Perú" },
          { "@type": "Brand", "name": "Vizzano" }
        ],
        "areaServed": {
          "@type": "City",
          "name": "Lima",
          "containedInPlace": {
            "@type": "Country",
            "name": "Perú"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Arequipa",
          "addressLocality": "Lima",
          "addressRegion": "Lima",
          "postalCode": "15046",
          "addressCountry": "PE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -12.0464,
          "longitude": -77.0428
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "20:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/blackboxperu",
          "https://www.youtube.com/@blackboxadv",
          "https://www.tiktok.com/@blackboxperu",
          "https://www.facebook.com/blackboxperu"
        ],
        "description": "Productora audiovisual en Lima líder en creación de spots publicitarios, videos corporativos, reels de alto impacto y producción cinematográfica en 4K/6K."
      },
      {
        "@type": "VideoObject",
        "@id": "https://blackboxperu.com/#reel-oficial",
        "name": "Reel Oficial | Productora Audiovisual en Lima - Black Box",
        "description": "Reel recopilatorio de producciones comerciales y cinematográficas producidas por Black Box Peru en Lima.",
        "thumbnailUrl": ["https://i.ytimg.com/vi/bhgJlSKKv50/hqdefault.jpg"],
        "uploadDate": "2024-01-15T08:00:00-05:00",
        "contentUrl": "https://www.youtube.com/watch?v=bhgJlSKKv50",
        "embedUrl": "https://www.youtube.com/embed/bhgJlSKKv50"
      },
      {
        "@type": "VideoObject",
        "@id": "https://blackboxperu.com/#video-avendano",
        "name": "Producción Audiovisual Clínica Avendaño en Lima",
        "description": "Campaña de video vertical y testimoniales en Lima para Clínica Avendaño con más de 280 citas generadas.",
        "thumbnailUrl": ["https://img.youtube.com/vi/Su_JcYkeyLw/hqdefault.jpg"],
        "uploadDate": "2024-02-10T10:00:00-05:00",
        "contentUrl": "https://youtube.com/shorts/Su_JcYkeyLw",
        "embedUrl": "https://www.youtube.com/embed/Su_JcYkeyLw"
      },
      {
        "@type": "VideoObject",
        "@id": "https://blackboxperu.com/#video-makita",
        "name": "Producción Audiovisual Makita Perú en Lima",
        "description": "Reels de alto impacto B2B para herramientas profesionales de Makita Perú producidos en Lima.",
        "thumbnailUrl": ["https://img.youtube.com/vi/BaKc_hx3NwM/hqdefault.jpg"],
        "uploadDate": "2024-03-05T10:00:00-05:00",
        "contentUrl": "https://youtube.com/shorts/BaKc_hx3NwM",
        "embedUrl": "https://www.youtube.com/embed/BaKc_hx3NwM"
      },
      {
        "@type": "VideoObject",
        "@id": "https://blackboxperu.com/#video-terco92",
        "name": "Videoclip Oficial Terco 92 - Una Más | Black Box Films",
        "description": "Producción de videoclip cinematográfico 4K en Lima para el artista Terco 92.",
        "thumbnailUrl": ["https://i.ytimg.com/vi/vZANeQ4dhus/hqdefault.jpg"],
        "uploadDate": "2024-04-12T12:00:00-05:00",
        "contentUrl": "https://www.youtube.com/watch?v=vZANeQ4dhus",
        "embedUrl": "https://www.youtube.com/embed/vZANeQ4dhus"
      },
      {
        "@type": "FAQPage",
        "@id": "https://blackboxperu.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Por qué elegir a Black Box Perú como tu productora audiovisual en Lima?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "En Black Box combinamos dirección cinematográfica en 4K/6K con una visión publicitaria centrada en conversión y ventas. No solo hacemos tomas estéticas: estructuramos narrativas con ganchos de retención psicológica (hook-story-offer) para que cada video conecte con tu cliente ideal y posicione a tu marca por encima de la competencia en el mercado peruano."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo funciona la producción de contenido vertical para TikTok e Instagram Reels?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Desarrollamos paquetes mensuales de contenido diseñados para empresas y marcas que necesitan presencia constante y relevante. Nuestro equipo se encarga de la investigación de tendencias en tu rubro, redacción de guiones comerciales, jornada de rodaje en estudio o locación con iluminación profesional, edición dinámica con subtítulos optimizados para retención y formatos listos para pauta en Meta Ads y TikTok Ads."
            }
          },
          {
            "@type": "Question",
            "name": "¿Qué equipamiento y estándares de calidad técnica utilizan en los rodajes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Filmamos con cámaras de cine digital de alta gama con resolución nativa 4K y 6K, ópticas cinematográficas de apertura luminosa, sistemas de iluminación LED continua y RGB escénica, microfonía inalámbrica de solapa y cañón de estudio, y estaciones de corrección de color en DaVinci Resolve para garantizar acabados de nivel televisión y cine."
            }
          },
          {
            "@type": "Question",
            "name": "¿Cómo puedo cotizar un proyecto audiovisual o paquete de videos en Lima?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes solicitar una cotización personalizada de forma inmediata a través de nuestro WhatsApp oficial (+51 958 297 236) o enviándonos un mensaje en el formulario web. Analizamos tu requerimiento en menos de 24 horas, coordinamos una llamada o reunión presencial en Lima y te presentamos un cronograma de producción a la medida de tu presupuesto."
            }
          },
          {
            "@type": "Question",
            "name": "¿Con qué marcas y sectores han trabajado en Perú?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A lo largo de más de 8 años en Lima, hemos producido piezas audiovisuales y campañas de pauta para marcas nacionales e internacionales como New Athletic, Renzo Costa, Hugo Boss, Vizzano, Makita Perú, y centros de salud como Clínica Avendaño (con más de 280 citas generadas en una sola campaña), además de destacados artistas de la escena musical nacional."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="es-PE" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://blackboxperu.com" />
        <link rel="alternate" type="text/plain" href="https://blackboxperu.com/llms.txt" title="LLMs Context" />
        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { color-scheme: light; }
            html, body { background-color: #ffffff; color: #111827; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
            .hero-poster-preload { aspect-ratio: 9/16; background-color: #09090b; }
            .contain-content { content-visibility: auto; contain-intrinsic-size: 1px 700px; }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 selection:bg-purple-500 selection:text-white`}
      >
        <DynamicFavicon />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
