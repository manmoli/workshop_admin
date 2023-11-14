import { Module } from '@nestjs/common'
import { AppointmentsController } from './controllers/appointments.controller'
import { AppointmentsService } from './services/appointments.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Appointment } from './entities/appointment.entity'
import { Customer } from '../customers/entities/customers.entity'

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [TypeOrmModule.forFeature([Appointment, Customer])]
})
export class AppointmentsModule {}
