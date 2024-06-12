import { Test, TestingModule } from '@nestjs/testing'
import { VehiclesController } from './vehicles.controller'
import { VehiclesService } from '../services/vehicles.service'
import { Vehicle } from '../entities/vehicle.entity'
import {
  createVehicleDto,
  specificVehicle,
  updatedSpecificVehicle,
  vehicle1,
  vehicle2,
  vehiclesArray
} from '../../../testing/dummies/vehicles'
import { updatedSpecificClient } from '../../../testing/dummies/customers'
import { FindOptions } from '../../../utils/types'

describe('VehiclesController', () => {
  let vehiclesController: VehiclesController
  let vehiclesSpyService: VehiclesService
  const customerId = 1
  const vehicleId = 234

  beforeAll(async () => {
    const vehicleServiceProvider = {
      provide: VehiclesService,
      useFactory: () => ({
        create: jest.fn(() => new Vehicle()),
        findAll: jest.fn(() => vehiclesArray),
        findOne: jest.fn(() => vehicle2),
        update: jest.fn(() => Promise.resolve(vehicle1)),
        remove: jest.fn(() => Promise.resolve(true))
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesService, vehicleServiceProvider]
    }).compile()

    vehiclesController = module.get<VehiclesController>(VehiclesController)
    vehiclesSpyService = module.get<VehiclesService>(VehiclesService)
  })

  it('should create a vehicle', async () => {
    const vehicle = await vehiclesController.create(
      String(customerId),
      createVehicleDto
    )

    expect(vehicle).toBeInstanceOf(Vehicle)
    expect(vehiclesSpyService.create).toHaveBeenCalledWith({
      ...createVehicleDto,
      customerId
    })
  })

  it('should get all vehicles from a customer', async () => {
/*     const findOptions: FindOptions<Vehicle> = {
      take: 10,
      where: {
        brand: 'Honda'
      }
    }

    const vehicles = await vehiclesController.findAll(findOptions)

    expect(vehicles).toBeInstanceOf(Array<Vehicle>)
    expect(vehicles.length).toEqual(4)
    expect(vehiclesSpyService.findAll).toHaveBeenCalledWith(findOptions) */
  })

  it('should update a vehicle', async () => {
    const vehicle = await vehiclesController.update(vehicleId, createVehicleDto)

    expect(vehiclesSpyService.update).toHaveBeenCalledWith(
      vehicleId,
      createVehicleDto
    )
    expect(vehicle).toBeInstanceOf(Vehicle)
  })

  it('should get a vehicle', async () => {
    const vehicle = await vehiclesController.findOne(vehicleId)

    expect(vehicle).toBeInstanceOf(Vehicle)
    expect(vehiclesSpyService.findOne).toHaveBeenCalledWith(vehicleId)
  })

  it('should delete a vehicle', async () => {
    await vehiclesController.remove(vehicleId)

    expect(vehiclesSpyService.remove).toHaveBeenCalledWith(vehicleId)
  })
})
