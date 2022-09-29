import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { BranchModule } from '../src/modules/branches/branch.module'
import { DepartmentsModule } from '../src/modules/departments/departments.module'
import { ConfigModule } from '@nestjs/config'
import { environments } from '../src/environments'
import { joiValidator } from '../src/envValidatorSchema'
import { DatabaseModule } from '../src/database/database.module'
import config from '../src/conf'
import { AppModule } from '../src/app.module'
import { Vehicle } from '../src/modules/vehicles/entities/vehicle.entity'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    const response: request.Response = await request(app.getHttpServer()).get(
      '/clients'
    )

    expect(response.statusCode).toEqual(200)
  })
})
