import { Column, Entity, OneToMany } from 'typeorm'
import { Person } from '../../common/person.entity'
import { CustomerVehicle } from '../../customer_vehicles/entities/customer_vehicle.entity'

@Entity()
export class Customer extends Person {
  @Column({ type: 'varchar', unique: true, nullable: false })
  customerId: string

  @OneToMany(() => CustomerVehicle, customerVehicle => customerVehicle.customer, { cascade: true })
  customerVehicles: CustomerVehicle[]
}