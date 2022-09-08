import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateClientDto } from '../dto/create-client.dto'
import { UpdateClientDto } from '../dto/update-client.dto'
import { Client } from '../entities/client.entity'

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>
  ) {}
  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client'
  }

  findAll(findOptions: FindOptions<Client>): any {
    return `This action returns all clients`
  }

  findOne(id: number): any {
    return `This action returns a #${id} client`
  }

  update(id: number, updateClientDto: UpdateClientDto): any {
    return `This action updates a #${id} client`
  }

  remove(id: number): any {
    return `This action removes a #${id} client`
  }
}
