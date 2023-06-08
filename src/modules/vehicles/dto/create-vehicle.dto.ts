import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transmission } from '../entities/vehicle.entity'

export class CreateVehicleDto {
  @IsOptional()
  @IsNumber()
  model_year: number

  @IsOptional()
  @IsString()
  model: string

  @IsString()
  brand: string

  @IsOptional()
  @IsString()
  vehicle_engine: string

  @IsEnum(Transmission)
  vehicle_transmission: Transmission

  @IsOptional()
  @IsString()
  color: string

  @IsOptional()
  @IsNumber()
  number_of_doors: number

  @IsString()
  @IsOptional()
  category: string

  @IsNumber()
  @IsOptional()
  customerId: number

  @IsString()
  @IsOptional()
  license_plate: string

  @IsString()
  @IsOptional()
  vin: string
}
