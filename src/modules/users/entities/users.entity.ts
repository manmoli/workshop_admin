import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Person } from '../../common/person.entity'

export enum UserType {
  ADMIN = 'admin',
  MECHANIC = 'mechanic'
  // add more user types here
}

@Entity()
export class User extends Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  salary: number

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.MECHANIC
  })
  user_type: UserType

  @Column({ type: 'text', nullable: true })
  days_to_work: string

  @Column({ type: 'date' })
  employee_since: Date
}
