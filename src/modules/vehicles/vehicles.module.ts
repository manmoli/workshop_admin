import { Module } from '@nestjs/common'
import { VehiclesService } from './services/vehicles.service'
import { VehiclesController } from './controllers/vehicles.controller'
import { Vehicle } from './entities/vehicle.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from '../clients/entities/client.entity'

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Client, Vehicle])],
  exports: [VehiclesService, TypeOrmModule.forFeature([Vehicle])]
})
export class VehiclesModule {}
