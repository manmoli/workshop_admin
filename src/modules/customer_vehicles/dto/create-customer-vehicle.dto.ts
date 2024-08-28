import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCustomerVehicleDto {
  @IsNumber()
  customerId: number

  @IsNumber()
  vehicleModelId: number
  
  @IsOptional()
  @IsString()
  licensePlate: string

  @IsOptional()
  @IsString()
  vin: string
}
