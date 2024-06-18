import { Column, Entity, OneToMany } from 'typeorm'
import { Person } from '../../common/person.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'
import { Appointment } from '../../appointments/entities/appointment.entity'

@Entity()
export class Customer extends Person {
  @Column({ type: 'varchar', unique: true, nullable: false })
  customer_id: string

  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer)
  vehicles: Vehicle[]

  @OneToMany(() => Appointment, (appointments) => appointments.customer, { cascade: true })
  appointments: Appointment[]
}
