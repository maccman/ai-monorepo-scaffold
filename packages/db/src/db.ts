import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless'
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import ws from 'ws'

import type { DB } from './types'

type DatabasePool = NeonPool | Pool

function attachPoolErrorHandler(pool: DatabasePool, poolType: string): void {
  pool.on('error', (err: Error) => {
    console.error(`Unexpected error on idle ${poolType} client`, err)
  })
}

function createKyselyInstance(pool: DatabasePool): Kysely<DB> {
  return new Kysely<DB>({
    dialect: new PostgresDialect({
      pool,
    }),
    // To debug queries, set to ['query', 'error']
    log: ['error'],
    // Maintain nested object keys to avoid converting JSONB keys from snake_case to camelCase.
    plugins: [new CamelCasePlugin({ maintainNestedObjectKeys: true })],
  })
}

function setupNeonDb(connectionString: string): Kysely<DB> {
  console.log('[db] setting up neon db with WebSocket support')

  neonConfig.webSocketConstructor = ws

  const pool = new NeonPool({ connectionString })
  attachPoolErrorHandler(pool, 'Neon')

  return createKyselyInstance(pool)
}

function setupPostgresDb(connectionString: string): Kysely<DB> {
  console.log('[db] setting up postgres db')

  const pool = new Pool({
    connectionString,
  })
  attachPoolErrorHandler(pool, 'Postgres')

  return createKyselyInstance(pool)
}

export function setupDb(connectionString: string): Kysely<DB> {
  if (!connectionString) {
    throw new Error('connectionString cannot be empty')
  }

  const isNeonDb = connectionString.includes('.neon.tech/')
  return isNeonDb
    ? setupNeonDb(connectionString)
    : setupPostgresDb(connectionString)
}
