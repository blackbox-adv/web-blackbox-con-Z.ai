import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// POST - Logout
export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('admin_token=')[1]?.split(';')[0]

    if (token) {
      // Eliminar sesión de la base de datos
      await db.adminSession.deleteMany({
        where: { token }
      })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin_token')

    return response
  } catch (error) {
    console.error('Error en logout:', error)
    const response = NextResponse.json({ success: true })
    response.cookies.delete('admin_token')
    return response
  }
}
