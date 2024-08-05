import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/characters (GET)', async () => {
    // 1. create a tenant
    const createTenantPayload = {
      name: 'Test Tenant',
      subdomain: 'test.tenant.com',
      schema: 'test'
    }

    await request(app.getHttpServer())
      .post('/tenants')
      .send(createTenantPayload)
      .expect(HttpStatus.CREATED)

    // 2. create a character in the new tenant
    await request(app.getHttpServer())
      .post('/characters')
      .set('Host', createTenantPayload.subdomain)
      .send({
        name: 'Test Character'
      })
      .expect(HttpStatus.CREATED)

    // 3. get all characters in the tenant
    const { body } = await request(app.getHttpServer())
      .get('/characters')
      .set('Host', createTenantPayload.subdomain)
      .expect(HttpStatus.OK)

    expect(body).toHaveLength(1)
    expect(body[0].name).toBe('Test Character')
  })
})
