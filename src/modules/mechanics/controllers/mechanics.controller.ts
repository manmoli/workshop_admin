import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode
} from '@nestjs/common'
import { FindOptions } from '../../../utils/types'
import { CreateMechanicDto } from '../dto/create-mechanic.dto'
import { UpdateMechanicDto } from '../dto/update-mechanic.dto'
import { Mechanic } from '../entities/mechanic.entity'
import { MechanicsService } from '../services/mechanics.service'

@Controller('mechanics')
export class MechanicsController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  @Post()
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicsService.create(createMechanicDto)
  }

  @Get()
  findAll(findOptions: FindOptions<Mechanic>) {
    return this.mechanicsService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mechanicsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMechanicDto: UpdateMechanicDto
  ) {
    return this.mechanicsService.update(id, updateMechanicDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.mechanicsService.remove(+id)
  }
}
