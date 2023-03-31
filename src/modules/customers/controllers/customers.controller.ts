import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { CustomersService } from '../services/customers.service'
import {
  CreateCustomerDto,
  CreateCustomerWIthImageDto
} from '../dto/create-customers.dto'
import { UpdateCustomerDto } from '../dto/update-customers.dto'
import { FindOptions } from '../../../utils/types'
import { Customer } from '../entities/customers.entity'
import { EmptyStringToNull } from '../../../pipes/emptyStringToNull'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UsePipes(new EmptyStringToNull())
  @Post()
  create(@Body() createCustomerDto: CreateCustomerWIthImageDto) {
    const customerDtoObject = new CreateCustomerDto()
    customerDtoObject.first_name = createCustomerDto.first_name
    customerDtoObject.last_name = createCustomerDto.last_name
    customerDtoObject.phone_number = createCustomerDto.phone_number
    return this.customersService.create(customerDtoObject)
  }

  @Get()
  findAll(@Query() findOptions: FindOptions<Customer>) {
    return this.customersService.findAllWithVehicles(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customersService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<Customer> {
    return this.customersService.update(id, updateCustomerDto)
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id)
  }
}
