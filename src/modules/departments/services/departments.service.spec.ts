import { Test, TestingModule } from '@nestjs/testing'
import { DepartmentsService } from './departments.service'
import { BranchOffice } from '../../branches/entities/branch.entity'
import {
  EntityNotFoundError,
  QueryFailedError,
  Repository,
  UpdateValuesMissingError
} from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Department } from '../entities/department.entity'
import { ConfigModule } from '@nestjs/config'
import { environments } from '../../../environments'
import config from '../../../conf'
import { joiValidator } from '../../../envValidatorSchema'
import { CreateDepartmentDto } from '../dto/create-department.dto'
import { BranchModule } from '../../branches/branch.module'
import { DepartmentsModule } from '../departments.module'
import { DatabaseModule } from '../../../database/database.module'
import { AttributeWithNameAlreadyExists } from '../../../Errors/customDatabaseErrors'
import { UpdateDepartmentDto } from '../dto/update-department.dto'

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

  describe('create departments', () => {
    it('should create a department', async () => {
      expect(departmentService).toBeDefined()
      const department: Department = await departmentService.create(
        departmentObject
      )

      const expectedObject = {
        name: departmentName,
        branchId: storedBranch.id
      }

      expect(department).toBeDefined()
      expect(department).toEqual(expect.objectContaining(expectedObject))
    })

    it('should throw an error when department already exists with the same branch', async () => {
      const failTestDepartment = await departmentRepo.create(departmentObject)
      await departmentRepo.save(failTestDepartment)

      await expect(
        departmentService.create(departmentObject)
      ).rejects.toBeInstanceOf(AttributeWithNameAlreadyExists)
    })
  })

  describe('find departments', () => {
    const searchingName = 'theNameImLookingFor'
    let newDepartment
    let newDepartment2
    let newDepartment3
    beforeEach(async () => {
      storedBranch = await branchRepo.save(
        branchRepo.create({ name: 'DepartmentsTest' })
      )
      branchId = storedBranch.id
      departmentObject = {
        branchId,
        name: departmentName
      }
      newDepartment = { ...departmentObject, name: searchingName }
      newDepartment2 = { ...departmentObject, name: 'randomName1' }
      newDepartment3 = { ...departmentObject, name: 'randomName2' }
      await departmentRepo.insert([
        departmentObject,
        newDepartment,
        newDepartment2,
        newDepartment3
      ])
    })

    it('should find all departments', async () => {
      const departments: Department[] = await departmentService.findAll()

      expect(departments.length).toEqual(4)
    })

    it('should find three departments', async () => {
      const departments: Department[] = await departmentService.findAll({
        take: 3
      })

      expect(departments.length).toEqual(3)
    })

    it('should find all departments with the given name', async () => {
      const departments: Department[] = await departmentService.findAll({
        where: { name: searchingName }
      })

      expect(departments.length).toEqual(1)
      expect(departments).toEqual([expect.objectContaining(newDepartment)])
    })

    it('should find all departments with the given name', async () => {
      const departments: Department[] = await departmentService.findAll({
        where: { name: searchingName }
      })

      expect(departments.length).toEqual(1)
      expect(departments).toEqual([expect.objectContaining(newDepartment)])
    })
  })

  describe('find one department', () => {
    it('should return the department', async () => {
      const newDepartment: Department = await departmentRepo.create(
        departmentObject
      )
      await departmentRepo.save(newDepartment)

      newDepartment.branch = storedBranch

      const department = await departmentService.findOne(newDepartment.id)

      expect(department).toEqual(newDepartment)
    })

    it('should return error when no department found', async () => {
      await expect(departmentService.findOne(123)).rejects.toBeInstanceOf(
        EntityNotFoundError
      )
    })
  })

  describe('update department', () => {
    it('should update a department', async () => {
      const { id } = (await departmentRepo.insert(departmentObject)).raw[0]
      const updatedData: UpdateDepartmentDto = { name: 'newName' }
      const updatedDepartment: Department = await departmentService.update(
        id,
        updatedData
      )

      expect(updatedDepartment).toEqual(
        expect.objectContaining({ id, ...updatedData })
      )
    })

    it('should fail because the entity does not exists', async () => {
      const nonExistingId = 12321
      await expect(
        departmentService.update(nonExistingId, { name: 'any' })
      ).rejects.toBeInstanceOf(EntityNotFoundError)
    })

    it('should fail because update values are missing', async () => {
      const nonExistingId = 12321
      await expect(
        departmentService.update(nonExistingId, {})
      ).rejects.toBeInstanceOf(UpdateValuesMissingError)
    })

    it('should fail because the updated name already exists (violates constraint)', async () => {
      await departmentRepo.insert(departmentObject)
      const { id } = (
        await departmentRepo.insert({
          ...departmentObject,
          name: 'a-different-one'
        })
      ).raw[0]

      const existingName: string = departmentObject.name

      await expect(
        departmentService.update(id, { name: existingName })
      ).rejects.toBeInstanceOf(QueryFailedError)
    })
  })

  describe('remove department', () => {
    it('should remove a department', async () => {
      const { id } = (await departmentRepo.insert(departmentObject)).raw[0]
      expect(await departmentService.remove(id)).toEqual(true)
    })

    it('should return false if the element does not exists', async () => {
      expect(
        await departmentService.remove(Math.floor(Math.random() * 1000))
      ).toEqual(false)
    })
  })
})
