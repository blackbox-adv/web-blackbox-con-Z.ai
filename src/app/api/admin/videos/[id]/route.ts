import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const rawData = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData

    const updatedVideo = await db.video.update({
      where: { id },
      data: {
        ...data,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
    })

    revalidatePath('/')
    revalidatePath('/portfolio')
    return NextResponse.json(updatedVideo)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json({ error: 'Error updating video' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.video.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/portfolio')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json({ error: 'Error deleting video' }, { status: 500 })
  }
}
