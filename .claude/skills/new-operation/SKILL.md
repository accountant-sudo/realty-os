---
name: new-operation
description: Add a new real estate operation (transaction) to the database. Use when a new property goes under contract and needs to be tracked in the system.
argument-hint: "<address>"
allowed-tools: Bash, Read
---

Add a new Operation to the Realty OS database.

## Operation fields

Key required fields:
- `address` — property address (from $ARGUMENTS or ask)
- `agent` — agent ID (one of: diego, gaston, ilan, adolfo, leo, sabrina, aldana, ilay, karina, leonel, tomas, gustavo)
- `price` — sale price in USD
- `financing` — e.g. `Cash`, `Conventional`, `FHA`, `VA Loan`, `Fixed Loan`
- `closingDate` — display format e.g. `15-Jun`
- `closingDateISO` — ISO format e.g. `2026-06-15`
- `status` — `ACTIVA` or `CERRADA`
- `compPct` — commission percentage (e.g. `3`)

Optional:
- `realtor` — realtor ID or `none`
- `titleCo` — title company name
- `pending` — pending items string
- `execDate` — execution date display string

## Steps

1. Collect any missing required fields by asking the user.
2. Show a summary of the operation and confirm before inserting.
3. Insert via API (dev server must be running):

```bash
curl -s -b ~/.realty-cookies.txt -X POST http://localhost:3000/api/operations \
  -H "Content-Type: application/json" \
  -d '<JSON>'
```

If the API returns 401 (not logged in), instruct the user to log in via the browser first or use the DB directly:

```bash
npx tsx --env-file=.env -e "
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma'
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })
prisma.operation.create({ data: { /* fields */ } }).then(console.log).finally(() => prisma.\$disconnect())
"
```

4. Report the new operation ID and remind the user it will appear in `/intranet/operaciones` after page refresh.

Address from argument: **$ARGUMENTS**
