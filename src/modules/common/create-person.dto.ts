import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator'

export class CreatePersonDto {
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

  @IsPhoneNumber()
  phone_number: string
}
