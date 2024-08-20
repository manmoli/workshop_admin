import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { CreateVehicleModelDto } from './dto/create-vehicle_model.dto'

import * as _ from 'lodash'
import { VehicleModel } from './entities/vehicle_model.entity'
import { FindOptions } from '../../utils/types'
import { UpdateVehicleModelDto } from './dto/update-vehicle_model.dto'

@Injectable()
export class VehicleModelService {
  constructor(
    @InjectRepository(VehicleModel) private vehicleModelRepo: Repository<VehicleModel>
  ) { }
  create(CreateVehicleModelDto: CreateVehicleModelDto) {
    const createdVehicle: VehicleModel = this.vehicleModelRepo.create(CreateVehicleModelDto)

    return this.vehicleModelRepo.save(createdVehicle)
  }

  findAll(findOptions: FindOptions<VehicleModel>) {
    return this.vehicleModelRepo.find(findOptions)
  }

  async findOne(id: number) {
    try {
      const vehicle: VehicleModel = await this.vehicleModelRepo.findOne({ where: { id }})
      if (!vehicle) {
        throw new EntityNotFoundError(VehicleModel, { id })
      }
  
      return vehicle
      
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleModelDto) {
    const { affected } = await this.vehicleModelRepo.update({ id }, updateVehicleDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(VehicleModel, { id })
    }

    return this.vehicleModelRepo.findOneBy({ id })
  }

  async remove(id: number) {
    const { affected } = await this.vehicleModelRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(VehicleModel, { id })
    }

    return affected === 1
  }
}
