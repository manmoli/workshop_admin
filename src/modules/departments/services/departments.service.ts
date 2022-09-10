import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, EntityNotFoundError, Repository } from 'typeorm'
import { WorkshopService } from '../../branches/services/branch.service'
import { AttributeWithNameAlreadyExists } from '../../../Errors/customDatabaseErrors'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { UpdateDepartmentDto } from '../dto/update-department.dto'
import { Department } from '../entities/department.entity'
import * as _ from 'lodash'
import { FindOptions } from '../../../utils/types'

@Injectable()
export class DepartmentsService {
  constructor(
    private readonly branchService: WorkshopService,
    @InjectRepository(Department) private departmentRepo: Repository<Department>
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    await this.#checkIfDepartmentExists(createDepartmentDto)

    const department = await this.departmentRepo.create(createDepartmentDto)
    await this.departmentRepo.save(department)

    return department
  }

  async findAll(findOptions?: FindOptions<Department>) {
    const departments: Department[] = await this.departmentRepo.find(
      findOptions
    )
    return departments
  }

  async findOne(id: number): Promise<Department> {
    const department: Department = await this.departmentRepo.findOneOrFail({
      where: { id },
      relations: { branch: true }
    })

    return department
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto
  ): Promise<Department> {
    const { affected } = await this.departmentRepo.update(
      { id },
      updateDepartmentDto
    )

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(Department, id)
    }

    const updatedDepartment: Department = await this.departmentRepo.findOne({
      where: { id }
    })

    return updatedDepartment
  }

  async remove(id: number) {
    const deleteResult: DeleteResult = await this.departmentRepo.delete({ id })

    return deleteResult.affected === 1
  }

  async #checkIfDepartmentExists(
    department: CreateDepartmentDto
  ): Promise<void> {
    const departmentFound: Department = await this.departmentRepo.findOne({
      where: department
    })

    if (!_.isNil(departmentFound)) {
      throw new AttributeWithNameAlreadyExists()
    }
  }
}
