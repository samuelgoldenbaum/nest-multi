import { Injectable } from '@nestjs/common'
import { Tenant } from '@/modules/public/tenants/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTenantDto } from '@/modules/public/tenants/dto'

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>
  ) {}

  async findOneByTenant(tenantId: string): Promise<Tenant> {
    return await this.tenantRepository.findOneOrFail({
      where: { subdomain: tenantId }
    })
  }

  async createTenant(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const data: Partial<Tenant> = {
      ...createTenantDto
    } satisfies Partial<Tenant>

    const tenant = await this.tenantRepository.save(data)
    const queryRunner =
      this.tenantRepository.manager.connection.createQueryRunner()

    await queryRunner.createSchema(tenant.schema, true)
    await queryRunner.release()

    return tenant
  }
}
