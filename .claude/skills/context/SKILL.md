---
name: context
description: Load full project context for Realty OS — architecture, data models, auth flow, conventions. Auto-invoked at session start to orient any agent working in this codebase.
user-invocable: false
---

# Realty OS — Project Context

## What this is
Internal intranet for Miami Tango Investments, a real estate company operating in Jacksonville FL, South Florida, and Orlando FL. Agents manage property listings (MLS), track transactions (Operations), and view commissions.

## Stack
- Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui
- Prisma 7 + PostgreSQL (Neon serverless)
- bcrypt passwords, JWT httpOnly cookies (`mt_session`), 7-day expiry

## Auth
- 3 roles: `admin` (full), `manager` (no comisiones), `agente` (mls/operaciones/documentos/zillow/zonaprop only)
- Login → POST /api/auth/login → JWT cookie set
- `proxy.ts` guards all `/intranet/*` routes except `/intranet/login`
- `AuthContext` hydrates via GET /api/auth/me on mount

## Data models (Prisma)
- **User** — login credentials (bcrypt password, role, initials)
- **Agent** — `id` is string slug (e.g. `gaston`), tracks active/closed count
- **MlsProperty** — property listings; `mlsStatus`: published/under_contract/withdrawn; ChkValues NOT used here
- **Operation** — real estate transactions; checklist fields (compSigned, escrow, lbp, sd, flood, condoDocs, condoRider, inspDone, reinsp) stored as strings `"true"/"false"/"na"` in DB, converted to `ChkValue` (boolean | 'na') by `dbToOperation()` in DataContext

## Key files
- `lib/constants.ts` — AGENT_COLORS, INSP_OPTIONS, VIEW_TITLES, NAV_ITEMS
- `lib/helpers.ts` — calcProgress, getAlerts, fmtPrice, cycleChkValue, statusBadgeClass
- `lib/prisma.ts` — singleton PrismaClient with pg Pool adapter
- `lib/auth-server.ts` — requireAuth(req) → JwtPayload | null
- `context/AuthContext.tsx` — login/logout/canEdit/getAllowedViews (async, API-backed)
- `context/DataContext.tsx` — optimistic mutations + API persistence
- `components/intranet/ui/` — Chk (3-state toggle), Badge, AgentChip, ProgressBar

## Color palette (Tailwind tokens)
`bg-surface` (white cards), `bg-bg` (page background #F7F6F3), `border-border`, `text-text-primary/text-2/text-3`, `text-gold/text-gold-dark`, `text-green`, `text-red`, `text-amber`, `text-blue`, `bg-sidebar` (#1A1A18 dark)

## Agents (current)
diego, gaston, ilan, adolfo, leo, sabrina, aldana, ilay, karina, leonel, tomas, gustavo

## Cities
Jacksonville FL, South Florida FL, Orlando FL
