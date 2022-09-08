import { Test, TestingModule } from '@nestjs/testing'
import { WorkshopController } from './branch.controller'
import { WorkshopService } from '../services/branch.service'

describe('AppController', () => {
  let appController: WorkshopController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopController],
      providers: [WorkshopService]
    }).compile()

    appController = app.get<WorkshopController>(WorkshopController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(appController.get()).toBe('Hello World!')
    })
  })
})
