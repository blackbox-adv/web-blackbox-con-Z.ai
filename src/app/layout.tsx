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
      }
    ]
  };

  return (
    <html lang="es-PE" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://blackboxperu.com" />
        <link
          rel="preload"
          as="image"
          href="/hero-poster.webp"
          type="image/webp"
          // @ts-expect-error fetchpriority attribute
          fetchpriority="high"
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
