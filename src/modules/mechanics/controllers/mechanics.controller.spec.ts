import { FactoryProvider } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import {
  createMechanicDto,
  mechanic1,
  mechanic3,
  mechanics,
  updatedMechanicDto
} from '../../../testing/dummies/mechanics'
import { FindOptions } from '../../../utils/types'
import { Mechanic } from '../entities/mechanic.entity'
import { MechanicsService } from '../services/mechanics.service'
import { MechanicsController } from './mechanics.controller'

describe('MechanicsController', () => {
  let mechanicsController: MechanicsController
  let mechanicsSpyService: MechanicsService
  const employeeId = 1

  beforeAll(async () => {
    const mechanicsServiceProvider: FactoryProvider = {
      provide: MechanicsService,
      useFactory: () => ({
        create: jest.fn(() =>
          Promise.resolve({
            ...createMechanicDto,
            employeeId
          })
        ),
        findAll: jest.fn(() => Promise.resolve(mechanics)),
        findOne: jest.fn(() => Promise.resolve(mechanic1)),
        update: jest.fn(() => Promise.resolve(mechanic3)),
        remove: jest.fn(() => Promise.resolve(true))
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MechanicsController],
      providers: [MechanicsService, mechanicsServiceProvider]
    }).compile()

    mechanicsController = module.get<MechanicsController>(MechanicsController)
    mechanicsSpyService = module.get<MechanicsService>(MechanicsService)
  })

  it('create mechanic', async () => {
    const mechanic: Mechanic = await mechanicsController.create(
      createMechanicDto
    )

    expect(mechanic).toBeInstanceOf(Mechanic)
    expect(mechanicsSpyService.create).toBeCalledTimes(1)
    expect(mechanicsSpyService.create).toHaveBeenCalledWith({
      ...createMechanicDto,
      employeeId
    })
  })

  it('get all mechanics', async () => {
    const findOptions: FindOptions<Mechanic> = {}
    const mechanics: Mechanic[] = await mechanicsController.findAll(findOptions)

    expect(mechanics).toBeInstanceOf(Array<Mechanic>)
    expect(mechanics.length).toEqual(3)
    expect(mechanicsSpyService.findAll).toBeCalledWith(findOptions)
    expect(mechanicsSpyService.findAll).toBeCalledTimes(1)
  })

  it('get one mechanic', async () => {
    const mechanics: Mechanic[] = await mechanicsController.findOne(employeeId)

    expect(mechanics).toBeInstanceOf(Mechanic)
    expect(mechanicsSpyService.findAll).toBeCalledWith(employeeId)
    expect(mechanicsSpyService.findAll).toBeCalledTimes(1)
  })

  it('update a mechanic', async () => {
    const mechanic: Mechanic = await mechanicsController.update(
      employeeId,
      updatedMechanicDto
    )

    expect(mechanic).toBeInstanceOf(Mechanic)
    expect(mechanicsSpyService.update).toBeCalledWith(
      employeeId,
      updatedMechanicDto
    )
    expect(mechanicsSpyService.update).toBeCalledTimes(1)
  })

  it('delete a mechanic', async () => {
    await mechanicsController.remove(employeeId)

    expect(mechanicsSpyService.remove).toBeCalledWith(employeeId)
    expect(mechanicsSpyService.remove).toBeCalledTimes(1)
  })
})
