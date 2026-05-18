import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth-server'
import { uploadToGcs, generateSignedUrl } from '@/lib/gcp-storage'
import { prisma } from '@/lib/prisma'

const ALLOWED_MIME: Record<string, string[]> = {
  mls_property: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  operation: ['application/pdf', 'image/jpeg', 'image/png'],
}

const MAX_SIZE: Record<string, number> = {
  mls_property: 10 * 1024 * 1024,
  operation: 25 * 1024 * 1024,
}

export async function POST(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (!user.canEdit) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const entityType = formData.get('entityType') as string | null
  const entityId = Number(formData.get('entityId'))
  const visibility = (formData.get('visibility') as string) || 'public'
  const allowedRolesRaw = (formData.get('allowedRoles') as string) || '[]'

  if (!file || !entityType || !entityId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const allowed = ALLOWED_MIME[entityType]
  if (!allowed) {
    return NextResponse.json({ error: 'Invalid entity type' }, { status: 400 })
  }
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: `File type not allowed. Accepted: ${allowed.join(', ')}` }, { status: 422 })
  }

  const maxSize = MAX_SIZE[entityType] ?? 10 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json({ error: `File too large. Max: ${maxSize / 1024 / 1024}MB` }, { status: 413 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
  const uid = crypto.randomUUID().slice(0, 8)
  const storagePath = `${entityType}/${entityId}/${Date.now()}-${uid}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    await uploadToGcs(buffer, storagePath, file.type)
  } catch (err) {
    console.error('[upload] GCS error:', err)
    return NextResponse.json({ error: 'Storage upload failed. Check GCP configuration.' }, { status: 500 })
  }

  const attachment = await prisma.fileAttachment.create({
    data: {
      entityType,
      entityId,
      filename: file.name,
      storagePath,
      mimeType: file.type,
      sizeBytes: file.size,
      uploadedById: user.id,
      uploadedByName: user.name,
      visibility,
      allowedRoles: allowedRolesRaw,
    },
  })

  let signedUrl = ''
  try {
    signedUrl = await generateSignedUrl(storagePath)
  } catch (err) {
    console.error('[upload] signed URL error:', err)
  }

  const allowedRoles = JSON.parse(allowedRolesRaw) as string[]
  return NextResponse.json({ ...attachment, allowedRoles, signedUrl }, { status: 201 })
}
