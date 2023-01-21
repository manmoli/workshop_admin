import { Module } from '@nestjs/common'
import { VehiclesService } from './services/vehicles.service'
import { VehiclesController } from './controllers/vehicles.controller'
import { Vehicle } from './entities/vehicle.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from '../customers/entities/customers.entity'

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Customer, Vehicle])],
  exports: [VehiclesService, TypeOrmModule.forFeature([Vehicle])]
})
export class VehiclesModule {}
