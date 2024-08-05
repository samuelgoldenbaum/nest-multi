import { join } from 'path'
import { Tenant } from '@/modules/public/tenants/entities'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export const publicConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'postgres',
  database: 'multi',
  entities: [Tenant],
  synchronize: true,
  migrationsRun: false,
  schema: 'public'
} satisfies PostgresConnectionOptions

const tenantedEntities = [
  join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')
]

export const tenantedConfig: PostgresConnectionOptions = {
  ...publicConfig,
  entities: [...tenantedEntities]
} satisfies PostgresConnectionOptions
