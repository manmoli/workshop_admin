import { Module } from '@nestjs/common'
import { ClientsService } from './services/clients.service'
import { ClientsController } from './controllers/clients.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from './entities/client.entity'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client])],
  exports: [TypeOrmModule.forFeature([Client])]
})
export class ClientsModule {}
