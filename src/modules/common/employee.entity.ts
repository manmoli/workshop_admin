import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Person } from './person.entity'

@Entity()
export class Employee extends Person {
  @Column()
  salary: number
}
