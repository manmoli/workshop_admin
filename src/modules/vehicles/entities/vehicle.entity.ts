import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BranchOffice } from '../../branches/entities/branch.entity'
import { Customer } from '../../customers/entities/customers.entity'

export enum Transmission {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date', nullable: false })
  modelDate: Date

  @Column({ type: 'int', nullable: true })
  numberOfDoors: number

  @Column({ type: 'varchar', nullable: true })
  vehicleEngine: string

  @Column({ type: 'varchar', nullable: true })
  vehicleTransmission: Transmission

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
  registration: string

  @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    nullable: false
  })
  customer: Customer
}
