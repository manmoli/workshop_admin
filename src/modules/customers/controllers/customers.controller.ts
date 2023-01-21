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
import { CustomersService } from '../services/customers.service'
import { CreateCustomerDto } from '../dto/create-customers.dto'
import { UpdateCustomerDto } from '../dto/update-customers.dto'
import { FindOptions } from '../../../utils/types'
import { Customer } from '../entities/customers.entity'
import { EmptyStringToNull } from '../../../pipes/emptyStringToNull'

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UsePipes(new EmptyStringToNull())
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto)
  }

  @Get()
  findAll(findOptions: FindOptions<Customer>) {
    return this.customersService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer> {
    return this.customersService.findOne(id)
  }

  @Patch(':id')
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
