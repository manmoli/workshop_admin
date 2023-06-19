import { IsNotEmpty, IsString } from 'class-validator'
import { CreatePersonDto } from '../../common/create-person.dto'

export class CreateUserDto extends CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  password: string
}
