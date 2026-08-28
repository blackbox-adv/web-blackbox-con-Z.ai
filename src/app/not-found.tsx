import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md w-full mx-auto bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl shadow-xs space-y-6">
        <Link href="/" className="inline-block">
          <img src="/logo.svg" alt="Black Box Peru" className="h-12 w-auto mx-auto object-contain" />
        </Link>
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase block">Error 404</span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
          Página no encontrada
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          La página que buscas no existe. Vuelve al inicio de Black Box Perú.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
