import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// GET - Obtener proyecto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await db.project.findUnique({
      where: { id },
      include: { videos: { orderBy: { order: 'asc' } } }
    })
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Error fetching project' }, { status: 500 })
  }
}

// PUT - Actualizar proyecto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { videos, ...rawData } = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = rawData
    
    const updatedProject = await db.$transaction(async (tx: any) => {
      // 1. Update project's scalar fields
      await tx.project.update({
        where: { id },
        data,
      })

      // 2. Delete existing videos for this project
      await tx.video.deleteMany({
        where: { projectId: id },
      })

      // 3. Create new videos if any were provided
      if (videos && videos.length > 0) {
        await tx.video.createMany({
          data: videos.map((video: { title: string; platform: string; url: string; order: number }) => ({
            title: video.title,
            platform: video.platform,
            url: video.url,
            order: video.order,
            projectId: id,
          })),
        })
      }

      // 4. Return the project with the new videos
      return tx.project.findUnique({
        where: { id },
        include: { videos: { orderBy: { order: 'asc' } } }
      })
    })
    
    revalidatePath('/')
    revalidatePath('/portfolio')
    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Error updating project' }, { status: 500 })
  }
}

// DELETE - Eliminar proyecto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await db.$transaction(async (tx: any) => {
      await tx.video.deleteMany({ where: { projectId: id } })
      await tx.project.delete({ where: { id } })
    })
    
    revalidatePath('/')
    revalidatePath('/portfolio')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Error deleting project' }, { status: 500 })
  }
}
