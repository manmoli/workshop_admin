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
  userType: UserType

  @Column({ type: 'text', nullable: true })
  daysToWork: string

  @Column({ type: 'date' })
  employeeSince: Date
}
