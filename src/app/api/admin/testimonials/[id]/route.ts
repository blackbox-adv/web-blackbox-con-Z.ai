import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const testimonial = await db.testimonial.findUnique({ where: { id } })
    if (!testimonial) return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return NextResponse.json({ error: 'Error fetching testimonial' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const rawData = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData

    const updatedTestimonial = await db.testimonial.update({
      where: { id },
      data: {
        ...data,
        rating: Number(data.rating) || 5,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
    })

    revalidatePath('/')
    return NextResponse.json(updatedTestimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return NextResponse.json({ error: 'Error updating testimonial' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.testimonial.delete({ where: { id } })
    revalidatePath('/')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return NextResponse.json({ error: 'Error deleting testimonial' }, { status: 500 })
  }
}
