import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../../../database/database.module'
import { environments } from '../../../environments'
import { joiValidator } from '../../../envValidatorSchema'
import { CustomersModule } from '../../customers/customers.module'
import config from '../../../conf'
import { Test, TestingModule } from '@nestjs/testing'
import { EntityNotFoundError, Repository } from 'typeorm'
import { Customer } from '../../customers/entities/customers.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { createCustomerDto } from '../../../testing/dummies/customers'
import { CustomerCheckMiddleware } from './client-check.middleware'

describe('ClientCheckMiddleware', () => {
  let clientRepo: Repository<Customer>
  let res: Response
  let req: any
  const next = jest.fn()

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          isGlobal: true,
          load: [config],
          validationSchema: joiValidator
        }),
        DatabaseModule,
        CustomersModule
      ]
    }).compile()
    clientRepo = module.get<Repository<Customer>>(getRepositoryToken(Customer))
  })

  beforeEach(async () => {
    await clientRepo.delete({})
    next.mockReset()
  })

  it('should call next function', async () => {
    const clientId: number = (await clientRepo.insert([createCustomerDto]))
      .raw[0].id
    console.log(clientId)
    req = { params: { client_id: `${clientId}` } }
    const clientMiddleware = new CustomerCheckMiddleware(clientRepo)

    await clientMiddleware.use(req, res, next)

    expect(next).toBeCalled()
  })

  it('should return not found error', async () => {
    req = { params: { client_id: 0 } }
    const clientMiddleware = new CustomerCheckMiddleware(clientRepo)

    await expect(clientMiddleware.use(req, res, next)).rejects.toBeInstanceOf(
      EntityNotFoundError
    )
    expect(next).toHaveBeenCalledTimes(0)
  })
})
