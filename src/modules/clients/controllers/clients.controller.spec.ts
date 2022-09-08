import { Test, TestingModule } from '@nestjs/testing'
import { ClientsController } from './clients.controller'
import { ClientsService } from '../services/clients.service'
import {
  client1,
  clientsArray,
  createClientDto,
  specificClient,
  updatedSpecificClient
} from '../../../testing/dummies/clients'
import { Client } from '../entities/client.entity'
import { FindOptions } from '../../../utils/types'

describe('ClientsController', () => {
  let clientsController: ClientsController
  let clientSpyService: ClientsService

  beforeAll(async () => {
    const clientServiceProvider = {
      provide: ClientsService,
      useFactory: () => ({
        create: jest.fn(() => new Client()),
        findAll: jest.fn(() => clientsArray),
        findOne: jest.fn(() => specificClient),
        update: jest.fn(() => Promise.resolve(updatedSpecificClient)),
        remove: jest.fn(() => Promise.resolve(true))
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService, clientServiceProvider]
    }).compile()

    clientsController = module.get<ClientsController>(ClientsController)
    clientSpyService = module.get<ClientsService>(ClientsService)
  })

  it('should create a Client object', async () => {
    const client = await clientsController.create(createClientDto)

    expect(client).toBeInstanceOf(Client)
    expect(clientSpyService.create).toHaveBeenCalledWith(createClientDto)
  })

  it('should find all Clients', async () => {
    const findOptions: FindOptions<Client> = {
      take: 10,
      where: {
        fist_name: 'Manuel'
      }
    }
    const clients: Client[] = await clientsController.findAll(findOptions)

    expect(clients).toBeInstanceOf(Array<Client>)
    expect(clients).toHaveLength(4)
    expect(clientSpyService.findAll).toHaveBeenCalledWith(findOptions)
  })

  it('should get one client', async () => {
    const client: Client = await clientsController.findOne(specificClient.id)

    expect(client).toBeInstanceOf(Client)
    expect(client).toEqual(specificClient)
    expect(clientSpyService.findOne).toHaveBeenCalledWith(specificClient.id)
  })

  it('should update a Client', async () => {
    const updatedClient: Client = await clientsController.update(
      updatedSpecificClient.id,
      createClientDto
    )

    console.log(updatedClient)

    expect(updatedClient).toBeInstanceOf(Client)
    expect(updatedClient).toEqual(updatedSpecificClient)
    expect(clientSpyService.update).toHaveBeenCalledWith(
      updatedSpecificClient.id,
      createClientDto
    )
  })

  it('should delete a Client', async () => {
    const isRemoved: boolean = await clientsController.remove(specificClient.id)

    expect(isRemoved).toEqual(true)
    expect(clientSpyService.remove).toHaveBeenCalledWith(specificClient.id)
  })
})
