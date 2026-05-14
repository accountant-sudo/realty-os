import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'
import { logActivity } from '@/lib/activity'

export async function GET(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const perms = await prisma.rolePermission.findMany({ orderBy: { role: 'asc' } })
  return NextResponse.json(perms)
}

export async function PUT(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role !== 'super_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { role, allowedViews, canEdit } = await req.json()
  if (!role || !Array.isArray(allowedViews)) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const updated = await prisma.rolePermission.upsert({
    where: { role },
    create: { role, allowedViews, canEdit: !!canEdit, updatedById: user.id },
    update: { allowedViews, canEdit: !!canEdit, updatedById: user.id },
  })

  await logActivity({
    userId: user.id,
    username: user.username,
    action: 'update_permissions',
    resource: 'permissions',
    resourceId: role,
    metadata: { allowedViews, canEdit },
  })

  return NextResponse.json(updated)
}
