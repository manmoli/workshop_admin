import { Inject, Injectable } from '@nestjs/common'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { UpdateDepartmentDto } from '../dto/update-department.dto'

interface WhereOptions {
  [key: string]: any
}

@Injectable()
export class DepartmentsService {
  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department'
  }

  findAll(where?: WhereOptions) {
    console.log(where)
    return `This action returns all departments`
  }

  findOne(id: number) {
    return `This action returns a #${id} department`
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`
  }

  remove(id: number) {
    return `This action removes a #${id} department`
  }
}
