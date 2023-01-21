import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes
} from '@nestjs/common'
import { AdministratorsService } from '../services/administrators.service'
import { CreateAdministratorDto } from '../dto/create-administrator.dto'
import { UpdateAdministratorDto } from '../dto/update-administrator.dto'
import { FindOptions } from '../../../utils/types'
import { Administrator } from '../entities/administrator.entity'
import { EmptyStringToNull } from '../../../pipes/emptyStringToNull'

@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @UsePipes(new EmptyStringToNull())
  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorsService.create(createAdministratorDto)
  }

  @Get()
  findAll(findOptions: FindOptions<Administrator>) {
    return this.administratorsService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Administrator> {
    return this.administratorsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAdministratorDto: UpdateAdministratorDto
  ): Promise<Administrator> {
    return this.administratorsService.update(id, updateAdministratorDto)
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.administratorsService.remove(id)
  }
}
