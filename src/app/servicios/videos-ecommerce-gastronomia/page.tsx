import type { Metadata } from 'next'
import Link from 'next/link'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ShoppingBag, 
  Utensils, 
  CheckCircle2, 
  Phone, 
  ChevronRight, 
  Flame, 
  Eye 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Producción de Videos para E-commerce y Gastronomía en Lima | Black Box Peru',
  description: 'Producción de videos para e-commerce y gastronomía en Lima. Food styling, tomas macro 4K, unboxings y contenido vertical 9:16 para multiplicar ventas.',
  alternates: {
    canonical: 'https://blackboxperu.com/servicios/videos-ecommerce-gastronomia',
  },
}

export default function VideosEcommerceGastronomiaPage() {
  const waUrl = 'https://wa.me/51958297236?text=¡Hola%20Black%20Box!%20Vengo%20de%20su%20web%20y%20me%20gustaría%20cotizar%20un%20proyecto%20para%20mi%20marca.'

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 selection:bg-purple-500 selection:text-white">
      {/* Top Navbar Claro */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo.svg" 
              alt="Black Box Peru" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">Inicio</Link>
            <Link href="/servicios" className="text-purple-700 font-bold">Servicios</Link>
            <Link href="/portafolio" className="text-gray-600 hover:text-black transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-gray-600 hover:text-black transition-colors">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Cotizar Producción
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <Link href="/servicios" className="hover:text-black transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-900 font-semibold">Videos para E-commerce y Gastronomía</span>
        </div>
      </div>

      {/* Hero Section Claro */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-purple-700 mb-6 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Producción de Alto Deseo Visual & Food Styling
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 uppercase leading-[1.15] mb-6">
            Producción de Videos para E-commerce y Gastronomía en Lima
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            En <strong>Black Box Peru</strong> creamos <strong>videos para e-commerce y gastronomia en Lima</strong> con iluminación de detalle, macrofotografía y edición dinámica diseñada para despertar el apetito visual y acelerar las compras por internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              Cotizar Videos por WhatsApp
            </a>
            <Link
              href="/portafolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-base px-6 py-4 rounded-full border border-gray-200 transition-colors"
            >
              Ver Muestras Gastronómicas
            </Link>
          </div>
        </div>
      </section>

      {/* Main SEO Article Content (Claro) */}
      <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            Videos de Producto y Gastronomía que Estimulan los Sentidos y Multiplican las Ventas
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            En los sectores de comercio electrónico y restauración en Lima, la decisión de compra es profundamente visual y emocional. Un producto bien iluminado o un plato presentado con técnicas de food styling profesional, texturas en primer plano, humo aromático y colores vibrantes transmite frescura, exclusividad y calidad insuperable.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            En Black Box Peru desarrollamos piezas audiovisuales en 4K y 6K especializadas en <strong>videos para e-commerce</strong> (moda, accesorios, calzado, muebles, tecnología y productos para el hogar) y <strong>videos gastronómicos</strong> para restaurantes, cafeterías, bares, franquicias y dark kitchens en toda Lima Metropolitana.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <Utensils className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Food Styling & Tomas Macro</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Capturamos cada detalle de la cocina: preparación de insumos, flameados en sartén, salsas cayendo y emplatados de alta gama con óptica macro.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <ShoppingBag className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Videos Unboxing y Demostraciones</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mostramos los beneficios reales, acabados, empaques y modo de uso de tus productos para derribar objeciones y aumentar la tasa de conversión en tu tienda.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <Eye className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">UGC & Creativos para Meta Ads</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Formatos verticales 9:16 diseñados para TikTok y Reels que detienen el scroll del usuario y dirigen el tráfico a tu WhatsApp o pasarela de pago.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6 bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            ¿Por Qué Elegir Nuestro Servicio de Video para E-commerce y Restaurantes?
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Nuestro equipo combina directores de fotografía con experiencia en publicidad de alimentos y productos, asegurando resultados cinematográficos que destacan de inmediato en plataformas digitales:
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Iluminación Especializada para Alimentos y Productos:</strong> Softboxes, luces puntuales y reflectores que resaltan el brillo, volumen y frescura.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Grabación en Cámara Lenta (Slow Motion):</strong> Captura a 120fps y 240fps para verter salsas, servir bebidas y mostrar texturas irresistibles.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Diseño Sonoro Envolvente (ASMR Food):</strong> Efectos de audio nítidos del crujido, hervor y preparación que multiplican la sensación de realismo.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Paquetes Mensuales de Contenido Vertical:</strong> Packs de reels periódicos para mantener las redes de tu restaurante o tienda en constante actualización.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            Servicio para Marcas en Lima y Todo el Perú
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Coordinamos grabaciones directamente en tu cocina, restaurante, showroom o almacén con sets portátiles de iluminación y estaciones de monitoreo. Entregamos todo el contenido en resoluciones optimizadas para tu tienda online (Shopify, WooCommerce), catálogos digitales y campañas de pauta en Facebook, Instagram y TikTok Ads.
          </p>
        </section>

        {/* WhatsApp CTA Card Claro */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Haz que tus Productos y Platos se Vendan Solos
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Cuéntanos qué productos o platillos deseas promocionar y te preparamos una propuesta de producción audiovisual irresistible.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base sm:text-lg px-10 py-5 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Cotizar Producción Gastronómica por WhatsApp
            </a>
          </div>
        </section>
      </article>

      {/* Footer Claro */}
      <footer className="py-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
