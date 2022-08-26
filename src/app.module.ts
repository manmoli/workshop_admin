import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BranchModule } from './modules/branches/branch.module'
import { DepartmentsModule } from './modules/departments/departments.module'
import { ConfigModule } from '@nestjs/config'
import { environments } from './environments'
import { DatabaseModule } from './database/database.module'
import config from './conf'
import { joiValidator } from './envValidatorSchema'
import { ClientsModule } from './modules/clients/clients.module'

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
    DatabaseModule,
    ClientsModule
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
