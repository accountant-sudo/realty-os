# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build + type check
npm run lint         # ESLint

# Database
npx prisma generate                    # Regenerate client after schema changes
npx prisma migrate dev --name <name>   # Create + apply migration
npx tsx --env-file=.env prisma/seed.ts # Re-seed database
```

## Architecture

**Next.js 16 App Router** — TypeScript strict, Tailwind CSS v4, shadcn/ui (canary), Prisma 7.

### Auth flow
- Login → `POST /api/auth/login` → bcrypt compare → JWT set as **httpOnly cookie** (`mt_session`)
- `proxy.ts` (Next.js Proxy/Middleware) decodes JWT payload from cookie **without verifying signature** (edge-safe) to check role before allowing access to `/intranet/*`
- `AuthContext` calls `GET /api/auth/me` on mount to hydrate session from cookie
- `lib/auth-server.ts` — server-side JWT verification helper used in API routes
- Roles: `admin` (full access), `manager` (no comisiones), `agente` (mls/operaciones/documentos only)

### Data flow
- `DataContext` fetches `/api/operations`, `/api/mls`, `/api/agents` on mount
- Mutations are **optimistic** (setState first) then persisted via `PATCH` to API routes
- `ChkValue` (`true | false | 'na'`) is stored as strings `"true"` / `"false"` / `"na"` in Postgres; `dbToOperation()` in DataContext converts back to typed values

### Database (Prisma 7)
- Client generated to `./generated/prisma` (not node_modules) — import from `@/generated/prisma`
- `prisma.config.ts` holds datasource URL (replaces `url = env()` in schema.prisma — Prisma 7 breaking change)
- `lib/prisma.ts` — singleton using `@prisma/adapter-pg` + `pg.Pool` (Node.js; not edge Neon HTTP adapter)
- `.env` required: `DATABASE_URL`, `JWT_SECRET`

### Key conventions
- `@/` alias maps to project root
- All intranet views live under `components/intranet/views/` — complex views (dashboard, mls, operaciones) are split into subdirectories with an `index.tsx` assembler
- Custom UI primitives (`Chk`, `Badge`, `AgentChip`, `ProgressBar`) in `components/intranet/ui/` — kept separate from shadcn components in `components/ui/`
- Color tokens defined in `app/globals.css` `@theme` block — use `text-gold`, `bg-surface`, `border-border` etc. Never use raw hex in Tailwind classes
- `lib/constants.ts` — `AGENT_COLORS`, `INSP_OPTIONS`, `VIEW_TITLES`, `NAV_ITEMS`
- `lib/helpers.ts` — pure functions: `calcProgress`, `getAlerts`, `fmtPrice`, `cycleChkValue`, status badge classes

### Route protection
`proxy.ts` matcher: `/intranet/((?!login).*)` — login page bypassed, all other intranet routes require valid JWT cookie.

`ShellWrapper` (client component in layout) checks `usePathname()` to skip the sidebar/topbar shell on `/intranet/login`.
