import { Injectable } from '@nestjs/common'
import { CreateAppointmentDto } from '../dto/create-appointment.dto'
import { UpdateAppointmentDto } from '../dto/update-appointment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Appointment } from '../entities/appointment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointment: Appointment =
      this.appointmentRepo.create(createAppointmentDto)
    await this.appointmentRepo.save(appointment)
    return { id: appointment.id }
  }

  findAll() {
    return `This action returns all appointments`
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`
  }
}
