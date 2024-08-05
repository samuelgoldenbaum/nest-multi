import { Global, Module } from '@nestjs/common'
import { TenancyService } from '@/modules/tenancy/tenancy-service'
import { TenantModule } from '@/modules/public/tenants/tenant.module'

@Global()
@Module({
  imports: [TenantModule],
  providers: [TenancyService],
  exports: [TenancyService]
})
export class TenancyModule {}
