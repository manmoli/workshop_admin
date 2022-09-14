import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '../../../database/database.module'
import { environments } from '../../../environments'
import { joiValidator } from '../../../envValidatorSchema'
import { ClientsModule } from '../../clients/clients.module'
import { ClientCheckMiddleware } from './client-check.middleware'
import config from '../../../conf'
import { Test, TestingModule } from '@nestjs/testing'
import { EntityNotFoundError, Repository } from 'typeorm'
import { Client } from '../../clients/entities/client.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { createClientDto } from '../../../testing/dummies/clients'
import { Request } from 'express'

describe('ClientCheckMiddleware', () => {
  let clientRepo: Repository<Client>
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
        ClientsModule
      ]
    }).compile()
    clientRepo = module.get<Repository<Client>>(getRepositoryToken(Client))
  })

  beforeEach(async () => {
    await clientRepo.delete({})
    next.mockReset()
  })

  it('should call next function', async () => {
    const clientId: number = (await clientRepo.insert([createClientDto])).raw[0]
      .id
    console.log(clientId)
    req = { params: { client_id: `${clientId}` } }
    const clientMiddleware = new ClientCheckMiddleware(clientRepo)

    await clientMiddleware.use(req, res, next)

    expect(next).toBeCalled()
  })

  it('should return not found error', async () => {
    req = { params: { client_id: 0 } }
    const clientMiddleware = new ClientCheckMiddleware(clientRepo)

    await expect(clientMiddleware.use(req, res, next)).rejects.toBeInstanceOf(
      EntityNotFoundError
    )
    expect(next).toHaveBeenCalledTimes(0)
  })
})
