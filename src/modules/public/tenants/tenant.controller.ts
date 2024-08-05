import { Body, Controller, Post } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from '@/modules/public/tenants/dto'
import { Tenant } from '@/modules/public/tenants/entities'

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenancyService: TenantService) {}

  @Post()
  createTenant(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenancyService.createTenant(createTenantDto)
  }
}
