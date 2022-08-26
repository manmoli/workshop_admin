import { Column, Entity } from 'typeorm'
import { Person } from '../../common/person.entity'

@Entity()
export class Client extends Person {
  @Column({ type: 'varchar', unique: true })
  client_id: string
}
