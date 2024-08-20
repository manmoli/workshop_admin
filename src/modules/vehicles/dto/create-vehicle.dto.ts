import { IsNumber, IsOptional, IsString } from 'class-validator'

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

  @IsString()
  vehicle_transmission: string

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
