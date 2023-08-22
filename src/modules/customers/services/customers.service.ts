import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
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
    createCustomerDto.customer_id = await this.#generatecustomer_id(
      createCustomerDto
    )
    const customer: Customer = await this.customerRepo.create(createCustomerDto)
    await this.customerRepo.save(customer)

    return customer
  }

  async findAll(findOptions?: FindOptions<Customer>): Promise<Customer[]> {
    const query = this.customerRepo.createQueryBuilder('customer')
    if (findOptions?.where?.first_name) {
      query
        .where('customer.first_name ILIKE :term1', {
          term1: `%${findOptions.where.first_name}%`
        })
        .orWhere('customer.second_name ILIKE :term2', {
          term2: `%${findOptions.where.first_name}%`
        })
        .orWhere('customer.last_name ILIKE :term3', {
          term3: `%${findOptions.where.first_name}%`
        })
    }
    const customers: Customer[] = await query.getMany()

    return customers
  }

  async findAllWithVehicles(
    findOptions?: FindOptions<Customer>
  ): Promise<Customer[]> {
    try {
      const query = this.customerRepo
        .createQueryBuilder('customer')
        .leftJoinAndSelect(
          'customer.vehicles',
          'vehicle',
          'vehicle.customerId = customer.id'
        )
        .select(['customer', 'vehicle.model', 'vehicle.brand'])
        .take(findOptions?.take)
        .skip(findOptions?.skip)

      if (findOptions.where?.first_name) {
        query.where(
          'customer.first_name LIKE :searchTerm OR customer.last_name LIKE :searchTerm',
          { searchTerm: `%${findOptions.where.first_name}%` }
        )
      }

      const customers = await query.getMany()

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

  async #generatecustomer_id(customerData: CreateCustomerDto): Promise<string> {
    let base = customerData.first_name

    base = base + customerData.last_name + this.#randomIdCode()

    const existingUser: Customer = await this.customerRepo.findOneBy({
      customer_id: base
    })

    if (existingUser) {
      this.#generatecustomer_id(customerData)
    }

    return base
  }

  #randomIdCode(): number {
    return Math.floor(Math.random() * 100)
  }
}
