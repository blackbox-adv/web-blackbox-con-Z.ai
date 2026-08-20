import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET - Verificar si el usuario está autenticado
export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0]

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const session = await db.adminSession.findUnique({
      where: { token },
      include: { admin: true }
    })

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    if (new Date() > session.expiresAt) {
      await db.adminSession.delete({ where: { token } })
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ 
      authenticated: true,
      user: { username: session.admin.username }
    })
  } catch (error) {
    console.error('Error verificando autenticación:', error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
