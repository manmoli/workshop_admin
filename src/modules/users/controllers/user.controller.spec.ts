import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './user.controller'
import { UsersService } from '../services/users.service'

describe('UserController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
