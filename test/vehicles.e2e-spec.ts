import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { VehiclesModule } from '../src/modules/vehicles/vehicles.module'
import { ClientsService } from '../src/modules/clients/services/clients.service'
import { Repository } from 'typeorm'
import { Client } from '../src/modules/clients/entities/client.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { client1, createClientDto } from '../src/testing/dummies/clients'
import { ConfigModule } from '@nestjs/config'
import { environments } from '../src/environments'
import { joiValidator } from '../src/envValidatorSchema'
import { DatabaseModule } from '../src/database/database.module'
import { ClientsModule } from '../src/modules/clients/clients.module'
import config from '../src/conf'
import { AppModule } from '../src/app.module'
import { Vehicle } from '../src/modules/vehicles/entities/vehicle.entity'
import { createVehicleDto } from '../src/testing/dummies/vehicles'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let clientRepo: Repository<Client>
  let vehicleRepo: Repository<Vehicle>
  let clientId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    clientRepo = moduleFixture.get<Repository<Client>>(
      getRepositoryToken(Client)
    )
    vehicleRepo = moduleFixture.get<Repository<Vehicle>>(
      getRepositoryToken(Vehicle)
    )
  })

  beforeEach(async () => {
    await clientRepo.delete({})
    const { identifiers } = await clientRepo.insert([createClientDto])
    clientId = identifiers[0].id
    await vehicleRepo.insert([{ ...createVehicleDto, clientId }])
  })

  describe('/ (GET)', () => {
    it('should return all vehicles from a client', async () => {
      const response: request.Response = await request(app.getHttpServer())
        .get(`/clients/${clientId}/vehicles`)
        .expect(200)

      expect(response.statusCode).toEqual(200)
      expect(response.body).toBeInstanceOf(Array<Vehicle>)
      expect(response.body[0]).toEqual(expect.objectContaining(createVehicleDto))
    })
  })
})
