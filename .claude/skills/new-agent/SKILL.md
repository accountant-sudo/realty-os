---
name: new-agent
description: Add a new real estate agent to the system — database, color map, and login user. Use when onboarding a new agent to the Miami Tango team.
argument-hint: "<agent-id> <name>"
allowed-tools: Bash, Read, Edit
---

Add a new agent to the Realty OS system. This touches 3 places.

## Arguments
`$ARGUMENTS` = `<agent-id> <full-name>` (e.g. `valeria Valeria`)
Agent ID: lowercase, no spaces, no accents.

## Steps

### 1 — Add to DB (Agent table)

```bash
npx tsx --env-file=.env -e "
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })
prisma.agent.upsert({
  where: { id: '<ID>' },
  update: { name: '<NAME>' },
  create: { id: '<ID>', name: '<NAME>', active: 0, closed: 0 },
}).then(a => { console.log('Agent created:', a); return prisma.\$disconnect() })
"
```

### 2 — Add color to `lib/constants.ts`

Read the file and add an entry to `AGENT_COLORS`. Pick a distinct color not already used. Format: `'<id>': '#RRGGBB'`

Current colors in use — check the file before picking.

### 3 — Create login user (optional but recommended)

Ask if the agent should also have a login. If yes, use the same pattern as `/new-user`:
- username: `<agent-id>`
- password: `MT2026<first3chars>`
- role: `agente`
- name: `<full-name>`

### 4 — Verify

Run `/db-status` or check `http://localhost:3000/api/agents` to confirm the agent appears.

Agent to add: **$ARGUMENTS**
