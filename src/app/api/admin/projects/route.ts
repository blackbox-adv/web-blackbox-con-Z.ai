import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { order: 'asc' },
      include: { videos: true }
    })
    return NextResponse.json(projects || [])
  } catch (error) {
    console.error('Error fetching admin projects:', error)
    return NextResponse.json({ error: 'Error fetching projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    const { id: _id, videos: _v, createdAt: _c, updatedAt: _u, ...data } = rawData

    const newProject = await db.project.create({
      data: {
        ...data,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      }
    })

    return NextResponse.json(newProject)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Error creating project' }, { status: 500 })
  }
}
