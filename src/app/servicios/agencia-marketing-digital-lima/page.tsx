import type { Metadata } from 'next'
import Link from 'next/link'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { 
  Target, 
  BarChart, 
  CheckCircle2, 
  Phone, 
  ChevronRight, 
  Zap, 
  Megaphone 
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agencia de Marketing Digital en Lima | Black Box Peru',
  description: 'Agencia de marketing digital en Lima especializada en Meta Ads, TikTok Ads, creativos en video de alta conversión y captación directa hacia WhatsApp.',
  alternates: {
    canonical: 'https://blackboxperu.com/servicios/agencia-marketing-digital-lima',
  },
}

export default function AgenciaMarketingDigitalLimaPage() {
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
              Asesoría por WhatsApp
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
          <span className="text-gray-900 font-semibold">Agencia de Marketing Digital en Lima</span>
        </div>
      </div>

      {/* Hero Section Claro */}
      <section className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-bold text-purple-700 mb-6 shadow-xs">
            <Megaphone className="w-3.5 h-3.5 text-purple-600" />
            Estrategias de Crecimiento y Pauta Publicitaria
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-950 uppercase leading-[1.15] mb-6">
            Agencia de Marketing Digital en Lima
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            En <strong>Black Box Peru</strong> somos una <strong>agencia de marketing digital en Lima</strong> enfocada en resultados comerciales tangibles. Integramos producción audiovisual de alto impacto con campañas avanzadas de Meta Ads (Facebook e Instagram), TikTok Ads y embudos de captación directa hacia WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-base px-8 py-4 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              Solicitar Estrategia por WhatsApp
            </a>
            <Link
              href="/portafolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-base px-6 py-4 rounded-full border border-gray-200 transition-colors"
            >
              Ver Casos de Éxito
            </Link>
          </div>
        </div>
      </section>

      {/* Main SEO Article Content (Claro) */}
      <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            Estrategias Digitales Orientadas a la Conversión y Ventas Reales
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Como <strong>agencia de marketing digital en Lima</strong>, entendemos que las métricas de vanidad como los "me gusta" o las visualizaciones sin intención de compra no pagan las planillas de una empresa. Nuestra propuesta de valor combina el poder de creativos audiovisuales de nivel cinematográfico con una segmentación técnica milimétrica para generar clientes calificados que consulten y compren tus productos y servicios.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Trabajamos con empresas ubicadas en toda Lima Metropolitana y a nivel nacional, ayudándolas a optimizar su retorno de inversión publicitaria (ROAS) mediante estructuras de campañas escalables, pruebas A/B de anuncios en video, optimización de páginas de destino y capacitación en protocolos de cierre de ventas por WhatsApp.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <Target className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Meta Ads & TikTok Ads</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Configuración y gestión profesional de pauta publicitaria con creativos en video de alto enganche diseñados para reducir tu costo por contacto (CPL).
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <Zap className="w-8 h-8 text-amber-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Embudos hacia WhatsApp</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Diseñamos rutas directas para que los usuarios interesados lleguen a tu bandeja de WhatsApp con un mensaje predeterminado listo para cotizar.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-xs">
            <BarChart className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-950 mb-2">Medición y Optimización Continua</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Monitoreo diario de métricas clave, desactivación de creativos fatigados y reasignación de presupuesto hacia los anuncios más rentables.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6 bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            La Ventaja Competitiva de Black Box Peru en Marketing Digital
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            La mayoría de agencias digitales tradicionales tercerizan la producción de video o utilizan imágenes estáticas de stock que pasan desapercibidas en el feed. En Black Box Peru producimos nuestros propios videos comerciales y contenidos verticales, lo que nos permite testear rápidamente nuevas variaciones y mantener tus campañas siempre frescas y persuasivas:
          </p>
          <ul className="space-y-3.5 text-sm sm:text-base text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Creativos Audiovisuales Propios:</strong> Videos grabados profesionalmente en tu negocio con guion publicitario enfocado en ventas.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Configuración Técnica Avanzada:</strong> Píxel de Meta, API de Conversiones, verificación de dominio y eventos personalizados.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Enfoque Especializado por Sector:</strong> Experiencia comprobada en clínicas médicas, e-commerce, gastronomía, muebles e industria automotriz.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Reportes Claros y Transparentes:</strong> Informes quincenales y mensuales con métricas reales de clientes potenciales generados.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-wide">
            Especialistas en Marketing Digital para Empresas en Lima y Todo el Perú
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Brindamos asesoría estratégica a empresas de todos los sectores en Lima Metropolitana. Ya sea que busques captar pacientes para una clínica, vender productos de tu tienda virtual o incrementar el flujo de clientes en tu restaurante, diseñamos un plan de marketing digital a la medida de tus objetivos de crecimiento.
          </p>
        </section>

        {/* WhatsApp CTA Card Claro */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Impulsa las Ventas de tu Empresa con Marketing Digital
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Agenda una reunión estratégica con nuestro equipo y descubre cómo podemos potenciar tus resultados publicitarios.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-base sm:text-lg px-10 py-5 rounded-full shadow-lg transition-all hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Conversar con un Estratega de Marketing por WhatsApp
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
