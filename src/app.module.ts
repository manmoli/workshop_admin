import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { TypeOrmModuleConfig } from 'src/configuration'
import { BranchModule } from './branches/branch.module'
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmModuleConfig), BranchModule, DepartmentsModule]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
