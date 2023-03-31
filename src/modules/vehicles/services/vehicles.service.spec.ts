import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm'
import { AppModule } from '../../../app.module'
import {
  createCustomerDto,
  createCustomerDto1
} from '../../../testing/dummies/customers'
import {
  createVehicleDto,
  updateVehicleDto,
  vehiclesArray
} from '../../../testing/dummies/vehicles'
import { Customer } from '../../customers/entities/customers.entity'
import { Vehicle } from '../entities/vehicle.entity'
import { VehiclesService } from './vehicles.service'

describe('VehiclesService', () => {
  let vehiclesService: VehiclesService
  let vehicleRepo: Repository<Vehicle>
  let clientRepo: Repository<Customer>
  let customer_id: number
  let customer_id2: number
  let vehicleId: number
  let vehiclesWithcustomer_id

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    vehiclesService = module.get<VehiclesService>(VehiclesService)
    vehicleRepo = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle))
    clientRepo = module.get<Repository<Customer>>(getRepositoryToken(Customer))
  })

  beforeEach(async () => {
    await vehicleRepo.delete({})
    await clientRepo.delete({})

    const { identifiers } = await clientRepo.insert([
      createCustomerDto,
      createCustomerDto1
    ])
    customer_id = identifiers[0].id
    customer_id2 = identifiers[1].id
    createVehicleDto.customerId = customer_id
    vehiclesWithcustomer_id = vehiclesArray.map((v) => ({
      ...v,
      customer_id
    }))
    vehiclesWithcustomer_id[0].customer_id = customer_id2
    vehicleId = (await vehicleRepo.insert(vehiclesWithcustomer_id))
      .identifiers[0].id
  })

  describe('create vehicle', () => {
    it('should create a vehicle', async () => {
      const vehicle = await vehiclesService.create(createVehicleDto)

      expect(vehicle).toBeInstanceOf(Vehicle)
      expect(vehicle).toEqual(expect.objectContaining(createVehicleDto))
    })

    it('should throw Vehicle already exists error when the license_plate is already in db', async () => {
      await vehicleRepo.insert([
        { ...createVehicleDto, license_plate: 'existing' }
      ])

      await expect(
        vehiclesService.create({
          ...createVehicleDto,
          license_plate: 'existing'
        })
      ).rejects.toBeInstanceOf(QueryFailedError)
    })
  })

  describe('find vehicles', () => {
    it('should return all vehicles', async () => {
      const vehicles = await vehiclesService.findAll({})

      expect(vehicles).toBeInstanceOf(Array<Vehicle>)
      expect(vehicles.length).toEqual(4)
    })

    it('should return all vehicles from a customer', async () => {
      const vehicles = await vehiclesService.findAll({
        where: { customerId: customer_id }
      })

      expect(vehicles).toBeInstanceOf(Array<Vehicle>)
      expect(vehicles.length).toEqual(3)
    })

    it('should return 2 vehicles from a customer', async () => {
      const vehicles = await vehiclesService.findAll({
        take: 2,
        where: { customerId: customer_id }
      })

      expect(vehicles).toBeInstanceOf(Array<Vehicle>)
      expect(vehicles.length).toEqual(2)
    })
  })

  describe('findOne vehicle', () => {
    it('should return a vehicle', async () => {
      const vehicle = await vehiclesService.findOne(vehicleId)

      expect(vehicle).toBeInstanceOf(Vehicle)
    })
    it('should return an error when vehicle does not exists', async () => {
      const nonExistingVehicleId = 0

      await expect(
        vehiclesService.findOne(nonExistingVehicleId)
      ).rejects.toBeInstanceOf(EntityNotFoundError)
    })
  })

  describe('update vehicle', () => {
    it('should update a vehicle', async () => {
      const vehicle = await vehiclesService.update(vehicleId, updateVehicleDto)

      expect(vehicle).toEqual(
        expect.objectContaining({
          ...updateVehicleDto
        })
      )
    })
    it('should return not found', async () => {
      const nonExistingId = 0

      await expect(
        vehiclesService.update(nonExistingId, updateVehicleDto)
      ).rejects.toBeInstanceOf(EntityNotFoundError)
    })
    it('should return entity already exists when the license_plate already exists', async () => {
      await vehicleRepo.insert({
        ...vehiclesWithcustomer_id[0],
        license_plate: 'newOne'
      })

      await expect(
        vehiclesService.update(vehicleId, { license_plate: 'newOne' })
      ).rejects.toBeInstanceOf(QueryFailedError)
    })
  })

  describe('delete vehicle', () => {
    it('should remove a vehicle', async () => {
      const response = await vehiclesService.remove(vehicleId)

      expect(response).toEqual(true)
    })
    it('should return not found', async () => {
      const nonExistingId = 0
      await expect(
        vehiclesService.remove(nonExistingId)
      ).rejects.toBeInstanceOf(EntityNotFoundError)
    })
  })
})
