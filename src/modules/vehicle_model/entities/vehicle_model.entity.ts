import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { CustomerVehicle } from '../../customer_vehicles/entities/customer_vehicle.entity'

@Entity()
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: true })
  brand: string

  @Column({ type: 'varchar', nullable: false })
  model: string

  @Column({ type: 'int', nullable: false })
  model_year: number

  @Column({ type: 'int', nullable: false })
  cylinders: number

  @Column({ type: 'float', nullable: true })
  vehicle_engine: string //displ

  @Column({ type: 'varchar', nullable: true })
  vehicle_transmission: string

  @OneToMany(() => CustomerVehicle, customerVehicle => customerVehicle.VehicleModel)
  customerVehicles: CustomerVehicle[]
}
