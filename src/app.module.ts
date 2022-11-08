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
import { ClientsModule } from './modules/clients/clients.module'
import { VehiclesModule } from './modules/vehicles/vehicles.module'
import { vehicleRouteTree } from './modules/vehicles/routes'
import { RouterModule } from '@nestjs/core'
import { ClientCheckMiddleware } from './modules/vehicles/middlewares/client-check.middleware'
import { MechanicsModule } from './modules/mechanics/mechanics.module';

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
    ClientsModule,
    VehiclesModule,
    RouterModule.register([
      {
        path: 'clients',
        module: ClientsModule,
        children: [
          {
            path: '/:client_id/vehicles',
            module: VehiclesModule
          }
        ]
      }
    ]),
    MechanicsModule
  ]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClientCheckMiddleware)
      .forRoutes(
        { path: 'clients/:client_id/vehicles', method: RequestMethod.POST },
        { path: 'clients/:client_id/vehicles', method: RequestMethod.GET }
      )
  }
}
