'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Lock, User, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [isSetup, setIsSetup] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [setupForm, setSetupForm] = useState({ username: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth/verify')
      const data = await res.json()
      if (data.authenticated) {
        router.push('/admin/dashboard')
        return
      }
      checkSetup()
    } catch {
      checkSetup()
    }
  }

  const checkSetup = async () => {
    try {
      const res = await fetch('/api/admin/auth/setup')
      const data = await res.json()
      setIsSetup(!data.setupRequired)
    } catch {
      setIsSetup(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (setupForm.password !== setupForm.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (setupForm.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      const res = await fetch('/api/admin/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: setupForm.username, password: setupForm.password })
      })
      const data = await res.json()
      
      if (res.ok) {
        setSuccess('Administrador creado. Ahora puedes iniciar sesión.')
        setIsSetup(true)
        setSetupForm({ username: '', password: '', confirmPassword: '' })
      } else {
        setError(data.error || 'Error al crear administrador')
      }
    } catch {
      setError('Error de conexión')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })
      const data = await res.json()

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Credenciales inválidas')
      }
    } catch {
      setError('Error de conexión')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex items-center justify-center p-2">
            <img 
              src="/logo.svg" 
              alt="Black Box" 
              className="h-16 w-auto object-contain max-w-[240px]" 
              onError={(e) => {
                const target = e.currentTarget
                target.src = '/logo.svg'
              }}
            />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Panel de Control
          </CardTitle>
          <CardDescription>
            Administración Black Box
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          
          {success && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              {success}
            </div>
          )}

          {isSetup ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu usuario"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl font-bold">
                Iniciar Sesión
              </Button>
            </form>
          ) : (
            // Setup Form
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="p-3 mb-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                Primero debes crear las credenciales de administrador.
              </div>
              <div className="space-y-2">
                <Label htmlFor="setup-username">Usuario</Label>
                <Input
                  id="setup-username"
                  type="text"
                  placeholder="Elige un nombre de usuario"
                  value={setupForm.username}
                  onChange={(e) => setSetupForm({ ...setupForm, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setup-password">Contraseña</Label>
                <Input
                  id="setup-password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={setupForm.password}
                  onChange={(e) => setSetupForm({ ...setupForm, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={setupForm.confirmPassword}
                  onChange={(e) => setSetupForm({ ...setupForm, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl font-bold">
                Crear Administrador
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
