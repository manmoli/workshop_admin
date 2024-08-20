import { Module } from '@nestjs/common'
import { VehiclesService } from './services/vehicles.service'
import { VehiclesController } from './controllers/vehicles.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from '../customers/entities/customers.entity'
import { CustomerVehicle } from './entities/vehicle.entity'

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Customer, CustomerVehicle])],
  exports: [VehiclesService, TypeOrmModule.forFeature([CustomerVehicle])]
})
export class VehiclesModule {}
