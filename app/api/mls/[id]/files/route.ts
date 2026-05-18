import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { generateSignedUrl, deleteFromGcs } from '@/lib/gcp-storage'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Params) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params
  const rows = await prisma.fileAttachment.findMany({
    where: { entityType: 'mls_property', entityId: Number(id) },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  })

  const files = await Promise.all(
    rows.map(async r => ({
      ...r,
      signedUrl: await generateSignedUrl(r.storagePath),
    }))
  )

  return NextResponse.json(files)
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
    where: { id: fileId, entityType: 'mls_property', entityId: Number(id) },
  })
  if (!attachment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await deleteFromGcs(attachment.storagePath)
  await prisma.fileAttachment.delete({ where: { id: fileId } })

  return NextResponse.json({ ok: true })
}
