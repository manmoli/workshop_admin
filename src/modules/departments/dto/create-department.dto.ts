import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsNumber()
  @IsNotEmpty()
  readonly branchId: number
}
