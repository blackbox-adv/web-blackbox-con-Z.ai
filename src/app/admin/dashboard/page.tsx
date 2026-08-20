'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LogOut, Save, Plus, Trash2, Edit, ExternalLink, Globe, Users, Briefcase, 
  Building2, Settings, Eye, EyeOff, ChevronUp, ChevronDown, Image as ImageIcon, Video, 
  MessageSquare, Star, Loader2, CheckCircle, AlertCircle, Instagram, Linkedin, 
  Twitter, Facebook, Youtube, Play, Upload, X, RefreshCw
} from 'lucide-react'

interface SiteConfig {
  id: string
  // Marca
  brandName: string
  brandLogo: string | null
  brandIcon: string | null
  primaryColor: string
  secondaryColor: string
  // SEO
  siteTitle: string
  siteDescription: string
  siteKeywords: string
  ogImage?: string | null
  // Contacto
  phone: string
  email: string
  address: string
  whatsapp: string
  // Redes Sociales
  facebook: string | null
  instagram: string | null
  twitter: string | null
  linkedin: string | null
  tiktok: string | null
  youtube: string | null
  // Hero & Reels
  heroReelUrl?: string | null
  heroReelTitle?: string | null
  heroClients?: string | null
  heroProjects?: string | null
  heroYears?: string | null
  heroAwards?: string | null
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  image: string | null
  rating: number
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface Project {
  id: string
  title: string
  category: string
  result: string
  description: string | null
  gradient: string
  driveUrl: string
  imageUrl: string
  order: number
  active: boolean
  videos: Video[]
  createdAt?: Date
  updatedAt?: Date
}

interface Video {
  id: string
  title: string | null
  platform: string
  url: string
  embedUrl: string | null
  thumbnail: string | null
  order: number
  active: boolean
}

interface Brand {
  id: string
  name: string
  logo: string | null
  color: string
  website: string | null
  order: number
  active: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Data states
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  // Form states
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Función para recortar bordes vacíos/transparentes automáticamente
  const trimTransparentBorders = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      if (!file.type.includes('image') || file.type.includes('svg')) {
        return resolve(file)
      }
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return resolve(file)
          
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const { data, width, height } = imgData
          
          let minX = width, minY = height, maxX = 0, maxY = 0
          let hasContent = false
          
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const index = (y * width + x) * 4
              const alpha = data[index + 3]
              if (alpha > 15) {
                if (x < minX) minX = x
                if (x > maxX) maxX = x
                if (y < minY) minY = y
                if (y > maxY) maxY = y
                hasContent = true
              }
            }
          }
          
          if (!hasContent || maxX <= minX || maxY <= minY) {
            return resolve(file)
          }
          
          const pad = 4
          minX = Math.max(0, minX - pad)
          minY = Math.max(0, minY - pad)
          maxX = Math.min(width, maxX + pad)
          maxY = Math.min(height, maxY + pad)
          
          const cropW = maxX - minX
          const cropH = maxY - minY
          
          const cropCanvas = document.createElement('canvas')
          cropCanvas.width = cropW
          cropCanvas.height = cropH
          const cropCtx = cropCanvas.getContext('2d')
          if (!cropCtx) return resolve(file)
          
          cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH)
          
          cropCanvas.toBlob((blob) => {
            if (blob) {
              const croppedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".png", { type: 'image/png' })
              resolve(croppedFile)
            } else {
              resolve(file)
            }
          }, 'image/png')
        } catch {
          resolve(file)
        }
      }
      img.onerror = () => resolve(file)
    })
  }

  // Función para subir archivos (Ultra-robusta con fallback inmediato a DataURL si es necesario)
  const uploadFile = async (file: File, type?: string): Promise<string | null> => {
    setUploading(true)
    try {
      // Auto-recortar márgenes si es logo
      const fileToUpload = (type === 'logo' || file.name.toLowerCase().includes('logo')) 
        ? await trimTransparentBorders(file) 
        : file

      // 1. Intentar subir al servidor
      const res = await fetch(`/api/upload-blob?filename=${encodeURIComponent(fileToUpload.name)}`, {
        method: 'POST',
        body: fileToUpload,
      })
      
      if (res.ok) {
        const data = await res.json()
        if (data && data.url) {
          return data.url
        }
      }
      
      // 2. Fallback garantizado a Base64 DataURL (funciona 100% en cualquier navegador/entorno)
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(fileToUpload)
      })
    } catch (err: any) {
      console.warn('Fallback a FileReader local:', err)
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    } finally {
      setUploading(false)
    }
  }

  // Manejar selección de archivo para logo de marca
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const url = await uploadFile(file, 'brands')
    if (url) {
      setEditingBrand(prev => prev ? { ...prev, logo: url } : null)
      setMessage({ type: 'success', text: 'Logo cargado exitosamente' })
    }
    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth/verify')
      if (!res.ok) {
        router.push('/admin')
        return
      }
      await loadData()
    } catch {
      router.push('/admin')
    } finally {
      setIsLoading(false)
    }
  }

  const loadData = async () => {
    const [configRes, testimonialsRes, projectsRes, brandsRes] = await Promise.all([
      fetch('/api/admin/config'),
      fetch('/api/admin/testimonials'),
      fetch('/api/admin/projects'),
      fetch('/api/admin/brands')
    ])
    
    if (configRes.ok) setConfig(await configRes.json())
    if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json())
    if (projectsRes.ok) setProjects(await projectsRes.json())
    if (brandsRes.ok) setBrands(await brandsRes.json())
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const saveConfig = async () => {
    if (!config) return
    setSaving('config')
    try {
      // Clean data: Ensure empty strings are saved as null to avoid broken images
      const configToSave = {
        ...config,
        brandLogo: config.brandLogo === "" ? null : config.brandLogo,
        brandIcon: config.brandIcon === "" ? null : config.brandIcon,
        ogImage: config.ogImage === "" ? null : config.ogImage,
      }
      
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configToSave)
      })
      if (res.ok) {
        if (typeof window !== 'undefined') {
          try {
            if (configToSave.brandLogo) {
              localStorage.setItem('blackbox_cached_logo', configToSave.brandLogo)
            } else {
              localStorage.removeItem('blackbox_cached_logo')
            }
          } catch (e) {}
        }
        setMessage({ type: 'success', text: 'Configuración guardada' })
      } else {
        setMessage({ type: 'error', text: 'Error al guardar' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión' })
    }
    setSaving(null)
  }

  const saveTestimonial = async (data: Partial<Testimonial>) => {
    setSaving('testimonial')
    try {
      const url = editingTestimonial?.id 
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : '/api/admin/testimonials'
      const method = editingTestimonial?.id ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (res.ok) {
        await loadData()
        setEditingTestimonial(null)
        setMessage({ type: 'success', text: 'Testimonio guardado' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar' })
    }
    setSaving(null)
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('¿Eliminar este testimonio?')) return
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    setTestimonials(testimonials.filter(t => t.id !== id))
    setMessage({ type: 'success', text: 'Testimonio eliminado' })
  }

  const saveProject = async (data: Partial<Project>) => {
    setSaving('project')
    try {
      const url = editingProject?.id 
        ? `/api/admin/projects/${editingProject.id}`
        : '/api/admin/projects'
      const method = editingProject?.id ? 'PUT' : 'POST'
      
      // Clean data to avoid Prisma errors
      const { id: _id, videos: _v, createdAt: _c, updatedAt: _u, ...saveData } = data
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      })
      
      if (res.ok) {
        await loadData()
        setEditingProject(null)
        setMessage({ type: 'success', text: 'Proyecto guardado' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar' })
    }
    setSaving(null)
  }

  const deleteProject = async (id: string) => {
    if (!confirm('¿Eliminar este proyecto?')) return
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    setProjects(projects.filter(p => p.id !== id))
    setMessage({ type: 'success', text: 'Proyecto eliminado' })
  }

  const saveBrand = async (data: Partial<Brand>) => {
    setSaving('brand')
    try {
      const url = editingBrand?.id 
        ? `/api/admin/brands/${editingBrand.id}`
        : '/api/admin/brands'
      const method = editingBrand?.id ? 'PUT' : 'POST'
      
      // Ensure empty logo is null
      const brandToSave = {
        ...data,
        logo: data.logo === "" ? null : data.logo
      }
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandToSave)
      })
      
      if (res.ok) {
        await loadData()
        setEditingBrand(null)
        setMessage({ type: 'success', text: 'Marca guardada' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar' })
    }
    setSaving(null)
  }

  const deleteBrand = async (id: string) => {
    if (!confirm('¿Eliminar esta marca?')) return
    await fetch(`/api/admin/brands/${id}`, { method: 'DELETE' })
    setBrands(brands.filter(b => b.id !== id))
    setMessage({ type: 'success', text: 'Marca eliminada' })
  }

  const saveVideo = async (data: Partial<Video>) => {
    if (!selectedProjectId) return
    setSaving('video')
    try {
      const url = editingVideo?.id 
        ? `/api/admin/videos/${editingVideo.id}`
        : '/api/admin/videos'
      const method = editingVideo?.id ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, projectId: selectedProjectId })
      })
      
      if (res.ok) {
        await loadData()
        setEditingVideo(null)
        setMessage({ type: 'success', text: 'Video guardado' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar' })
    }
    setSaving(null)
  }

  const deleteVideo = async (id: string) => {
    if (!confirm('¿Eliminar este video?')) return
    await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' })
    await loadData()
    setMessage({ type: 'success', text: 'Video eliminado' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="Black Box" 
              className="h-9 w-auto object-contain max-w-[170px]" 
              onError={(e) => {
                const target = e.currentTarget
                target.src = '/logo.svg'
              }}
            />
            <div className="border-l border-gray-300 pl-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Panel de Control</span>
              <span className="text-xs text-gray-700 font-semibold">Administración</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => window.open('/', '_blank')} className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Ver Sitio
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="bg-white shadow-sm rounded-xl p-1">
            <TabsTrigger value="brand" className="gap-2 rounded-lg"><Settings className="w-4 h-4" /> Marca</TabsTrigger>
            <TabsTrigger value="seo" className="gap-2 rounded-lg"><Globe className="w-4 h-4" /> SEO</TabsTrigger>
            <TabsTrigger value="social" className="gap-2 rounded-lg"><Users className="w-4 h-4" /> Redes Sociales</TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2 rounded-lg"><MessageSquare className="w-4 h-4" /> Testimonios</TabsTrigger>
            <TabsTrigger value="projects" className="gap-2 rounded-lg"><Briefcase className="w-4 h-4" /> Portfolio</TabsTrigger>
            <TabsTrigger value="brands" className="gap-2 rounded-lg"><Building2 className="w-4 h-4" /> Clientes</TabsTrigger>
          </TabsList>

          {/* Brand Tab */}
          <TabsContent value="brand">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Configuración de Marca
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nombre de la marca */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Identidad</h3>
                    <div className="space-y-2">
                      <Label>Nombre de la marca</Label>
                      <Input 
                        placeholder="Ej: Blackbox, MiEmpresa, etc." 
                        value={config?.brandName || ''} 
                        onChange={(e) => setConfig(prev => prev ? {...prev, brandName: e.target.value} : null)} 
                      />
                      <p className="text-xs text-gray-500">Este nombre aparecerá en el logo y en todo el sitio</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Título del sitio (SEO)</Label>
                      <Input 
                        value={config?.siteTitle || ''} 
                        onChange={(e) => setConfig(prev => prev ? {...prev, siteTitle: e.target.value} : null)} 
                      />
                    </div>
                  </div>
                  
                  {/* Logos y Icono */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Identidad Visual</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Logo */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>Logo de la marca (Cabecera)</Label>
                              <span className="text-[11px] text-gray-500 font-medium">Recomendado: PNG horizontal transparente</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-36 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden shadow-inner p-2">
                                {config?.brandLogo ? (
                                    <img src={config.brandLogo} alt="Logo" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-center">
                                    <div 
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-1"
                                        style={{ backgroundColor: config?.primaryColor || '#9333ea' }}
                                    >
                                        {config?.brandName?.substring(0, 1).toUpperCase() || 'B'}
                                    </div>
                                    <span className="text-[10px] text-gray-400">Sin logo</span>
                                    </div>
                                )}
                                </div>
                                <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.onchange = async (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) {
                                        const url = await uploadFile(file, 'logo');
                                        if (url) {
                                            setConfig(prev => prev ? {...prev, brandLogo: url} : null);
                                        }
                                        }
                                    };
                                    input.click();
                                    }}
                                    disabled={uploading}
                                    className="h-8 text-xs gap-2"
                                >
                                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                    Subir Logo
                                </Button>
                                {config?.brandLogo && (
                                    <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConfig(prev => prev ? {...prev, brandLogo: null} : null)}
                                    className="h-6 text-[10px] text-red-500 hover:text-red-600"
                                    >
                                    <X className="w-3 h-3 mr-1" /> Quitar
                                    </Button>
                                )}
                                </div>
                            </div>
                        </div>

                        {/* Icono */}
                        <div className="space-y-2">
                            <Label>Icono (Favicon)</Label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white overflow-hidden shadow-inner">
                                {config?.brandIcon ? (
                                    <img src={config.brandIcon} alt="Icon" className="w-full h-full object-contain p-4" />
                                ) : (
                                    <div className="text-center">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-1">
                                        <ImageIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] text-gray-400">Sin icono</span>
                                    </div>
                                )}
                                </div>
                                <div className="flex flex-col gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.onchange = async (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) {
                                        const url = await uploadFile(file);
                                        if (url) {
                                            setConfig(prev => prev ? {...prev, brandIcon: url} : null);
                                        }
                                        }
                                    };
                                    input.click();
                                    }}
                                    disabled={uploading}
                                    className="h-8 text-xs gap-2"
                                >
                                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                    Subir Icono
                                </Button>
                                {config?.brandIcon && (
                                    <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConfig(prev => prev ? {...prev, brandIcon: null} : null)}
                                    className="h-6 text-[10px] text-red-500 hover:text-red-600"
                                    >
                                    <X className="w-3 h-3 mr-1" /> Quitar
                                    </Button>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-500 italic">Recomendado: Logo horizontal 400x120px, Icono cuadrado 64x64px.</p>
                  </div>
                </div>
                
                {/* Colores */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Colores de la Marca</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Color Principal</Label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={config?.primaryColor || '#9333ea'}
                          onChange={(e) => setConfig(prev => prev ? {...prev, primaryColor: e.target.value} : null)}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200"
                        />
                        <Input 
                          value={config?.primaryColor || '#9333ea'}
                          onChange={(e) => setConfig(prev => prev ? {...prev, primaryColor: e.target.value} : null)}
                          placeholder="#9333ea"
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Se usa para botones, enlaces y elementos destacados</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Color Secundario</Label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={config?.secondaryColor || '#f97316'}
                          onChange={(e) => setConfig(prev => prev ? {...prev, secondaryColor: e.target.value} : null)}
                          className="w-12 h-12 rounded-lg cursor-pointer border border-gray-200"
                        />
                        <Input 
                          value={config?.secondaryColor || '#f97316'}
                          onChange={(e) => setConfig(prev => prev ? {...prev, secondaryColor: e.target.value} : null)}
                          placeholder="#f97316"
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500">Se usa para acentos y elementos complementarios</p>
                    </div>
                  </div>
                  
                  {/* Vista previa */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-600 mb-3">Vista previa:</p>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: config?.primaryColor || '#9333ea' }}
                      >
                        {config?.brandName?.substring(0, 1).toUpperCase() || 'B'}
                      </div>
                      <div>
                        <span className="font-bold text-lg text-gray-900">
                          {config?.brandName || 'Black'}<span style={{ color: config?.primaryColor || '#9333ea' }}>box</span>
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        style={{ backgroundColor: config?.primaryColor || '#9333ea' }}
                        className="text-white"
                      >
                        Botón Principal
                      </Button>
                      <Button 
                        size="sm" 
                        style={{ backgroundColor: config?.secondaryColor || '#f97316' }}
                        className="text-white"
                      >
                        Botón Secundario
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button onClick={saveConfig} disabled={saving === 'config'} className="bg-purple-600 hover:bg-purple-700">
                  {saving === 'config' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Guardar Configuración de Marca
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  Configuración SEO y Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">SEO</h3>
                    <div className="space-y-2">
                      <Label>Título del Sitio</Label>
                      <Input value={config?.siteTitle || ''} onChange={(e) => setConfig(prev => prev ? {...prev, siteTitle: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea value={config?.siteDescription || ''} onChange={(e) => setConfig(prev => prev ? {...prev, siteDescription: e.target.value} : null)} rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label>Palabras Clave (separadas por coma)</Label>
                      <Input value={config?.siteKeywords || ''} onChange={(e) => setConfig(prev => prev ? {...prev, siteKeywords: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Imagen para Redes Sociales (OG Image)</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-inner">
                            {config?.ogImage ? (
                                <img src={config.ogImage} alt="OG" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                                    <span className="text-[10px]">Sin imagen</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*';
                                    input.onchange = async (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) {
                                            const url = await uploadFile(file);
                                            if (url) {
                                                setConfig(prev => prev ? {...prev, ogImage: url} : null);
                                            }
                                        }
                                    };
                                    input.click();
                                }}
                                disabled={uploading}
                                className="h-8 text-xs gap-2"
                            >
                                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                Subir Imagen
                            </Button>
                            {config?.ogImage && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setConfig(prev => prev ? {...prev, ogImage: null} : null)}
                                    className="h-6 text-[10px] text-red-500 hover:text-red-600"
                                >
                                    <X className="w-3 h-3 mr-1" /> Quitar
                                </Button>
                            )}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 italic">Ideal: 1200x630px JPG.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Contacto</h3>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input value={config?.phone || ''} onChange={(e) => setConfig(prev => prev ? {...prev, phone: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp (sin +, solo números)</Label>
                      <Input value={config?.whatsapp || ''} onChange={(e) => setConfig(prev => prev ? {...prev, whatsapp: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={config?.email || ''} onChange={(e) => setConfig(prev => prev ? {...prev, email: e.target.value} : null)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Dirección</Label>
                      <Input value={config?.address || ''} onChange={(e) => setConfig(prev => prev ? {...prev, address: e.target.value} : null)} />
                    </div>
                  </div>
                </div>
                <Button onClick={saveConfig} disabled={saving === 'config'} className="bg-purple-600 hover:bg-purple-700">
                  {saving === 'config' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Redes Sociales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Facebook className="w-4 h-4 text-blue-600" /> Facebook</Label>
                    <Input placeholder="https://facebook.com/tu-pagina" value={config?.facebook || ''} onChange={(e) => setConfig(prev => prev ? {...prev, facebook: e.target.value} : null)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-600" /> Instagram</Label>
                    <Input placeholder="https://instagram.com/tu-cuenta" value={config?.instagram || ''} onChange={(e) => setConfig(prev => prev ? {...prev, instagram: e.target.value} : null)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Twitter className="w-4 h-4 text-sky-500" /> Twitter/X</Label>
                    <Input placeholder="https://twitter.com/tu-cuenta" value={config?.twitter || ''} onChange={(e) => setConfig(prev => prev ? {...prev, twitter: e.target.value} : null)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn</Label>
                    <Input placeholder="https://linkedin.com/company/tu-empresa" value={config?.linkedin || ''} onChange={(e) => setConfig(prev => prev ? {...prev, linkedin: e.target.value} : null)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Video className="w-4 h-4 text-black" /> TikTok</Label>
                    <Input placeholder="https://tiktok.com/@tu-cuenta" value={config?.tiktok || ''} onChange={(e) => setConfig(prev => prev ? {...prev, tiktok: e.target.value} : null)} />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Youtube className="w-4 h-4 text-red-600" /> YouTube</Label>
                    <Input placeholder="https://youtube.com/@tu-canal" value={config?.youtube || ''} onChange={(e) => setConfig(prev => prev ? {...prev, youtube: e.target.value} : null)} />
                  </div>
                </div>
                <Button onClick={saveConfig} disabled={saving === 'config'} className="bg-purple-600 hover:bg-purple-700">
                  {saving === 'config' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Guardar Redes Sociales
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Testimonios de Clientes
                </CardTitle>
                <Button onClick={() => setEditingTestimonial({ id: '', name: '', role: '', company: '', quote: '', image: '', rating: 5, order: 0, active: true })} className="bg-purple-600">
                  <Plus className="w-4 h-4 mr-2" /> Nuevo
                </Button>
              </CardHeader>
              <CardContent>
                {editingTestimonial && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-4">{editingTestimonial.id ? 'Editar' : 'Nuevo'} Testimonio</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Nombre" value={editingTestimonial.name} onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})} />
                      <Input placeholder="Cargo" value={editingTestimonial.role} onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})} />
                      <Input placeholder="Empresa" value={editingTestimonial.company} onChange={(e) => setEditingTestimonial({...editingTestimonial, company: e.target.value})} />
                      <div className="space-y-2">
                        <Label>Foto del testimonio</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-white overflow-hidden">
                            {editingTestimonial.image ? (
                              <img src={editingTestimonial.image} alt="Testimonio" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = async (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0];
                                  if (file) {
                                    const url = await uploadFile(file, 'testimonials');
                                    if (url) {
                                      setEditingTestimonial(prev => prev ? {...prev, image: url} : null);
                                    }
                                  }
                                };
                                input.click();
                              }}
                              disabled={uploading}
                              className="gap-2"
                            >
                              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                              {uploading ? 'Subiendo...' : 'Subir Foto'}
                            </Button>
                            {editingTestimonial.image && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingTestimonial(prev => prev ? {...prev, image: ''} : null)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4 mr-1" /> Quitar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Input type="number" min="1" max="5" placeholder="Rating (1-5)" value={editingTestimonial.rating} onChange={(e) => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})} />
                      <Input type="number" placeholder="Orden" value={editingTestimonial.order} onChange={(e) => setEditingTestimonial({...editingTestimonial, order: parseInt(e.target.value)})} />
                      <Textarea className="md:col-span-2" placeholder="Testimonio" value={editingTestimonial.quote} onChange={(e) => setEditingTestimonial({...editingTestimonial, quote: e.target.value})} rows={3} />
                      <div className="md:col-span-2 flex items-center gap-2">
                        <Switch checked={editingTestimonial.active} onCheckedChange={(checked) => setEditingTestimonial({...editingTestimonial, active: checked})} />
                        <Label>Activo</Label>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => saveTestimonial(editingTestimonial)} disabled={saving === 'testimonial'}>
                        {saving === 'testimonial' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={() => setEditingTestimonial(null)}>Cancelar</Button>
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className={`p-4 border rounded-lg flex items-start justify-between ${t.active ? 'bg-white' : 'bg-gray-100 opacity-60'}`}>
                      <div className="flex gap-4">
                        {t.image && <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />}
                        <div>
                          <p className="font-semibold">{t.name} <span className="font-normal text-gray-500">- {t.role}</span></p>
                          <p className="text-sm text-gray-600">{t.company}</p>
                          <p className="text-sm mt-1">"{t.quote}"</p>
                          <div className="flex gap-1 mt-1">
                            {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={t.active ? 'default' : 'secondary'}>{t.active ? 'Activo' : 'Inactivo'}</Badge>
                        <Button size="icon" variant="ghost" onClick={() => setEditingTestimonial(t)}><Edit className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteTestimonial(t.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Portfolio / Casos de Éxito
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={async () => {
                      if (confirm('¿Deseas restaurar y sincronizar los 8 proyectos reales con sus videos de YouTube?')) {
                        try {
                          await fetch('/api/admin/projects/sync', { method: 'POST' })
                          await loadData()
                          alert('Proyectos sincronizados exitosamente')
                        } catch {
                          alert('Error al sincronizar')
                        }
                      }
                    }}
                    className="text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Sincronizar Casos Reales
                  </Button>
                  <Button onClick={() => setEditingProject({ id: '', title: '', category: '', result: '', description: '', gradient: 'from-purple-500 to-blue-500', driveUrl: '', imageUrl: '', order: 0, active: true, videos: [] })} className="bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Proyecto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {editingProject && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-4">{editingProject.id ? 'Editar' : 'Nuevo'} Proyecto</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Título" value={editingProject.title} onChange={(e) => setEditingProject({...editingProject, title: e.target.value})} />
                      <Input placeholder="Categoría" value={editingProject.category} onChange={(e) => setEditingProject({...editingProject, category: e.target.value})} />
                      <Input placeholder="Resultado (ej: +300% tráfico)" value={editingProject.result} onChange={(e) => setEditingProject({...editingProject, result: e.target.value})} />
                      <select className="flex h-10 rounded-md border border-gray-200 bg-white px-3" value={editingProject.gradient} onChange={(e) => setEditingProject({...editingProject, gradient: e.target.value})}>
                        <option value="from-purple-500 to-blue-500">Púrpura - Azul</option>
                        <option value="from-orange-500 to-pink-500">Naranja - Rosa</option>
                        <option value="from-blue-500 to-green-500">Azul - Verde</option>
                        <option value="from-green-500 to-yellow-500">Verde - Amarillo</option>
                        <option value="from-red-500 to-orange-500">Rojo - Naranja</option>
                      </select>
                      <Input type="number" placeholder="Orden" value={editingProject.order} onChange={(e) => setEditingProject({...editingProject, order: parseInt(e.target.value)})} />
                      <div className="flex items-center gap-2">
                        <Switch checked={editingProject.active} onCheckedChange={(checked) => setEditingProject({...editingProject, active: checked})} />
                        <Label>Activo</Label>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Video o Enlace (YouTube / Drive / Vimeo)</Label>
                        <Input placeholder="https://www.youtube.com/watch?v=... o Google Drive" value={editingProject.driveUrl} onChange={(e) => setEditingProject({...editingProject, driveUrl: e.target.value})} />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Imagen de Portada (Thumbnail)</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-inner">
                            {editingProject.imageUrl ? (
                              <img src={editingProject.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center text-gray-400">
                                <ImageIcon className="w-6 h-6 mx-auto mb-1" />
                                <span className="text-[10px]">Sin imagen</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*';
                                  input.onchange = async (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                      const url = await uploadFile(file, 'projects');
                                      if (url) {
                                        setEditingProject(prev => prev ? {...prev, imageUrl: url} : null);
                                      }
                                    }
                                  };
                                  input.click();
                                }}
                                disabled={uploading}
                                className="h-8 text-xs gap-2"
                              >
                                {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                Subir Imagen
                              </Button>
                              {editingProject.imageUrl && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingProject(prev => prev ? {...prev, imageUrl: ''} : null)}
                                  className="h-8 text-xs text-red-500 hover:text-red-600"
                                >
                                  <X className="w-3 h-3 mr-1" /> Quitar
                                </Button>
                              )}
                            </div>
                            <Input 
                              placeholder="O pega la URL de la imagen directamente" 
                              value={editingProject.imageUrl} 
                              onChange={(e) => setEditingProject({...editingProject, imageUrl: e.target.value})} 
                              className="text-xs h-8"
                            />
                          </div>
                        </div>
                      </div>

                      <Textarea className="md:col-span-2" placeholder="Descripción" value={editingProject.description || ''} onChange={(e) => setEditingProject({...editingProject, description: e.target.value})} rows={2} />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => saveProject(editingProject)} disabled={saving === 'project'}>
                        {saving === 'project' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProject(null)}>Cancelar</Button>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.id} className={`p-4 border rounded-lg ${p.active ? 'bg-white' : 'bg-gray-100 opacity-60'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-12 rounded-lg bg-gradient-to-r ${p.gradient}`}></div>
                          <div>
                            <h4 className="font-semibold">{p.title}</h4>
                            <p className="text-sm text-gray-500">{p.category} • {p.result}</p>
                            {p.driveUrl && (
                              <div className="flex items-center gap-1 mt-1 text-[10px] text-purple-600 font-mono truncate max-w-[250px]">
                                <Play className="w-2 h-2" /> {p.driveUrl}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={p.active ? 'default' : 'secondary'}>{p.active ? 'Activo' : 'Inactivo'}</Badge>
                          <Button size="icon" variant="ghost" onClick={() => setEditingProject(p)}><Edit className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteProject(p.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      
                      {/* Videos del proyecto */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-semibold">Videos ({p.videos.length})</h5>
                          <Button size="sm" variant="outline" onClick={() => { setSelectedProjectId(p.id); setEditingVideo({ id: '', title: '', platform: 'youtube', url: '', embedUrl: '', thumbnail: '', order: 0, active: true }) }}>
                            <Plus className="w-3 h-3 mr-1" /> Agregar Video
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-2">
                          {p.videos.map((v) => (
                            <div key={v.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                              <Play className="w-4 h-4 text-gray-400" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{v.title || v.platform}</p>
                                <p className="text-xs text-gray-400 truncate">{v.url}</p>
                              </div>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { setSelectedProjectId(p.id); setEditingVideo(v) }}><Edit className="w-3 h-3" /></Button>
                              <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => deleteVideo(v.id)}><Trash2 className="w-3 h-3" /></Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Video Modal */}
            {editingVideo && selectedProjectId && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>{editingVideo.id ? 'Editar' : 'Agregar'} Video</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Título del video" value={editingVideo.title || ''} onChange={(e) => setEditingVideo({...editingVideo, title: e.target.value})} />
                    <select className="w-full h-10 rounded-md border border-gray-200 bg-white px-3" value={editingVideo.platform} onChange={(e) => setEditingVideo({...editingVideo, platform: e.target.value})}>
                      <option value="youtube">YouTube</option>
                      <option value="tiktok">TikTok</option>
                      <option value="instagram">Instagram Reels</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="facebook">Facebook</option>
                    </select>
                    <Input placeholder="URL del video" value={editingVideo.url} onChange={(e) => setEditingVideo({...editingVideo, url: e.target.value})} />
                    <Input placeholder="URL de embed (opcional)" value={editingVideo.embedUrl || ''} onChange={(e) => setEditingVideo({...editingVideo, embedUrl: e.target.value})} />
                    <Input placeholder="URL de miniatura (opcional)" value={editingVideo.thumbnail || ''} onChange={(e) => setEditingVideo({...editingVideo, thumbnail: e.target.value})} />
                    <div className="flex items-center gap-2">
                      <Switch checked={editingVideo.active} onCheckedChange={(checked) => setEditingVideo({...editingVideo, active: checked})} />
                      <Label>Activo</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => saveVideo(editingVideo)} disabled={saving === 'video'} className="flex-1">
                        {saving === 'video' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={() => { setEditingVideo(null); setSelectedProjectId(null) }}>Cancelar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Brands Tab */}
          <TabsContent value="brands">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  Marcas que Confían
                </CardTitle>
                <Button onClick={() => setEditingBrand({ id: '', name: '', logo: '', color: 'bg-purple-500', website: '', order: 0, active: true })} className="bg-purple-600">
                  <Plus className="w-4 h-4 mr-2" /> Nueva Marca
                </Button>
              </CardHeader>
              <CardContent>
                {/* Input oculto para subir archivos */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                
                {editingBrand && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-4">{editingBrand.id ? 'Editar' : 'Nueva'} Marca</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre de la marca *</Label>
                        <Input placeholder="Ej: Nike, Coca-Cola, etc." value={editingBrand.name} onChange={(e) => setEditingBrand({...editingBrand, name: e.target.value})} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Sitio web (opcional)</Label>
                        <Input placeholder="https://ejemplo.com" value={editingBrand.website || ''} onChange={(e) => setEditingBrand({...editingBrand, website: e.target.value})} />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label>Logo de la marca</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white overflow-hidden">
                            {editingBrand.logo ? (
                              <img src={editingBrand.logo} alt="Vista previa del logo" className="w-full h-full object-contain p-2" />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={uploading}
                              className="gap-2"
                            >
                              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                              {uploading ? 'Subiendo...' : 'Subir Logo'}
                            </Button>
                            {editingBrand.logo && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingBrand({...editingBrand, logo: ''})}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4 mr-1" /> Quitar
                              </Button>
                            )}
                            <p className="text-xs text-gray-500">JPG, PNG, SVG. Máx 5MB</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Color de fondo (si no hay logo)</Label>
                        <select className="w-full h-10 rounded-md border border-gray-200 bg-white px-3" value={editingBrand.color} onChange={(e) => setEditingBrand({...editingBrand, color: e.target.value})}>
                          <option value="bg-gray-100">Gris (neutro)</option>
                          <option value="bg-purple-500">Púrpura</option>
                          <option value="bg-blue-500">Azul</option>
                          <option value="bg-green-500">Verde</option>
                          <option value="bg-orange-500">Naranja</option>
                          <option value="bg-pink-500">Rosa</option>
                          <option value="bg-cyan-500">Cian</option>
                          <option value="bg-indigo-500">Índigo</option>
                          <option value="bg-red-500">Rojo</option>
                          <option value="bg-yellow-500">Amarillo</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Orden</Label>
                        <Input type="number" placeholder="0" value={editingBrand.order} onChange={(e) => setEditingBrand({...editingBrand, order: parseInt(e.target.value) || 0})} />
                      </div>
                      
                      <div className="md:col-span-2 flex items-center gap-2">
                        <Switch checked={editingBrand.active} onCheckedChange={(checked) => setEditingBrand({...editingBrand, active: checked})} />
                        <Label>Mostrar en la página</Label>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => saveBrand(editingBrand)} disabled={saving === 'brand' || uploading}>
                        {saving === 'brand' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Guardar
                      </Button>
                      <Button variant="outline" onClick={() => setEditingBrand(null)}>Cancelar</Button>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {brands.map((b) => (
                    <div key={b.id} className={`relative group p-4 border rounded-xl flex flex-col items-center justify-center text-center ${b.active ? 'bg-white hover:shadow-lg' : 'bg-gray-100 opacity-60'} transition-all`}>
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 mb-2">
                        {b.logo ? (
                          <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className={`w-full h-full ${b.color} flex items-center justify-center text-white font-bold text-lg`}>
                            {b.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm text-gray-800 truncate w-full">{b.name}</p>
                      {!b.active && <Badge variant="secondary" className="mt-1 text-xs">Oculto</Badge>}
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7 bg-white shadow" onClick={() => setEditingBrand(b)}><Edit className="w-3 h-3" /></Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 bg-white shadow text-red-500" onClick={() => deleteBrand(b.id)}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {brands.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No hay marcas registradas</p>
                    <p className="text-sm">Haz clic en "Nueva Marca" para agregar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
