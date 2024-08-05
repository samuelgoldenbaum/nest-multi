import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo
} from '@nestjs/core'
import { FastifyRequest } from 'fastify'

export const TENANT_DELETE_TIMEOUT = 3000

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  // A collection of context identifiers representing separate DI sub-trees per tenant
  private readonly tenants = new Map<string, ContextId>()

  attach(
    contextId: ContextId,
    request: FastifyRequest
  ): ContextIdResolverFn | ContextIdResolver {
    const tenantId = request.hostname.split(':').shift() as string

    if (!tenantId) {
      // log error
      return () => contextId
    }

    let tenantSubTreeId: ContextId
    if (this.tenants.has(tenantId)) {
      tenantSubTreeId = this.tenants.get(tenantId) as ContextId // 👈 cannot be undefined
    } else {
      tenantSubTreeId = ContextIdFactory.create()
      this.tenants.set(tenantId, tenantSubTreeId)
      // setTimeout(() => this.tenants.delete(tenantId), TENANT_DELETE_TIMEOUT)
    }

    return {
      payload: { tenantId },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId
    }
  }
}
