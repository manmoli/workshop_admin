import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsOptional()
  secondName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNumber()
  @IsOptional()
  age: number

  @IsString()
  @IsOptional()
  customerId: string

  @IsString()
  @IsOptional()
  phoneNumber: string

  @IsString()
  @IsOptional()
  imageUrl: string
}

export class CreateCustomerWIthImageDto extends CreateCustomerDto {
  @IsString()
  @IsOptional()
  photo: string
}
