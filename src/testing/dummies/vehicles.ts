import { CreateVehicleDto } from '../../modules/vehicles/dto/create-vehicle.dto'
import {
  Transmission,
  Vehicle
} from '../../modules/vehicles/entities/vehicle.entity'

export const createVehicleDto: CreateVehicleDto = {
  modelDate: new Date(),
  model: 'Accord',
  brand: 'Honda',
  vehicleEngine: '2.4L',
  vehicleTransmission: Transmission.Automatic,
  color: 'white',
  numberOfDoors: 4,
  category: 'sedan',
  clientId: null
}

export const vehicle1 = new Vehicle()
export const vehicle2 = new Vehicle()
export const vehicle3 = new Vehicle()
export const vehicle4 = new Vehicle()

export const specificVehicle = { ...vehicle1, id: 1 }

export const updatedSpecificVehicle = { ...specificVehicle, brand: 'Ford' }

export const vehiclesArray = [vehicle1, vehicle2, vehicle3, vehicle4]
