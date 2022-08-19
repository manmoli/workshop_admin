import { Module } from '@nestjs/common'
import { WorkshopController } from './controllers/branch.controller'
import { WorkshopService } from './services/branch.service'
import { BranchOffice } from './entities/branch.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Department } from '../departments/entities/department.entity'

@Module({
  controllers: [WorkshopController],
  providers: [WorkshopService],
  exports: [WorkshopService],
  imports: [TypeOrmModule.forFeature([BranchOffice, Department])]
})
export class BranchModule {}
