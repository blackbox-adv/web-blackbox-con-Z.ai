import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(testimonials || [])
  } catch (error) {
    console.error('Error fetching admin testimonials:', error)
    return NextResponse.json({ error: 'Error fetching testimonials' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData

    const newTestimonial = await db.testimonial.create({
      data: {
        ...data,
        rating: Number(data.rating) || 5,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
    })

    revalidatePath('/')
    return NextResponse.json(newTestimonial)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return NextResponse.json({ error: 'Error creating testimonial' }, { status: 500 })
  }
}
