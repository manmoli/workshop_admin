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
  UsePipes
} from '@nestjs/common'
import { VehiclesService } from '../services/vehicles.service'
import { CreateVehicleDto } from '../dto/create-vehicle.dto'
import { UpdateVehicleDto } from '../dto/update-vehicle.dto'
import { FindOptions } from '../../../utils/types'
import { Vehicle } from '../entities/vehicle.entity'
import { ParseNumericPipe } from '../../../pipes/parseNumericString'

@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(
    @Param('customer_id') customer_id: string,
    @Body(new ParseNumericPipe()) createVehicleDto: CreateVehicleDto
  ) {
    return this.vehiclesService.create({
      ...createVehicleDto,
      customerId: +customer_id
    })
  }

  @Get()
  findAll(@Query() findOptions: FindOptions<Vehicle>) {
    return this.vehiclesService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehiclesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.vehiclesService.remove(+id)
  }
}
