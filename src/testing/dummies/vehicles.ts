import { CreateVehicleDto } from '../../modules/vehicles/dto/create-vehicle.dto'
import { UpdateVehicleDto } from '../../modules/vehicles/dto/update-vehicle.dto'
import {
  Transmission,
  Vehicle
} from '../../modules/vehicles/entities/vehicle.entity'

export const createVehicleDto: CreateVehicleDto = {
  model_year: 2003,
  model: 'Accord',
  brand: 'Honda',
  vehicle_engine: '2.4L',
  vehicle_transmission: Transmission.Automatic,
  color: 'white',
  number_of_doors: 4,
  category: 'sedan',
  customerId: null,
  license_plate: 'abc123',
  vin: 'somethingVin'
}

export const updateVehicleDto: UpdateVehicleDto = {
  model: 'Civic',
  vehicle_engine: '1.8L'
}

export const vehicle1 = new Vehicle()
export const vehicle2 = new Vehicle()
export const vehicle3 = new Vehicle()
export const vehicle4 = new Vehicle()

export const specificVehicle = { ...vehicle1, id: 1 }

export const updatedSpecificVehicle = { ...specificVehicle, brand: 'Ford' }

export const vehiclesArray = [
  { ...vehicle1, modelYear: '2003', model: '1' },
  { ...vehicle2, modelYear: '2004', model: '2' },
  { ...vehicle3, modelYear: '2005', model: '3' },
  { ...vehicle4, modelYear: '2006', model: '4' }
]
