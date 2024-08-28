import { Column, Entity, OneToMany } from 'typeorm'
import { Person } from '../../common/person.entity'
import { Appointment } from '../../appointments/entities/appointment.entity'
import { CustomerVehicle } from '../../customer_vehicles/entities/customer_vehicle.entity'

@Entity()
export class Customer extends Person {
  @Column({ type: 'varchar', unique: true, nullable: false })
  customerId: string

  @OneToMany(() => CustomerVehicle, customerVehicle => customerVehicle.customer)
  customerVehicles: CustomerVehicle[]
}