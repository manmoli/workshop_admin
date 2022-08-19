import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsService } from './departments.service'
import { BranchOffice } from '../../branches/entities/branch.entity'
import { Repository } from 'typeorm'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Department } from '../entities/department.entity'
import { ConfigModule } from '@nestjs/config'
import { environments } from '../../environments'
import config, { TypeOrmModuleConfig } from '../../conf'
import { joiValidator } from '../../envValidatorSchema'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { WorkshopService } from '../../branches/services/branch.service'
import { BranchModule } from '../../branches/branch.module'
import { DepartmentsModule } from '../departments.module'
import { DatabaseModule } from '../../database/database.module'

describe('DepartmentsService', () => {
  let departmentService: DepartmentsService

  let branchRepo: Repository<BranchOffice>
  let departmentRepo: Repository<Department>

  let storedBranch: BranchOffice
  let branchId: number
  const departmentName = 'Operaciones'

  let departmentObject: CreateDepartmentDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          isGlobal: true,
          load: [config],
          validationSchema: joiValidator
        }),
        BranchModule,
        DepartmentsModule,
        DatabaseModule
      ]
    }).compile()

    departmentService = module.get<DepartmentsService>(DepartmentsService)

    branchRepo = module.get<Repository<BranchOffice>>(
      getRepositoryToken(BranchOffice)
    )
    departmentRepo = module.get<Repository<Department>>(
      getRepositoryToken(Department)
    )

    storedBranch = await branchRepo.save(branchRepo.create({ name: 'New' }))
    branchId = storedBranch.id
    departmentObject = {
      branchId,
      name: departmentName
    }
  })

  afterEach(async () => {
    await departmentRepo.delete({})
    await branchRepo.delete({})
  })

  it('should create a department', async () => {
    expect(departmentService).toBeDefined()
    const department: Department = await departmentService.create(
      departmentObject
    )

    const expectedObject = {
      name: departmentName,
      branch: storedBranch
    }

    expect(department).toBeDefined()
    expect(department).toEqual(expect.objectContaining(expectedObject))
  })
})
