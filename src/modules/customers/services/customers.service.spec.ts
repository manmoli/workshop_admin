import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from '../../../database/database.module'
import { environments } from '../../../environments'
import { joiValidator } from '../../../envValidatorSchema'
import {
  clientsForCreation,
  createCustomerDto,
  createCustomerDto1,
  createCustomerDto3
} from '../../../testing/dummies/customers'
import { Customer } from '../entities/customers.entity'
import { CustomersService } from './customers.service'
import config from '../../../conf'
import { CustomersModule } from '../customers.module'
import { FindOptions } from '../../../utils/types'
import {
  EntityNotFoundError,
  QueryFailedError,
  Repository,
  UpdateValuesMissingError
} from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('ClientsService', () => {
  let clientService: CustomersService
  let clientRepo: Repository<Customer>

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
        CustomersModule
      ]
    }).compile()

    clientService = module.get<CustomersService>(CustomersService)
    clientRepo = module.get<Repository<Customer>>(getRepositoryToken(Customer))
  })

  beforeEach(async () => {
    await clientRepo.delete({})
  })

  describe('Create', () => {
    it('should create a customer', async () => {
      const customer: Customer = await clientService.create(createCustomerDto)

      expect(customer).toBeInstanceOf(Customer)
      expect(customer).toEqual(expect.objectContaining(createCustomerDto))
      expect(customer.customer_id).toEqual('ManuelMolina')
    })

    it('should create a customer with client_id with second name', async () => {
      const customer: Customer = await clientService.create(createCustomerDto1)

      expect(customer).toBeInstanceOf(Customer)
      expect(customer).toEqual(expect.objectContaining(createCustomerDto1))
      expect(customer.customer_id).toEqual('ManuelAntonio')
    })

    it('should create a customer with client_id with age', async () => {
      const customer: Customer = await clientService.create(createCustomerDto3)

      expect(customer).toBeInstanceOf(Customer)
      expect(customer).toEqual(expect.objectContaining(createCustomerDto3))
      expect(customer.customer_id).toEqual('Roberto31')
    })
  })

  describe('FindAll', () => {
    beforeEach(async () => {
      await clientRepo.insert(clientsForCreation)
    })
    const findOptions: FindOptions<Customer> = {
      where: {
        first_name: 'Manuel'
      }
    }
    it('should return all clients with name Manuel', async () => {
      const clients: Customer[] = await clientService.findAll(findOptions)

      expect(clients).toBeInstanceOf(Array<Customer>)
      expect(clients).toHaveLength(2)
      expect(clients[0].first_name).toEqual('Manuel')
    })

    it('should return all clients', async () => {
      const clients: Customer[] = await clientService.findAll()

      expect(clients).toBeInstanceOf(Array<Customer>)
      expect(clients).toHaveLength(7)
    })

    it('should return only three clients', async () => {
      const clients: Customer[] = await clientService.findAll({ take: 3 })

      expect(clients).toBeInstanceOf(Array<Customer>)
      expect(clients).toHaveLength(3)
    })
  })

  describe('findOne', () => {
    let id: number
    beforeEach(async () => {
      const { identifiers } = await clientRepo.insert([
        createCustomerDto,
        createCustomerDto1
      ])
      id = identifiers[0].id
    })

    it('should find a customer', async () => {
      const customer: Customer = await clientService.findOne(id)

      expect(customer).toEqual(expect.objectContaining(createCustomerDto))
    })

    it('should fail when no customer found', async () => {
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
      id = (await clientRepo.insert([createCustomerDto])).raw[0].id
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
      id = (await clientRepo.insert([createCustomerDto])).raw[0].id
    })

    it('should remove a customer', async () => {
      const removed: boolean = await clientService.remove(id)

      expect(removed).toBe(true)
    })

    it('should fails when customer not found', async () => {
      const nonExistingId = 0

      expect(clientService.remove(nonExistingId)).rejects.toBeInstanceOf(
        EntityNotFoundError
      )
    })
  })
})
