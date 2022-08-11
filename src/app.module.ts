import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BranchModule } from './branches/branch.module'
import { DepartmentsModule } from './departments/departments.module'
import { ConfigModule } from '@nestjs/config'
import { environments } from './environments'
import { DatabaseModule } from './database/database.module'
import config from './conf'
import { joiValidator } from './envValidatorSchema'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: joiValidator
    }),
    BranchModule,
    DepartmentsModule,
    DatabaseModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
