import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const realtors = await prisma.realtor.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json(realtors)
}
