import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
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

  async findOne(id: number): Promise<Client> {
    const client: Client = await this.clientRepo.findOneBy({ id })

    if (client === null) {
      throw new EntityNotFoundError(Client, { id })
    }

    return client
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const { affected } = await this.clientRepo.update({ id }, updateClientDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(Client, { id })
    }

    const client: Client = await this.clientRepo.findOneBy({ id })

    return client
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.clientRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(Client, { id })
    }

    return affected === 1
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
