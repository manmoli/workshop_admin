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
  UsePipes,
  Put
} from '@nestjs/common'
import { CustomerVehiclesService } from './customer_vehicles.service'
import { CreateCustomerVehicleDto } from './dto/create-customer-vehicle.dto'
import { ParseNumericPipe } from '../../pipes/parseNumericString'
import { FindOptions } from '../../utils/types'
import { UpdateCustomerVehicleDto } from './dto/update-customer-vehicle.dto'
import { CustomerVehicleI } from './customer_vehicles.interfaces'
import { Customer } from '../customers/entities/customers.entity'


@Controller()
export class CustomerVehiclesController {
  constructor(private readonly customerVehiclesService: CustomerVehiclesService) { }

  @Post()
  create(
    @Body(new ParseNumericPipe()) createVehicleDto: CreateCustomerVehicleDto,
  ) {
    return this.customerVehiclesService.create(createVehicleDto)
  }

  @Get()
  findAll(
    @Param('customerId') customerId: number,
    @Query() findOptions: FindOptions<CustomerVehicleI>,
  ) {
    return this.customerVehiclesService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerVehiclesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateVehicleDto: UpdateCustomerVehicleDto) {
    return this.customerVehiclesService.update(id, updateVehicleDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.customerVehiclesService.remove(+id)
  }
}
