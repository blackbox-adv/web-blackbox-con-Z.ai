import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const brands = await db.brand.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(brands || [])
  } catch (error) {
    console.error('Error fetching admin brands:', error)
    return NextResponse.json({ error: 'Error fetching brands' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData

    const newBrand = await db.brand.create({
      data: {
        ...data,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
    })

    revalidatePath('/')
    return NextResponse.json(newBrand)
  } catch (error) {
    console.error('Error creating brand:', error)
    return NextResponse.json({ error: 'Error creating brand' }, { status: 500 })
  }
}
