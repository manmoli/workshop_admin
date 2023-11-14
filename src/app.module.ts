import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { DataSource } from 'typeorm'
import { BranchModule } from './modules/branches/branch.module'
import { DepartmentsModule } from './modules/departments/departments.module'
import { ConfigModule } from '@nestjs/config'
import { environments } from './environments'
import { DatabaseModule } from './database/database.module'
import config from './conf'
import { joiValidator } from './envValidatorSchema'
import { CustomersModule } from './modules/customers/customers.module'
import { VehiclesModule } from './modules/vehicles/vehicles.module'
import { RouterModule } from '@nestjs/core'
import { UserModule } from './modules/users/users.module'
import { CustomerCheckMiddleware } from './modules/vehicles/middlewares/client-check.middleware'
import { AppointmentsModule } from './modules/appointments/appointments.module';

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
    CustomersModule,
    VehiclesModule,
    RouterModule.register([
      {
        path: 'customers',
        module: CustomersModule,
        children: [
          {
            path: '/:customer_id/vehicles',
            module: VehiclesModule
          }
        ]
      }
    ]),
    UserModule,
    AppointmentsModule
  ]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomerCheckMiddleware)
      .forRoutes(
        { path: 'customers/:customer_id/vehicles', method: RequestMethod.POST },
        { path: 'customers/:customer_id/vehicles', method: RequestMethod.GET }
      )
  }
}
