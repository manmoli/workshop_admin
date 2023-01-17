import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsOptional()
  second_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsNumber()
  @IsOptional()
  age: number

  @IsString()
  @IsOptional()
  image_url: string

  @IsString()
  @IsOptional()
  tax_id: string

  @IsString()
  @IsOptional()
  client_id: string

  @IsString()
  @IsOptional()
  phone_number: string
}
