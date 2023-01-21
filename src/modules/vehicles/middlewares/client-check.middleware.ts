import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { EntityNotFoundError, Repository } from 'typeorm'
import { Customer } from '../../customers/entities/customers.entity'

@Injectable()
export class CustomerCheckMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Customer) private clientRepo: Repository<Customer>
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const clientId: number = +req.params.client_id
    const customer: Customer = await this.clientRepo.findOneBy({ id: clientId })

    if (customer === null) {
      throw new EntityNotFoundError(Customer, { id: clientId })
    }
    next()
  }
}
