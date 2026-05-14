import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'
import { logActivity } from '@/lib/activity'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const target = await prisma.user.findUnique({ where: { id: Number(id) } })
  if (!target || target.deletedAt) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })

  // Cannot demote another super_admin
  if (target.role === 'super_admin' && target.id !== user.id) {
    return NextResponse.json({ error: 'No se puede modificar otro super_admin' }, { status: 403 })
  }

  const { role, name, initials } = await req.json()
  const prevRole = target.role

  const updated = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      ...(role !== undefined && { role }),
      ...(name !== undefined && { name }),
      ...(initials !== undefined && { initials }),
    },
    select: { id: true, username: true, role: true, name: true, initials: true, createdAt: true },
  })

  if (role && role !== prevRole) {
    await logActivity({
      userId: user.id,
      username: user.username,
      action: 'update_user_role',
      resource: 'user',
      resourceId: updated.id,
      metadata: { targetUsername: updated.username, prevRole, newRole: role },
    })
  }

  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const numId = Number(id)

  if (numId === user.id) {
    return NextResponse.json({ error: 'No puedes eliminar tu propio usuario' }, { status: 400 })
  }

  const target = await prisma.user.findUnique({ where: { id: numId } })
  if (!target || target.deletedAt) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  if (target.role === 'super_admin') {
    return NextResponse.json({ error: 'No se puede eliminar un super_admin' }, { status: 403 })
  }

  await prisma.user.update({ where: { id: numId }, data: { deletedAt: new Date() } })

  await logActivity({
    userId: user.id,
    username: user.username,
    action: 'delete_user',
    resource: 'user',
    resourceId: numId,
    metadata: { deletedUsername: target.username, role: target.role },
  })

  return NextResponse.json({ ok: true })
}
