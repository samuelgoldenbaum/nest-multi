import { Inject, Injectable, OnModuleDestroy, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { DataSource, DataSourceOptions } from 'typeorm'
import { tenantedConfig } from '@/orm.config'
import { TenantService } from '@/modules/public/tenants/tenant.service'

interface ContextPayload {
  tenantId?: string
}

@Injectable({ scope: Scope.REQUEST, durable: true })
export class TenancyService implements OnModuleDestroy {
  private tenantConnections: { [schemaName: string]: DataSource } = {}
  private readonly tenantId: string

  constructor(
    private readonly tenantService: TenantService,
    @Inject(REQUEST) private readonly requestContext: ContextPayload
  ) {
    console.info(this.requestContext)
    this.tenantId = this.requestContext.tenantId
  }

  async getDataSource(): Promise<DataSource> {
    const connectionName = this.tenantId
    if (this.tenantConnections[connectionName]) {
      return this.tenantConnections[connectionName]
    } else {
      const { schema } = await this.tenantService.findOneByTenant(this.tenantId)

      const dataSource = new DataSource({
        ...tenantedConfig,
        schema
      } as DataSourceOptions)

      try {
        await dataSource.initialize()
      } catch (error: unknown) {
        console.error('Failed to initialize tenant connection', error)
        throw error
      }

      this.tenantConnections[connectionName] = dataSource

      return dataSource
    }
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.tenantConnections).map((dataSource) =>
        dataSource.destroy()
      )
    )
    console.debug('Tenant connections destroyed')
  }
}
