import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BranchOffice } from '../../branches/entities/branch.entity'
import { Customer } from '../../customers/entities/customers.entity'
import { Appointment } from '../../appointments/entities/appointment.entity'
import { ServiceOrder } from '../../service_order/entities/service_order.entity'
import { VehicleModel } from '../../vehicle_model/entities/vehicle_model.entity'

export enum Transmission {
  Automatic = 'automatic',
  Manual = 'manual'
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: false })
  model_year: number

  @Column({ type: 'int', nullable: true })
  number_of_doors: number

  @Column({ type: 'varchar', nullable: true })
  vehicle_engine: string

  @Column({ type: 'varchar', nullable: true })
  vehicle_transmission: Transmission

  @Column({ type: 'varchar', nullable: true })
  color: string

  @Column({ type: 'varchar', nullable: false })
  model: string

  @Column({ type: 'varchar', nullable: true })
  brand: string

  @Column({ type: 'varchar', nullable: true })
  category: string

  @Column({ type: 'int', nullable: false })
  customerId: number

  @Column({ type: 'varchar', nullable: true, unique: true })
  license_plate: string

  @Column({ type: 'varchar', nullable: true, unique: false })
  vin: string

  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    nullable: false
  })
  customer: Customer
  
  @ManyToOne(() => VehicleModel, (vehicleModel) => vehicleModel.vehicles)
  vehicleModel: VehicleModel;

  @OneToMany(() => Appointment, (appointment) => appointment.vehicle, { cascade: true})
  appointments: Appointment[]

  @OneToMany(() => ServiceOrder, (serviceOrders) => serviceOrders.vehicle, {cascade: true})
  serviceOrders: ServiceOrder
}
