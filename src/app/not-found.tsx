import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-lg mx-auto space-y-6">
        <span className="text-sm font-bold text-zinc-500 tracking-widest uppercase block">Error 404</span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Página no encontrada
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          La página que buscas no existe. Vuelve al inicio de Black Box Perú.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-extrabold text-sm px-8 py-4 rounded-full transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
