import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '../../../database/database.module'
import { environments } from '../../../environments'
import { joiValidator } from '../../../envValidatorSchema'
import {
  clientsForCreation,
  createClientDto,
  createClientDto1,
  createClientDto2,
  createClientDto3
} from '../../../testing/dummies/clients'
import { Client } from '../entities/client.entity'
import { ClientsService } from './clients.service'
import config from '../../../conf'
import { ClientsModule } from '../clients.module'
import { FindOptions } from '../../../utils/types'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('ClientsService', () => {
  let clientService: ClientsService
  let clientRepo: Repository<Client>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          isGlobal: true,
          load: [config],
          validationSchema: joiValidator
        }),
        DatabaseModule,
        ClientsModule
      ]
    }).compile()

    clientService = module.get<ClientsService>(ClientsService)
    clientRepo = module.get<Repository<Client>>(getRepositoryToken(Client))
  })

  beforeEach(async () => {
    await clientRepo.delete({})
  })

  describe('Create', () => {
    it('should create a client', async () => {
      const client: Client = await clientService.create(createClientDto)

      expect(client).toBeInstanceOf(Client)
      expect(client).toEqual(expect.objectContaining(createClientDto))
      expect(client.client_id).toEqual('ManuelMolina')
    })

    it('should create a client with client_id with second name', async () => {
      const client: Client = await clientService.create(createClientDto1)

      expect(client).toBeInstanceOf(Client)
      expect(client).toEqual(expect.objectContaining(createClientDto1))
      expect(client.client_id).toEqual('ManuelAntonio')
    })

    it('should create a client with client_id with age', async () => {
      const client: Client = await clientService.create(createClientDto3)

      expect(client).toBeInstanceOf(Client)
      expect(client).toEqual(expect.objectContaining(createClientDto3))
      expect(client.client_id).toEqual('Roberto31')
    })
  })

  describe('FindAll', () => {
    beforeEach(async () => {
      await clientRepo.insert(clientsForCreation)
    })
    const findOptions: FindOptions<Client> = {
      where: {
        first_name: 'Manuel'
      }
    }
    it('should return all clients with name Manuel', async () => {
      const clients: Client[] = await clientService.findAll(findOptions)

      expect(clients).toBeInstanceOf(Array<Client>)
      expect(clients).toHaveLength(2)
      expect(clients[0].first_name).toEqual('Manuel')
    })

    it('should return all clients', async () => {
      const clients: Client[] = await clientService.findAll()

      expect(clients).toBeInstanceOf(Array<Client>)
      expect(clients).toHaveLength(7)
    })

    it('should return only three clients', async () => {
      const clients: Client[] = await clientService.findAll({ take: 3 })

      expect(clients).toBeInstanceOf(Array<Client>)
      expect(clients).toHaveLength(3)
    })
  })

  describe('update', () => {})
})
