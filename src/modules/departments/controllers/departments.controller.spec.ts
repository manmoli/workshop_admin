import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsController } from './departments.controller'
import { DepartmentsService } from '../services/departments.service'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { Department } from '../entities/department.entity'
import { BranchOffice } from '../../branches/entities/branch.entity'

describe('DepartmentsController', () => {
  let controller: DepartmentsController
  let service: DepartmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService]
    }).compile()

    controller = module.get<DepartmentsController>(DepartmentsController)
    service = module.get<DepartmentsService>(DepartmentsService)
  })

  it('should be defined', async () => {
    const departmentResponse: Department = {
      id: 123,
      name: 'Servicios',
      branchId: 1,
      branch: new BranchOffice()
    }
    const createDepartmentDto: CreateDepartmentDto = {
      name: departmentResponse.name,
      branchId: departmentResponse.branchId
    }

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(departmentResponse))

    expect(await controller.create(createDepartmentDto)).toMatchObject<
      Partial<Department>
    >({ ...createDepartmentDto })
  })
})
