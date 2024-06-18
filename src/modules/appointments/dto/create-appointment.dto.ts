import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number

  @IsNotEmpty()
  @IsDateString()
  dateIn: Date

  @IsNotEmpty()
  @IsDateString()
  dateOut: Date

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNumber()
  vehicleId: number
}
