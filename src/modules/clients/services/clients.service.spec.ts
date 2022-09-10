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
import { EntityNotFoundError, QueryFailedError, Repository, UpdateValuesMissingError } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common'

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

  describe('findOne', () => {
    let id: number
    beforeEach(async () => {
      const { identifiers } = await clientRepo.insert([
        createClientDto,
        createClientDto1
      ])
      id = identifiers[0].id
    })

    it('should find a client', async () => {
      const client: Client = await clientService.findOne(id)

      expect(client).toEqual(expect.objectContaining(createClientDto))
    })

    it('should fail when no client found', async () => {
      const nonExistingId = 0

      await expect(clientService.findOne(nonExistingId)).rejects.toBeInstanceOf(
        EntityNotFoundError
      )
    })
  })

  describe('update', () => {
    let id
    const nonExistingTaxId = 'MOPM999999AB2'
    beforeEach(async () => {
      id = (await clientRepo.insert([createClientDto])).raw[0].id
    })

    it('should update a client', async () => {
      const client: Client = await clientService.update(id, {
        tax_id: nonExistingTaxId
      })

      expect(client).toEqual(
        expect.objectContaining({
          ...createClientDto,
          tax_id: nonExistingTaxId
        })
      )
    })

    it('should return not found error when the client does not exists', async () => {
      const nonExistingId = 0

      await expect(
        clientService.update(nonExistingId, { tax_id: nonExistingTaxId })
      ).rejects.toBeInstanceOf(EntityNotFoundError)
    })

    it('should fail because violates the unique tax id constraint', async () => {
      const id = (await clientRepo.insert([createClientDto1])).raw[0].id

      await expect(
        clientService.update(id, { tax_id: createClientDto.tax_id })
      ).rejects.toBeInstanceOf(QueryFailedError)
    })

    it('should fail because no update data passed', async () => {
      await expect(clientService.update(id, {})).rejects.toBeInstanceOf(
        UpdateValuesMissingError
      )
    })
  })

  describe('remove', () => {
    let id
    beforeEach(async () => {
      id = (await clientRepo.insert([createClientDto])).raw[0].id
    })

    it('should remove a client', async () => {
      const removed: boolean = await clientService.remove(id)

      expect(removed).toBe(true)
    })

    it('should fails when client not found', async () => {
      const nonExistingId = 0

      expect(clientService.remove(nonExistingId)).rejects.toBeInstanceOf(
        EntityNotFoundError
      )
    })
  })
})
