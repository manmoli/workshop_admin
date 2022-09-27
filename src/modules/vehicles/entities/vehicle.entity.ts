import { Column } from 'typeorm'

export enum Transmission {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export class Vehicle {
  @Column({ type: 'date' })
  modelDate: Date

  @Column({ type: 'int' })
  numberOfDoors: number

  @Column({ type: 'varchar' })
  vehicleEngine: string

  @Column({ type: 'int' })
  vehicleTransmission: Transmission

  @Column({ type: 'varchar' })
  color: string

  @Column({ type: 'varchar' })
  model: string

  @Column({ type: 'varchar' })
  brand: string

  @Column({ type: 'varchar' })
  category: string
}
