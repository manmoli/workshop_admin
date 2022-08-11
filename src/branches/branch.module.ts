import { Module } from '@nestjs/common'
import { DepartmentsModule } from 'src/departments/departments.module'
import { WorkshopController } from './controllers/branch.controller'
import { WorkshopService } from './services/workshop.service'
import { BranchOffice } from './entities/branch.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [WorkshopController],
  providers: [WorkshopService],
  imports: [DepartmentsModule, TypeOrmModule.forFeature([BranchOffice])]
})
export class BranchModule {}
