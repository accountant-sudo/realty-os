import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'
import { logActivity } from '@/lib/activity'

export async function GET(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role === 'agente') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    select: { id: true, username: true, role: true, name: true, initials: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { username, password, name, initials, role } = await req.json()
  if (!username || !password || !name || !role) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { username: username.trim().toLowerCase() } })
  if (existing) return NextResponse.json({ error: 'Usuario ya existe' }, { status: 409 })

  const hashed = await bcrypt.hash(password, 12)
  const created = await prisma.user.create({
    data: {
      username: username.trim().toLowerCase(),
      password: hashed,
      role,
      name,
      initials: initials || name.slice(0, 2).toUpperCase(),
    },
    select: { id: true, username: true, role: true, name: true, initials: true, createdAt: true },
  })

  await logActivity({
    userId: user.id,
    username: user.username,
    action: 'create_user',
    resource: 'user',
    resourceId: created.id,
    metadata: { newUsername: created.username, role: created.role },
  })

  return NextResponse.json(created, { status: 201 })
}
