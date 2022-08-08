import { Module } from '@nestjs/common'
import { WorkshopController } from './controllers/branch.controller'
import { WorkshopService } from './services/workshop.service'

@Module({
  controllers: [WorkshopController],
  providers: [WorkshopService]
})
export class BranchModule {}
