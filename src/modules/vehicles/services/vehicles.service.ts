import { Injectable } from '@nestjs/common'
import { FindOptions } from '../../../utils/types'
import { CreateVehicleDto } from '../dto/create-vehicle.dto'
import { UpdateVehicleDto } from '../dto/update-vehicle.dto'
import { Vehicle } from '../entities/vehicle.entity'

@Injectable()
export class VehiclesService {
  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle'
  }

  findAll(findOptions: FindOptions<Vehicle>) {
    return `This action returns all vehicles`
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`
  }
}
