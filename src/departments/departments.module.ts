import { Module } from '@nestjs/common'
import { DepartmentsController } from './controllers/departments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Department } from './entities/department.entity'
import { WorkshopService } from '../branches/services/branch.service'
import { DepartmentsService } from './services/departments.service'
import { BranchOffice } from '../branches/entities/branch.entity'

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, WorkshopService],
  exports: [DepartmentsService],
  imports: [TypeOrmModule.forFeature([Department, BranchOffice])]
})
export class DepartmentsModule {}
