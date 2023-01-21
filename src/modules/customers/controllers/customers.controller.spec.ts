import { Test, TestingModule } from '@nestjs/testing'
import { CustomersController } from './customers.controller'
import { CustomersService } from '../services/customers.service'
import {
  clientsArray,
  createCustomerDto,
  specificCustomer,
  updatedSpecificClient
} from '../../../testing/dummies/customers'
import { Customer } from '../entities/customers.entity'
import { FindOptions } from '../../../utils/types'

describe('CustomersController', () => {
  let customersController: CustomersController
  let customerSpyService: CustomersService

  beforeAll(async () => {
    const clientServiceProvider = {
      provide: CustomersService,
      useFactory: () => ({
        create: jest.fn(() => new Customer()),
        findAll: jest.fn(() => clientsArray),
        findOne: jest.fn(() => specificCustomer),
        update: jest.fn(() => Promise.resolve(updatedSpecificClient)),
        remove: jest.fn(() => Promise.resolve(true))
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService, clientServiceProvider]
    }).compile()

    customersController = module.get<CustomersController>(CustomersController)
    customerSpyService = module.get<CustomersService>(CustomersService)
  })

  it('should create a Client object', async () => {
    const customer = await customersController.create(createCustomerDto)

    expect(customer).toBeInstanceOf(Customer)
    expect(customerSpyService.create).toHaveBeenCalledWith(createCustomerDto)
  })

  it('should find all Clients', async () => {
    const findOptions: FindOptions<Customer> = {
      take: 10,
      where: {
        first_name: 'Manuel'
      }
    }
    const customers: Customer[] = await customersController.findAll(findOptions)

    expect(customers).toBeInstanceOf(Array<Customer>)
    expect(customers).toHaveLength(4)
    expect(customerSpyService.findAll).toHaveBeenCalledWith(findOptions)
  })

  it('should get one customer', async () => {
    const customer: Customer = await customersController.findOne(specificCustomer.id)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer).toEqual(specificCustomer)
    expect(customerSpyService.findOne).toHaveBeenCalledWith(specificCustomer.id)
  })

  it('should update a Client', async () => {
    const updatedClient: Customer = await customersController.update(
      updatedSpecificClient.id,
      createCustomerDto
    )

    expect(updatedClient).toBeInstanceOf(Customer)
    expect(updatedClient).toEqual(updatedSpecificClient)
    expect(customerSpyService.update).toHaveBeenCalledWith(
      updatedSpecificClient.id,
      createCustomerDto
    )
  })

  it('should delete a Client', async () => {
    const isRemoved: boolean = await customersController.remove(specificCustomer.id)

    expect(isRemoved).toEqual(true)
    expect(customerSpyService.remove).toHaveBeenCalledWith(specificCustomer.id)
  })
})
