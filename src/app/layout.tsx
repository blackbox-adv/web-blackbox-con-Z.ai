import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { DynamicFavicon } from "@/components/DynamicFavicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blackboxperu.com"),
  title: "Black Box | Productora Audiovisual & Agencia de Marketing en Lima, Perú",
  description: "Productora audiovisual y agencia de marketing digital líder en Lima, Perú. Especialistas en videos de alto impacto para marcas: E-commerce, Gastronomía, Spots Publicitarios y Contenido Vertical 9:16 para TikTok y Reels.",
  keywords: [
    "Productora audiovisual Lima",
    "Productora audiovisual Perú",
    "Agencia de marketing digital Lima",
    "Videos corporativos Perú",
    "Videos gastronómicos Lima",
    "Videos para E-commerce",
    "Creación de reels y tiktok marcas",
    "Comerciales publicitarios Perú",
    "Black Box",
    "Black Box Perú"
  ],
  authors: [{ name: "Black Box Team", url: "https://www.blackboxperu.com" }],
  creator: "Black Box",
  publisher: "Black Box",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.blackboxperu.com",
    languages: {
      "es-PE": "https://www.blackboxperu.com",
      "es": "https://www.blackboxperu.com",
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
    title: "Black Box | Productora Audiovisual & Marketing Digital",
    description: "Impulsamos tu marca con contenido audiovisual de alto impacto. Producción 4K/6K en Lima, Perú para E-commerce, Gastronomía y Campañas Digitales.",
    url: "https://www.blackboxperu.com",
    siteName: "Black Box Perú",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Black Box - Productora Audiovisual y Agencia Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Box | Productora Audiovisual en Lima, Perú",
    description: "Contenido audiovisual que vende y posiciona tu marca. Videos comerciales, gastronómicos, e-commerce y corporativos.",
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
  // Schema.org Structured Data for Google Rich Snippets (LocalBusiness + Organization)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
    name: "Black Box",
    alternateName: ["Black Box Perú", "Blackbox Agencia", "Black Box Productora Audiovisual"],
    url: "https://www.blackboxperu.com",
    logo: "https://www.blackboxperu.com/logo-blackbox-exact.svg",
    image: "https://www.blackboxperu.com/og-image.png",
    description: "Productora audiovisual y agencia de marketing digital en Lima, Perú especializada en videos comerciales, gastronómicos, e-commerce y contenido publicitario de alta conversión.",
    telephone: "+51958297236",
    email: "contacto@blackboxperu.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lima",
      addressRegion: "Lima",
      addressCountry: "PE"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -12.046374,
      longitude: -77.042793
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00"
    },
    sameAs: [
      "https://instagram.com/blackbox_pe",
      "https://tiktok.com/@blackbox_pe",
      "https://facebook.com",
      "https://youtube.com"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Producción y Marketing",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Producción Audiovisual Comercial y Publicitaria"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Contenido Vertical 9:16 para Reels y TikTok"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Estrategias de Marketing Digital y Pauta Publicitaria"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Videos Gastronómicos, E-commerce e Inmobiliarios"
          }
        }
      ]
    }
  };

  return (
    <html lang="es-PE" className="scroll-smooth" suppressHydrationWarning>
      <head>
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
