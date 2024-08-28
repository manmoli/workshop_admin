import { Customer } from "../customers/entities/customers.entity"

export interface CustomerVehicleI {
    id: number
    license_plate: string
    vin: string
    vehicle_model_id: number
    VehicleModel
    customerId: number
}
