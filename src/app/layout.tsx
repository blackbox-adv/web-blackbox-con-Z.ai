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
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Black Box Peru S.A.C.",
    "url": "https://blackboxperu.com",
    "areaServed": "Lima, Perú",
    "description": "Productora audiovisual y agencia de marketing digital en Lima"
  };

  return (
    <html lang="es-PE" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://blackboxperu.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
