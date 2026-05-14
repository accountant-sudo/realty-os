import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role === 'agente') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()
  const prop = await prisma.mlsProperty.update({ where: { id: Number(id) }, data: body })
  return NextResponse.json(prop)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role === 'agente') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await prisma.mlsProperty.update({ where: { id: Number(id) }, data: { deletedAt: new Date() } })
  return NextResponse.json({ ok: true })
}
