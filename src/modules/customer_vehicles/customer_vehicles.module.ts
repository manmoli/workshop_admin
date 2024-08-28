import { Module } from '@nestjs/common'
import { CustomerVehiclesService } from './customer_vehicles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from '../customers/entities/customers.entity'
import { CustomerVehicle } from './entities/customer_vehicle.entity'
import { CustomerVehiclesController } from './customer_vehicles.controller'
import { CommonCustomerModule } from '../common/services/customers/common-customers.module'

@Module({
  controllers: [CustomerVehiclesController],
  providers: [CustomerVehiclesService],
  imports: [TypeOrmModule.forFeature([Customer, CustomerVehicle]), CommonCustomerModule],
  exports: [CustomerVehiclesService, TypeOrmModule.forFeature([CustomerVehicle])]
})
export class CustomerVehicleModule {}
