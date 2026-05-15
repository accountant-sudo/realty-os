import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'
import { logActivity } from '@/lib/activity'

function generateTempPassword(): string {
  const year = new Date().getFullYear()
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789'
  let suffix = ''
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)]
  return `MT${year}${suffix}`
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const target = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!target || target.deletedAt) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

  const tempPassword = generateTempPassword()
  const hashed = await bcrypt.hash(tempPassword, 12)
  await prisma.user.update({ where: { id: Number(id) }, data: { password: hashed } })

  await logActivity({
    userId: user.id,
    username: user.username,
    action: 'reset_password',
    resource: 'user',
    resourceId: Number(id),
    metadata: { targetUsername: target.username },
  })

  return NextResponse.json({ tempPassword })
}
