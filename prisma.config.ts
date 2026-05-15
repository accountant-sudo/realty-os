import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'

config()

const DATABASE_URL = process.env.DATABASE_URL!

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: DATABASE_URL,
  },
})
