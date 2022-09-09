import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateClientDto } from '../dto/create-client.dto'
import { UpdateClientDto } from '../dto/update-client.dto'
import { Client } from '../entities/client.entity'
import * as _ from 'lodash'

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>
  ) {}
  async create(createClientDto: CreateClientDto): Promise<Client> {
    createClientDto.client_id = this.#generateClientId(createClientDto)
    const client: Client = await this.clientRepo.create(createClientDto)
    await this.clientRepo.save(client)

    return client
  }

  async findAll(findOptions?: FindOptions<Client>): Promise<Client[]> {
    const clients: Client[] = await this.clientRepo.find(findOptions)

    return clients
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

  #generateClientId(clientData: CreateClientDto): string {
    let base = clientData.first_name

    base = clientData.second_name
      ? base.concat(_.capitalize(clientData.second_name))
      : clientData.last_name
      ? base.concat(_.capitalize(clientData.last_name))
      : clientData.age
      ? base.concat(String(clientData.age))
      : base.concat(String(Math.floor(Math.random() * 100)))

    return base
  }
}
