import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsNumber,
  IsDateString
} from 'class-validator'
import { UserType } from '../entities/users.entity'
import { CreatePersonDto } from '../../common/create-person.dto'

export class CreateUserDto extends CreatePersonDto {
  @IsNotEmpty()
  @IsNumber()
  salary: number

  @IsNotEmpty()
  @IsEnum(UserType)
  user_type: UserType

  @IsString()
  days_to_work: string

  @IsNotEmpty()
  @IsDateString()
  employee_since: Date
}
