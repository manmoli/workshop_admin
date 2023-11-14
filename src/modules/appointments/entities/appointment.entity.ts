import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from '../../customers/entities/customers.entity'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', nullable: false })
  customerId: number

  @ManyToOne(() => Customer, (customer) => customer.appointments, {
    onDelete: 'CASCADE'
  })
  customer: Customer

  @Column({ type: 'date', nullable: false })
  dateIn: Date

  @Column({ type: 'date', nullable: false })
  dateOut: Date

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'varchar', nullable: false })
  description: string
}
