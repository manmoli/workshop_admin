import { Module } from '@nestjs/common'
import { CustomersService } from './services/customers.service'
import { CustomersController } from './controllers/customers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './entities/customers.entity'
import { Vehicle } from '../vehicles/entities/vehicle.entity'

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, TypeOrmModule.forFeature([Customer])],
  imports: [TypeOrmModule.forFeature([Customer, Vehicle])]
})
export class CustomersModule {}
