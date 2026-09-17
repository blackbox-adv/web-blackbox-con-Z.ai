'use client'

import React from 'react'
import Image from 'next/image'

interface Brand {
  id: string
  name: string
  logo: string | null
  color: string
}

interface HomeBrandsProps {
  brands?: Brand[]
}

const defaultBrands: Brand[] = [
  { id: '1', name: 'Makita', color: 'bg-red-600', logo: '/brands/makita.svg' },
  { id: '2', name: 'Clínica Avendaño', color: 'bg-purple-600', logo: '/brands/clinica-avendano.svg' },
  { id: '3', name: 'Leomar Muebles', color: 'bg-amber-600', logo: '/brands/leomar.svg' },
  { id: '4', name: 'LAP Custom', color: 'bg-blue-600', logo: '/brands/lap-custom.svg' },
  { id: '5', name: 'Burger & Eventos', color: 'bg-red-500', logo: '/brands/burger-eventos.svg' },
  { id: '6', name: 'Shaking Bar', color: 'bg-pink-600', logo: '/brands/shaking.svg' },
  { id: '7', name: 'Checor Edificios', color: 'bg-emerald-600', logo: '/brands/checor.svg' },
  { id: '8', name: 'Chalqui', color: 'bg-purple-500', logo: '/brands/chalqui.svg' },
  { id: '9', name: 'El Importador Perú', color: 'bg-blue-600', logo: '/brands/el-importador-peru.svg' },
  { id: '10', name: 'Momentum', color: 'bg-red-700', logo: '/brands/momentum.svg' },
]

export default function HomeBrands({ brands = defaultBrands }: HomeBrandsProps) {
  const brandList = brands.length > 0 ? brands : defaultBrands

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden contain-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-widest">
          Marcas y empresas líderes que confían en Black Box
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee items-center will-change-transform">
          {[...brandList, ...brandList].map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex items-center justify-center min-w-[200px] sm:min-w-[220px] mx-2 sm:mx-3">
              <div className="flex items-center justify-center w-48 sm:w-52 h-20 bg-gray-50/80 hover:bg-white rounded-2xl border border-gray-200/80 shadow-xs px-5 py-3 transition-colors">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`Logo de la marca ${brand.name}`}
                    width={160}
                    height={48}
                    loading="lazy"
                    className="max-h-10 sm:max-h-12 w-auto max-w-[170px] object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 ${brand.color || 'bg-black'} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
                      {brand.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-gray-800 font-bold text-sm whitespace-nowrap">{brand.name}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
