import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WorkshopService } from '../../branches/services/branch.service'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { UpdateDepartmentDto } from '../dto/update-department.dto'
import { Department } from '../entities/department.entity'

interface WhereOptions {
  [key: string]: any
}

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly branchService: WorkshopService,
    @InjectRepository(Department) private departmentRepo: Repository<Department>
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const branch = await this.branchService.findOne(
      createDepartmentDto.branchId
    )

    const department = await this.departmentRepo.create(createDepartmentDto)
    department.branch = branch

    return department
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
