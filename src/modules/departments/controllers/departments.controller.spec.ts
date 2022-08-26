import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsController } from './departments.controller'
import { DepartmentsService } from '../services/departments.service'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { Department } from '../entities/department.entity'

describe('DepartmentsController', () => {
  let controller: DepartmentsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService]
    }).compile()

    controller = module.get<DepartmentsController>(DepartmentsController)
  })

  it('should be defined', async () => {
    expect(controller).toBeDefined()
    const createDepartmentDto: CreateDepartmentDto = {
      name: 'Máximo ancona',
      branchId: 1
    }
    expect(await controller.create(createDepartmentDto)).toMatchObject<
      Partial<Department>
    >({ ...createDepartmentDto })
  })
})
