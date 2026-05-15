---
name: new-api
description: Scaffold a new API route with auth guard following the project pattern. Use when adding a new resource endpoint (GET/POST/PATCH/DELETE).
argument-hint: "<resource-name>"
allowed-tools: Bash, Read, Write
---

Scaffold a new API route for Realty OS.

## Pattern

All API routes live in `app/api/<resource>/route.ts` with optional `app/api/<resource>/[id]/route.ts`.

### Standard route template

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-server'

export async function GET() {
  const items = await prisma.<model>.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  if (user.role === 'agente') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const item = await prisma.<model>.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
```

### Auth levels
- `requireAuth(req)` — any authenticated user
- Check `user.role === 'agente'` to block agents
- Check `user.role !== 'admin'` to admin-only

### `lib/auth-server.ts` — `requireAuth`
Reads `mt_session` cookie, verifies JWT, returns `JwtPayload | null`.

## Steps

1. Determine the Prisma model name from `prisma/schema.prisma`.
2. Create `app/api/$ARGUMENTS/route.ts` with GET + POST.
3. Create `app/api/$ARGUMENTS/[id]/route.ts` with PATCH (and DELETE if needed).
4. Run `npx tsc --noEmit` and fix errors.
5. Test with curl: `curl -s http://localhost:3000/api/$ARGUMENTS`

Resource to scaffold: **$ARGUMENTS**

If $ARGUMENTS is empty, ask what the resource is and what operations it needs.
