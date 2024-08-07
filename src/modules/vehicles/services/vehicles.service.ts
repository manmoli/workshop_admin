import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateVehicleDto } from '../dto/create-vehicle.dto'
import { UpdateVehicleDto } from '../dto/update-vehicle.dto'
import { Vehicle } from '../entities/vehicle.entity'
import * as _ from 'lodash'

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>
  ) { }
  create(createVehicleDto: CreateVehicleDto) {
    const createdVehicle: Vehicle = this.vehicleRepo.create(createVehicleDto)

    return this.vehicleRepo.save(createdVehicle)
  }

  findAll(findOptions: FindOptions<Vehicle>) {
    return this.vehicleRepo.find(findOptions)
  }

  async findOne(id: number) {
    try {
      const vehicle: Vehicle = await this.vehicleRepo.findOne({ where: { id }, relations: ['customer'] })
      if (!vehicle) {
        throw new EntityNotFoundError(Vehicle, { id })
      }
  
      return vehicle
      
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const { affected } = await this.vehicleRepo.update({ id }, updateVehicleDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(Vehicle, { id })
    }

    return this.vehicleRepo.findOneBy({ id })
  }

  async remove(id: number) {
    const { affected } = await this.vehicleRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(Vehicle, { id })
    }

    return affected === 1
  }
}
