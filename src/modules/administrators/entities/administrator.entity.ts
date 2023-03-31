import { Column, Entity } from 'typeorm'
import { Person } from '../../common/person.entity'

@Entity()
export class Administrator extends Person {
  @Column({ type: 'varchar', unique: true })
  phone_number: string

  @Column({ type: 'varchar' })
  password: string
}