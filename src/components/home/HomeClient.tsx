'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import HomeHero from './HomeHero'

import type { FloatingWhatsAppProps } from '../FloatingWhatsApp'

// Aggressive below-the-fold dynamic code splitting (chunks < 50KB each)
const HomeBrands = dynamic(() => import('./HomeBrands'), { ssr: false })
const HomeServices = dynamic(() => import('./HomeServices'), { ssr: false })
const HomeAbout = dynamic(() => import('./HomeAbout'), { ssr: false })
const HomeReels = dynamic(() => import('./HomeReels'), { ssr: false })
const HomePortfolio = dynamic(() => import('./HomePortfolio'), { ssr: false })
const HomeTestimonials = dynamic(() => import('./HomeTestimonials'), { ssr: false })
const HomeFaq = dynamic(() => import('./HomeFaq'), { ssr: false })
const HomeCta = dynamic(() => import('./HomeCta'), { ssr: false })
const HomeContact = dynamic(() => import('./HomeContact'), { ssr: false })
const HomeFooter = dynamic(() => import('./HomeFooter'), { ssr: false })
const VideoModal = dynamic(() => import('./VideoModal'), { ssr: false })
const FloatingWhatsApp = dynamic<FloatingWhatsAppProps>(() => import('../FloatingWhatsApp'), { ssr: false })

interface SiteConfig {
  brandName?: string
  brandLogo?: string | null
  brandIcon?: string | null
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  address?: string | null
}

export default function HomeClient() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [cachedLogo, setCachedLogo] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string
    platform: string
    title: string | null
  } | null>(null)

  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem('blackbox_cached_logo')
      if (savedLogo && !savedLogo.includes('120,8') && !savedLogo.includes('322, 196')) {
        setCachedLogo(savedLogo)
      }
      const savedConfig = localStorage.getItem('blackbox_cached_config')
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig))
      }
    } catch {}

    // Fetch site config in background without blocking initial hydration
    fetch('/api/public/data')
      .then((r) => r.json())
      .then((res) => {
        if (res?.config) {
          setConfig(res.config)
          if (res.config.brandLogo) {
            setCachedLogo(res.config.brandLogo)
            try {
              localStorage.setItem('blackbox_cached_logo', res.config.brandLogo)
              localStorage.setItem('blackbox_cached_config', JSON.stringify(res.config))
            } catch {}
          }
        }
      })
      .catch(() => {})
  }, [])

  const displayLogo = config?.brandLogo || cachedLogo || '/brand-logo-exact.webp'
  const cleanWhatsappNumber = (config?.whatsapp || config?.phone || '51958297236').replace(/\D/g, '') || '51958297236'

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-purple-600 selection:text-white">
      {/* 1. Critical LCP Hero section loaded immediately */}
      <HomeHero
        brandLogo={displayLogo}
        phone={config?.phone || '+51 958 297 236'}
        whatsapp={cleanWhatsappNumber}
        onOpenVideo={(vid) => setSelectedVideo(vid)}
      />

      {/* 2. Below-the-fold modules split into non-blocking dynamic chunks */}
      <HomeBrands />
      <HomeServices />
      <HomeAbout />
      <HomeReels
        whatsapp={cleanWhatsappNumber}
        phone={config?.phone || '+51 958 297 236'}
        onOpenVideo={(vid) => setSelectedVideo(vid)}
      />
      <HomePortfolio
        onOpenVideo={(vid) => setSelectedVideo(vid)}
      />
      <HomeTestimonials />
      <HomeFaq
        phone={config?.phone || '+51 958 297 236'}
        whatsapp={cleanWhatsappNumber}
      />
      <HomeCta
        whatsapp={cleanWhatsappNumber}
        phone={config?.phone || '+51 958 297 236'}
      />
      <HomeContact
        phone={config?.phone || '+51 958 297 236'}
        whatsapp={cleanWhatsappNumber}
        email={config?.email || 'contacto@blackboxperu.com'}
        address={config?.address || 'Lima, Perú'}
      />
      <HomeFooter
        brandLogo={displayLogo}
        phone={config?.phone || '+51 958 297 236'}
        email={config?.email || 'contacto@blackboxperu.com'}
        address={config?.address || 'Lima, Perú'}
      />

      {/* 3. Floating WhatsApp (deferred) */}
      <FloatingWhatsApp
        phone={config?.phone || '+51 958 297 236'}
        whatsapp={cleanWhatsappNumber}
        brandName={config?.brandName || 'Black Box'}
        brandLogo="/logo-icon.svg"
      />

      {/* 4. Video Modal on Demand */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          whatsapp={cleanWhatsappNumber}
        />
      )}
    </main>
  )
}
