import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const videos = await db.video.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(videos || [])
  } catch (error) {
    console.error('Error fetching admin videos:', error)
    return NextResponse.json({ error: 'Error fetching videos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData

    const newVideo = await db.video.create({
      data: {
        ...data,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
    })

    revalidatePath('/')
    revalidatePath('/portfolio')
    return NextResponse.json(newVideo)
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json({ error: 'Error creating video' }, { status: 500 })
  }
}
