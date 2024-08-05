import { Module } from '@nestjs/common'

import { publicConfig } from './orm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharactersModule } from '@/modules/tenanted/characters/characters.module'
import { TenantModule } from '@/modules/public/tenants/tenant.module'
import { AggregateByTenantContextIdStrategy } from '@/aggregate-by-tenant.strategy'
import { ContextIdFactory } from '@nestjs/core'
import { TenancyModule } from '@/modules/tenancy/tenancy.module'

ContextIdFactory.apply(new AggregateByTenantContextIdStrategy())

@Module({
  imports: [
    TypeOrmModule.forRoot(publicConfig),
    TenancyModule,
    TenantModule,
    CharactersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
