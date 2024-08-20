import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateVehicleDto } from '../dto/create-vehicle.dto'
import { UpdateVehicleDto } from '../dto/update-vehicle.dto'
import * as _ from 'lodash'
import { CustomerVehicle } from '../entities/vehicle.entity'

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(CustomerVehicle) private vehicleRepo: Repository<CustomerVehicle>
  ) { }
  create(createVehicleDto: CreateVehicleDto) {
    const createdVehicle: CustomerVehicle = this.vehicleRepo.create(createVehicleDto)

    return this.vehicleRepo.save(createdVehicle)
  }

  findAll(findOptions: FindOptions<CustomerVehicle>) {
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

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
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
