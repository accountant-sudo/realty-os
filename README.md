# Realty OS — Miami Tango Investments

Intranet interna para gestión de propiedades MLS, operaciones inmobiliarias y comisiones.

## Stack

- **Next.js 16** App Router · TypeScript strict · Tailwind CSS v4 · shadcn/ui
- **Prisma 7** + PostgreSQL (Neon serverless)
- Auth: bcrypt + JWT httpOnly cookies · 3 roles: `admin`, `manager`, `agente`

## Desarrollo

```bash
npm run dev       # Servidor en http://localhost:3000
npm run build     # Build de producción + type check
npm run lint      # ESLint
```

### Variables de entorno

Crear `.env` en la raíz:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
```

### Base de datos

```bash
npx prisma generate                    # Regenerar cliente tras cambios de schema
npx prisma migrate dev --name <name>   # Crear y aplicar migración
npx tsx --env-file=.env prisma/seed.ts # Re-seed con datos iniciales
```

> **Prisma 7:** `migrate dev` no corre `generate` automáticamente — ejecutar ambos.

## Arquitectura

```
app/
  api/              ← API routes (auth, operations, mls, agents)
  intranet/         ← Rutas de la intranet (dashboard, mls, operaciones, etc.)
components/
  intranet/
    views/          ← Vistas (dashboard/, mls/, operaciones/ son subdirectorios)
    ui/             ← Primitivos custom: Chk, Badge, AgentChip, ProgressBar
  ui/               ← Componentes shadcn/ui
context/
  AuthContext.tsx   ← Sesión (login/logout async vía API, JWT cookie)
  DataContext.tsx   ← Datos + mutaciones optimistas → persist vía API
lib/
  prisma.ts         ← Singleton PrismaClient (pg Pool adapter)
  auth-server.ts    ← requireAuth(req) para API routes
  constants.ts      ← AGENT_COLORS, NAV_ITEMS, VIEW_TITLES
  helpers.ts        ← calcProgress, getAlerts, fmtPrice, cycleChkValue
prisma/
  schema.prisma     ← Modelos: User, Agent, Realtor, MlsProperty, Operation
  seed.ts           ← Seed inicial con datos reales
proxy.ts            ← Middleware: protege /intranet/* por rol vía JWT
```

### Flujo de auth

1. `POST /api/auth/login` → bcrypt compare → JWT seteado como cookie `mt_session` (httpOnly)
2. `proxy.ts` decodifica JWT (sin verificar firma, edge-safe) → allow/redirect por rol
3. `AuthContext` hidrata sesión vía `GET /api/auth/me` al montar

### ChkValue

Los campos de checklist (`compSigned`, `escrow`, `lbp`, etc.) son `boolean | 'na'` en TypeScript pero se guardan como strings `"true"/"false"/"na"` en Postgres. `dbToOperation()` en `DataContext` hace la conversión.

## Claude Code — Slash Commands

Este proyecto incluye skills de Claude Code en `.claude/skills/`. Disponibles con `/` en cualquier sesión:

| Comando | Descripción |
|---|---|
| `/migrate <name>` | Crea y aplica migración Prisma + regenera cliente |
| `/new-view <name>` | Scaffoldea vista intranet completa (route + component + nav) |
| `/new-api <resource>` | Scaffoldea API route con auth guard |
| `/new-user <user> <pass> <role> <name>` | Agrega usuario con contraseña hasheada al DB |
| `/new-agent <id> <name>` | Agrega agente a DB + color map + usuario de login |
| `/new-operation <address>` | Inserta nueva operación inmobiliaria en DB |
| `/db-status` | Verifica conexión Neon y muestra conteo de rows por tabla |

El skill `context` se carga automáticamente — orienta a Claude con la arquitectura del proyecto sin necesidad de invocarlo manualmente.

## Roles y acceso

| Rol | Vistas |
|---|---|
| `admin` | Todo |
| `manager` | Todo excepto Comisiones |
| `agente` | MLS, Operaciones, Documentos, Zillow, ZonaProp |

## Ciudades

Jacksonville FL · South Florida FL · Orlando FL
