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
import { ClientsService } from '../services/clients.service'
import { CreateClientDto } from '../dto/create-client.dto'
import { UpdateClientDto } from '../dto/update-client.dto'
import { FindOptions } from '../../../utils/types'
import { Client } from '../entities/client.entity'

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto)
  }

  @Get()
  findAll(findOptions: FindOptions<Client>) {
    return this.clientsService.findAll(findOptions)
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Client> {
    return this.clientsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto
  ): Promise<Client> {
    return this.clientsService.update(id, updateClientDto)
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientsService.remove(id)
  }
}
