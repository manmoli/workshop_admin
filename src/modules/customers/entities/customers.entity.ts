import { Column, Entity, OneToMany } from 'typeorm'
import { Person } from '../../common/person.entity'
import { Appointment } from '../../appointments/entities/appointment.entity'

@Entity()
export class Customer extends Person {
  @Column({ type: 'varchar', unique: true, nullable: false })
  customer_id: string


  @OneToMany(() => Appointment, (appointments) => appointments.customer, { cascade: true })
  appointments: Appointment[]
}
