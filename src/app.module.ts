import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ConfigModule } from '@nestjs/config'
import { environments } from './environments'
import { DatabaseModule } from './database/database.module'
import config from './conf'
import { joiValidator } from './envValidatorSchema'
import { CustomersModule } from './modules/customers/customers.module'
import { CustomerVehicleModule } from './modules/customer_vehicles/customer_vehicles.module'
import { RouterModule } from '@nestjs/core'
import { CustomerCheckMiddleware } from './modules/customer_vehicles/middlewares/client-check.middleware'
import { VehicleModelModule } from './modules/vehicle_model/vehicle_model.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: joiValidator
    }),
    DatabaseModule,
    CustomersModule,
    CustomerVehicleModule,
    RouterModule.register([
      {
        path: 'customers',
        module: CustomersModule,
        children: [
          {
            path: '/:customerId/vehicles',
            module: CustomerVehicleModule
          }
        ]
      }
    ]),
    VehicleModelModule
  ]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CustomerCheckMiddleware)
      .forRoutes(
        { path: 'customers/:customerId/vehicles', method: RequestMethod.GET }
      )
  }
}
