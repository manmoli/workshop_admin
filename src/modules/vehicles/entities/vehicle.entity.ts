import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BranchOffice } from '../../branches/entities/branch.entity'
import { Client } from '../../clients/entities/client.entity'

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
  clientId: number

  @ManyToOne(() => Client, (client) => client.vehicles, { nullable: false })
  client: Client
}
