import { Column, Entity } from 'typeorm'
import { Employee } from '../../common/employee.entity'

@Entity()
export class Mechanic extends Employee {
  @Column({ type: 'varchar' })
  employeeId: string

  @Column({ type: 'varchar', nullable: true })
  services: any[]
}
