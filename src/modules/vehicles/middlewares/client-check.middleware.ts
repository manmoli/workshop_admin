import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { EntityNotFoundError, Repository } from 'typeorm'
import { Customer } from '../../customers/entities/customers.entity'

@Injectable()
export class CustomerCheckMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const customer_id: number = +req.params.customer_id
    const customer: Customer = await this.customerRepo.findOneBy({
      id: customer_id
    })

    if (customer === null) {
      throw new EntityNotFoundError(Customer, { id: customer_id })
    }
    next()
  }
}
