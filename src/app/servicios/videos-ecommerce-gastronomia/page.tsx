import type { Metadata } from 'next'
import Link from 'next/link'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  ShoppingBag, 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  ChevronRight, 
  Flame, 
  Eye, 
  Camera, 
  TrendingUp, 
  Layers 
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-1.5">
            <img 
              src="/logo-white.svg" 
              alt="Black Box Peru" 
              className="h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105" 
              style={{ maxHeight: '80px', maxWidth: '420px', width: 'auto' }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Inicio</Link>
            <Link href="/servicios/videos-ecommerce-gastronomia" className="text-white font-medium">Servicios</Link>
            <Link href="/portafolio" className="text-zinc-400 hover:text-white transition-colors">Portafolio</Link>
            <Link href="/contacto" className="text-zinc-400 hover:text-white transition-colors">Contacto</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              Cotizar Producción
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <Link href="/servicios/videos-ecommerce-gastronomia" className="hover:text-white transition-colors">Servicios</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
          <span className="text-zinc-200 font-medium">Videos para E-commerce y Gastronomía</span>
        </div>
      </div>

      {/* Hero Section with exact H1 */}
      <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-zinc-200 mb-6">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Producción de Alto Deseo Visual & Food Styling
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.1] mb-6">
            Produccion de Videos para E-commerce y Gastronomia en Lima
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            En <strong>Black Box Peru</strong> creamos <strong>videos para e-commerce y gastronomia en Lima</strong> con iluminación de detalle, macrofotografía y edición dinámica diseñada para despertar el apetito visual y acelerar las compras por internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Cotizar Videos por WhatsApp
            </a>
            <Link
              href="/portafolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-base px-6 py-4 rounded-full border border-white/10 transition-colors"
            >
              Ver Muestras Gastronómicas
            </Link>
          </div>
        </div>
      </section>

      {/* Main SEO Article Content (450+ Words) */}
      <article className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            Videos de Producto y Gastronomía que Estimulan los Sentidos y Multiplican las Ventas
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            En los sectores de comercio electrónico y restauración en Lima, la decisión de compra es profundamente visual y emocional. Un producto bien iluminado o un plato presentado con técnicas de food styling profesional, texturas en primer plano, humo aromático y colores vibrantes transmite frescura, exclusividad y calidad insuperable.
          </p>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            En Black Box Peru desarrollamos piezas audiovisuales en 4K y 6K especializadas en <strong>videos para e-commerce</strong> (moda, accesorios, calzado, muebles, tecnología y productos para el hogar) y <strong>videos gastronómicos</strong> para restaurantes, cafeterías, bares, franquicias y dark kitchens en toda Lima Metropolitana.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <Utensils className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Food Styling & Tomas Macro</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Capturamos cada detalle de la cocina: preparación de insumos, flameados en sartén, salsas cayendo y emplatados de alta gama con óptica macro.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <ShoppingBag className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Videos Unboxing y Demostraciones</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Mostramos los beneficios reales, acabados, empaques y modo de uso de tus productos para derribar objeciones y aumentar la tasa de conversión en tu tienda.
            </p>
          </div>

          <div className="bg-zinc-950 border border-white/10 p-6 rounded-2xl">
            <Eye className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">UGC & Creativos para Meta Ads</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Formatos verticales 9:16 diseñados para TikTok y Reels que detienen el scroll del usuario y dirigen el tráfico a tu WhatsApp o pasarela de pago.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6 bg-zinc-950 border border-white/10 p-8 sm:p-10 rounded-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            ¿Por Qué Elegir Nuestro Servicio de Video para E-commerce y Restaurantes?
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Nuestro equipo combina directores de fotografía con experiencia en publicidad de alimentos y productos, asegurando resultados cinematográficos que destacan de inmediato en plataformas digitales:
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base text-zinc-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Iluminación Especializada para Alimentos y Productos:</strong> Softboxes, luces puntuales y reflectores que resaltan el brillo, volumen y frescura.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Grabación en Cámara Lenta (Slow Motion):</strong> Captura a 120fps y 240fps para verter salsas, servir bebidas y mostrar texturas irresistibles.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Diseño Sonoro Envolvente (ASMR Food):</strong> Efectos de audio nítidos del crujido, hervor y preparación que multiplican la sensación de realismo.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Paquetes Mensuales de Contenido Vertical:</strong> Packs de reels periódicos para mantener las redes de tu restaurante o tienda en constante actualización.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
            Servicio para Marcas en Lima y Todo el Perú
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Coordinamos grabaciones directamente en tu cocina, restaurante, showroom o almacén con sets portátiles de iluminación y estaciones de monitoreo. Entregamos todo el contenido en resoluciones optimizadas para tu tienda online (Shopify, WooCommerce), catálogos digitales y campañas de pauta en Facebook, Instagram y TikTok Ads.
          </p>
        </section>

        {/* WhatsApp CTA Card with exact requested WhatsApp URL */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-black border border-white/15 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase">
            Haz que tus Productos y Platos se Vendan Solos
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-base">
            Cuéntanos qué productos o platillos deseas promocionar y te preparamos una propuesta de producción audiovisual irresistible.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-base sm:text-lg px-10 py-5 rounded-full shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Cotizar Producción Gastronómica por WhatsApp
            </a>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Black Box Peru S.A.C. Todos los derechos reservados. Lima, Perú.</p>
      </footer>

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp phone="51958297236" brandName="Black Box Peru" />
    </div>
  )
}
