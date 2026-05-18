import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { generateSignedUrl, deleteFromGcs } from '@/lib/gcp-storage'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

function parseRoles(raw: string): string[] {
  try { return JSON.parse(raw) } catch { return [] }
}

function canSeeFile(userRole: string, visibility: string, allowedRoles: string[]): boolean {
  if (visibility === 'public') return true
  if (userRole === 'super_admin') return true
  return allowedRoles.includes(userRole)
}

export async function GET(req: Request, { params }: Params) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const rows = await prisma.fileAttachment.findMany({
    where: { entityType: 'operation', entityId: Number(id) },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  })

  const visible = rows.filter(r => {
    const roles = parseRoles(r.allowedRoles)
    return canSeeFile(user.role, r.visibility, roles)
  })

  const files = await Promise.all(
    visible.map(async r => {
      let signedUrl = ''
      try { signedUrl = await generateSignedUrl(r.storagePath) } catch {}
      return { ...r, allowedRoles: parseRoles(r.allowedRoles), signedUrl }
    })
  )

  return NextResponse.json(files)
}

export async function PATCH(req: Request, { params }: Params) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (!user.canEdit) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const url = new URL(req.url)
  const fileId = Number(url.searchParams.get('fileId'))
  if (!fileId) return NextResponse.json({ error: 'Missing fileId' }, { status: 400 })

  const body = await req.json() as { visibility: string; allowedRoles: string[] }

  const attachment = await prisma.fileAttachment.findFirst({
    where: { id: fileId, entityType: 'operation', entityId: Number(id) },
  })
  if (!attachment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updated = await prisma.fileAttachment.update({
    where: { id: fileId },
    data: {
      visibility: body.visibility,
      allowedRoles: JSON.stringify(body.allowedRoles ?? []),
    },
  })

  return NextResponse.json({ ...updated, allowedRoles: body.allowedRoles ?? [] })
}

export async function DELETE(req: Request, { params }: Params) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (!user.canEdit) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const url = new URL(req.url)
  const fileId = Number(url.searchParams.get('fileId'))
  if (!fileId) return NextResponse.json({ error: 'Missing fileId' }, { status: 400 })

  const attachment = await prisma.fileAttachment.findFirst({
    where: { id: fileId, entityType: 'operation', entityId: Number(id) },
  })
  if (!attachment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await deleteFromGcs(attachment.storagePath)
  await prisma.fileAttachment.delete({ where: { id: fileId } })

  return NextResponse.json({ ok: true })
}
