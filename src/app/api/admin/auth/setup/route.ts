import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { createHash } from 'crypto'

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

// GET - Verificar si ya existe un admin
export async function GET() {
  try {
    const adminCount = await db.admin.count()
    return NextResponse.json({ setupRequired: adminCount === 0 })
  } catch (error) {
    console.error('Error verificando setup:', error)
    return NextResponse.json({ error: 'Error verificando setup' }, { status: 500 })
  }
}

// POST - Crear primer admin (solo si no existe ninguno)
export async function POST(request: Request) {
  try {
    const adminCount = await db.admin.count()
    
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Ya existe un administrador' }, { status: 400 })
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 })
    }

    const admin = await db.admin.create({
      data: {
        username,
        passwordHash: hashPassword(password)
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Administrador creado exitosamente',
      username: admin.username 
    })
  } catch (error) {
    console.error('Error en setup:', error)
    return NextResponse.json({ error: 'Error creando administrador' }, { status: 500 })
  }
}
