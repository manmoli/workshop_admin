import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { EntityNotFoundError, Repository } from 'typeorm'
import { Client } from '../../clients/entities/client.entity'

@Injectable()
export class ClientCheckMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const clientId: number = +req.params.client_id
    const client: Client = await this.clientRepo.findOneBy({ id: clientId })

    if (client === null) {
      throw new EntityNotFoundError(Client, { id: clientId })
    }
    next()
  }
}
