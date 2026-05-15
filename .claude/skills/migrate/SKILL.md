---
name: migrate
description: Run a Prisma migration for schema changes in this project. Use when schema.prisma was edited, a new model is needed, or a column needs to be added/changed.
argument-hint: "<migration-name>"
disable-model-invocation: true
allowed-tools: Bash
---

Run a Prisma migration for this Next.js + Prisma 7 project.

## Context

- Schema: `prisma/schema.prisma`
- Config: `prisma.config.ts` (holds DATABASE_URL via dotenv, no URL in schema)
- Client output: `./generated/prisma` — must regenerate after schema changes
- Prisma 7: `migrate dev` does NOT auto-run `generate` — must be explicit

## Steps to execute

1. Validate the argument. Migration name should be snake_case describing the change (e.g. `add_agent_color`, `add_operation_notes`).

2. Run migration:
```bash
npx prisma migrate dev --name $ARGUMENTS
```

3. Regenerate the client:
```bash
npx prisma generate
```

4. Verify build still passes:
```bash
npx tsc --noEmit
```

5. Report: show the migration file created and any TypeScript errors found.

If $ARGUMENTS is empty, ask the user what the migration is for before proceeding.
