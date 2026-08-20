import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const config = await db.siteConfig.findFirst()
    return NextResponse.json(config || {})
  } catch (error) {
    console.error('Error fetching admin config:', error)
    return NextResponse.json({ error: 'Error fetching config' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rawData = await request.json()
    const { id, createdAt, updatedAt, ...data } = rawData

    const existingConfig = await db.siteConfig.findFirst()

    let updatedConfig
    if (existingConfig) {
      updatedConfig = await db.siteConfig.update({
        where: { id: existingConfig.id },
        data,
      })
    } else {
      updatedConfig = await db.siteConfig.create({
        data,
      })
    }

    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Error saving admin config:', error)
    return NextResponse.json({ error: 'Error saving config' }, { status: 500 })
  }
}
