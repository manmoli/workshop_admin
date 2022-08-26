import { IsString, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
