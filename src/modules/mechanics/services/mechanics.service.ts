import { Injectable } from '@nestjs/common'
import { FindOptions } from '../../../utils/types'
import { CreateMechanicDto } from '../dto/create-mechanic.dto'
import { UpdateMechanicDto } from '../dto/update-mechanic.dto'
import { Mechanic } from '../entities/mechanic.entity'

@Injectable()
export class MechanicsService {
  create(createMechanicDto: CreateMechanicDto): any {
    return 'This action adds a new mechanic'
  }

  findAll(findOptions: FindOptions<Mechanic>): any {
    return `This action returns all mechanics`
  }

  findOne(id: number): any {
    return `This action returns a #${id} mechanic`
  }

  update(id: number, updateMechanicDto: UpdateMechanicDto): any {
    return `This action updates a #${id} mechanic`
  }

  remove(id: number): any {
    return `This action removes a #${id} mechanic`
  }
}
