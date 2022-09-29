import { Column, Entity, OneToMany } from 'typeorm'
import { Person } from '../../common/person.entity'
import { Vehicle } from '../../vehicles/entities/vehicle.entity'

@Entity()
export class Client extends Person {
  @Column({ type: 'varchar', unique: true, nullable: false })
  client_id: string

  @OneToMany(() => Vehicle, (vehicle) => vehicle.client)
  vehicles: Vehicle[]
}
