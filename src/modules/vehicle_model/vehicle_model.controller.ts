import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common'
import { VehicleModel } from './entities/vehicle_model.entity'
import { VehicleModelService } from './vehicle_model.service'
import { CreateVehicleModelDto } from './dto/create-vehicle_model.dto'
import { ParseNumericPipe } from '../../pipes/parseNumericString'
import { FindOptions } from '../../utils/types'
import { UpdateVehicleModelDto } from './dto/update-vehicle_model.dto'


@Controller('vehicle-models')
export class VehicleModelController {
  constructor(private readonly vehiclesService: VehicleModelService) { }

  @Post()
  create(
    @Body(new ParseNumericPipe()) createVehicleDto: CreateVehicleModelDto
  ) {
    return this.vehiclesService.create(createVehicleDto)
  }

  @Get()
  findAll(
    @Query() findOptions: FindOptions<VehicleModel>
  ) {
    return this.vehiclesService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehiclesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleModelDto) {
    return this.vehiclesService.update(id, updateVehicleDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.vehiclesService.remove(+id)
  }
}
