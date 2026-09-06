'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BrandLogoProps {
  className?: string
  style?: React.CSSProperties
  alt?: string
  href?: string
}

function getStoredLogo(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = (
      localStorage.getItem('blackbox_cached_logo') ||
      localStorage.getItem('blackbox_brand_logo') ||
      localStorage.getItem('blackbox_custom_logo') ||
      null
    )
    if (!cached) return null
    // Clear out any old cached versions that contained the faulty '120,8' hexagon logo
    if (cached.includes('120,8')) {
      localStorage.removeItem('blackbox_cached_logo')
      localStorage.removeItem('blackbox_brand_logo')
      return null
    }
    if (cached.startsWith('data:') || cached.startsWith('/')) {
      return cached
    }
    return null
  } catch {
    return null
  }
}

export function BrandLogo({
  className = "h-14 sm:h-16 lg:h-20 w-auto object-contain max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] transition-transform group-hover:scale-105",
  style = { maxHeight: '80px', maxWidth: '420px', width: 'auto' },
  alt = "Black Box Peru",
  href = "/"
}: BrandLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    return getStoredLogo() || '/logo.svg'
  })
  const [brandName, setBrandName] = useState<string>(alt)

  const syncLogoFromApi = () => {
    fetch('/api/public/data')
      .then(res => res.json())
      .then(data => {
        if (data?.config?.brandLogo) {
          setLogoSrc(data.config.brandLogo)
          try {
            localStorage.setItem('blackbox_cached_logo', data.config.brandLogo)
            localStorage.setItem('blackbox_brand_logo', data.config.brandLogo)
          } catch {}
        }
        if (data?.config?.brandName) {
          setBrandName(data.config.brandName)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    const cached = getStoredLogo()
    if (cached) {
      setLogoSrc(cached)
    } else {
      setLogoSrc('/logo.svg')
    }

    syncLogoFromApi()

    // Real-time synchronization listener across tabs and page interactions
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'blackbox_cached_logo' || e.key === 'blackbox_brand_logo') {
        if (e.newValue) setLogoSrc(e.newValue)
      }
    }

    const handleCustomLogoEvent = (e: any) => {
      if (e.detail) {
        setLogoSrc(e.detail)
      } else {
        syncLogoFromApi()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('blackbox_logo_updated', handleCustomLogoEvent)

    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('blackbox_sync')
      bc.onmessage = (event) => {
        if (event.data?.type === 'logo_updated' && event.data?.logo) {
          setLogoSrc(event.data.logo)
        }
      }
    } catch {}

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('blackbox_logo_updated', handleCustomLogoEvent)
      if (bc) bc.close()
    }
  }, [])

  const imageElement = (
    <img
      src={logoSrc}
      alt={brandName}
      className={className}
      style={style}
      onError={(e) => {
        const target = e.currentTarget
        if (target.src !== '/logo.svg') {
          target.src = '/logo.svg'
        }
      }}
    />
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-3 group py-1.5" aria-label={brandName}>
        {imageElement}
      </Link>
    )
  }

  return imageElement
}
