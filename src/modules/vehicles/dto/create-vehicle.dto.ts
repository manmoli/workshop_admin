import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transmission } from '../entities/vehicle.entity'

export class CreateVehicleDto {
  @IsOptional()
  @IsDate()
  modelDate: Date

  @IsOptional()
  @IsString()
  model: string

  @IsString()
  brand: string

  @IsOptional()
  @IsString()
  vehicleEngine: string

  @IsEnum(Transmission)
  vehicleTransmission: Transmission

  @IsOptional()
  @IsString()
  color: string

  @IsOptional()
  @IsNumber()
  numberOfDoors: number

  @IsString()
  category: string

  @IsNumber()
  @IsOptional()
  clientId: number

  @IsString()
  @IsOptional()
  registration: string
}
