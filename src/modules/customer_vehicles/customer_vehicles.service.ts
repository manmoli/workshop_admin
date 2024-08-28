import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { FindOptions } from '../../utils/types'
import { CreateCustomerVehicleDto } from './dto/create-customer-vehicle.dto'
import * as _ from 'lodash'
import { CustomerVehicle } from './entities/customer_vehicle.entity'
import { UpdateCustomerVehicleDto } from './dto/update-customer-vehicle.dto'
import { Customer } from '../customers/entities/customers.entity'
import { CustomerVehicleI } from './customer_vehicles.interfaces'
import { CommonCustomerService } from '../common/services/customers/common-customers.service'

@Injectable()
export class CustomerVehiclesService {
  constructor(
    @InjectRepository(CustomerVehicle) private vehicleRepo: Repository<CustomerVehicle>,
    private commonCustomerService: CommonCustomerService
  ) { }
  async create(createVehicleDto: CreateCustomerVehicleDto) {

    const customer: Customer = await this.commonCustomerService.findOne(createVehicleDto.customerId)
    const createdVehicle: CustomerVehicle = this.vehicleRepo.create(createVehicleDto)
    createdVehicle.customer = customer

    return this.vehicleRepo.save(createdVehicle)
  }

  async findAll(findOptions: FindOptions<CustomerVehicleI>) {

    return this.vehicleRepo.find(findOptions)
  }

  async findOne(id: number) {
    try {
      const vehicle: CustomerVehicle = await this.vehicleRepo.findOne({ where: { id }, relations: ['customer'] })
      if (!vehicle) {
        throw new EntityNotFoundError(CustomerVehicle, { id })
      }
  
      return vehicle
      
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateVehicleDto: UpdateCustomerVehicleDto) {
    const { affected } = await this.vehicleRepo.update({ id }, updateVehicleDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(CustomerVehicle, { id })
    }

    return this.vehicleRepo.findOneBy({ id })
  }

  async remove(id: number) {
    const { affected } = await this.vehicleRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(CustomerVehicle, { id })
    }

    return affected === 1
  }
}
