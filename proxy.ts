import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { NavView } from '@/lib/types'

const ROLE_VIEWS: Record<string, NavView[]> = {
  admin:   ['dashboard', 'mls', 'operaciones', 'documentos', 'zillow', 'zonaprop', 'comisiones', 'usuarios'],
  manager: ['dashboard', 'mls', 'operaciones', 'documentos', 'zillow', 'zonaprop', 'usuarios'],
  agente:  ['mls', 'operaciones', 'documentos', 'zillow', 'zonaprop'],
}

function parseJwtPayload(token: string): { role: string } | null {
  try {
    const base64 = token.split('.')[1]
    const json = Buffer.from(base64, 'base64url').toString('utf8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('mt_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/intranet/login', request.url))
  }

  const payload = parseJwtPayload(token)
  if (!payload) {
    return NextResponse.redirect(new URL('/intranet/login', request.url))
  }

  const allowed = ROLE_VIEWS[payload.role] ?? []
  const segment = pathname.replace('/intranet/', '').split('/')[0] as NavView
  if (segment && !allowed.includes(segment)) {
    return NextResponse.redirect(new URL('/intranet/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/intranet/((?!login).*)'],
}
