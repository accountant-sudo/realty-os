import { prisma } from './prisma'

export async function logActivity(params: {
  userId: number
  username: string
  action: string
  resource: string
  resourceId?: string | number
  metadata?: Record<string, unknown>
}) {
  await prisma.activityLog.create({
    data: {
      userId: params.userId,
      username: params.username,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId != null ? String(params.resourceId) : null,
      metadata: params.metadata ? (params.metadata as object) : undefined,
    },
  }).catch(console.error)
}
