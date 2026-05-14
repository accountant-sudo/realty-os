---
name: new-user
description: Add a new user to the Realty OS database with a bcrypt-hashed password. Use when onboarding a new team member who needs intranet access.
argument-hint: "<username> <password> <role> <name>"
disable-model-invocation: true
allowed-tools: Bash
---

Add a new user to the Realty OS system.

## Arguments expected
`$ARGUMENTS` should be: `<username> <password> <role> <name>`

Example: `/new-user maria MT2026mar admin María`

Roles: `admin`, `manager`, `agente`

## What to do

Parse $ARGUMENTS into 4 parts. If any are missing, ask for them before proceeding.

Then run this script to insert the user with a bcrypt-hashed password:

```bash
npx tsx --env-file=.env -e "
import bcrypt from 'bcryptjs'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

async function run() {
  const hash = await bcrypt.hash('<PASSWORD>', 12)
  const user = await prisma.user.upsert({
    where: { username: '<USERNAME>' },
    update: { password: hash, role: '<ROLE>', name: '<NAME>', initials: '<INITIALS>' },
    create: { username: '<USERNAME>', password: hash, role: '<ROLE>', name: '<NAME>', initials: '<INITIALS>' },
  })
  console.log('Usuario creado:', user.username, user.role)
  await prisma.\$disconnect()
}
run().catch(e => { console.error(e); process.exit(1) })
"
```

Replace `<USERNAME>`, `<PASSWORD>`, `<ROLE>`, `<NAME>` with the parsed values.
`<INITIALS>` = first 2 uppercase chars of the name.

After inserting:
- Confirm with `npx tsx --env-file=.env -e "..." ` querying the user
- Remind that the user can now log in at `/intranet/login`
- If role is `agente`, note they won't see comisiones or usuarios
