import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { VehiclesModule } from '../src/modules/vehicles/vehicles.module'
import { CustomersService } from '../src/modules/customers/services/customers.service'
import { Repository } from 'typeorm'
import { Customer } from '../src/modules/customers/entities/customers.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { client1, createCustomerDto } from '../src/testing/dummies/customers'
import { ConfigModule } from '@nestjs/config'
import { environments } from '../src/environments'
import { joiValidator } from '../src/envValidatorSchema'
import { DatabaseModule } from '../src/database/database.module'
import { CustomersModule } from '../src/modules/customers/customers.module'
import config from '../src/conf'
import { AppModule } from '../src/app.module'
import { Vehicle } from '../src/modules/vehicles/entities/vehicle.entity'
import { createVehicleDto } from '../src/testing/dummies/vehicles'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let clientRepo: Repository<Customer>
  let vehicleRepo: Repository<Vehicle>
  let clientId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    clientRepo = moduleFixture.get<Repository<Customer>>(
      getRepositoryToken(Customer)
    )
    vehicleRepo = moduleFixture.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle)
    )
  })

  beforeEach(async () => {
    await clientRepo.delete({})
    const { identifiers } = await clientRepo.insert([createCustomerDto])
    clientId = identifiers[0].id
    await vehicleRepo.insert([{ ...createVehicleDto, customerId: clientId }])
  })

  describe('/ (GET)', () => {
    it('should return all vehicles from a customer', async () => {
      const response: request.Response = await request(app.getHttpServer())
        .get(`/clients/${clientId}/vehicles`)
        .expect(200)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array<Vehicle>)
      expect(response.body[0]).toEqual(
        expect.objectContaining(createVehicleDto)
      )
    })
  })
})
