import jwt from 'jsonwebtoken'

export interface JwtPayload {
  id: number
  username: string
  role: string
  name: string
  initials: string
}

export async function requireAuth(req: Request): Promise<JwtPayload | null> {
  const cookie = req.headers.get('cookie') ?? ''
  const match = cookie.match(/mt_session=([^;]+)/)
  if (!match) return null

  try {
    return jwt.verify(match[1], process.env.JWT_SECRET!) as JwtPayload
  } catch {
    return null
  }
}
