import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, FindManyOptions, Like, Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateCustomerDto } from '../dto/create-customers.dto'
import { UpdateCustomerDto } from '../dto/update-customers.dto'
import { Customer } from '../entities/customers.entity'
import * as _ from 'lodash'

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    createCustomerDto.customerId = await this.#generateCustomerId(
      createCustomerDto
    )
    const customer: Customer = await this.customerRepo.create(createCustomerDto)
    await this.customerRepo.save(customer)

    return customer
  }

  async findAll(findOptions?: FindOptions<Customer>): Promise<Customer[]> {
    const query = this.customerRepo.createQueryBuilder('customer')
    if (findOptions?.where?.firstName) {
      query
        .where('customer.first_name ILIKE :term1', {
          term1: `%${findOptions.where.firstName}%`
        })
        .orWhere('customer.second_name ILIKE :term2', {
          term2: `%${findOptions.where.firstName}%`
        })
        .orWhere('customer.last_name ILIKE :term3', {
          term3: `%${findOptions.where.firstName}%`
        })
    }

    const customers: Customer[] = await query.getMany()

    return customers
  }

  async findAllWithVehicles(
    findOptions?: FindOptions<Customer>
  ): Promise<Customer[]> {
    try {

      const query: FindManyOptions<Customer> = {
        select: {
          id: true,
          firstName: true,
          secondName: true,
          lastName: true,
          phoneNumber: true,
          customerVehicles: {
            licensePlate: true,
            vin: true,
            vehicleModel: {
              brand: true,
              model: true,
              model_year: true,
              cylinders: true,
              vehicle_engine: true,
              vehicle_transmission: true,
            }
          }
        },
        relations: {
          customerVehicles: {
            vehicleModel: true
          }
        }
      }

      if(findOptions.where?.firstName) {
        query.where = [
          { firstName: Like(findOptions.where.firstName)},
          { secondName: Like(findOptions.where.firstName)},
          { lastName: Like(findOptions.where.firstName)},
        ]
      }

      const customers = await this.customerRepo.find(query)

      return customers
    } catch (error) {
      console.log(error)
    }
  }

  async findOne(id: number): Promise<Customer> {
    const customer: Customer = await this.customerRepo.findOneBy({ id })

    if (customer === null) {
      throw new EntityNotFoundError(Customer, { id })
    }

    return customer
  }

  async update(
    id: number,
    updateClientDto: UpdateCustomerDto
  ): Promise<Customer> {
    const { affected } = await this.customerRepo.update({ id }, updateClientDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(Customer, { id })
    }

    const customer: Customer = await this.customerRepo.findOneBy({ id })

    return customer
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.customerRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(Customer, { id })
    }

    return affected === 1
  }

  async #generateCustomerId(customerData: CreateCustomerDto): Promise<string> {
    let base = customerData.firstName

    base = base + customerData.lastName + this.#randomIdCode()

    const existingUser: Customer = await this.customerRepo.findOneBy({
      customerId: base
    })

    if (existingUser) {
      this.#generateCustomerId(customerData)
    }

    return base
  }

  #randomIdCode(): number {
    return Math.floor(Math.random() * 100)
  }
}
