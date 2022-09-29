import { Module } from '@nestjs/common'
import { ClientsService } from './services/clients.service'
import { ClientsController } from './controllers/clients.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from './entities/client.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService, TypeOrmModule.forFeature([Client])],
  imports: [TypeOrmModule.forFeature([Client, Vehicle])]
})
export class ClientsModule {}
