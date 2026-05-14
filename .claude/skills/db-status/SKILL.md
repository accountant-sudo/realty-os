---
name: db-status
description: Check database connection and show table counts for all models. Use when verifying the DB is healthy, after migrations, or when debugging data issues.
disable-model-invocation: true
allowed-tools: Bash
---

Check Neon database status for Realty OS.

Run the following to verify connection and show row counts:

```bash
npx tsx --env-file=.env -e "
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function run() {
  const client = await pool.connect()
  const tables = ['User', 'Agent', 'Realtor', 'MlsProperty', 'Operation']
  console.log('=== Realty OS DB Status ===')
  for (const t of tables) {
    const { rows } = await client.query('SELECT COUNT(*) FROM \"' + t + '\"')
    console.log(t.padEnd(15), rows[0].count, 'rows')
  }
  const { rows: migrations } = await client.query('SELECT migration_name FROM _prisma_migrations ORDER BY finished_at DESC LIMIT 3')
  console.log('\nLast migrations:')
  migrations.forEach(m => console.log(' -', m.migration_name))
  client.release()
  await pool.end()
}
run().catch(e => { console.error('DB Error:', e.message); process.exit(1) })
"
```

Report the counts and last migrations. If connection fails, show the error and suggest:
1. Verify `.env` has `DATABASE_URL`
2. Check Neon dashboard for database status
3. Run `npx prisma migrate dev` if schema is out of sync
